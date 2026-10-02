import type { ImageMetadata } from 'astro';
import PosavasosImage from '../assets/products/posavasos-lifestyle.webp';
import PortacuentasImage from '../assets/products/portacuentas-lifestyle.webp';
import ExpositoresImage from '../assets/products/expositores-lifestyle.webp';
import { posavasosModelPrices, portacuentasModelPrices, expositoresModelPrices, portamenusPrice, tarjetasQrPrice, pegatinasQrPrice } from './order-options';

export type ProductPrice =
  | { kind: 'fixed' | 'from'; amount: number; vat: 'included' | 'excluded' }
  | { kind: 'quote' };

export interface ProductImage {
  src: ImageMetadata;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: ProductPrice;
  image?: ProductImage;
}

export const productFilters = [
  { id: 'all', name: 'Todos' },
  { id: 'mesa', name: 'Mesa' },
  { id: 'qr-nfc', name: 'QR + NFC' },
  { id: 'impresos', name: 'Impresos' },
] as const;

export type ProductCategory = Exclude<(typeof productFilters)[number]['id'], 'all'>;

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categories: ProductCategory[];
  price: ProductPrice;
  image?: ProductImage;
  featured?: boolean;
  variants?: ProductVariant[];
}

// Solo se publican las tarifas confirmadas. El resto queda a consultar.
// Los productos sin fotografía conservan image sin definir.
export const products: Product[] = [
  {
    id: 'posavasos-personalizados',
    slug: 'posavasos',
    name: 'Posavasos personalizados',
    description: 'Carta, reseñas, reservas y promociones desde el mismo punto de la mesa.',
    categories: ['mesa', 'qr-nfc'],
    price: { ...posavasosModelPrices.minimalista, kind: 'from' },
    image: {
      src: PosavasosImage,
      alt: 'Posavasos personalizados con QR y NFC sobre una mesa de restaurante',
    },
    featured: true,
  },
  {
    id: 'portacuentas-qr-nfc',
    slug: 'portacuentas',
    name: 'Portacuentas QR + NFC',
    description: 'El momento de la cuenta también puede abrir la puerta a una reseña o una próxima visita.',
    categories: ['mesa', 'qr-nfc'],
    price: { ...portacuentasModelPrices.estandar, kind: 'from' },
    image: {
      src: PortacuentasImage,
      alt: 'Portacuentas con QR y NFC sobre una mesa de madera',
    },
  },
  {
    id: 'expositores-qr-nfc',
    slug: 'expositores',
    name: 'Expositores QR + NFC',
    description: 'Un acceso visible a tu carta, reseñas o reservas, en mesa, barra o recepción.',
    categories: ['mesa', 'qr-nfc'],
    price: { ...expositoresModelPrices.estandar, kind: 'from' },
    image: {
      src: ExpositoresImage,
      alt: 'Expositor de mesa con código QR y símbolo NFC en un restaurante',
    },
  },
  {
    id: 'portamenus-personalizados',
    slug: 'portamenus',
    name: 'Portamenús personalizados',
    description: 'La presentación de tu carta, con la identidad de tu local.',
    categories: ['mesa'],
    price: portamenusPrice.kind === 'fixed' ? { ...portamenusPrice, kind: 'from' } : portamenusPrice,
  },
  {
    id: 'tarjetas-qr-impresas',
    slug: 'tarjetas-qr',
    name: 'Tarjetas QR',
    description: 'Tu carta, redes o información de contacto al escanear un código.',
    categories: ['qr-nfc', 'impresos'],
    price: tarjetasQrPrice,
  },
  {
    id: 'pegatinas-qr',
    slug: 'pegatinas-qr',
    name: 'Pegatinas QR',
    description: 'Un acceso a tu información en el punto de tu local que elijas.',
    categories: ['qr-nfc', 'impresos'],
    price: pegatinasQrPrice,
  },
];

export function formatProductPrice(price: ProductPrice): string {
  if (price.kind === 'quote') return 'Consultar';
  const amount = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(price.amount);
  const prefix = price.kind === 'from' ? 'Desde ' : '';
  const vat = price.vat === 'excluded' ? '+ IVA' : 'IVA incluido';
  return `${prefix}${amount} € ${vat}`;
}
