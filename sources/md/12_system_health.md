# 12. System Health window

**Purpose:** show in words what is healthy, what is not, what still works, and why — without cluttering the trading screen. Opens from the health word in any top bar (click; hover shows the three main connections) or Windows ▾. Mockups SH1 (normal day, PAPER, AUTO OFF, 07:42) and SH2 (every problem state).

## 12.1 Status band (top, full width)

- The health word + the reason + the check time: "● HEALTHY — everything is working · all checks passed 07:42:30".
- **WHAT WORKS NOW** chips: AUTO CAN START · YOUR BUY / SHORT · EXITS · STRATEGIES ("all available", or which strategies are off and why). Every state in words, never color alone.
- "↻ Run all checks now".

## 12.2 Start-up & safety checks (left column)

Runs from 4:00 a.m., before AUTO starts or LIVE is switched on, and all session. A failed check shows ✗ (must pass) or ! (should pass) with its reason, time and what it blocks.

- **MUST PASS — one failure blocks AUTO and going LIVE:** approved versions loaded · PAPER / LIVE clearly set (the right settings set loaded) · Alpaca connected, correct account, cash and buying power read · leverage 1× at Alpaca = platform, long-only (Phase 1) · positions and orders match Alpaca (IN SYNC) · no intraday margin call · market data (Massive) live, not stale · clock synchronized (drift shown) · market calendar and session correct · risk engine and loss limits loaded · journal and database writing · STOP AUTO and FLATTEN ALL path working.
- **SHOULD PASS — if not, DEGRADED, still safe to trade:** IBKR Level 2 logged in · news & filings sources fresh (Benzinga · SEC · FDA) · AI service ready.
- **Already LIVE:** a failed must-pass check never switches the account back to PAPER by itself. LIVE cannot be newly switched on; while already LIVE, new risk is blocked as that check's rule says; exits stay available whenever execution is possible.
- **THE THREE HEALTH WORDS** explained on screen (section 3.5).
- **STRATEGIES · WHAT EACH NEEDS** (example): long engine — Alpaca · Massive; Level 2 strategies — + IBKR Level 2; AI context check — + AI service; short engine — PAPER ONLY (Phase 3). Each strategy declares its sources (news, SEC, FDA too); a missing source turns off only the strategies that need it ("ON · UNAVAILABLE"), and the band names them.

## 12.3 Connections (middle)

| Connection | Detail | Status · last seen · delay | If it fails |
|---|---|---|---|
| ORDERS · ALPACA | masked account · orders, fills, cash | "connected · 0.3 s ago · 38 ms" | NOT SAFE TO TRADE · AUTO and new entries blocked · Critical |
| LEVEL 2 · IBKR | logged in · 3 of 3 slots | connected | DEGRADED · Level 2 strategies off · Attention |
| MARKET DATA · MASSIVE (trades) | whole market | connected | NOT SAFE TO TRADE · new entries blocked · exits work · Critical |
| MARKET DATA · MASSIVE (quotes) | whole market | connected | same |
| NEWS · BENZINGA | headlines | live | DEGRADED · strategies that need it off · NEWS UNKNOWN |
| FILINGS · SEC EDGAR | S-1, S-3, 424B, 8-K | checked 07:41 | DEGRADED · strategies that need it off · SEC CHECK UNAVAILABLE |
| FDA · openFDA | approvals, clearances | checked 06:00 | DEGRADED · strategies that need it off · FDA CHECK UNAVAILABLE |
| AI SERVICE | ~3 s per answer · est. $0.21 today | ready | DEGRADED · AI context check off · trading not affected |

