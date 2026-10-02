const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.svg':'image/svg+xml'};
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + new URL(req.url,'http://localhost').pathname);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(4337,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true, executablePath:'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const errors = [];
  const report = [];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      page.on('pageerror',err => errors.push(err.message));
      const response = await page.goto('http://127.0.0.1:4337/productos',{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      assert.equal(await page.locator('.catalog-product').count(),7);
      assert.equal(await page.locator('.catalog-product__visual img').count(),3);
      assert.equal(await page.locator('.catalog-product__price').allTextContents().then(texts => texts.every(text => text === 'Consultar')),true);
      const metrics = await page.evaluate(() => ({overflow:document.documentElement.scrollWidth>innerWidth, headingCount:document.querySelectorAll('h1').length}));
      assert.equal(metrics.overflow,false);
      assert.equal(metrics.headingCount,1);
      // Load every lazy photograph before taking the complete catalogue screenshot.
      for (const image of await page.locator('.catalog-product__image').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
      }
      await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({path:`.tmp/catalog-review/catalog-${width}.png`,fullPage:true});
      for (const [filter,count] of [['mesa',4],['qr-nfc',6],['impresos',2],['all',7]]) {
        const button = page.locator(`[data-filter="${filter}"]`);
        await button.focus();
        await page.keyboard.press('Enter');
        assert.equal(await button.getAttribute('aria-pressed'),'true');
        assert.equal(await page.locator('.catalog-product:not([hidden])').count(),count);
        assert.equal(await page.locator('.product-catalog__count').textContent(),`${count} productos`);
      }
      for (const button of await page.locator('[data-product-dialog]').all()) {
        const id = await button.getAttribute('data-product-dialog');
        await button.click();
        const dialog = page.locator(`#${id}`);
        assert.equal(await dialog.getAttribute('open'),'');
        assert.equal(await dialog.evaluate(el => el.contains(document.activeElement)),true);
        assert.equal(await page.evaluate(() => document.body.style.overflow),'hidden');
        if (id === 'preview-posavasos-personalizados' && [1440,390].includes(width)) {
          await dialog.locator('img').evaluate(img => img.decode());
          await page.screenshot({path:`.tmp/catalog-review/preview-${width}.png`});
        }
        await page.keyboard.press('Escape');
        assert.equal(await dialog.getAttribute('open'),null);
        await page.waitForFunction(() => document.body.style.overflow === '');
        assert.equal(await page.evaluate(() => document.body.style.overflow),'');
        assert.equal(await button.evaluate(el => document.activeElement === el),true);
      }
      // Also exercise the visible close control and backdrop dismissal.
      const firstButton = page.locator('[data-product-dialog]').first();
      await firstButton.click();
      await page.locator('dialog[open] button').click();
      assert.equal(await page.locator('dialog[open]').count(),0);
      await page.waitForFunction(() => document.body.style.overflow === '');
      await firstButton.click();
      await page.mouse.click(1,1);
      assert.equal(await page.locator('dialog[open]').count(),0);
      await page.waitForFunction(() => document.body.style.overflow === '');
      report.push({width,...metrics,filters:'passed',previews:7});
      await page.close();
    }
    const noJs = await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
    await noJs.goto('http://127.0.0.1:4337/productos');
    assert.equal(await noJs.locator('.catalog-product:visible').count(),7);
    assert.equal(await noJs.locator('.product-catalog__filters').isVisible(),false);
    assert.equal(await noJs.locator('[data-product-dialog]:visible').count(),0);
    const home = await browser.newPage({viewport:{width:1440,height:900}});
    await home.goto('http://127.0.0.1:4337/');
    await home.screenshot({path:'.tmp/catalog-review/home-reference.png'});
    await home.locator('#productos').scrollIntoViewIfNeeded();
    for (const image of await home.locator('#productos img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
    }
    await home.locator('#productos').scrollIntoViewIfNeeded();
    await home.screenshot({path:'.tmp/catalog-review/home-products-reference.png'});
    assert.equal(errors.length,0,errors.join('\n'));
    fs.writeFileSync('.tmp/catalog-review/report.json',JSON.stringify(report,null,2));
    console.log('PASS: 7 screen sizes, 7 products, 3 photographs, 4 keyboard filters, 49 dialog checks, close/backdrop/Escape, focus return, no-JS catalogue, no overflow or browser errors.');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err=>{console.error(err);server.close();process.exitCode=1;});
