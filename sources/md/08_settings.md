# 8. Settings window

**Purpose:** every adjustable value, with a clear rule for when a change counts, protected and logged. Opens from Windows ▾. Mockups SET1 (Trading & risk), SET2 (Engine & connections), SET3 (Screen & sounds). All values in the drawings are examples or starting values.

## 8.1 How Settings works

- Thin top bar ("Settings") + alert line. Left: section list in three pages — TRADING & RISK · ENGINE & CONNECTIONS · SCREEN & SOUNDS — plus CHANGE HISTORY.
- **EDITING SETTINGS FOR [PAPER | LIVE]** at the top: PAPER and LIVE keep separate setting sets; changing PAPER never changes LIVE; this switch never changes the trading mode. "Copy PAPER values to LIVE…" counts as a LIVE change (riskier parts scheduled + PIN). The only exception is page 3's SHARED block (look and preferences — 8.4), which is the same in both sets; page 3's alert, signal-sound and spread-warning settings are separate like everything else.
- **Badge on every setting — when a change counts:**
  - **NOW** — at once, for new decisions from now on.
  - **RISKIER → NEXT DAY** — in LIVE, safer changes at once; risk-raising changes (loss limits up, leverage up, bigger presets or caps, more slippage, a strategy on) take effect the next trading day (4:00 a.m. ET) and need hold + PIN.
  - **🔒 LOCKED** — a safety rule, not editable here.
  - **TEST value** — a dashed value box, separate from the badge, for every number that is not proven ("TEST $300"); "NOT SET YET · TESTING" where no value exists yet.
- In PAPER every change applies at once (fast testing); the next-day rule is for LIVE.
- **"NOW" means for new decisions:** a change never rewrites an order already working and never closes a position (example: max positions 6 → 4 while holding 5 blocks new entries until below 4; nothing is sold).
- A risk-raising LIVE change shows as SCHEDULED with its effective time and a cancel button, and in the alert line ("Settings: LIVE hard loss limit raise $600 → $800 scheduled for the next trading day (Mon Sep 28, 4:00 a.m. ET) · PIN confirmed").
- **PIN** (plus hold) for switching to LIVE, raising risk in LIVE, promoting a new version and a broker switch.
- **Every change is logged** in CHANGE HISTORY (time, PAPER / LIVE, old → new, when it takes effect), kept for good; risk changes also appear in Review's Day events. The engine and the AI can never change a setting.
- A failure never changes a setting: the setting stays ON and the row shows "ON · UNAVAILABLE — IBKR L2 DOWN"; recovery follows the recovery rules, never a silent toggle.

## 8.2 Page 1 — Trading & risk (SET1)

- **Trading mode:** PAPER / LIVE (LIVE = hold 2 s + PIN + every start-up check; LIVE starts on the smallest preset; red frame).
- **Loss limits:** soft (AUTO pauses) · hard (all new entries blocked, no Resume AUTO that day) · give-back from today's high · recovery buffer before a new soft-limit pause. All count closed + open (= Day P&L). Hard limit lowered now, raised next trading day.
- **Leverage & shorts:** leverage 1× (Alpaca and platform must match; lower now, raise next day) · short selling OFF and 🔒 LOCKED (Alpaca long-only until Phase 3) · safety reserve (TEST) · "LIVE rollout: Phase 1 of 4" · "margin calls 0 — TARGET 0" (view).
- **Hard caps:** most in one stock (also caps FULL CAP) · most open positions · engine risk per trade (1R) · engine reserve for better setups · liquidity cap (engine side, 🔒).
- **Order size:** 10% · 25% · 50% · $2,000 editable with today's dollar value; FULL CAP 🔒 (the most the limits allow); start-up rule 🔒 (LIVE smallest, PAPER remembers). Changing sizes never touches a working order.
- **Execution:** your maximum slippage on entries (the ceiling can never pass it) · exit boundary for normal exits (then EXIT NOT FILLED + SELL LOWER) · FLATTEN ALL emergency band (TEST) · "UNPROTECTED MARKET ORDERS: PROHIBITED 🔒" (protected marketable-limit execution continues; mechanics set by testing).
- **Change history** panel on page 1.

## 8.3 Page 2 — Engine & connections (SET2)