- Under the Alpaca row, **checked 5 ways:** stream ✓ · API heartbeat ✓ · order endpoint ✓ · account endpoint ✓ · network ✓ · status page: operational (1 signal only). The three labels OUR ALPACA CONNECTION LOST / ALPACA OUTAGE / ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN are decided from these signals; exact rules are set when the Alpaca connector is built and tested.
- Row states in words: "connected · 0.3 s ago" · "SLOW · 4.2 s delay" (delay above the limit, TEST; health unchanged until stale) · "RECONNECTING… attempt 2 · 3 s" (each attempt logged, gaps repaired after) · "NEEDS LOGIN since 07:44:10" · "STALE since 07:44:02" (treated like down for new entries) · "DOWN since 07:41:05". Never an "OK" without a time.

## 12.4 Speed, data quality and sources (middle)

- **SPEED OF EACH STEP** (sample values until measured): market event → our server (Massive) · Level 2 update (IBKR) → our server · update → engine signal · signal → risk and margin check · check → order sent · order → Alpaca confirms · Alpaca → first fill · total signal → fill.
- **DATA QUALITY:** stocks watched · ranked-list refresh · stale symbols · gaps repaired · halted now · orders rejected · alerts today · AI check age.
- **WHERE EACH NUMBER COMES FROM:** quotes and trades: Massive · Level 2 book: IBKR · orders, fills, positions, cash, buying power, borrow: Alpaca · news: Benzinga · filings: SEC EDGAR · FDA: openFDA; every event keeps provider, received and processed times.

## 12.5 Right column

- **ACCOUNT SAFETY · ALPACA:** "INTRADAY MARGIN CALLS: 0 — TARGET 0" · margin stage NORMAL (then HEADROOM LOW, then CALL) · leverage "1× at Alpaca = 1× in the platform ✓ match" · shorting "OFF at Alpaca (long-only) · Phase 1 of 4" · broker check "IN SYNC 07:42:30 · check now" · "CLOSED BY ALPACA: none today".
- **LEVEL 2 SLOTS · IBKR:** the three current slots (with owner chips) and today's slot changes with time, slot, change and why.
- **INCIDENTS TODAY:** reconnects and errors (e.g. "07:12:03 Massive reconnect (1.2 s) · resynced, no gaps left"); every incident is saved in the audit log and listed in Review's Day events (connection incidents counted in Performance).
- **SERVER & CONTROL PANELS:** CPU, memory, event backlog, disk; "This laptop ● connected · Phone ● last seen 07:40"; **"PHONE NOTIFICATIONS · OS PERMISSION ALLOWED (verified 07:40)"** — or "… OS PERMISSION BLOCKED", matching the phone's own banner. If the laptop goes offline nothing stops; the phone shows "Control panel offline · AUTO ON".

## 12.6 States (SH2) — the band shows what is wrong and what still works

