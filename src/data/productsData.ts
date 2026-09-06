import portacuentasImg from '../assets/showcase/portacuentas-context.webp';
import expositorImg from '../assets/showcase/expositor-context.webp';
import tarjetasImg from '../assets/showcase/tarjetas-context.webp';
import pegatinasImg from '../assets/showcase/pegatinas-context.webp';
import posavasosImg from '../assets/products/pegatina.webp';

export interface PhysicalProduct {
  id: string;
  index: string;
  name: string;
  shortName: string;
  category: 'mesa' | 'barra' | 'equipo' | 'exterior' | 'terraza';
  categoryLabel: string;
  zone: string;
  title: string;
  lead: string;
  materials: string;
  tech: string;
  image: ImageMetadata;
  imageAlt: string;
  glowClass: string;
  basePrice: number;
  priceNote: string;
  volumeDiscounts?: { minQty: number; pricePerUnit: number; label: string }[];
  specs: {
    icon: string;
    label: string;
    value: string;
  }[];
}

export const PHYSICAL_PRODUCTS: PhysicalProduct[] = [
  {
    id: 'portacuentas',
    index: '01',
    name: 'Portacuentas Inteligente',
    shortName: 'Portacuentas',
    category: 'mesa',
    categoryLabel: 'Mesa',
    zone: 'Zona 01 · La Mesa',
    title: 'Donde termina el servicio, empieza la reseña.',
    lead: 'El momento de la cuenta es uno de los puntos más naturales para pedir una reseña. TapNova integra QR y NFC directamente en el portacuentas para hacerlo fácil e inmediato.',
    materials: 'Piel negra hidrorepelente con costuras reforzadas y placa de aleación de titanio cepillado antihuellas grabado a láser.',
    tech: 'Chip NFC 13.56 MHz (ISO 14443A) bajo el lomo + QR óptico de alta resolución grabado en titanio.',
    image: portacuentasImg,
    imageAlt: 'Portacuentas inteligente de piel y titanio para mesas de restaurante',
    glowClass: 'glow-amber',
    basePrice: 79,
    priceNote: 'desde 59 € según volumen',
    volumeDiscounts: [
      { minQty: 1, pricePerUnit: 79, label: '1 - 9 uds' },
      { minQty: 10, pricePerUnit: 69, label: '10 - 19 uds (-13%)' },
      { minQty: 20, pricePerUnit: 59, label: '20+ uds (-25%)' }
    ],
    specs: [
      {
        icon: 'nfc',
        label: 'NFC + QR',
        value: 'Dos formas de acceder desde cualquier móvil sin instalar aplicaciones.'
      },
      {
        icon: 'shield',
        label: 'Piel & Titanio',
        value: 'Materiales nobles preparados para el uso intensivo del servicio diario.'
      },
      {
        icon: 'clock',
        label: 'Acceso directo',
        value: 'Conexión instantánea a tu ficha oficial de Google Maps.'
      }
    ]
  },
  {
    id: 'expositor',
    index: '02',
    name: 'Expositor de Nogal Macizo',
    shortName: 'Expositor',
    category: 'barra',
    categoryLabel: 'Barra & Caja',
    zone: 'Zona 02 · Barra, Recepción & Caja',
    title: 'Haz visible la reseña en el momento de espera.',
    lead: 'En barra, recepción o mostrador, el expositor TapNova convierte un momento de espera o cobro en una oportunidad para dejar una reseña sin interrumpir la experiencia.',
    materials: 'Bloque macizo mecanizado de madera noble de nogal, pulido a mano y tratado con aceite natural hidrófugo.',
    tech: 'Antena NFC de campo medio (lectura a 3-4 cm) + Marcaje láser indeleble. Ángulo ergonómico de 65°.',
    image: expositorImg,
    imageAlt: 'Expositor de madera de nogal macizo con chip NFC y QR para barra de restaurante',
    glowClass: 'glow-purple',
    basePrice: 69,
    priceNote: 'precio unitario',
    specs: [
      {
        icon: 'wood',
        label: 'Nogal macizo',
        value: 'Madera natural mecanizada tratada con aceite hidrófugo.'
      },
      {
        icon: 'nfc',
        label: 'NFC + Marcaje láser',
        value: 'Antena NFC integrada con lectura limpia y código óptico.'
      },
      {
        icon: 'eye',
        label: 'Siempre a la vista',
        value: 'Ángulo ergonómico de 65° ideal para barra y recepción.'
      }
    ]
  },
  {
    id: 'tarjeta-nfc',
    index: '03',
    name: 'Tarjeta NFC de Sala',
    shortName: 'Tarjeta NFC',
    category: 'equipo',
    categoryLabel: 'Equipo & Metres',
    zone: 'Zona 03 · Equipo de Sala & Metres',
    title: 'Una buena experiencia merece ser compartida.',
    lead: 'Una tarjeta NFC ligera y personalizada para que tu equipo aproveche el momento exacto en que un cliente valora positivamente el servicio en mesa o barra.',
    materials: 'Polímero sellado ultraligero estándar bancario ISO 7810. Acabado negro mate antireflejos con logo grabado.',
    tech: 'Chip NFC integrado de proximidad inmediata con blindaje 100% impermeable a líquidos y desinfectantes.',
    image: tarjetasImg,
    imageAlt: 'Tarjeta inteligente contactless para personal de sala en restaurante',
    glowClass: 'glow-purple',
    basePrice: 15,
    priceNote: 'o pack de 5 uds por 60 €',
    specs: [
      {
        icon: 'card',
        label: 'Ultraligera (5 g)',
        value: 'Formato estándar bancario para llevar cómodamente en el uniforme.'
      },
      {
        icon: 'shield',
        label: 'Impermeable y lavable',
        value: 'Blindaje estanco resistente a líquidos, roces y desinfectantes.'
      },
      {
        icon: 'sparkle',
        label: 'Grabado corporativo',
        value: 'Personalizada con tu logotipo y vinculación verificada.'
      }
    ]
  },
  {
    id: 'posavasos',
    index: '04',
    name: 'Posavasos Inteligente',
    shortName: 'Posavasos',
    category: 'terraza',
    categoryLabel: 'Terrazas & Mesas Altas',
    zone: 'Zona 04 · Terrazas & Coctelería',
    title: 'Cada mesa, un punto de contacto natural.',
    lead: 'Posavasos con QR y NFC para conectar al cliente con reseñas, carta digital o tu perfil en Google durante toda la consumición en terraza o zonas informales.',
    materials: 'Cuerpo compuesto rígido bicapa, hidrófugo y antideslizante con barrera térmica.',
    tech: 'Cápsula interna sellada 100% estanca con chip NFC central + micro-QR secundario.',
    image: posavasosImg,
    imageAlt: 'Posavasos inteligente con chip NFC integrado para bares y terrazas',
    glowClass: 'glow-amber',
    basePrice: 120,
    priceNote: 'pack de 50 uds (100 uds por 190 €)',
    specs: [
      {
        icon: 'nfc',
        label: 'NFC central estanco',
        value: 'Cápsula sellada 100% impermeable a líquidos y condensación fría.'
      },
      {
        icon: 'shield',
        label: 'Bicapa antideslizante',
        value: 'Base estable para bebidas calientes o frías con protección térmica.'
      },
      {
        icon: 'eye',
        label: 'Presencia constante',
        value: 'Disponible en la mesa durante todo el tiempo de consumición.'
      }
    ]
  },
  {
    id: 'pegatina',
    index: '05',
    name: 'Pegatina QR en Resina Epoxi',
    shortName: 'Pegatina QR',
    category: 'exterior',
    categoryLabel: 'Cartas & Exterior',
    zone: 'Zona 05 · Cartas, Mamparas & Exterior',
    title: 'Una reseña puede empezar en cualquier rincón.',
    lead: 'Soportes adhesivos con relieve para escaparates, cristales, terrazas y cartas. Una forma discreta de mantener la valoración siempre al alcance del cliente.',
    materials: 'Cúpula protectora de resina epoxi brillante con filtro anti-UV y adhesivo industrial permanente.',
    tech: 'Código QR vectorizado de contraste óptico extremo, legible con luz solar directa o penumbra.',
    image: pegatinasImg,
    imageAlt: 'Pegatinas y placas adhesivas impermeables con código QR grabado para restaurantes',
    glowClass: 'glow-amber',
    basePrice: 35,
    priceNote: 'pack de 10 uds (25 uds por 65 €)',
    specs: [
      {
        icon: 'sun',
        label: 'Filtro Anti-UV',
        value: 'Resina epoxi resistente a la luz solar directa, lluvia y limpieza.'
      },
      {
        icon: 'sticker',
        label: 'Fijación permanente',
        value: 'Adhesivo de alto agarre para cristal, metal, madera y cartas.'
      },
      {
        icon: 'qr',
        label: 'Contraste óptico',
        value: 'Lectura instantánea de alta resolución en cualquier condición de luz.'
      }
    ]
  }
];
