const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!fs.existsSync(target)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(4337, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' });
  const report = [];
  const errors = [];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      for (const route of ['/', '/seo-local', '/paginas-web', '/preguntas-frecuentes']) {
        const page = await browser.newPage({ viewport: { width, height: width < 640 ? 844 : 900 }, reducedMotion: 'reduce' });
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto('http://127.0.0.1:4337' + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        const full = route === '/preguntas-frecuentes';
        assert.equal(await page.locator('.faq-accordion__item').count(), full ? 49 : 3);
        const summary = page.locator('.faq-accordion__question').first();
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('.faq-accordion__item').first().getAttribute('open'), '');
        assert.equal(await page.locator('.faq-accordion__answer').first().isVisible(), true);
        await page.keyboard.press('Space');
        assert.equal(await page.locator('.faq-accordion__item').first().getAttribute('open'), null);
        const metrics = await page.evaluate(() => {
          const nav = document.querySelector('nav[aria-label="Navegación principal"]');
          const header = document.querySelector('#site-header');
          const children = [...header.children].map(el => { const r = el.getBoundingClientRect(); return { left:r.left, right:r.right, visible:getComputedStyle(el).display !== 'none' }; });
          const overlap = children[1].visible && (children[0].right > children[1].left + 1 || children[1].right > children[2].left + 1);
          return { overflow: document.documentElement.scrollWidth > innerWidth, headerOverlap: overlap, desktopNav: getComputedStyle(nav).display !== 'none' };
        });
        assert.equal(metrics.overflow, false, JSON.stringify({ width, route, ...metrics }));
        assert.equal(metrics.headerOverlap, false, JSON.stringify({ width, route, ...metrics }));
        if (!full) {
          assert.equal(await page.locator('.mini-faq__link').getAttribute('href'), '/preguntas-frecuentes');
          await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0,0); });
          const section = await page.locator('.mini-faq').boundingBox();
          await page.screenshot({ path: `.tmp/faq-review/mini-${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true, clip: section });
        } else {
          assert.equal(await page.locator('.faq-category').count(), 9);
          const ids = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
          assert.equal(new Set(ids).size, ids.length);
          await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0,0); });
          await page.screenshot({ path: `.tmp/faq-review/full-${width}.png`, fullPage: true, clip: { x:0, y:0, width, height: width < 640 ? 1500 : 1400 } });
          await page.locator('.faq-directory__links a[href="#faq-seo-local"]').click();
          const target = await page.locator('#faq-seo-local-heading').boundingBox();
          assert.ok(target.y >= 100 && target.y < 200, `Anchor obscured: ${target.y}`);
        }
        if (width === 1440 || width === 390) {
          await page.evaluate(() => scrollTo(0,0));
          await page.locator('#site-header').screenshot({ path: `.tmp/faq-review/header-${width}.png` });
        }
        report.push({ width, route, ...metrics });
        await page.close();
      }
    }
    const mobile = await browser.newPage({ viewport: { width:375, height:667 }, reducedMotion:'reduce' });
    await mobile.goto('http://127.0.0.1:4337');
    await mobile.locator('#header-mobile-toggle').click();
    assert.equal(await mobile.locator('#header-mobile-toggle').getAttribute('aria-expanded'), 'true');
    const faqLink = mobile.locator('#header-mobile-drawer a[href="/preguntas-frecuentes"]');
    assert.equal(await faqLink.isVisible(), true);
    await mobile.waitForFunction(() => getComputedStyle(document.querySelector('#header-mobile-drawer')).opacity === '1');
    await mobile.screenshot({ path: '.tmp/faq-review/menu-mobile.png' });
    await mobile.keyboard.press('Escape');
    assert.equal(await mobile.locator('#header-mobile-toggle').getAttribute('aria-expanded'), 'false');
    await mobile.locator('#header-mobile-toggle').click();
    await faqLink.click();
    await mobile.waitForURL('**/preguntas-frecuentes');
    assert.equal(await mobile.locator('h1').textContent().then(s => s.trim().replace(/\s+/g,' ')), 'Todo lo que necesitas saber sobre TapNova.');
    const noJs = await browser.newPage({ javaScriptEnabled:false });
    await noJs.goto('http://127.0.0.1:4337/preguntas-frecuentes');
    await noJs.locator('summary').first().click();
    assert.equal(await noJs.locator('details').first().getAttribute('open'), '');
    assert.equal(errors.length, 0, errors.join('\n'));
    fs.writeFileSync('.tmp/faq-review/report.json', JSON.stringify(report,null,2));
    console.log(`PASS: ${report.length} layouts; keyboard; mobile navigation; category anchors; no JavaScript; 49 FAQs; no overflow or header overlap.`);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); server.close(); process.exitCode=1; });
