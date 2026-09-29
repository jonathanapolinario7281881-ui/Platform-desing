# 19. Appendices

## Appendix A — Mockup index

All mockups are in the folder `mockups/` as PNG files at 2× resolution (3072 px wide) of the 1536 × 864 design. They are the latest approved v4 design only.

| ID | File | Shows | Chapter |
|---|---|---|---|
| M1 | M1_Main_window_AUTO_OFF.png | Main window, AUTO OFF | 4 |
| M2 | M2_Main_window_AUTO_ON.png | Main window, AUTO ON | 4 |
| M3 | M3_Main_window_Windows_menu.png | Windows ▾ menu open | 4 |
| M4 | M4_Main_window_states.png | Alert line, AUTO / limits / health, FLATTEN sequence, card states, blinks, colors | 4 |
| M5 | M5_Main_window_worst_case_LIVE.png | Worst case in LIVE | 4 |
| M6 | M6_Main_top_bar_fit_test.png | Main top bar fit test | 4 |
| T1 | T1_Thin_top_bar_every_window.png | Thin top bar, six states | 5 |
| C1 | C1_Trade_card_in_News.png | Pop-up trade card in a window | 5 |
| C2 | C2_Trade_card_states.png | Trade card states | 5 |
| RV1 | RV1_Review_Journal.png | Review — Journal | 6 |
| RV2 | RV2_Review_Replay.png | Review — Replay | 6 |
| RV3 | RV3_Review_Replay_with_live_card.png | Replay with the live card | 6 |
| RV4 | RV4_Review_Performance.png | Review — Performance | 6 |
| PO1 | PO1_Positions_Orders_normal_day.png | Positions & Orders, normal day | 7 |
| PO2 | PO2_Positions_Orders_flatten_incomplete_LIVE.png | Flatten incomplete, LIVE | 7 |
| PO3 | PO3_Positions_Orders_states.png | Positions & Orders states | 7 |
| SET1 | SET1_Settings_trading_and_risk.png | Settings page 1 | 8 |
| SET2 | SET2_Settings_engine_and_connections.png | Settings page 2 | 8 |
| SET3 | SET3_Settings_screen_and_sounds.png | Settings page 3 | 8 |
| SD1 | SD1_Stock_detail_ABCD_yours_in_slot.png | Stock detail, your position in a slot | 9 |
| SD2 | SD2_Stock_detail_WXYZ_engine_no_slot.png | Stock detail, engine's position, no slot | 9 |
| SD3 | SD3_Stock_detail_states.png | Stock detail states | 9 |
| AI1 | AI1_AI_Assistant.png | AI Assistant | 10 |
| NW1 | NW1_News_and_Catalysts.png | News & Catalysts | 11 |
| SH1 | SH1_System_Health_normal.png | System Health, normal | 12 |
| SH2 | SH2_System_Health_states.png | System Health states | 12 |
| PH1 | PH1_Phone_view.png | Phone view | 13 |
| REF1 | REF1_Who_owns_a_position.png | Who owns a position | 14 |
| REF2 | REF2_Signals_colors_sounds_alerts.png | Signals, colors, sounds and alerts | 14 |
| REF3 | REF3_Windows_map.png | Windows map | 14 |

## Appendix B — Glossary

| Term | Meaning |
|---|---|
| Ranked 50 | The engine's ~50 best opportunities from the whole market, best at #1 |
| My list | Your pinned stocks (about 10–20), watched like the 50 |
| L2 slot | One of the three Level 2 (full order book) streams from IBKR; shown as L2·1 / L2·2 / L2·3 |
| AUTO OFF / ON | Who may open new trades: you, or the engine |
| YOURS / ENGINE'S | Who opened (and owns) a position |
| WOULD-HAVE | A trade the engine would have taken while AUTO was off (Review only) |
| Protected ceiling | The highest price a BUY may pay (floor for SHORT); shares are computed from it |
| Exit boundary | The lowest price a normal exit steps down to before asking "SELL LOWER TO $x" |
| FULL CAP | The most the platform allows for this stock and account right now |
| LIMITED | The share count is lower than your size because of a cap, cash or liquidity |
| RISK LINE | Where an engine trade's idea is proven wrong — not a promised exit price |
| R | Risk unit: the planned loss if the stop / risk line is hit ("—" for your trades without a planned stop) |
| SPR | Spread (ask − bid) in dollars |
| RVOL | Today's volume compared with normal |
| MFE / MAE | Best / worst unrealized point during a trade |
| UNKNOWN | An order whose state Alpaca has not confirmed; never resent until it is |
| Broker check | Reconciliation of the platform's positions, orders and cash with Alpaca (Alpaca wins) |
| Margin Safety Layer | The pre-trade projection that keeps intraday margin calls at zero |
| Health words | HEALTHY · DEGRADED · NOT SAFE TO TRADE |
| TEST value | A starting number, tuned by testing, shown as TEST in Settings |
| PIN | A short code (plus a hold) required for LIVE and risk-raising actions |
| Phase 0 | The research and validation stage before paper trading (chapter 15) |
| RESEARCH | Results from Phase 0 runs, kept separate from PAPER and LIVE |
| Outside watchdog | A separate service that alerts the phone if the trading server stops |

## Appendix C — Left out on purpose

- Practice mode (replaying a past day to trade by hand).
- Automatic end-of-day report to the phone (the AI Assistant can review on request).
- A separate halts list (the halt marker lives on the stock).
- A second monitor (everything is designed for one laptop).
- Sliding Level 2 panels (the three panels stay fixed; the strip slides instead).
- A visible 0–100 score or quality grade for stocks (the rank order is enough; A–D is for news only).
- A column chooser for the list (all 14 columns always show).
- Keyboard hotkeys for orders or emergency buttons.
- Voice trading (the microphone only types questions for the AI Assistant).
