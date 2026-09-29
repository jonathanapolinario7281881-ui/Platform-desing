# 6. Review window (Journal · Replay · Performance)

**Purpose:** answer five questions about every trading day — what happened, why, how it performed, what the engine would have done, and how performance is changing. Replaces v3's separate Journal & Replay and Performance windows. Opens from Windows ▾, "why" links (Positions & Orders, Stock detail) and engine-event source chips in AI answers. "Ask AI about this trade" is a button inside Review that opens the AI Assistant. Opens on the **Journal tab, today, in the environment you are trading in**. Mockups RV1–RV4.

## 6.1 Whole window

- Thin top bar ("Review") + alert line, so a Critical alert is never missed while reviewing.
- Tabs **JOURNAL · REPLAY · PERFORMANCE**; the selected trade stays selected across tabs.
- Day picker for Journal and Replay ("◂ FRI SEP 25, 2026 ▸ · Today"); Performance picks a period.
- **SHOWING RESULTS: PAPER | LIVE | RESEARCH** — a results filter only, never the trading-mode switch; changing it never changes the account. Results are never added together. LIVE results look like LIVE (red). When the filter differs from the mode you are trading in, a note says so ("viewing PAPER results · you are trading LIVE"). RESEARCH shows Phase 0 runs (chapter 15).
- Clicking a ticker opens the pop-up trade card ("LIVE CARD · CURRENT MARKET"), never an order. Replay is read-only.
- All results are after commissions, fees and slippage. The engine's would-have trades use estimated fills, are always labeled (dashed WOULD-HAVE chip, "est.") and are never counted in account P&L.
- **WOULD-HAVE** = only new engine entries it was not allowed to place because AUTO was off. An engine position opened before AUTO went off stays a real ENGINE trade, including its exits; a partly filled entry's filled shares are ENGINE.

## 6.2 Journal tab (RV1)

