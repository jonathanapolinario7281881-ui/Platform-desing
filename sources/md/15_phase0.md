# 15. Phase 0 — research and validation architecture

**Status: SETTLED.** Phase 0 comes first. It decides — with real historical market data and realistic trading friction — whether the designed opportunity classes, ranking logic, entries, exits, re-entries, risk rules and supporting features produce a repeatable advantage, before months are spent building everything around assumptions. It is not the final training cycle and not live trading.

## 15.1 Questions Phase 0 must answer

- Can the engine detect the designed move types — explosive runners, moderate moves, rebounds, slow sustained trends, post-spike secondary moves (shorts later) — early enough to be useful, not after most of the move is gone?
- Does the Ranked 50 / candidate ranking surface the best opportunities from the broad universe?
- Which signals and features matter, and which are noise?
- Does early-deterioration exit + structural backstop + stricter re-entry beat simply holding through pullbacks once spread, slippage, commissions, missed fills and whipsaws are included?
- Can the system avoid deep reversals it must never ride (for example $3 → $1.50)?
- How does it behave across regimes: hot momentum days, quiet days, selloffs, low-volume periods, different volatility?
- How much do slippage, spread and liquidity reduce the apparent edge? What sizes are realistically tradable?
- Is historical Level 2 needed for some strategies, and how much? Is Massive data alone enough for some strategy classes?
- Is a larger historical research / training cycle justified? What must change before paper trading?

## 15.2 Verdicts

One verdict for each major strategy component and for the platform concept as a whole: **GO · GO WITH CHANGES · NO-GO · NOT ENOUGH EVIDENCE**. NOT ENOUGH EVIDENCE is used when a class appears too rarely in the sample to judge; it is different from NO-GO.

## 15.3 How it is built

- The **same core engine / scanner / ranking / strategy code** intended for live trading, connected to a **research adapter** instead of Alpaca:

  Massive historical data → event-by-event replay → engine / scanner / ranking / strategy logic → simulated execution → Review / Performance analysis

- It runs in the separate Research environment (no LIVE credentials there — chapter 16).
- Phase 0 is not a UI project. Review / Performance can show results, but the priority is the research engine. Alpaca, real-money controls and finished production features are not needed for Phase 0.
- **The simulated broker models:** bid / ask spread, protected entry ceilings, slippage, liquidity, partial fills where reasonably modelable, fees, halts (including LULD reopen gaps), session rules, order delays, failed or missed entries, exits and re-entries. Never a backtest where every order fills at the wanted price.

## 15.4 Research rules — Jonathan's four training rules + walk-forward

1. **No look-ahead:** at every historical moment the engine uses only what was available then. No future high, future headline, later rank or later volume may leak backward — also not into features, normalization, labels, candidate selection or thresholds.
2. **Locked final "secret exam":** a recent period is kept untouched and used once, at the very end.
3. **Realistic trading costs / friction** (15.3).
4. **No survivorship bias:** the history includes delisted, bankrupt and collapsed stocks and corporate actions (splits, reverse splits, symbol changes).
5. **Walk-forward testing** is a core requirement: tune on the past → test on the next unseen period → move forward → repeat.

## 15.5 Guarding against fooling ourselves

- **GO rules are written down before the tests run:** minimum trade count, results after costs, worst drawdown, stability across regimes — so the goalposts cannot move after seeing numbers.
- **The sample is chosen by rules decided in advance,** not by eye: quiet days, fake breakouts and failures, not only famous runners. Start with a representative sample across regimes, not all 23–26 years; expand only if results justify it.
- **Baselines:** compare against simple rules (a plain momentum rule; random entries with the same exits). The full engine must beat them after costs.
- **Side-by-side variants** (for example A structural hold · B early-deterioration exit + re-entry · C without Level 2 · D with Level 2). The number of variants is limited and every variant tried is recorded (many variants make a lucky false winner likely).
- **Ranked 50 detection measure:** for each big mover in the sample, when it entered the Ranked 50 and the top 3, and how much of the move was still left.

## 15.6 The AI in Phase 0

- Phase 0 establishes the engine's edge **without the LLM first**. The AI is then tested as a separate, additive component and must earn its place by improving unseen results after costs.
- Historical AI tests are trusted only when the model provably could not know the future — for example a model whose knowledge cutoff is before the test period. Hiding tickers or dates may be tried as an experiment but is not proof.
- When the AI model is upgraded its cutoff moves, so its test window moves forward and it is re-validated before it influences trading again.

## 15.7 Data, budget and outputs

- **Historical Level 2:** buy a small representative sample first — about 200 stock-days (TEST / budget value) — and more only if learning curves and out-of-sample results show it helps. Needed for the with / without Level 2 comparison; Massive does not supply historical Level 2.
- **Reproducible runs:** every run records its data snapshot, code version, parameters and settings. Results appear in Review labeled **RESEARCH**, never mixed with PAPER or LIVE.
- **Phase 0 sets the initial TEST values for trading / model parameters:** ranking thresholds, entry requirements, deterioration thresholds, structural stops / risk lines, re-entry requirements, slippage ceilings, liquidity / capacity limits, strategy parameters. User-interface timings (blinks, sounds, NEW tag, re-sort speed) are tuned in usability and paper testing, not here.
- **Budget and time limit** (data purchases and computing) are set before Phase 0 starts.
- **After Phase 0:** paper trading, then small live — the gates from Files 5, 7 and 8, as carried into Engine_v4_Current_Requirements, stay as written.

## 15.8 Acceptance checks — Phase 0

- **P0-01** A leakage test proves no feature, label, normalization, candidate selection or threshold uses information after its timestamp.
- **P0-02** The historical universe includes delisted and collapsed names and applies corporate actions point-in-time.
- **P0-03** The locked final period is untouched until the final run; the log proves it was used once.
- **P0-04** Every result is reproducible from its recorded snapshot, code version and parameters.
- **P0-05** The simulated broker never fills beyond the modeled spread, ceiling and liquidity; missed and partial fills occur.
- **P0-06** GO rules, sample rules and the variant list were recorded before the results; the final report gives one of the four verdicts per component and for the concept.