- **Strategies:** long engine · Level 2 strategies (if IBKR Level 2 is down: stays ON and shows "UNAVAILABLE — IBKR L2 DOWN"; your setting is never changed) · short engine "PAPER ONLY" 🔒 until proven (Phase 3) · AI context check (stays only if it improves results after costs). Turning one off is always immediate. Each strategy declares the sources it needs.
- **Versions:** strategy / model, risk config, AI prompt set — each approved, with its last full test. A challenger can run in **SHADOW** (sees everything, sends no orders, compared in Review). **ROLL BACK** to the previous approved version. **PROMOTE** needs tests passed + hold 2 s + PIN. Never automatic: retraining never replaces the live version by itself.
- **AI:** mark an AI verdict as old after 3 min (display, TEST) · 🔒 the AI never holds up a fast trigger · 🔒 the Ask AI window can never place orders.
- **Connections:** ORDERS · ALPACA (masked account, e.g. "paper PA3••••9F2 · orders, fills, cash") · LEVEL 2 · IBKR (logged in · slots in use) · MARKET DATA · MASSIVE · NEWS & FILINGS (Benzinga · SEC EDGAR · openFDA) · AI SERVICE — each with status. Keys live only on the server and are never shown in full.
- **Broker setup:** "Hybrid — CURRENT (Alpaca orders & account · IBKR Level 2 · Massive data)" and "IBKR only — review around $60,000, or earlier if IBKR moves your account to the new FINRA rules · NOT AUTOMATIC", with the switch rules and preflight (section 2.2).
- **Session hours:** PRE-MARKET 4:00 a.m. · REGULAR 9:30–4:00 · AFTER-HOURS to 8:00 p.m. · OVERNIGHT OFF; official calendar with holidays and early closes; outside 9:30–4:00 only limit orders (Alpaca).
- **Phone** (settled — chapter 13): Critical alerts to the phone — always sent, cannot be turned off in LIVE 🔒 · Attention alerts — your choice (NOW) · "Phone: STOP AUTO · FLATTEN ALL · sell your own positions (hold 1 s)" 🔒 — never buys, never turns AUTO on, never switches PAPER / LIVE. The phone's own settings control notification permission.
- **Data & backups:** journal, orders and fills kept for good, never edited 🔒, backed up at least nightly (exact frequency set during construction, chapter 16) · raw ticks and Level 2 retention for Replay ("NOT SET YET · TESTING") · export trades and fills (CSV).

## 8.4 Page 3 — Screen & sounds (SET3)

Page 3 holds three kinds of setting (SETTLED Sept 29, 2026):

**🔒 LOCKED — the alert levels.** Every event's level (SIGNAL / INFO / ATTENTION / CRITICAL, section 3.4) shows as a fixed 🔒 label, not a choice. No setting in either set can change a level: a margin call or "EXIT NOT FILLED" can never be turned into a quiet alert.

**SEPARATE FOR PAPER | LIVE — anything that protects you.** This block follows the EDITING SETTINGS FOR [PAPER | LIVE] switch at the top (8.1): changing PAPER never changes LIVE, so turning a warning down while practising in PAPER never weakens it in LIVE.

- **Alerts & sounds:** each event's own sound, volume and on / off. Critical sounds 🔒: in LIVE they can be turned down but not off; they repeat about every 10 s until SEEN.
- **Signal sounds:** which stocks make a blink sound — "stocks that matter to you" (default: My list, the three Level 2 slots, the Selected stock and your positions) or all Ranked 50 — and the anti-spam interval (TEST).
- **Spread warning:** the SPR box thresholds, amber from / red from (starting 1% / 2% of price, TEST). They sit here rather than under List & display because they are a warning: loosening them in PAPER must not weaken the warning in LIVE.
- In LIVE, a change to a LIVE alert setting applies at once (NOW) — so a loud sound can be turned down mid-session — and is logged under LIVE in CHANGE HISTORY.

**SHARED — same in PAPER and LIVE (look and preferences).** Not affected by the editing switch; one value serves both sets, so switching between PAPER and LIVE never duplicates or resets them.

- **Blinks:** the blink look (about 5 s, then solid while the signal is active) and Reduced Motion (later).
- **List & display:** re-sort speed · hold the row order under the pointer · NEW tag time · NEWS bright time · back key (F2). All 14 list columns always show — there is no column chooser.
- **My list:** chips with ×, add ticker, "5 of 20" (same as ☆ in the list) — one My list for PAPER and LIVE.
- A change to a shared setting is logged in CHANGE HISTORY like every other setting, marked as shared.

## 8.5 Acceptance checks — Settings

- **SET-01** A risk-raising change in LIVE is scheduled for the next trading day, needs hold + PIN, shows SCHEDULED with cancel, and appears in the alert line and change history.
- **SET-02** A PAPER change never changes LIVE; "Copy PAPER values to LIVE" follows the LIVE rules.
- **SET-03** A NOW change affects only new decisions: no working order is rewritten and no position is closed.
- **SET-04** LOCKED rows cannot be edited; the engine and the AI cannot change any setting (attempts are refused and logged).
- **SET-05** Every change appears in CHANGE HISTORY with time, set, old → new and effective time.
- **SET-06** A provider failure never changes a setting; the row shows "ON · UNAVAILABLE — …".
- **SET-07** PROMOTE refuses a version without passed tests; ROLL BACK restores the previous approved version.
- **SET-08** Page 3: no setting in either set can change an event's level (🔒); the SEPARATE block follows the editing switch and a PAPER change never changes LIVE; the SHARED block (blinks, list & display, My list) is identical in PAPER and LIVE; in LIVE a Critical sound can be turned down but not off; a LIVE alert-setting change applies at once and is logged under LIVE.

![SET1 — Settings, page 1: Trading & risk (EDITING SETTINGS FOR PAPER | LIVE, badges, TEST values, scheduled LIVE change, change history).](mockups/SET1_Settings_trading_and_risk.png)

![SET2 — Settings, page 2: Engine & connections (strategies, versions, AI, connections, broker setup, session hours, phone, data & backups).](mockups/SET2_Settings_engine_and_connections.png)

![SET3 — Settings, page 3: Screen & sounds, editing the LIVE set (alert levels 🔒 locked; SEPARATE FOR PAPER | LIVE: alerts & sounds, signal sounds, spread warning; SHARED — same in PAPER and LIVE: blinks, list & display, My list).](mockups/SET3_Settings_screen_and_sounds.png)
