const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const base = 'http://127.0.0.1:4338';
const key = 'tapnova.request.v1';
const slugs = ['posavasos','portacuentas','expositores','portamenus','tarjetas-qr','pegatinas-qr'];
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + new URL(req.url,base).pathname);
  if (!file.startsWith(root + path.sep) && file !== root) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.setHeader('Content-Type', {'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(4338,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const errors = [];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      page.on('pageerror', error => errors.push(error.message));
      for (const route of ['/productos',...slugs.map(slug=>'/productos/'+slug),'/tu-solicitud','/tu-solicitud/enviar']) {
        assert.equal((await page.goto(base+route)).status(),200);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true,`${width} ${route} overflow`);
      }
      if (width >= 1280) {
        const nav = page.locator('nav[aria-label="Navegación principal"]');
        const bounds = await nav.boundingBox();
        assert.ok(Math.abs(bounds.x+bounds.width/2-width/2) < 1,'centered desktop nav');
        const actions = await page.locator('#site-header > div').last().boundingBox();
        assert.ok(bounds.x+bounds.width <= actions.x,`desktop nav collision at ${width}: ${JSON.stringify({bounds,actions})}`);
        await page.locator('.product-navigation__trigger').hover();
        assert.equal(await page.locator('#desktop-products a:visible').count(),7);
        await page.locator('#desktop-products a').last().hover();
        assert.equal(await page.locator('#desktop-products a:visible').count(),7);
        await page.locator('.product-navigation__trigger').focus();
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Todos los productos');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#desktop-products').isVisible(),false);
      } else {
        await page.locator('#header-mobile-toggle').click();
        await page.locator('.product-navigation--mobile summary').click();
        assert.equal(await page.locator('.product-navigation--mobile a:visible').count(),7);
        await page.locator('.product-navigation--mobile a').last().click();
        assert.ok(page.url().endsWith('/productos/pegatinas-qr'));
      }
      for (const slug of slugs) {
        await page.goto(base+'/productos/'+slug);
        const radios = page.locator('input[name="model"]');
        if (await radios.count()) await radios.first().check();
        const qty = page.locator('[name="quantity"]');
        if (await qty.evaluate(el=>el.tagName==='SELECT')) await qty.selectOption({index:1});
        else await qty.fill(slug==='expositores'?'3':'6');
        await page.locator('[name="qrDestination"]').selectOption('menu');
        await page.locator('[name="observations"]').fill('Logo y colores del restaurante');
        await page.locator('.order-selection__submit').click();
        assert.match(await page.locator('.order-selection__status').textContent(),/Añadido a tu solicitud/);
      }
      assert.equal(await page.locator('.request-access__count').textContent(),'6');
      await page.locator('.request-access').click();
      await page.waitForURL(base+'/tu-solicitud');
      await page.locator('.order-request__item').first().waitFor();
      assert.equal(await page.locator('.order-request__item').count(),6);
      assert.equal(await page.locator('.order-request__quote').isVisible(),true);
      if ([1440,390].includes(width)) await page.screenshot({path:`.tmp/request-review/request-${width}.png`,fullPage:true});
      await page.locator('.order-request__item-actions a').first().click();
      await page.waitForFunction(()=>document.querySelector('[name="observations"]')?.value === 'Logo y colores del restaurante');
      assert.equal(await page.locator('[name="observations"]').inputValue(),'Logo y colores del restaurante');
      await page.locator('[name="model"][value="premium"]').check();
      await page.locator('[name="quantity"]').selectOption('premium-500');
      await page.locator('[name="qrDestination"]').selectOption('reservations');
      await page.locator('.order-selection__submit').click();
      assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).items.length,key),6);
      await page.goto(base+'/tu-solicitud');
      assert.match(await page.locator('.order-request__item').first().textContent(),/Premium/);
      assert.match(await page.locator('.order-request__item').first().textContent(),/500/);
      await page.locator('a[href="/tu-solicitud/enviar"]').click();
      await page.waitForURL(base+'/tu-solicitud/enviar');
      assert.ok(page.url().endsWith('/tu-solicitud/enviar'));
      assert.equal(await page.locator('.order-request__form button').isDisabled(),true,'unconfigured provider disabled');
      if ([1440,390].includes(width)) await page.screenshot({path:`.tmp/request-review/form-${width}.png`,fullPage:true});
      // Test transport states with intercepted requests, no real email sent.
      await page.evaluate(()=>{
        const form=document.querySelector('.order-request__form');
        form.dataset.canSend='true';
        form.querySelector('[name="access_key"]').value='test-only';
        window.dispatchEvent(new Event('tapnova:request-change'));
      });
      await page.locator('[name="name"]').fill('Prueba');
      await page.locator('[name="company"]').fill('Restaurante de prueba');
      await page.locator('[name="email"]').fill('prueba@example.com');
      await page.locator('[name="phone"]').fill('600000000');
      let attempts=0;
      await page.route('https://api.web3forms.com/submit',async route=>{
        attempts++;
        assert.match(route.request().postData(),/Posavasos personalizados/);
        assert.match(route.request().postData(),/Pegatinas QR/);
        await route.fulfill({status:attempts===1?500:200,contentType:'application/json',body:JSON.stringify({success:attempts!==1})});
      });
      await page.locator('.order-request__form button').click();
      await page.waitForFunction(()=>!document.querySelector('.order-request__error').hidden);
      assert.equal(await page.locator('[name="name"]').inputValue(),'Prueba');
      assert.equal(await page.locator('.order-request__form button').isDisabled(),false);
      await page.locator('.order-request__form button').click();
      await page.waitForFunction(()=>document.querySelector('.order-request__status').textContent.startsWith('Solicitud enviada'));
      assert.equal(attempts,2);
      await page.goto(base+'/tu-solicitud');
      assert.equal(await page.locator('.order-request__item').count(),6);
      await page.locator('.order-request__item-actions button').last().click();
      assert.equal(await page.locator('.order-request__item').count(),5);
      await page.locator('[data-clear]').click();
      await page.locator('[data-cancel-clear]').click();
      assert.equal(await page.locator('.order-request__item').count(),5);
      await page.locator('[data-clear]').click();
      await page.locator('[data-confirm-clear]').click();
      assert.equal(await page.locator('.order-request__empty').isVisible(),true);
      assert.equal(await page.locator('.request-access__count').textContent(),'0');
      await page.evaluate(key=>localStorage.setItem(key,'corrupt'),key);
      await page.reload();
      assert.equal(await page.locator('.order-request__error').isVisible(),true);
      assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),'corrupt');
      await page.close();
      console.log(`PASS ${width}px routes, navigation, six products, edit, form states, delete, clear, storage`);
    }
    assert.deepEqual(errors,[]);
    console.log('PASS no browser errors; no real messages sent');
  } finally { await browser.close(); server.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;server.close();});
