import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { getCommerceConfig } from "@/lib/commerce/config";
import { validEmail } from "@/lib/commerce/auth";

export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const quoteCurrencies = ["USD", "EUR", "GBP", "AUD", "CAD"];
export type QuoteItem = { name: string; sku: string; quantity: number; unit_price_minor: number };
export type QuoteOrder = { id: string; buyer_email: string; customer_id: string | null; currency: string; subtotal_minor: number; shipping_minor: number; tax_minor: number; total_minor: number; quote_status: string; quote_expires_at: string; quote_terms: string; quote_access_hash: string; payment_status: string; fulfillment_status: string; paypal_order_id: string | null; paypal_capture_id: string | null; order_items: QuoteItem[] };
export const hashAccess = (value: string) => createHash("sha256").update(value).digest("hex");

export function validateQuote(input: Record<string, unknown>) {
  const errors: string[] = [];
  const lines = Array.isArray(input.items) ? input.items as QuoteItem[] : [];
  if (!validEmail(input.buyerEmail)) errors.push("A buyer email is required.");
  if (!quoteCurrencies.includes(String(input.currency))) errors.push("Choose a supported quote currency.");
  if (typeof input.terms !== "string" || input.terms.trim().length < 20 || input.terms.length > 6000) errors.push("Confirm specifications, MOQ/stock, production, delivery and tax terms.");
  if (input.commercialReview !== true) errors.push("Review all commercial terms before issuing a quote.");
  const expires = Date.parse(String(input.expiresAt));
  if (!Number.isFinite(expires) || expires <= Date.now() || expires > Date.now() + 90 * 86400000) errors.push("Choose an expiry within the next 90 days.");
  if (input.rfqId && !uuidPattern.test(String(input.rfqId))) errors.push("Invalid enquiry reference.");
  if (!lines.length || lines.length > 50 || lines.some(item => !item || typeof item.name !== "string" || item.name.trim().length < 2 || item.name.length > 180 || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000000 || !Number.isSafeInteger(item.unit_price_minor) || item.unit_price_minor < 1 || typeof item.sku !== "string" || item.sku.length > 100)) errors.push("Each line needs a name, quantity and confirmed unit price.");
  const subtotal = lines.reduce((sum, item) => sum + Number(item?.quantity) * Number(item?.unit_price_minor), 0);
  const shipping = input.shippingMinor; const tax = input.taxMinor;
  if (![shipping, tax].every(value => typeof value === "number" && Number.isSafeInteger(value) && value >= 0)) errors.push("Confirm shipping and tax, including zero values.");
  const total = subtotal + Number(shipping) + Number(tax);
  if (!Number.isSafeInteger(total) || total < 1 || total > 100000000) errors.push("Quote total is invalid or exceeds the supported limit.");
  return { errors, lines, subtotal, total };
}

export function isPayableQuote(order: QuoteOrder, now = Date.now()) {
  const subtotal = order.order_items.reduce((sum, item) => sum + item.quantity * item.unit_price_minor, 0);
  return order.quote_status === "approved" && order.payment_status === "pending" && order.fulfillment_status !== "cancelled" && Date.parse(order.quote_expires_at) > now && quoteCurrencies.includes(order.currency) && order.order_items.length > 0 && subtotal === order.subtotal_minor && subtotal + order.shipping_minor + order.tax_minor === order.total_minor && order.total_minor > 0;
}

export async function authorizedQuote(id: string, suppliedAccess?: string): Promise<QuoteOrder | null> {
  if (!uuidPattern.test(id)) return null;
  const result = await supabaseRest<QuoteOrder[]>(`orders?select=*,order_items(name,sku,quantity,unit_price_minor)&id=eq.${id}`, {}, true);
  if (result.error) throw new Error("Quote service unavailable.");
  const order = result.data?.[0]; if (!order) return null;
  const cookieStore = await cookies();
  const saved = cookieStore.get("sm_quote_access")?.value;
  const access = suppliedAccess ?? (saved?.startsWith(`${id}.`) ? saved.slice(37) : undefined);
  if (access && /^[a-f0-9]{64}$/.test(access) && /^[a-f0-9]{64}$/.test(order.quote_access_hash ?? "") && timingSafeEqual(Buffer.from(hashAccess(access), "hex"), Buffer.from(order.quote_access_hash, "hex"))) return order;
  const token = cookieStore.get("sm_access_token")?.value;
  const c = getCommerceConfig();
  if (!token || !c.supabaseUrl || !c.supabaseAnonKey) return null;
  const response = await fetch(`${c.supabaseUrl}/auth/v1/user`, { headers: { apikey: c.supabaseAnonKey, Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) return null;
  const user = await response.json();
  return user.email_confirmed_at && (order.customer_id === user.id || user.email?.toLowerCase() === order.buyer_email?.toLowerCase()) ? order : null;
}

export function publicQuote(order: QuoteOrder) {
  const safe = order;
  // Explicitly enumerate; do not leak future database columns or internal notes.
  return { id: safe.id, currency: safe.currency, subtotal_minor: safe.subtotal_minor, shipping_minor: safe.shipping_minor, tax_minor: safe.tax_minor, total_minor: safe.total_minor, quote_status: safe.quote_status, payment_status: safe.payment_status, quote_expires_at: safe.quote_expires_at, quote_terms: safe.quote_terms, items: safe.order_items, payable: isPayableQuote(order) };
}
