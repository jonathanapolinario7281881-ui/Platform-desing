# 3. Rules that apply on every screen

## 3.1 The consistency rule

- The **pop-up trade card** (every separate window), the **cards in the main window's strip**, the **Level 2 panels' buttons**, and the **four buttons on Stock detail** are one component with one set of states. Every state in this document (NEWS age, SPR box, FULL CAP / LIMITED, order status + CANCEL, + STOP, HALTED · elapsed, locks, CANCEL ENGINE ENTRY, OVERRIDE EXIT, "SHORT · off · long-only") appears identically wherever that stock's buttons appear.
- The **thin top bar** is the same component in every separate window (section 5.1).
- Wherever you meet a ticker, you get the same trading controls and the same states.

## 3.2 Colors — one job each (SETTLED)

| Color | Hex (UI) | Only job |
|---|---|---|
| Green | #34C77B | Up, buy, profit |
| Red | #F0555A | Down, sell, loss, danger |
| Purple | #B08CFF (button #5B3A9E) | Short |
| Pink | #F472B6 (text #FBCFE8) | EXIT? only |
| Teal | #5CE0D2 | The engine's positions (dashed teal = would-have trades) |
| Blue | #5AA2FF | Selection and navigation |
| Grey | #7D8899 | Halted, unavailable, disabled |
| Amber | #F2A93B | "Be careful", always with a word: AI CAUTION, SPR box, SIZE LIMITED, FULL CAP, soft limit, give-back, DEGRADED |
| Yellow | #F2C94C | Things you set: My list, ★, PINNED, your STOP line |
| White box | #E7EAEE outline | A big order showing in the Level 2 book (information, not guaranteed support) |

- Color is never the only clue: every color comes with a word or symbol (▲, ▼, EXIT?, HALTED, LIMITED …), which also helps color-blindness.
- Background #0B0E13, panels #121720, lines #232B38, text #E7EAEE. Fonts: IBM Plex Sans for text, IBM Plex Mono for numbers and times.
- A valid strategy loss has a neutral result label, but its negative P&L number stays red.

## 3.3 Signals and blinks

- **If it blinks, it comes from the engine. A badge that does not blink comes from the AI.** Problems never blink; they use steady banners and sound. Prices never flash on every tick.
- Strong up: the whole ticker box pulses green with ▲ (about 1 pulse per second, well under 3 flashes per second) for about 5 s, stays **solid green** while the signal is active, turns plain when it ends, and blinks again only on a genuinely new trigger (the signal ended and fires again, or clearly strengthens after fading). Anti-flicker: a signal that drops and returns within a few seconds does not count as new. Strong down: the same in red with ▼. Exact times and the "clearly strengthens" level are TEST values.
- EXIT? (pink, the word EXIT?) on a stock you hold: momentum fading, the engine would exit if it had the trigger. On your positions EXIT? is always information only (AUTO on or off); on the engine's positions the engine acts on its own exit rules in either mode.
- AI verdict: still badge GO (green) · CAUTION / CAU (amber) · NO-GO / NO (red), with its age; marked OLD (dashed outline) after 3 minutes (display rule, TEST value; the engine uses its own freshness rules).
- News grade: still letter A (very good) · B (good) · C (not that good) · D (bad), the grade of the newest headline; bright under about 1 hour, then dim (display only, TEST value); "–" = no news; NEWS UNKNOWN when the news source is down. The grade is about the news only: it never blocks a trade by itself and is separate from the rank. The engine judges how long news matters from real data, never from the 1-hour display rule.
- Halt: grey "HALTED · 2:40 elapsed"; an official resume time only when the exchange publishes one.
- Later: a Reduced Motion setting (glow or border instead of pulsing).

## 3.4 Alerts

**Levels**

| Level | How it shows | Events |
|---|---|---|
| INFO | Quiet grey line (your fills: a short one-time sound; the engine's fills: a softer one) | Fills, rank jumps, Level 2 swaps |
| ATTENTION | One sound + amber (EXIT? pink) line | EXIT?, soft limit, give-back, partial fill, AI turns NO-GO on a stock you hold, BUY/SHORT rejected, IBKR needs login / Level 2 down, news / SEC / FDA / AI source down, margin headroom low |
| CRITICAL | Own sound repeating about every 10 s until SEEN; red line | Exit rejected, EXIT NOT FILLED, FLATTEN INCOMPLETE, hard limit, NOT SAFE TO TRADE (Alpaca, Massive, clock), halt on a stock you hold, intraday margin call, broker sync mismatch, AUTO BLOCKED — ORDER LIMIT |

- **Levels are locked (🔒):** each event's level — SIGNAL (the green ▲ / red ▼ blink sounds), INFO, ATTENTION or CRITICAL — is fixed by this document. Settings can change an event's sound, volume and on / off (Critical: not off in LIVE), never its level (section 8.4).

**The alert line** (22 px, full width, directly under the top bar in every window)

- Normally grey with the latest event: tag, time (to the second), text, and "Today's alerts (n) ▸" at the right.
- Amber for Attention; red for Critical with a **SEEN** button. SEEN stops the repeating sound only ("seen 10:05:31 · stays red until it's fixed"); the line stays red until the problem is really resolved (NOT SAFE TO TRADE, FLATTEN INCOMPLETE, a held-stock halt …).
- Priority Critical > Attention > Info. A lower alert never covers an unresolved critical one. With 2+ unresolved criticals the line shows the newest plus "+1 more".
- It never pushes or moves anything on screen, so a button can never jump under the pointer.
- As drawn in the approved states mockup (M4), a Critical EXIT NOT FILLED line also carries its one-click action "SELL LOWER TO $11.75" next to SEEN.
- Clicking the line opens today's alert history: time, ticker, event, seen / resolved. Kept for good (Review's Day events).

