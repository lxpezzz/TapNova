import { products } from './products';
import type { ProductFamily } from './product-families';
import { portacuentasModelPrices, expositoresModelPrices, portamenusPrice, tarjetasQrPrice } from './order-options';

const uses = ['Reseñas', 'Carta', 'Reservas', 'Instagram', 'Promociones', 'Contacto'];

function productFor(slug: string) {
  const product = products.find((entry) => entry.slug === slug);
  if (!product) throw new Error(`Faltan los datos del producto: ${slug}`);
  return product;
}

const personalization = [
  {
    title: 'La identidad de tu local.',
    text: 'Cuéntanos qué logo, colores y diseño quieres utilizar. Las posibilidades de personalización y los acabados se concretan antes de confirmar el pedido.',
  },
  {
    title: 'Un destino para cada contacto.',
    text: 'Elige el enlace de tu carta, reseñas, reservas, redes o contacto. Si necesitas varios destinos, indícalo en las observaciones para concretarlo en la propuesta.',
  },
  {
    title: 'Las condiciones, contigo.',
    text: 'La cantidad, las opciones y el diseño final se revisan contigo. Guardar una selección en tu solicitud no confirma un pedido.',
  },
];

export const catalogFamilies: ProductFamily[] = [
  {
    product: productFor('portacuentas'),
    price: productFor('portacuentas').price,
    introduction: 'El momento de la cuenta, convertido en un punto de contacto con tu negocio. QR y NFC para facilitar el siguiente gesto del cliente.',
    modelsIntroduction: 'Estándar o Premium. Concretamos contigo las diferencias de diseño, personalización y acabado antes del pedido.',
    models: [
      {
        id: 'estandar', name: 'Estándar', price: portacuentasModelPrices.estandar,
        description: 'Una opción para presentar la cuenta y facilitar el acceso al enlace de tu local. El diseño y las opciones se concretan en la propuesta.',
      },
      {
        id: 'premium', name: 'Premium', price: portacuentasModelPrices.premium,
        description: 'La alternativa Premium de portacuentas. Revisamos contigo sus opciones de personalización y las diferencias respecto al modelo Estándar.',
      },
    ],
    uses,
    customization: [
      ...personalization.slice(0, 2),
      { title: 'QR + NFC.', text: 'El cliente puede escanear el QR o acercar un móvil compatible con NFC. El destino y la configuración se concretan para tu negocio.' },
      personalization[2],
    ],
    galleryTitle: 'El último gesto de la mesa.',
    galleryIntroduction: 'Una referencia de portacuentas en contexto. Las fotografías de cada modelo están pendientes de incorporar.',
    gallery: [],
    selection: { heading: 'Prepara tus portacuentas.', description: 'Elige el modelo y cuéntanos cuántos necesitas para tu local.', destinationLabel: 'Destino QR/NFC' },
    closing: { title: 'Que la cuenta abra otra oportunidad.', text: 'Prepara tu selección y concreta la personalización para tu negocio.', button: 'Quiero estos portacuentas', href: '#configurar-portacuentas' },
  },
  {
    product: productFor('expositores'),
    price: productFor('expositores').price,
    introduction: 'Un punto de contacto visible en mesa, barra o recepción. QR y NFC para llevar al cliente a la información de tu local.',
    modelsIntroduction: 'Dos modelos con QR y NFC. Concretamos contigo sus diferencias de diseño y las opciones de personalización.',
    models: [
      { id: 'estandar', name: 'Estándar', price: expositoresModelPrices.estandar, description: 'Un acceso visible al enlace de tu local mediante QR y NFC. Las opciones de diseño y acabado se concretan antes del pedido.' },
      { id: 'premium', name: 'Premium', price: expositoresModelPrices.premium, description: 'La alternativa Premium del expositor. Revisamos contigo la personalización y las diferencias de acabado respecto al Estándar.' },
    ],
    uses,
    customization: [
      ...personalization.slice(0, 2),
      { title: 'Escanear o acercar el móvil.', text: 'El QR y el NFC permiten acceder al enlace elegido. La lectura NFC requiere un móvil compatible; las opciones de cada modelo se concretan en la propuesta.' },
      personalization[2],
    ],
    galleryTitle: 'Visible donde importa.',
    galleryIntroduction: 'Una referencia del expositor en un restaurante. Los ejemplos de cada modelo se añadirán cuando estén identificados.',
    gallery: [],
    selection: { heading: 'Prepara tus expositores.', description: 'Indica la cantidad que necesitas y qué quieres facilitar a tus clientes.', destinationLabel: 'Destino QR/NFC' },
    closing: { title: 'Pon tu siguiente conexión a la vista.', text: 'Guarda lo que necesitas y concretamos el modelo, el diseño y el presupuesto.', button: 'Quiero estos expositores', href: '#configurar-expositores' },
  },
  {
    product: productFor('portamenus'),
    price: productFor('portamenus').price,
    introduction: 'La presentación de tu carta también habla de tu local. Portamenús personalizados para acompañar la experiencia en la mesa.',
    modelsIntroduction: 'Un portamenús personalizado para tu negocio. El formato y los acabados se concretan según tu carta.',
    models: [{ id: 'principal', name: 'Personalizado', price: portamenusPrice, description: 'La presentación de tu carta con la identidad de tu local. Concretamos contigo formato, diseño y acabados.' }], singleOption: true,
    uses,
    customization: [
      personalization[0],
      { title: 'Pensado para tu carta.', text: 'Indica cómo presentas tu carta y qué necesitas. El formato, el acabado y las opciones disponibles se concretan según el proyecto.' },
      { title: 'Un acceso desde la mesa.', text: 'Si quieres incluir un QR para abrir tu carta u otro enlace, indícalo en la selección. La integración se confirma según el modelo; no se presupone NFC.' },
      personalization[2],
    ],
    galleryTitle: 'Tu carta, con tu identidad.',
    galleryIntroduction: 'Las fotografías y ejemplos reales de portamenús se incorporarán cuando estén disponibles.',
    gallery: [],
    selection: { heading: 'Prepara tus portamenús.', description: 'Cuéntanos la cantidad y cómo quieres presentar tu carta.', destinationLabel: 'Destino QR solicitado' },
    closing: { title: 'La carta empieza antes de leerla.', text: 'Guarda tu selección y cuéntanos qué necesita tu mesa.', button: 'Quiero estos portamenús', href: '#configurar-portamenus' },
  },
  {
    product: productFor('tarjetas-qr'),
    price: productFor('tarjetas-qr').price,
    introduction: 'Una tarjeta con el QR de tu negocio para que el cliente encuentre tu carta, redes o contacto al escanearla.',
    modelsIntroduction: 'Una opción principal, personalizada para tu negocio.',
    models: [{ id: 'principal', name: 'Tarjetas QR', price: tarjetasQrPrice, description: 'Tarjetas con el QR de tu negocio. Una única opción, personalizada para tu local.' }], singleOption: true,
    uses,
    customization: [personalization[0], personalization[1], personalization[2]],
    galleryTitle: 'Una tarjeta. Un nuevo contacto.',
    galleryIntroduction: 'La fotografía de producto y los ejemplos de tarjetas QR están pendientes de incorporar.',
    gallery: [],
    selection: { heading: 'Prepara tus tarjetas QR.', description: 'Indica cuántas necesitas y a dónde quieres llevar a tus clientes.', destinationLabel: 'Destino del QR' },
    closing: { title: 'Lleva tu local al siguiente gesto.', text: 'Elige el destino y guarda la cantidad que necesitas. Concretamos el diseño y el precio contigo.', button: 'Quiero estas tarjetas', href: '#configurar-tarjetas-qr' },
  },
  {
    product: productFor('pegatinas-qr'),
    price: productFor('pegatinas-qr').price,
    introduction: 'Un QR en el punto de tu local que elijas, para abrir la información que tus clientes necesitan en ese momento.',
    modelsIntroduction: 'Una opción principal, personalizada para tu negocio.',
    models: [], singleOption: true,
    uses,
    customization: [
      personalization[0],
      { title: 'En el lugar adecuado.', text: 'Mesa, barra, recepción o escaparate pueden ser puntos de contacto. Cuéntanos la superficie y las condiciones de uso para confirmar la colocación adecuada; no se presupone resistencia al exterior.' },
      personalization[1], personalization[2],
    ],
    galleryTitle: 'El contacto, donde lo necesitas.',
    galleryIntroduction: 'La fotografía de producto y los ejemplos de colocación están pendientes de incorporar.',
    gallery: [],
    selection: { heading: 'Prepara tus pegatinas QR.', description: 'Indica la cantidad y dónde te gustaría colocarlas.', destinationLabel: 'Destino del QR' },
    closing: { title: 'Un punto de tu local. Una oportunidad.', text: 'Guarda tu selección y cuéntanos el uso que tienes en mente. Concretamos las opciones y el precio contigo.', button: 'Quiero estas pegatinas', href: '#configurar-pegatinas-qr' },
  },
];
