# 10. AI Assistant window

**Purpose:** ask questions about stocks, trades, alerts and the platform's own rules, with sources — read-only, context not prediction. Opens from "Ask AI" (top bar), Windows ▾, "Ask AI about XXXX" (Stock detail) and "Ask AI about this trade" (Review). Mockup AI1 (opened with "Ask AI about ABCD", PAPER, AUTO OFF, 07:43).

## 10.1 Layout

Thin top bar ("AI Assistant") + alert line. Three columns: **QUICK QUESTIONS** + **EARLIER QUESTIONS** (left) · **CONVERSATION** (middle) · **CONTEXT ATTACHED**, **WHAT IT CAN READ**, **WHAT IT CAN NEVER DO**, **AI SERVICE** (right).

## 10.2 Asking

- Context attached as a chip when opened from another window ("📎 ABCD · live snapshot 07:42:31", a Review trade, or an alert), removable with ×.
- **Historical context never looks live:** from Review the chip reads "HISTORICAL TRADE · MNOP · 07:25:03" (from a Replay moment: "HISTORICAL · REPLAY 07:12:52"); a ticker clicked from there opens the card headed "LIVE CARD · CURRENT MARKET".
- Quick questions: pre-market brief on the Ranked 50 · what changed in the last 5 minutes · why the engine took, skipped or exited a stock · explain today's trades (from Review) · compare two stocks · what a filing, halt or alert means · "Why is my button LIMITED or blocked?" (platform help).
- 🎤 microphone for questions only: it listens only while you hold or click it (visible "listening…"), types into the question box, and you review or edit and press Ask yourself. It never sends by itself and is never a voice-trading path.
- Earlier questions: kept for you only, searchable; never used by the engine.

## 10.3 Answers

- Shape: **SHORT ANSWER** first, then only the sections that are relevant — FROM THE DATA (facts) · THE NEWS AND FILINGS · MY READING · RISKS (interpretation, contradictions stated) — and source chips with times (engine log, Massive, IBKR, Newswire, SEC EDGAR, Alpaca, Review). "Context, not a prediction." A simple question gets a short answer, not an empty template.
- Source chips are links where practical: Newswire → News & Catalysts · SEC → the filing · Alpaca position / order → Positions & Orders · engine event → Review / Stock detail.
- If a source is stale or down, the answer says so. If sources disagree, the answer says **"SOURCE CONFLICT"** and shows both; it never quietly picks one.
- Every ticker in a question or answer is a link that opens the pop-up trade card (the buy is the second click, on the card).
- Asked to trade ("Buy 500 more ABCD"), it refuses: **"The AI Assistant cannot place, change or cancel orders. To trade manually, open the current trade card ▸"**, plus the size and limit facts (e.g. "Right now your size is 25% = $1,308, but a new BUY would be LIMITED by cash: $27.76 available").
- **Platform help** answers from the current approved, versioned platform rules plus the live Settings state (which set is active, PAPER or LIVE, and its values) — never from an old File 9. The answer names the rule and says when a value is a TEST value (e.g. "Hard limit $600 (LIVE set, TEST value)").

## 10.4 Locked limits (🔒, shown in "WHAT IT CAN NEVER DO")

Place, change or cancel orders · change settings or turn AUTO on / off · pin Level 2 or change the engine's verdicts · sit in the engine's path (own queue; questions never slow the engine or its AI checks).

## 10.5 What it can read (with freshness)

Engine states, ranks, signals, logs (live) · Level 2 slots (IBKR) and trades (Massive) (live) · news (Benzinga) · filings (SEC EDGAR) · FDA (openFDA) · your positions and orders (Alpaca) · Review (journal, replays, results) · Settings (read only) and the platform rules (this document). News reaches it as engine summaries (section 2.13); it can fetch a full headline or filing when needed.

## 10.6 Service

- AI SERVICE: status and typical answer time ("● ready · ~3 s per answer"); if down: **"AI ASSISTANT UNAVAILABLE — trading and the engine are not affected"**.
- "Used today: 18 questions · est. $0.21".
- Daily Assistant budget: when reached, **"AI ASSISTANT DEGRADED · DAILY BUDGET REACHED"**; trading continues normally.

## 10.7 Acceptance checks — AI Assistant

- **AI-01** No path from this window (text, voice, chips, links) can place, change or cancel an order, change a setting, or turn AUTO on / off.
- **AI-02** Every factual answer carries source chips with times; stale or conflicting sources are stated.
- **AI-03** Historical context chips and live cards are labeled as specified.
- **AI-04** The microphone only fills the text box and never sends by itself; it listens only while held or clicked.
- **AI-05** Questions never delay the engine or its AI checks (separate queue); the service-down and budget states leave trading unaffected.
- **AI-06** Platform-help answers match the active Settings set and name TEST values.

![AI1 — AI Assistant opened with "Ask AI about ABCD": short answer with sources, a refused trade request with the trade-card link, a historical-trade question, and the locked limits.](mockups/AI1_AI_Assistant.png)