**Sounds**

- A different sound per event, each on/off in Settings (separate PAPER and LIVE sets — section 8.4): green ▲ · red ▼ · EXIT? · your fill · the engine's fill (softer, on/off) · position closed · order rejected · EXIT NOT FILLED · stop triggered · halt / resume on a held stock · soft / hard limit · FLATTEN COMPLETE / INCOMPLETE · connection problem / AUTO blocked.
- Blink sounds only for stocks that matter to you (default): My list, the three Level 2 slots, the Selected stock and your positions; other Ranked 50 blinks are visual only (Settings can switch to all Ranked 50).
- Anti-spam: the same stock + signal sounds at most about once a minute (TEST); critical sounds always play.
- In LIVE, critical sounds can be turned down but not off.

## 3.5 The three health words

HEALTHY (every check passes) · DEGRADED (something is missing, trading still safe) · NOT SAFE TO TRADE (new entries blocked; exits available whenever Alpaca can be reached). Word + dot in every top bar and on the phone; hover shows ORDERS · ALPACA / LEVEL 2 · IBKR / MARKET DATA · MASSIVE separately; click opens System Health.

## 3.6 Gestures (SETTLED; durations are TEST values)

| Action | Gesture | Where |
|---|---|---|
| BUY / SHORT (your entry) | One click, no pop-up; the ticker and share count are printed on the button | Panels, strip, trade card, Stock detail |
| SELL/EXIT / COVER (your position) | One click, closes the whole position | Same; phone: hold 1 s |
| CANCEL (your working order) | One click | Card, strip, Positions & Orders |
| SELL LOWER TO $x / COVER HIGHER TO $x | One click on a normal exit; hold 0.5 s past the FLATTEN emergency band | Card, strip, alert line, P&O; phone: hold 1 s |
| + STOP · move · × | Click | Your cards, Stock detail, P&O |
| OVERRIDE EXIT (one engine position) | Hold 1 s | Desk only |
| CANCEL ENGINE ENTRY | Hold 1 s | Desk only, only while that engine entry is working |
| CANCEL ALL ENTRIES (n) | One click, shows with 2+ working entries | Strip header, P&O |
| STOP AUTO | One click | Every window; phone: hold 1 s |
| Turn AUTO on | Hold 2 s (+ a confirmation in LIVE) | Main window only |
| Resume AUTO (after a pause, or when recovery could not be verified) | Hold 2 s | Main window only |
| FLATTEN ALL | Hold about 1 s with a filling bar; releasing early does nothing | Every window and the phone |
| Switch to LIVE | Hold 2 s + PIN (+ start-up checks) | Top bar PAPER / LIVE button or Settings → Trading mode |
| Riskier LIVE setting · PROMOTE version · broker switch | Hold 2 s + PIN | Settings |
| Back to the main window | ← MAIN WINDOW button or F2 | Every separate window |

- No keyboard hotkeys for orders or emergency buttons (too easy to hit by accident). F2 returns to the main window; Esc closes the pop-up trade card (it never cancels an order).

## 3.7 Wrong-click protections

- The list holds still under the pointer (hover freeze); prices and signals stay live.
- A Level 2 panel's four buttons lock about 0.5–1 s after a slot swap (TEST), visibly shaded, and switch to the new ticker.
- The pop-up trade card's buttons lock about 0.5 s after it opens (TEST), so a double-click on a ticker never lands on BUY.
- Tickers are printed on entry buttons ("BUY ABCD"); the share count is printed under them.
- The alert line never moves anything.

## 3.8 Numbers, times and words

- Top bar: Equity, Cash and Total BP in whole dollars (exact cents on hover); Day P&L keeps cents ("+$233.00 · +4.66%") and never blinks. Everywhere else money has exact cents; the math always uses exact values.
- Volume, float and trades in full digits (14,837,426 — never "14.8M"); VWAP as a price.
- Times in Eastern Time. Event and order trails to the millisecond; headlines and filings to the second.
- Settled wording is used exactly as written in this document.

## 3.9 Every human action is logged

Every mode change, AUTO change, pause, resume, override, cancel, flatten, SELL LOWER click, settings change (time, old → new, when it takes effect, PAPER or LIVE set, or shared) and phone action ("from phone") is written to the append-only audit log and appears in Review.
