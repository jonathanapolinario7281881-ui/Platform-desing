# 4. The main window

**Purpose:** see what is happening and act in seconds. Always open, never closes. Mockups M1 (AUTO OFF), M2 (AUTO ON), M3 (Windows menu open), M4 (states), M5 (worst case, LIVE), M6 (top bar fit test).

## 4.1 Layout at 1536 × 864

| Area | Position and size (CSS px) | Holds |
|---|---|---|
| Top bar | full width, height 48 | Platform state and emergency controls (4.2) |
| Alert line | full width, height 22, directly under the top bar | Latest alert (3.4) |
| Left column "Stock lists" | x 8, y 78, 698 px content (700 with border), 778 high | Search, My list on top, Ranked 50 below (4.3) |
| Order size bar | right of the list, y 78, about 32 high | Your preset size (4.4) |
| Three Level 2 panels | y 118, 265 wide each, 442 high, 8 px gaps, fixed places L2·1 · L2·2 · L2·3 | Full book for the three slot stocks (4.5) |
| Strip "SELECTED STOCK + OPEN POSITIONS" | y 568, 812 wide, 288 high; cards 192 × 246; exit buttons 176 × 36 | Selected stock + every open position (4.6) |

Nothing scrolls horizontally except the strip's own slide bar. Padding 8 px between areas.

## 4.2 Top bar (left to right)

| # | Element | Normal | Other states (exact wording) |
|---|---|---|---|
| 1 | PAPER / LIVE | "PAPER" (calm blue) | "LIVE — REAL MONEY" (red) + a thin red frame around the whole window. PAPER → LIVE: hold 2 s + PIN + start-up checks. |
| 2 | AUTO block | "AUTO OFF — YOU TRADE" + button "Turn AUTO on · hold 2 s" | "AUTO ON — ENGINE CAN TRADE" + "STOP AUTO · one click" · "AUTO PAUSED — GAVE BACK $500" / "AUTO PAUSED — SOFT LIMIT" + "Resume AUTO · hold 2 s" · "AUTO BLOCKED — reason" while the cause lasts (short reason word: ALPACA, MASSIVE, CLOCK, BROKER SYNC, ORDER LIMIT, HARD LIMIT, MARGIN CALL; the full reason is in the alert line), no button. When the cause clears: a verified recovery lets AUTO continue by itself; otherwise "AUTO STAYS BLOCKED — press Resume AUTO · reason" + "Resume AUTO · hold 2 s" (chapter 12.7). Never by itself after a margin call, the hard limit, FLATTEN ALL, your STOP AUTO, an unresolved broker mismatch, or a soft / give-back pause. |
| 3 | Session + clock | "PRE-MARKET · 07:42:18 ET" | REGULAR, AFTER-HOURS, MARKET CLOSED |
| 4 | EQUITY | whole dollars ("$5,233"), cents on hover | — |
| 5 | DAY P&L | "+$233.00 · +4.66%" (green / red), never blinks | Same number the loss limits use |
| 6 | CASH / TOTAL BP | stacked in one block, whole dollars | Total BP = Alpaca's buying power (at 1× = cash); the order-size system works out what can really be bought for a stock. Turns red during an active INTRADAY MARGIN CALL. |
| 7 | LOSS LIMIT meter | grey bar "$0 / $600" with a tick at the soft level | amber "SOFT LIMIT" (full sentence in the alert line and hover) · red "HARD LIMIT". Hover: soft and hard amounts, today's high and give-back, "lower today, raise from tomorrow". |
| 8 | Health | word + dot "HEALTHY" | "DEGRADED" · "NOT SAFE TO TRADE"; hover shows the three main connections; click opens System Health |
| 9 | Ask AI ↗ | opens the AI Assistant | — |
| 10 | Windows ▾ | opens the menu (4.8) | — |
| 11 | FLATTEN ALL | red, "hold 1 s", far right | holding → "FLATTENING… 3 of 5 closed" → "FLATTEN COMPLETE — ALL POSITIONS CLOSED" or "FLATTEN INCOMPLETE — 1 POSITION PENDING · ABCD · HALTED · 4:18 elapsed" |

