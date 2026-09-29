# READ FIRST — Engine source archive (reference only)

Contents: Files 1–8 and the Addition to File 6, unchanged. Read `DO_NOT_BUILD_DIRECTLY_FROM_THESE_FILES.md` before opening anything.

## Precedence

Anything File 9 v4 settled wins over these files — screens and behavior, the brokers, leverage and margin, Phase 0, security. The current engine design is `Engine_v4_Current_Requirements`, not these files.

## Points already known to be replaced

Reported by the Sept 29 review, **to be confirmed against the files themselves** when the engine document is written; the full list comes from a complete read of all nine files.

| Where | What the file says | What replaced it |
|---|---|---|
| File 8 | IBKR as the leading broker for placing orders, "replacing Alpaca" | The settled hybrid: **Alpaca** places orders, account, positions and fills; **IBKR** supplies Level 2 only; Massive supplies broad market data. IBKR-only is a review point around $60,000, not an automatic switch (Master 2.2). |
| File 6 | An example where $5,000 becomes $10,000 of buying power on margin | 1× leverage in both layers (Alpaca `max_margin_multiplier = 1` and the platform's own cap); later steps 1.5× then 2× only after clean real-money testing (Master 2.7). File 6's requirement to tell cash apart from non-marginable buying power still stands. |
