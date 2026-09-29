# 2. Architecture the screens depend on

## 2.1 One engine, many views

- One engine runs on a cloud server: data intake, ranking, strategies, risk engine, execution, journal and the AI calls. Windows on the laptop and the phone are views and controls only; data keeps flowing whether a window is open, closed or the laptop is off.
- Laptop offline → nothing stops; the phone shows "Control panel offline · AUTO ON" (when AUTO is on). Server problems are handled by the connection rules (2.12) and the outside watchdog (chapter 16).
- The engine reads everything the subscriptions allow (Massive: every trade and quote change for the whole US market, about 8,000 stocks, plus aggregates and reference data; IBKR: the full Level 2 book for the slot stocks; news, SEC and FDA sources). It computes its own indicators from raw trades (VWAP, speed, acceleration, relative volume, spread, order-book imbalance) and may use ready-made ones where testing shows they help.
- The engine decides direction and state (acceleration, breakout, healthy pullback, consolidation, reacceleration, continuation, exhaustion, failed breakout, true reversal, breakdown for shorts). Results are probabilities, never certainties.
- The screen shows a small slice; everything is recorded on the server so Review can replay any moment.

## 2.2 Broker and data connectors — the hybrid (SETTLED)

| Provider | Used for | If it fails |
|---|---|---|
| **Alpaca** | Orders, fills, positions, account, cash, buying power, margin, eligibility, shortability / borrow | NOT SAFE TO TRADE, AUTO BLOCKED, Critical (2.12) |
| **IBKR** | Level 2 order book only, 3 slots (standard account) | DEGRADED, Level 2 strategies off, Attention |
| **Massive** | Broad market data: whole-market trades and quotes, scanner inputs, aggregates, reference data (float, shares outstanding, corporate actions), historical data for Phase 0 | NOT SAFE TO TRADE for new entries; exits keep working while Alpaca is up |
| **Benzinga** | News headlines | DEGRADED; strategies that need news turn off; NEWS UNKNOWN |
| **SEC EDGAR** | Filings (S-1, S-3, 424B, 8-K …) | DEGRADED; "SEC CHECK UNAVAILABLE since …" |
| **openFDA** | FDA approvals and clearances | DEGRADED; "FDA CHECK UNAVAILABLE since …" |
| **AI service** | Context verdicts, news summaries, the AI Assistant | DEGRADED; trading and the engine are not affected |

- **One platform, not two:** one engine plus broker adapters (Alpaca execution, IBKR execution, IBKR Level 2). The platform's own rules (ceilings, stepping, SELL LOWER, margin checks, reconciliation) stay the same whichever adapter executes. Broker fields are normalized inside the adapter.
- **IBKR-only later is a review point, not an automatic switch:** review around $60,000 of equity, or earlier if IBKR moves the account to the new FINRA intraday-margin rules (effective June 4, 2026; firms may phase in until October 20, 2027). At the review, compare real results (execution quality, fills and slippage, API reliability, short availability, extended hours, costs, simplicity of one broker). Switch only if IBKR is clearly better.
- **A broker switch is a LIVE change:** PIN, takes effect the next trading day, only on a day with no open positions or working orders, only after the IBKR execution adapter passed PAPER testing, and only after a preflight on the new account (correct account, cash, permissions, market data, order routing, clock, positions = zero, API health). Moving the money is a separate manual step.
- IBKR Level 2 needs a fresh login about once a week; only Level 2 is affected. Verify IBKR market-data terms for personal internal use when the live feed is set up.
- Extra Level 2 capacity (about $30/month per extra stock) can be added later if testing shows three slots are not enough; it is used by the engine behind the scenes and the screen stays at three panels.

## 2.3 Every event keeps its source and three times

- Every data point and event records its provider (for example book = IBKR, fill = Alpaca, quote = Massive) and three timestamps: provider time, received time and processed time. They are used for slippage, Replay, the News "MOVE SINCE" measure, Phase 0 and debugging.
- The screens stay clean: sources show in System Health, Replay's event timeline, Stock detail's source line and the AI's source chips.