| Band | What still works | Alert |
|---|---|---|
| DEGRADED — IBKR NEEDS LOGIN · LEVEL 2 PAUSED | AUTO can start without Level 2 strategies; your BUY/SHORT allowed; exits available; "STRATEGIES OFF: Level 2 strategies · need IBKR". Fix: log in to IBKR again — Level 2 and its strategies come back by themselves; panels show "LEVEL 2 UNAVAILABLE"; Settings shows "ON · UNAVAILABLE — IBKR L2 DOWN" | Attention |
| NOT SAFE TO TRADE — OUR ALPACA CONNECTION LOST ("ALPACA EXECUTION UNAVAILABLE · PLATFORM CANNOT RELIABLY CONTROL ORDERS") | AUTO blocked; your BUY/SHORT blocked; exits can't be sent from the platform; **"Manual backup: use Alpaca directly"** | Critical |
| NOT SAFE TO TRADE — ALPACA OUTAGE (broker side confirmed) | same, no manual-backup line; the platform keeps trying and runs a broker check when it is back | Critical |
| NOT SAFE TO TRADE — ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN | AUTO blocked; BUY/SHORT blocked; exits uncertain — may not reach Alpaca | Critical |
| NOT SAFE TO TRADE — MASSIVE DATA STALE | no new entries; your BUY/SHORT refused while data is stale; exits available; positions still watched with remaining healthy data | Critical |
| NOT SAFE TO TRADE — INTRADAY MARGIN CALL · $412 · CURE REQUIRED (Alpaca deadline) | AUTO and BUY/SHORT blocked; exits available; "EST. SELL 200 ABCD TO CURE MARGIN" (your click only) | Critical |
| NOT SAFE TO TRADE — CLOCK OUT OF SYNC (drift vs limit, TEST) | AUTO and BUY/SHORT blocked; exits available | Critical |
| NOT SAFE TO TRADE · AUTO BLOCKED — BROKER SYNC (account level: cash, buying power, total positions or account state) | all new entries blocked; exits available; Alpaca's numbers win | Critical |
| DEGRADED · ABCD BLOCKED — BROKER SYNC (one stock) | AUTO continues except ABCD; your BUY/SHORT allowed except ABCD; exits available | Critical |
| DEGRADED — NEWS SOURCE DOWN · BENZINGA | AUTO can start; BUY/SHORT allowed; exits available; strategies that need Benzinga "ON · UNAVAILABLE"; NEWS UNKNOWN, never "no news"; extra size reduction is a testing question | Attention |
| DEGRADED — AI SERVICE UNAVAILABLE | trading and the engine not affected; AI context check "ON · UNAVAILABLE"; Ask AI "AI ASSISTANT UNAVAILABLE" | Attention |
| RECOVERING — CHECKING BEFORE AUTO CONTINUES | live checks: connection ✓ · positions & orders match Alpaca ✓ · UNKNOWN orders 0 ✓ · data gaps (only those affecting an active strategy, open position or pending order) · clock & risk ✓ → "AUTO CONTINUES" or "AUTO STAYS BLOCKED — press Resume AUTO" with the reason | Info |

AUTO BLOCKED — ORDER LIMIT (order circuit breaker tripped, chapter 16) is a Critical AUTO block shown in the AUTO state and the alert line (T1, state 5).

## 12.7 Recovery rules

- Health returns by itself when the checks pass again; after any broker problem a fresh broker check runs first (Alpaca's numbers win).
- AUTO continues by itself only after a **verified recovery**: connection / data genuinely healthy · positions and orders match Alpaca · no UNKNOWN order unresolved · no unresolved data gap that affects an active strategy, open position or pending order · clock and risk state valid. If anything is uncertain, AUTO stays blocked until you press Resume AUTO (hold 2 s, main window).
- Repeated drops (for example 3 in 15 minutes, TEST) keep AUTO blocked until you resume.
- **Never auto-resume, however short:** intraday margin call · hard daily limit · FLATTEN ALL · your STOP AUTO · an unresolved broker mismatch · the soft-limit and give-back pauses.
- Your positions are never sold because of a disconnect. What the engine does with its own positions during a long outage is decided in reliability testing (OPEN).

## 12.8 Acceptance checks — System Health

- **SH-01** Each must-pass check, when failed in a test, blocks AUTO and going LIVE and shows its reason and time; each should-pass failure makes Health DEGRADED only.
- **SH-02** For every row in 12.6, simulating the failure produces exactly that band, those "what works" chips and that alert level.
- **SH-03** The three Alpaca labels are chosen from the five signals; the status page alone never marks Alpaca healthy; "Manual backup" appears only with OUR ALPACA CONNECTION LOST.
- **SH-04** Recovery: after a short blip with all checks passing AUTO continues; with an UNKNOWN order or a relevant gap it stays blocked with the reason; the never-auto-resume list holds.
- **SH-05** Every connection row shows a time; no "OK" without a time.
- **SH-06** A failure never changes a setting.

![SH1 — System Health, a normal day: status band with WHAT WORKS NOW, checks, connections with "if it fails", speed, data quality, account safety, Level 2 slots, incidents, server and control panels.](mockups/SH1_System_Health_normal.png)

![SH2 — System Health states: the band for each problem, how Alpaca's cause is decided, connection row states, a failed check, the health word and hover, and verified recovery.](mockups/SH2_System_Health_states.png)
