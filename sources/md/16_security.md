# 16. Security, resilience and platform protection

**Status: SETTLED.** Designed in from the start, not added later. Exact vendors, cloud topology, firewall rules, backup frequency, failover design and penetration-testing tools are chosen during construction, but the architecture must support every requirement here from day one.

## 16.1 What it protects

The account and money · broker and data credentials · trading logic and source code · market data and logs · server infrastructure · the integrity of orders, positions and risk controls. Security stays off the low-latency trading path wherever possible so it does not slow scanning, signals or execution.

## 16.2 Threats it must handle

Hackers and unauthorized access · stolen API keys · a compromised laptop or phone · cloud, server or data-center failure · network outages · Alpaca, IBKR or Massive outages · stale, corrupted or conflicting data · duplicate orders after reconnects · UNKNOWN order states · software bugs or runaway trading loops · risk-engine failure · broker / platform position mismatches · database corruption or data loss · bad deployments or updates · clock failures · overload, latency spikes, queue backlog · malicious or untrusted news, filings or text reaching the AI · accidental LIVE-setting changes · halts, flash crashes, inability to exit.

## 16.3 Required from day one

1. **Access and secrets:** MFA and least-privilege access; secrets in a secure store, never hard-coded, never in logs; execution credentials never in the UI, browser or phone (they talk only to our server); keys masked in Settings.
2. **Encryption** in transit and at rest; restricted server and network access; firewall rules.
3. **Separate Research, Paper and LIVE environments** with separate keys. The coder (Codex) and any AI coding tool never receive LIVE credentials: development uses paper keys only; LIVE keys exist only on the LIVE server; the code repository is scanned for secrets.
4. **No withdrawal permission** on trading API keys.
5. **Tamper-evident, append-only audit logs** (checksum chain) for orders, fills, settings and overrides.
6. **Unique / idempotent order IDs;** UNKNOWN orders never resent until Alpaca confirms.
7. **Independent order circuit breakers outside the strategy logic** (a strategy bug cannot bypass them): maximum orders per time window · maximum notional per order · maximum aggregate new exposure · duplicate-order protection · price sanity bounds on every limit order · abnormal order-rate detection. Tripped → **"AUTO BLOCKED — ORDER LIMIT"** (Critical). Limits are TEST values.
8. **Independent risk / kill controls;** fail-safe rule: if account or order state is uncertain, block new risk.
9. **Entry orders always expire** (never good-till-cancelled).
10. **Continuous Alpaca reconciliation** (broker check, two levels).
11. **Encrypted, off-site backups** with scheduled, tested restores; recovery targets start as TEST values.
12. **Server monitoring:** CPU, memory, disk, latency, health, queue backlog (System Health).
13. **Versioned deployments with rollback;** no normal deployments during the trading session (4:00 a.m.–8:00 p.m. ET) except emergency fixes; only approved versions go live (Settings → Versions / PROMOTE).
14. **Security updates, pinned dependencies and vulnerability checks.**
15. **Untrusted text:** external news, filings and web text are data, never instructions; the LLM is outside the execution path, has no order or settings authority, and its output is checked before use.
16. **Clock** synchronized from several sources; drift beyond the limit = NOT SAFE TO TRADE.

## 16.4 Outside watchdog

A small independent service outside the trading server's failure domain (a different machine or provider) checks the server's heartbeat and sends **"SERVER UNREACHABLE"** to the phone when it stops. It has notification authority only — no trading keys.

## 16.5 Second emergency route and account security

- Jonathan knows how to cancel everything, close positions and suspend trading **directly at Alpaca**, independent of our server (matches "Manual backup: use Alpaca directly").
- **Account protection** (the most likely theft route for one person is account takeover): MFA on Alpaca and on the email account (the recovery path) · a carrier PIN / SIM-swap protection on the phone number · a password manager · alerts on bank-link and withdrawal changes.

## 16.6 AI budgets

- **Assistant AI** (chat / Q&A): a daily budget; when reached → "AI ASSISTANT DEGRADED · DAILY BUDGET REACHED"; trading continues normally.
- **Trading AI / context** (only if validated into the decision system): separately provisioned and monitored, with an early warning well before its limit and a predefined fallback tested before LIVE — the engine-alone mode validated in Phase 0 — shown as "AI context check: ON · UNAVAILABLE". No cost cap may silently change the live strategy mid-day.

## 16.7 Resilience and recovery

- Define what happens if the primary server or data center fails; preserve positions, order state and logs.
- Every restart or recovery: rebuild from Alpaca, resolve UNKNOWN orders, check clock and data, show RECOVERING; AUTO stays blocked until reconciled (verified-recovery rules, section 12.7); never blindly resend orders.
- **Failure drills in PAPER before LIVE:** cut the network, kill processes, restart with open orders — confirm the recovery checks and duplicate-order protection work.
- Standby / failover infrastructure later, if account size justifies it.

## 16.8 On screen

System Health shows only the important states (HEALTHY / DEGRADED / NOT SAFE TO TRADE, provider outages, broker sync, stale data, server issues, recovery); security never clutters the trading screen. New visible states from this chapter: "AUTO BLOCKED — ORDER LIMIT", "SERVER UNREACHABLE" (phone, from the watchdog), "AI ASSISTANT DEGRADED · DAILY BUDGET REACHED".

## 16.9 Acceptance checks — Security and resilience

- **SEC-01** No secret appears in code, logs, the UI, the browser or the phone; the repository secret scan passes.
- **SEC-02** Development and Research environments hold no LIVE credentials; trading keys cannot withdraw.
- **SEC-03** Each circuit breaker trips in a test and produces "AUTO BLOCKED — ORDER LIMIT"; the strategy code cannot bypass it.
- **SEC-04** Reconnect tests never produce a duplicate order; UNKNOWN orders are never resent before Alpaca confirms.
- **SEC-05** Editing any audit-log entry is detected by the checksum chain.
- **SEC-06** A restore from backup succeeds in the scheduled drill.
- **SEC-07** Stopping the server produces SERVER UNREACHABLE from the outside watchdog.
- **SEC-08** A deployment attempted during the trading session is refused unless marked as an emergency fix; rollback restores the previous version.
- **SEC-09** Failure drills (network cut, process kill, restart with open orders) end in RECOVERING → verified recovery with no duplicate orders and correct positions.
