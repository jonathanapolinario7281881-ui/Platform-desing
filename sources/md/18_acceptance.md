# 18. Acceptance checks (summary)

A build is done when every check below passes in PAPER; LIVE additionally requires the rollout checks in 17.3. The detailed pass conditions are at the end of each chapter.

| Area | Checks |
|---|---|
| Main window (ch. 4) | MW-01 mode invariance · MW-02 one click · MW-03 order size · MW-04 ownership · MW-05 every position reachable · MW-06 no wrong-stock clicks · MW-07 signals · MW-08 My list · MW-09 NEWS letters · MW-10 top bar fit · MW-11 alert line · MW-12 emergency controls · MW-13 laptop fit · MW-14 no adding |
| Thin bar and trade card (ch. 5) | TB-01 … TB-04 · TC-01 … TC-05 |
| Review (ch. 6) | RV-01 … RV-07 |
| Positions & Orders (ch. 7) | PO-01 … PO-07 |
| Settings (ch. 8) | SET-01 … SET-08 |
| Stock detail (ch. 9) | SD-01 … SD-06 |
| AI Assistant (ch. 10) | AI-01 … AI-06 |
| News & Catalysts (ch. 11) | NW-01 … NW-05 |
| System Health (ch. 12) | SH-01 … SH-06 |
| Phone (ch. 13) | PH-01 … PH-06 |
| Phase 0 (ch. 15) | P0-01 … P0-06 |
| Security and resilience (ch. 16) | SEC-01 … SEC-09 |

**Platform-wide checks**

- **G-01 Windows:** every separate window opens from Windows ▾ (and its listed shortcuts), keeps the thin top bar and alert line, and closing any window stops nothing.
- **G-02 Consistency:** for every stock state in C2, the strip card, the Level 2 panel buttons, Stock detail and the trade card show the same wording and behave identically.
- **G-03 Screen never slows the engine:** with every window open, the engine's timing (event → signal → order) is unchanged within measurement noise.
- **G-04 Logging:** every human action and settings change appears in the audit log and in Review with time and source (desk or phone).
- **G-05 Wording:** every exact phrase in quotes in this document appears on screen exactly as written.
- **G-06 No hotkeys:** no keyboard shortcut sends or cancels an order or closes a position; F2 returns to the main window and Esc closes the pop-up trade card.
