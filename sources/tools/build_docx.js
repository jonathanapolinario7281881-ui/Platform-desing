// Builds the Master Word document from the Markdown specification (same content, same order).
const fs = require('fs');
const path = require('path');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, PageOrientation, ImageRun, Footer, PageNumber, LevelFormat, BorderStyle, TableLayoutType, LineRuleType } = D;

const SRC = process.argv[2], OUT = process.argv[3];
const md = fs.readFileSync(SRC, 'utf8');
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'docimg/meta.json'), 'utf8'));

const FONT = 'Arial';
const INK = '1F2937', HEAD = '17365D', MUTED = '5B6573';
const PORTRAIT_W = 9360;           // 8.5in - 2 x 1in, in DXA

// ---------- inline: **bold**, `code` ----------
function runs(text, base = {}) {
  const out = []; const re = /(\*\*[^*]+\*\*|`[^`]+`)/g; let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), ...base, bold: true }));
    else out.push(new TextRun({ text: t.slice(1, -1), ...base, font: 'Courier New' }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

// ---------- parse markdown into blocks ----------
const lines = md.split('\n'); const blocks = []; let i = 0;
while (i < lines.length) {
  const l = lines[i];
  if (!l.trim()) { i++; continue; }
  let m;
  if ((m = l.match(/^(#{1,4}) (.*)$/))) { blocks.push({ t: 'h', lvl: m[1].length, text: m[2] }); i++; continue; }
  if ((m = l.match(/^!\[(.*)\]\((.*)\)\s*$/))) { blocks.push({ t: 'img', cap: m[1], src: m[2] }); i++; continue; }
  if (l.startsWith('|')) {
    const rows = []; while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i++; }
    const cells = r => r.replace(/^\|/, '').replace(/\|\s*$/, '').split(' | ').map(c => c.trim().replace(/^\|\s*/, '').replace(/\s*\|$/, ''));
    const parsed = rows.filter(r => !/^\|\s*-/.test(r)).map(r => r.split('|').slice(1, -1).map(c => c.trim()));
    blocks.push({ t: 'table', rows: parsed }); continue;
  }
  if ((m = l.match(/^(\s*)- (.*)$/))) { blocks.push({ t: 'li', lvl: m[1].length >= 2 ? 1 : 0, text: m[2] }); i++; continue; }
  if ((m = l.match(/^(\d+)\. (.*)$/))) { blocks.push({ t: 'ol', n: m[1], text: m[2] }); i++; continue; }
  if ((m = l.match(/^\s{2,}(\S.*)$/))) { blocks.push({ t: 'indent', text: m[1] }); i++; continue; }
  // paragraph: join following plain lines
  let text = l; i++;
  while (i < lines.length && lines[i].trim() && !/^(#|!\[|\||\s*- |\d+\. |\s{2,})/.test(lines[i])) { text += ' ' + lines[i]; i++; }
  blocks.push({ t: 'p', text });
}

// ---------- builders ----------
const footer = () => ({ default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
  new TextRun({ text: 'File 9 v4 — Master Specification · page ', size: 16, color: '7A8494', font: FONT }),
  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '7A8494', font: FONT })] })] }) });

function heading(b, first) {
  const lv = { 1: HeadingLevel.HEADING_1, 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 }[b.lvl];
  return new Paragraph({ heading: lv, pageBreakBefore: b.lvl === 1 && !first, keepNext: true, children: runs(b.text) });
}
function para(text, opts = {}) { return new Paragraph({ spacing: { after: 100 }, ...opts, children: runs(text, opts.run || {}) }); }

function table(rows, width) {
  let header = rows[0]; let body = rows.slice(1);
  const emptyHeader = header.every(c => !c);
  if (emptyHeader) header = null;
  const all = header ? [header, ...body] : body;
  const n = Math.max(...all.map(r => r.length));
  // column widths from content length (sqrt to soften), min share
  const len = Array(n).fill(0);
  all.forEach(r => r.forEach((c, j) => { len[j] = Math.max(len[j], Math.min(c.length, 220)); }));
  const w0 = len.map(x => Math.max(Math.sqrt(x + 4), 3.2));
  const tot = w0.reduce((a, b) => a + b, 0);
  let widths = w0.map(x => Math.floor(width * x / tot)); widths[n - 1] += width - widths.reduce((a, b) => a + b, 0);
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'C9D1DB' };
  const borders = { top: border, bottom: border, left: border, right: border };
  const mk = (r, isHead) => new TableRow({ tableHeader: isHead, cantSplit: true, children: Array.from({ length: n }, (_, j) => new TableCell({
    width: { size: widths[j], type: WidthType.DXA }, borders,
    shading: isHead ? { type: ShadingType.CLEAR, color: 'auto', fill: 'DCE6F2' } : undefined,
    margins: { top: 50, bottom: 50, left: 90, right: 90 },
    children: [new Paragraph({ children: runs(r[j] || '', { size: 17, bold: isHead ? true : undefined }) })] })) });
  const trs = []; if (header) trs.push(mk(header, true)); body.forEach(r => trs.push(mk(r, false)));
  return new Table({ width: { size: width, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, rows: trs });
}

function figure(b) {
  const file = path.basename(b.src); const mm = meta[file];
  const imgPath = path.join(__dirname, mm.jpg);
  // landscape Letter, 0.5in margins: 10in x 7.5in usable; keep room for the caption
  const maxW = 960, maxH = 640;
  const s = Math.min(maxW / mm.w, maxH / mm.h);
  const w = Math.round(mm.w * s), h = Math.round(mm.h * s);
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80, line: 240, lineRule: LineRuleType.AUTO }, children: [new ImageRun({ type: 'jpg', data: fs.readFileSync(imgPath), transformation: { width: w, height: h }, altText: { title: file, description: b.cap, name: file } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: runs('Mockup ' + b.cap + '  ·  file: mockups/' + file, { size: 17, italics: true, color: MUTED }) }),
  ];
}

// ---------- assemble sections ----------
const sections = []; let cur = null; let firstH1 = true;
const portrait = () => ({ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1300, left: 1440, right: 1440 } } }, footers: footer(), children: [] });
const landscape = () => ({ properties: { page: { size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE }, margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, footers: footer(), children: [] });
cur = portrait(); sections.push(cur);
let isTitle = true;
for (let k = 0; k < blocks.length; k++) {
  const b = blocks[k];
  if (b.t === 'img') {
    if (cur.kind !== 'land') { cur = landscape(); cur.kind = 'land'; sections.push(cur); }
    else cur.children.push(new Paragraph({ pageBreakBefore: true, children: [] }));
    cur.children.push(...figure(b));
    continue;
  }
  if (cur.kind === 'land') { cur = portrait(); sections.push(cur); cur.startFresh = true; }
  if (b.t === 'h') {
    if (isTitle && b.lvl === 1) {
      cur.children.push(new Paragraph({ spacing: { before: 600, after: 240 }, children: [new TextRun({ text: b.text, bold: true, size: 44, color: HEAD, font: FONT })] }));
      isTitle = false; firstH1 = false; continue;
    }
    const first = firstH1 || cur.startFresh; cur.startFresh = false; firstH1 = false;
    cur.children.push(heading(b, first && b.lvl === 1 ? true : false));
    continue;
  }
  cur.startFresh = false;
  if (b.t === 'p') cur.children.push(para(b.text));
  else if (b.t === 'indent') cur.children.push(para(b.text, { indent: { left: 720 }, run: { italics: true } }));
  else if (b.t === 'li') cur.children.push(new Paragraph({ numbering: { reference: 'bul', level: b.lvl }, spacing: { after: 60 }, children: runs(b.text) }));
  else if (b.t === 'ol') cur.children.push(new Paragraph({ indent: { left: 540, hanging: 360 }, spacing: { after: 60 }, children: runs(b.n + '.\t' + b.text) , tabStops: [{ type: 'left', position: 540 }] }));
  else if (b.t === 'table') { cur.children.push(table(b.rows, PORTRAIT_W)); cur.children.push(new Paragraph({ spacing: { after: 80 }, children: [] })); }
}
// page break after the contents list (title page) — insert before the first real chapter heading handled by pageBreakBefore

const doc = new Document({
  creator: 'Jonathan', title: 'File 9 v4 — AI Trading Platform: Master Specification', description: 'Authoritative build specification',
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: INK }, paragraph: { spacing: { line: 276, lineRule: LineRuleType.AUTO } } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 34, bold: true, color: HEAD, font: FONT }, paragraph: { spacing: { before: 120, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, color: HEAD, font: FONT }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, color: '2B4C7E', font: FONT }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 20, bold: true, color: '2B4C7E', font: FONT }, paragraph: { spacing: { before: 160, after: 60 }, outlineLevel: 3 } },
    ],
  },
  numbering: { config: [{ reference: 'bul', levels: [
    { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } },
    { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 760, hanging: 260 } } } },
  ] }] },
  sections: sections.map(s => ({ properties: s.properties, footers: s.footers, children: s.children.length ? s.children : [new Paragraph('')] })),
});
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log('written', OUT, buf.length, 'bytes;', sections.length, 'sections;', blocks.length, 'blocks'); });
