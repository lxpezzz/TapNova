const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const phase = process.argv[2] || 'before';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  try {
    const report = [];
    for (const width of [1920,1536,1440,1366,1280,1279,1024,768,430,390,375]) {
      const page = await browser.newPage({ viewport: { width, height:900 }, reducedMotion:'reduce' });
      await page.goto('http://localhost:4321/preguntas-frecuentes', { waitUntil:'networkidle' });
      const metrics = await page.locator('#site-header').evaluate(header => {
        const rect = el => { const r=el.getBoundingClientRect(); return {x:r.x,width:r.width,right:r.right,height:r.height}; };
        const [logo,nav,actions] = header.children;
        const navRect = rect(nav);
        return {header:rect(header), logo:rect(logo), nav:navRect, actions:rect(actions), grid:getComputedStyle(header).gridTemplateColumns, gap:getComputedStyle(nav).gap, desktop:getComputedStyle(nav).display !== 'none', centerOffset:navRect.x+navRect.width/2-innerWidth/2, overflow:document.documentElement.scrollWidth>innerWidth};
      });
      report.push({width,...metrics});
      if (phase === 'after') {
        const previous = JSON.parse(fs.readFileSync('.tmp/header-review/before.json')).find(item=>item.width===width);
        assert.equal(metrics.header.height,previous.header.height,'Header height changed');
        assert.equal(metrics.overflow,false);
        if (metrics.desktop) {
          assert.ok(Math.abs(metrics.centerOffset)<1,`Not centered at ${width}: ${metrics.centerOffset}`);
          assert.ok(metrics.logo.right<=metrics.nav.x,`Logo overlap at ${width}`);
          assert.ok(metrics.nav.right<=metrics.actions.x,`Actions overlap at ${width}`);
        } else {
          assert.deepEqual(metrics,((({width,...rest})=>rest)(previous)),'Mobile layout changed');
        }
      }
      if ([1440,1280,390].includes(width)) await page.locator('#site-header').screenshot({path:`.tmp/header-review/${phase}-${width}.png`});
      await page.close();
    }
    fs.writeFileSync(`.tmp/header-review/${phase}.json`,JSON.stringify(report,null,2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
