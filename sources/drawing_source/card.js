// Pop-up trade card (v4, extra pages 7h) — the same card as the main window strip card.
(function(){
const css = `
.tcard{position:absolute;width:470px;background:#121925;border:1px solid #5AA2FF;border-radius:10px;box-shadow:0 14px 44px rgba(0,0,0,.65),0 0 0 1px rgba(90,162,255,.15);overflow:hidden;color:var(--text);font-family:'IBM Plex Sans',sans-serif;z-index:5}
.tch{display:flex;align-items:center;gap:7px;padding:7px 9px;background:#18212E;border-bottom:1px solid var(--line);cursor:move}
.tch.live{background:#1D4E8F;border-bottom-color:#5AA2FF}
.tch .lbl{font-size:10px;font-weight:700;letter-spacing:.09em;color:var(--muted);white-space:nowrap}
.tch.live .lbl{color:#fff;font-size:11px}
.tkb{font-size:17px;font-weight:700;padding:1px 7px;border-radius:5px;letter-spacing:.02em}
.tkb.up{background:#16784A;border:1px solid #34C77B;color:#fff}.tkb.dn{background:#A8262B;border:1px solid #F0555A;color:#fff}.tkb.no{border:1px solid transparent}
.tch .x{width:24px;height:24px;border-radius:5px;border:1px solid #2E3A4A;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--soft)}
.tcb{padding:8px 10px 9px;display:flex;flex-direction:column;gap:6px}
.pr{display:flex;align-items:baseline;gap:8px;white-space:nowrap}
.pr .p{font-family:'IBM Plex Mono',monospace;font-size:19px;font-weight:600}
.mini{display:inline-flex;align-items:center;height:18px;padding:0 5px;border-radius:4px;border:1px solid #2E3A4A;font-size:10px;font-weight:700;letter-spacing:.04em;white-space:nowrap}
.ln{font-size:11.5px;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stl{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;border:1px solid;font-size:11.5px;white-space:nowrap}
.stl .sb{margin-left:auto;height:22px;padding:0 9px;border-radius:5px;border:1px solid #3A4556;background:#1A212C;font-size:10.5px;font-weight:700;display:flex;align-items:center}
.szb{display:flex;align-items:center;gap:4px;font-size:10.5px}
.szb span.o{white-space:nowrap;height:22px;padding:0 7px;border-radius:4px;border:1px solid #2E3A4A;background:#161D28;display:flex;align-items:center;font-family:'IBM Plex Mono',monospace;font-size:10.5px}
.szb span.o.on{border-color:#5AA2FF;background:#24324A;color:#fff}
.bb4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.bb{height:44px;border-radius:7px;border:1px solid;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.1;font-size:12px;font-weight:700;white-space:nowrap;text-align:center}
.bb small{font-size:9.5px;font-weight:500;opacity:.9}
.b-buy{background:#16784A;border-color:#22A366;color:#fff}.b-sell{background:#A8262B;border-color:#D0454A;color:#fff}
.b-sh{background:#5B3A9E;border-color:#8B6AD8;color:#fff}.b-dis{background:#19202A;border-color:#2A3340;color:#7C8898}
.b-ovr{background:#1C1316;border-color:#7A3035;color:#F0A5A8}.b-lim{box-shadow:inset 0 0 0 2px #F2A93B}
.b-hold{background:#1C1316;border-color:#A8262B;color:#FFB3B5}
.mc text{font-family:'IBM Plex Sans',sans-serif;font-size:9.5px;font-weight:600}.mc text.m{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9px}
.tfoot{font-size:10px;color:var(--dim);line-height:1.35}
`;
const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
function rnd(seed){let x=seed;return()=>{x=(x*9301+49297)%233280;return x/233280;};}
window.miniChart = function(o){
 o=Object.assign({w:448,h:118,seed:11,from:1.62,to:2.15,jump:0.72,lines:[],marker:null,labels:['06:50','07:31','07:42']},o);
 const r=rnd(o.seed), n=46, pts=[]; let p=o.from;
 for(let i=0;i<n;i++){ const t=i/(n-1); const target=t<o.jump? o.from+(o.to-o.from)*0.18*t/o.jump : o.from+(o.to-o.from)*(0.18+0.82*((t-o.jump)/(1-o.jump))); const op=p; p=target+(r()-0.5)*(o.to-o.from)*0.05; pts.push([op,p,Math.max(op,p)+r()*(o.to-o.from)*0.03,Math.min(op,p)-r()*(o.to-o.from)*0.03,(t>o.jump?0.4+r()*0.6:0.1+r()*0.25)]); }
 const lo=Math.min(...pts.map(q=>q[3]),...o.lines.map(l=>l[0]))-0.02, hi=Math.max(...pts.map(q=>q[2]),...o.lines.map(l=>l[0]))+0.02;
 const W=o.w-44, H=o.h-26, y=v=>6+(hi-v)/(hi-lo)*(H-22), cw=W/n;
 let svg=`<svg class="mc" width="${o.w}" height="${o.h}" style="display:block;background:#0E141D;border-radius:6px"><g>`;
 pts.forEach((q,i)=>{ const x=4+i*cw+cw/2, up=q[1]>=q[0], c=up?'#2FA86A':'#D8484D';
  svg+=`<line x1="${x}" x2="${x}" y1="${y(q[2])}" y2="${y(q[3])}" stroke="${c}" stroke-width="1"/><rect x="${x-cw*0.32}" y="${Math.min(y(q[0]),y(q[1]))}" width="${cw*0.64}" height="${Math.max(1.2,Math.abs(y(q[0])-y(q[1])))}" fill="${c}"/>`;
  svg+=`<rect x="${x-cw*0.32}" y="${H-q[4]*16+4}" width="${cw*0.64}" height="${q[4]*16}" fill="${up?'#1E6B47':'#7A2A2E'}"/>`; });
 let vw='M'; let acc=0; pts.forEach((q,i)=>{acc+=q[1]; const v=o.from+(acc/(i+1)-o.from)*0.9; vw+=`${4+i*cw+cw/2},${y(v)} `;});
 svg+=`<path d="${vw}" fill="none" stroke="#B08CFF" stroke-width="1.3" opacity=".85"/>`;
 o.lines.forEach(l=>{ svg+=`<line x1="4" x2="${W+4}" y1="${y(l[0])}" y2="${y(l[0])}" stroke="${l[1]}" stroke-dasharray="${l[3]||'4 3'}" stroke-width="1.2"/><text x="8" y="${y(l[0])-3}" fill="${l[1]}">${l[2]}</text>`; });
 if(o.marker){ const i=o.marker[0], x=4+i*cw+cw/2; svg+=`<circle cx="${x}" cy="${y(o.marker[1])}" r="5" fill="none" stroke="#fff" stroke-width="1.6"/>`; }
 [hi-0.02,(hi+lo)/2,lo+0.02].forEach(v=>{ svg+=`<text x="${W+8}" y="${y(v)+3}" fill="#7D8899" class="m">${v.toFixed(2)}</text>`; });
 o.labels.forEach((t,i)=>{ svg+=`<text x="${4+i*(W-30)/(o.labels.length-1)}" y="${o.h-3}" fill="#7D8899" class="m">${t}</text>`; });
 return svg+`</g></svg>`;
};
})();
