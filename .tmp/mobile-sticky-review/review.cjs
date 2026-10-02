const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve('dist');
const base = 'http://127.0.0.1:4339';
const routes = ['/','/productos','/productos/posavasos','/productos/portacuentas','/productos/expositores','/productos/portamenus','/productos/tarjetas-qr','/productos/pegatinas-qr','/paginas-web','/seo-local','/preguntas-frecuentes','/quienes-somos','/tu-solicitud','/tu-solicitud/enviar'];
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + new URL(req.url,base).pathname);
  if (!file.startsWith(root + path.sep) && file !== root) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.setHeader('Content-Type',{'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml'}[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve=>server.listen(4339,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,executablePath:'C:/Users/PC-user/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const errors=[];
  try {
    for (const width of [1440,1280,1024,768,430,390,375]) {
      const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'});
      page.on('pageerror',error=>errors.push(error.message));
      for(const route of routes) {
        assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
        const mobile=width<1280;
        assert.equal(await page.locator('.mobile-sticky-cta').isVisible(),mobile);
        assert.equal(await page.locator('#site-header a[href="tel:621200800"]').isVisible(),mobile);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width} ${route} overflow`);
        if(mobile) {
          assert.equal(await page.locator('.mobile-sticky-cta > .mobile-sticky-cta__access').count(),4);
          const expected=route==='/'?'/':route.startsWith('/productos')?'/productos':route==='/preguntas-frecuentes'?route:null;
          const current=page.locator('.mobile-sticky-cta > a[aria-current="page"]');
          assert.equal(await current.count(),expected?1:0);
          if(expected)assert.equal(await current.getAttribute('href'),expected);
          assert.equal(await page.locator('.mobile-sticky-cta__services').getAttribute('data-active'),String(['/paginas-web','/seo-local'].includes(route)));
          const bar=await page.locator('.mobile-sticky-cta').boundingBox();
          assert.equal(Math.round(bar.y+bar.height),850);
          assert.equal(Math.round(bar.height),68);
          await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
          const footer=await page.locator('footer').boundingBox();
          assert.ok(footer.y+footer.height<=bar.y+1,'footer not hidden behind nav');
        } else {
          assert.equal(await page.evaluate(()=>getComputedStyle(document.body).paddingBottom),'0px');
          const bounds=await page.locator('nav[aria-label="Navegación principal"]').boundingBox();
          assert.ok(Math.abs(bounds.x+bounds.width/2-width/2)<1,'desktop header stays centered');
        }
      }
      if(width<1280) {
        await page.goto(base+'/seo-local',{waitUntil:'networkidle'});
        const summary=page.locator('.mobile-sticky-cta summary');
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('.mobile-sticky-cta__selector').isVisible(),true);
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Páginas web →');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.mobile-sticky-cta__selector').isVisible(),false);
        assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
        await summary.click();
        await page.locator('h1').click();
        assert.equal(await page.locator('.mobile-sticky-cta__selector').isVisible(),false);
        await summary.click();
        await page.locator('.mobile-sticky-cta__selector a').first().click();
        await page.waitForURL(base+'/paginas-web');
        assert.equal(await page.locator('.mobile-sticky-cta a[href="https://wa.me/34621200800"]').getAttribute('target'),'_blank');
        await summary.click();
        if([390,430].includes(width))await page.screenshot({path:`.tmp/mobile-sticky-review/services-${width}.png`});
        await page.locator('#header-mobile-toggle').click();
        assert.equal(await page.locator('.mobile-sticky-cta').isVisible(),true,'nav visible with drawer');
        await page.locator('.product-navigation--mobile summary').click();
        if(width===390)await page.screenshot({path:'.tmp/mobile-sticky-review/drawer-390.png'});
        await page.locator('#header-drawer-close').focus();
        await page.keyboard.press('Shift+Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('href')),'https://wa.me/34621200800');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.id),'header-drawer-close');
        await page.keyboard.press('Escape');
        await page.locator('.mobile-sticky-cta a[href="/productos"]').click();
        await page.waitForURL(base+'/productos');
        if(width===375)await page.screenshot({path:'.tmp/mobile-sticky-review/products-375.png'});
      }
      await page.close();
      console.log(`PASS ${width}px: all 14 pages, header, active states, spacing and keyboard`);
    }
    const noJS=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:850}});
    await noJS.goto(base+'/');
    await noJS.locator('.mobile-sticky-cta summary').click();
    assert.equal(await noJS.locator('.mobile-sticky-cta__selector a:visible').count(),2);
    await noJS.close();
    assert.deepEqual(errors,[]);
    console.log('PASS native services selector without JavaScript; no browser errors; no calls or WhatsApp messages made');
  } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;server.close();});
