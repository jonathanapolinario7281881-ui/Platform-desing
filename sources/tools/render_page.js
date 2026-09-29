// Render a full-page drawing (no .win frame) at 1536 wide, 2x, full height.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [src, out] = process.argv.slice(2);
(async () => {
  const dir = path.dirname(path.resolve(src));
  let html = fs.readFileSync(src, 'utf8');
  if (html.includes('/*COMMON*/')) html = html.replace('/*COMMON*/', fs.readFileSync(path.join(dir, 'common.css.txt'), 'utf8'));
  const tmp = path.join(dir, '__render_tmp.html'); fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 864 }, deviceScaleFactor: 2 });
  await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(400);
  const el = await page.$('.win');
  if (el) await el.screenshot({ path: out }); else await page.screenshot({ path: out, fullPage: true });
  await browser.close(); fs.unlinkSync(tmp);
})();
