# Rebuilding every format from the sources

Edit the Markdown in `md/` (and the drawings in `drawing_source/`) — never the Word or PDF. Run the steps in a working folder that holds `md/`, `mockups/`, and `tools/*`.

| Step | Command |
|---|---|
| Joined Markdown | `cat` the 20 files in `md/` in name order, joined with a single newline → `File9_v4_Specification.md` (byte-identical to the shipped Markdown when the sources are unchanged) |
| Mockup JPEGs for Word | `python3 make_docimg.py` (1800 px wide, quality 80, Lanczos — the settings that most closely match the images embedded on Sept 28) |
| Word | `npm i docx@9` then `node build_docx.js File9_v4_Specification.md File9_v4_Master_Specification.docx` |
| PDF | LibreOffice **Writer** must be installed (`libreoffice-writer`; `libreoffice-core` alone fails with "source file could not be loaded"): `soffice --headless --convert-to pdf File9_v4_Master_Specification.docx` |
| Decision log PDF | `python3 build_log_html.py File9_v4_Decision_Log.md log.html` (needs `pypandoc_binary`) then `node build_log_pdf.js log.html File9_v4_Decision_Log.pdf` (Playwright + Chromium) |
| One mockup | `node render.js drawing_source/Settings.src.html '?page=3' out.png` (1536 × 864 at 2×; full-page drawings such as C2 and M4: `render_page.js`). `splice.py` patches only the changed region into the shipped PNG, keeping its palette, so an unrelated part of a drawing can never drift. |

Check a rebuild against the previous one by comparing the PDF text page by page: rebuilt from unchanged sources, the Sept 28 Master reproduces exactly (91 pages).
