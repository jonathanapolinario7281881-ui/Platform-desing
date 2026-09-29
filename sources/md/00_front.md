# File 9 v4 — AI Trading Platform: Master Specification

**Platform makeup, behavior, research (Phase 0) and security — the authoritative build document**

| | |
|---|---|
| Version | 4.1 — final, with the corrections approved September 29, 2026 |
| Date | September 29, 2026 (version 4.0: September 28, 2026) |
| Owner | Jonathan (the only person who approves changes) |
| Prepared with | Claude and ChatGPT, from Files 1–8, the Addition to File 6, the Window Decision Record v2 and the v4 decision log |
| Replaces | File 9 v3 and every earlier draft, mockup and preview. Nothing older is part of this specification. |
| Audience | The coder (Codex) and anyone building or testing the platform |
| Companion files | Markdown copy of this document (same content), the current engine requirements (Engine_v4_Current_Requirements), all mockups as PNG files, the complete decision log, START_HERE. Files 1–8 and the Addition to File 6 are kept separately as a reference-only archive, never a build source (section 1.3). |

## Contents

1. How to read this document
2. Architecture the screens depend on
3. Rules that apply on every screen
4. The main window
5. Every separate window: the thin top bar and the pop-up trade card
6. Review window (Journal · Replay · Performance)
7. Positions & Orders window
8. Settings window
9. Stock detail window
10. AI Assistant window
11. News & Catalysts window
12. System Health window
13. Phone view
14. Reference pages: who owns a position · signals, colors, sounds and alerts · windows map
15. Phase 0 — research and validation architecture
16. Security, resilience and platform protection
17. OPEN items and TEST values
18. Acceptance checks (summary)
19. Appendices — A Mockup index · B Glossary · C Left out on purpose
