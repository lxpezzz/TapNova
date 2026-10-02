import { qrDestinations, type QrDestination, type QuantityOffer, type UnitPricing } from '../data/order-options';

export const REQUEST_STORAGE_KEY = 'tapnova.request.v1';

export type RequestEstimate =
  | { kind: 'quote'; currency: 'EUR' }
  | { kind: 'estimated'; currency: 'EUR'; netCents: number; vatRate: number; vatCents: number; totalCents: number };

export interface RequestSelection {
  productId: string;
  modelId: string | null;
  options?: Record<string, string>;
  quantity: number | null;
  qrDestination: QrDestination;
  observations: string;
  estimate: RequestEstimate;
}

export interface RequestItem extends RequestSelection {
  id: string;
  createdAt: string;
}

interface SavedRequest {
  version: 1;
  items: RequestItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function isEstimate(value: unknown): value is RequestEstimate {
  if (!isRecord(value) || value.currency !== 'EUR') return false;
  if (value.kind === 'quote') return true;
  return value.kind === 'estimated'
    && isNonNegativeInteger(value.netCents)
    && isNonNegativeInteger(value.vatCents)
    && isNonNegativeInteger(value.totalCents)
    && typeof value.vatRate === 'number'
    && Number.isFinite(value.vatRate) && value.vatRate >= 0 && value.vatRate <= 100
    && value.netCents + value.vatCents === value.totalCents;
}

function isSelection(value: unknown): value is RequestSelection {
  if (!isRecord(value)) return false;
  return typeof value.productId === 'string' && value.productId.length > 0
    && (value.modelId === null || (typeof value.modelId === 'string' && value.modelId.length > 0))
    && (value.options === undefined || (isRecord(value.options) && Object.entries(value.options).every(([key, option]) => key.length > 0 && typeof option === 'string' && option.length <= 1000)))
    && (value.quantity === null || (isNonNegativeInteger(value.quantity) && value.quantity > 0))
    && qrDestinations.some(({ id }) => id === value.qrDestination)
    && typeof value.observations === 'string' && value.observations.length <= 1000
    && isEstimate(value.estimate)
    && (value.estimate.kind === 'quote' || value.quantity !== null);
}

function isItem(value: unknown): value is RequestItem {
  return isSelection(value) && isRecord(value)
    && typeof value.id === 'string' && value.id.length > 0
    && typeof value.createdAt === 'string' && Number.isFinite(Date.parse(value.createdAt));
}

export function readRequest(storage: Storage = window.localStorage): RequestItem[] {
  const raw = storage.getItem(REQUEST_STORAGE_KEY);
  if (raw === null) return [];
  const saved: unknown = JSON.parse(raw);
  if (!isRecord(saved) || saved.version !== 1 || !Array.isArray(saved.items) || !saved.items.every(isItem)) {
    throw new Error('La solicitud guardada no tiene un formato válido.');
  }
  return saved.items;
}

export function addRequestSelection(selection: RequestSelection, storage: Storage = window.localStorage): RequestItem {
  if (!isSelection(selection)) throw new Error('La selección no es válida.');
  const items = readRequest(storage);
  const observations = selection.observations.trim();
  const existing = items.find((item) => item.productId === selection.productId
    && item.modelId === selection.modelId && item.quantity === selection.quantity
    && item.qrDestination === selection.qrDestination && item.observations === observations
    && JSON.stringify(Object.entries(item.options ?? {}).sort()) === JSON.stringify(Object.entries(selection.options ?? {}).sort()));
  const item: RequestItem = {
    ...selection,
    observations,
    id: existing?.id ?? crypto.randomUUID(),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  const saved: SavedRequest = {
    version: 1,
    items: existing ? items.map((entry) => entry.id === existing.id ? item : entry) : [...items, item],
  };
  writeRequest(saved.items, storage);
  return item;
}

export function writeRequest(items: RequestItem[], storage: Storage = window.localStorage): void {
  if (!items.every(isItem)) throw new Error('La solicitud no es válida.');
  storage.setItem(REQUEST_STORAGE_KEY, JSON.stringify({ version: 1, items }));
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('tapnova:request-change'));
}

export function updateRequestSelection(id: string, selection: RequestSelection, storage: Storage = window.localStorage): void {
  if (!isSelection(selection)) throw new Error('La selección no es válida.');
  const items = readRequest(storage);
  if (!items.some((item) => item.id === id)) throw new Error('El producto ya no está en tu solicitud.');
  writeRequest(items.map((item) => item.id === id ? { ...item, ...selection, observations: selection.observations.trim() } : item), storage);
}

export function estimateQuantityOffer(offer?: QuantityOffer): RequestEstimate {
  if (!offer || offer.price.kind !== 'fixed' || offer.vatRate === undefined) return { kind: 'quote', currency: 'EUR' };
  if (!Number.isSafeInteger(offer.quantity) || offer.quantity <= 0) return { kind: 'quote', currency: 'EUR' };
  const { amount, vat } = offer.price;
  const rate = offer.vatRate;
  if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(rate) || rate < 0 || rate > 100) {
    return { kind: 'quote', currency: 'EUR' };
  }
  const cents = Math.round(amount * 100);
  const netCents = vat === 'included' ? Math.round(cents / (1 + rate / 100)) : cents;
  const vatCents = vat === 'included' ? cents - netCents : Math.round(netCents * rate / 100);
  const estimate: RequestEstimate = { kind: 'estimated', currency: 'EUR', netCents, vatRate: rate, vatCents, totalCents: netCents + vatCents };
  return isEstimate(estimate) ? estimate : { kind: 'quote', currency: 'EUR' };
}

export function unitQuantityOffer(pricing: UnitPricing, modelId: string, quantity: number): QuantityOffer | undefined {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) return;
  const unitPrice = pricing.prices[modelId];
  if (!unitPrice) return;
  const discount = pricing.discount;
  const discountPercent = discount && quantity >= discount.minimumQuantity ? discount.percent : 0;
  const giftQuantity = pricing.gift && quantity >= pricing.gift.minimumQuantity ? pricing.gift.quantity : 0;
  return {
    id: `${modelId}-${quantity}`, modelId, quantity,
    price: unitPrice.kind === 'fixed'
      ? { ...unitPrice, amount: Math.round(Math.round(unitPrice.amount * 100) * quantity * (1 - discountPercent / 100)) / 100 }
      : { kind: 'quote' },
    vatRate: pricing.vatRate, discountPercent, giftQuantity,
  };
}
