# File 9 v4 → v4.1 — the corrections approved September 29, 2026

Everything below was corrected **in the Markdown sources first** (`sources/md/`, `sources/`), and every format was then rebuilt from them: Master Word, PDF and Markdown, the redrawn mockup, START_HERE and the decision log (Markdown and PDF). Nothing was patched by hand in the Word or PDF.

| # | Item | What changed | Where |
|---|---|---|---|
| 1 | Leverage steps | "1.25×–2×" → **1× → 1.5× → 2×**. Whether and when to go above 1× stays OPEN (only after clean real-money testing); the step sizes are settled. | Master 2.7 (Phase 4) · 17.2 |
| 2 | Settings page 3 | "one shared set for PAPER and LIVE" removed. **Locked:** the four alert levels (SIGNAL / INFO / ATTENTION / CRITICAL). **Separate for PAPER and LIVE:** every event's sound, volume and on / off; which stocks make a signal sound; the anti-spam interval; the spread-warning thresholds (moved here from List & display because they are a warning). In LIVE, Critical sounds can be turned down but not off, and a change to a LIVE alert setting applies at once and is logged under LIVE. **Shared:** blink look and Reduced Motion; re-sort speed, hold-under-pointer, NEW tag time, NEWS bright time, F2; My list. **SET3 redrawn.** New check SET-08. | Master 2.4 · 3.4 · 3.9 · 8.1 · 8.4 · 8.5 · 17.1 · 18 · mockup **SET3** |
| 3 | BUY on a held stock | Made explicit and **SETTLED**: BUY reads "in position" (lowercase, exact wording) and cannot add shares, for your positions and the engine's; adding is designed only if paper testing gives a reason (like SELL HALF). Removed from OPEN. The hard-limit wording no longer says "adding to a position" as if it were possible. New check MW-14. | Master 2.8 · 2.10 · 2.11 · 4.5 · 4.9 · 17.2 · 18 · mockups **C2** and **M4** (one sentence each) |
| 4 | Engine files | The Master's source order is now five levels (Master → Engine_v4_Current_Requirements → mockups → decision log → Files 1–8 archive, reference only), with the rule that a Master/engine conflict goes to Jonathan. **The engine document itself is not written yet — Files 1–8 and the Addition to File 6 were not in the uploads** (`../engine_prep/NEEDS_FILES_1-8.md`). | Master title page · 1.1 · 1.3 · 15.7 · START_HERE · `Engine_Source_Archive_NOTE.md` |
| 5 | Stale sentence | Removed from the decision log (Markdown and PDF). The "two small points" paragraph now records the answers, and a new section **7k** records the audit, each correction and the approvals. | Decision log 7k · "Next layers" item 10 |

## Mockups

Exactly three of the 30 changed. **SET3** was redrawn; **C2** and **M4** changed by one sentence each (the hard-limit note). The other 27 files are byte-identical to the package delivered on Sept 28. SET1 and SET2 were re-rendered from the same source and are pixel-identical.

## Verification done

- The build pipeline was validated first: rebuilt from the **unchanged** Sept 28 sources it reproduces the shipped Master exactly — 91 pages, identical text on every page.
- The corrected Master's text differs from Sept 28 only by the changes above (word-level diff). It is **92 pages** (the new text and the two new checks).
- The decision log's text differs from Sept 28 only by the changes above; it is 33 pages.
- All 30 mockup references resolve; no "1.25×–2×", "one shared set", or "Still waiting for Jonathan's go" remains in the Master, Markdown, START_HERE or log outside the 7k description of the corrections.

## Not done yet — deliberately

- `Engine_v4_Current_Requirements` (Markdown, Word, PDF) and its *Needs Jonathan* list — blocked on the nine engine files.
- `Engine_Source_Archive_REFERENCE_ONLY.zip` — needs the same files; its notices are ready in `../engine_prep/archive_notices/`.
- The independent review of the engine document.
- **The final package ZIP.** It is rebuilt once, after Jonathan and ChatGPT approve the corrected Master and the engine draft. `START_HERE.md` in this folder describes that final layout, so it names files (the engine document) that are not here yet.
