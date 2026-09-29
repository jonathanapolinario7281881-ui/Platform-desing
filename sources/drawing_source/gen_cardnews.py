s=open('render/News.src.html').read()
s=s.replace('<title>News and Catalysts — v4 settled</title>','<title>Pop-up trade card — in News &amp; Catalysts</title>')
s=s.replace('</style>\n</head>','</style>\n<script src="thinbar.js"></script>\n<script src="card.js"></script>\n</head>',1)
i=s.index('H.push(`<header>'); j=s.index('`);\n\nconst own')+3
s=s[:i]+"H.push(thinBar({name:'News & Catalysts'}));"+s[j:]
card = r'''
const cardHTML = `<div class="tcard" style="left:196px;top:150px">
 <div class="tch"><span class="lbl">TRADE CARD</span><span class="tkb up">ABCD</span><b class="g" style="font-size:12px">▲ strong up</b><span class="mu" style="font-size:11px">#1 · L2·1</span><span class="chip you" style="height:17px;font-size:9.5px">YOURS</span><div style="flex-grow:1"></div><span class="bl" style="font-size:11px;text-decoration:underline">Full page ↗</span><span class="x">✕</span></div>
 <div class="tcb">
  <div class="pr"><span class="p">$2.15</span><span class="mono g" style="font-size:12.5px">+32.7%</span><span class="mini g" style="border-color:#1F6B45">LONG setup</span><div style="flex-grow:1"></div><span class="mini" style="color:#34C77B;border-color:#1F6B45">NEWS A · 11m</span><span class="mono so" style="font-size:11px">SPR $0.01</span><span class="mini" style="color:#34C77B;border-color:#1F6B45">AI GO · 40 s</span></div>
  ${miniChart({seed:11,from:1.62,to:2.15,jump:0.78,lines:[[2.15,'#E7EAEE','YOUR ENTRY $2.15','5 3']],marker:[44,2.12,'Engine would have bought here · $2.12'],labels:['06:50','07:05','07:20','07:31','07:42']})}
  <div class="ln">Engine <b class="g">Acceleration</b> · asks consumed, trades ×4 · <span class="dm">○ would have bought $2.12 · AUTO off</span></div>
  <div class="ln">AI <span class="mini" style="color:#34C77B;border-color:#1F6B45;height:16px">GO</span> context supports the setup · supply deal is real · 40 s</div>
  <div style="display:flex;align-items:center;gap:8px;font-size:12px"><span class="chip you" style="height:17px;font-size:9.5px">YOURS</span><span class="mono">300 @ $2.15</span><span class="mono so">+$0.00 · 0.0%</span><div style="flex-grow:1"></div><span class="btn" style="height:22px;font-size:10.5px;border-style:dashed">+ STOP</span></div>
  <div class="stl" style="border-color:#3E5470;background:#111A28"><b class="bl">PARTIAL 300 / 521</b><span class="so">· WORKING ≤ $2.24 · size limited by cash</span><span class="sb">CANCEL</span></div>
  <div class="szb"><span class="lab" style="margin-right:2px">SIZE</span><span class="o">10%</span><span class="o on">25%</span><span class="o">50%</span><span class="o">$2,000</span><span class="o">FULL CAP</span><span class="mono nw" style="font-size:11px;margin-left:3px">= $1,308</span><span class="dm nw" style="font-size:9.5px;margin-left:auto">same size everywhere</span></div>
  <div class="bb4"><span class="bb b-dis">BUY ABCD<small>order working</small></span><span class="bb b-sell">SELL/EXIT<small>300 sh · one click</small></span><span class="bb b-dis">SHORT<small>off · long-only</small></span><span class="bb b-dis">COVER<small>—</small></span></div>
  <div class="tfoot">Same card and rules as the main window. Buy = the second click, here. Closing it (✕ / Esc) never cancels an order. One card at a time (another ticker replaces it); drag the header to move it. Buttons lock ~0.5 s after opening (TEST).</div>
 </div></div>`;
'''
s=s.replace("\nconst own = ", card+"\nconst own = ",1)
s=s.replace(".dim{opacity:.45}",".dim{opacity:.45}\n.nrow.sel .tk{outline:2px solid #5AA2FF;outline-offset:2px;border-radius:2px}",1)
s=s.replace("document.getElementById('win').innerHTML = H.join('');","document.getElementById('win').innerHTML = H.join('') + cardHTML;\nfitBar(document.querySelector('header.tb'));")
open('render/CardNews.src.html','w').write(s)
