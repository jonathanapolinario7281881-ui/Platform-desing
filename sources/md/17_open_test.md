# 17. OPEN items and TEST values

Build every item below as configuration or a replaceable module so it can be decided or tuned without a redesign.

## 17.1 TEST values (behavior settled, number tuned later)

| Area | Value | Starting value | Tuned by |
|---|---|---|---|
| Loss limits | Soft / hard daily loss (count closed + open) | drawings: soft $300 · hard $600 | Paper testing |
| Loss limits | Give-back amount from today's high | drawings: $500 | Paper testing |
| Loss limits | Recovery buffer before a new soft-limit pause | e.g. back above about −$250 with soft −$300 | Paper testing |
| Order size | Presets | 10% · 25% · 50% of equity · $2,000 | Paper testing |
| Caps | Most in one stock, most open positions, engine 1R, engine reserve, liquidity cap | examples in Settings | Phase 0 / paper |
| Execution | Entry ceiling rules and personal maximum slippage; stepping speed | dynamic %, adapts to spread / volatility / liquidity | Paper testing |
| Execution | Exit boundary for normal exits; FLATTEN emergency band; repricing speed | wider than entry; much wider for FLATTEN | Paper / replay |
| Execution | Halt-reopen order during FLATTEN | limit about 5% below the price, lower one step if not filled in about 2 s, stop at a maximum and alert | Paper / replay |
| Margin | Safety reserve left unused | set in paper and small LIVE tests | Testing |
| Reconciliation | Broker-check interval | every few seconds | Testing |
| Engine | Reallocation reserve size | — | Testing |
| Signals | Blink length; pulse rate; anti-flicker window; "clearly strengthens" level | about 5 s; about 1 per second | Paper testing |
| Signals | Green / red blink thresholds | from the engine | Phase 0 / paper |
| Display | AI verdict marked OLD after | 3 min | Usability |
| Display | NEWS letter bright for | about 1 hour | Usability |
| Display | List re-sort speed | about once a second | Usability |
| Display | NEW tag duration | 20–60 s | Usability |
| Warnings | Spread boxes (amber / red) — separate PAPER and LIVE values | 1% / 2% of price | Usability |
| Display | Closed card stays | about 5 s | Usability |
| Display | Blink chips in the thin bar | newest 3, then "+N more" | Usability |
| Locks | Panel button lock after a Level 2 swap | 0.5–1 s | Usability |
| Locks | Trade-card opening lock | about 0.5 s | Usability |
| Gestures | FLATTEN ALL hold · SELL LOWER past the band | about 0.75–1 s · 0.5 s | Usability |
| Alerts | Critical repeat interval · same-signal sound anti-spam | about 10 s · about 1 minute | Usability |
| My list | Maximum size · rows visible before scrolling | about 10–20 (drawn "5 of 20") · about 6 | Speed tests |
| Level 2 | Minimum time a stock keeps its slot (anti-thrashing) | — | Testing |
| News | Dilution / filing look-back | 90 days | Testing |
| Health | Clock drift limit | drawn example 0.5 s | Testing |
| Health | Connection "SLOW" delay limit | — | Testing |
| Recovery | Repeated drops that force a manual resume | e.g. 3 in 15 minutes | Testing |
| Security | Order circuit breakers (orders per window, notional per order, aggregate exposure, price bounds) | drawn example: 8 orders per 10 s | Testing |
| Security | Backup and recovery targets | — | Construction |
| AI | Assistant daily budget; trading-AI budget and early warning | — | Testing |
| Phase 0 | Historical Level 2 sample | about 200 stock-days | Budget / results |

## 17.2 OPEN items (not decided yet)

- What the engine does with its own positions during a long disconnect (fail-safe policy) — reliability testing.
- Where your optional STOP is held (Alpaca, our server, or both); stops outside 9:30–4:00 generally need a stop-limit (may not fill in a fast drop; halted stocks can reopen below the stop) — stop / execution design and paper testing.
- How the engine picks which of its positions to sell to cure a margin call.
- Whether and when to move to 1.5× and later 2× — only after clean real-money testing. The steps themselves are settled (1× → 1.5× → 2×, section 2.7); only the timing is open.
- The missed-runner rule and thresholds (versioned).
- Raw tick and Level 2 retention (how far back Replay can go); export formats beyond CSV.
- Whether extra size reduction helps while news is unknown (strategy-dependent rule is settled).
- Extra Level 2 slots if three prove too few.
- The sound design for each alert.
- The actual screen scaling on Jonathan's laptop (confirm 1536 × 864).
- Phone page technology (web page on the home screen or an app).
- Vendors, cloud topology, firewall implementation, backup frequency, failover design, penetration-testing tools.
- Standby / failover infrastructure (later, if account size justifies it).
- Partial exits (SELL HALF) — maybe later, after paper trading.
- The IBKR-only review (around $60,000, or earlier if IBKR adopts the new FINRA rules for the account).

## 17.3 Checks to do before or during LIVE rollout

- Verify at Alpaca that non-marginable penny stocks can be bought with own cash inside the margin account (Phase 2).
- Confirm same-day reuse of sale money at 1× (Phase 2).
- Verify IBKR market-data terms for personal internal use.
- Small real-money validation (penny stocks, cash-only, fills) before serious LIVE trading.
- Failure drills in PAPER (chapter 16).
