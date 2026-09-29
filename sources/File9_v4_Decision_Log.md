> **About this file.** This is the complete decision log for File 9 v4: every proposal, review round and approval, with dates. It is the history and the reason behind each rule. **Build from the Master Specification** (File9_v4_Master_Specification.docx / .pdf / .md) **and Engine_v4_Current_Requirements**, which state the final settled rules (source order: Master section 1.3). File names mentioned inside this log (v4_draft/…, comparison PDFs) refer to working drafts during the design; the final mockups are in the folder `mockups/` (see the Master Specification, Appendix A).

# File 9 — Decisions waiting for version 4

Running log started September 24, 2026. Every decision settled after File 9 version 3 goes here. File 9 version 4 will be built from this log once the other layers of the platform makeup are settled too.

Status labels: **SETTLED** = decided by Jonathan · **OPEN** = starting value, decide by testing or ask Jonathan · **TO CONFIRM** = waiting for Jonathan's answer.

---

## 1. Top bar — SETTLED

| # | Item | Decision |
|---|------|----------|
| 1 | PAPER / LIVE | Shows "PAPER" or "LIVE — REAL MONEY"; LIVE is unmistakable (red frame). PAPER → LIVE needs a confirmation. LIVE is only available when the startup checks pass: broker connected, correct account, market data healthy, risk engine healthy, positions and orders reconciled, clock synchronized, no critical feed failure. No confirmation on each trade once LIVE. |
| 2 | AUTO | Wording "AUTO OFF — YOU TRADE" / "AUTO ON — ENGINE CAN TRADE". AUTO OFF never stops the analysis. The safety system can force "AUTO BLOCKED — reason". Hold 2 s to turn on, one click to stop (unchanged from File 9). |
| 3 | Session + clock | "PREMARKET · 07:42:18 ET", then REGULAR, AFTER HOURS, MARKET CLOSED. |
| 4 | Equity | Keep as is. |
| 5 | Day P&L | Dollars and percent, e.g. "+$438.27 · +1.76%". Never blinks. |
| 6 | Money | Two numbers: **Cash available** and **Total buying power**. The order-size system works out what can really be bought for the selected stock (cash only for non-marginable stocks). |
| 7 | Daily risk meter | In dollars: "$318 / $600". When reached: "DAILY LIMIT REACHED — NEW ENGINE ENTRIES BLOCKED" — updated by the two-level limit in section 3: soft = amber "SOFT LIMIT REACHED · AUTO PAUSED", hard = red "HARD LIMIT — NEW ENTRIES BLOCKED · exits OK". Exact wording checked at the Buttons and signals layer. Tied to the hard risk engine. The meter itself was accepted as a suggestion; the dollar format is agreed. |
| 8 | Health | In words: HEALTHY / DEGRADED / NOT SAFE TO TRADE. Click opens System Health. |
| 9 | Ask AI | Keeps the label "Ask AI" (not just "AI"). |
| 10 | Windows ▾ | Keep. **Journal & Replay and Performance merge into one "Review" window** with tabs Journal · Replay · Performance (the menu goes from 8 to 7 windows). |
| 11 | FLATTEN ALL | See section 4. |

## 2. Order size — concept SETTLED, exact values OPEN

- Your manual presets are **predictable sizes you choose**. Working concept: **10% equity · 25% equity · 50% equity · $2,000 · FULL CAP**. Exact values are not locked yet.
- **MAX is removed** from LIVE and replaced by **FULL CAP** = the most the platform currently allows for this stock and account state (not all buying power).
- Every preset is capped by hard limits: per-stock cap, cash / eligibility for that stock, concentration, current exposure, liquidity (how much can trade without moving the price), buying power. The button then says, for example, "50% EQUITY → LIMITED TO $3,850" or "LIMITED BY POSITION CAP".
- The cap for manual trades uses only known limits, because manual trades have no engine stop to size from.
- The engine sizes its own AUTO trades dynamically from risk (stop distance, volatility, liquidity, exposure, risk budget).

## 2b. Order size bar — SETTLED (approved by Jonathan Sept 25, with the two revisions below)

Claude's proposal, reviewed by ChatGPT. Preview: Order_size_bar_preview.png.
1. Five buttons: 10% · 25% · 50% · $2,000 · FULL CAP (MAX gone). Readout "= $1,308" plus "25% of equity · used by every BUY and SHORT button".
2. Every BUY/SHORT button shows its real share count after all limits. If a stock's own cap is lower than the chosen size, the share count gets an amber box, the panel/card line says "SIZE LIMITED TO $1,000", and hovering gives the reason (liquidity, position cap, cash only, short margin). Still one click, no pop-up.
3. FULL CAP selected: amber frame on the bar and an amber button as a reminder. Readout "= up to $2,318 · the most the limits allow · lower for some stocks". No confirmation.
4. Shares are whole shares, rounded down, never above the chosen amount (see revision: worked out from the protected price ceiling).
5. One size for the whole platform: the pop-up trade card and Stock detail use the same size, and changing it anywhere changes it everywhere.
6. Changing the size never changes an order that is already working.
7. AUTO ON: bar dimmed, "Not used while AUTO is on · the engine sizes its own trades".
8. Question: at startup, begin on the smallest size every time, or remember the last choice? Claude's pick: always start on the smallest in LIVE; remember in PAPER.
9. Exact preset values and per-stock cap numbers stay OPEN (Settings, tuned in paper testing).

**Revisions after ChatGPT's review (approved):**
- Point 4 replaced: shares = chosen amount ÷ the protected price ceiling (not the price at the click), so even a fill at the ceiling can't go over the chosen amount or a hard cap. Example: $1,308 with a $2.24 ceiling = 583 sh (not 611).
- Point 8 settled as: first LIVE start of the day → smallest preset; PAPER → remember the last choice; a reload or reconnect during the same session keeps the current size.

## 2c. Manual order execution (AUTO OFF) — SETTLED (approved by Jonathan Sept 25; numbers OPEN)

- Your click decides the trade. The execution engine only works on getting the fill; it does not re-judge the setup (strategy authority stays with you).
- It may still refuse or stop for hard safety reasons only: halt, stale or broken data, not enough buying power, broker won't allow the stock, or the price passing the protected ceiling. The hard daily loss limit is also on this list (section 3); the soft limit and the give-back safeguard are not.
- BUY sends a limit order at about the ask, never a blind market order (outside 9:30–4:00 IBKR takes only limit orders anyway).
- If not filled, it raises the price in small steps for a few seconds, never above a protected ceiling.
- The ceiling is dynamic (percent, not fixed cents; adapts to spread, volatility and liquidity) but can never go past Jonathan's personal maximum slippage set in Settings. 10 cents is 8% on a $1.24 stock but under 1% on a $12 stock. Exact rules OPEN (paper testing).
- If the price runs past the ceiling: cancel and show "NOT FILLED · price ran above $2.24". Shares already filled are kept (PARTIAL).
- The card shows the ceiling while working, e.g. "WORKING 583 @ ≤ $2.24" with CANCEL.
- SHORT works the same way with a floor instead of a ceiling.
- NEW decision (not inherited from FLATTEN ALL, whose order mechanics are still OPEN): normal manual exits use protected stepping — more aggressive than entries, stop at an exit boundary, alert. Halted or untradeable: the exit stays working/pending and the card says exactly why. Exit boundary wider than entry ceiling, own maximum in Settings. Numbers OPEN.
- SELL LOWER: at the boundary the card says "EXIT NOT FILLED · bid below $1.80" and the button shows the exact next price, "SELL LOWER TO $1.75". The click replaces the remaining exit order with that limit; it applies only to shares not yet sold. Nothing sells below the boundary without his click. Short positions mirror it (COVER HIGHER TO $x).


## 3. Ownership and safety — SETTLED

- **Strategy authority:** the engine never takes over or exits a position Jonathan opened.
- **Account safety authority:** hard controls may block **new** risk, but never close Jonathan's positions on their own.
- A Jonathan-owned position closes only by: his manual exit, **his optional stop**, FLATTEN ALL, or a forced liquidation by the broker or exchange.
- **Daily loss limit — SETTLED (approved by Jonathan Sept 25; replaces the earlier "never blocks manual buys").** Two levels. Soft limit: AUTO stops opening trades + strong warning, manual entries still allowed. Hard limit: all new entries blocked, including manual BUY/SHORT; exits always allowed. Hard limit set in Settings; during the trading day it can be lowered but not raised (a raise takes effect the next trading day). Claude's addition: both limits count the whole day's result, closed trades plus open losses, the same number as the top bar's Day P&L. Hard limit blocks all new risk for the rest of the day, including adding to an existing position; existing positions can always be exited or managed. Dollar amounts OPEN.
  - **Give-back safeguard — SETTLED (soft level only):** the platform tracks the best Day P&L of the day. If you give back a set amount from that high (e.g. up +$600, now +$100 = $500 given back), it acts like the soft limit: amber warning "GAVE BACK $500 FROM TODAY'S HIGH +$600 · AUTO PAUSED" and AUTO stops opening trades (it keeps managing its open positions); manual trading still allowed. AUTO stays paused until Jonathan turns it back on himself, like after FLATTEN ALL (never restarts on its own). It never blocks you while you are still up; only the hard loss limit blocks. Amount OPEN (paper testing).
- **Optional stop on manual trades:** never on by default. Jonathan adds it after entry (for example a "+ STOP" button on the card or trade card). It shows as "STOP $1.95" on the card and as a line on the chart, and can be moved or cancelled any time. Where the stop lives (at IBKR, on our server, or both) is OPEN and decided in the stop/execution design; the screen only says "STOP $1.95". A stop does not guarantee its price: outside 9:30–4:00 it generally needs a stop-limit, which may not fill in a fast drop, and a halted stock can reopen below the stop (behavior checked in paper testing).

## 4. FLATTEN ALL — SETTLED (numbers OPEN)

- **Press and hold about 0.75–1 second**, with a bar that fills while you hold. Releasing early does nothing.
- **Procedure:** freeze new automatic entries → cancel working entry orders → send exits for all positions → watch acknowledgments and fills → retry and reconcile → list anything still open → keep AUTO blocked until the broker and the platform agree → report the final state.
- **Never reports false success.** Example: "FLATTEN INCOMPLETE — 1 POSITION PENDING · ABCD · HALTED · 4:18 elapsed".
- A halted stock keeps a **flatten-pending instruction** and is sold as soon as trading can happen again; then an obvious alert: "FLATTEN COMPLETE — ALL POSITIONS CLOSED". If it still can't be sold, it stays marked as unresolved.
- **Order type at the reopen (OPEN, set by paper testing):** a marketable limit that steps down. Starting idea: limit about 5% below the price, lower it one step if not filled within about 2 seconds, stop at a maximum and alert. Also test whether an order entered during the halt can join the reopening auction.
- **FLATTEN ALL execution — SETTLED (approved by Jonathan Sept 25; numbers OPEN):** automatic, not click-by-click. Becomes much more aggressive: repriced marketable-limit orders with a much wider emergency band, never an unlimited market order. Bad/irrational quote or halt: stays FLATTEN INCOMPLETE, resumes automatically when tradable, keeps going until closed and reconciled. Bands, repricing speed and the halt-reopen order type OPEN (paper/replay testing). If a stock is really collapsing (quotes are sane but below the emergency band), the flatten report shows "FLATTEN PENDING · 600 shares remaining" with "SELL LOWER TO $1.62" (short: "COVER HIGHER TO $2.48") as a manual fallback. Because this goes past the emergency boundary, it needs a short hold (about 0.5 s, filling bar) instead of a click. The ordinary SELL LOWER on a normal exit stays a single click.
- **After FLATTEN ALL, AUTO stays off until Jonathan turns it back on himself.** It never restarts on its own, even after "FLATTEN COMPLETE". (Confirmed by Jonathan.)

## 5. Signals and display — SETTLED

- **Halt marker:** "HALTED · 3:12 elapsed". Show an official resume time only when the exchange publishes one. (Replaces "reopens in 3:12".)
- **News age:** the list keeps the bright/dim A–D letter; hovering over the letter shows the exact age and a headline preview; the Level 2 panels, cards and trade card show the exact age; the Stock detail page shows the full timestamp, headline, source and AI reading.
- **Bright/dim is for Jonathan's eyes only.** The engine judges how long news matters from real data, never from the 1-hour display rule. The 1 hour and the 3-minute "AI verdict is old" threshold are starting values (OPEN).

## 5b. My List + Ranked 50 — SETTLED (approved as one package)

**Layout**
- My List on top, Ranked 50 below, no tabs (two-part left column).
- **Columns, one row per stock, nothing removed:** RANK | SYMBOL | NEWS | SIDE | PRICE | CHG | VOLUME | FLOAT | TRADES | RVOL | VWAP | SPR | AI | L2. Header reads "RANK" (confirmed to fit); the L2 column shows "L2·1 / L2·2 / L2·3". VOLUME, FLOAT and TRADES in full digits, VWAP as a price. Same text size as before.
- **How it fits:** 4 px cell padding instead of 8, each column only as wide as its content, and the left panel 46 px wider (652 → 698 px; each Level 2 panel about 15 px narrower). Preview: Spread_column_preview.png.
- **Big numbers (checked):** TRADES is 64 px and fits up to 9,999,999 (tested with 1,523,418). VOLUME and FLOAT fit up to 999,999,999 (tested with 131,772,904). Display only; no effect on the engine. Preview: Trades_width_preview.png.
- **SPR (spread)** is permanent, in dollars (3 decimals under $1), between VWAP and AI. When the spread is wide compared with the price, the value gets an **amber outline box**; when very wide, a **filled red box** (so the warning is not color alone). Hover shows e.g. "WIDE · 2.8% of price". Thresholds (starting values 1% and 2%) are tuned in testing. The engine also uses spread as a percent of price internally.
- NEWS A–D right after SYMBOL (bright/dim; exact age and headline on hover).

