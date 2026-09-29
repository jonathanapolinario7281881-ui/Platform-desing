# 13. Phone view

**Purpose:** watch and stop the platform from anywhere when the laptop is closed. The engine runs on the cloud server, so trading continues without the laptop; the phone shows the state and can stop it — it never buys. Mockup PH1 (four screens + the outside-watchdog notification). How the phone page is built (a web page on the home screen or an app) is a build decision.

## 13.1 What it shows

- **PAPER / LIVE — REAL MONEY** (red frame in LIVE) — **display only**: the phone can never switch the account between PAPER and LIVE.
- AUTO state in words; the health word; session and clock; "Control panel offline · AUTO ON — laptop closed at 07:30; the engine keeps trading on the server" when true.
- DAY P&L, EQUITY, the loss meter.
- The Critical banner (stays until the problem is resolved; **SEEN** stops the repeating sound); latest alerts and today's full list.
- Open positions (all of them, with "scroll" when more than fit): owner chip (YOURS / ENGINE'S), shares @ average, now, P&L, flags (HALTED, EXIT?, STOP, order working). Tap = read-only details (price, P&L, small chart, stop, status).

## 13.2 What it can do

- **STOP AUTO** — hold 1 s (against pocket taps). Shown disabled "AUTO is off" when AUTO is off.
- **FLATTEN ALL** — hold 1 s, everything (yours and the engine's).
- **SELL/EXIT your own positions** — hold 1 s, with the same protected exit logic as the desk. At the exit boundary "EXIT NOT FILLED · bid below $7.52 · 172 sh left" and **"SELL LOWER TO $7.48"**, which also needs the 1 s hold (a filling bar; releasing early does nothing). After the hold: WORKING → FILLED, alert and sound on the phone and the desk.
- Engine positions: "🔒 engine's · FLATTEN ALL only".
- Every phone action is logged "from phone".

## 13.3 What it never does

Buy or short · turn AUTO on or Resume AUTO · switch PAPER ↔ LIVE · change settings · OVERRIDE EXIT · CANCEL ENGINE ENTRY.

## 13.4 When exits lock

Exits are enabled only when the phone has fresh Alpaca / account state and execution is healthy. They lock, with the reason on the button, when:

- the phone is offline or stale — banner **"PHONE OFFLINE · last update 07:40 — numbers may be old · exits locked until the phone reconnects"**; AUTO and health show "as of 07:40" in grey, so old numbers never look live;
- execution is not healthy — "exits locked · execution uncertain" (e.g. ALPACA CONNECTIVITY ISSUE · CAUSE UNKNOWN);
- that stock has an UNKNOWN order — "exit locked · order UNKNOWN, checking".
- A halted stock shows "COVER PENDING · sends when trading resumes" / "HALTED · exit pending", as on the desk.
- Exits unlock by themselves when the phone has fresh Alpaca data and execution is healthy.

## 13.5 Notifications

- **Critical:** always sent; cannot be turned off inside the platform while LIVE. **Attention:** your choice (Settings). **Info:** never.
- The platform cannot override the phone's own notification settings. If notifications are blocked there, the phone view shows **"NOTIFICATIONS OFF IN PHONE SETTINGS — you won't get Critical alerts. Turn them on in the phone's settings."** and System Health shows "PHONE NOTIFICATIONS · OS PERMISSION BLOCKED".
- Tapping a notification opens the phone view at that item.
- **Outside watchdog:** if the trading server stops sending its heartbeat, a separate service outside the server's failure domain sends **"SERVER UNREACHABLE · No heartbeat from the trading server since 10:31:05. The platform can't be reached — if you must act, use Alpaca directly."** The watchdog has notification authority only, no trading keys (chapter 16).

## 13.6 Security

Sign-in with a PIN or Face ID. The phone never holds broker keys; it talks only to our server (chapter 16).

## 13.7 Acceptance checks — Phone

- **PH-01** No control on the phone can buy, short, turn AUTO on, resume AUTO, switch PAPER / LIVE, change a setting, OVERRIDE EXIT or CANCEL ENGINE ENTRY.
- **PH-02** STOP AUTO, FLATTEN ALL, SELL/EXIT and SELL LOWER need a 1 s hold; releasing early does nothing.
- **PH-03** With the phone offline, a stale state, unhealthy execution, or an UNKNOWN order on that stock, exits lock and say why; old values are labeled "as of".
- **PH-04** Critical notifications arrive for every Critical event while LIVE; a blocked OS permission is shown on the phone and in System Health.
- **PH-05** Stopping the trading server produces SERVER UNREACHABLE from the outside watchdog.
- **PH-06** Every phone action appears in the audit log as "from phone".

![PH1 — Phone view: laptop closed with AUTO on · selling your position with a 1 s hold · LIVE Critical alert · locked states (offline, UNKNOWN, halted) · the outside-watchdog SERVER UNREACHABLE notification.](mockups/PH1_Phone_view.png)
