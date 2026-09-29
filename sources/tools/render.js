// Render a drawing_source page to PNG at 1536x864, 2x (same as the final mockups).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const [src, query, out] = process.argv.slice(2);
(async () => {
  const dir = path.dirname(path.resolve(src));
  const common = fs.readFileSync(path.join(dir, 'common.css.txt'), 'utf8');
  let html = fs.readFileSync(src, 'utf8').replace('/*COMMON*/', common);
  const tmp = path.join(dir, '__render_tmp.html'); fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 864 }, deviceScaleFactor: 2 });
  await page.goto('file://' + tmp + (query || ''), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const el = await page.$('#win') || await page.$('.win');
  const box = await el.boundingBox();
  // overflow check: any element whose content overflows horizontally/vertically inside the window
  const over = await page.evaluate(() => { const w = document.querySelector('.win'); const out = [];
    w.querySelectorAll('*').forEach(e => { if (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflow !== 'visible' && !e.classList.contains('ell')) out.push(e.className + ' ' + e.scrollWidth + '>' + e.clientWidth); });
    return { w: w.scrollWidth, h: w.scrollHeight, out: out.slice(0, 10) }; });
  console.log('box', JSON.stringify(box), 'scroll', JSON.stringify(over));
  await el.screenshot({ path: out });
  await browser.close(); fs.unlinkSync(tmp);
})();