- The "TRADING PLATFORM" title is dropped (the window has a name). Nothing in the top bar may wrap or shrink, and FLATTEN ALL can never be pushed off the edge. Fit-tested with the longest states (M6): LIVE — REAL MONEY + AUTO BLOCKED + NOT SAFE TO TRADE + −$1,234.56 Day P&L + HARD LIMIT; and AUTO PAUSED + Resume AUTO + DEGRADED + SOFT LIMIT. FLATTEN ALL ends 10 px from the edge in all states.

## 4.3 My list and the Ranked 50 (left column)

**Structure** — search box ("Search any stock…" — type any ticker to load it into the Selected card), then two parts with no tabs:

- **MY LIST** on top (title bar "MY LIST · 5 · your pinned stocks in rank order · a blinking one moves to the top"), about 6 rows visible with its own scroll.
- **RANKED 50** below (title bar "RANKED 50 · best opportunity at the top · ★ = also on My list").
- Each part has its own column-title row directly above its stocks; title rows stay in view while rows scroll.
- Footer: the legend (blinks, NEWS letters, ★, AI verdicts, VWAP colors, SPR boxes, re-sort note). The one-line "latest change" moved to the alert line.

**Columns (all 14 always show; there is no column chooser):**

| Column | Content |
|---|---|
| RANK | 1 = best. ▲28 = places jumped. My list shows the stock's rank among all ~8,000 scored stocks (e.g. 212). |
| SYMBOL | Ticker box (blinks per 3.3), ★ if on My list, HALT tag when halted, NEW tag for a stock that just entered the Top 50 from outside (20–60 s, TEST) |
| NEWS | A–D centered in its own narrow column so letters line up; bright / dim; "–" none; hover = exact age + headline preview |
| SIDE | L = long setup, S = short setup |
| PRICE · CHG | Last price, day % change |
| VOLUME · FLOAT · TRADES | Full digits (fit up to 999,999,999 / 9,999,999) |
| RVOL | Relative volume, e.g. 18.2x |
| VWAP | The VWAP price; green when price is above, red when below |
| SPR | Spread in dollars (3 decimals under $1); amber outline box when wide, filled red box when very wide (starting 1% / 2% of price, TEST); hover "WIDE · 2.8% of price" |
| AI | GO / CAU / NO badge; dashed when older than 3 min |
| L2 | L2·1 / L2·2 / L2·3 on the stock that holds a slot |

Layout detail: 4 px cell padding, each column only as wide as its content, same text size as the rest of the screen.

**Behavior**

- The Ranked 50 shows the engine's opportunity order, any price, long and short setups, earned by opportunity (no quotas; penny stocks emphasized, float one weight among many). All 50 are live and tradable.
- Rows re-sort on screen about once a second (TEST) and slide to their places; prices, volume and signals update live inside the rows; the engine ranks at full speed.
- **Hover freeze:** while the pointer is over the list (My list too), only the row order pauses; a small line shows "RANK VIEW PAUSED · ENGINE LIVE · 3 rank changes pending".
- **Out-of-view signal marker:** when a signaling stock is off screen, "▲ SIGNAL ABOVE · ABCD #4"; click jumps to it.
- Column titles are labels only — no sorting by column.
- **Click** = load into the Selected card. **Double-click** = Stock detail. No pop-up trade card from the main list.
- **Selection sticks to the ticker**, not the rank, until you pick another stock.
- **☆ pin:** hovering a row shows ☆ in its own click area; clicking adds the stock to My list (☆ → ★). It never selects or trades.
- **My list** (about 10–20 stocks, TEST): pinned stocks join the engine's close-study group (full analysis, AI pre-analysis, blinks, can get a Level 2 slot); they never drop out because of rank; in rank order (best first); a My list stock with an active signal moves to the top of My list only while the signal lasts; pinning or blinking never moves a stock between the two lists. AUTO OFF: you trade them; AUTO ON: the engine may trade them only on a valid setup, and a position it opens is the engine's.
- Everything here is display only and never slows or changes the engine's ranking.

## 4.4 Order size bar

"YOUR ORDER SIZE" · 10% · 25% · 50% · $2,000 · FULL CAP · "= $1,308" · "25% of equity · used by every BUY and SHORT button". Rules in section 2.9 (FULL CAP amber frame, shares from the ceiling, LIMITED box, one size everywhere, start-up rule). AUTO ON: dimmed, "Not used while AUTO is on · the engine sizes its own trades".

## 4.5 The three Level 2 panels

