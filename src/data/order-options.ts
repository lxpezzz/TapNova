import type { ProductPrice } from './products';

export const qrDestinations = [
  { id: 'google-reviews', name: 'Reseñas Google' },
  { id: 'menu', name: 'Carta' },
  { id: 'reservations', name: 'Reservas' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'promotions', name: 'Promociones' },
  { id: 'contact', name: 'Contacto' },
  { id: 'other', name: 'Otro' },
] as const;

export type QrDestination = (typeof qrDestinations)[number]['id'];

export interface QuantityOffer {
  id: string;
  modelId: string;
  quantity: number;
  // El precio corresponde al lote completo, no a una unidad.
  price: ProductPrice;
  vatRate?: number;
  discountPercent?: number;
  giftQuantity?: number;
}

// Cambia aquí las tarifas, el IVA y las promociones. Catálogo y selección
// utilizan estos mismos datos; los importes son sin IVA salvo que se indique.
export const orderVatRate = 21;

export const posavasosModelPrices = {
  minimalista: { kind: 'fixed', amount: 99, vat: 'excluded' },
  premium: { kind: 'fixed', amount: 125, vat: 'excluded' },
} satisfies Record<'minimalista' | 'premium', ProductPrice>;

export const portacuentasModelPrices = {
  estandar: { kind: 'fixed', amount: 35, vat: 'excluded' },
  premium: { kind: 'fixed', amount: 45, vat: 'excluded' },
} satisfies Record<'estandar' | 'premium', ProductPrice>;

export const expositoresModelPrices = {
  estandar: { kind: 'fixed', amount: 35, vat: 'excluded' },
  premium: { kind: 'fixed', amount: 45, vat: 'excluded' },
} satisfies Record<'estandar' | 'premium', ProductPrice>;

export const portamenusPrice: ProductPrice = { kind: 'fixed', amount: 45, vat: 'excluded' };
export const tarjetasQrPrice: ProductPrice = { kind: 'fixed', amount: 25, vat: 'excluded' };
export const pegatinasQrPrice: ProductPrice = { kind: 'quote' };
const tarjetasQrDiscount500 = 10;

export const tarjetasQrQuantityOffers: QuantityOffer[] = [
  { id: 'tarjetas-qr-250', modelId: 'principal', quantity: 250, price: tarjetasQrPrice, vatRate: orderVatRate },
  {
    id: 'tarjetas-qr-500', modelId: 'principal', quantity: 500,
    price: tarjetasQrPrice.kind === 'fixed' ? { ...tarjetasQrPrice, amount: Math.round(tarjetasQrPrice.amount * (1 - tarjetasQrDiscount500 / 100) * 100) / 100 } : tarjetasQrPrice,
    vatRate: orderVatRate, discountPercent: tarjetasQrDiscount500,
  },
];

const posavasosDiscount500 = 10;

export const posavasosQuantityOffers: QuantityOffer[] = Object.entries(posavasosModelPrices).flatMap(([modelId, price]) => [
  { id: `${modelId}-250`, modelId, quantity: 250, price, vatRate: orderVatRate },
  {
    id: `${modelId}-500`,
    modelId,
    quantity: 500,
    // El descuento se aplica al precio base del modelo, según lo confirmado.
    price: { ...price, amount: Math.round(price.amount * (1 - posavasosDiscount500 / 100) * 100) / 100 },
    vatRate: orderVatRate,
    discountPercent: posavasosDiscount500,
  },
]);

export interface UnitPricing {
  prices: Record<string, ProductPrice>;
  vatRate: number;
  discount?: { minimumQuantity: number; percent: number };
  gift?: { minimumQuantity: number; quantity: number };
}

export const productUnitPricing: Record<string, UnitPricing> = {
  portacuentas: {
    prices: portacuentasModelPrices, vatRate: orderVatRate,
    gift: { minimumQuantity: 6, quantity: 1 },
  },
  expositores: {
    prices: expositoresModelPrices, vatRate: orderVatRate,
    discount: { minimumQuantity: 3, percent: 10 },
  },
  portamenus: {
    prices: { principal: portamenusPrice }, vatRate: orderVatRate,
    gift: { minimumQuantity: 6, quantity: 1 },
  },
};
