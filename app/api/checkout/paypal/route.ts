import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/commerce/paypal-rest";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

const orderIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
type OrderRow = { id: string; currency: string; subtotal_minor: number; tax_minor: number; shipping_minor: number; total_minor: number; payment_status: string };
type OrderItemRow = { name: string; quantity: number; unit_price_minor: number };

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { orderId?: string };
  if (!body.orderId || !orderIdPattern.test(body.orderId)) return NextResponse.json({ error: "A server-side confirmed quote is required before PayPal checkout." }, { status: 400 });
  const [orderResult, itemResult] = await Promise.all([
    supabaseRest<OrderRow[]>(`orders?select=id,currency,subtotal_minor,tax_minor,shipping_minor,total_minor,payment_status&id=eq.${encodeURIComponent(body.orderId)}`, {}, true),
    supabaseRest<OrderItemRow[]>(`order_items?select=name,quantity,unit_price_minor&order_id=eq.${encodeURIComponent(body.orderId)}&order=id.asc`, {}, true),
  ]);
  if (orderResult.error || itemResult.error) return NextResponse.json({ configured: orderResult.configured && itemResult.configured, error: "The server could not load the confirmed quote." }, { status: orderResult.configured && itemResult.configured ? 502 : 503 });
  const order = orderResult.data?.[0];
  const items = itemResult.data ?? [];
  const currency = order?.currency?.toUpperCase();
  const itemTotal = items.reduce((sum, item) => sum + Number(item.unit_price_minor) * Number(item.quantity), 0);
  if (!order || order.payment_status !== "pending" || !items.length || !currency || !/^[A-Z]{3}$/.test(currency) || itemTotal !== Number(order.subtotal_minor) || Number(order.total_minor) !== Number(order.subtotal_minor) + Number(order.tax_minor) + Number(order.shipping_minor)) {
    return NextResponse.json({ error: "A current, server-side confirmed quote is required before PayPal checkout." }, { status: 409 });
  }
  const lines = items.map((item) => ({ name: String(item.name ?? ""), quantity: Number(item.quantity), unitAmountMinor: Number(item.unit_price_minor), currency }));
  const result = await createPayPalOrder({ orderId: body.orderId, lines, totalMinor: Number(order.total_minor), shippingMinor: Number(order.shipping_minor), taxMinor: Number(order.tax_minor) });
  return NextResponse.json(result, { status: result.error ? (result.configured ? 502 : 503) : 201 });
}
