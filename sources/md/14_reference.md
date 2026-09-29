# 14. Reference pages

Three one-page references that consolidate rules used everywhere. They replace v3 §7, v3 §8 and v3 Figure 9. Mockups REF1–REF3.

## 14.1 Who owns a position (REF1)

**Rule:** whoever opened a position owns it. Switching AUTO on or off never hands a position from one owner to the other.

| Label | Meaning | Who can close it |
|---|---|---|
| YOURS | You opened it with BUY or SHORT (AUTO off). No automatic exit; EXIT? is information only; optional + STOP after entry. | You — SELL/EXIT or COVER, one click, also while AUTO is on (phone: hold 1 s); also your stop, FLATTEN ALL, or a forced liquidation by the broker or exchange. The engine never trades it. |
| ENGINE'S | The engine opened it in AUTO ON; shows its RISK LINE. Switching AUTO off never makes it sell; it keeps managing it and opens nothing new. | The engine. You: OVERRIDE EXIT (hold 1 s, desk only) for that one position, or FLATTEN ALL. |
| WOULD-HAVE (dashed teal) | A trade the engine would have taken while AUTO was off. No money, no orders. | Nobody — it exists only in Review. |
| YOURS · OPENED OUTSIDE PLATFORM | Found at Alpaca but not opened by the platform (e.g. bought in the Alpaca app). | You, like any of yours. The engine never adopts or manages it. |

**Controls:** STOP AUTO · CANCEL ALL ENTRIES · CANCEL ENGINE ENTRY · OVERRIDE EXIT · FLATTEN ALL · + STOP — as in section 4.7 and the gestures table (3.6).

**Safety rules:** hard controls may block new risk but never close your positions on their own. Soft loss limit / give-back — AUTO pauses, your trading stays allowed. Hard loss limit — all new entries blocked, yours too; exits always allowed; no resume that day. Intraday margin call — AUTO and your BUY/SHORT blocked; exits available; the engine sells only what it needs of its own; a cure button for yours that runs only on your click. Disconnects never sell your positions. A forced sale by Alpaca shows "CLOSED BY ALPACA · MARGIN".

**Example day**

1. 10:00 — AUTO is on. The engine holds WXYZ (ENGINE'S) and has an entry working in NOPQ.
2. 10:01 — You press STOP AUTO. The unfilled part of the NOPQ entry is cancelled (filled shares stay the engine's). The engine keeps managing WXYZ; its exit is locked for you. Nothing new opens.
3. 10:05 — You buy GHIJ and IJKL (YOURS). Their buttons work; the engine never trades them.
4. 10:12 — You hold OVERRIDE EXIT on WXYZ for 1 s. Only WXYZ closes; logged as your intervention; the engine won't re-enter WXYZ on the same setup.
5. 10:30 — You turn AUTO back on (main window, hold 2 s). The engine may open new trades. GHIJ and IJKL stay yours; their SELL/EXIT still work.
6. 10:45 — Away from the desk, you sell IJKL from the phone (hold 1 s, same protected exit).
7. Any time — emergency: hold FLATTEN ALL 1 s; everything closes; AUTO stays off until you turn it on.

## 14.2 Signals, colors, sounds and alerts (REF2)

Consolidates chapter 3: one job per color (3.2), the blink rule and markers (3.3), alert levels, the alert line and sounds (3.4), the health words (3.5). Includes AUTO BLOCKED — ORDER LIMIT in the Critical list and NEWS UNKNOWN in the markers.

## 14.3 Windows map (REF3)

The main window never closes and holds only what you need to act in seconds; anything you read gets its own window, one click away in Windows ▾ (7 windows). Every separate window has the thin top bar and the alert line. The map lists each window with how it opens, its key contents, its settled section and its mockup IDs, plus the pop-up trade card, the thin top bar, the phone view and these reference pages. It is a planning map, not a window of the platform.

![REF1 — Who owns a position: the four labels, the controls, the safety rules and the example day.](mockups/REF1_Who_owns_a_position.png)

![REF2 — Signals, colors, sounds and alerts: colors, signals and markers, alert levels, sounds, health words.](mockups/REF2_Signals_colors_sounds_alerts.png)

![REF3 — Windows map: where everything lives, how each window opens, and the mockup IDs.](mockups/REF3_Windows_map.png)
