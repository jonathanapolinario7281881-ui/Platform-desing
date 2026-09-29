# START HERE — File 9 v4, final package

This package is what the coder builds Jonathan's AI trading platform from. It holds two specifications that work together: the **File 9 v4 Master Specification** (the screens and their behavior, brokers and connections, leverage and margin, risk controls, the Phase 0 research stage, and the security and resilience requirements) and **Engine_v4_Current_Requirements** (the current engine and strategy design, reconciled from Files 1–8 and the Addition to File 6). It contains only the latest approved v4 design. File 9 v3, earlier drafts, comparison pages and old previews are not part of it and do not apply.

## What is in the package

| File | What it is |
|---|---|
| `File9_v4_Master_Specification.docx` | **The authoritative platform document** (Word), with every mockup next to its chapter |
| `File9_v4_Master_Specification.pdf` | The same document as PDF (identical content) |
| `File9_v4_Specification.md` | The same text in Markdown for coding tools; mockups linked from `mockups/` |
| `Engine_v4_Current_Requirements` (.docx / .pdf / .md) | **The current engine requirements**: every still-valid requirement from Files 1–8 and the Addition to File 6, each with its source tag, replaced items marked, and a traceability appendix |
| `mockups/` | All 30 final mockups as PNG files (2× resolution of the 1536 × 864 design) |
| `decision_log/` | The complete decision log (Markdown + PDF): every proposal, review and approval with dates — the history behind each rule |
| `Engine_Source_Archive_NOTE.md` | A short note: the original Files 1–8 are kept in a separate reference-only archive, never a build source |
| `START_HERE.md` | This page |

## How to use it (for the coder)

1. Read chapters 1–3 of the Master first: how to read the documents (including the source order in 1.3), the architecture the screens depend on, and the rules that apply on every screen.
2. **Phase 0 comes first (Master chapter 15):** build the research engine — the same core engine code on Massive historical data with a simulated broker — before the production screens. The engine itself is specified in Engine_v4_Current_Requirements. Phase 0 ends with GO / GO WITH CHANGES / NO-GO / NOT ENOUGH EVIDENCE.
3. **Security and resilience from day one (chapter 16):** separate Research / Paper / LIVE environments, no LIVE keys in development, order circuit breakers outside the strategy code, audit logs, the outside watchdog.
4. Build the screens from chapters 4–14 with the mockups (Appendix A lists every mockup ID and file).
5. Put every TEST value in configuration and build every OPEN item so it can change later without a redesign (chapter 17).
6. A build is done when the acceptance checks pass (end of each chapter; summary in chapter 18).

## Ground rules

- **Source order** (Master section 1.3): (1) the Master Specification → (2) Engine_v4_Current_Requirements → (3) the mockups → (4) the decision log → (5) Files 1–8 and the Addition to File 6, reference only.
- If the Master and the engine document ever conflict, that is an error to bring to Jonathan — do not settle it in code.
- Where the text and a mockup differ, **the text wins**.
- Exact wording in quotes is the exact on-screen text.
- Mockup tickers and numbers are placeholders. Some main-window mockups show shorts (Phase 3 appearance); in Phase 1 every SHORT button reads "SHORT · off · long-only".
- Never build directly from Files 1–8 or the Addition to File 6: parts of them were replaced by later decisions.
- Any change to a settled rule needs Jonathan's explicit approval.

Version 4.1 — September 29, 2026.