## 2.4 Trading modes

- **PAPER / LIVE:** PAPER uses the Alpaca paper account with the same rules. LIVE = hold 2 s + PIN + every start-up check passing (chapter 12), from the PAPER / LIVE button in the top bar or the Trading mode row in Settings (the same flow). LIVE shows "LIVE — REAL MONEY" and a thin red frame around every window. A new setup defaults to PAPER; a restart, recovery or reconnect never changes the mode by itself. LIVE adds no confirmation to individual orders (one click stays one click). PAPER and LIVE keep separate Settings sets (only the look-and-preference settings on Settings page 3 are shared — section 8.4); results are never added together. A failed check never switches LIVE back to PAPER by itself: it blocks new risk as its rule says and exits stay available.
- **AUTO:** "AUTO OFF — YOU TRADE" or "AUTO ON — ENGINE CAN TRADE". Turning AUTO on: hold 2 s in the main window (plus a confirmation in LIVE); STOP AUTO: one click (every window) or hold 1 s (phone). The safety system can force "AUTO BLOCKED — reason"; a pause shows "AUTO PAUSED — reason". AUTO OFF never stops the analysis.
- **Same screen in both AUTO states:** same layout, engine, AI and data; only button locks and labels change.
- **Research:** Phase 0 runs in a separate Research environment (chapter 15). Its results are labeled RESEARCH and never mixed with PAPER or LIVE.

## 2.5 Ownership (summary — full reference in chapter 14)

- Whoever opened a position owns it. Switching AUTO on or off never hands a position from one owner to the other.
- Four labels: **YOURS**, **ENGINE'S**, **WOULD-HAVE** (Review only), **YOURS · OPENED OUTSIDE PLATFORM** (found at Alpaca, never adopted by the engine).
- Strategy authority: the engine never takes over or exits a position you opened. Account-safety authority: hard controls may block new risk but never close your positions on their own. Your position closes only by your exit, your optional stop, FLATTEN ALL, or a forced liquidation by the broker or exchange (an Alpaca margin sale is shown as "CLOSED BY ALPACA · MARGIN").
- AUTO OFF with engine positions: the engine keeps managing them exactly as planned, opens nothing new, and their exit stays locked for you (OVERRIDE EXIT or FLATTEN ALL only).
- The engine knows your positions: they use buying power and count toward account limits, so it sizes its own trades with them. It never trades them.

## 2.6 Session and order types

- Session 4:00 a.m.–8:00 p.m. ET on the official calendar (holidays, early closes). Top bar shows PRE-MARKET, REGULAR, AFTER-HOURS or MARKET CLOSED with the ET clock. Alpaca's overnight session is not used (OFF) unless Jonathan decides otherwise.
- Outside 9:30–4:00 Alpaca takes only limit orders; the platform's protected limit logic applies in every session.
- 🔒 **Unprotected market orders are prohibited:** never a blind or unlimited market order. Protected marketable-limit execution is used; exact mechanics set by testing.
- Entry orders always expire (never good-till-cancelled), so an order stranded by a crash cannot fill hours later.

## 2.7 Leverage and margin protection (SETTLED)

Background: FINRA's intraday-margin amendments replaced the $25,000 pattern-day-trader rule (effective June 4, 2026). Alpaca adopted the new framework; IBKR is still on the old rule, which is why execution is at Alpaca. There is no day-trade counter anywhere in the platform.

