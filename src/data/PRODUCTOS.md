# Editar los productos de TapNova

Las tarifas, cantidades, IVA y promociones se editan en `order-options.ts`.
El catálogo, las páginas de producto y los configuradores reutilizan esos datos.

- `posavasosModelPrices`: precio del lote por modelo.
- `posavasosDiscount500`: descuento sobre el precio base para 500 posavasos.
- `portacuentasModelPrices`: precio por unidad de cada modelo.
- `expositoresModelPrices`: precio por unidad de cada modelo.
- `portamenusPrice`: precio por unidad.
- `tarjetasQrPrice`: precio del lote de 250 tarjetas.
- `tarjetasQrDiscount500`: descuento sobre ese precio base para 500 tarjetas.
- `pegatinasQrPrice`: actualmente `Consultar`, sin tarifa confirmada.
- `orderVatRate`: porcentaje de IVA.
- `productUnitPricing`: condiciones de descuento y unidades de regalo.

En las promociones, `minimumQuantity` cuenta unidades compradas, sin incluir
las unidades de regalo. Comprar 6 portacuentas o portamenús añade 1 de regalo;
se pagan 6 y se reciben 7. No se aplica un regalo adicional por cada grupo de 6.

Los precios usan esta estructura:

```ts
{ kind: 'fixed', amount: 35, vat: 'excluded' }
```

Si falta la tarifa, usa `{ kind: 'quote' }`. No conviertas una tarifa por lote
en precio por unidad: las cantidades de posavasos y tarjetas tienen sus
ofertas propias. El descuento de 500 unidades sigue la regla comercial
confirmada: precio base menos el 10 %, sin multiplicarlo por dos.

Los nombres, descripciones e imágenes generales están en `products.ts`.
Los textos y fotografías por modelo de las nuevas páginas están en
`catalog-families.ts`; los de posavasos siguen en `product-families.ts`.
No asignes la misma foto general a modelos distintos como si fueran fotos propias.

Las selecciones existentes se guardan como estimaciones en el navegador.
Cambiar una tarifa actualiza los cálculos de las nuevas selecciones; no
reescribe automáticamente las selecciones que el cliente ya había guardado.
# Tu solicitud y envío

`/tu-solicitud` reúne los productos guardados en este navegador. La edición abre el configurador del producto y actualiza la misma selección, sin añadir una copia.

`/tu-solicitud/enviar` utiliza el mismo Web3Forms que la HOME. Configura `PUBLIC_WEB3FORMS_ACCESS_KEY` en `.env` local y en el entorno del despliegue. Reinicia el servidor o reconstruye la web tras cambiar esta variable. La clave de acceso pública de Web3Forms se incluye en el formulario, igual que en la HOME; no uses una clave privada de otro servicio.

Sin esa configuración, el formulario informa de que el envío no está disponible y conserva la selección. Solo muestra confirmación cuando Web3Forms responde con éxito. Los errores conservan productos y datos para volver a intentarlo. El envío confirmado también conserva la selección hasta que el usuario la vacíe.
