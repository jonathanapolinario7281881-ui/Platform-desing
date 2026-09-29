// Thin top bar used in every separate window (v4, extra pages 7h).
// thinBar(o) returns the header + 22 px alert line; fitBar(el) applies the fit rule.
(function(){
const css = `
.tb{height:48px;flex-shrink:0;display:flex;align-items:center;gap:7px;padding:0 10px 0 6px;background:var(--panel);border-bottom:1px solid var(--line);overflow:hidden}
.tb .wname{font-size:15px;font-weight:700;margin-left:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:60px;flex-shrink:1}
.tb .envP{height:28px;display:flex;align-items:center;padding:0 9px;border-radius:6px;border:1px solid #3E5470;background:#1B2433;color:#A9C7FF;font-size:11.5px;font-weight:700;letter-spacing:.04em;white-space:nowrap;flex-shrink:0}
.tb .envL{height:28px;display:flex;align-items:center;padding:0 9px;border-radius:6px;border:1px solid #E5484D;background:#5A1216;color:#FFB3B5;font-size:11.5px;font-weight:700;letter-spacing:.04em;white-space:nowrap;flex-shrink:0}
.tb .ab{height:30px;display:flex;align-items:center;gap:6px;padding:0 3px 0 9px;border-radius:6px;font-size:11.5px;font-weight:700;letter-spacing:.02em;white-space:nowrap;flex-shrink:0}
.tb .ab.off{border:1px solid #3A4556;background:#1A212C;padding-right:9px}
.tb .ab.on{border:1px solid #1FA79B;background:#0D3533;color:var(--teal)}
.tb .ab.pa{border:1px solid #8A6A2E;background:#2A2010;color:var(--amber);padding-right:9px}
.tb .ab.bl{border:1px solid #A8262B;background:#2A1114;color:#FF9EA1;padding-right:9px}
.tb .stop{height:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;padding:0 8px;border-radius:5px;background:#A8262B;border:1px solid #D0454A;color:#fff}
.tb .stop b{font-size:10.5px;letter-spacing:.03em}.tb .stop i{font-style:normal;font-size:8.5px;opacity:.85;font-weight:500}
.tb .clk{display:flex;flex-direction:column;line-height:1.1;white-space:nowrap;flex-shrink:0}
.tb .clk small{font-size:9px;font-weight:700;letter-spacing:.07em;color:var(--amber)}
.tb .clk span{font-family:'IBM Plex Mono',monospace;font-size:12px}
.tb .chips{display:flex;gap:5px;align-items:center;flex-shrink:0}
.tb .sig{height:28px;display:flex;align-items:center;padding:0 8px;border-radius:5px;font-size:11px;font-weight:700;white-space:nowrap}
.tb .s-up{border:1px solid #2F9E63;background:rgba(52,199,123,.55);color:#EFFFF6}
.tb .s-dn{border:1px solid #B8474C;background:rgba(240,85,90,.5);color:#FFF1F1}
.tb .s-ex{border:1px solid #9D4B7C;background:rgba(244,114,182,.18);color:#FBCFE8}
.tb .s-eng{box-shadow:inset 0 -3px 0 #5CE0D2}
.tb .more{font-size:10.5px;color:var(--blue);white-space:nowrap}
.tb .pl{display:flex;flex-direction:column;line-height:1.15;white-space:nowrap;flex-shrink:0}
.tb .lt{height:20px;display:flex;align-items:center;padding:0 6px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.05em;white-space:nowrap;flex-shrink:0}
.tb .lt.s{border:1px solid #8A6A2E;background:#2A2010;color:var(--amber)}
.tb .lt.h{border:1px solid #D0454A;background:#3A1216;color:#FF9EA1}
.tb .hl{height:30px;padding:0 9px;border-radius:6px;display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;letter-spacing:.04em;white-space:nowrap;flex-shrink:0}
.tb .hl.g{border:1px solid #1F6B45;background:#0F2119}
.tb .hl.a{border:1px solid #6B4A16;background:#1F180C;color:var(--amber)}
.tb .hl.r{border:1px solid #A8262B;background:#2A1114;color:#FF9EA1}
.tb .wm{height:30px;padding:0 9px;border-radius:6px;border:1px solid #2E3A4A;background:#161D28;font-size:11.5px;display:flex;align-items:center;white-space:nowrap;flex-shrink:0}
.al2{height:22px;flex-shrink:0;display:flex;align-items:center;gap:8px;padding:0 12px;background:#0E131B;border-bottom:1px solid var(--line)}
.al2.att{background:#231B0C;border-bottom-color:#6B4A16}
.al2.crit{background:#3A1216;border-bottom-color:#A8262B}
.win.live::after{content:'';position:absolute;inset:0;border:3px solid #E5484D;pointer-events:none;z-index:9}
`;
const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
const dotc={g:'#34C77B',a:'#F2A93B',r:'#F0555A'};
window.thinBar = function(o){
 o=Object.assign({name:'News & Catalysts',env:'PAPER',auto:'OFF',reason:'',clockL:'PRE-MARKET',clock:'07:42 ET',chips:[['▲ ABCD strong up','up'],['EXIT? GHIJ','ex']],more:0,pl:'+$233.00 · +4.66%',neg:false,limit:'',health:'HEALTHY',hc:'g',alert:['INFO','07:42:18','ABCD BUY partly filled · 300 of 521 @ $2.15 · still working, no higher than $2.24 · size limited by cash',''],alerts:15},o);
 if(o.chips.length>3){ o.more+=o.chips.length-3; o.chips=o.chips.slice(0,3); }
 const auto = o.auto==='ON' ? `<span class="ab on">AUTO ON — ENGINE CAN TRADE<span class="stop"><b>STOP AUTO</b><i>one click</i></span></span>`
  : o.auto==='PAUSED' ? `<span class="ab pa" title="Resume AUTO in the main window">AUTO PAUSED — ${o.reason}</span>`
  : o.auto==='BLOCKED' ? `<span class="ab bl">AUTO BLOCKED — ${o.reason}</span>`
  : `<span class="ab off">AUTO OFF — YOU TRADE</span>`;
 const chips = o.chips.map(c=>`<span class="sig s-${c[1]}${c[2]?' s-eng':''}" data-short="${c[0].replace(/ strong (up|down)/,'')}">${c[0]}</span>`).join('');
 const lim = o.limit==='SOFT'?'<span class="lt s">SOFT LIMIT</span>':o.limit==='HARD'?'<span class="lt h">HARD LIMIT</span>':'';
 const al = o.alert;
 const acls = al[3]==='crit'?'al2 crit':al[3]==='att'?'al2 att':'al2';
 const atag = al[3]==='crit'?'<span class="atag" style="background:#A8262B;color:#fff">CRITICAL</span>':al[3]==='att'?'<span class="atag" style="background:#6B4A16;color:#FFE2B0">ATTENTION</span>':`<span class="atag">${al[0]}</span>`;
 return `<header class="tb" data-chips='${JSON.stringify(o.chips)}' data-more="${o.more}">
<button class="back" style="flex-shrink:0"><span style="font-size:16px;line-height:1">←</span><b>MAIN WINDOW</b><kbd>F2</kbd></button>
<span class="wname">${o.name}</span><span class="${o.env==='LIVE'?'envL':'envP'}">${o.env==='LIVE'?'LIVE — REAL MONEY':'PAPER'}</span>${auto}
<span class="clk"><small>${o.clockL}</small><span>${o.clock}</span></span>
<div style="flex-grow:1;min-width:4px"></div>
<span class="lalab" style="display:flex;flex-direction:column;align-items:flex-end;line-height:1.15;flex-shrink:0"><span class="lab">LIVE ALERTS</span><span style="font-size:9.5px;color:#6E7A8A" class="nw">click = trade card</span></span>
<span class="chips">${chips}<span class="more"${o.more?'':' style="display:none"'}>+${o.more} more</span></span>
<span class="pl"><span class="lab">DAY P&amp;L</span><span class="mono nw ${o.neg?'rd':'g'}" style="font-size:12.5px">${o.pl}</span></span>${lim}
<span class="hl ${o.hc}"><span style="width:8px;height:8px;border-radius:4px;background:${dotc[o.hc]}"></span>${o.health}</span>
<span class="wm">Windows ▾</span>
<button class="flat"><b>FLATTEN ALL</b><span>hold 1 s</span></button>
</header>
<div class="${acls}">${atag}<span class="mono mu" style="font-size:10.5px">${al[1]}</span><span class="ell so" style="font-size:11px">${al[2]}</span><div style="flex-grow:1"></div><span class="bl nw" style="font-size:10.5px">Today's alerts (${o.alerts}) ▸</span></div>`;
};
// Fit rule: (1) the window name shrinks (CSS ellipsis, down to ~60 px); (2) chip text shortens to arrow + ticker;
// (3) the "LIVE ALERTS" label hides; (4) chips drop from the end into "+N more". FLATTEN ALL is never pushed out.
window.fitBar = function(h){
 const chips=[...h.querySelectorAll('.chips .sig')]; const more=h.querySelector('.more');
 let n=parseInt(h.dataset.more||'0'); const steps=[];
 const wn=h.querySelector('.wname');
 const over=()=>h.scrollWidth>h.clientWidth+0.5 || (wn.scrollWidth>wn.clientWidth+1 && wn.clientWidth<=62);
 if(over()){ chips.forEach(c=>c.textContent=c.dataset.short); steps.push('chip text shortened'); }
 if(over()){ h.querySelector('.lalab').style.display='none'; steps.push('label hidden'); }
 while(over() && chips.length){ chips.pop().remove(); n++; more.style.display=''; more.textContent='+'+n+' more'; }
 h.dataset.steps=steps.join(' · ');
 const f=h.querySelector('.flat').getBoundingClientRect(); const hr=h.getBoundingClientRect();
 return {steps:h.dataset.steps, fits:h.scrollWidth<=h.clientWidth+0.5, flatRightGap:Math.round(hr.right-f.right), chipsShown:h.querySelectorAll('.chips .sig').length, more:n, nameTrunc:h.querySelector('.wname').scrollWidth>h.querySelector('.wname').clientWidth+1};
};
})();