**Behavior**
- Main window clicks: one click loads the stock into the Selected Stock card; double-click opens Stock detail. No pop-up trade card from the main list (it is for the other windows).
- **Selection sticks to the ticker**, not the rank: if ABCD is selected at #4 and falls to #17 or leaves the Top 50, it stays selected until Jonathan picks another stock.
- **No sorting by column title:** titles are labels only; the Ranked 50 always shows the engine's opportunity rank. (A sortable research table could live in another window someday.)
- The Ranked 50 re-sorts on screen about once a second, with ▲ jump numbers; the engine ranks at full speed. Exact screen speed set by testing.
- **Hover freeze:** while the pointer is over the list (My List too), only the row order on screen pauses; prices, volume, signals and the engine stay live. A small line shows "RANK VIEW PAUSED · ENGINE LIVE · 3 rank changes pending".
- **Out-of-view signal marker:** appears only when a signaling stock is off screen, e.g. "▲ SIGNAL ABOVE · ABCD #4"; clicking it jumps to that stock.
- **NEW tag** on a stock that just entered the Top 50 from outside; how long it stays (20–60 s) is set by testing.
- **☆ pin:** hovering a row shows ☆ in its own small click area; clicking it adds the stock to My List (☆ becomes ★). It never selects or trades the stock.
- **Each section has its own column-title row** directly above its stocks: title bar ("MY LIST · 5 · your pinned stocks in rank order…" / "RANKED 50 · best opportunity at the top…"), then RANK | SYMBOL | NEWS … | L2, then the rows. The title rows stay in view while the rows scroll. Costs about one visible Ranked 50 row. (Decided by Jonathan.)
- **My List is in rank order** (best first, e.g. #7, #11, #13, #14, #212), not in the order stocks were added. The number is the stock's rank among all ~8,000 stocks the engine scores. (Decided by Jonathan.)
- **My List signal behavior:** a My List stock with an active signal moves to the top of My List only while the signal lasts, then returns to its place. Pinning or blinking never moves it into the Ranked 50.
- Everything here is display only: none of it changes or slows the engine's ranking.

## 5c. Three Level 2 panels — SETTLED (approved as one package)

**Purpose and slots**
- Three fixed panels show the full order book for the three stocks where it matters most right now: usually ranks #1–3, but a fast mover (e.g. #5 breaking a key price) can take a slot. Each panel shows the stock's rank.
- Panels stay in fixed places (L2·1 left, L2·2 middle, L2·3 right). A stock keeps its panel until it loses the slot; panels never reshuffle by rank. The Ranked 50 shows "L2·1/2/3" on the row of the stock in each panel.
- The engine assigns slots. A newcomer takes a slot only when clearly more urgent than the weakest panel stock for a moment, and a stock keeps its slot a minimum time (anti-thrashing; numbers by testing).
- Losing a slot never removes a stock: it stays live and tradable in the Ranked 50, the engine keeps watching it with trade/quote data, and a held stock keeps its exit button in the strip.
- Extra Level 2 capacity bought later is used by the engine behind the scenes; the screen stays at three panels.

**What each panel shows (top to bottom)**
1. Header: slot, rank, ticker (blinks on a signal), signal text, PIN control (see below).
2. Price line: price, % change, LONG/SHORT setup, NEWS A–D with exact age (e.g. "NEWS A · 11m").
3. SPR in dollars with the same amber/red box warning as the list; volume or swap note.
4. Chart: 1-min candles, VWAP, volume, engine marker ("Engine would have bought here" / AUTO ON: "Engine bought here · $2.13"). If Jonathan holds it: his entry and optional stop as lines. If the engine holds it: a "RISK LINE $1.72" (the level where the trade's idea is proven wrong) — not a promised exit price.
5. Buy/sell pressure bar above the book: "BIDS 62% · ASKS 38%".
6. Level 2 book: 5 asks, spread, 5 bids with sizes; column titles BID SZ | PRICE | ASK SZ ("LEVEL 2" title dropped because the panel header already says L2·n, and it no longer fit after the list widened). Unusually large orders (compared with that stock's normal size) get a box; the highlight means "big order showing", not guaranteed support.
7. Time & Sales: latest trades (ms), green at ask / red at bid; unusually large executed trades in bold. Book and T&S columns tightened so a bold 30,000 print never touches its price.
8. Engine line: state + main reason. 9. AI line: GO/CAUTION/NO-GO + main reason + age; click opens the full analysis on Stock detail. 10. Position line: side, shares, average, P&L $ and %, owner, stop if set.
11. Four fixed buttons (below).

**Swap sequence**
1. The engine switches the IBKR Level 2 feed immediately (the screen never delays it).
2. The header shows "Swapped in · was #30 · replaced EFGH" with a short border highlight (not a blink).
3. The four buttons lock for about 0.5–1 s, visibly shaded, and switch to the new ticker ("BUY WXYZ"). No hover-freeze on panels, because it would delay the engine's data.

**Buttons**
- Always BUY | SELL/EXIT | SHORT | COVER in the same places; greyed when not applicable, never removed. One click, no pop-up.
- BUY/SHORT use the order-size preset and show shares; "LIMITED BY CAP" when a hard limit reduces the size; SHORT shows "no borrow" when not shortable.
- SELL/EXIT and COVER close the whole position. AUTO ON locks BUY/SHORT; exits on Jonathan's positions stay active. Engine positions: exit locked, "engine's". Halted: all locked, "HALTED · 2:40 elapsed".
- **No keyboard hotkeys for orders.**
- Double-clicking the ticker opens Stock detail.

**Pin a panel (AUTO OFF only)**
- In AUTO OFF, Jonathan can pin at most one panel to a stock so it is not swapped away. It stays pinned until he unpins it or closes that manual position.
- When AUTO turns on, the pin is released and the panel shows "Pin released · AUTO ON" (the engine needs all three slots).

**When Level 2 data drops**
- The panel shows "LEVEL 2 UNAVAILABLE"; Health becomes DEGRADED; manual trading still works while regular price/trade data is healthy; the engine switches off only the strategies that need Level 2.

## 5d. Strip "SELECTED STOCK + OPEN POSITIONS" — SETTLED (approved as one package)

- **Core rule:** every selected or held stock always has its own card here with full controls (price, chart, P&L, exit). Trading never depends on having a Level 2 panel.
- **Order of cards:** Selected card → YOUR positions → a thin divider labeled ENGINE'S → the ENGINE'S positions. Within each group, cards keep the order they were opened and never shuffle.
- **Selected card:** symbol and blink, LONG/SHORT setup, price and change, NEWS letter with age, SPR with the box warning, AI badge, rank (and L2 slot if any), small chart, engine state, last two trades, BUY / SHORT sized by the preset ("LIMITED BY CAP" when a hard limit applies).
- **Position card:** the same plus shares, average price, P&L in $ and %, owner badge (YOURS white, ENGINE'S teal), the engine's read (e.g. pink EXIT?), and the exit button.
- **Exits:** one click SELL/EXIT or COVER closes the whole position, no pop-up; works in AUTO ON for Jonathan's positions. Engine cards: exit locked with a padlock, plus "RISK LINE $1.72 · engine manages exit" and the risk line on the small chart. Halted: "HALTED · 2:40 elapsed" on the chart and the button. After FLATTEN ALL, a halted stock's card shows "FLATTEN PENDING".
- **Optional stop:** Jonathan's position cards have "+ STOP". Once set: "STOP $1.95" with move / × (cancel) and a dashed line on the small chart. Engine cards don't have it.
- **Order status on the card:** WORKING (with CANCEL) → PARTIAL 300/611 → FILLED, or REJECTED · reason. No duplicate cards: when a buy fills, the Selected card becomes the position card in the YOURS group, stays highlighted as selected, and the strip slides to it if needed. While an entry order is working, BUY/SHORT for that stock show "order working" and can't be clicked, on the card and everywhere else that stock's buttons appear (Level 2 panel, pop-up trade card, Stock detail), so the same order can't be sent twice by accident. **Approved by Jonathan (Sept 25).**
- **After a buy:** the strip slides to show the new card, with a short highlight.
- **Closed card:** stays about 5 seconds showing e.g. "CLOSED · +$64.00 (engine)" before leaving (duration tuned in testing).
- **Fit:** four cards fully visible (cards narrowed slightly after the list got wider). More positions: slide bar with "4 of 7 shown · slide for more"; an edge marker lights up when a hidden card has an alert (EXIT?, halt ending, stop hit) and jumps to it on click; the List button shows every position as a thin row with its own exit button.
- **Partial exits (SELL HALF / COVER HALF):** not in the main buttons. Maybe later as a secondary action, decided after paper trading.
- **Last two trades on each card:** kept for now; checked in the drawing that they don't crowd out P&L, owner, exit, stop or order status.
- Preview: Strip_preview.png.

## 5e. Consistency rule — SETTLED

- The **pop-up trade card** in the other windows (News & Catalysts, AI Assistant, Journal, etc.) is the same card as in the main window's strip and panels. Every change made to the main-window cards, panels and buttons (NEWS age, SPR box, FULL CAP / LIMITED BY CAP, order status + CANCEL, "+ STOP", HALTED · elapsed, locks) also applies there. The same goes for the four buttons on the Stock detail page and the thin top bar in every window. (Requested by Jonathan.)

## 5f. Signals, colors, sounds and alerts — SETTLED (approved by Jonathan Sept 25, with the revisions below; numbers OPEN)

Claude's proposal, reviewed by ChatGPT. Builds on File 9 section 8 (approved: blink = engine, still badge = AI, a word or symbol with every color, separate sound per event).

**Colors — one job per color**
1. Green = up / buy / profit. Red = down / sell / loss / danger. Purple = short. Pink = EXIT? only. Teal = the engine's positions. Blue = selection and navigation. Grey = halted / unavailable.
2. Amber = "be careful", always with a word: AI CAUTION, wide spread (SPR box), SIZE LIMITED, FULL CAP, soft limit, give-back warning.
3. Yellow = "things you set": My List, ★, PINNED, your STOP line. Fixes: the LIMITED box moves from yellow to amber; big-order boxes in the Level 2 book move from yellow to white (information, not a warning).
4. No price flashing on every tick; only engine signals blink.

**Blinks**
5. Rule kept: blink = engine signal (green ▲, red ▼, pink EXIT?). Problems never blink; they use steady banners + sound.
6. About 1 pulse per second (well under 3 flashes per second, the safe limit for the eyes).
7. The blink is on the ticker itself: the whole symbol box pulses green (▲) or red (▼), not just the arrow (Jonathan asked for this; the mockups already do it). SETTLED (Jonathan, Sept 25): new signal → about 5 s blink → solid green/red box while the signal stays active → plain when the signal ends → blinks again only on a genuinely new trigger (the signal ended and fires again, or clearly strengthens after fading). Anti-flicker: a signal that drops and returns within a few seconds does not count as new (same idea as the sound anti-spam); exact times and the "clearly strengthens" level OPEN (paper testing). Preview: Symbol_blink_preview.png.

**Alert levels**
8. Info (quiet): fills, rank jumps, Level 2 swaps. Attention (sound + amber/pink): EXIT?, soft limit, give-back, partial fill, AI turns NO-GO on a stock you hold. Critical (own sound, repeats about every 10 s until clicked, red banner under the top bar): order rejected, EXIT NOT FILLED, FLATTEN INCOMPLETE, hard limit, IBKR disconnected / needs login, NOT SAFE TO TRADE, halt on a stock you hold.
9. In LIVE, critical sounds can be turned down but not off.

**Sounds**
10. Added events: EXIT NOT FILLED, stop triggered, halt / resume on a held stock, soft / hard limit, FLATTEN COMPLETE / INCOMPLETE.
11. Green/red blink sounds only for stocks that matter to you: My List, the 3 Level 2 panels, the Selected stock and your positions. Other Ranked 50 blinks are visual only (adjustable in Settings).
12. Anti-spam: same stock + same signal sounds at most about once a minute; critical sounds always play.

**Missed alerts**
13. The one-line "latest change" under the list becomes clickable and opens today's alert history (time, stock, what happened). Critical alerts stay there until acknowledged.

**Revisions after ChatGPT's review (approved):**
- Fills are not silent: a short one-time sound when your BUY/SHORT fills and when an exit completes (File 9 v3 already had these sounds; Claude's "fills = quiet" was a slip). Rank jumps and Level 2 swaps stay quiet.
- Rejections split: BUY/SHORT rejected = Attention (no new exposure). SELL/EXIT/COVER rejected or EXIT NOT FILLED = Critical (you are exposed).
- Clicking a Critical alert stops the repeating sound only. The banner stays until the problem is actually resolved (NOT SAFE TO TRADE, FLATTEN INCOMPLETE, held-stock halt, etc.). Click = "I saw this", not "it's fixed".
- Later: a Reduced Motion setting (glow/border instead of pulsing).
- Alert history shows time, ticker, event, and whether it was acknowledged / resolved.
- Claude's addition: the engine's fills (AUTO ON) get their own softer sound, different from yours, so you can hear who traded without looking (on/off in Settings).

## 5g. Emergency controls + top bar redraw + alert placement + other views — SETTLED (approved by Jonathan Sept 25, with the revisions below)

Claude's proposal, reviewed by ChatGPT. Drawn at the v4 build.

**A. Emergency controls**
1. FLATTEN ALL: unchanged (far right of the top bar, red, hold about 1 s; same in every window and on the phone).
2. STOP AUTO: one click (unchanged). Addition: it also cancels the engine's pending entry orders; its open positions keep being managed (File 9 rule).
3. CANCEL ALL ENTRIES: appears in the strip header only when 2 or more entry orders are working, e.g. "CANCEL ALL ENTRIES (3)". One click; cancels only BUY/SHORT orders not yet filled (yours and the engine's). Positions, exits and stops are not touched.
4. APPROVED as OVERRIDE EXIT (final version in the revisions below). Original idea: an emergency exit for ONE engine position. Today its exit is locked for you and only FLATTEN ALL can close it.
5. No keyboard shortcuts for emergency buttons (too easy to hit by accident). F2 back to the main window stays.
6. Connections: laptop offline → nothing stops (the engine lives on the server, per the files); the phone gets "Control panel offline · AUTO ON". Server loses IBKR or data → NOT SAFE TO TRADE, AUTO blocked automatically, Critical alert; your positions are never touched.

**B. Top bar redraw (fit at 1536 px)**
7. Left to right: PAPER / LIVE — REAL MONEY · AUTO block ("AUTO OFF — YOU TRADE" + "Turn AUTO on · hold 2 s", or "AUTO ON — ENGINE CAN TRADE" + "STOP AUTO") · PRE-MARKET 07:42:18 ET · EQUITY · DAY P&L "+$233.00 · +4.66%" · CASH / TOTAL BP stacked in one block · LOSS LIMIT meter · HEALTHY (word + dot) · Ask AI · Windows ▾ · FLATTEN ALL.
8. To fit: drop the "TRADING PLATFORM" title (the window already has a name) and stack Cash over Total BP.
9. Loss meter: "$0 / $600" (today's loss vs hard limit, counting open losses) with a small tick at the soft level. Grey normally, amber past the soft level ("SOFT LIMIT · AUTO PAUSED"), red at the hard level ("HARD LIMIT — NEW ENTRIES BLOCKED · exits OK"). Hover shows soft/hard amounts and today's high + give-back.

**C. Alert placement**
10. One fixed alert line, about 22 px, directly under the top bar, full width. Normally grey, showing the latest event. Amber for Attention, red for Critical, with a SEEN button (stops the sound; the line stays red until the problem is fixed).
11. It never pushes or moves anything (so a button can't jump under your mouse at the moment you click). The "latest change" line under the list moves up here; the list keeps only the legend.
12. Clicking the line opens today's alert history (time, ticker, event, acknowledged / resolved).

**D. Other main-window views**
13. AUTO ON view redrawn to match: AUTO ON wording + STOP AUTO, BUY/SHORT locked, order size bar dimmed, "Pin released · AUTO ON", "Engine bought here · $2.13".
14. Windows ▾ menu with 7 windows: Stock detail · AI Assistant · Positions & Orders · Review (Journal · Replay · Performance) · News & Catalysts · System Health · Settings.

**Revisions after ChatGPT's review (approved):**
- STOP AUTO with a partly filled engine entry: cancel the unfilled rest; the filled shares become an engine position the engine keeps managing. Engine exits and protective orders are never cancelled by STOP AUTO.
- CANCEL ALL ENTRIES: cancelled entries stay cancelled; the engine may not resubmit the same entry unless a genuinely new trigger happens (same "genuinely new" idea as the blink rule). New opportunities in other stocks can still trade.
- Connection loss (replaces point 6's second half): server loses broker or data → block new AUTO entries, cancel eligible pending engine entries, NOT SAFE TO TRADE (Critical). Engine positions follow a fail-safe policy decided in reliability testing (OPEN). Your manual positions are never sold by the strategy because of a disconnect.
- Question 4 — SETTLED as **OVERRIDE EXIT** (name chosen by Jonathan; ChatGPT's option 4 behavior). Hold about 1 s on the engine position's locked exit (button reads "OVERRIDE · hold 1 s" where space is tight; hover and log say "OVERRIDE EXIT WXYZ"). Only that position closes; AUTO and the other engine positions keep running; logged as a human intervention and shown separately in the You vs Engine scorecard. The engine cannot re-enter from the same setup/trigger. NOT a day block: it ends when Jonathan releases it (click the tag "ENGINE RE-ENTRY PAUSED · same setup") or when the old setup has clearly ended and a genuinely new validated setup appears (same "genuinely new" rule as blinks and CANCEL ALL ENTRIES). You can always trade the stock yourself. (Earlier versions — full-day block, clear next day — replaced.)
- Alert line priority: Critical > Attention > Info. A lower alert never covers an unresolved critical one. Claude's addition: with 2+ unresolved criticals, the line shows the newest plus "+1 more".

**After ChatGPT's check of the drawing (Sept 25) — SETTLED (approved by Jonathan Sept 25):**
- Fit test at the real 1536×864 size, including the longest states (LIVE — REAL MONEY + AUTO BLOCKED — IBKR NEEDS LOGIN + NOT SAFE TO TRADE + −$1,234.56 Day P&L + HARD LIMIT; and AUTO PAUSED + Resume AUTO + DEGRADED + SOFT LIMIT). First try failed (FLATTEN ALL pushed off the edge, clock and TOTAL BP wrapped). Fixed: tighter spacing, nothing in the top bar may wrap or shrink, FLATTEN ALL can never be pushed out, Equity / Cash / Total BP in whole dollars (Day P&L keeps cents), meter label short in the bar ("SOFT LIMIT" / "HARD LIMIT") with the full sentence in the alert line and the hover. Re-measured: no horizontal scroll, FLATTEN ALL ends 10 px from the edge in all four states. Preview: v4_draft/Top_bar_fit_test_1536x864.png.
- Resume AUTO after a pause (approved): Resume AUTO stays allowed (hold 2 s; the AUTO block says why it paused). Two numbers kept: today's true high stays unchanged for display and history; a separate resume baseline starts at the P&L when you resume and is used only to decide the next give-back pause (a new high after resuming moves this baseline up). Example: high +$1,700, pause at +$1,200, resume at +$1,200; AUTO rises to +$1,450, then gives back $500 → pauses again at +$950. Logged and shown as "AUTO RESUMED AFTER GIVE-BACK · 1st resume today". Soft-loss pause (ChatGPT's correction, Claude agrees): after you resume, AUTO does not keep pausing while P&L stays below the same soft level; if P&L recovers back above the soft level and later falls through it again, that is a new soft-limit event and AUTO pauses again (e.g. soft −$300: −$318 pause → resume → −$320/−$340 no new pause → back to −$180 → falls through −$300 again → pause). Claude's addition: to avoid flicker, the recovery must be clear, not a few dollars (e.g. back above about −$250 before a new cross counts; buffer OPEN). Hard limit: no resume that day (settled).
- Display changes approved: whole dollars for Equity / Cash / Total BP with exact cents on hover (math always uses exact values); short SOFT LIMIT / HARD LIMIT label, full sentence in the alert line and hover.
- FLATTEN ALL sequence kept in the mockups: hold (bar fills) → FLATTENING… 3 of 5 closed → FLATTEN COMPLETE — ALL POSITIONS CLOSED (only after reconcile with IBKR) or FLATTEN INCOMPLETE — 1 POSITION PENDING · ABCD · HALTED · 4:18 elapsed; AUTO stays OFF. (Already settled in section 4; now drawn in the states sheet.)
- Connection-loss rules confirmed as written in the revisions above (laptop loss stops nothing; broker/data loss = NOT SAFE TO TRADE + no new AUTO entries; manual positions never strategy-sold because of a disconnect; engine-position fail-safe decided in reliability testing).

## 5h. Broker change: back to the hybrid — Alpaca places orders, IBKR gives Level 2 — SETTLED (Jonathan approved Sept 26, 12:13)

Jonathan's decision (Sept 26): FINRA's intraday-margin amendments replaced the $25,000 PDT rule (effective June 4, 2026; firms may phase in until October 20, 2027). Alpaca adopted the new framework on June 4, 2026 (no $25,000 minimum; 4× intraday buying power from $2,000 equity). IBKR is still on the old $25,000 rule. With about $5,000, the platform goes back to the hybrid from File 2: **Alpaca = orders, account, positions, fills, borrow; IBKR = Level 2 data only (3 slots); Massive = broad market data.** Move to IBKR-only later, when the account reaches about $60,000 (Sept 27: now a review point, not an automatic switch — see 7c).

Claude's proposal for the makeup (nothing in the layout moves):
1. Two broker connections, shown separately in the Health hover, System Health and Settings: "ORDERS · ALPACA" and "LEVEL 2 · IBKR" (plus Massive for market data).
2. Severity split: Alpaca problem = NOT SAFE TO TRADE, AUTO BLOCKED, Critical ("ORDERS UNAVAILABLE — ALPACA DISCONNECTED · exits can't be sent from the platform · use the Alpaca app"). IBKR problem = DEGRADED, "LEVEL 2 UNAVAILABLE" on the panels, Attention ("IBKR NEEDS LOGIN · LEVEL 2 PAUSED"); manual trading and engine strategies that don't need Level 2 keep working (already the 5c rule). Examples in the drawings change: "AUTO BLOCKED — IBKR NEEDS LOGIN" → "AUTO BLOCKED — ALPACA DISCONNECTED".
3. LIVE pre-flight checks the Alpaca account; IBKR Level 2 is not required to go LIVE (Level 2 strategies stay off until it is back).
4. Cash / Total BP, positions, fills, reconciliation, shortability ("no borrow") and the cash-only rule for non-marginable stocks all come from Alpaca. Total BP = Alpaca's intraday buying power; the platform's own hard caps (FULL CAP etc.) stay below it.
5. New: intraday margin call state. If Alpaca ever reports an intraday margin deficit: Critical alert with the amount and deadline, Cash/BP block turns red. Hard caps are designed so it should never happen (repeated unmet calls can freeze the account for 90 days).
6. No PDT "day trades left" counter is needed.
7. File 9 v4 text: wherever v3 says IBKR for orders, account, fills or borrow, it becomes Alpaca; IBKR = Level 2 only. Outside 9:30–4:00 Alpaca also takes only limit orders, so the manual execution rules (2c) stand as written. Optional stop outside regular hours would be held by the platform (where the stop lives stays OPEN).
8. Switching to IBKR-only later = a Settings choice plus label changes, not a redesign (broker adapters stay modular, Files 3/4).
9. Still required before LIVE (File 6 D-14/D-15): verify at Alpaca that non-marginable penny stocks can be bought with own cash inside the margin account.
10. Upcoming windows affected: Positions & Orders (broker check vs Alpaca), Settings (three connections), System Health (three connection rows; IBKR login = Level 2 only), Review (fills and slippage from Alpaca), Stock detail (Level 2 slot status).

ChatGPT's review (Sept 26) agrees: no redesign; provider-specific health; account numbers, Positions & Orders reconciliation (incl. CANCEL ALL ENTRIES, OVERRIDE EXIT, FLATTEN) and short eligibility from Alpaca. Additions Claude agrees with (waiting for Jonathan's OK):
- Massive down or stale → the engine can't see the market: new AUTO entries blocked (NOT SAFE TO TRADE for entries); your exits still work while Alpaca is up.
- Every data point keeps its source internally (e.g. "book = IBKR, fill = Alpaca, quote = Massive") for timestamps, slippage, replay and debugging; the screen stays clean, sources show in System Health / debug view (already required by File 2).
- Session stays 4:00 a.m.–8:00 p.m. ET; Alpaca's overnight session is not used unless Jonathan decides otherwise.
- Verify IBKR market-data terms for personal internal use when the live feed is set up.

Second ChatGPT round (Sept 26), Claude agrees (waiting for Jonathan's OK):
- Alpaca-down banner replaces Claude's wording: "ALPACA EXECUTION UNAVAILABLE · PLATFORM CANNOT RELIABLY CONTROL ORDERS". A second line "Manual backup: use Alpaca directly" appears only when the platform can tell Alpaca itself is up (only our connection failed). Claude's addition: tell the two apart by checking Alpaca's public status page and whether other Alpaca endpoints still answer; System Health shows which case it is.
- IBKR Level 2 down → DEGRADED; Level 2 strategies off; LIVE keeps running. Alpaca connection is the only broker link LIVE requires.
- Massive down or stale → new AUTO entries blocked; existing positions still monitored and exited with whatever healthy data remains; manual exits never blocked because Massive is down.
- Source map: Massive = broad-market scanner, trades/quotes, market-wide features · IBKR = Level 2 book · Alpaca = orders, fills, positions, equity, cash, buying power, eligibility/shortability. Every event records its source and timestamp.
- Small real-money validation (penny stocks, cash-only, fills) before serious LIVE trading.


Third ChatGPT round (Sept 26), Claude agrees — replaces Claude's "status page" idea (waiting for Jonathan's OK to mark 5h SETTLED):
- System Health combines several checks: our server's connection to Alpaca, API login/heartbeat, order and account endpoints, network reachability, and Alpaca's official status page (one signal only; status pages can lag).
- Three labels: "OUR ALPACA CONNECTION LOST" (evidence points to our side) · "ALPACA OUTAGE" (broker side confirmed) · "ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN". In all three, if execution is uncertain, new AUTO entries are blocked. The platform never assumes Alpaca is healthy just because its status page says so.
- "Manual backup: use Alpaca directly" appears only with "OUR ALPACA CONNECTION LOST".

**Intraday margin protection — SETTLED (Jonathan approved Sept 26, 12:13)** (Jonathan asked how to never get Alpaca's 90-day restriction)
Facts (Alpaca docs, FINRA): no day-trade counting or PDT limit anymore at Alpaca. The only risk is an intraday margin deficit: a buy (or short) that uses more margin than the equity supports at that moment. A call must be met within 2 business days; if still unmet at the close of the 5th business day, the account can be frozen for up to 90 days (Alpaca's rule page says one unmet call is enough; FINRA and Alpaca's announcement speak of repeated failures — the platform treats one as enough) (no new margin debit, no new shorts; closing is allowed). Deficits under $1,000 or 5% of equity (whichever is lower) don't trigger a call. A call can be met by depositing or by closing positions. Alpaca's pre-trade checks reject orders that would create a deficit, but fast fills and price moves can still cause one.
Claude's first proposal (superseded by the merged version below): 1× cap in Settings; ~80% buffer; Critical alert + one-click cure for manual positions, engine cures its own; "margin calls this month" in System Health/Review.

Merged version after ChatGPT's round (Sept 26) — SETTLED, with the final-round clarifications below:
Goal: design for zero intraday margin calls, not for how many Alpaca might tolerate. Even one unresolved call is treated as unacceptable.
1. Two layers of 1×: Alpaca account setting max_margin_multiplier = 1 AND platform hard cap 1× (a sizing bug can't use Alpaca's 2×/4×). 1× greatly reduces the risk but doesn't make a call impossible (shorts, low-priced stocks, changing or house requirements).
2. Margin Safety Layer in the risk engine: before every manual or AUTO BUY/SHORT it projects the account after the order, counting all working orders at their protected ceiling, using Alpaca's live cash, buying power, initial/maintenance margin, the stock's own long/short margin requirement and borrow status (read live, not hardcoded). A safety reserve stays unused; its size is set during paper and small LIVE tests (not locked today — replaces the ~80% idea).
3. Three stages, no layout change:
   - Normal: nothing extra shows.
   - Headroom low: Attention "MARGIN HEADROOM LOW · NEW SIZE REDUCED"; FULL CAP and sizes shrink automatically (the existing amber LIMITED box shows it on the buttons).
   - Actual call: Critical "INTRADAY MARGIN CALL · $___ · CURE REQUIRED" with amount, time and Alpaca deadline. AUTO can't open trades; manual BUY/SHORT blocked too (NEW vs Claude's first proposal — needs Jonathan's explicit OK); working entries cancelled; all exits stay available; the engine reduces its own positions; for Jonathan's positions a suggested one-click cure ("SELL 200 ABCD TO REDUCE MARGIN") that never runs without his click.
4. Cure target: immediately or the same trading day; Alpaca's 2 business days is a hard limit, not normal operating time.
5. System Health / Review: "INTRADAY MARGIN CALLS: 0 — TARGET 0" (not a monthly count). Any call becomes an incident record in Review: time, amount, positions/orders that caused it, requirement at that moment, whether the model predicted it, how it was cured, how long it stayed open.
6. LIVE rollout: Phase 1 = 1× both layers, small amounts, mostly longs · Phase 2 = verify penny/non-marginable cash behavior · Phase 3 = small controlled shorts · Phase 4 = only if the platform's margin numbers match Alpaca's reliably, consider 1.25×–1.5×. Leverage must earn its way in through testing.
Claude's additions (SETTLED; c's selection method stays OPEN):
   a. Leverage cap follows the loss-limit rule: can be lowered any time; raising takes effect the next trading day.
   b. When Alpaca shows the call cured, the BUY/SHORT block lifts by itself; AUTO stays OFF until Jonathan turns it back on (same as FLATTEN and the give-back safeguard).
   c. The engine sells only as much of its own positions as needed to cure (not a flatten); how it picks which ones stays OPEN.
   d. Optional third layer for Phases 1–2: Alpaca's long-only switch (no_shorting), turned off when short tests start in Phase 3.
   e. At 1× Alpaca still treats the account as a (limited) margin account, not a cash account; Phase 2 also confirms that money from a sale can be reused the same day.
Waiting for Jonathan: OK on the merged version (especially manual BUY/SHORT blocked during a call) and the starting leverage (1× recommended by Claude and ChatGPT). ChatGPT approved the hybrid package; Claude agrees — waiting for Jonathan's OK to mark 5h SETTLED.

ChatGPT's final round (Sept 26, 12:10) — approves the merged package; Claude agrees with both clarifications:
- Manual BUY/SHORT blocked during an active call = hard account-safety rule, like the hard daily loss limit; exits always available.
- Ownership holds only while the platform controls the situation: Alpaca "may sell any securities in your account, without prior notice, to satisfy a margin call" (Alpaca margin docs, verified). Claude's addition: if Alpaca ever does this, the platform detects the fill it didn't send and labels it "CLOSED BY ALPACA · MARGIN" in Positions & Orders, the alert history and the Review incident record.
- Starting leverage 1×, at Alpaca and in the platform. Long-only at Alpaca (no_shorting) until Phase 3 short tests.
- After Alpaca confirms the call fully cleared, manual BUY/SHORT unlock automatically; AUTO stays OFF until Jonathan turns it on.
- "Raise leverage only next trading day" is recorded as OUR platform rule, not an Alpaca requirement.
- At 1× Alpaca calls the account "standard limited margin account with 1x BP" (buying power = cash). Same-day reuse of sale money is still confirmed in Phase 2.
ChatGPT confirmation (12:12): approves the hybrid, the margin protection (incl. "CLOSED BY ALPACA · MARGIN") and 1× start; points to Alpaca's page "Intraday margin rule for non-leverage margin accounts" for same-day re-entry, still to be confirmed live in Phase 2. Later steps: ChatGPT now says 1.5× → 2× (earlier 1.25×–1.5×) — OPEN, decided only after clean real-money testing.
**Jonathan: "I approve" (Sept 26, 12:13).** SETTLED: the whole 5h hybrid package (all ChatGPT rounds above, incl. multi-signal Alpaca outage detection, the three labels, "Manual backup" only with OUR ALPACA CONNECTION LOST, Massive-down rule, source map) and the margin protection package: 1× at Alpaca and in the platform; long-only at Alpaca until Phase 3; Margin Safety Layer; three stages; AUTO + manual BUY/SHORT blocked during an active call, exits always available; auto-unlock after Alpaca confirms the call cleared, AUTO stays OFF; engine sells only what's needed; "CLOSED BY ALPACA · MARGIN" label; same-day cure target; "INTRADAY MARGIN CALLS: 0 — TARGET 0" + Review incident record; raising leverage = next trading day (our rule); phased rollout.
Still OPEN: safety-reserve size (set in testing); how the engine picks which positions to sell; later leverage steps (only after clean real-money testing).

## 6. Still open from before

- Exact green/red blink thresholds, list re-sort speed, button lock time after a Level 2 swap, My list size, NEWS bright time, the back-to-main-window key (F2), window layouts (first drafts), sound design, extra Level 2 slots, laptop screen scaling.


## 7a. Review window (Journal · Replay · Performance) — SETTLED (approved by Jonathan Sept 27, 14:35, with refinements R1–R5 and answers Q1–Q3)

Jonathan gave the go for the separate windows (Sept 27). Window order confirmed in practice: Review first. Drawings (updated with R1–R5): v4_draft/Review/Review_1_Journal.png, Review_2_Replay.png, Review_2b_Replay_with_live_card.png, Review_3_Performance.png; comparison with v3 in Review_window_v4_with_v3_comparison.pdf. All numbers in the drawings are placeholders.
Sources: File 9 v3 §9.4–9.5; Decision Record v2 §10.1 (merge, tabs allowed, five questions: what happened, why, how it performed, what the engine would have done, how performance changes); Files 3/4/5/6/7/8 (logging, deterministic replay, metrics, attribution, paper/live separation); settled v4 items (ownership, OVERRIDE EXIT, FLATTEN, pauses, hybrid sources, margin record).

**A. Whole window**
1. Thin top bar as in every window (final check at item 8): ← MAIN WINDOW F2 · Review · PAPER/LIVE · AUTO state · live alert blinks (click = pop-up trade card) · DAY P&L · HEALTHY · FLATTEN ALL. The same 22 px alert line as the main window sits under it, so a Critical alert is never missed while reviewing.
2. Tabs JOURNAL · REPLAY · PERFORMANCE. The selected trade stays selected across tabs.
3. RESULTS switch PAPER | LIVE — REAL MONEY: paper and live are never added together (Files 3/4/5); LIVE results look like LIVE (red). Journal/Replay pick a day (◂ date ▸ · Today); Performance picks a period.
4. Clicking a ticker opens the pop-up trade card, never an order. Replay is read-only.
5. All results after commissions, fees and slippage. The engine's would-have trades use estimated fills and are always labeled (dashed WOULD-HAVE chip, "est.") and never counted in account P&L.

**B. Journal tab**
6. TRADES table, one row per round trip: TIME · SYMBOL · SIDE · OWNER (YOU / ENGINE / WOULD-HAVE) · SETUP · SH · ENTRY · EXIT · P&L · R · CLOSED BY · RESULT. Summary line (real vs would-have, realized, open, fees, day total) and result-type totals under the table.
7. NEW column CLOSED BY: YOU · YOUR STOP · ENGINE · OVERRIDE EXIT · FLATTEN ALL · CLOSED BY ALPACA · MARGIN (makes the ownership rules visible afterwards).
8. RESULT (File 4 §16): win · valid strategy loss · execution/slippage · market regime · technical failure · rule break. Color by how much attention it needs: win green, valid strategy loss plain, execution/regime amber, technical/rule break red.
9. Filters: All · Yours · Engine's · Would-have · Losses · Overrides & flattens · ticker search. EXPORT CSV (trades + fills, for reconciliation/taxes).
10. MISSED RUNNERS: move, first seen, why missed (Level 2 slots busy, spread, signal late, promoted late, buying power, no borrow, human timing).
11. DAY EVENTS / BLOCKED & REJECTED (small tabs): mode changes, pauses/resumes, OVERRIDE EXIT, FLATTEN ALL reports, halts on held stocks, connection incidents (the three Alpaca labels), margin calls — the day's alert history kept for good. Blocked & rejected = every entry refused and why (hard limit, margin headroom, no borrow, NOT SAFE, CANCEL ALL ENTRIES, broker rejection, NOT FILLED).
12. WHY panel for the selected trade: entry (click/trigger, size and how it was worked out, fill and slippage), ORDER TRAIL (ms, Alpaca), what the engine saw (rank, Level 2 slot, engine state, AI verdict + age, news grade + age), YOU VS ENGINE on that trade (engine's would-have in/out/result), exit + who closed it (SELL LOWER clicks shown), best/worst point (MFE/MAE), capture, versions + data sources. Buttons: ▶ REPLAY THIS TRADE · Ask AI about this trade.
13. NEW idea (not in the files): an optional one-line personal note per trade.

**C. Replay tab**
14. Replay a trade (default: the selected one), a missed runner, or a time window of any stock (whole day possible, File 8 §25).
15. Big chart (ticks / 5 s / 1 min): buy/sell marks, signal time, ceiling, risk line or your stop, VWAP, volume, Level 2 slot in/out, halts, data gaps marked with their source. On your trades the engine's would-have marks are shown too.
16. Level 2 book + Time & Sales exactly as they were at the replay moment (same look as the main panels). A stock with no Level 2 slot shows "NO LEVEL 2 RECORDED".
17. AT THIS MOMENT: engine state and reasons, exit check, AI verdict + age, position, account (cash, BP at 1×, margin, loss vs limit).
18. EVENT TIMELINE to the millisecond, each line tagged with its source (MASSIVE / IBKR / ALPACA / ENGINE / RISK / AI / YOU); click a line to jump there.
19. Controls: start · step back · play · step · speed 0.25× / 1× / 5× / 20× · jump to signal / entry / exit / next event · scrubber with event ticks.
20. Header: versions used + "MATCHES LIVE ✓" (deterministic replay check; a mismatch is flagged as a bug) + "READ-ONLY · NO ORDERS".

**D. Performance tab**
21. Period (Today · This week · Last 30 days · All · Custom), OWNER (All · You · Engine), PAPER | LIVE.
22. Key numbers: net P&L after costs · expectancy (R and $) · win rate (never judged alone) · avg win / loss · profit factor · max drawdown · capture · trades (no quota).
23. Account over time after costs + each day's P&L.
24. YOU VS. ENGINE: your trades vs the engine's would-have trades on the same stocks (trades, win rate, net, per trade, your entry timing vs engine, your exits vs engine's), OVERRIDE EXIT counted on its own (result vs if the engine had kept them) — as settled in 5g.
25. SPLIT BY ▾: setup · price band · float · session · long/short · news grade · spread · strategy version.
26. ENGINE ALONE VS. ENGINE + AI (File 7 §10.3): win rate, expectancy, bad trades avoided, good trades blocked, AI delay; the AI stays only if it improves results after costs.
27. WHERE LOSSES CAME FROM (result types in $) + missed runners (top movers caught early, why missed).
28. EXECUTION & ACCOUNT SAFETY: slippage entries/exits, signal→fill latency, NOT FILLED count, fees/borrow, INTRADAY MARGIN CALLS: 0 — TARGET 0, AUTO pauses (soft / give-back), hard-limit days, FLATTEN ALL uses, connection incidents.
29. Placeholder notice until real paper results exist; example numbers are never targets.

**Questions for Jonathan (answered — see below)**
Q1. R for your trades without a stop: show "—" and compare You vs Engine in dollars after costs (Claude's pick), or give manual trades a default risk amount so they get an R too?
Q2. The optional personal note per trade (new idea): keep or drop?
Q3. Review opens on the Journal tab, today, in the environment you are trading in (Claude's pick).
OPEN (files): how far back Replay can go depends on the raw tick / Level 2 retention policy (still open in Files 2/4/5); export format beyond CSV.

**ChatGPT's review (Sept 27) — approves with five refinements; Claude agrees — SETTLED (Jonathan: "I approve it all", Sept 27, 14:35):**
R1. The PAPER | LIVE switch in Review is only a results filter, never the trading-mode switch; changing it never changes the account. Claude's addition: when the filter differs from the mode you're trading in, a small note says so ("viewing PAPER results · you are trading LIVE").
R2. WOULD-HAVE = only new engine entries it was not allowed to place (AUTO OFF). An engine position opened before AUTO went off stays a real ENGINE trade, including its exits (matches 5g: the engine keeps managing its positions; a partly filled entry's filled shares are ENGINE).
R3. Live/replay guard: a pop-up trade card opened from Replay is headed "LIVE CARD · CURRENT MARKET" so a historical price is never mistaken for a tradable one; Replay itself stays read-only. Claude's addition: the replay pauses when the live card opens, and the card shows the current time.
R4. Badge renamed "MATCHES RECORDED LIVE ✓" (reproduced the recorded live decision/result; not a claim that every data source was complete). Data gaps stay prominent. Claude's addition: the badge adds the gap count when there is one ("· 1 DATA GAP"); a mismatch shows "DOES NOT MATCH RECORDED LIVE" and is logged as a bug.
R5. Missed runners without hindsight: a stock counts as a missed runner only by a predefined rule using what the platform could have known at the time (and prices that were actually tradable), not just "it went up a lot later". Claude's addition: runners that gave no usable warning in the data are counted separately as "not catchable" and don't count against the engine; the rule is versioned so results stay comparable; exact rule and thresholds OPEN (research/paper testing; File 3 §7, File 4 §7).
Color note (ChatGPT, Claude agrees; already drawn): a valid strategy loss has a neutral result label, but its negative P&L number stays red.
Answers to the questions (ChatGPT agrees with Claude): Q1 no default risk for manual trades — R shows "—" unless you set a stop/planned risk before entry; You vs Engine in dollars after costs. Q2 keep the optional one-line note (never interrupts trading). Q3 Review opens on Journal · today · the environment you're trading in.
Drawings updated with R1–R5 (Sept 27): v4_draft/Review/ — Journal, Replay, Replay with the live card open, Performance (shown while trading LIVE and viewing PAPER results). Still OPEN: missed-runner rule and thresholds; replay history length (data retention); export formats beyond CSV.


## 7b. Positions & Orders window — SETTLED (approved by Jonathan Sept 27, 15:23, with refinements P1–P4 and the clarifications)

Drawings: v4_draft/PositionsOrders/PO_1_Normal_day.png (PAPER, AUTO OFF), PO_2_Flatten_incomplete_LIVE.png, PO_3_States_and_examples.png; with the v3 picture in Positions_Orders_proposal_with_v3_comparison.pdf. Numbers are placeholders but add up (equity, cash, P&L, by owner).
Sources: File 9 v3 §9.3; Files 2/3/4/5/6/8 (order lifecycle, idempotent order IDs, broker is the truth for fills, reconcile at start-up/reconnect/continuously, reallocation order, capital limits, short checks); settled v4 items 2b, 2c, 3, 4, 5c, 5d, 5f, 5g, 5h, 7a.

**A. Whole window**
1. Same thin top bar + alert line as every window. Opens from Windows ▾ and from the Positions & Orders link on the strip (kept from v3).
2. Shows only REAL positions and orders of the mode you're trading in (PAPER or LIVE). The engine's would-have trades stay in Review. (Q1)
3. Exact cents everywhere here (whole dollars are only for the top bar's fit). Ticker click = pop-up trade card. No order hotkeys.

**B. Account strip (one row)**
4. EQUITY · CASH / HELD FOR WORKING ORDERS / AVAILABLE FOR NEW ORDERS · LEVERAGE 1× (Alpaca 1× · platform 1× · long-only) · LONG / SHORT VALUE (short: "— shorts off" until Phase 3) · OPEN P&L · REALIZED + FEES · DAY P&L (same number as the top bar) · LOSS LIMIT meter (soft/hard) · MARGIN tile (HEADROOM OK / HEADROOM LOW · NEW SIZE REDUCED / INTRADAY MARGIN CALL; "margin calls: 0 — TARGET 0").
5. "Available for new orders" makes 1× visible: after a few positions the cash is used, and the next BUY shows LIMITED by cash (drawn: ABCD 25% = $1,308 → $1,167.80 ÷ ceiling $2.24 = 521 sh).

**C. Open positions**
6. YOURS first, then ENGINE'S (labeled dividers that state who closes them), each group in the order opened — same as the strip.
7. Columns: SYMBOL · SIDE · OWNER · SH · AVG · LAST · P&L $ · P&L % · STOP (yours: "STOP $13.40 · move · ×" or "+ STOP") / RISK LINE (engine's) · OPENED + time held · ENGINE'S READ (EXIT? on yours = advice only) · ORDER STATUS · EXIT.
8. Exit button = same rules as the cards: SELL/EXIT one click on yours (also in AUTO ON) · 🔒 OVERRIDE EXIT hold 1 s on the engine's · HALTED · elapsed · SELL LOWER TO $x (one click on a normal exit; hold 0.5 s past the FLATTEN band) · "checking…" while an exit is UNKNOWN · CLOSED (row stays ~5 s).
9. During FLATTEN ALL the positions panel becomes the flatten report: banner (FLATTEN INCOMPLETE — n POSITIONS PENDING …), pending rows first, closed rows listed until the flatten finishes; FLATTEN COMPLETE only when Alpaca shows zero positions too (settled section 4).
10. No SELL HALF here (settled 5d: maybe later).

**D. Working orders**
11. Every working order including your STOP: sent time, symbol, order (side, type, entry/exit/stop), owner, filled/total, status, CANCEL on your own orders (move · × on your stop). A row shows its trail (sent → raised → partial → … → ceiling), and why the size was limited.
12. CANCEL ALL ENTRIES (n) in this header with 2+ unfilled entries (same as the strip, 5g). ~~Engine's entries: no single CANCEL here~~ → replaced by P2 (CANCEL ENGINE ENTRY · hold 1 s). Engine's exits are never cancellable by you (OVERRIDE EXIT instead).
13. Order statuses (one at a time, from Alpaca): RISK CHECK… · SENT · WORKING · PARTIAL · FILLED · CANCEL PENDING · CANCELLED · by you / STOP AUTO / CANCEL ALL ENTRIES / FLATTEN ALL · NOT FILLED · price ran above $x · REJECTED · reason (entry = Attention, exit = Critical) · EXPIRED · UNKNOWN · checking with Alpaca. UNKNOWN is never resent until Alpaca confirms, and new entries in that stock wait until it's resolved. A late fill after a cancel is still shown and counted.

**E. Fills & orders today** (tabs FILLS · ALL ORDERS · PROBLEMS · REALLOCATIONS), newest first, times to the millisecond, from Alpaca, with notes (partial, OVERRIDE EXIT by you, FLATTEN ALL, CLOSED BY ALPACA · MARGIN). PROBLEMS = rejected, NOT FILLED, cancelled by the system, UNKNOWN. Click = full trail; "why" opens Review.

**F. Today by owner** (kept from v3): YOURS · ENGINE'S · TOTAL — open, open P&L, realized, fees, day P&L. Real trades only. An OVERRIDE EXIT counts under the engine (its trade), with a note.

**G. Broker check · Alpaca**: IN SYNC / CHECKING / MISMATCH. After every fill, every reconnect, at start-up, and every few seconds (interval OPEN) + "check now". Alpaca's numbers win. Mismatch → AUTO BLOCKED — BROKER SYNC (Critical), no new entries in that stock, exits still work, incident logged in Review. After a restart everything is rebuilt from Alpaca, never assumed empty.

**H. Reallocations · engine only**: reserve → trim weakest → close weakest, each with its reason; your positions are never trimmed or sold to make room; reserve size OPEN.

**I. Margin call view** (settled 5h, drawn in PO_3): amount, since when, Alpaca deadline, goal today; one-click cure suggestion for your positions ("SELL 61 ABCD TO REDUCE MARGIN · covers the remaining $130"); what the engine already sold of its own; AUTO + your BUY/SHORT blocked, exits available, working entries cancelled.

**J. Shorts later (Phase 3)**: SIDE in purple, COVER instead of SELL/EXIT, borrow status and fee from Alpaca on the row (easy / hard-to-borrow).

**Questions for Jonathan (answered — see P1, P2)**
Q1. Only real orders and positions here; the engine's would-have trades stay in Review (Claude's pick).
Q2. No single CANCEL for an engine entry here — CANCEL ALL ENTRIES or STOP AUTO only (Claude's pick), or allow cancelling one engine entry?
OPEN: where your STOP is held (Alpaca or platform); broker-check interval; reserve size; engine fail-safe on disconnect (reliability testing).

**ChatGPT's review (Sept 27) — approves almost all; four refinements; Claude agrees — SETTLED (Jonathan: "I approve", Sept 27, 15:23):**
P1. Q1 YES: this window = only what really happened at Alpaca; WOULD-HAVE stays in Review.
P2. Q2 changed (Claude agrees with ChatGPT): a single engine entry can be cancelled — "CANCEL ENGINE ENTRY · hold 1 s" (same gesture as OVERRIDE EXIT). Only that order's unfilled shares are cancelled; filled shares stay an ENGINE position; logged as a human intervention; same-setup re-entry paused ("ENGINE RE-ENTRY PAUSED · same setup ×") until you release it or a genuinely new setup appears. Reason: STOP AUTO and CANCEL ALL ENTRIES (which also cancels your own entries) are broader than needed. Claude's addition: by the consistency rule, the same hold button also appears wherever that engine entry shows (its card in the strip, the pop-up trade card) — Jonathan to confirm.
P3. Broker mismatch in two levels: symbol mismatch (e.g. ABCD platform 300 · Alpaca 521) → no new entries in that stock; account mismatch (cash, buying power, total positions, account state) → AUTO BLOCKED — BROKER SYNC and all new entries blocked. Exits always available. Alpaca is the final truth. Claude's addition: a position found at Alpaca that the platform didn't open (e.g. bought in the Alpaca app during "Manual backup: use Alpaca directly") is shown as YOURS, labeled "opened outside the platform"; the engine never manages a position it didn't open.
P4. Margin cure button is an estimate: "EST. SELL 61 ABCD TO CURE MARGIN", recalculated live; after the fill the platform re-checks Alpaca and recalculates any remainder; the call is cured only when Alpaca confirms (matches 5h auto-unlock).
Small clarifications (agreed): the LEVERAGE tile shows the current setting (1× · long-only now; later e.g. 1.5× or 2× · SHORTS ENABLED when approved). "Available for new orders" is account-level; the amount usable for a given stock can be lower (marginability, borrow, reserve, caps) — the real per-stock amount is the share count on each BUY/SHORT button (2b); the tile's hover says so.
ChatGPT's confirmation (Sept 27, 15:23): approves Claude's revised version, including CANCEL ENGINE ENTRY on the strip card and pop-up trade card (reopening that one piece of the main window only). Locked details: the button appears only while that engine entry is still working; partial fill → only the unfilled rest is cancelled, filled shares stay ENGINE-owned; same-setup pause until released or a genuinely new setup. Label for outside positions: "YOURS · OPENED OUTSIDE PLATFORM" (the engine never adopts or manages it). Margin button "EST. SELL 61 ABCD TO CURE MARGIN", cleared only when Alpaca confirms. Jonathan approved (15:23). Drawings updated: PO_3 shows CANCEL ENGINE ENTRY, YOURS · OPENED OUTSIDE PLATFORM, the two mismatch levels and the EST. margin button; PO_1 labels "Available (account total)" and the two-level mismatch rule. Point 12's "no single CANCEL for engine entries" is replaced by P2.
**Main-window change carried to the final v4 build (consistency rule):** the engine's working-entry card in the strip and the pop-up trade card get "CANCEL ENGINE ENTRY · hold 1 s" (only while that entry is working).


## 7c. Settings window — SETTLED (approved by Jonathan Sept 27, 18:29, with refinements S1–S6, the broker line and the switch preflight)

Drawings: v4_draft/Settings/SET_1_Trading_and_risk.png, SET_2_Engine_and_connections.png, SET_3_Screen_and_sounds.png; with the v3 picture in Settings_proposal_with_v3_comparison.pdf. All values are examples or starting values.
Sources: File 9 v3 §9.8; Files 3/4/5/8 (every parameter/config change logged; the model can't change its own safety rules; only approved versions trade; shadow/challenger before order authority; retraining never replaces live logic by itself; access control on LIVE and high-risk actions; keys on the server); settled v4 items 1, 2b, 2c, 3, 4, 5b, 5f, 5g, 5h, 7a, 7b.

**A. How Settings works (new structure)**
1. Same thin top bar + alert line. Left: section list in 3 pages — TRADING & RISK · ENGINE & CONNECTIONS · SCREEN & SOUNDS — plus CHANGE HISTORY.
2. Every setting carries a badge saying when a change counts: NOW (at once) · RISKIER → NEXT DAY (in LIVE: safer changes at once, riskier ones from the next trading day, 4:00 a.m. ET) · 🔒 LOCKED (safety rule, not editable here) · SET BY TESTING (starting value). (Q1)
3. In PAPER every change applies at once (fast testing); the next-day rule is for LIVE.
4. A risk-raising change in LIVE shows as SCHEDULED with its effective time and a cancel button, and in the alert line.
5. Every change is logged (time, old → new, when it takes effect) in CHANGE HISTORY, kept for good; risk changes also appear in Review's Day events. The engine and the AI can never change a setting.
6. Switching to LIVE and risk-raising changes in LIVE need a hold + a short PIN (in case someone else touches the laptop). (Q2)

**B. Page 1 — Trading & risk**
7. PAPER / LIVE: PAPER uses the Alpaca paper account with the same rules; LIVE = hold 2 s + PIN + all start-up checks (Alpaca connected, correct account, market data, risk engine, positions/orders match, clock, no critical feed failure); LIVE starts on the smallest preset; red frame.
8. Loss limits: soft (AUTO pauses) · hard (all new entries blocked, no Resume AUTO that day) · give-back from today's high · recovery buffer before a new soft-limit pause. All count closed + open (= Day P&L). Hard limit lowered now, raised next trading day (settled 3).
9. Leverage & shorts: leverage 1× (Alpaca + platform must match; lower now, raise next day — settled 5h); short selling OFF and LOCKED (Alpaca long-only until Phase 3); safety reserve (set by testing); "LIVE rollout: Phase 1 of 4"; margin calls 0 — TARGET 0 (view).
10. Hard caps: most in one stock (also caps FULL CAP) · most open positions · engine risk per trade (1R) · engine reserve for better setups · liquidity cap (engine side, locked). Values are examples.
11. Order size: 10% · 25% · 50% · $2,000 editable with today's dollar value; FULL CAP locked (the most the limits allow); start-up rule locked (LIVE smallest, PAPER remembers). Changing sizes never touches an order already working. MAX is gone (settled 2).
12. Execution: your max slippage on entries (the ceiling can never pass it) · exit boundary for normal exits (then EXIT NOT FILLED + SELL LOWER) · FLATTEN ALL emergency band (set by testing) · market orders: never (locked).
13. Change history panel on page 1.

**C. Page 2 — Engine & connections**
14. Strategies: long engine · Level 2 strategies (switch off by themselves while IBKR Level 2 is down) · short engine PAPER ONLY, locked until proven (Files 6/8, Phase 3) · AI context check (stays only if it improves results after costs). Turning one off is always immediate.
15. Versions: strategy/model, risk config, AI prompt set, each approved, with last full test; a challenger can run in SHADOW (sees everything, no orders, compared in Review); ROLL BACK to the previous approved version; PROMOTE needs tests passed + hold 2 s + PIN; never automatic.
16. AI: when an AI verdict is marked old (display, 3 min, set by testing); locked: the AI never holds up a fast trigger; the Ask AI window can never place orders.
17. Connections: ORDERS · ALPACA · LEVEL 2 · IBKR (slots in use) · MARKET DATA · MASSIVE · NEWS & FILINGS (Benzinga, SEC EDGAR, openFDA) · AI SERVICE, each with status; keys only on the server, masked. Broker setup: Hybrid (current) / IBKR only (planned around $60,000; a settings choice, not a redesign — settled 5h).
18. Session hours: 4:00 a.m.–8:00 p.m. ET, official calendar with holidays and early closes; overnight OFF; outside 9:30–4:00 limit orders only.
19. Phone: critical alerts to the phone (locked on), attention alerts (your choice); the phone can STOP AUTO and FLATTEN ALL (hold) but never buy.
20. Data & backups: journal, orders and fills kept for good, never edited, backed up nightly; raw tick / Level 2 retention for Replay (OPEN); export CSV.

**D. Page 3 — Screen & sounds**
21. Alerts & sounds: every event with its level (SIGNAL / INFO / ATTENTION / CRITICAL), its own sound, volume and on/off. Critical sounds 🔒: can be turned down but not off in LIVE; repeat about every 10 s until SEEN (settled 5f).
22. Signal sounds and blinks: blink sounds for "stocks that matter to you" (default) or all Ranked 50; anti-spam interval; blink ~5 s then solid; Reduced Motion.
23. List & display: re-sort speed, hold row order under the pointer, NEW tag time, NEWS bright time, spread box thresholds (1% / 2%), back key F2. All 14 list columns always show — the v3 column chooser is removed (settled 5b). (Q3)
24. My list: chips with ×, add ticker, 5 of 20 (same as ☆ in the list).

**Questions for Jonathan (answered: Q1 yes with S1 · Q2 yes · Q3 yes)**
Q1. The general rule: in LIVE, any risk-raising change (loss limits up, leverage up, bigger presets or caps, more slippage, a strategy on) waits until the next trading day; safer changes at once; in PAPER everything at once (Claude's pick).
Q2. A short PIN (plus hold) for switching to LIVE, raising risk in LIVE and promoting a new version (Claude's pick) — or no PIN?
Q3. Remove the v3 column chooser, since all 14 columns always show (Claude's pick).
OPEN: all numbers (tuned in paper testing); data retention; where your stop is held.

**ChatGPT's review (Sept 27, 18:03) — architecture approved; five refinements; Claude's view — SETTLED (Jonathan approved 18:29):**
S1. (agree) PAPER and LIVE keep separate setting sets: changing a value in PAPER never changes LIVE. Claude's addition: a switch at the top of Settings, "EDITING: PAPER SETTINGS | LIVE SETTINGS" (like Review's results filter; it never changes the trading mode). Copying PAPER values into LIVE counts as a LIVE change (riskier parts scheduled + PIN). Also: NOW means "for new decisions from now on" — a change never rewrites an order already working and never closes a position (e.g. max positions 6 → 4 while holding 5 blocks new entries until below 4; nothing is sold).
S2. (agree) Every number that is not proven shows as a test value (dashed value box + "TEST VALUE"), separate from the rule badge, so v4 never turns examples into fixed rules: presets' exact values, caps, 1R, slippage, exit boundary, loss amounts, give-back, thresholds.
S3. (agree) "Market orders: never" was too absolute — replaced by "UNPROTECTED MARKET ORDERS: PROHIBITED 🔒" (settled wording: never a blind/unlimited market order; protected marketable-limit execution continues; mechanics set by testing).
S4. (partly) ChatGPT doesn't remember the $60,000 point, but it was Jonathan's own statement in the Sept 26 announcement (5h). Claude's proposal: show "Hybrid — CURRENT" and "IBKR only — your plan at about $60,000 · not scheduled, decided when you get there" (never switches by itself). Jonathan decides the wording (keep the $60,000 or show only "future option").
S5. (agree) Phone rules shown as "proposed — confirmed on the Phone page" (item 8). Note: "no buying on the phone" and phone STOP AUTO / FLATTEN ALL were already approved in File 9 v3 §9.9.
S6. (agree) Runtime state ≠ setting: when IBKR or Massive fails, the setting stays ON and the row shows "ON · UNAVAILABLE — IBKR L2 DOWN"; recovery follows the recovery rules, never a silent toggle.
Q1 yes (with S1) · Q2 yes (PIN) · Q3 yes (column chooser removed) — ChatGPT agrees with Claude.

**Broker line — Jonathan + ChatGPT discussion (Sept 27, 18:24), Claude agrees — SETTLED (Jonathan approved 18:29):**
- Keep the hybrid now (Alpaca execution + IBKR Level 2 + Massive data). Jonathan's $60,000 is kept as a REVIEW point, not an automatic switch. Also review earlier if IBKR moves the account to the new FINRA intraday-margin rules (firms may phase in until Oct 20, 2027).
- At the review, compare real results: execution quality, fills and slippage, API reliability, short availability, extended hours, costs, and how much simpler one broker is (one account, no cross-broker reconciliation). Switch only if IBKR is clearly better.
- Settings shows: "Hybrid — CURRENT (Alpaca orders & account · IBKR Level 2 · Massive data)" and "IBKR-only — review around $60,000, or earlier if IBKR moves your account to the new FINRA rules · not automatic".
- One platform, not two: one engine + broker adapters (Alpaca execution, IBKR execution, IBKR Level 2), already required in 5h item 8 and Files 3/4/6 (normalized broker fields). The platform's own rules (ceilings, stepping, SELL LOWER, margin checks, reconciliation) stay the same; only the adapter changes.
- Claude's addition: a broker switch counts as a LIVE change (PIN, next trading day), only on a day with no open positions or working orders, and only after the IBKR execution adapter has passed PAPER testing. Moving the money between brokers is a separate manual step.
- ChatGPT (18:28) approves Claude's version and adds (Claude agrees): before a broker switch becomes active, a preflight on the new IBKR account — correct account, cash, permissions, market data, order routing, clock, positions = zero, API health — the same kind of start-up checks as going LIVE. Jonathan: "I approve" (18:29).
**Final check of the drawings against every approved Settings item (Claude, Sept 27):** 3 pages + change history ✓ · badges NOW / RISKIER → NEXT DAY (+ PIN) / LOCKED ✓ · test values as dashed "TEST" boxes, separate from the badge (S2) ✓ · "NOT SET YET · TESTING" where no value exists yet ✓ · PAPER: every change at once ✓ · EDITING SETTINGS FOR PAPER | LIVE switch + "Copy PAPER values to LIVE… = a LIVE change" (S1) ✓ · change history tagged PAPER / LIVE ✓ · scheduled LIVE raise with PIN ✓ and cancel ✓ · "a change counts for new decisions only" note (S1) ✓ · "Unprotected market orders: prohibited 🔒" (S3) ✓ · broker lines Hybrid — CURRENT / IBKR only — review around $60,000 or earlier · NOT AUTOMATIC, with the switch rules and preflight ✓ · Phone marked PROPOSED, confirmed on the Phone page (S5) ✓ · Level 2 strategies "stays ON, shows UNAVAILABLE — IBKR L2 DOWN" (S6) ✓ · PIN on LIVE, riskier LIVE changes and PROMOTE ✓ · no column chooser ✓. Screen & sounds = one shared set for PAPER and LIVE (critical sounds can't be off while trading LIVE) — Claude's reading of S1, tell Claude if these should also be separate.


## 7d. Stock detail window — SETTLED (approved by Jonathan Sept 28, 01:02, with refinements D1–D5)

Drawings: v4_draft/StockDetail/SD_1_ABCD_yours_in_slot.png (your position, Level 2 slot 1, AUTO OFF, 07:42) and SD_2_WXYZ_engine_no_slot.png (engine's position, no Level 2 slot, AUTO ON, 07:18); with v3 in Stock_detail_proposal_with_v3_comparison.pdf. Numbers are placeholders but consistent with the other drawings (same day, same trades).
Sources: File 9 v3 §9.1; Files 2 §13 (position, orders, fills, risk state, why a stock has or lacks depth, LLM analysis with evidence), 4 §19 (rank history), 5 §12.1 (per-symbol audit journal), 7 §10 (AI contradictions), 8 §15/§29/§401 (AI output fields; setup, signal strength, ranking factors, promotion/demotion; borrow metadata); settled v4 items 2b, 2c, 5, 5b–5g, 5h, 7b.

**A. Whole window**
1. Same thin top bar + alert line. New: "⌕ open any ticker…" search in the bar to open any of the ~8,000 stocks (Q2). Opens from: double-click a ticker (list, panel, strip), Windows ▾, "Full page" on the pop-up trade card, and the AI line on a Level 2 panel (full analysis).
2. Always live data (Replay lives in Review).

**B. Stock header (two rows)**
3. Row 1: symbol box with the settled blink rule (about 5 s blink, then solid while the signal is active) + signal text and "since"; price; change; chips: LONG/SHORT SETUP · RANK #n with its move ("▲ from #38") · L2·n or NO LEVEL 2 SLOT · NEWS grade + exact age · SPR with the amber/red box rule · AI verdict + age (OLD after 3 min) · owner (YOURS / ENGINE'S · shares) · ☆ add / ★ My list.
4. Row 2: the platform-wide order size (10% · 25% · 50% · $2,000 · FULL CAP, "= $1,308"; changing it here changes it everywhere; dimmed in AUTO ON) + the four fixed buttons BUY | SELL/EXIT | SHORT | COVER with every settled state: share count from the protected ceiling, amber LIMITED box, "order working" + CANCEL, OVERRIDE EXIT hold 1 s on the engine's position, CANCEL ENGINE ENTRY hold 1 s while an engine entry is working, locked in AUTO ON, HALTED · elapsed, "shorts off" while long-only. No hotkeys.

**C. Chart**
5. 10 s · 1 m · 5 m · 15 m · 1 h · 1 D; VWAP; volume; markers: your trades (white ▲), the engine's (teal ▲), would-have (teal ◌, AUTO OFF only); news flags A–D at the headline's time; your STOP line and your working order's ceiling; the engine's RISK LINE ("where its idea is proven wrong — not a promised exit"); shaded time in a Level 2 slot; halts shaded with elapsed time.

**D. Level 2 and Time & Sales**
6. In a slot: the full book (more levels than the main panels, venue column, scroll for deeper), large orders boxed white ("showing, not guaranteed support"), BIDS / ASKS pressure bar, Time & Sales to the millisecond (large prints bold), source line "book: IBKR · trades: Massive", and why and since when it has the slot.
7. No slot: "NO LEVEL 2 SLOT" with why (which stocks hold the three slots), the NBBO quote and Time & Sales from Massive; the stock stays fully tradable and watched. New: "📌 PIN TO LEVEL 2" (AUTO OFF only, one pin at a time, same rule as the panel pin) (Q1).

**E. Lower panels**
8. STATS in full digits + TRADING FLAGS: marginable (cash only), shortable (easy / hard to borrow / no borrow), SSR, halts today, session.
9. ENGINE VIEW: state + since, setup, signal strength ("confidence, not certainty"), why it ranks #n (factors), RANK TODAY history (e.g. #212 → #38 → #9 → #1), would-have (AUTO OFF) or, for the engine's position, entry, RISK LINE, what it is watching, "engine manages the exit · you: OVERRIDE EXIT".
10. AI ANALYSIS: GO / CAUTION / NO-GO, confidence, age (OLD after 3 min, display rule), what makes it refresh, reasons, risk flags, contradictions (e.g. "negative filing but steady buying"), evidence sources; "Ask AI about XXXX ↗" opens the AI Assistant on this stock. Context only; never holds up the engine.
11. NEWS & FILINGS tab: each headline with A–D grade, exact time, age and source; a fixed line "Offering / dilution filings (S-1, S-3, 424B): none in 90 days" or the filing (important for low-priced stocks); click opens News & Catalysts at that item.
12. TODAY IN XXXX tab: this stock's journal for today — rank changes, signals, Level 2 in/out, news, AI changes, orders, fills, halts (File 5 per-symbol audit journal); full detail in Review.
13. POSITION: owner, shares @ average, P&L, your STOP (none · + STOP) or the engine's RISK LINE, working orders, buy with (cash only), margin requirement for this stock (from Alpaca, e.g. 100% under $2.50), short status, risk check; today's trades in this stock → Review.

**Questions for Jonathan (answered: Q1 yes · Q2 yes)**
Q1. PIN TO LEVEL 2 from Stock detail: puts this stock into a slot and pins it (AUTO OFF only, one pin at a time; the engine gives up its weakest slot that isn't holding one of your positions) — Claude's pick: yes.
Q2. Ticker search in the Stock detail top bar — Claude's pick: yes.

**ChatGPT's review (Sept 28, 00:58) — approves Q1 and Q2; five refinements; Claude agrees with all — SETTLED (ChatGPT confirmed 01:01; Jonathan approved 01:02):**
D1. PIN TO LEVEL 2: keep the settled pin rules (AUTO OFF only, one pin at most, released when AUTO turns ON, or when you unpin). The engine never evicts a slot showing a stock you hold; if all three slots hold your positions, the button shows "PIN UNAVAILABLE · all slots hold your positions".
D2. "NO LEVEL 2 SLOT" never implies tradability by itself. The page shows "NO LEVEL 2 SLOT · TRADING AVAILABLE" only when market data (Massive) and execution (Alpaca) checks are healthy and the stock is eligible and not halted; otherwise it shows the real restriction (e.g. "NOT SAFE TO TRADE — ALPACA …", "HALTED · 2:40 elapsed", "NOT ELIGIBLE …"). Replaces the drawing's "stays fully live and tradable".
D3. Dilution line with source and freshness: "S-1 / S-3 / 424B: none found in last 90 days · SEC checked 07:41". If the SEC source is stale or down, it says so ("SEC CHECK UNAVAILABLE since 07:20"). The 90-day look-back is a TEST value. Claude's addition: "none found" means none in the SEC search, not a guarantee.
D4. Search can open any symbol, but trading only eligible ones: OTC, delisted, unsupported types or Alpaca "not tradable" show whatever information exists, and the buttons read "NOT ELIGIBLE FOR PLATFORM TRADING · reason" (never active BUY buttons, never a silent failure).
D5. Settled Positions & Orders states carried here: owner chip "YOURS · OPENED OUTSIDE PLATFORM" (engine never manages it; your SELL/EXIT works), and "CANCEL ENGINE ENTRY · hold 1 s" whenever an engine entry for this stock is working.
Wording (agreed): the pressure bar is labeled as visible order-book pressure, not a prediction — displayed orders can disappear ("BIDS 58% · ASKS 42% · shown in the book now").
Drawings updated (Sept 28): SD_1 and SD_2 with D2, D3 and the pressure-bar wording; new SD_3 states sheet (NOT ELIGIBLE, OPENED OUTSIDE PLATFORM, CANCEL ENGINE ENTRY, pin states incl. PIN UNAVAILABLE, no-slot trading lines, SEC line states, AI verdict ages).


## 7e. AI Assistant window — SETTLED (approved by Jonathan Sept 28, 01:21, with refinements A1–A5)

Drawing: v4_draft/AIAssistant/AI_1_Assistant.png (opened with "Ask AI about ABCD", PAPER, AUTO OFF, 07:43); with v3 in AI_Assistant_proposal_with_v3_comparison.pdf.
Sources: File 9 v3 §9.2 (approved: quick questions, sources on every answer, context not prediction, read-only, own queue, ticker → trade card); Decision Record §3.8 / §10.2 (explains, never an order authority); Files 2 §13 (plain language + the evidence behind it), 5 §9.2 (post-trade explanations), 7 §10 (explain contradictions), 8 §15 (verdict, confidence, reasons, risk flags, freshness, evidence); settled v4 items 1 (label "Ask AI"), 5 (AI old after 3 min), 7a (Ask AI about this trade), 7c (the AI can never change a setting), 7d (Ask AI about XXXX).

**A. Whole window**
1. Same thin top bar + alert line. Opens from "Ask AI" (top bar), Windows ▾, "Ask AI about XXXX" (Stock detail) and "Ask AI about this trade" (Review).
2. Three columns: QUICK QUESTIONS + EARLIER QUESTIONS (left) · CONVERSATION (middle) · CONTEXT ATTACHED, WHAT IT CAN READ, WHAT IT CAN NEVER DO, AI SERVICE (right).

**B. Asking**
3. Context attached as a chip ("📎 ABCD · live snapshot 07:42:31", or a Review trade, or an alert) when opened from another window; removable with ×.
4. Quick questions: pre-market brief on the Ranked 50 · what changed in the last 5 minutes · why the engine took, skipped or exited a stock · explain today's trades (from Review) · compare two stocks · what a filing, halt or alert means · NEW "Why is my button LIMITED or blocked?" (platform help, Q1).
5. NEW: 🎤 dictate a question (Q3).
6. Earlier questions: kept for Jonathan only, searchable; never used by the engine.

**C. Answers**
7. Fixed shape: SHORT ANSWER first · FROM THE DATA (facts) · THE NEWS AND FILINGS · MY READING · RISKS (interpretation, contradictions stated) · source chips with times (engine log, Massive, IBKR, Newswire, SEC EDGAR, Alpaca, Review). "Context, not a prediction." If a source is stale or down, the answer says so.
8. Every ticker in a question or answer is a link that opens the pop-up trade card (settled: the buy is the second click, on the card).
9. Asked to trade ("Buy 500 more ABCD"), it refuses and offers the trade card: "I can't place, change or cancel orders — that always stays with you. Open the ABCD trade card ▸", plus the size/limit facts.

**D. Locked limits (🔒)**
10. Can never: place, change or cancel orders · change settings or turn AUTO on/off · pin Level 2 or change the engine's verdicts · sit in the engine's path (own queue; questions never slow the engine or its AI checks).
11. WHAT IT CAN READ with freshness: engine states/ranks/signals/logs (live) · Level 2 slots (IBKR) and trades (Massive) (live) · news (Benzinga) · filings (SEC EDGAR) · FDA (openFDA) · your positions and orders (Alpaca) · Review (journal, replays, results) · Settings (read only) and the platform rules (File 9 v4).

**E. Service**
12. AI SERVICE: status and typical answer time; if down: "AI ASSISTANT UNAVAILABLE — trading and the engine are not affected".
13. NEW: "Used today: 18 questions · est. $0.21" (Q2).

**Questions for Jonathan (answered: Q1 yes · Q2 yes · Q3 yes with A5)**
Q1. Platform help: the Assistant can also explain the platform's own rules and states (why a button is LIMITED, what a state means), from File 9 and this log — Claude's pick: yes.
Q2. A small usage line (questions today, estimated cost) — Claude's pick: yes.
Q3. A 🎤 button to dictate questions — Claude's pick: yes (optional to use).

**ChatGPT's review (Sept 28, 01:19) — approves the architecture and Q1–Q3; five refinements; Claude agrees with all — SETTLED (Jonathan 01:21):**
A1. Historical context never looks live: from Review the chip reads "HISTORICAL TRADE · MNOP · 07:25:03" (from a Replay moment: "HISTORICAL · REPLAY 07:12:52"); a ticker clicked from there opens the trade card headed "LIVE CARD · CURRENT MARKET" (same guard as Review R3).
A2. Platform help answers from the current approved, versioned platform rules plus the live Settings state (which set is active, PAPER or LIVE, and its values) — not from an old File 9. Claude's addition: the answer names the rule and says when a value is a TEST value (e.g. "Hard limit $600 (LIVE set, TEST value)").
A3. Refusal wording replaced (the engine can place orders in AUTO ON): "The AI Assistant cannot place, change or cancel orders. To trade manually, open the current trade card ▸".
A4. Source chips are links where practical: Newswire → News & Catalysts · SEC → the filing · Alpaca position/order → Positions & Orders · engine event → Review / Stock detail. If sources disagree, the answer says "SOURCE CONFLICT" and shows both, never quietly picks one.
A5. Microphone for questions only: it only types into the question box; you review/edit the text and press Ask yourself; it never sends by itself and is never a voice-trading path. Claude's addition: listens only while you hold or click it (no always-on listening), with a visible "listening…" indicator.
Smaller (agreed): the answer sections (FROM THE DATA / NEWS AND FILINGS / MY READING · RISKS) appear only when relevant — "What does HALTED mean?" gets a short answer, not an empty template.
Q1 yes · Q2 yes (keep "est.") · Q3 yes with A5 — ChatGPT agrees with Claude.
Drawing updated (Sept 28): new refusal wording (A3), source chips as links (A4) + SOURCE CONFLICT rule in the side panel, a third exchange with a "HISTORICAL TRADE · MNOP · 07:25:03" chip and a short answer (A1, sections only when relevant), microphone note (A5), platform help reading the active rules and live Settings (A2).


## 7f. News & Catalysts window — SETTLED (approved by Jonathan Sept 28, 01:55, as one package: N1–N4, Q1–Q2, the default scope, the AI news rules and the RELATED row)

Drawing: v4_draft/News/NW_1_News_and_Catalysts.png (PAPER, AUTO OFF, 07:42, the ABCD 07:31 headline selected); with v3 in News_Catalysts_v4_with_v3_comparison.pdf. Same day and trades as the other drawings.
Drawing updated (Sept 28, after approval): scope button "Ranked 50 + My list + ALL OPEN POSITIONS" and "Open positions" (N1); column "MOVE SINCE" and, in the selected panel, "published 07:31:04 · received 07:31:07.180" with the move measured from the first tradable price after receipt (N2); WXYZ 424B5 shown as ONE event — SEC row marked PRIMARY, the Benzinga report of the same filing as an UPDATE sub-row, "2 sources = one event, counted once" (N3); heading "MARKET MOVEMENT SINCE HEADLINE — facts, not causation or prediction" (N4); a RELATED row (UVWX, outside the lists, chip-demand news → CDEF, KLMN, same sector); a note under the headlines that filters change only what you see; Dilution and filing watch covers the Ranked 50, My list and all open positions.
Sources: File 9 v3 §9.6 (approved: headlines newest first with time, stock, A–D grade, source and the AI's one-line reason; this is where grades live; selected-headline panel; ticker → trade card; "Dilution and filing watch" was a new idea, OPEN); Decision Record §2 and §8 (A–D = news quality only; exact age in detail views); Files 7 §6 and §10 (Benzinga, SEC EDGAR, openFDA; the AI explains contradictions); settled v4 items 5 (bright ~1 h then dim, display only; the engine judges news from real data), 7d (dilution line with source and time, 90-day TEST look-back), 7e (SOURCE CONFLICT, Ask AI with context).

**A. Whole window**
1. Same thin top bar + alert line. Opens from Windows ▾ and from a headline click in Stock detail. Ticker click = pop-up trade card (the buy is the second click, on the card); double-click = Stock detail.
2. Left: HEADLINES AND FILINGS. Right: SELECTED headline, and DILUTION AND FILING WATCH.

**B. Headlines**
3. Scope: "The 50 + My list + your positions" (default) · Your positions · All market · ticker search. Filters: grade A · B · C · D and source News · SEC · FDA.
4. Source freshness line: "Benzinga live · SEC EDGAR checked 07:41 · openFDA 06:00"; a stale or down source is named, never hidden.
5. Each row: exact time (to the second) + age · stock (with YOURS / ENGINE'S chip when held) · grade letter (bright under ~1 h, then dim — display only) · source (Newswire, SEC 424B5, SEC 8-K, FDA …) · headline + the AI's one-line reason · NEW: "SINCE" = price change since the headline (a fact, not a prediction) (Q1).
6. SOURCE CONFLICT shown on the row when sources disagree (e.g. "Newswire says two new states; the 8-K lists one") — both kept, never quietly one picked (same rule as 7e).

**C. Selected headline**
7. Grade, exact time + age + source, the stock with its owner chip, the full headline.
8. WHY THE AI GRADED IT (reasons, incl. the SEC dilution check with its time).
9. MARKET REACTION SINCE THE HEADLINE — "facts, not a prediction": price change, volume since, rank move, engine state, Level 2 slot.
10. CONTRADICTIONS (e.g. "negative filing but steady buying") and OTHER NEWS ON THE STOCK.
11. The rule, stated on screen: the grade is about the news only, never blocks a trade by itself, separate from the rank; bright ~1 h then dim (display only).
12. Buttons: Open XXXX page · Read full text ↗ · NEW "Ask AI about this headline ↗" (opens the AI Assistant with the headline attached).

**D. Dilution and filing watch** (v3 idea, proposed to settle — Q2)
13. Offerings (S-1, 424B), shelves (S-3), reverse splits and delisting notices for the Ranked 50, My list and ALL open positions (yours and the engine's — N1), newest first; look-back 90 days (TEST value, the same as Stock detail); "SEC checked 07:41"; if the SEC source is down: "SEC CHECK UNAVAILABLE since …".
14. Each row: stock · filing + time · what it means in plain words · YOURS / ENGINE'S when held; held rows tinted so none is missed.
15. Halts stay in the alerts and on the stock (a separate halts list was left out in v3 and stays out).

**FOR THE PROGRAMMER — which stocks the window shows (Jonathan, Sept 28, 01:34):** the default view shows news and filings ONLY for (1) the Ranked 50, (2) My list and (3) every stock with an open position (yours or the engine's). The "Your positions" button narrows it to held stocks; the "All market" button and the ticker search widen it to every stock the platform tracks (~8,000). The Dilution and filing watch uses the default group. Screen filters do not affect analysis: the engine monitors market-wide news for the eligible universe; the AI receives the relevant summarized news and filing context (as settled in v3: the AI gets summaries). (Wording corrected by ChatGPT, Sept 28, 01:45; Claude agrees.)
**How the AI gets news — stated by Jonathan (Sept 28, 01:47), SETTLED:** the LLM never receives every raw market headline. (1) The engine reads and filters all relevant news across the monitored universe. (2) The LLM receives summaries of the important, relevant news — especially for the Ranked 50, My list, all open positions, and other stocks the engine sees becoming important. (3) When needed, the LLM can fetch the full headline or filing for a particular stock. Result: market-wide awareness without flooding the LLM with thousands of unneeded headlines (fast and inexpensive).
**Outside-platform news — Jonathan (Sept 28, 01:50), SETTLED:** news about stocks outside the platform's lists reaches the LLM ONLY when the engine has already identified a clear relationship to a stock the platform monitors: same sector or industry · supplier / customer · competitor · FDA / regulatory event affecting similar companies · macro or market-wide catalyst. Example: a large chip company outside the lists reports news that moves the whole semiconductor sector, affecting a Ranked 50 stock. Random outside news is never fed to the LLM. Purpose: useful context without wasted time or cost.
  Claude's proposal — APPROVED by Jonathan (01:55): such related news can also show in the News & Catalysts default view as one row marked "RELATED → ABCD, QRST · same sector", so you see why it matters; it never shows unrelated outside news.

**Questions for Jonathan — answered: Q1 yes (as MOVE SINCE), Q2 yes**
Q1. The "SINCE" column (price change since each headline) — Claude's pick: yes.
Q2. Settle the Dilution and filing watch (was OPEN in v3), with the 90-day TEST look-back to match Stock detail — Claude's pick: yes.

**ChatGPT's review (Sept 28, 01:38) — approves the architecture, Q1 and Q2; four refinements; Claude agrees with all — APPROVED by Jonathan (01:55):**
N1. Scope label says it plainly: "Ranked 50 + My list + ALL OPEN POSITIONS" (yours AND the engine's, even when an engine-held stock has left the Top 50); the Dilution and filing watch uses the same group. Second button renamed "Open positions". (Same as the programmer note above; the drawing's "your positions" wording was too narrow.)
N2. "MOVE SINCE" (renamed from SINCE) is measured from the first tradable price after the platform RECEIVED the item, not from the vendor's publish time, so there is no look-ahead. Hover / selected panel shows both: "Published 07:31:04 · received 07:31:07.180". Claude's addition: the same received time is what Review and the engine's research use (File 5: provider, receive and processing timestamps kept separately).
N3. One event, several reports: when Benzinga reports an SEC filing also received from EDGAR (or several outlets carry the same story), they are grouped as ONE event with all sources and times ("2 sources"), marked PRIMARY and UPDATE; the engine must not count them as independent catalysts. SOURCE CONFLICT only when sources truly disagree; a later correction or addition shows as UPDATE.
N4. Selected panel heading: "MARKET MOVEMENT SINCE HEADLINE — facts, not causation or prediction" (a +22% move afterward does not prove the headline caused it).
Q1 yes (as MOVE SINCE with N2) · Q2 yes (90-day TEST look-back, SEC freshness shown) — ChatGPT agrees. Halts stay out of this window (agreed).
ChatGPT (01:45) approves News & Catalysts with N1–N4 and the corrected wording above. **Jonathan (Sept 28, 01:55): "I approve the whole package."**

## 7g. System Health window — SETTLED (approved by Jonathan Sept 28, 02:22, with refinements H1–H4, the data-gap wording and Claude's additions)

Drawings: v4_draft/SystemHealth/SH_1_System_Health_normal.png (PAPER, AUTO OFF, 07:42, everything healthy) and SH_2_States_and_examples.png (every problem state); with v3 in System_Health_v4_with_v3_comparison.pdf. Same day and data as the other drawings.
Drawings updated (Sept 28, after approval): band chip "STRATEGIES · all available"; checklist note "Already LIVE: a failure blocks new risk per its rule, exits stay available — never switched back to PAPER by itself" (H1); "IF IT FAILS" for news / SEC / FDA / AI = "strategies that need it: off" (H2); new panel STRATEGIES · WHAT EACH NEEDS (example); two checklist pairs merged (15 checks); SH_2: IBKR / news / AI bands name the strategies that are off (H2), broker sync in two bands — account level NOT SAFE TO TRADE and one-stock DEGRADED · ABCD BLOCKED (H3), new RECOVERING band with the live checks, and section 5 rewritten for verified recovery, the never-auto-resume list and repeated drops (H4).
Sources: File 9 v3 §2.6 and §9.7 (status bar, pre-flight checklist, data feeds with last message and delay, speed of each step, data quality, IBKR login, Level 2 slot changes, reconnects and errors saved in the audit log, server); Files 2/4/5/8 (a stale feed or disconnect is never silent; source + timestamps on every event); settled v4 items 1 (health in words: HEALTHY / DEGRADED / NOT SAFE TO TRADE; LIVE start-up checks), 5c (Level 2 down), 5f (alert levels), 5g (connection-loss rules, laptop offline stops nothing), 5h (three connections, Alpaca multi-signal check and three labels, Massive-down rule, source map, margin calls 0 — TARGET 0), 7b (broker check), 7c (connections, S6), 7e (AI service), 7f (source freshness).

**A. Whole window**
1. Same thin top bar + alert line. Opens from the health word in the top bar (click; hover shows ORDERS · ALPACA / LEVEL 2 · IBKR / MARKET DATA · MASSIVE separately) or Windows ▾.
2. STATUS BAND across the top: the health word + the reason + the check time, and NEW "WHAT WORKS NOW" chips: AUTO CAN START · YOUR BUY / SHORT · EXITS · LEVEL 2 STRATEGIES (Q1). Every state in words, never color alone. "Run all checks now" button.
3. Three columns: checks and the three health words (left); connections, speed, data quality, source map (middle); account safety, Level 2 slots, incidents, server & control panels (right).

**B. Start-up & safety checks** (v3 pre-flight checklist, updated for the hybrid)
4. Two groups (Q2). MUST PASS — one failure blocks AUTO and going LIVE: approved versions loaded · PAPER/LIVE clearly set · Alpaca connected, correct account · cash and buying power read from Alpaca · leverage 1× at Alpaca = 1× platform · long-only at Alpaca (Phase 1) · positions and orders match Alpaca · no intraday margin call · Massive live, not stale · clock synchronized · market calendar and session · risk engine and loss limits loaded · journal and database writing · STOP AUTO / FLATTEN ALL path working. SHOULD PASS — if not, DEGRADED, still safe to trade: IBKR Level 2 logged in · news & filings sources fresh · AI service ready.
5. Runs at 4:00 a.m., before AUTO starts or LIVE is switched on, and all session. A failed check shows ✗ (must pass) or ! (should pass) with its reason, time and what it blocks.
6. The three health words explained on screen: HEALTHY = every check passes · DEGRADED = something is missing, trading still safe · NOT SAFE TO TRADE = new entries blocked; exits stay available whenever Alpaca can be reached.

**C. Connections** (v3 "data feeds", now per provider)
7. Rows: ORDERS · ALPACA · LEVEL 2 · IBKR · MARKET DATA · MASSIVE (trades, quotes) · NEWS · BENZINGA · FILINGS · SEC EDGAR · FDA · openFDA · AI SERVICE. Each: status word, last seen time, delay, and NEW "IF IT FAILS" = the settled consequence (health word + what is blocked + alert level). The v3 row "IBKR · orders and account" is gone (Alpaca now).
8. Under the Alpaca row: the multi-signal check (stream · API heartbeat · order endpoint · account endpoint · network · status page as one signal only) → CONNECTED / OUR ALPACA CONNECTION LOST / ALPACA OUTAGE / ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN (settled 5h). "Manual backup: use Alpaca directly" only with OUR ALPACA CONNECTION LOST.
9. Row states in words: connected · SLOW · RECONNECTING… attempt n · NEEDS LOGIN · STALE since … · DOWN since …; never an "OK" without a time. A failure never changes a setting (S6: "ON · UNAVAILABLE — IBKR L2 DOWN").

**D. Speed and data quality**
10. Speed of each step (sample values until measured): market event → server (Massive) · Level 2 update (IBKR) → server · update → engine signal · signal → risk and margin check · check → order sent · order → Alpaca confirms · Alpaca → first fill · total signal → fill.
11. Data quality: stocks watched · ranked-list refresh · stale symbols · gaps repaired · halted now · orders rejected · alerts today · AI check age.
12. WHERE EACH NUMBER COMES FROM (settled 5h source map): quotes/trades Massive · Level 2 book IBKR · orders, fills, positions, cash, buying power, borrow Alpaca · news Benzinga · filings SEC EDGAR · FDA openFDA; every event keeps provider, received and processed times.

**E. Right column**
13. ACCOUNT SAFETY · ALPACA (NEW): INTRADAY MARGIN CALLS: 0 — TARGET 0 · margin stage NORMAL / HEADROOM LOW / CALL · leverage 1× Alpaca = 1× platform ✓ · shorting OFF at Alpaca, Phase 1 of 4 · broker check IN SYNC + time + "check now" (7b) · CLOSED BY ALPACA: none today.
14. LEVEL 2 SLOTS · IBKR: the three current slots (with YOURS / ENGINE'S chips) and today's slot changes with the reason (v3).
15. INCIDENTS TODAY (v3 "reconnects and errors"): saved in the audit log and listed in Review's Day events; connection incidents counted in Performance (7a item 28).
16. SERVER & CONTROL PANELS: CPU, memory, event backlog, disk (v3) + NEW: this laptop and the phone with last-seen time; laptop offline stops nothing, the phone shows "Control panel offline · AUTO ON" (5g).

**F. States (SH_2)** — the band for each case, with what still works and the alert level:
17. DEGRADED — IBKR NEEDS LOGIN · LEVEL 2 PAUSED (Attention) · NOT SAFE TO TRADE — OUR ALPACA CONNECTION LOST / ALPACA OUTAGE / CAUSE UNKNOWN (Critical) · NOT SAFE TO TRADE — MASSIVE DATA STALE (Critical; your BUY/SHORT refused while data is stale, per 2c; exits available) · NOT SAFE TO TRADE — INTRADAY MARGIN CALL (Critical, settled 5h) · NOT SAFE TO TRADE — CLOCK OUT OF SYNC (Critical; limit TEST) · DEGRADED — AUTO BLOCKED — BROKER SYNC (Critical, Q4) · DEGRADED — NEWS SOURCE DOWN (Attention, Q3) · DEGRADED — AI SERVICE UNAVAILABLE (Attention; trading and engine not affected, 7e).

**Questions for Jonathan — answered (see H1–H4 below)**
Q1. "WHAT WORKS NOW" chips on the status band — Claude's pick: yes.
Q2. The checklist in two groups, MUST PASS (blocks AUTO and LIVE) and SHOULD PASS (DEGRADED only) — Claude's pick: yes.
Q3. News, SEC or FDA source down = DEGRADED; the stock's news shows NEWS UNKNOWN, never "no news"; whether the engine trades smaller while news is unknown stays OPEN (testing) — Claude's pick: yes.
Q4. Broker sync mismatch = DEGRADED with "AUTO BLOCKED — BROKER SYNC" (Critical, as settled in 7b), because your trading in other stocks is still safe — Claude's pick: yes.
Q5. Recovery: health returns by itself when checks pass (after a fresh broker check for any broker problem). AUTO carries on by itself only after a short blip (under ~10 s, TEST value); after a longer outage AUTO stays blocked until you press Resume AUTO (hold 2 s). Engine positions during a long outage: fail-safe stays OPEN (reliability testing) — Claude's pick: yes.
**ChatGPT's review (Sept 28, 02:18) — approves the architecture; four refinements; Claude agrees with all — APPROVED by Jonathan (02:22):**
H1. (Q1, Q2 yes) Wording: a MUST PASS failure never switches a LIVE account back to PAPER by itself. It means LIVE cannot be newly switched on, and while already LIVE new risk is blocked as the rule for that check says; exits stay available whenever execution is possible. (Same spirit as S6: a failure never silently changes a setting or mode.)
H2. (Q3 changed) Missing news / SEC / FDA source = strategy-dependent, not "trade smaller": a strategy that REQUIRES the missing source becomes unavailable ("ON · UNAVAILABLE", like the Level 2 rule); strategies that don't need it continue; the engine never reads unavailable news as "no news" (NEWS UNKNOWN). Whether extra size reduction helps stays a testing question. Claude's addition: each strategy declares the sources it needs (Level 2, news, SEC, FDA, AI), and the status band lists which strategies are off and why.
H3. (Q4 corrected) Claude's Q4 was wrong — broker mismatch already has two levels, settled in 7b (P3): one stock disagrees (e.g. ABCD shares) → "DEGRADED · ABCD BLOCKED — BROKER SYNC": only ABCD gets no new entries, other stocks may trade; cash, buying power, total positions or account state disagree → "NOT SAFE TO TRADE · AUTO BLOCKED — BROKER SYNC": all new entries blocked. Exits always available; Alpaca's numbers win. (7b item G's single-level sentence is superseded by P3 — clean up in the final build.)
H4. (Q5 changed) No blanket 10-second rule. After an outage AUTO may continue by itself only when a verified recovery passes: connection/data genuinely healthy again · positions and orders match Alpaca · no UNKNOWN order unresolved · no unresolved data gap that affects an active strategy, open position or pending order (ChatGPT 02:21 wording; a small unrelated gap does not block AUTO) · clock and risk state valid. If anything is uncertain, AUTO stays blocked until you press Resume AUTO. Never auto-resume, whatever the duration: margin call, hard daily limit, FLATTEN ALL, a deliberate STOP AUTO, an unresolved broker mismatch (plus the settled soft-limit / give-back pauses, which already need Resume AUTO). Claude's additions: the band shows the recovery checks live ("RECOVERING — checking: connection ✓ · positions match ✓ · UNKNOWN orders 0 ✓ · gaps repaired …"), then "AUTO CONTINUES" or "AUTO STAYS BLOCKED — press Resume AUTO · reason"; and anti-flapping: repeated outages (e.g. 3 in 15 minutes, TEST) keep AUTO blocked until you resume.
Also agreed: IBKR Level 2 failure = DEGRADED + Attention (5h), not a Critical platform failure; Level 2 strategies stop, the rest continues if its own inputs are healthy.
ChatGPT (02:21) approves the whole revised package, including both Claude additions (strategies named in the band; live recovery checks; anti-flapping with the frequency as a TEST value), with the data-gap wording above. Claude agrees. **Jonathan (Sept 28, 02:22): "I approve."** Q1 yes · Q2 yes · Q3 replaced by H2 · Q4 replaced by H3 (the settled P3 two levels) · Q5 replaced by H4.
Log clean-up for the final build: 5f item 8 lists "IBKR disconnected / needs login" as Critical and v3 §2.6 turns the dot red for an IBKR login; both were written before the hybrid. 5h (settled later) makes it DEGRADED + Attention — 5h wins.

## 7h. Extra pages — pop-up trade card · thin top bar · phone view · reference pages — SETTLED (design approved Sept 28, 09:50; drawings approved Sept 28, 10:28)

Claude's proposal (Sept 28, 09:40), reviewed by ChatGPT (09:48, approves Q1–Q5 with refinements E1–E4); Claude agrees with all and added two items. Jonathan: "I approve" (09:50). ChatGPT's order kept: drawings next, then the whole extra-pages phase is marked SETTLED.
Sources: File 9 v3 §9 (thin bar), §9.9 (phone view, approved, never drawn), §9.10 (pop-up trade card, approved), §7 (who controls each position), §8 (signals, colors and sounds), Figure 9 (windows map); settled v4 items 1, 2, 2b, 2c, 3, 4, 5, 5c, 5d, 5e (consistency rule), 5f, 5g, 5h, 7a (R3), 7b (P2, P3, CANCEL ENGINE ENTRY), 7c (S2, S5), 7d, 7e (A1), 7f, 7g.

**A. Pop-up trade card** (updates v3 §9.10; the same card as the strip card — consistency rule 5e)
1. Opens from any ticker in any window (a headline, the AI chat, Review, Positions & Orders, Stock detail links) and from a blink chip in the thin top bar. Not from the main list (settled 5b). The buy is always the second click, on the card. × or Esc closes it; "Full page" opens Stock detail; double-click on a ticker opens Stock detail instead of the card.
2. Content: header (ticker that blinks on a signal, signal text, rank, Level 2 slot or "no Level 2 slot", owner chip, Full page, ×) · price line (price, change, LONG/SHORT setup, NEWS A · 11m, SPR box, AI GO · 40 s, OLD after 3 min) · small chart (your entry and STOP lines, or the engine's RISK LINE; engine marker) · engine line · AI line · position line (shares, average, P&L $ and %, "STOP $1.95 move ×" or "+ STOP") · order status (RISK CHECK… · WORKING 583 @ ≤ $2.24 · CANCEL · PARTIAL · NOT FILLED · REJECTED · UNKNOWN · checking with Alpaca) · order size bar 10% · 25% · 50% · $2,000 · FULL CAP (one size for the whole platform; dimmed in AUTO ON) · the four buttons BUY · SELL/EXIT · SHORT · COVER, always in the same places, greyed when not applicable, never removed.
3. Special states: engine entry working → CANCEL ENGINE ENTRY (hold 1 s) then "ENGINE RE-ENTRY PAUSED ×" · engine position → exit locked, OVERRIDE EXIT (hold 1 s), RISK LINE · YOURS · OPENED OUTSIDE PLATFORM · HALTED · elapsed · EXIT NOT FILLED → SELL LOWER TO $x · LIMITED by cash / cap · NOT ELIGIBLE (OTC) · blocks with the reason: HARD LIMIT, INTRADAY MARGIN CALL (+ "EST. SELL x TO CURE MARGIN"), NOT SAFE TO TRADE, ABCD BLOCKED — BROKER SYNC, DATA STALE · from Review / historical AI context: header "LIVE CARD · CURRENT MARKET · now 07:42:31" (settled R3 / A1).
4. NEW: while shorting is off at Alpaca (Phase 1), SHORT reads "SHORTS OFF · long-only"; "no borrow" only once shorts are enabled.
5. NEW (Q3): closing the card never cancels a working order (it keeps going and stays visible in the strip and Positions & Orders); the card's buttons are locked briefly after it opens so a double-click on a ticker can never land on BUY (about 0.5 s — TEST value, E4).
6. One card at a time: another ticker click replaces it. It opens next to the click, never covers the top bar or alert line, and can be dragged.

**B. Thin top bar in every window** (+ the 22 px alert line under it)
7. Kept: ← MAIN WINDOW F2 · window name · PAPER / LIVE · AUTO state · live blink chips · DAY P&L · health word (hover: ORDERS · ALPACA / LEVEL 2 · IBKR / MARKET DATA · MASSIVE) · FLATTEN ALL (hold 1 s).
8. NEW: the red LIVE frame in every window. AUTO state in words (AUTO OFF — YOU TRADE / AUTO ON — ENGINE CAN TRADE / AUTO BLOCKED — reason / AUTO PAUSED — reason). Q1: a one-click STOP AUTO in every window while AUTO is on; turning AUTO on and Resume AUTO only in the main window.
9. NEW (Q2): a small SOFT LIMIT / HARD LIMIT tag next to Day P&L only when reached; the session clock ("PRE-MARKET 07:42 ET"); Windows ▾ — if the 1536 px stress test passes. Ask AI stays out (it is in Windows ▾).
10. Blink chips (E1): only for stocks that matter to you — My list, the Level 2 slots, the Selected stock, and ALL open positions (yours and the engine's); newest 3 shown, then "+N more"; EXIT? chips (your positions only) first. Chips follow the blink rule (about 5 s blink, solid while active, gone when the signal ends). Click = pop-up trade card.
11. Fit rule: tested at 1536 px with the longest states; FLATTEN ALL can never be pushed off; the window name shrinks first, then the chips (fewer shown, "+N more").

**C. Phone view** (v3 §9.9, now drawn)
12. Shows: PAPER / LIVE — REAL MONEY (red frame in LIVE) — display only, the phone can never switch the account between PAPER and LIVE (E2); AUTO state; health word; clock; "Control panel: laptop offline" when true (5g); Day P&L, equity, loss meter; the Critical banner (stays until resolved; SEEN stops the sound); today's alerts; open positions (owner chip, shares, P&L, HALTED / EXIT? / STOP / order working; tap = read-only detail).
13. Controls: STOP AUTO (hold 1 s, against pocket taps) · FLATTEN ALL (hold 1 s) · SELL/EXIT of YOUR positions (Q4 + E3): hold 1 s, the same protected exit logic as the desktop; SELL LOWER TO $x also needs the hold; engine positions only through FLATTEN ALL; exits are enabled only when the phone has fresh Alpaca/account state and execution is healthy — if the phone is stale or offline, or that stock has an UNKNOWN order, the exit controls lock and say why; a halted stock shows "HALTED · exit pending" as on the desktop (Claude's addition); every phone action is logged "from phone".
14. Never on the phone: BUY / SHORT, turning AUTO on, Resume AUTO, PAPER ↔ LIVE, settings, OVERRIDE EXIT, CANCEL ENGINE ENTRY.
15. Notifications: Critical always sent and cannot be turned off inside the platform while LIVE; Attention is your choice; Info never. The platform cannot override the phone's own notification settings (ChatGPT wording). Claude's addition: if notifications are blocked in the phone's settings, the phone view shows "NOTIFICATIONS OFF IN PHONE SETTINGS — you won't get Critical alerts", and System Health's Control panels row shows it too. Tapping a notification opens the phone view at that item.
16. Safety: sign-in with a PIN or Face ID; if the phone loses connection it shows "PHONE OFFLINE · last update 07:40" so old numbers never look live. How the phone page is built (web page on the home screen or an app) is a build decision.

**D. Reference pages** (Q5)
17. "Who owns a position" (replaces v3 §7): the four ownership labels (YOURS / ENGINE'S / WOULD-HAVE / YOURS · OPENED OUTSIDE PLATFORM); every control (STOP AUTO, CANCEL ALL ENTRIES, CANCEL ENGINE ENTRY, OVERRIDE EXIT, FLATTEN ALL, + STOP); "CLOSED BY ALPACA · MARGIN" and "ENGINE RE-ENTRY PAUSED"; hard controls block new risk but never close your positions; the updated 10:00–10:30 example; v3's open loss-limit question shown as settled (soft limit never blocks your buys, hard limit does).
18. "Signals, colors, sounds and alerts" (replaces v3 §8): one job per color, blink rules (≈5 s then solid), HALTED · elapsed, the three alert levels with their lists (IBKR login = Attention per 5h), sounds and anti-spam, the three health words, NEWS UNKNOWN.
19. "Windows map" (updates v3 Figure 9): the main window that never closes, the 7 windows and how each opens, the pop-up trade card, the phone.

**Drawings (Sept 28, after approval)** — v4_draft/ExtraPages/: EX_1_Trade_card_in_News (ABCD clicked in News & Catalysts: yours, PARTIAL 300/521 working ≤ $2.24, + STOP, SHORT "off · long-only", new thin bar) · EX_2_Trade_card_states (engine entry + CANCEL ENGINE ENTRY, engine position + OVERRIDE EXIT, opened outside platform, EXIT NOT FILLED → SELL LOWER, halted + COVER PENDING, closed, hard limit, margin call + cure button, NOT SAFE TO TRADE, one-stock broker sync, UNKNOWN order, not eligible, SIZE LIMITED / FULL CAP, AUTO ON, SHORT wording now → later, LIVE CARD header, opening lock, order statuses) · EX_3_Thin_top_bar_fit_test (5 states incl. the longest; all fit, FLATTEN ALL 10 px from the edge; red LIVE frame) · EX_4_Phone_view (laptop closed · selling with a hold · LIVE critical · locked: offline / UNKNOWN / halted) · EX_5_Who_owns_a_position · EX_6_Signals_colors_sounds_alerts · EX_7_Windows_map; with v3 in Extra_pages_v4_with_v3_comparison.pdf.
Fit rule made exact while drawing (Claude; approved by ChatGPT and Jonathan, 10:28): when the thin bar runs out of space — (1) the window name shortens, (2) chips shorten to arrow + ticker ("▲ ABCD"), (3) the "LIVE ALERTS" label hides, (4) chips drop into "+N more". In the longest state 2 chips show (+4 more).
System Health drawing SH_1 updated for item 15: the Control panels line now reads "Phone · last seen 07:40 · notifications allowed" (SH PDF rebuilt).
**Drawings approved — ChatGPT (10:25) and Jonathan (10:28): "The rest I approve." Two clarifications kept (SETTLED):**
- Safety states never disappear to save space: PAPER / LIVE, AUTO BLOCKED / PAUSED, SOFT / HARD LIMIT when active, the health word and FLATTEN ALL always stay visible in the thin bar; the less important navigation and signal text gives up space first (window name, chip text, "LIVE ALERTS" label, extra chips). When the bar wording has to be short, the full reason is in the alert line. (Added to the EX_3 rules box.)
- Phone notification status in System Health reads "PHONE NOTIFICATIONS · OS PERMISSION ALLOWED" when verified (the phone's operating system controls the permission); when blocked: "PHONE NOTIFICATIONS · OS PERMISSION BLOCKED", matching the phone's own banner. (SH_1 updated; SH PDF rebuilt.)
The platform makeup is complete: main window (1–5h), the seven windows (7a–7g) and the extra pages (7h).
**Carried to the final build**
- The live card in Review_2b shows only BUY and SHORT — it gets the four fixed buttons (5c).
- Every exact UI timing (card open lock, blink length, chip count) is a starting / TEST value (E4); the behavior is settled.

## 7i. Phase 0 — research and validation architecture — SETTLED (Jonathan approved Sept 28, 11:07)

Proposed by ChatGPT (Sept 28, 10:39); Claude's 12 suggestions; ChatGPT's review with 4 refinements (11:05); Claude agrees; Jonathan: "I approve" (11:07).
Sources: Files 1 (out-of-sample scores, no look-ahead, walk-forward), 2 (§ backtests: look-ahead, survivorship, corporate actions, spreads, liquidity, slippage, halts, rejected orders), 3 (chronological validation, untouched out-of-sample), 4 §15 (Jonathan's four training rules: no future peeking, locked "secret test exam", realistic friction, no survivorship bias), 5 (DAT-011, TST-005, Stage 8), 7 (~200 stock-day Level 2 start, no-look-ahead example selection, skepticism of very high win rates), 8 (hidden out-of-sample, walk-forward, regime tests).

**A. Purpose**
1. Phase 0 is the empirical validation stage: it decides whether Jonathan's opportunity classes, ranking logic, entries, exits, re-entries, risk rules and supporting features give a repeatable advantage on real historical market data after realistic trading friction — before months are spent building everything around assumptions. It is not the final training cycle and not live trading.
2. Questions it must answer: can the engine detect the designed move types (explosive runners, moderate moves, rebounds, slow sustained trends, post-spike secondary moves; shorts later), early enough to be useful? Does the Ranked 50 surface the best opportunities from the broad universe? Which signals/features matter and which are noise? Does early-deterioration exit + structural backstop + stricter re-entry beat holding through pullbacks after spread, slippage, commissions, missed fills and whipsaws? Can it avoid deep reversals (e.g. $3 → $1.50)? How does it behave across regimes (hot momentum, quiet, selloffs, low volume, different volatility)? How much do costs and liquidity reduce the edge? What sizes are realistically tradable? Is historical Level 2 needed, and how much? Is Massive alone enough for some strategy classes? Is a larger research cycle justified? What must change before paper trading?
3. Output — one verdict for each major strategy component and for the platform concept as a whole: **GO · GO WITH CHANGES · NO-GO · NOT ENOUGH EVIDENCE** (the fourth when a class appears too rarely in the sample to judge — different from NO-GO).

**B. How it is built**
4. The same core engine / scanner / ranking / strategy code intended for live trading, connected to a research adapter instead of Alpaca: Massive historical data → event-by-event replay → engine → simulated execution → Review / Performance analysis. Not a UI project: the approved Review / Performance design can show results, but the priority is the research engine; Alpaca, real-money controls and finished production features are not needed for Phase 0.
5. The simulated broker models: bid/ask spread, protected entry ceilings, slippage, liquidity, partial fills where reasonably modelable, fees, halts (incl. LULD reopen gaps), session rules, order delays, failed or missed entries, exits and re-entries — never a backtest where every order fills at the wanted price.

**C. Research rules (Jonathan's four training rules + walk-forward)**
6. No look-ahead: at every historical moment the engine uses only what was available then — no future high, headline, rank or volume leaks backward (also into features, normalization, labels, candidate selection and thresholds).
7. Locked final "secret exam": a recent period is kept untouched and used once, at the very end.
8. Realistic trading costs / friction (B5).
9. No survivorship bias: the history includes delisted, bankrupt and collapsed stocks and corporate actions (splits, reverse splits, symbol changes).
10. Walk-forward testing is a core requirement: tune on the past → test on the next unseen period → move forward → repeat.

**D. Guarding against fooling ourselves**
11. GO rules written down BEFORE the tests run (minimum trade count, results after costs, worst drawdown, stability across regimes), so the goalposts can't move after seeing numbers.
12. The sample is chosen by rules decided in advance, not by eye: quiet days, fake breakouts and failures, not only famous runners. Start with a representative sample across regimes, not all 23–26 years; expand only if results justify it.
13. Compare against simple baselines (a plain momentum rule; random entries with the same exits): the full engine must beat them after costs.
14. Side-by-side variants (e.g. A structural hold · B early-deterioration exit + re-entry · C without Level 2 · D with Level 2); the number of variants is limited and every variant tried is recorded (many variants make a lucky false winner likely).
15. Ranked 50 detection measure: for each big mover in the sample, when it entered the Ranked 50 and the top 3, and how much of the move was still left.

**E. AI in Phase 0 (refinement 1)**
16. Phase 0 establishes the engine's edge WITHOUT the LLM first. The AI is then tested as a separate, additive component and must earn its place by improving unseen results after costs.
17. Historical AI tests are trusted only when the model provably could not know the future — e.g. a model whose knowledge cutoff is before the test period. Hiding tickers/dates may be tried as an experiment but is not proof. When the AI model is upgraded, its cutoff moves, so its test window moves forward and it is re-validated before it influences trading again (Claude's addition).

**F. Data, budget and outputs**
18. Historical Level 2: buy a small representative sample first — about 200 stock-days (TEST / BUDGET value, refinement 3) — and more only if learning curves and out-of-sample results show it helps (File 7). Needed for the "with / without Level 2" comparison; Massive does not supply historical Level 2.
19. Reproducible: every run records its data snapshot, code version, parameters and settings. Results appear in Review labelled RESEARCH, never mixed with PAPER or LIVE.
20. Phase 0 sets the initial TEST values for trading / model parameters — ranking thresholds, entry requirements, deterioration thresholds, structural stops / risk lines, re-entry requirements, slippage ceilings, liquidity / capacity limits, strategy parameters. User-interface timings (blinks, sounds, NEW tag, re-sort speed) are tuned in usability and paper testing, not here (refinement 2).
21. Phase 0 has a budget and a time limit (data purchases and computing), set before it starts.
22. After Phase 0: paper trading, then small live — the gates in Files 5, 7 and 8 stay as written.

## 7j. Security, resilience and platform protection — SETTLED (Jonathan approved Sept 28, 11:07)

Proposed by ChatGPT (Sept 28, 10:39); Claude's 11 suggestions; ChatGPT's review with refinement 4 (11:05); Claude agrees; Jonathan: "I approve" (11:07). Designed in from the start, not added later. Exact vendors, cloud topology, firewall rules, backup frequency, failover design and penetration-testing tools are chosen during construction, but the architecture must support every requirement here from day one.

**A. What it protects** — the account and money; broker / data credentials; trading logic and source code; market data and logs; server infrastructure; the integrity of orders, positions and risk controls. Security stays off the low-latency trading path wherever possible so it does not slow scanning, signals or execution.

**B. Threats it must handle** — hackers / unauthorized access; stolen API keys; a compromised laptop or phone; cloud / server / data-center failure; network outages; Alpaca, IBKR or Massive outages; stale, corrupted or conflicting data; duplicate orders after reconnects; UNKNOWN order states; software bugs or runaway trading loops; risk-engine failure; broker / platform position mismatches; database corruption or data loss; bad deployments; clock failures; overload, latency spikes, queue backlog; malicious or untrusted news, filings or text reaching the AI; accidental LIVE-setting changes; halts, flash crashes, inability to exit.

**C. Required from day one**
1. MFA and least-privilege access; secrets in a secure store, never hard-coded, never in logs; execution credentials never in the UI, browser or phone (they talk only to our server); keys masked (settled 7c).
2. Encryption in transit and at rest; restricted server / network access and firewall rules.
3. Separate Research, Paper and LIVE environments; separate keys per environment. The coder (Codex) and any AI coding tool never receive LIVE credentials: development uses paper keys only; LIVE keys exist only on the LIVE server; the code repository is scanned for secrets.
4. Trading API keys have no withdrawal permission.
5. Tamper-evident, append-only audit logs (checksum chain) for orders, fills, settings and overrides.
6. Unique / idempotent order IDs; UNKNOWN orders never resent until Alpaca confirms (settled 7b).
7. Independent order circuit breakers OUTSIDE the strategy logic, so a strategy bug can't bypass them: maximum orders per time window · maximum notional per order · maximum aggregate new exposure · duplicate-order protection · price sanity bounds on every limit order · abnormal order-rate detection. Tripped → "AUTO BLOCKED — ORDER LIMIT" (Critical).
8. Independent risk / kill controls; fail-safe rule: if account or order state is uncertain, block new risk (settled 5h, 7b, 7g).
9. Entry orders always expire (never good-till-cancelled), so an order stranded by a crash can't fill hours later.
10. Continuous Alpaca reconciliation (7b broker check, two levels).
11. Encrypted, off-site backups with scheduled, tested restores; recovery targets start as TEST values.
12. Server monitoring: CPU, memory, disk, latency, health, queue backlog (System Health, 7g).
13. Versioned deployments with rollback; no normal deployments during the trading session (4:00 a.m.–8:00 p.m. ET) except emergency fixes; only approved versions go live (settled 7c versions / PROMOTE).
14. Security updates, pinned dependencies and vulnerability checks.
15. External news, filings and web text are untrusted data, never instructions; the LLM is outside the execution path, has no order or settings authority, and its output is checked before use (settled 7e, 7f).
16. Clock synchronization from several sources; drift beyond the limit = NOT SAFE TO TRADE (7g).

**D. Outside watchdog**
17. A small independent service outside the trading server's failure domain (different machine / provider) checks the server's heartbeat and sends "SERVER UNREACHABLE" to the phone when it stops. It has notification authority only — no trading keys.

**E. Second emergency route and account security**
18. Jonathan knows how to cancel everything, close positions and suspend trading directly at Alpaca, independent of our server (matches "Manual backup: use Alpaca directly").
19. Account protection (the most likely theft route for one person is account takeover): MFA on Alpaca and on the email account (the recovery path); a carrier PIN / SIM-swap protection on the phone number; a password manager; alerts on bank-link and withdrawal changes.

**F. AI budgets (refinement 4)**
20. Assistant AI (chat / Q&A): a daily budget; when reached → "AI ASSISTANT DEGRADED · DAILY BUDGET REACHED"; trading continues normally.
21. Trading AI / context (only if validated into the decision system): separately provisioned and monitored, with an early warning well before its limit (Claude's addition) and a predefined fallback tested before LIVE — the engine-alone mode validated in Phase 0 (7i E16), shown as "AI context check: ON · UNAVAILABLE" (settled). No cost cap may silently change the live strategy mid-day.

**G. Resilience and recovery**
22. Define what happens if the primary server or data center fails; preserve positions, order state and logs.
23. Every restart / recovery: rebuild from Alpaca, resolve UNKNOWN orders, check clock and data, show RECOVERING; AUTO stays blocked until reconciled (settled 7g H4); never blindly resend orders.
24. Failure drills in PAPER before LIVE: cut the network, kill processes, restart with open orders — confirm recovery checks and duplicate-order protection work.
25. Standby / failover infrastructure later, if account size justifies it.

**H. Screen**
26. System Health shows only the important states (HEALTHY / DEGRADED / NOT SAFE TO TRADE, provider outages, broker sync, stale data, server issues, recovery); security never clutters the trading screen.

**Small screen additions approved (do not reopen the makeup; drawn in the final build):** Review results filter gets a RESEARCH label, separate from PAPER and LIVE · the phone shows "SERVER UNREACHABLE" from the outside watchdog · AUTO gets one more blocked reason, "AUTO BLOCKED — ORDER LIMIT" (thin bar, main bar, System Health, alert levels: Critical).

## 7k. Final package audit and corrections — SETTLED (Jonathan approved Sept 29)

ChatGPT audited the delivered final package (Sept 29): the 91-page Master Specification (Word and PDF identical to the copies in the ZIP, visually clean), ZIP integrity, all 30 mockups present and referenced, no v3 material, Phase 0, security, the hybrid architecture and the latest window rules present. It found five items to correct before coding begins. Claude checked each one against this log, File 9 v3 and Files 1–8 (right on four; on point 3 the record showed an approved table, not an invented default). ChatGPT refined points 2 and 4; Claude added the spread thresholds (point 2) and corrected the level count and the "in position" wording; ChatGPT agreed. **Jonathan: "I approve" (Sept 29).**

1. **Leverage steps** — Claude's mistake in the build. The Master said "1.25×–2×" (§2.7, and the OPEN list in §17). The approved version is 1× → 1.5× → 2× (5h: ChatGPT's change at 12:12, Jonathan's "I approve" at 12:13, Sept 26). SETTLED: §2.7 Phase 4 reads "only if the platform's margin numbers match Alpaca's reliably: consider 1.5×, later 2×"; the OPEN item becomes "whether and when to move to 1.5× and later 2× — only after clean real-money testing". The step sizes themselves are not open.
2. **Settings page 3 (Screen & sounds)** — "one shared set for PAPER and LIVE" was Claude's own reading of S1 (7c, final check), was never decided, and contradicted "PAPER and LIVE keep separate Settings sets". Claude offered A (separate) or B (shared, as built); ChatGPT proposed a split by purpose; Claude added the spread thresholds; ChatGPT added locked levels; Claude corrected the count to four levels (5f, 7c). SETTLED:
    - 🔒 LOCKED: the four alert levels SIGNAL / INFO / ATTENTION / CRITICAL, shown as a fixed 🔒 label per event, never a choice. No setting can turn a margin call or "EXIT NOT FILLED" into a quiet alert.
    - Separate for PAPER and LIVE (anything that protects you): sound, volume and on / off for every event; which stocks trigger signal sounds; the anti-spam interval; the spread-warning thresholds (1% / 2% — moved out of List & display because they are a warning; Claude's addition). In LIVE, Critical sounds can be turned down but not off, and a change to a LIVE alert setting applies at once and is logged under LIVE.
    - Shared by PAPER and LIVE (look and preferences): the blink look and Reduced Motion; re-sort speed, holding the row order under the pointer, NEW tag time, NEWS bright time and the F2 key; My list.
    - SET3 redrawn: the same "EDITING SETTINGS FOR PAPER | LIVE" switch as pages 1–2, a block "SEPARATE FOR PAPER | LIVE" that follows it and a block "SHARED — same in PAPER and LIVE".
3. **BUY on a stock you already hold** — not an invented default: the approved v3 button table (§5.4, "The four buttons… details APPROVED", Sept 24) shows BUY "in position", and v4 carried it forward. The confusion came from the hard-limit wording (section 3: "including adding to an existing position"), which suggested adding was possible. SETTLED: while you hold the stock BUY shows "in position" — no adding for now; adding (scaling in) is designed only if paper testing gives a reason, the same way SELL HALF was put off. Reasons: BUY is one click with no pop-up, and the "order working" lock protects only until the fill, so a second click after the fill would double the position. Whatever is decided later, BUY stays "in position" on a stock the engine holds (Alpaca keeps one position per stock, so your shares and the engine's can't be mixed). The on-screen wording stays exactly "in position", lowercase (Claude; ChatGPT agreed).
4. **The engine files were missing from the package** — the Master's engine requirements live in Files 1–8 and the Addition to File 6, which were not in the ZIP. ChatGPT: do not make the old files direct coding inputs. SETTLED:
    - A new document, **Engine_v4_Current_Requirements** (Markdown, Word and PDF), reconciles Files 1–8 and the Addition to File 6 into the current engine design. Method: File 8 is only the organizational starting point, not the authority; every section of all nine files is mapped (the Addition to File 6 has no headings, so its passages are numbered and mapped); every requirement keeps a tag with its file and section; where a v4 decision replaces something (e.g. the hybrid broker setup, 1× leverage) the text says so; a later version wins only when the dates and statements in the files clearly prove it supersedes the earlier one (File 6: "chronology matters", "do not blindly merge conflicts", "explicit approval is required for true redesign"); a genuinely ambiguous conflict goes on a "Needs Jonathan" list and is never resolved just to finish the document; a full traceability appendix; an independent reviewer checks it before it reaches Jonathan and ChatGPT.
    - Files 1–8 and the Addition to File 6 go, unchanged, into a separate **Engine_Source_Archive_REFERENCE_ONLY.zip** with a "DO NOT BUILD DIRECTLY FROM THESE FILES" notice, outside the main package (Jonathan's "only the latest versions" rule); the main package gets a short note that the archive exists for traceability but is not a build source. The Window Decision Record v2 stays out (everything in it is in File 9 v4). One merged engine specification beyond this reconciliation is a separate, later job.
    - The Master's source order becomes five levels: (1) the Master — platform behavior, UI, security, Phase 0; (2) Engine_v4_Current_Requirements — engine and strategy architecture; (3) the mockups — visual implementation; (4) this decision log — why decisions were made; (5) the Files 1–8 archive — reference only. If the Master and the engine document ever conflict, that is an error to bring to Jonathan, not something the coder settles.
    - Replaced points found in a first check (the full list comes from the full read): File 8 names IBKR as the leading order broker, "replacing Alpaca" — replaced by the 5h hybrid (Alpaca places orders, IBKR supplies Level 2 only, IBKR-only is a review point around $60,000); File 6's example of $5,000 becoming $10,000 of buying power on margin — replaced by 1× in both layers (File 6's requirement to tell cash apart from non-marginable buying power still stands).
5. **Stale sentence** — Claude's mistake: the log's last sentence still said it was waiting for Jonathan's go to build the universal final file, although the go (Sept 28, 11:13) and the build are recorded right above it. Removed; the "two small points" paragraph now records the answers to points 2 and 3.

**Workflow (SETTLED):** correct the Markdown sources first and rebuild every format from them (never patch the Word or PDF by hand) → rebuild the Master → write the engine draft → independent review → send the corrected Master, the engine draft and its "Needs Jonathan" list to Jonathan and ChatGPT → only after their approval, rebuild the final package once.

**Done (Sept 29):** Markdown sources corrected and the Master rebuilt from them as version 4.1 (Word, PDF, Markdown): §2.7 and §17.2 (point 1); the two "built with a default" OPEN items removed from §17.2 (points 2 and 3); §8.1, §8.4, §2.4, §3.4, §3.9, §17.1 and new check SET-08 (point 2); §2.8, §2.10, §2.11, §4.5 and new check MW-14 (point 3); §1.1, §1.3, §15.7 and the title page (source order, point 4). Mockups: SET3 redrawn; the hard-limit notes in C2 and M4 changed from "including adding to a position" to "nothing can add to a position" (one sentence each, the rest of both drawings unchanged). START_HERE rewritten (no "complete, final specification" claim, no "built with a default" list; the engine document, the source order and the archive note added). This log: the stale sentence removed, this section added.
**Status of point 4:** Files 1–8 and the Addition to File 6 were not among the material uploaded for this round (the two final-package ZIPs, the Word / PDF Master and two work backups), so the engine document and the archive ZIP start as soon as Jonathan provides the nine files. The final package is rebuilt only after the engine draft is reviewed.

---

## Next layers to review

1. ~~My List + Ranked 50~~ — done
2. ~~Three Level 2 panels~~ — done
3. ~~Strip "SELECTED STOCK + OPEN POSITIONS"~~ — done
4. ~~Order size bar + manual execution + risk limits~~ — done
5. ~~Signals, colors, sounds and alert behavior~~ — done
6. ~~Emergency controls + top bar + alert placement + other main-window views~~ — done (main window design complete)
7. ~~The separate windows~~ — done (go given by Jonathan Sept 27). Order (Claude + ChatGPT, Sept 26): Review (new, merged from Journal & Replay + Performance) → Positions & Orders → Settings → Stock detail → AI Assistant → News & Catalysts → System Health (last, because it depends on what the others expose). Settled: Review, Positions & Orders, Settings, Stock detail, AI Assistant, News & Catalysts (Sept 28, 01:55), System Health (Sept 28, 02:22) — all seven windows done. Next: item 8, extra pages.
8. ~~Extra pages after the windows: pop-up trade card + the thin top bar in every window (consistency rule), phone view, and updating the signals/colors/sounds and "who owns a position" pages from this log.~~ — done, SETTLED Sept 28, 10:28 (7h).
9. FINAL BUILD — requirement from Jonathan (Sept 27, 18:41): File 9 v4 (Word + PDF) must be clear and detailed enough to hand straight to the coder (Codex). Planned structure: (a) how to read it (status labels, TEST values vs settled rules, what is locked); (b) architecture the UI depends on (one engine, broker connectors Alpaca / IBKR / Massive, source + timestamp on every event, ownership model, PAPER/LIVE separation); (c) screen by screen: purpose, layout at 1536×864 with sizes, every element and what it shows, data source, every state (normal / warning / blocked / halted / disconnected …) with exact wording, every button's behavior (click / hold time, what it sends, what it never does), sounds and alert level; (d) cross-screen rules (consistency rule, colors, blinks, alerts, PIN, change timing); (e) acceptance checks per screen ("done when …") so the coder can test; (f) OPEN / TEST-value list with starting values; (g) the drawings next to the text. Checked item by item against this log before delivery.
   **Jonathan (Sept 28, 00:38): do NOT start the final file until he gives the go** — he may want to add something at the end.
   **Jonathan (Sept 28, 10:28): next, two more parts go into the final specification before the universal file — the Phase 0 research architecture and the security / resilience architecture. WAIT for Jonathan's go and his material before adding them.**
   Done: both received and SETTLED Sept 28, 11:07 (7i Phase 0, 7j Security & resilience). The final file's structure gains two chapters: Phase 0 research architecture and Security / resilience.
   **FINAL BUILD — go given by Jonathan (Sept 28, 11:13):** one authoritative Master Word document, an identical PDF, a coding-friendly Markdown specification, all final mockups as separate PNG files, this complete decision log and a short START_HERE file, in one final ZIP. Jonathan (11:16): only the latest approved v4 design in the package — no previous or obsolete versions (no v3 pages, no comparison pages, no older previews).
   Built Sept 28: File9_v4_Master_Specification.docx + .pdf (same content), File9_v4_Specification.md, mockups/ (30 PNGs, IDs M1–M6, T1, C1–C2, RV1–RV4, PO1–PO3, SET1–SET3, SD1–SD3, AI1, NW1, SH1–SH2, PH1, REF1–REF3), START_HERE. The specification was checked against this log by an independent reviewer; its findings were fixed (e.g. AUTO BLOCKED → verified recovery / Resume AUTO wording in the main top bar, exits under an Alpaca-caused NOT SAFE "can't send", halted exit queues as PENDING, Esc closes the trade card, Cash/BP block red during a margin call, "no confirmation per trade in LIVE", manual cap uses known limits only, forced liquidation "by the broker or exchange").
   Drawing corrections made during the final build so the mockups match settled decisions: main-window states and worst case use Alpaca wording (IBKR = Level 2 only; "AUTO BLOCKED — ALPACA", "ALPACA EXECUTION UNAVAILABLE", Critical list per 5h/7g) · the list's "Columns ▾" chooser removed (7c Q3) · the M4 note on AUTO restarts follows 7g H4 · Review live card has the four fixed buttons and Review's filter adds RESEARCH (7i/7j) · Settings phone panel marked settled (7h) · trade-card states show BUY "in position" on a held stock (v3 button table) · thin bar test adds "AUTO BLOCKED — ORDER LIMIT"; phone page adds the watchdog "SERVER UNREACHABLE" notification; signals page lists ORDER LIMIT as Critical (7j) · windows map uses the final mockup IDs.
   Two small points were built with a default and listed as OPEN for Jonathan to confirm later: (1) adding to your own open position from its BUY button (built as BUY "in position", per the approved v3 button table); (2) Screen & sounds as one shared set for PAPER and LIVE (built that way). **Both answered Sept 29 (7k):** (1) BUY stays "in position" while you hold the stock — no adding for now; (2) Screen & sounds is split: alert levels locked, safety settings separate for PAPER and LIVE, look and preferences shared.

10. FINAL PACKAGE REVIEW (Sept 29): ChatGPT's audit found five items; all five corrections approved by Jonathan (7k). Done: Markdown sources, Master 4.1 (Word, PDF, Markdown), SET3, the C2 / M4 notes, START_HERE and this log. Next: Engine_v4_Current_Requirements and its "Needs Jonathan" list (needs Files 1–8 and the Addition to File 6), independent review, review by Jonathan and ChatGPT, then the final package is rebuilt once.
