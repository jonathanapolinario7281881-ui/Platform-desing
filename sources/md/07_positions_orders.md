# 7. Positions & Orders window

**Purpose:** everything that really happened at Alpaca in the mode you are trading in — positions, working orders, fills, capital in use, reconciliation. Opens from Windows ▾ and "Positions & Orders ↗" on the strip. Mockups PO1 (normal day, PAPER, AUTO OFF), PO2 (flatten incomplete, LIVE), PO3 (states and examples).

## 7.1 Whole window

- Thin top bar ("Positions & Orders") + alert line.
- Only **real** positions and orders of the mode you are trading in (PAPER or LIVE). The engine's would-have trades stay in Review.
- Exact cents everywhere (whole dollars are only for the top bar's fit). Ticker click = pop-up trade card. No order hotkeys.

## 7.2 Account strip (one row)

EQUITY · CASH / HELD FOR WORKING ORDERS / AVAILABLE FOR NEW ORDERS · LEVERAGE ("1× · Alpaca 1× · platform 1× · long-only"; later for example "1.5× · SHORTS ENABLED" when approved) · LONG / SHORT VALUE (short: "— shorts off" until Phase 3) · OPEN P&L · REALIZED + FEES · DAY P&L (the same number as the top bar) · LOSS LIMIT meter (soft / hard) · MARGIN tile ("HEADROOM OK" / "HEADROOM LOW · NEW SIZE REDUCED" / "INTRADAY MARGIN CALL"; "margin calls: 0 — TARGET 0").

- "Available for new orders" is account-level ("Available (account total)"); the amount usable for a given stock can be lower (marginability, borrow, reserve, caps). The real per-stock amount is the share count on each BUY/SHORT button; the tile's hover says so. It makes 1× visible: after a few positions the cash is used and the next BUY shows LIMITED by cash (drawn: ABCD 25% = $1,308 → $1,167.80 ÷ ceiling $2.24 = 521 sh).

## 7.3 Open positions

- YOURS first, then ENGINE'S — labeled dividers that say who closes them — each group in the order opened (same as the strip).
- Columns: SYMBOL · SIDE · OWNER · SH · AVG · LAST · P&L $ · P&L % · STOP (yours: "STOP $13.40 · move · ×" or "+ STOP") / RISK LINE (engine's) · OPENED + time held · ENGINE'S READ (EXIT? on yours = advice only) · ORDER STATUS · EXIT.
- Exit button = the card rules: SELL/EXIT one click on yours (also in AUTO ON) · 🔒 "OVERRIDE EXIT · hold 1 s" on the engine's · "HALTED · elapsed" · "SELL LOWER TO $x" (one click on a normal exit; hold 0.5 s past the FLATTEN band) · "checking…" while an exit is UNKNOWN · CLOSED (the row stays about 5 s).
- Owner chip "YOURS · OPENED OUTSIDE PLATFORM" for a position found at Alpaca that the platform did not open (your SELL/EXIT works; the engine never manages it).
- No SELL HALF here.
- **During FLATTEN ALL** the positions panel becomes the flatten report (PO2): banner "FLATTEN INCOMPLETE — n POSITIONS PENDING …", pending rows first, closed rows listed until the flatten finishes; "FLATTEN COMPLETE" only when Alpaca shows zero positions too.

## 7.4 Working orders

- Every working order including your STOP: sent time, symbol, order (side, type, entry / exit / stop), owner, filled / total, status, CANCEL on your own orders (move · × on your stop). Each row shows its trail (sent → raised → partial → … → ceiling) and why the size was limited.
- Header: "CANCEL ALL ENTRIES (n)" with 2+ unfilled entries.
- A working **engine entry** has "CANCEL ENGINE ENTRY · hold 1 s": only that order's unfilled shares are cancelled; filled shares stay an ENGINE position; logged as a human intervention; "ENGINE RE-ENTRY PAUSED · same setup ×" until you release it or a genuinely new setup appears. The button shows only while that engine entry is working.
- The engine's exits can never be cancelled by you (OVERRIDE EXIT instead).
- Statuses and UNKNOWN handling as in section 2.11.

## 7.5 Fills & orders today

Tabs FILLS · ALL ORDERS · PROBLEMS · REALLOCATIONS, newest first, times to the millisecond, from Alpaca, with notes (partial, OVERRIDE EXIT by you, FLATTEN ALL, CLOSED BY ALPACA · MARGIN). PROBLEMS = rejected, NOT FILLED, cancelled by the system, UNKNOWN. Click a row = full trail; "why" opens Review.

## 7.6 Today by owner

YOURS · ENGINE'S · TOTAL — open, open P&L, realized, fees, day P&L. Real trades only. An OVERRIDE EXIT counts under the engine (its trade), with a note.

## 7.7 Broker check · Alpaca

IN SYNC / CHECKING / MISMATCH with the last check time and "check now". Runs after every fill, every reconnect, at start-up and every few seconds (interval TEST). Alpaca's numbers win. Two mismatch levels (section 2.11): one stock → that stock blocked for new entries; account-level → all new entries blocked (AUTO BLOCKED — BROKER SYNC). Exits always work; Critical alert; incident logged in Review. After a restart everything is rebuilt from Alpaca, never assumed empty.

## 7.8 Reallocations (engine only)

Reserve → trim weakest → close weakest, each with its reason. Your positions are never trimmed or sold to make room. Reserve size TEST.

## 7.9 Margin call view (PO3)

Amount, since when, Alpaca deadline, goal today; the estimated cure button for your positions, recalculated live ("EST. SELL 61 ABCD TO CURE MARGIN · covers the remaining $130"); after its fill the platform re-checks Alpaca and recalculates any remainder; what the engine already sold of its own; AUTO + your BUY/SHORT blocked, exits available, working entries cancelled. The call is cured only when Alpaca confirms.

## 7.10 Shorts later (Phase 3)

SIDE in purple, COVER instead of SELL/EXIT, borrow status and fee from Alpaca on the row (easy / hard to borrow).

## 7.11 Acceptance checks — Positions & Orders

- **PO-01** Every position and order at Alpaca appears here within the broker-check interval, with the correct owner; nothing that did not happen at Alpaca appears.
- **PO-02** Equity, cash, held, available, open P&L, realized, fees and Day P&L add up and match the top bar and Alpaca to the cent.
- **PO-03** Each exit button behaves exactly like the card's; OVERRIDE EXIT and CANCEL ENGINE ENTRY need a 1 s hold and are logged.
- **PO-04** A forced mismatch (test) produces the correct level (one stock vs account), blocks the right entries, keeps exits working and logs an incident.
- **PO-05** During FLATTEN ALL the panel becomes the flatten report and shows FLATTEN COMPLETE only after Alpaca shows zero positions.
- **PO-06** A position opened in the Alpaca app appears as "YOURS · OPENED OUTSIDE PLATFORM" and is never managed by the engine.
- **PO-07** The margin cure button recalculates live and never runs without a click; the call clears only on Alpaca's confirmation.

![PO1 — Positions & Orders, a normal day (PAPER, AUTO OFF): account strip, open positions by owner, working orders, fills, today by owner, broker check.](mockups/PO1_Positions_Orders_normal_day.png)

![PO2 — Positions & Orders during FLATTEN ALL in LIVE: FLATTEN INCOMPLETE report with the pending halted position.](mockups/PO2_Positions_Orders_flatten_incomplete_LIVE.png)

![PO3 — Positions & Orders states: CANCEL ENGINE ENTRY, opened outside the platform, the two mismatch levels, margin call view with the estimated cure button, order statuses.](mockups/PO3_Positions_Orders_states.png)
