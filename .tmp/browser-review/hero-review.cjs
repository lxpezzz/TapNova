const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  try {
    const report = [];
    for (const [width, height] of [[1440,900],[1280,800],[1024,768],[768,1024],[430,932],[390,844],[375,812]]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
      await page.evaluate(() => { const toolbar = document.querySelector('astro-dev-toolbar'); if (toolbar) toolbar.style.display = 'none'; });
      const metrics = await page.evaluate(() => {
        const hero = document.querySelector('main > section');
        const img = hero.querySelector('picture img');
        const style = getComputedStyle(img);
        const heroRect = hero.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        return {
          hero: { x: heroRect.x, y: heroRect.y + scrollY, width: heroRect.width, height: heroRect.height },
          objectFit: style.objectFit, objectPosition: style.objectPosition,
          centerOffsetX: imgRect.x + imgRect.width / 2 - heroRect.x - heroRect.width / 2,
          centerOffsetY: imgRect.y + imgRect.height / 2 - heroRect.y - heroRect.height / 2,
          naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight
        };
      });
      if (metrics.objectFit !== 'cover' || metrics.objectPosition !== '50% 50%' || Math.abs(metrics.centerOffsetX) > 1 || Math.abs(metrics.centerOffsetY) > 1) throw Error(JSON.stringify(metrics));
      report.push({ width, viewportHeight: height, ...metrics });
      await page.screenshot({ path: `.tmp/browser-review/hero-${width}.png`, fullPage: true, clip: metrics.hero });
      await page.close();
    }
    fs.writeFileSync('.tmp/browser-review/hero-report.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
