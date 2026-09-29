import sys, pypandoc
src, out = sys.argv[1:3]
md = open(src, encoding='utf-8').read()
body = pypandoc.convert_text(md, 'html', format='markdown+smart', extra_args=['--wrap=none'])
css = """
body{font-family:Arial,'Liberation Sans',sans-serif;font-size:12.5px;line-height:1.55;color:#1F2937;margin:0}
h1{font-size:26px;color:#17365D;margin:18px 0 10px}
h2{font-size:18px;color:#17365D;margin:22px 0 8px;padding-bottom:4px;border-bottom:1px solid #D5DCE5;page-break-after:avoid}
h3{font-size:14px;color:#2B4C7E;margin:14px 0 6px;page-break-after:avoid}
p{margin:6px 0}
blockquote{margin:0 0 14px;padding:8px 14px;background:#EEF4FB;border-left:4px solid #2B6CC4}
blockquote p{margin:4px 0}
table{border-collapse:collapse;width:100%;margin:8px 0;font-size:11px}
th,td{border:1px solid #C9D1DB;padding:5px 8px;vertical-align:top;text-align:left}
th{background:#DCE6F2}
tr{page-break-inside:avoid}
code{font-family:'DejaVu Sans Mono',monospace;font-size:10.5px}
hr{border:0;border-top:1px solid #D5DCE5;margin:14px 0}
ul,ol{margin:4px 0;padding-left:22px} li{margin:2px 0}
del{color:#888}
"""
html = f"<!doctype html><html><head><meta charset='utf-8'><title>File 9 v4 — Decision log</title><style>{css}</style></head><body>{body}</body></html>"
open(out, 'w', encoding='utf-8').write(html)
