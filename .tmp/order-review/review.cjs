const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.svg':'image/svg+xml'};
const key = 'tapnova.request.v1';
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
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const errors=[];
  const report=[];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      page.on('pageerror',err=>errors.push(err.message));
      const outbound=[];
      page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:4337'))outbound.push(req.url());});
      await page.goto('http://127.0.0.1:4337/productos/posavasos',{waitUntil:'networkidle'});
      const section=page.locator('.order-selection');
      const submit=section.locator('[type="submit"]');
      assert.equal(await submit.isEnabled(),true);
      await submit.click();
      assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),null);
      await section.locator('[name="model"][value="minimalista"]').check();
      assert.equal(await section.locator('[name="quantity"]').isEnabled(),true);
      assert.deepEqual(await section.locator('[name="quantity"] option').allTextContents(),['Elige una cantidad','250 unidades','500 unidades · 10 % de descuento']);
      assert.equal(await section.locator('[data-summary="model"]').textContent(),'Minimalista');
      await submit.click();
      assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),null);
      await section.locator('[name="qrDestination"]').selectOption('menu');
      await section.locator('[name="quantity"]').selectOption('minimalista-250');
      await section.locator('[name="observations"]').fill('Quiero incluir el logo y adaptar los colores de mi restaurante.');
      assert.equal(await section.locator('[data-summary="net"]').textContent(),'99,00 €');
      assert.equal(await section.locator('[data-summary="vat"]').textContent(),'20,79 € (21 %)');
      assert.equal(await section.locator('[data-summary="total"]').textContent(),'119,79 €');
      await section.locator('[name="observations"]').focus();
      await page.keyboard.press('Tab');
      assert.equal(await submit.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
      await page.keyboard.press('Enter');
      assert.equal(await section.locator('[role="status"]').textContent(),'Añadido a tu solicitud');
      assert.equal(await submit.isDisabled(),true);
      let saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
      assert.equal(saved.version,1);
      assert.equal(saved.items.length,1);
      assert.equal(saved.items[0].modelId,'minimalista');
      assert.equal(saved.items[0].quantity,250);
      assert.equal(saved.items[0].qrDestination,'menu');
      assert.equal(saved.items[0].estimate.kind,'estimated');
      await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
      const clip=await section.boundingBox();
      await page.screenshot({path:`.tmp/order-review/selection-${width}.png`,fullPage:true,clip});
      await page.reload({waitUntil:'networkidle'});
      saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
      assert.equal(saved.items.length,1);
      await section.locator('[name="model"][value="minimalista"]').check();
      await section.locator('[name="quantity"]').selectOption('minimalista-250');
      await section.locator('[name="qrDestination"]').selectOption('menu');
      await section.locator('[name="observations"]').fill('Quiero incluir el logo y adaptar los colores de mi restaurante.');
      await submit.click();
      assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).items.length,key),1);
      await section.locator('[name="model"][value="premium"]').check();
      assert.equal(await section.locator('[name="quantity"]').inputValue(),'');
      await section.locator('[name="quantity"]').selectOption('premium-500');
      assert.equal(await section.locator('[data-summary="net"]').textContent(),'112,50 €');
      assert.equal(await section.locator('[data-summary="vat"]').textContent(),'23,63 € (21 %)');
      assert.equal(await section.locator('[data-summary="total"]').textContent(),'136,13 €');
      await section.locator('[name="qrDestination"]').selectOption('other');
      assert.equal(await section.locator('[role="status"]').textContent(),'');
      await submit.click();
      assert.equal(await section.locator('[role="status"]').textContent(),'Añadido a tu solicitud');
      assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).items.length,key),2);
      await section.locator('[name="model"][value="minimalista"]').check();
      await section.locator('[name="quantity"]').selectOption('minimalista-500');
      assert.equal(await section.locator('[data-summary="net"]').textContent(),'89,10 €');
      assert.equal(await section.locator('[data-summary="vat"]').textContent(),'18,71 € (21 %)');
      assert.equal(await section.locator('[data-summary="total"]').textContent(),'107,81 €');
      await page.locator('.family-closing__button').click();
      const target=await section.boundingBox();
      assert.ok(target.y>=100 && target.y<200,`Anchor obscured at ${width}: ${target.y}`);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.equal(outbound.length,0,outbound.join('\n'));
      report.push({width,persistence:true,keyboard:true,estimatedPrice:'passed',outboundRequests:0});
      await page.close();
    }
    for (const mode of ['blocked','corrupt']) {
      const page=await browser.newPage({viewport:{width:390,height:844}});
      await page.goto('http://127.0.0.1:4337/productos/posavasos');
      if(mode==='blocked') await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Storage blocked','QuotaExceededError');};});
      else await page.evaluate(key=>localStorage.setItem(key,'not valid JSON'),key);
      await page.locator('[name="model"][value="premium"]').check();
      await page.locator('[name="quantity"]').selectOption('premium-250');
      await page.locator('[name="qrDestination"]').selectOption('instagram');
      await page.locator('.order-selection__submit').click();
      assert.equal(await page.locator('.order-selection__error').isVisible(),true);
      assert.equal(await page.locator('.order-selection__status').textContent(),'');
      assert.equal(await page.locator('.order-selection__submit').isEnabled(),true);
      if(mode==='corrupt')assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),'not valid JSON');
      await page.close();
    }
    const noJs=await browser.newPage({javaScriptEnabled:false});
    await noJs.goto('http://127.0.0.1:4337/productos/posavasos');
    assert.equal(await noJs.locator('.order-selection__submit').isDisabled(),true);
    assert.equal(await noJs.locator('.order-selection noscript').isVisible(),true);
    for (const route of ['/','/productos','/seo-local','/paginas-web','/preguntas-frecuentes']) {
      await noJs.goto('http://127.0.0.1:4337'+route);
      assert.equal(await noJs.locator('.order-selection').count(),0);
    }
    assert.equal(errors.length,0,errors.join('\n'));
    fs.writeFileSync('.tmp/order-review/report.json',JSON.stringify(report,null,2));
    console.log('PASS: 7 widths, keyboard, native validation, reload persistence, duplicates avoided, multiple selections, quote prices, failed/corrupt storage without false confirmation, local CTA anchor, no external requests, no-JS fallback, other pages unchanged.');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(err=>{console.error(err);server.close();process.exitCode=1;});
