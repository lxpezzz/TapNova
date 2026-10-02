const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const out = '.tmp/family-review';
const base = 'http://127.0.0.1:4337';
const key = 'tapnova.request.v1';
const routes = ['posavasos','portacuentas','expositores','portamenus','tarjetas-qr','pegatinas-qr'];
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml'};
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + new URL(req.url,base).pathname);
  if (!file.startsWith(root + path.sep) && file !== root) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(4337,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const errors = [], report = [];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      page.on('pageerror',err=>errors.push(err.message));
      const outbound=[];
      page.on('request',req=>{if(!req.url().startsWith(base))outbound.push(req.url());});
      await page.goto(base+'/productos',{waitUntil:'networkidle'});
      assert.equal(await page.locator('.catalog-product').count(),6);
      assert.equal(await page.locator('dialog').count(),0);
      assert.deepEqual(await page.locator('.catalog-product__view').evaluateAll(els=>els.map(el=>el.getAttribute('href'))),routes.map(slug=>'/productos/'+slug));
      assert.equal(await page.locator('.catalog-product__name').filter({hasText:'Tarjetas NFC'}).count(),0);
      await page.locator('[data-filter="impresos"]').click();
      assert.equal(await page.locator('.catalog-product:visible').count(),2);
      await page.locator('[data-filter="all"]').click();
      if ([1440,390].includes(width)) await page.screenshot({path:`${out}/catalog-${width}.png`,fullPage:true});
      for (const slug of routes) {
        const response=await page.goto(base+'/productos/'+slug,{waitUntil:'networkidle'});
        assert.equal(response.status(),200);
        assert.equal(await page.locator('h1').count(),1);
        const section=page.locator('.order-selection');
        const button=section.locator('[type="submit"]');
        await button.click();
        const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key) || '{"items":[]}').items.length,key);
        if (['posavasos','portacuentas','expositores'].includes(slug)) {
          assert.equal(await section.locator('[name="model"]').count(),2);
          await section.locator('[name="model"]').first().check();
        } else assert.equal(await section.locator('[name="model"]').count(),0);
        const quantity=section.locator('[name="quantity"]');
        if (await quantity.evaluate(el=>el.tagName)==='SELECT') await quantity.selectOption({index:1});
        else {
          await quantity.fill('0');
          assert.equal(await quantity.evaluate(el=>el.validity.valid),false);
          await quantity.fill('3');
        }
        await section.locator('[name="qrDestination"]').selectOption('menu');
        await section.locator('[name="observations"]').fill('Logo del restaurante.');
        if (slug==='posavasos') assert.equal(await section.locator('[data-summary="total"]').textContent(),'119,79 €');
        if (slug==='tarjetas-qr') assert.equal(await section.locator('[data-summary="total"]').textContent(),'30,25 €');
        if (slug==='pegatinas-qr') assert.equal(await section.locator('[data-summary="total"]').textContent(),'Consultar');
        await section.locator('[name="observations"]').focus();
        await page.keyboard.press('Tab');
        assert.equal(await button.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
        await page.keyboard.press('Enter');
        assert.equal(await section.locator('[role="status"]').textContent(),'Añadido a tu solicitud');
        const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
        assert.equal(saved.items.length,before+1);
        assert.equal(saved.items.at(-1).quantity,['posavasos','tarjetas-qr'].includes(slug)?250:3);
        assert.equal(saved.items.at(-1).modelId,['posavasos'].includes(slug)?'minimalista':['portacuentas','expositores'].includes(slug)?'estandar':null);
        assert.deepEqual(saved.items.at(-1).options,slug==='expositores'?{'descuento-porcentaje':'10'}:{});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${slug}: overflow at ${width}`);
        assert.equal(await page.locator('img').evaluateAll(els=>els.every(el=>el.complete && el.naturalWidth>0)),true);
        if ([1440,390].includes(width)) {
          await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
          await page.screenshot({path:`${out}/${slug}-${width}.png`,fullPage:true});
          const clip=await section.boundingBox();
          await page.screenshot({path:`${out}/${slug}-selection-${width}.png`,fullPage:true,clip});
        }
        await page.locator('.family-closing__button').click();
        assert.ok(Math.abs(await section.evaluate(el=>el.getBoundingClientRect().top)-128)<5);
        if (slug==='tarjetas-qr') {
          await quantity.selectOption({index:2});
          assert.equal(await section.locator('[role="status"]').textContent(),'');
          assert.equal(await section.locator('[data-summary="net"]').textContent(),'22,50 €');
          assert.equal(await section.locator('[data-summary="total"]').textContent(),'27,23 €');
        }
        if (['portacuentas','portamenus'].includes(slug)) {
          await quantity.fill('5');
          assert.equal(await section.locator('[data-summary="quantity"]').textContent(),'5 unidades');
          await quantity.fill('6');
          assert.equal(await section.locator('[data-summary="quantity"]').textContent(),'6 unidades + 1 de regalo');
          assert.equal(await section.locator('[data-summary="total"]').textContent(),slug==='portacuentas'?'254,10 €':'326,70 €');
          await button.click();
          const giftRequest=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).items.at(-1),key);
          assert.equal(giftRequest.quantity,6);
          assert.deepEqual(giftRequest.options,{'unidades-de-regalo':'1'});
          await page.evaluate(key=>{
            const request=JSON.parse(localStorage.getItem(key));request.items.pop();localStorage.setItem(key,JSON.stringify(request));
          },key);
        }
        if (slug==='expositores') {
          await quantity.fill('4');
          assert.equal(await section.locator('[data-summary="total"]').textContent(),'152,46 €');
          await section.locator('[name="model"][value="premium"]').check();
          assert.equal(await section.locator('[data-summary="total"]').textContent(),'196,02 €');
        }
        report.push({width,slug,quantity:saved.items.at(-1).quantity,estimate:saved.items.at(-1).estimate});
      }
      await page.reload({waitUntil:'networkidle'});
      assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).items.length,key),6);
      assert.deepEqual(outbound,[]);
      await page.close();
    }
    assert.deepEqual(errors,[]);
    const nojs=await browser.newPage({javaScriptEnabled:false});
    await nojs.goto(base+'/productos');
    assert.equal(await nojs.locator('.catalog-product__view:visible').count(),6);
    await nojs.goto(base+'/productos/tarjetas-qr');
    assert.equal(await nojs.locator('.order-selection [type="submit"]').isDisabled(),true);
    await nojs.close();
    fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));
    console.log('PASS: six catalogue links, filters, six product pages at seven widths, keyboard, valid quantities, consistent shared persistence, QR destinations, totals, CTA anchors, no overflow, no outbound requests, no-JS fallback.');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(err=>{console.error(err);process.exitCode=1;});
