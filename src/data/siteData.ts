export interface ProductSlide {
  id: string;
  num: string;
  name: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export const HERO_PRODUCTS: ProductSlide[] = [
  {
    id: 'portacuentas',
    num: '01',
    name: 'Portacuentas QR + NFC',
    title: 'Donde termina el servicio, empieza la reseña.',
    description: 'El comensal sostiene el portacuentas. Un toque con su móvil o un escaneo abre directamente tu ficha en Google.',
    ctaText: 'Ver portacuentas',
    ctaHref: '#portacuentas',
    image: '/src/assets/products/portacuentas.webp'
  },
  {
    id: 'expositor',
    num: '02',
    name: 'Expositor QR / NFC',
    title: 'Presencia sobria en barra y recepción.',
    description: 'Madera de nogal y placa vertical de aluminio mate. Comunica la carta o el acceso a reseñas con elegancia.',
    ctaText: 'Ver expositores',
    ctaHref: '#expositores',
    image: '/src/assets/products/expositor.webp'
  },
  {
    id: 'tarjeta-nfc',
    num: '03',
    name: 'Tarjeta NFC',
    title: 'Un toque en el móvil de tu cliente.',
    description: 'Cuerpo metálico mate con bisel mecanizado. Para que el equipo de sala ofrezca una vía instantánea de puntuar la visita.',
    ctaText: 'Ver tarjetas NFC',
    ctaHref: '#tarjetas-nfc',
    image: '/src/assets/products/tarjeta-nfc.webp'
  },
  {
    id: 'pegatina',
    num: '04',
    name: 'Pegatina Vinilo Mate',
    title: 'Tu reputación visible desde la entrada.',
    description: 'Vinilo mate resistente a intemperie y productos de limpieza. Diseñado para cristales, escaparates y zonas de cobro rápido.',
    ctaText: 'Ver pegatinas',
    ctaHref: '#pegatinas',
    image: '/src/assets/products/pegatina.webp'
  },
  {
    id: 'tarjeta-qr',
    num: '05',
    name: 'Tarjeta QR Aluminio',
    title: 'Aluminio anodizado que no se desgasta.',
    description: 'Óptica grabada sobre metal negro. Soporta el lavado diario y el contacto continuo sin perder legibilidad.',
    ctaText: 'Ver tarjetas QR',
    ctaHref: '#tarjetas-qr',
    image: '/src/assets/products/tarjeta-qr.webp'
  }
];

export const EXPLAINER_STEPS = [
  {
    step: '01',
    title: 'La reseña aparece cuando más sentido tiene.',
    description: 'Integramos QR y NFC en los momentos clave del servicio para que dejar una reseña resulte natural, rápido y sencillo.',
  },
  {
    step: '02',
    title: 'Acercar. Escanear. Listo.',
    description: 'El cliente acerca el móvil o escanea el QR y accede directamente. Sin apps, sin registros y sin pasos innecesarios.',
  },
  {
    step: '03',
    title: 'Conseguir reseñas es solo el principio.',
    description: 'TapNova conecta la captación de reseñas con SEO local: optimización de tu perfil de Google, respuesta a reseñas y seguimiento de tu visibilidad en la zona.',
  }
];

export const HOW_IT_WORKS = [
  {
    number: '01',
    title: 'Elección del soporte',
    description: 'Analizamos el flujo de tu local para elegir el formato adecuado: portacuentas en mesa, expositores en barra o tarjetas para el equipo.'
  },
  {
    number: '02',
    title: 'Personalización y grabado láser',
    description: 'Grabamos tu logotipo y tipografía sobre materiales nobles que encajan con la vajilla y el interiorismo de tu espacio.'
  },
  {
    number: '03',
    title: 'Enlace directo verificado',
    description: 'Vinculamos el chip NFC y el código QR directamente al enlace oficial de tu perfil de Google Reviews.'
  },
  {
    number: '04',
    title: 'Listo para el servicio',
    description: 'Recibes los elementos listos y testeados. Tu personal los utiliza con total naturalidad en el pase de cuenta.'
  }
];

export const SITE_METADATA = {
  title: 'TapNova — Dispositivos Físicos y SEO Local para Hostelería',
  description: 'Portacuentas inteligentes con QR y NFC, expositores de diseño y posicionamiento en Google Maps para restaurantes, bares y locales de ocio.',
  url: 'https://tapnova.es',
  email: 'hola@tapnova.es',
  phone: '+34 910 000 000',
  brand: 'TapNova'
};