- **Two layers of 1×:** Alpaca account setting `max_margin_multiplier = 1` **and** a platform hard cap of 1×, so a sizing bug cannot use Alpaca's 2×/4×. At 1× Alpaca treats the account as a "standard limited margin account with 1x BP" (buying power = cash).
- **Long-only at Alpaca (`no_shorting`) until Phase 3.** Every SHORT button reads "SHORT" with the sub-label "off · long-only" (the SHORTS OFF state).
- **LIVE rollout:** Phase 1 = 1× both layers, small amounts, mostly longs · Phase 2 = verify penny / non-marginable cash behavior and same-day reuse of sale money · Phase 3 = small controlled shorts · Phase 4 = only if the platform's margin numbers match Alpaca's reliably: consider 1.5×, later 2×. The steps are settled (1× → 1.5× → 2×; there is no 1.25× step); whether and when to go above 1× is OPEN and decided only after clean real-money testing. Raising leverage takes effect the next trading day (our rule); lowering is immediate.
- **Margin Safety Layer** (in the risk engine, before every manual or AUTO BUY/SHORT): projects the account after the order, counting all working orders at their protected ceiling, using Alpaca's live cash, buying power, initial / maintenance margin, the stock's own margin requirement and borrow status (read live, never hard-coded). A safety reserve stays unused (size OPEN, set in testing).
- **Three stages, no layout change:**
  - Normal — nothing extra shows.
  - Headroom low — Attention "MARGIN HEADROOM LOW · NEW SIZE REDUCED"; FULL CAP and sizes shrink automatically (the amber LIMITED box shows it).
  - Actual call — Critical "INTRADAY MARGIN CALL · $___ · CURE REQUIRED" with amount, time and Alpaca's deadline; the top bar's CASH / TOTAL BP block turns red. AUTO and your BUY/SHORT are blocked (a hard account-safety rule like the hard loss limit); working entries are cancelled; all exits stay available; the engine sells only as much of its own positions as needed (how it picks: OPEN); for your positions a suggested cure button "EST. SELL 61 ABCD TO CURE MARGIN", recalculated live, that never runs without your click.
