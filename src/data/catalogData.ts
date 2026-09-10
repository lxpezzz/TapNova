import portacuentasImg from '../assets/showcase/portacuentas-context.webp';
import portacuentasClosedImg from '../assets/products/portacuentas-closed.webp';
import portacuentasOpenImg from '../assets/products/portacuentas-open.webp';
import portacuentasHeroImg from '../assets/hero/portacuentas-hero.webp';
import portacuentasWebp from '../assets/products/portacuentas.webp';
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
  gama?: 'basicos' | 'premium';
  hasSidesOption?: boolean;
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
  },
  {
    id: 'packs',
    name: 'Packs de Hostelería',
    shortLabel: 'Packs',
    description: 'Sistemas completos llave en mano con portacuentas, expositores y tecnología listos para sala.',
    zone: 'Equipamiento Integral'
  }
];

export interface CatalogPack {
  id: string;
  name: string;
  eyebrow: string;
  price: string;
  saving: string;
  description: string;
  features: string[];
  cta: string;
  icon: 'layers' | 'spark' | 'orbit';
  featured: boolean;
  whatsappMessage: string;
}

export const CATALOG_PACKS: CatalogPack[] = [
  {
    id: 'pack-tap-start',
    name: 'Tap Start',
    eyebrow: 'Barra & Terraza',
    price: '290',
    saving: 'Ahorras 50 €',
    description: 'La base elegante para activar reseñas continuas en barra, mostrador y mesas de terraza.',
    features: [
      '1 expositor de madera de nogal para barra o caja TPV',
      '50 posavasos NFC impermeables con QR grabado',
      '10 pegatinas QR de resina epoxi de alta resistencia',
      'Configuración directa con tu perfil de Google Reviews'
    ],
    cta: 'Elegir Tap Start',
    icon: 'layers',
    featured: false,
    whatsappMessage: '¡Hola TapNova! 👋 Quiero solicitar presupuesto y disponibilidad del Pack Tap Start (290 €) para mi restaurante.'
  },
  {
    id: 'pack-tap-pro',
    name: 'Tap Pro',
    eyebrow: 'El más elegido',
    price: '890',
    saving: 'Ahorras 260 €',
    description: 'La sala conectada: soportes nobles en mesa y visibilidad local desde el primer servicio.',
    features: [
      '12 portacuentas inteligentes de piel y titanio grabado',
      '2 expositores de nogal para recepción y barra',
      '5 tarjetas NFC contactless para el equipo de sala',
      '1 mes de optimización de SEO Local en Google Maps incluido'
    ],
    cta: 'Elegir Tap Pro',
    icon: 'spark',
    featured: true,
    whatsappMessage: '¡Hola TapNova! 👋 Quiero solicitar presupuesto y disponibilidad del Pack Tap Pro (890 €) para mi restaurante.'
  },
  {
    id: 'pack-tap-galaxy',
    name: 'Tap Galaxy',
    eyebrow: 'Ecosistema 360°',
    price: '1.790',
    saving: 'Ahorras 460 €',
    description: 'Un ecosistema integral para unir servicio en mesa, presencia online y captación constante.',
    features: [
      '20 portacuentas en piel y titanio + 3 expositores de nogal',
      '8 tarjetas de personal + 100 posavasos impermeables',
      '25 pegatinas epoxi para puntos exteriores y cristal',
      'Página web gastronómica con reservas + 3 meses de SEO Local'
    ],
    cta: 'Elegir Tap Galaxy',
    icon: 'orbit',
    featured: false,
    whatsappMessage: '¡Hola TapNova! 👋 Quiero solicitar presupuesto y disponibilidad del Pack Tap Galaxy (1.790 €) para mi restaurante.'
  }
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  // --- 1. PORTACUENTAS (Gamas Básicos & Premium) ---
  // BÁSICOS (Precio uniforme: 49 € / ud)
  {
    id: 'portacuentas-piel-lisa',
    categoryId: 'portacuentas',
    gama: 'basicos',
    name: 'Portacuentas Piel Lisa',
    shortName: 'Piel Lisa',
    subtitle: 'Piel vegana hidrorepelente con tacto suave y acabado mate.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'desde 37 € por volumen',
    image: portacuentasClosedImg,
    imageAlt: 'Portacuentas de piel lisa mate TapNova',
    materials: 'Piel vegana hidrorepelente de tacto suave y acabado mate.',
    tech: 'Chip NFC de contacto directo + micro-QR interno',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '49 €/ud' },
      { qty: '10 - 19 uds', price: '42 €/ud (-14%)' },
      { qty: '20+ uds', price: '37 €/ud (-24%)' }
    ],
    tags: ['portacuentas', 'basico', 'piel', 'lisa', 'mesa', 'cuenta', 'nfc', 'qr'],
    colors: [
      { id: 'negro-mate', name: 'Negro Mate', hex: '#1e1e24' },
      { id: 'marron-cognac', name: 'Marrón Cognac', hex: '#9e5927' },
      { id: 'azul-marino', name: 'Azul Marino', hex: '#22385c' }
    ]
  },
  {
    id: 'portacuentas-formato-libro',
    categoryId: 'portacuentas',
    gama: 'basicos',
    name: 'Portacuentas Formato Libro',
    shortName: 'Formato Libro',
    subtitle: 'Apertura clásica en dos cuerpos con solapa para ticket.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'desde 37 € por volumen',
    image: portacuentasOpenImg,
    imageAlt: 'Portacuentas abierto formato libro para mesa de restaurante',
    materials: 'Estructura rígida con forro de piel sintética y solapa ticket.',
    tech: 'Chip NFC central de alta velocidad + código QR',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '49 €/ud' },
      { qty: '10 - 19 uds', price: '42 €/ud (-14%)' },
      { qty: '20+ uds', price: '37 €/ud (-24%)' }
    ],
    tags: ['portacuentas', 'basico', 'libro', 'abierto', 'solapa', 'mesa', 'nfc'],
    colors: [
      { id: 'negro-ebano', name: 'Negro Ébano', hex: '#1e1e24' },
      { id: 'cuero-habana', name: 'Cuero Habana', hex: '#8a4f28' },
      { id: 'gris-grafito', name: 'Gris Grafito', hex: '#505563' }
    ]
  },
  {
    id: 'portacuentas-slim-pocket',
    categoryId: 'portacuentas',
    gama: 'basicos',
    name: 'Portacuentas Slim Pocket',
    shortName: 'Slim Pocket',
    subtitle: 'Perfil ultrafino optimizado para servicio ágil de sala.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'desde 37 € por volumen',
    image: portacuentasWebp,
    imageAlt: 'Portacuentas compacto ultrafino de piel',
    materials: 'Núcleo flexible antirrotura con revestimiento impermeable.',
    tech: 'Antena NFC circular ultrafina de respuesta inmediata',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '49 €/ud' },
      { qty: '10 - 19 uds', price: '42 €/ud (-14%)' },
      { qty: '20+ uds', price: '37 €/ud (-24%)' }
    ],
    tags: ['portacuentas', 'basico', 'slim', 'compacto', 'bolsillo', 'mesa', 'nfc'],
    colors: [
      { id: 'negro-carbon', name: 'Negro Carbón', hex: '#1e1e24' },
      { id: 'camel-natural', name: 'Camel Natural', hex: '#b5824c' }
    ]
  },
  {
    id: 'portacuentas-cuero-clasico',
    categoryId: 'portacuentas',
    gama: 'basicos',
    name: 'Portacuentas Cuero Clásico',
    shortName: 'Cuero Clásico',
    subtitle: 'Cosido perimetral reforzado y grabado láser en bajo relieve.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'desde 37 € por volumen',
    image: portacuentasClosedImg,
    imageAlt: 'Portacuentas cerrado con pespunte perimetral reforzado',
    materials: 'Piel tratada con pespunte perimetral reforzado al tono.',
    tech: 'Sensor NFC pasivo 13.56 MHz bajo solapa',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '49 €/ud' },
      { qty: '10 - 19 uds', price: '42 €/ud (-14%)' },
      { qty: '20+ uds', price: '37 €/ud (-24%)' }
    ],
    tags: ['portacuentas', 'basico', 'cuero', 'clasico', 'pespunte', 'mesa', 'nfc'],
    colors: [
      { id: 'marron-cafe', name: 'Marrón Café', hex: '#63391d' },
      { id: 'negro-mate', name: 'Negro Mate', hex: '#1e1e24' },
      { id: 'verde-oliva', name: 'Verde Oliva', hex: '#3d4a36' }
    ]
  },

  // PREMIUM (Precio uniforme: 79 € / ud)
  {
    id: 'portacuentas-titanio',
    categoryId: 'portacuentas',
    gama: 'premium',
    name: 'Portacuentas Piel & Placa Titanio',
    shortName: 'Piel & Titanio',
    subtitle: 'Frontal en titanio aeroespacial cepillado antihuellas.',
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
    tags: ['portacuentas', 'premium', 'titanio', 'piel', 'mesa', 'cuenta', 'nfc', 'qr'],
    colors: [
      { id: 'negro-ebano', name: 'Negro Ébano', hex: '#1e1e24' },
      { id: 'cuero-habana', name: 'Cuero Habana', hex: '#8a4f28' },
      { id: 'gris-titanio', name: 'Gris Grafito', hex: '#505563' }
    ]
  },
  {
    id: 'portacuentas-nogal-titanio',
    categoryId: 'portacuentas',
    gama: 'premium',
    name: 'Portacuentas Nogal & Titanio',
    shortName: 'Nogal & Titanio',
    subtitle: 'Cuerpo en madera noble de nogal con placa metálica grabada.',
    price: 79,
    priceSuffix: '€ / ud',
    priceNote: 'desde 59 € por volumen',
    image: portacuentasHeroImg,
    imageAlt: 'Portacuentas de madera noble de nogal con herraje metálico',
    materials: 'Madera maciza de nogal español con placa de aleación cepillada.',
    tech: 'Antena NFC embutida en madera maciza sin cortes visibles',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '79 €/ud' },
      { qty: '10 - 19 uds', price: '69 €/ud (-13%)' },
      { qty: '20+ uds', price: '59 €/ud (-25%)' }
    ],
    tags: ['portacuentas', 'premium', 'nogal', 'madera', 'titanio', 'mesa', 'nfc'],
    colors: [
      { id: 'nogal-oscuro', name: 'Nogal Oscuro', hex: '#422817' },
      { id: 'roble-ahumado', name: 'Roble Ahumado', hex: '#634b35' }
    ]
  },
  {
    id: 'portacuentas-bandeja-titanio',
    categoryId: 'portacuentas',
    gama: 'premium',
    name: 'Portacuentas Formato Bandeja Titanio',
    shortName: 'Bandeja Titanio',
    subtitle: 'Bandeja rígida con clip magnético y lectura frontal NFC.',
    price: 79,
    priceSuffix: '€ / ud',
    priceNote: 'desde 59 € por volumen',
    image: portacuentasOpenImg,
    imageAlt: 'Portacuentas formato bandeja con clip de titanio y NFC',
    materials: 'Estructura rígida forrada con piel hidrorepelente y herraje metálico.',
    tech: 'NFC central de lectura rápida + QR en cabecera',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '79 €/ud' },
      { qty: '10 - 19 uds', price: '69 €/ud (-13%)' },
      { qty: '20+ uds', price: '59 €/ud (-25%)' }
    ],
    tags: ['portacuentas', 'premium', 'bandeja', 'abierto', 'ticket', 'mesa', 'titanio'],
    colors: [
      { id: 'negro-titanio', name: 'Negro & Titanio', hex: '#1e1e24' },
      { id: 'camel-oro', name: 'Camel & Oro', hex: '#b5824c' }
    ]
  },
  {
    id: 'portacuentas-signature',
    categoryId: 'portacuentas',
    gama: 'premium',
    name: 'Portacuentas Edición Signature',
    shortName: 'Edición Signature',
    subtitle: 'Piel texturizada con inserción de titanio y chip de alta ganancia.',
    price: 79,
    priceSuffix: '€ / ud',
    priceNote: 'desde 59 € por volumen',
    image: portacuentasImg,
    imageAlt: 'Portacuentas edición Signature con acabado artesanal',
    materials: 'Piel de grano selecto con inserción de titanio electropulido.',
    tech: 'Chip NFC NTAG216 de alta ganancia con respuesta instantánea',
    zone: 'Zona 01 · La Mesa',
    volumeTiers: [
      { qty: '1 - 9 uds', price: '79 €/ud' },
      { qty: '10 - 19 uds', price: '69 €/ud (-13%)' },
      { qty: '20+ uds', price: '59 €/ud (-25%)' }
    ],
    tags: ['portacuentas', 'premium', 'signature', 'titanio', 'piel', 'mesa', 'nfc'],
    colors: [
      { id: 'negro-obsidiana', name: 'Negro Obsidiana', hex: '#111115' },
      { id: 'burdeos-reserva', name: 'Burdeos Reserva', hex: '#4a1521' },
      { id: 'azul-cobalto', name: 'Azul Cobalto', hex: '#162b4d' }
    ]
  },

  // --- 2. PORTAMENÚS & CARTAS PERSONALIZADOS ---
  {
    id: 'portamenu-mesa',
    categoryId: 'portamenus',
    name: 'Portamenú de Mesa NFC + QR',
    shortName: 'Portamenú Mesa',
    subtitle: 'Soporte compacto para centro de mesa con acceso instantáneo a carta.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'Personalización incluida',
    image: portacuentasClosedImg,
    imageAlt: 'Portamenú rígido personalizado con chip NFC y QR para mesas',
    materials: 'Cuerpo compuesto con recubrimiento hidrófugo y base pesada antivuelco.',
    tech: 'Doble chip NFC bidireccional + QR grabado de alto contraste',
    zone: 'Zona 01 · La Mesa',
    tags: ['portamenus', 'carta', 'menu', 'mesa', 'nfc', 'qr', 'personalizado'],
    colors: [
      { id: 'grafito', name: 'Grafito Mate', hex: '#3d404b' },
      { id: 'nogal-oscuro', name: 'Nogal Natural', hex: '#5c3d24' }
    ]
  },
  {
    id: 'portamenu-barra',
    categoryId: 'portamenus',
    name: 'Atril de Carta para Barra',
    shortName: 'Atril Barra',
    subtitle: 'Exhibición vertical de carta y bebidas en madera tratada antideslizante.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'Personalización incluida',
    image: expositorStudioImg,
    imageAlt: 'Atril portamenú de barra en madera noble personalizada',
    materials: 'Madera de nogal tratada con ranura de fijación y placa grabada.',
    tech: 'Antena NFC vertical + QR de acceso a carta interactiva',
    zone: 'Zona 02 · Barra & Caja',
    tags: ['portamenus', 'atril', 'barra', 'carta', 'nogal', 'personalizado'],
    colors: [
      { id: 'nogal-natural', name: 'Nogal Natural', hex: '#5c3d24' },
      { id: 'roble-tostado', name: 'Roble Tostado', hex: '#7c5636' }
    ]
  },
  {
    id: 'portamenu-caballete',
    categoryId: 'portamenus',
    name: 'Portamenú Caballete Doble Cara',
    shortName: 'Portamenú Caballete',
    subtitle: 'Ángulo ergonómico de 75° con visibilidad simultánea en dos caras.',
    price: 49,
    priceSuffix: '€ / ud',
    priceNote: 'Personalización incluida',
    image: portacuentasOpenImg,
    imageAlt: 'Portamenú caballete doble cara personalizado para restaurante',
    materials: 'Acrílico fundido de alta densidad y estructura sellada hidrorrepelente.',
    tech: 'Doble chip NFC integrado (uno por cara) + QR láser indeleble',
    zone: 'Zona 01 · Mesa & Terraza',
    tags: ['portamenus', 'caballete', 'doble cara', 'carta', 'menu', 'personalizado'],
    colors: [
      { id: 'negro-mate', name: 'Negro Mate TapNova', hex: '#1e1e24' },
      { id: 'blanco-puro', name: 'Blanco Nieve', hex: '#f5f5f7' }
    ]
  },

  // --- 3. EXPOSITORES (BÁSICO & PREMIUM) ---
  {
    id: 'expositor-sobremesa',
    categoryId: 'expositores',
    gama: 'basicos',
    hasSidesOption: true,
    name: 'Expositor Compacto Mostrador',
    shortName: 'Expositor Compacto',
    subtitle: 'Presencia mínima para barras con espacio ajustado o caja TPV.',
    price: 55,
    priceSuffix: '€ / ud',
    priceNote: 'precio unitario',
    image: expositorStudioImg,
    imageAlt: 'Expositor compacto para mostrador de restaurante',
    materials: 'Aluminio anodizado negro mate sobre peana antideslizante.',
    tech: 'NFC instantáneo + QR óptico frontal (disponible en 1 o 2 caras)',
    zone: 'Zona 02 · Barra & Caja',
    tags: ['expositor', 'basico', 'compacto', 'tpv', 'barra', 'caja', 'nfc', 'qr', '1 cara', '2 caras'],
    colors: [
      { id: 'negro-anodizado', name: 'Negro Anodizado', hex: '#22252c' },
      { id: 'plata-satinada', name: 'Plata Satinada', hex: '#b5b9c0' }
    ]
  },
  {
    id: 'expositor-nogal-pro',
    categoryId: 'expositores',
    gama: 'premium',
    hasSidesOption: true,
    name: 'Expositor de Nogal Macizo',
    shortName: 'Expositor Nogal',
    subtitle: 'Mecanizado artesanal en bloque de nogal noble con inclinación a 65°.',
    price: 69,
    priceSuffix: '€ / ud',
    priceNote: 'precio unitario',
    image: expositorImg,
    imageAlt: 'Expositor de nogal macizo con chip NFC y marcaje láser',
    materials: 'Bloque macizo de madera de nogal pulido a mano con aceite hidrófugo.',
    tech: 'Antena NFC de campo medio (lectura a 3-4 cm) + Marcaje láser indeleble (1 o 2 caras)',
    zone: 'Zona 02 · Barra, Recepción & Caja',
    highlightBadge: 'Madera Noble',
    tags: ['expositor', 'premium', 'nogal', 'madera', 'barra', 'caja', 'recepcion', 'nfc', '1 cara', '2 caras'],
    colors: [
      { id: 'nogal-americano', name: 'Nogal Americano', hex: '#5c3d24' },
      { id: 'roble-oscuro', name: 'Roble Oscuro', hex: '#422b1a' }
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
      { id: 'negro-mate', name: 'Negro Mate', hex: '#18181b' }
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
      { id: 'negro-aluminio', name: 'Negro Anodizado', hex: '#18181b' }
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
