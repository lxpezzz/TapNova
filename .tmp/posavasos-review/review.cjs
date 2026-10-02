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
      const response = await page.goto('http://127.0.0.1:4337/productos/posavasos',{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      assert.equal(await page.locator('main > section').count(),6);
      assert.equal(await page.locator('h1').textContent(),'Posavasos personalizados');
      assert.equal(await page.locator('.family-hero__price').textContent(),'Desde 99 € + IVA');
      assert.deepEqual(await page.locator('.family-model h3').allTextContents(),['Minimalista','Premium']);
      assert.equal(await page.locator('.family-model').last().locator('.family-model__price').textContent(),'Consultar');
      assert.deepEqual(await page.locator('.family-uses__list li').allTextContents(),['Reseñas','Carta','Reservas','Instagram','Promociones','Contacto']);
      assert.equal(await page.locator('.family-closing__button').getAttribute('href'),'/#contacto');
      assert.equal(await page.locator('.family-closing__button').textContent(),'Quiero estos posavasos→');
      assert.equal(await page.locator('main form, main input, main select').count(),0);
      assert.equal(await page.locator('.family-gallery figure').count(),2);
      const ids = await page.locator('[id]').evaluateAll(els => els.map(el=>el.id));
      assert.equal(ids.length,new Set(ids).size);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth>innerWidth);
      assert.equal(overflow,false,`Overflow at ${width}`);
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(img => img.decode());
        assert.equal(await image.getAttribute('alt').then(alt => !!alt),true);
      }
      await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({path:`.tmp/posavasos-review/family-${width}.png`,fullPage:true});
      const cta = page.locator('.family-closing__button');
      await cta.focus();
      const focusOutline = await cta.evaluate(el=>getComputedStyle(el).outlineStyle);
      assert.equal(focusOutline,'solid');
      await page.keyboard.press('Enter');
      await page.waitForURL('**/#contacto');
      assert.equal(await page.locator('#contacto').count(),1);
      report.push({width,overflow,sections:6,models:2,cta:'passed'});
      await page.close();
    }
    const noJs = await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
    await noJs.goto('http://127.0.0.1:4337/productos/posavasos');
    assert.equal(await noJs.locator('main > section').count(),6);
    await noJs.locator('.family-hero__back').click();
    await noJs.waitForURL('**/productos');
    assert.equal(await noJs.locator('.catalog-product__price').allTextContents().then(texts => texts.every(text => text === 'Consultar')),true);
    assert.equal(errors.length,0,errors.join('\n'));
    fs.writeFileSync('.tmp/posavasos-review/report.json',JSON.stringify(report,null,2));
    console.log('PASS: 7 widths, 6 sections, 2 models, 6 uses, 3 existing images, accessible CTA to existing contact, no-JS navigation, unchanged catalogue prices, no overflow or browser errors.');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err=>{console.error(err);server.close();process.exitCode=1;});
