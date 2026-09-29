# 9. Stock detail window

**Purpose:** everything about one stock — chart, book, engine view, AI analysis, news and filings, today's journal, position — with the same trading buttons as everywhere else. Always live data (Replay lives in Review). Mockups SD1 (ABCD, your position, Level 2 slot 1, AUTO OFF, 07:42), SD2 (WXYZ, the engine's position, no Level 2 slot, AUTO ON, 07:18), SD3 (states).

## 9.1 Opening it

- Double-click a ticker (list, panel, strip) · Windows ▾ · "Full page ↗" on the pop-up trade card · the AI line on a Level 2 panel (full analysis).
- The thin top bar adds a search box **"⌕ open any ticker…"** to open any of the ~8,000 stocks.
- Search can open any symbol, but trading only eligible ones: OTC, delisted, unsupported types or Alpaca "not tradable" show whatever information exists, and the buttons read **"NOT ELIGIBLE FOR PLATFORM TRADING · reason"** — never an active BUY that fails.

## 9.2 Stock header (two rows)

- **Row 1:** symbol box with the blink rule + signal text and "since"; price; change; chips: LONG / SHORT SETUP · RANK #n with its move ("▲ from #38") · L2·n or NO LEVEL 2 SLOT · NEWS grade + exact age · SPR with the box rule · AI verdict + age (OLD after 3 min) · owner (YOURS / ENGINE'S · shares) · ☆ add / ★ My list.
- **Row 2:** the platform-wide order size (10% · 25% · 50% · $2,000 · FULL CAP "= $1,308"; changing it here changes it everywhere; dimmed in AUTO ON) + the four fixed buttons BUY · SELL/EXIT · SHORT · COVER with every card state: share count from the protected ceiling, amber LIMITED box, "order working" + CANCEL, OVERRIDE EXIT (hold 1 s) on the engine's position, CANCEL ENGINE ENTRY (hold 1 s) while an engine entry is working, locked in AUTO ON, "HALTED · elapsed", "off · long-only" while long-only, "YOURS · OPENED OUTSIDE PLATFORM". No hotkeys.

## 9.3 Chart

Timeframes 10 s · 1 m · 5 m · 15 m · 1 h · 1 D; VWAP; volume. Markers: your trades (white ▲), the engine's (teal ▲), would-have (teal ◌, AUTO OFF only); news flags A–D at the headline's time; your STOP line and your working order's ceiling; the engine's RISK LINE ("where its idea is proven wrong — not a promised exit"); shaded time in a Level 2 slot; halts shaded with elapsed time.

## 9.4 Level 2 and Time & Sales

- **In a slot:** the full book (more levels than the main panels, venue column, scroll for deeper), large orders boxed white ("showing, not guaranteed support"), pressure bar labeled as visible book pressure, not a prediction ("BIDS 58% · ASKS 42% · shown in the book now"), Time & Sales to the millisecond (large prints bold), source line "book: IBKR · trades: Massive", and why and since when it has the slot.
- **No slot:** "NO LEVEL 2 SLOT" with why (which stocks hold the three slots), the NBBO quote and Time & Sales from Massive. The trading line says what is true: **"NO LEVEL 2 SLOT · TRADING AVAILABLE"** only when Massive and Alpaca checks are healthy and the stock is eligible and not halted; otherwise the real restriction ("NOT SAFE TO TRADE — ALPACA EXECUTION UNAVAILABLE", "HALTED · 2:40 elapsed", "NOT ELIGIBLE …").
- **📌 PIN TO LEVEL 2** (AUTO OFF only, one pin at a time): puts this stock into a slot and keeps it there; the engine gives up its weakest slot that isn't showing one of your positions. States: "📌 PIN TO LEVEL 2" · "📌 PINNED · L2·2 · unpin" (stays until you unpin or AUTO turns on) · "PIN UNAVAILABLE · all slots hold your positions" · "PIN RELEASED · AUTO ON".

## 9.5 Lower panels

- **STATS** in full digits + **TRADING FLAGS:** marginable (cash only), shortable (easy / hard to borrow / no borrow), SSR, halts today, session.
- **ENGINE VIEW:** state + since, setup, signal strength ("confidence, not certainty"), why it ranks #n (factors), RANK TODAY history (e.g. #212 → #38 → #9 → #1), would-have (AUTO OFF) or, for the engine's position, entry, RISK LINE, what it is watching, "engine manages the exit · you: OVERRIDE EXIT".
- **AI ANALYSIS:** GO / CAUTION / NO-GO, confidence, age (OLD after 3 min), what makes it refresh, reasons, risk flags, contradictions (e.g. "negative filing but steady buying"), evidence sources; "Ask AI about XXXX ↗" opens the AI Assistant on this stock. Context only; never holds up the engine.
- **NEWS & FILINGS** tab: each headline with A–D grade, exact time, age and source; a fixed dilution line with source and freshness: "S-1 / S-3 / 424B: none found in last 90 days · SEC checked 07:41" ("none found" = none in the SEC search, not a guarantee; 90 days is a TEST value), or the filing ("424B5 filed 07:05 today — possible offering"), or "SEC CHECK UNAVAILABLE since 07:20 · filings unknown". Click opens News & Catalysts at that item.
- **TODAY IN XXXX** tab: this stock's journal for today — rank changes, signals, Level 2 in / out, news, AI changes, orders, fills, halts; full detail in Review.
- **POSITION:** owner, shares @ average, P&L, your STOP (none · + STOP) or the engine's RISK LINE, working orders, buy with (cash only), margin requirement for this stock from Alpaca (e.g. 100% under $2.50), short status, risk check; today's trades in this stock → Review.

## 9.6 Acceptance checks — Stock detail

- **SD-01** Any symbol can be opened; ineligible symbols never show an active BUY and state the reason.
- **SD-02** The four buttons and the size bar behave identically to the trade card and strip (every C2 state).
- **SD-03** The no-slot trading line shows TRADING AVAILABLE only when Massive and Alpaca are healthy and the stock is eligible and not halted.
- **SD-04** Pin rules hold: AUTO OFF only, one pin, never evicts a slot showing your position, released when AUTO turns on.
- **SD-05** The dilution line always shows its source check time; a stale or down SEC source is said plainly, never shown as "none".
- **SD-06** Chart markers, risk line, stop line and news flags appear at the correct times.

![SD1 — Stock detail: ABCD, your position, in Level 2 slot 1 (AUTO OFF, 07:42).](mockups/SD1_Stock_detail_ABCD_yours_in_slot.png)

![SD2 — Stock detail: WXYZ, the engine's position, no Level 2 slot (AUTO ON, 07:18).](mockups/SD2_Stock_detail_WXYZ_engine_no_slot.png)

![SD3 — Stock detail states: not eligible, opened outside the platform, CANCEL ENGINE ENTRY, pin states, no-slot trading lines, SEC line states, pressure bar, AI verdict ages.](mockups/SD3_Stock_detail_states.png)
