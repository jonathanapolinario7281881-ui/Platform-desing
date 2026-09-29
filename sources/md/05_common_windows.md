# 5. Every separate window: the thin top bar and the pop-up trade card

There are seven separate windows, opened from Windows ▾ (and the shortcuts listed per window): Stock detail, AI Assistant, Positions & Orders, Review, News & Catalysts, System Health, Settings. On one laptop screen a window covers the main window; the main window keeps running behind it and never closes. Closing any window stops nothing. Every separate window has the thin top bar and the 22 px alert line, and every ticker in it opens the pop-up trade card.

## 5.1 The thin top bar (mockup T1)

**Left to right:** ← MAIN WINDOW button (big, blue, always the same top-left spot) with the F2 key · window name · PAPER / LIVE — REAL MONEY · AUTO state · session clock · LIVE ALERTS label + blink chips · DAY P&L (+ limit tag) · health word · Windows ▾ · FLATTEN ALL. The 22 px alert line sits directly under it.

- ← MAIN WINDOW or F2 brings the main window to the front instantly (nothing has to load). F2 is the starting key (Settings can change it).
- **AUTO in words:** "AUTO OFF — YOU TRADE" · "AUTO ON — ENGINE CAN TRADE" + **STOP AUTO (one click)** · "AUTO PAUSED — reason" · "AUTO BLOCKED — reason" (short reason word — ALPACA, BROKER SYNC, ORDER LIMIT …; the full reason is in the alert line) · "AUTO STAYS BLOCKED — press Resume AUTO". Turning AUTO on and Resume AUTO happen only in the main window; the paused block's hover says "Resume AUTO in the main window".
- **Session clock:** "PRE-MARKET 07:42 ET" (REGULAR, AFTER-HOURS, MARKET CLOSED).
- **Blink chips:** only for stocks that matter to you — My list, the Level 2 slots, the Selected stock and **all open positions (yours and the engine's)**. A teal underline marks an engine position's chip. EXIT? chips (your positions only) come first. Newest 3 shown, then "+N more". A chip blinks about 5 s, stays solid while the signal is active, and disappears when it ends. **Click a chip = pop-up trade card.**
- **Limit tag:** a small "SOFT LIMIT" (amber) or "HARD LIMIT" (red) next to Day P&L, only when reached.
- **Health word:** HEALTHY / DEGRADED / NOT SAFE TO TRADE with the same hover as the main window; click opens System Health.
- **LIVE frame:** the red LIVE frame surrounds every window, not only the main one.
- **Fit rule:** nothing wraps; FLATTEN ALL can never be pushed off. When space runs out: (1) the window name shortens (ellipsis, down to about 60 px), (2) chips shorten to arrow + ticker ("▲ ABCD"), (3) the "LIVE ALERTS" label hides, (4) chips drop into "+N more". **Safety states never disappear to save space:** PAPER/LIVE, AUTO BLOCKED/PAUSED, SOFT/HARD LIMIT when active, the health word and FLATTEN ALL always stay; when the bar wording is short, the full reason is in the alert line. Chip count and timings are TEST values.
- Tested states (T1): normal PAPER AUTO OFF (2 chips); AUTO ON with an engine-position chip (3 shown, +1 more); LIVE soft limit AUTO PAUSED DEGRADED; the longest — LIVE, AUTO BLOCKED — ALPACA, HARD LIMIT, NOT SAFE TO TRADE, 6 signals (2 shown, +4 more); order circuit breaker "AUTO BLOCKED — ORDER LIMIT"; long window name, AUTO ON, after-hours. All fit; FLATTEN ALL ends 10 px from the edge.

## 5.2 The pop-up trade card (mockups C1, C2)

**Opens from:** any ticker in any separate window (a headline, the AI chat, Review, Positions & Orders, Stock detail links) and any blink chip in the thin top bar. Not from the main window's list (there, click = Selected card). **The buy is always the second click, on the card**, so opening a card can never place an order. Double-click on a ticker opens Stock detail instead of the card.

**Behavior**

- It is the same component as the strip card (consistency rule): same states, same rules, same order path and risk checks — the card adds no load to the engine.
- One card at a time: another ticker click replaces it. It opens next to the click, never covers the top bar or the alert line, and can be dragged by its header.
- Close with ✕ or Esc. **Closing the card never cancels a working order**; the order keeps going and stays visible in the strip and in Positions & Orders.
- Its buttons are locked about 0.5 s after opening (TEST), shaded "opening…", so a double-click on a ticker can never land on BUY.
- Opened from Review, a Replay moment or a historical AI answer, the header is blue: **"LIVE CARD · CURRENT MARKET · now 07:42:31 ET"**, so a historical price is never mistaken for a tradable one; the replay pauses while it is open ("Replay paused at 07:12:52.100 · prices here are live, not from the replay").

**Content (top to bottom, mockup C1)**

1. Header: "TRADE CARD" · ticker box (blinks on a signal) · signal text · rank · Level 2 slot or "no Level 2 slot" · owner chip · "Full page ↗" (Stock detail) · ✕.
2. Price line: price, change, LONG/SHORT setup, "NEWS A · 11m", SPR (with box rule), "AI GO · 40 s" (OLD after 3 min).
3. Small chart: 1-minute candles, VWAP, volume; "YOUR ENTRY $2.15" and your STOP line, or the engine's RISK LINE; the engine marker.
4. Engine line (state + reason; "○ would have bought $2.12 · AUTO off").
5. AI line (verdict + main reason + age).
6. Position line: owner chip, shares @ average, P&L $ and %, "+ STOP" or "STOP $1.95 · move · ×".
7. Order status line with its action: "PARTIAL 300 / 521 · WORKING ≤ $2.24 · size limited by cash" + CANCEL.
8. Order size bar: SIZE 10% · 25% · 50% · $2,000 · FULL CAP "= $1,308" · "same size everywhere" (dimmed in AUTO ON).
9. Four buttons: BUY · SELL/EXIT · SHORT · COVER (always, same places).
10. Footer: "Same card and rules as the main window…" (drawing note; the built card may shorten it).

**States (mockup C2) — exact wording**

| State | What the card shows |
|---|---|
| Engine entry working (AUTO ON) | "ENGINE BUY 200 / 500 · working ≤ $2.31" + "CANCEL ENGINE ENTRY · hold 1 s"; BUY "AUTO ON", SELL/EXIT "🔒 engine's · 200 sh"; after cancelling: "ENGINE RE-ENTRY PAUSED · same setup ×" |
| Engine's position | "700 @ $1.79 · +$56.00 · RISK LINE $1.72 · engine manages exit"; BUY "in position"; "OVERRIDE EXIT · 🔒 hold 1 s" |
| Opened outside the platform | "YOURS · OPENED OUTSIDE PLATFORM"; BUY "in position"; SELL/EXIT one click |
| EXIT NOT FILLED | "EXIT NOT FILLED · bid below $7.52 · 172 sh left"; "SELL LOWER TO $7.48 · one click" |
| Halted | "HALTED · 2:40 elapsed · no official resume time yet"; exit button "HALTED"; pressing it queues the exit → "COVER PENDING · sends when trading resumes" (SELL/EXIT PENDING for a long) |
| Closed | "CLOSED · +$64.00 · 100 sh sold @ $13.04 · yours" for about 5 s (TEST), then "No position"; the card stays open |
| Hard daily limit | "HARD LIMIT — NEW ENTRIES BLOCKED · exits OK"; BUY "blocked · hard limit" |
| Intraday margin call | "MARGIN CALL · $412 · BUY/SHORT blocked" + "EST. SELL 61 ABCD TO CURE MARGIN" (runs only on your click); SELL/EXIT active |
| NOT SAFE TO TRADE | "ALPACA EXECUTION UNAVAILABLE · orders can't be sent"; all buttons "can't send"; "Manual backup: use Alpaca directly" only when only our link failed. With Massive stale instead: BUY/SHORT refused, exits available |
| One stock out of sync | "ABCD BLOCKED — BROKER SYNC · platform 300 · Alpaca 400"; SELL/EXIT uses Alpaca's 400 |
| UNKNOWN order | "UNKNOWN · checking with Alpaca · sell 100 sent 07:50:02"; BUY "waits for Alpaca"; SELL/EXIT "checking…" |
| Not eligible | the four buttons are replaced by "NOT ELIGIBLE FOR PLATFORM TRADING · OTC stock · not tradable at Alpaca · data only" |
| Size limited / FULL CAP | amber box "312 sh · $1,000 cap"; FULL CAP selected → amber frame, "= up to $2,318" |
| AUTO ON | size bar dimmed "Not used while AUTO is on · the engine sizes its own trades"; BUY/SHORT "AUTO ON"; your exits active |
| SHORT wording | Phase 1 "SHORT · off · long-only" (the SHORTS OFF state) → Phase 3 "SHORT LMNO · 400 sh" or "SHORT · no borrow" |
| Just opened | all four buttons hatched "opening…" for about 0.5 s |
| Order statuses | RISK CHECK… → SENT → WORKING 583 @ ≤ $2.24 · CANCEL → PARTIAL 300 / 583 → FILLED · NOT FILLED · price ran above $2.24 · REJECTED · reason · UNKNOWN · checking with Alpaca · CANCELLED · by you |

## 5.3 Acceptance checks — thin bar and trade card

- **TB-01** Every separate window shows the thin bar and alert line; ← MAIN WINDOW and F2 bring the main window forward instantly.
- **TB-02** STOP AUTO works in one click from every window; Turn AUTO on / Resume AUTO are not available outside the main window.
- **TB-03** In every T1 state nothing wraps, FLATTEN ALL stays fully visible, and the safety states stay visible; shrinking follows the four steps in order.
- **TB-04** Chips appear only for the defined stock group (including engine positions), EXIT? first, max 3 + "+N more"; a chip click opens the trade card.
- **TC-01** Clicking any ticker or chip opens the card; nothing is ordered until a button on the card is clicked; buttons are locked during the opening lock.
- **TC-02** Every state in the C2 table appears with the exact wording and the same behavior as the strip card, Level 2 panel and Stock detail.
- **TC-03** Closing the card (✕ / Esc) never cancels or changes an order.
- **TC-04** A card opened from Review or historical AI context is headed "LIVE CARD · CURRENT MARKET" with the current time, and the replay pauses.
- **TC-05** One card at a time; it never covers the top bar or alert line; it can be dragged.

![T1 — Thin top bar in every separate window: six states fit-tested at 1536 px, with the rules.](mockups/T1_Thin_top_bar_every_window.png)

![C1 — Pop-up trade card: ABCD clicked in News & Catalysts (yours, buy partly filled and still working, PAPER, AUTO OFF).](mockups/C1_Trade_card_in_News.png)

![C2 — Pop-up trade card: states and examples (ownership, exits, blocks, size, AUTO, SHORT wording, opening, order status).](mockups/C2_Trade_card_states.png)