- **TRADES** table, one row per round trip: TIME · SYMBOL · SIDE · OWNER (YOU / ENGINE / WOULD-HAVE) · SETUP · SH · ENTRY · EXIT · P&L · R · CLOSED BY · RESULT. Summary line (real vs would-have, realized, open, fees, day total) and result-type totals under the table.
- **R** for your trades shows "—" unless you set a stop or planned risk before entry (no default risk); You vs Engine compares in dollars after costs.
- **CLOSED BY:** YOU · YOUR STOP · ENGINE · OVERRIDE EXIT · FLATTEN ALL · CLOSED BY ALPACA · MARGIN.
- **RESULT** (File 4 §16): win · valid strategy loss · execution / slippage · market regime · technical failure · rule break. Colored by the attention it needs: win green, valid strategy loss plain (its negative P&L stays red), execution / regime amber, technical / rule break red.
- Filters: All · Yours · Engine's · Would-have · Losses · Overrides & flattens · ticker search. **EXPORT CSV** (trades + fills, for reconciliation and taxes).
- **MISSED RUNNERS:** move, first seen, why missed (Level 2 slots busy, spread, signal late, promoted late, buying power, no borrow, human timing). A stock counts as a missed runner only by a predefined, versioned rule using what the platform could have known at the time and prices that were actually tradable — never just "it went up a lot later". Runners that gave no usable warning are counted separately as "not catchable". Exact rule and thresholds OPEN.
- **DAY EVENTS** and **BLOCKED & REJECTED** (small tabs): mode changes, pauses and resumes, OVERRIDE EXIT, FLATTEN ALL reports, halts on held stocks, connection incidents (the three Alpaca labels), margin calls — the day's alert history kept for good. Blocked & rejected = every entry refused and why (hard limit, margin headroom, no borrow, NOT SAFE, CANCEL ALL ENTRIES, broker rejection, NOT FILLED, order limit).
- **WHY panel** for the selected trade: entry (click or trigger, size and how it was worked out, fill and slippage) · ORDER TRAIL (ms, Alpaca) · what the engine saw (rank, Level 2 slot, engine state, AI verdict + age, news grade + age) · YOU VS ENGINE on that trade (the engine's would-have in / out / result) · exit and who closed it (SELL LOWER clicks shown) · best / worst point (MFE / MAE) · capture · versions and data sources. Buttons: **▶ REPLAY THIS TRADE** · **Ask AI about this trade**.
- An optional one-line personal note per trade (never interrupts trading).

## 6.3 Replay tab (RV2, RV3)

- Replay a trade (default: the selected one), a missed runner, or a time window of any stock (a whole day is possible).
- Big chart (ticks / 5 s / 1 min): buy and sell marks, signal time, ceiling, risk line or your stop, VWAP, volume, Level 2 slot in / out, halts, data gaps marked with their source. On your trades the engine's would-have marks are shown too.
- Level 2 book + Time & Sales exactly as they were at the replay moment (same look as the main panels). A stock with no slot shows "NO LEVEL 2 RECORDED".
- **AT THIS MOMENT:** engine state and reasons, exit check, AI verdict + age, position, account (cash, BP at 1×, margin, loss vs limit).
- **EVENT TIMELINE** to the millisecond, each line tagged with its source (MASSIVE / IBKR / ALPACA / ENGINE / RISK / AI / YOU); click a line to jump there.
- Controls: start · step back · play / pause · step · speed 0.25× / 1× / 5× / 20× · jump to signal / entry / exit / next event · scrubber with event ticks.
- Header: versions used (model · risk · AI) + **"MATCHES RECORDED LIVE ✓"** (deterministic replay reproduced the recorded live decision and result; not a claim that every source was complete) + gap count when there is one ("· 1 DATA GAP") + "READ-ONLY · NO ORDERS". A mismatch shows "DOES NOT MATCH RECORDED LIVE" and is logged as a bug.
- A trade card opened from Replay is the "LIVE CARD · CURRENT MARKET" card with all four buttons; the replay pauses while it is open (RV3).
- How far back Replay can go depends on the raw tick / Level 2 retention policy (OPEN).

## 6.4 Performance tab (RV4)

- Filters: PERIOD (Today · This week · Last 30 days · All · Custom…) · OWNER (All · You · Engine) · PAPER | LIVE | RESEARCH.
- Key numbers: net P&L after costs · expectancy (R and $) · win rate (never judged alone) · average win / loss · profit factor · max drawdown · capture · trades (no quota).
- Account over time after costs + each day's P&L.
- **YOU VS. ENGINE:** your trades vs the engine's would-have trades on the same stocks (trades, win rate, net, per trade, your entry timing vs the engine's, your exits vs the engine's); OVERRIDE EXIT counted on its own (result vs if the engine had kept them).
- **SPLIT BY ▾:** setup · price band · float · session · long / short · news grade · spread · strategy version.
- **ENGINE ALONE VS. ENGINE + AI:** win rate, expectancy, bad trades avoided, good trades blocked, AI delay. The AI stays only if it improves results after costs.
- **WHERE LOSSES CAME FROM** (result types in $) + missed runners (top movers caught early, why missed).
- **EXECUTION & ACCOUNT SAFETY:** slippage on entries / exits, signal → fill latency, NOT FILLED count, fees / borrow, "INTRADAY MARGIN CALLS: 0 — TARGET 0", AUTO pauses (soft / give-back), hard-limit days, FLATTEN ALL uses, connection incidents.
- A placeholder notice shows until real paper results exist; example numbers are never targets.

## 6.5 Acceptance checks — Review

- **RV-01** Journal lists every real trade and every would-have trade with the correct owner, CLOSED BY and RESULT; totals after costs match Positions & Orders' realized and fees for the day.
- **RV-02** The results filter never changes the trading mode, never adds PAPER, LIVE and RESEARCH together, and shows the mismatch note.
- **RV-03** Replay of a recorded live trade reproduces the recorded decision ("MATCHES RECORDED LIVE ✓"); gaps are counted and shown; a mismatch is logged as a bug.
- **RV-04** Event timeline lines carry their source and millisecond time; clicking jumps the replay.
- **RV-05** Missed runners follow the predefined, versioned rule; "not catchable" runners are separate.
- **RV-06** A card opened from Replay is headed "LIVE CARD · CURRENT MARKET", pauses the replay, and shows live prices with all four buttons.
- **RV-07** EXPORT CSV contains trades and fills that reconcile with Alpaca.

![RV1 — Review, Journal tab: trades with owner, CLOSED BY and RESULT, missed runners, day events, WHY panel.](mockups/RV1_Review_Journal.png)

![RV2 — Review, Replay tab: chart, recorded Level 2, at-this-moment panel, event timeline with sources.](mockups/RV2_Review_Replay.png)

![RV3 — Review, Replay with the "LIVE CARD · CURRENT MARKET" trade card open; the replay is paused.](mockups/RV3_Review_Replay_with_live_card.png)

![RV4 — Review, Performance tab (drawn while trading LIVE and viewing PAPER results, so the mismatch note shows): key numbers, You vs Engine, engine alone vs engine + AI, execution and account safety.](mockups/RV4_Review_Performance.png)