- **Cure:** target the same trading day (Alpaca's 2 business days is a hard limit, not normal operating time). The call counts as cured only when Alpaca confirms; then BUY/SHORT unlock automatically; AUTO stays OFF until you turn it on.
- **Goal: zero calls.** System Health and Review show "INTRADAY MARGIN CALLS: 0 — TARGET 0". Any call becomes an incident record in Review (time, amount, what caused it, requirement at that moment, whether the model predicted it, how it was cured, how long it stayed open).
- If Alpaca ever sells to satisfy a call, the platform detects the fill it did not send and labels it "CLOSED BY ALPACA · MARGIN".
- Before LIVE: verify at Alpaca that non-marginable penny stocks can be bought with own cash inside the margin account (Phase 2 check). Small real-money validation before serious LIVE trading.

## 2.8 Risk limits

- **Soft daily loss limit:** AUTO stops opening trades (it keeps managing its positions) + strong warning "SOFT LIMIT REACHED · AUTO PAUSED"; your manual trading stays allowed.
- **Hard daily loss limit:** all new entries blocked, yours and the engine's, and nothing may add to an open position; exits always allowed; no Resume AUTO that day. "HARD LIMIT — NEW ENTRIES BLOCKED · exits OK". It can be lowered during the day; a raise takes effect the next trading day.
- Both limits count the whole day's result — closed trades plus open losses — the same number as the top bar's Day P&L.
- **Give-back safeguard (soft level only):** the platform tracks the day's best Day P&L. Giving back a set amount from that high acts like the soft limit: "GAVE BACK $500 FROM TODAY'S HIGH +$600 · AUTO PAUSED". It never blocks you while you are still up.
- **Resume AUTO** after a soft or give-back pause is allowed (hold 2 s, main window). Two numbers are kept: today's true high (display and history) and a resume baseline that starts at the P&L when you resume and moves up with new highs; only the baseline decides the next give-back pause. Logged as "AUTO RESUMED AFTER GIVE-BACK · 1st resume today". After you resume, AUTO does not keep pausing while P&L stays below the same soft level; a new soft-limit event needs P&L to recover clearly above the level (recovery buffer, TEST value) and fall through it again.
- **Hard caps** (Settings, TEST values): most in one stock (also caps FULL CAP) · most open positions · engine risk per trade (1R) · engine reserve for better setups · liquidity cap (engine side, locked).
- **Order circuit breakers** outside the strategy code (chapter 16): orders per time window, notional per order, aggregate new exposure, duplicate-order protection, price sanity bounds, abnormal order rate. Tripped → "AUTO BLOCKED — ORDER LIMIT" (Critical).

## 2.9 Order size (your manual trades)

- Five presets: **10% · 25% · 50% of equity · $2,000 · FULL CAP**. MAX is removed. Exact preset values are TEST values (Settings).
- **FULL CAP** = the most the platform currently allows for this stock and account state (per-stock cap, cash / eligibility, concentration, current exposure, liquidity, buying power) — not all buying power. When selected: amber frame on the bar and on the button, readout "= up to $2,318 · the most the limits allow · lower for some stocks". No confirmation.
- The readout shows the dollar value, for example "= $1,308" and "25% of equity · used by every BUY and SHORT button".
- **One size for the whole platform:** the bar in the main window, the pop-up trade card and Stock detail are the same setting; changing it anywhere changes it everywhere. Changing it never changes an order already working.
- **Shares = chosen amount ÷ the protected price ceiling**, whole shares, rounded down, so even a fill at the ceiling cannot exceed the amount or a hard cap (example: $1,308 with a $2.24 ceiling = 583 shares, not 611).
- The cap for manual trades uses only known limits (per-stock cap, cash / eligibility, concentration, exposure, liquidity, buying power), because manual trades have no engine stop to size from.
- Every BUY/SHORT button shows its real share count after all limits. If a stock's own cap is lower, the count gets an **amber box**, the line says "SIZE LIMITED TO $1,000", and hover gives the reason (liquidity, position cap, cash only, short margin). Still one click, no pop-up. Cash-only stocks are checked before sending, never by reject-and-retry.
- Start-up: first LIVE start of the day → smallest preset; PAPER remembers the last choice; a reload or reconnect keeps the current size.
- AUTO ON: the bar is dimmed with "Not used while AUTO is on · the engine sizes its own trades". The engine sizes from risk (stop distance, volatility, liquidity, exposure, risk budget).

## 2.10 Manual order execution (AUTO OFF)

- Your click decides the trade. The execution engine only works on getting the fill; it never re-judges the setup. It may refuse or stop only for hard safety reasons: halt, stale or broken data, not enough buying power, broker won't allow the stock, the price passing the protected ceiling, the hard daily loss limit, a margin call, NOT SAFE TO TRADE, a broker-sync block or an order circuit breaker. The soft limit and the give-back safeguard never block you.
- **BUY** sends a limit order at about the ask. If not filled it raises the price in small steps for a few seconds, never above the protected ceiling. The ceiling is dynamic (percent-based; adapts to spread, volatility and liquidity) but can never pass your personal maximum slippage in Settings. Exact rules TEST (paper testing).
- The card shows "WORKING 583 @ ≤ $2.24" with CANCEL. If the price runs past the ceiling: cancel and show "NOT FILLED · price ran above $2.24". Shares already filled are kept (PARTIAL).
- **SHORT** works the same way with a floor (Phase 3).
- **Normal exits** use protected stepping: more aggressive than entries, stop at an exit boundary (wider than the entry ceiling, own maximum in Settings), then alert. At the boundary the card says "EXIT NOT FILLED · bid below $1.80" and the button shows the exact next price "SELL LOWER TO $1.75" — one click replaces the remaining exit order at that limit, only for shares not yet sold. Nothing sells below the boundary without your click. Shorts mirror it: "COVER HIGHER TO $x".
- Halted or untradeable: the exit button shows "HALTED · 2:40 elapsed"; pressing it (or an exit already working) leaves the exit pending and the card says exactly why ("SELL/EXIT PENDING" or "COVER PENDING · sends when trading resumes"); it is sent as soon as trading resumes.
- **SELL/EXIT and COVER always close the whole position.** Partial exits (SELL HALF) are not in the main buttons (maybe later, after paper trading).
- **No adding to an open position (SETTLED):** while a stock is held — by you or by the engine — its BUY button reads "in position" and SHORT is greyed (the button table in 4.5), so neither can add shares. BUY is one click with no pop-up and the "order working" lock (2.11) protects only until the order fills, so a second click after the fill would otherwise double the position. Adding (scaling in) is designed only if paper testing gives a reason, the same way SELL HALF was put off. On a stock the engine holds, BUY stays "in position" whatever is decided later: Alpaca keeps one position per stock, so your shares and the engine's can never be mixed in it.
- **FLATTEN ALL execution** is automatic and much more aggressive: repriced marketable-limit orders inside a much wider emergency band, never an unlimited market order. Bad or irrational quotes or a halt: stays FLATTEN INCOMPLETE, resumes automatically when tradable, continues until closed and reconciled. If a stock is collapsing below the emergency band with sane quotes, the report shows "FLATTEN PENDING · 600 shares remaining" with "SELL LOWER TO $1.62" (short: "COVER HIGHER TO $2.48") as a manual fallback that needs a 0.5 s hold. Bands, repricing speed and the halt-reopen order type are TEST values (paper / replay testing; also test whether an order entered during a halt can join the reopening auction).
- No keyboard hotkeys for any order or emergency button: no key sends, cancels or closes a position or order. F2 returns to the main window and Esc closes the pop-up trade card; nothing else.

## 2.11 Order lifecycle and reconciliation

- Unique, idempotent order IDs for every order; a reconnect never creates a duplicate.
- Order statuses (one at a time, from Alpaca): RISK CHECK… · SENT · WORKING · PARTIAL · FILLED · CANCEL PENDING · CANCELLED (by you / STOP AUTO / CANCEL ALL ENTRIES / FLATTEN ALL) · NOT FILLED · price ran above $x · REJECTED · reason (entry = Attention, exit = Critical) · EXPIRED · UNKNOWN · checking with Alpaca.
- **UNKNOWN** is never resent until Alpaca confirms; new entries in that stock wait until it is resolved. A late fill after a cancel is still shown and counted.
- **Broker check (Alpaca is the final truth):** IN SYNC / CHECKING / MISMATCH, after every fill, every reconnect, at start-up, every few seconds (interval TEST) and on "check now". Two levels:
  - One stock disagrees (for example ABCD platform 300 · Alpaca 400) → "DEGRADED · ABCD BLOCKED — BROKER SYNC": only that stock gets no new entries; the platform rebuilds it from Alpaca.
  - Cash, buying power, total positions or account state disagree → "NOT SAFE TO TRADE · AUTO BLOCKED — BROKER SYNC": all new entries blocked.
  - Both: exits always available, Critical alert, incident logged in Review.
- After any restart everything is rebuilt from Alpaca, never assumed empty. A position found at Alpaca that the platform did not open is shown as "YOURS · OPENED OUTSIDE PLATFORM".
- While an entry order is working, BUY/SHORT for that stock show "order working" and cannot be clicked anywhere that stock's buttons appear, so the same order cannot be sent twice. Once it fills they show "in position" (2.10), so a later click cannot add to the position either.

## 2.12 Connections, failures and recovery (summary — details in chapter 12)

- **Alpaca problem:** NOT SAFE TO TRADE, AUTO BLOCKED, new entries blocked, pending engine entries cancelled where possible, Critical. The cause is decided from several signals (stream, API heartbeat, order endpoint, account endpoint, our network, Alpaca's status page as one signal only) into three labels: "OUR ALPACA CONNECTION LOST" · "ALPACA OUTAGE" · "ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN". Banner "ALPACA EXECUTION UNAVAILABLE · PLATFORM CANNOT RELIABLY CONTROL ORDERS"; the second line "Manual backup: use Alpaca directly" only with OUR ALPACA CONNECTION LOST. The platform never assumes Alpaca is healthy because its status page says so.
- **IBKR Level 2 problem:** DEGRADED, Attention "IBKR NEEDS LOGIN · LEVEL 2 PAUSED", panels show "LEVEL 2 UNAVAILABLE", Level 2 strategies off; LIVE keeps running (Alpaca is the only broker link LIVE requires).
- **Massive down or stale:** new entries blocked (NOT SAFE TO TRADE); open positions are still watched and exited with whatever healthy data remains; exits are never blocked because Massive is down.
- **News / SEC / FDA / AI down:** DEGRADED; only strategies that need that source turn off ("ON · UNAVAILABLE"); missing news is never read as "no news".
- A failure never changes a setting: the setting stays ON and shows "ON · UNAVAILABLE — IBKR L2 DOWN".
- Your positions are never sold because of a disconnect. The engine's positions follow a fail-safe policy decided in reliability testing (OPEN).
- **Recovery:** health returns by itself when checks pass. AUTO continues by itself only after a verified recovery (connection healthy, positions and orders match Alpaca, no UNKNOWN order, no unresolved data gap affecting an active strategy, open position or pending order, clock and risk valid). Otherwise, and after repeated drops (TEST: for example 3 in 15 minutes), AUTO stays blocked until you press Resume AUTO. Never auto-resume after a margin call, the hard limit, FLATTEN ALL, your STOP AUTO or an unresolved broker mismatch.

## 2.13 The AI's role

- The AI gives context: verdicts (GO / CAUTION / NO-GO with age), news grades (A–D), summaries and answers. It is **never** an order authority: it cannot place, change or cancel orders, change settings, turn AUTO on or off, pin Level 2, or change the engine's verdicts. It never sits in the engine's path and never holds up a fast trigger (the AI context check is skipped if late).
- **How the AI gets news:** the engine reads and filters all relevant news across the monitored universe; the LLM receives summaries of the important news — especially for the Ranked 50, My list, all open positions and other stocks the engine sees becoming important — and can fetch the full headline or filing when needed. It never receives every raw headline.
- **Outside-platform news** reaches the LLM only when the engine has identified a clear relationship to a stock the platform monitors: same sector or industry, supplier / customer, competitor, an FDA / regulatory event affecting similar companies, or a macro / market-wide catalyst. Random outside news is never fed to the LLM.
- External news, filings and web text are untrusted data, never instructions. The AI's output is checked before use.
- The AI must earn its place: Review's "Engine alone vs. engine + AI" keeps it only if it improves results after costs (and Phase 0 tests it separately — chapter 15).
- Two budgets: the AI Assistant (chat) has a daily budget ("AI ASSISTANT DEGRADED · DAILY BUDGET REACHED", trading unaffected); a validated trading-AI / context budget is provisioned separately with an early warning and a tested fallback (the engine-alone mode). No cost cap may silently change the live strategy mid-day.

## 2.14 What the engine must expose to the screens

The screens need these values as events or live state (each with source and timestamps): rank and rank history for every monitored stock; signals (strong up, strong down, EXIT?) with start and end; engine state and main reason; would-have entries and exits (AUTO OFF); risk line for engine positions; Level 2 slot assignments with reasons; AI verdict, confidence, reasons, risk flags, age; news grades with times; order lifecycle events; account, positions, buying power and margin from Alpaca; health checks and connection states; limits, pauses, blocks and their reasons; every human intervention (OVERRIDE EXIT, CANCEL ENGINE ENTRY, CANCEL ALL ENTRIES, STOP AUTO, FLATTEN ALL, SELL LOWER, settings changes).
