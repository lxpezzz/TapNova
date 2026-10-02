const fs = require('node:fs');
const ts = require('typescript');
const assert = require('node:assert/strict');
const crypto = require('node:crypto').webcrypto;
function compile(file,dependency) {
  const javascript = ts.transpile(fs.readFileSync(file,'utf8'),{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022});
  const exports = {};
  new Function('exports','require','crypto',javascript)(exports,()=>dependency,crypto);
  return exports;
}
const options = compile('src/data/order-options.ts');
const {estimateQuantityOffer,addRequestSelection,readRequest,REQUEST_STORAGE_KEY} = compile('src/lib/order-request.ts',options);
const {unitQuantityOffer} = compile('src/lib/order-request.ts',options);
const {productUnitPricing,tarjetasQrQuantityOffers} = options;
for (const [slug,modelId,quantity,netCents,vatCents,totalCents,gift] of [
  ['portacuentas','estandar',5,17500,3675,21175,0],
  ['portacuentas','estandar',6,21000,4410,25410,1],
  ['portacuentas','premium',6,27000,5670,32670,1],
  ['expositores','estandar',2,7000,1470,8470,0],
  ['expositores','estandar',3,9450,1985,11435,0],
  ['expositores','estandar',4,12600,2646,15246,0],
  ['expositores','premium',3,12150,2552,14702,0],
  ['portamenus','principal',5,22500,4725,27225,0],
  ['portamenus','principal',6,27000,5670,32670,1],
  ['portamenus','principal',12,54000,11340,65340,1],
]) {
  const offer=unitQuantityOffer(productUnitPricing[slug],modelId,quantity);
  const result=estimateQuantityOffer(offer);
  assert.deepEqual([result.netCents,result.vatCents,result.totalCents],[netCents,vatCents,totalCents]);
  assert.equal(offer.giftQuantity,gift);
}
const card500=estimateQuantityOffer(tarjetasQrQuantityOffers.find(offer=>offer.quantity===500));
assert.deepEqual([card500.netCents,card500.vatCents,card500.totalCents],[2250,473,2723]);
assert.equal(unitQuantityOffer(productUnitPricing.expositores,'estandar',0),undefined);
assert.equal(unitQuantityOffer(productUnitPricing.expositores,'estandar',1.5),undefined);
const editedPricing={...productUnitPricing.portacuentas,prices:{estandar:{kind:'fixed',amount:40,vat:'excluded'}}};
assert.equal(estimateQuantityOffer(unitQuantityOffer(editedPricing,'estandar',6)).netCents,24000);
const expectedOffers = {
  'minimalista-250': [9900,2079,11979],
  'minimalista-500': [8910,1871,10781],
  'premium-250': [12500,2625,15125],
  'premium-500': [11250,2363,13613],
};
for (const confirmedOffer of options.posavasosQuantityOffers) {
  const estimate = estimateQuantityOffer(confirmedOffer);
  assert.equal(estimate.kind,'estimated');
  assert.deepEqual([estimate.netCents,estimate.vatCents,estimate.totalCents],expectedOffers[confirmedOffer.id]);
}
// Synthetic calculator fixtures only; not commercial product offers.
const offer = {id:'test',modelId:'test',quantity:10,price:{kind:'fixed',amount:99,vat:'excluded'},vatRate:21};
assert.deepEqual(estimateQuantityOffer(offer),{kind:'estimated',currency:'EUR',netCents:9900,vatRate:21,vatCents:2079,totalCents:11979});
assert.deepEqual(estimateQuantityOffer({...offer,price:{kind:'fixed',amount:119.79,vat:'included'}}),estimateQuantityOffer(offer));
for (const unknown of [undefined,{...offer,vatRate:undefined},{...offer,price:{kind:'from',amount:99,vat:'excluded'}},{...offer,quantity:0},{...offer,price:{kind:'fixed',amount:Infinity,vat:'excluded'}},{...offer,vatRate:-1}]) {
  assert.equal(estimateQuantityOffer(unknown).kind,'quote');
}
const store = new Map();
const storage = {getItem:key=>store.get(key) ?? null,setItem:(key,value)=>store.set(key,value)};
const selection = {productId:'posavasos-personalizados',modelId:'minimalista',quantity:null,qrDestination:'menu',observations:'  Mi logo  ',estimate:{kind:'quote',currency:'EUR'}};
assert.deepEqual(readRequest(storage),[]);
const saved = addRequestSelection(selection,storage);
assert.equal(saved.observations,'Mi logo');
addRequestSelection(selection,storage);
assert.equal(readRequest(storage).length,1);
assert.equal(readRequest(storage)[0].id,saved.id);
addRequestSelection({...selection,productId:'portacuentas-qr-nfc'},storage);
assert.equal(readRequest(storage).length,2);
const previous = storage.getItem(REQUEST_STORAGE_KEY);
assert.throws(()=>addRequestSelection({...selection,quantity:-1},storage));
assert.throws(()=>addRequestSelection({...selection,qrDestination:'bad'},storage));
assert.throws(()=>addRequestSelection({...selection,observations:'x'.repeat(1001)},storage));
assert.throws(()=>addRequestSelection({...selection,estimate:estimateQuantityOffer(offer)},storage));
assert.equal(storage.getItem(REQUEST_STORAGE_KEY),previous);
storage.setItem(REQUEST_STORAGE_KEY,'{"version":2,"items":[]}');
assert.throws(()=>addRequestSelection(selection,storage));
assert.equal(storage.getItem(REQUEST_STORAGE_KEY),'{"version":2,"items":[]}');
assert.throws(()=>addRequestSelection(selection,{getItem:()=>null,setItem:()=>{throw new Error('Quota exceeded');}}));
console.log('PASS: quote/estimated calculation, VAT and rounding, persistence, deduplication, other product preservation, invalid selection rejection, unknown schema preservation, storage failure.');