**Slots:** the engine assigns the three stocks where the full book matters most (usually ranks #1–3; a fast mover can take a slot). A newcomer takes a slot only when clearly more urgent than the weakest panel stock for a moment; a stock keeps its slot a minimum time (anti-thrashing, TEST). Panels stay in fixed places and never reshuffle by rank; they never slide. Losing a slot never removes a stock: it stays live and tradable in the list, the engine keeps watching it, a held stock keeps its exit in the strip.

**Each panel, top to bottom**

1. Header: slot chip (L2·1), rank (#1), ticker box (blinks), signal text ("▲ strong up"), PIN control.
2. Price line: price, % change, LONG / SHORT setup, "NEWS A · 11m" (exact age) in a fixed spot.
3. SPR in dollars with the box rule; volume, or the swap note.
4. Chart: 1-minute candles, VWAP, volume; engine marker ("Engine would have bought here" in AUTO OFF; "Engine bought here · $2.13" in AUTO ON); your entry and STOP lines if you hold it; "RISK LINE $1.72" if the engine holds it (where the trade's idea is proven wrong — not a promised exit price).
5. Pressure bar: "BIDS 64% · 36% ASKS" (visible book pressure only).
6. Book: 5 asks, spread, 5 bids with sizes; column titles BID SZ · PRICE · ASK SZ; unusually large orders (for that stock) get a white box ("big order showing", not guaranteed support).
7. Time & Sales: latest trades to the millisecond; green at the ask, red at the bid; unusually large prints in bold; a bold 30,000 print never touches its price.
8. Engine line: state + main reason (e.g. "Engine Acceleration · asks consumed, trades ×4").
9. AI line: GO / CAUTION / NO-GO + main reason + age; click opens the full analysis on Stock detail.
10. Position line: "No position", or side, shares, average, P&L $ and %, owner, stop if set.
11. Four fixed buttons: BUY · SELL/EXIT · SHORT · COVER.

**Four buttons (always the same places; greyed when not applicable, never removed; one click, no pop-up)**

| Situation | BUY | SELL/EXIT | SHORT | COVER |
|---|---|---|---|---|
| No position, AUTO OFF | "BUY ABCD · 584 sh" (amber box if LIMITED) | — | Phase 1: "SHORT · off · long-only" · Phase 3: shares or "no borrow" | — |
| You hold it long | "in position" | active, sells all | — | — |
| You hold it short (Phase 3) | "in position" | — | — | active, covers all |
| The engine holds it | "in position" | 🔒 "OVERRIDE · hold 1 s" (hover and audit log: "OVERRIDE EXIT WXYZ") | — | 🔒 if short |
| Engine entry working | "AUTO ON" / locked | 🔒 engine's | — | — + "CANCEL ENGINE ENTRY · hold 1 s" on the card |
| Your entry working | "order working" | — | "order working" | — |
| AUTO ON, no position | 🔒 locked | — | 🔒 locked | — |
| Halted | locked | "HALTED · 2:40 elapsed" — pressing it queues the exit: "SELL/EXIT PENDING · sends when trading resumes" | locked | "HALTED" → "COVER PENDING · sends when trading resumes" |
| Hard limit · margin call · Massive stale · clock · account-level broker sync | "blocked · reason" | exits stay available | blocked | exits stay available |
| NOT SAFE caused by Alpaca (connection lost / outage / cause unknown) | "can't send" | "can't send" ("Manual backup: use Alpaca directly" only with OUR ALPACA CONNECTION LOST) | "can't send" | "can't send" |

- **"in position" means no adding (SETTLED):** while you or the engine hold the stock, BUY reads "in position" (exact wording, lowercase) and cannot add shares; there is no adding to an open position from the buttons for now (section 2.10).

- **Swap sequence:** the engine switches the IBKR feed immediately (the screen never delays it); the header shows "Swapped in · was #30 · replaced EFGH" with a short border highlight (not a blink); the four buttons lock about 0.5–1 s (TEST), visibly shaded, and switch to the new ticker ("BUY WXYZ"). No hover freeze on panels.
- **Pin (AUTO OFF only):** pin at most one panel to its stock so it is not swapped away ("PINNED" in yellow); it stays until you unpin or close that manual position. When AUTO turns on the pin is released: "Pin released · AUTO ON".
- **Level 2 drops:** the panel shows "LEVEL 2 UNAVAILABLE"; Health DEGRADED; manual trading continues while regular data is healthy; only Level 2 strategies switch off.
- Double-click the ticker opens Stock detail.

## 4.6 The strip "SELECTED STOCK + OPEN POSITIONS"

**Core rule:** every selected or held stock always has its own card with full controls. Trading never depends on having a Level 2 panel.

- **Order:** Selected card → your positions (YOURS) → a thin divider labeled ENGINE'S → the engine's positions. Within each group, cards keep the order they were opened and never shuffle.
- **Selected card:** ticker (blink), LONG/SHORT, price and change, NEWS letter with age, SPR box, AI badge, rank (and L2 slot if any, or "no Level 2 slot"), small chart, engine state, last two trades, BUY / SHORT sized by the preset ("LIMITED BY CAP" when a hard limit applies).
- **Position card:** the same plus shares, average, P&L $ and %, owner badge (YOURS white, ENGINE'S teal), the engine's read (pink EXIT? on yours), and the exit button.
- **Exits:** one click SELL/EXIT or COVER on yours (also in AUTO ON). Engine cards: exit locked with a padlock, "RISK LINE $1.72 · engine manages exit" and the risk line on the chart; "OVERRIDE EXIT · hold 1 s". While an engine entry is working, its card shows "CANCEL ENGINE ENTRY · hold 1 s" (only the unfilled rest; filled shares stay the engine's; then "ENGINE RE-ENTRY PAUSED · same setup ×").
- **Halted:** "HALTED · 2:40 elapsed" on the chart and the button. After FLATTEN ALL a halted stock's card shows "FLATTEN PENDING".
- **Optional stop (your cards only):** "+ STOP"; once set "STOP $1.95" with move and ×, and a dashed yellow line on the chart.
- **Order status on the card:** "WORKING 878 @ ≤ $1.49" + CANCEL → "PARTIAL 300/878" → FILLED, or "REJECTED · reason", "NOT FILLED · price ran above $x", "EXIT NOT FILLED · bid below $11.80" + "SELL LOWER TO $11.75". No duplicate cards: when a buy fills, the Selected card becomes the position card in the YOURS group, stays highlighted as selected, and the strip slides to it with a short highlight.
- **Closed card:** stays about 5 s (TEST) showing "CLOSED · +$64.00 (engine)" before leaving.
- **Fit:** four cards fully visible. More positions: slide bar "4 of 7 shown · slide for more"; an **edge marker** lights up when a hidden card has an alert (EXIT?, halt ending, stop hit), e.g. "IJKL · EXIT? ▸", and jumps to it on click. **Cards / List** switch: List shows every position as a thin row with its own exit button.
- Header: "CANCEL ALL ENTRIES (3)" when 2+ entries are working · "Positions & Orders ↗".
- Last two trades stay on each card as long as they never crowd out P&L, owner, exit, stop or order status.

## 4.7 Emergency and intervention controls

| Control | What it does | What it never does |
|---|---|---|
| STOP AUTO (one click) | Stops new engine entries; cancels the engine's pending entries (only the unfilled rest; filled shares become an engine position it keeps managing) | Never closes positions; engine exits and protective orders keep working |
| CANCEL ALL ENTRIES (n) (one click) | Cancels every unfilled BUY/SHORT, yours and the engine's | Never touches positions, exits or stops; a cancelled entry is not resubmitted unless a genuinely new trigger appears |
| CANCEL ENGINE ENTRY (hold 1 s) | Cancels one working engine entry's unfilled shares; logged; same-setup re-entry paused | Never sells filled shares |
| OVERRIDE EXIT (hold 1 s) | Closes one engine position; AUTO and other engine positions keep running; logged as a human intervention (hover and log text "OVERRIDE EXIT WXYZ"); counted separately in You vs Engine; same-setup re-entry paused until you click the tag "ENGINE RE-ENTRY PAUSED · same setup ×" or a genuinely new validated setup appears | Not a day block; you can always trade the stock yourself |
| FLATTEN ALL (hold about 1 s) | Freeze new automatic entries → cancel working entries → exits for all positions → watch acknowledgments and fills → retry and reconcile → list anything still open → keep AUTO blocked until broker and platform agree → report the final state | Never reports false success; FLATTEN COMPLETE only after reconciliation with Alpaca shows zero positions; AUTO stays off until you turn it on |

- A halted stock keeps a flatten-pending instruction and is sold as soon as trading can happen again; then "FLATTEN COMPLETE — ALL POSITIONS CLOSED". If it still can't be sold it stays marked unresolved.
- FLATTEN ALL exists even though the engine protects itself: for the engine freezing or misbehaving, bad data it doesn't know is bad, or something only you know.

## 4.8 Windows ▾ menu

"OPEN A WINDOW", seven entries in this order: **Stock detail page** (or double-click a stock) · **AI Assistant** (or Ask AI) · **Positions & Orders** · **Review** (Journal · Replay · Performance) · **News & Catalysts** · **System Health** (or the health word) · **Settings**. Each line has a one-line description (mockup M3). Opening a window never closes the main window.

## 4.9 Acceptance checks — main window

- **MW-01 Mode invariance:** switching AUTO changes only button locks and labels; layout, engine, AI and data are unchanged.
- **MW-02 One click:** in AUTO OFF, BUY on any panel or the Selected card sends a correctly sized protected order with one click and no pop-up.
- **MW-03 Order size:** presets compute shares from the protected ceiling, grow with equity, never exceed buying power or caps, use cash only where required, and show LIMITED with the reason.
- **MW-04 Ownership:** engine positions stay engine-managed after AUTO OFF; your positions stay yours after AUTO ON; buttons lock and unlock accordingly.
- **MW-05 Every position reachable:** every open position always has a card with a working exit (or a locked one plus OVERRIDE EXIT for the engine's), whatever happens to the Level 2 slots, including with 7+ positions (slide bar, edge markers, List view).
- **MW-06 No wrong-stock clicks:** hover freeze works; panel buttons lock after a swap; tickers are printed on entry buttons; selection sticks to the ticker.
- **MW-07 Signals:** blinks appear immediately from engine events, never delay order sending, follow the 5 s → solid → plain rule, and each has a symbol or word.
- **MW-08 My list:** pinned stocks get full analysis, stay listed regardless of rank, stay visible without tabs, move to the top only while signaling, and do not measurably slow the engine.
- **MW-09 NEWS letters:** every letter sits exactly under the one above; panels and cards show "NEWS A · age" in the same spot; bright under about 1 hour, dim after.
- **MW-10 Top bar fit:** at 1536 × 864 with the longest states nothing wraps, nothing scrolls horizontally, FLATTEN ALL stays fully visible at the right.
- **MW-11 Alert line:** priority order holds; SEEN stops only the sound; the line never moves other elements; history lists every alert with seen / resolved.
- **MW-12 Emergency controls:** each control does exactly what the table in 4.7 says and nothing more; every use is logged; FLATTEN never reports success before Alpaca shows zero positions.
- **MW-13 Laptop fit:** the main window fits the real laptop screen without horizontal scrolling (final scaling confirmed on the laptop).
- **MW-14 No adding:** while a stock is held (yours or the engine's), its BUY reads "in position" everywhere its buttons appear, and no click — including a second click right after a fill — sends an order that adds shares.

![M1 — Main window, AUTO OFF (PAPER, 07:42). Shorts are drawn with Phase 3 appearance; in Phase 1 SHORT reads "SHORT · off · long-only".](mockups/M1_Main_window_AUTO_OFF.png)

![M2 — Main window, AUTO ON: entry buttons lock, your exits stay active, the engine's positions show OVERRIDE (hold 1 s), "Engine bought here".](mockups/M2_Main_window_AUTO_ON.png)

![M3 — Main window with the Windows ▾ menu open (7 windows).](mockups/M3_Main_window_Windows_menu.png)

![M4 — Main window states: alert line levels, AUTO / loss-limit / health / PAPER-LIVE states, FLATTEN ALL sequence, card and button emergency states, blink sequence and colors.](mockups/M4_Main_window_states.png)

![M5 — Worst case in LIVE: AUTO BLOCKED — ALPACA, NOT SAFE TO TRADE, HARD LIMIT, Critical alert line with "+1 more", red LIVE frame.](mockups/M5_Main_window_worst_case_LIVE.png)

![M6 — Main top bar fit test at 1536 px: normal AUTO OFF, AUTO ON, worst case blocked, worst case paused.](mockups/M6_Main_top_bar_fit_test.png)
