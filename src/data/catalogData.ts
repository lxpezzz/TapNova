import portacuentasImg from '../assets/showcase/portacuentas-context.webp';
import portacuentasClosedImg from '../assets/products/portacuentas-closed.webp';
import portacuentasOpenImg from '../assets/products/portacuentas-open.webp';
import expositorImg from '../assets/showcase/expositor-context.webp';
import expositorStudioImg from '../assets/products/expositor.webp';
import tarjetasImg from '../assets/showcase/tarjetas-context.webp';
import tarjetaNfcImg from '../assets/products/tarjeta-nfc.webp';
import tarjetaQrImg from '../assets/products/tarjeta-qr.webp';
import pegatinasImg from '../assets/showcase/pegatinas-context.webp';
import pegatinaStudioImg from '../assets/products/pegatina.webp';

export interface ProductColorOption {
  id: string;
  name: string;
  hex: string;
  image?: ImageMetadata;
}

export interface CatalogCategory {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  zone: string;
}

export interface CatalogProduct {
  id: string;
  categoryId: string;
  name: string;
  shortName: string;
  subtitle: string;
  price: number;
  priceSuffix?: string;
  priceNote?: string;
  image: ImageMetadata;
  imageAlt: string;
  materials: string;
  tech: string;
  zone: string;
  highlightBadge?: string;
  volumeTiers?: { qty: string; price: string }[];
  tags: string[];
  colors: ProductColorOption[]; // Colores / acabados disponibles
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'portacuentas',
    name: 'Portacuentas Inteligentes',
    shortLabel: 'Portacuentas',
    description: 'Soportes para cobro y reseñas en mesa con chip NFC y grabado láser.',
    zone: 'Zona Mesa'
  },
  {
    id: 'portamenus',
    name: 'Portamenús & Cartas',
    shortLabel: 'Portamenús',
    description: 'Formatos para carta física o interactiva con acceso instantáneo por tap.',
    zone: 'Zona Mesa & Barra'
  },
  {
    id: 'expositores',
    name: 'Expositores de Barra & Caja',
    shortLabel: 'Expositores',
    description: 'Soportes verticales de sobremesa para cobro rápido y zonas de paso.',
    zone: 'Zona Barra & Caja'
  },
  {
    id: 'tarjetas',
    name: 'Tarjetas NFC de Personal',
    shortLabel: 'Tarjetas NFC',
    description: 'Tarjetas portátiles contactless para metres, camareros y personal de sala.',
    zone: 'Equipo de Sala'
  },
  {
    id: 'posavasos',
    name: 'Posavasos Inteligentes',
    shortLabel: 'Posavasos',
    description: 'Soportes estancos con chip NFC central para terrazas y coctelería.',
    zone: 'Terrazas & Mesas Altas'
  },
  {
    id: 'pegatinas',
    name: 'Pegatinas QR & Placas',
    shortLabel: 'Pegatinas QR',
    description: 'Adhesivos de resina epoxi con relieve para cristal, exterior y mesas.',
    zone: 'Exterior & Cristales'
  }
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // --- 1. PORTACUENTAS ---
  {
    id: 'portacuentas-titanio',
    categoryId: 'portacuentas',
    name: 'Portacuentas Piel & Placa Titanio',
    shortName: 'Portacuentas Titanio',
    subtitle: 'El buque insignia de sala con placa de titanio cepillado antihuellas.',
    price: 79,
    priceSuffix: '€ / ud',
    priceNote: 'desde 59 € por volumen',
    image: portacuentasImg,
    imageAlt: 'Portacuentas de piel negra y placa de titanio cepillado',
    materials: 'Piel hidrorepelente con costuras reforzadas y placa de aleación de titanio.',
    tech: 'NFC 13.56 MHz bajo el lomo + QR óptico grabado en titanio',
    zone: 'Zona 01 · La Mesa',
    highlightBadge: 'Más elegido',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '79 €/ud' },
      { qty: '10 - 19 uds', price: '69 €/ud (-13%)' },
      { qty: '20+ uds', price: '59 €/ud (-25%)' }
    ],
    tags: ['portacuentas', 'titanio', 'piel', 'mesa', 'cuenta', 'nfc', 'qr'],
    colors: [
      { id: 'negro-ebano', name: 'Negro Ébano', hex: '#1e1e24' },
      { id: 'cuero-habana', name: 'Cuero Habana', hex: '#8a4f28' },
      { id: 'gris-titanio', name: 'Gris Grafito', hex: '#505563' }
    ]
  },
  {
    id: 'portacuentas-clasico',
    categoryId: 'portacuentas',
    name: 'Portacuentas Piel Lisa Premium',
    shortName: 'Portacuentas Piel',
    subtitle: 'Diseño sobrio cerrado con grabado directo en bajo relieve.',
    price: 69,
    priceSuffix: '€ / ud',
    priceNote: 'desde 54 € por volumen',
    image: portacuentasClosedImg,
    imageAlt: 'Portacuentas de piel lisa cerrada TapNova',
    materials: 'Piel vegana hidrorepelente de tacto suave y acabado mate.',
    tech: 'Chip NFC de contacto directo + micro-QR interno',
    zone: 'Zona 01 · La Mesa',
    highlightBadge: 'Clásico de Sala',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '69 €/ud' },
      { qty: '10 - 19 uds', price: '59 €/ud' },
      { qty: '20+ uds', price: '54 €/ud' }
    ],
    tags: ['portacuentas', 'piel', 'cerrado', 'clasico', 'nfc', 'mesa'],
    colors: [
      { id: 'negro-mate', name: 'Negro Mate', hex: '#1e1e24' },
      { id: 'marron-cognac', name: 'Marrón Cognac', hex: '#9e5927' },
      { id: 'azul-marino', name: 'Azul Marino', hex: '#22385c' }
    ]
  },
  {
    id: 'portacuentas-abierto',
    categoryId: 'portacuentas',
    name: 'Portacuentas Formato Bandeja',
    shortName: 'Portacuentas Bandeja',
    subtitle: 'Apertura panorámica con clip para ticket y lectura frontal.',
    price: 74,
    priceSuffix: '€ / ud',
    priceNote: 'desde 57 € por volumen',
    image: portacuentasOpenImg,
    imageAlt: 'Portacuentas abierto con sujeción de ticket y chip NFC',
    materials: 'Estructura rígida forrada con piel hidrorepelente y herraje metálico.',
    tech: 'NFC central de lectura rápida + QR en cabecera',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '74 €/ud' },
      { qty: '10 - 19 uds', price: '64 €/ud' },
      { qty: '20+ uds', price: '57 €/ud' }
    ],
    tags: ['portacuentas', 'bandeja', 'abierto', 'ticket', 'mesa'],
    colors: [
      { id: 'negro-aluminio', name: 'Negro & Aluminio', hex: '#1e1e24' },
      { id: 'camel-laton', name: 'Camel & Dorado', hex: '#b5824c' }
    ]
  },

  // --- 2. PORTAMENÚS & CARTAS ---
  {
    id: 'portamenu-mesa',
    categoryId: 'portamenus',
    name: 'Portamenú de Mesa NFC + QR',
    shortName: 'Portamenú Mesa',
    subtitle: 'Soporte compacto para centro de mesa con acceso a carta y reseñas.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'desde 39 € por volumen',
    image: portacuentasClosedImg,
    imageAlt: 'Portamenú rígido con chip NFC y QR para mesas',
    materials: 'Cuerpo compuesto con recubrimiento hidrófugo y base pesada antivuelco.',
    tech: 'Doble chip NFC bidireccional + QR grabado de alto contraste',
    zone: 'Zona 01 · La Mesa',
    highlightBadge: 'Doble función',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '49 €/ud' },
      { qty: '10 - 24 uds', price: '44 €/ud' },
      { qty: '25+ uds', price: '39 €/ud' }
    ],
    tags: ['portamenus', 'carta', 'menu', 'mesa', 'nfc', 'qr'],
    colors: [
      { id: 'grafito', name: 'Grafito Mate', hex: '#3d404b' },
      { id: 'nogal-oscuro', name: 'Nogal Natural', hex: '#5c3d24' }
    ]
  },
  {
    id: 'portamenu-barra',
    categoryId: 'portamenus',
    name: 'Atril de Carta para Barra',
    shortName: 'Atril de Carta',
    subtitle: 'Exhibición vertical de carta y bebidas en formato atril.',
    price: 59,
    priceSuffix: '€ / ud',
    priceNote: 'precio unitario',
    image: expositorStudioImg,
    imageAlt: 'Atril portamenú de barra en madera noble',
    materials: 'Madera de nogal tratada con ranura de fijación y placa grabada.',
    tech: 'Antena NFC vertical + QR de acceso a carta interactiva',
    zone: 'Zona 02 · Barra & Caja',
    tags: ['portamenus', 'atril', 'barra', 'carta', 'nogal'],
    colors: [
      { id: 'nogal-natural', name: 'Nogal Natural', hex: '#5c3d24' },
      { id: 'roble-tostado', name: 'Roble Tostado', hex: '#7c5636' }
    ]
  },

  // --- 3. EXPOSITORES ---
  {
    id: 'expositor-nogal-pro',
    categoryId: 'expositores',
    name: 'Expositor de Nogal Macizo',
    shortName: 'Expositor Nogal',
    subtitle: 'Mecanizado artesanal en bloque de nogal noble con inclinación a 65°.',
    price: 69,
    priceSuffix: '€ / ud',
    priceNote: 'precio unitario',
    image: expositorImg,
    imageAlt: 'Expositor de nogal macizo con chip NFC y marcaje láser',
    materials: 'Bloque macizo de madera de nogal pulido a mano con aceite hidrófugo.',
    tech: 'Antena NFC de campo medio (lectura a 3-4 cm) + Marcaje láser indeleble',
    zone: 'Zona 02 · Barra, Recepción & Caja',
    highlightBadge: 'Madera Noble',
    tags: ['expositor', 'nogal', 'madera', 'barra', 'caja', 'recepcion', 'nfc'],
    colors: [
      { id: 'nogal-americano', name: 'Nogal Americano', hex: '#5c3d24' },
      { id: 'roble-oscuro', name: 'Roble Oscuro', hex: '#422b1a' }
    ]
  },
  {
    id: 'expositor-sobremesa',
    categoryId: 'expositores',
    name: 'Expositor Compacto Mostrador',
    shortName: 'Expositor Compacto',
    subtitle: 'Presencia mínima para barras con espacio ajustado o caja TPV.',
    price: 55,
    priceSuffix: '€ / ud',
    priceNote: 'precio unitario',
    image: expositorStudioImg,
    imageAlt: 'Expositor compacto para mostrador de restaurante',
    materials: 'Aluminio anodizado negro mate sobre peana antideslizante.',
    tech: 'NFC instantáneo + QR óptico frontal',
    zone: 'Zona 02 · Barra & Caja',
    tags: ['expositor', 'compacto', 'tpv', 'barra', 'caja'],
    colors: [
      { id: 'negro-anodizado', name: 'Negro Anodizado', hex: '#22252c' },
      { id: 'plata-satinada', name: 'Plata Satinada', hex: '#b5b9c0' }
    ]
  },

  // --- 4. TARJETAS NFC ---
  {
    id: 'tarjeta-nfc-sala',
    categoryId: 'tarjetas',
    name: 'Tarjeta NFC de Sala Contactless',
    shortName: 'Tarjeta NFC Sala',
    subtitle: 'Tarjeta ultraligera estándar bancario para camareros y metres.',
    price: 15,
    priceSuffix: '€ / ud',
    priceNote: 'pack de 5 uds por 60 €',
    image: tarjetasImg,
    imageAlt: 'Tarjeta inteligente contactless para personal de restaurante',
    materials: 'Polímero sellado ultraligero (5 g) estándar ISO 7810.',
    tech: 'Chip NFC NTAG213 / 215 100% impermeable a líquidos y desinfectantes',
    zone: 'Zona 03 · Equipo de Sala & Metres',
    highlightBadge: 'Personal de Sala',
    volumeTiers: [
      { qty: '1 - 4 uds', price: '15 €/ud' },
      { qty: '5 - 9 uds', price: '12 €/ud (Pack 60 €)' },
      { qty: '10+ uds', price: '10 €/ud' }
    ],
    tags: ['tarjeta', 'nfc', 'camarero', 'equipo', 'contactless', 'sala'],
    colors: [
      { id: 'negro-mate', name: 'Negro Mate TapNova', hex: '#1e1e24' },
      { id: 'blanco-puro', name: 'Blanco Nieve', hex: '#f5f5f7' }
    ]
  },
  {
    id: 'tarjeta-aluminio-qr',
    categoryId: 'tarjetas',
    name: 'Tarjeta de Aluminio Anodizado',
    shortName: 'Tarjeta Aluminio',
    subtitle: 'Cuerpo metálico negro con bisel mecanizado y grabado láser.',
    price: 25,
    priceSuffix: '€ / ud',
    priceNote: 'grabado láser con logotipo',
    image: tarjetaQrImg,
    imageAlt: 'Tarjeta de aluminio anodizado grabada con chip NFC y QR',
    materials: 'Aleación de aluminio anodizado aeroespacial antihuellas.',
    tech: 'Chip NFC protegido con blindaje metálico + QR grabado en fibra láser',
    zone: 'Zona 03 · Equipo & Metres',
    highlightBadge: 'Metal Premium',
    tags: ['tarjeta', 'aluminio', 'metal', 'laser', 'nfc', 'qr'],
    colors: [
      { id: 'negro-espacial', name: 'Negro Espacial', hex: '#202127' },
      { id: 'oro-champagne', name: 'Oro Champagne', hex: '#cfab69' }
    ]
  },

  // --- 5. POSAVASOS INTELIGENTES ---
  {
    id: 'posavasos-terraza-50',
    categoryId: 'posavasos',
    name: 'Posavasos Inteligentes NFC (Pack 50)',
    shortName: 'Posavasos Pack 50',
    subtitle: 'El soporte perfecto para terrazas, coctelería y mesas altas.',
    price: 120,
    priceSuffix: '€ / pack 50 uds',
    priceNote: 'equivale a 2,40 €/ud',
    image: pegatinasImg,
    imageAlt: 'Posavasos inteligentes impermeables con chip NFC',
    materials: 'Compuesto bicapa hidrófugo antideslizante con barrera térmica.',
    tech: 'Cápsula interna sellada 100% estanca con chip NFC central + micro-QR',
    zone: 'Zona 04 · Terrazas & Coctelería',
    highlightBadge: 'Pack 50 uds',
    volumeTiers: [
      { qty: 'Pack 50 uds', price: '120 € (2,40 €/ud)' },
      { qty: 'Pack 100 uds', price: '190 € (1,90 €/ud)' },
      { qty: 'Pack 200+ uds', price: 'Consultar volumen' }
    ],
    tags: ['posavasos', 'terraza', 'cocteleria', 'bebidas', 'pack', 'nfc'],
    colors: [
      { id: 'negro-carbon', name: 'Negro Carbón', hex: '#202126' },
      { id: 'corcho-oscuro', name: 'Corcho Tostado', hex: '#876343' }
    ]
  },
  {
    id: 'posavasos-terraza-100',
    categoryId: 'posavasos',
    name: 'Posavasos Inteligentes NFC (Pack 100)',
    shortName: 'Posavasos Pack 100',
    subtitle: 'Mayor volumen para terrazas amplias con tarifa reducida.',
    price: 190,
    priceSuffix: '€ / pack 100 uds',
    priceNote: 'equivale a 1,90 €/ud (-21% ahorro)',
    image: pegatinasImg,
    imageAlt: 'Pack de 100 posavasos inteligentes con chip NFC',
    materials: 'Compuesto bicapa rígido impermeable apto para exterior continuo.',
    tech: 'Cápsula estanca con chip NFC central',
    zone: 'Zona 04 · Terrazas & Coctelería',
    highlightBadge: 'Mayor Ahorro',
    tags: ['posavasos', 'terraza', '100 uds', 'nfc', 'bar'],
    colors: [
      { id: 'negro-carbon', name: 'Negro Carbón', hex: '#202126' },
      { id: 'corcho-oscuro', name: 'Corcho Tostado', hex: '#876343' }
    ]
  },

  // --- 6. PEGATINAS QR & PLACAS ---
  {
    id: 'pegatinas-epoxi-10',
    categoryId: 'pegatinas',
    name: 'Pegatinas QR en Resina Epoxi (Pack 10)',
    shortName: 'Pegatinas Pack 10',
    subtitle: 'Cúpula transparente de alto relieve para cristaleras, escaparates y cartas.',
    price: 35,
    priceSuffix: '€ / pack 10 uds',
    priceNote: 'equivale a 3,50 €/ud',
    image: pegatinaStudioImg,
    imageAlt: 'Pegatinas de resina epoxi con relieve y código QR',
    materials: 'Cúpula de resina epoxi con filtro anti-UV y adhesivo 3M permanente.',
    tech: 'QR óptico vectorizado de contraste extremo legible con luz directa',
    zone: 'Zona 05 · Cartas, Mamparas & Exterior',
    highlightBadge: 'Resina Epoxi',
    volumeTiers: [
      { qty: 'Pack 10 uds', price: '35 € (3,50 €/ud)' },
      { qty: 'Pack 25 uds', price: '65 € (2,60 €/ud)' },
      { qty: 'Pack 50+ uds', price: '100 € (2,00 €/ud)' }
    ],
    tags: ['pegatina', 'epoxi', 'qr', 'cristal', 'exterior', 'carta', 'pack'],
    colors: [
      { id: 'epoxi-cristal', name: 'Fondo Negro Transparente', hex: '#1c1d22' },
      { id: 'epoxi-blanco', name: 'Fondo Blanco Contraste', hex: '#f5f5f7' }
    ]
  },
  {
    id: 'pegatinas-epoxi-25',
    categoryId: 'pegatinas',
    name: 'Pegatinas QR en Resina Epoxi (Pack 25)',
    shortName: 'Pegatinas Pack 25',
    subtitle: 'Pack completo para rotular cartas físicas, escaparates y barras exteriores.',
    price: 65,
    priceSuffix: '€ / pack 25 uds',
    priceNote: 'equivale a 2,60 €/ud (-25% ahorro)',
    image: pegatinasImg,
    imageAlt: 'Pack de 25 pegatinas QR en resina epoxi',
    materials: 'Resina protectora con filtro anti-UV, resistente a intemperie y lavados.',
    tech: 'Código QR permanente de alta resolución',
    zone: 'Zona 05 · Cartas & Exterior',
    highlightBadge: 'Pack 25 uds',
    tags: ['pegatina', 'epoxi', '25 uds', 'exterior', 'qr'],
    colors: [
      { id: 'epoxi-cristal', name: 'Fondo Negro Transparente', hex: '#1c1d22' },
      { id: 'epoxi-blanco', name: 'Fondo Blanco Contraste', hex: '#f5f5f7' }
    ]
  }
];
