export type EnquiryItem = { productId: string; productName: string; productSlug?: string; family?: string; quantity: number; color?: string; size?: string; addons?: string[] };
export const enquiryStorageKey = "jsmeilai-cart";
export const enquiryEvent = "jsmeilai:enquiry-list";
export function parseEnquiryList(raw: string): EnquiryItem[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.slice(0, 50).filter(item => item && typeof item.productId === "string" && typeof item.productName === "string").map(item => ({ productId: item.productId.slice(0, 100), productName: item.productName.slice(0, 180), productSlug: typeof item.productSlug === "string" ? item.productSlug.slice(0, 120) : undefined, family: typeof item.family === "string" ? item.family : undefined, quantity: Math.max(1, Math.min(100000, Math.floor(Number(item.quantity) || 1))), color: typeof item.color === "string" ? item.color.slice(0, 80) : undefined, size: typeof item.size === "string" ? item.size.slice(0, 80) : undefined, addons: Array.isArray(item.addons) ? item.addons.filter((v: unknown) => typeof v === "string").slice(0, 10) : [] }));
  } catch { return []; }
}
export function enquiryItemKey(item: EnquiryItem) { return JSON.stringify([item.productId, item.color ?? "", item.size ?? "", [...(item.addons ?? [])].sort()]); }
export function addEnquiryItem(items: EnquiryItem[], item: EnquiryItem): EnquiryItem[] {
  const key = enquiryItemKey(item), existing = items.find(current => enquiryItemKey(current) === key);
  return parseEnquiryList(JSON.stringify(existing ? items.map(current => enquiryItemKey(current) === key ? { ...current, quantity: current.quantity + item.quantity } : current) : [...items, item]));
}
export function readEnquirySnapshot() { try { return window.localStorage.getItem(enquiryStorageKey) ?? "[]"; } catch { return "[]"; } }
export function writeEnquiryList(items: EnquiryItem[]) { window.localStorage.setItem(enquiryStorageKey, JSON.stringify(items)); window.dispatchEvent(new Event(enquiryEvent)); }
