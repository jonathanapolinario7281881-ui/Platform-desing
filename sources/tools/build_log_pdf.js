// Builds the decision-log PDF from its Markdown (HTML printed by Chromium, Letter, page X of Y footer).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const [htmlIn, pdfOut] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + require('path').resolve(htmlIn), { waitUntil: 'networkidle' });
  await page.pdf({ path: pdfOut, format: 'Letter', printBackground: true,
    margin: { top: '0.6in', bottom: '0.7in', left: '0.75in', right: '0.75in' },
    displayHeaderFooter: true, headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;text-align:center;font-family:Arial,Liberation Sans,sans-serif;font-size:7.5px;color:#555">File 9 v4 — Decision log · page <span class="pageNumber"></span> of <span class="totalPages"></span></div>' });
  await browser.close();
})();
