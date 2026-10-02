const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  const widths = [1440, 1280, 1024, 768, 430, 390, 375];
  const report = [];
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    await page.evaluate(() => { const toolbar = document.querySelector('astro-dev-toolbar'); if (toolbar) toolbar.style.display = 'none'; window.scrollTo(0, 0); });
    const metrics = await page.evaluate(() => {
      const selectors = ['.ecosystem-intro', '.ecosystem-intro__pain-stage', '.ecosystem-intro__solution', '.ecosystem-intro__title', '#productos'];
      const blocks = Object.fromEntries(selectors.map(selector => {
        const el = document.querySelector(selector);
        const rect = el.getBoundingClientRect();
        return [selector, { top: rect.top + scrollY, height: rect.height, width: rect.width }];
      }));
      const overflow = [...document.querySelectorAll('.ecosystem-intro *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.left < -1 || r.right > innerWidth + 1;
      }).map(el => el.className);
      return { blocks, overflow, pageOverflow: document.documentElement.scrollWidth > innerWidth };
    });
    report.push({ width, ...metrics });
    await page.screenshot({ path: `.tmp/browser-review/section-${width}.png`, fullPage: true, clip: { x: 0, y: metrics.blocks['.ecosystem-intro'].top, width, height: metrics.blocks['.ecosystem-intro'].height } });
    const transitionTop = metrics.blocks['.ecosystem-intro__solution'].top;
    await page.screenshot({ path: `.tmp/browser-review/transition-${width}.png`, fullPage: true, clip: { x: 0, y: transitionTop - 80, width, height: 600 } });
    await page.close();
  }
  fs.writeFileSync('.tmp/browser-review/report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });



