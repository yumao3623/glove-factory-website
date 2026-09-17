"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Order = { id: string; fulfillment_status: string; payment_status: string; quote_status: string; currency: string; total_minor: number; created_at: string; order_items?: Array<{ id: string; name: string; quantity: number }> };
export function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null); const [error, setError] = useState("");
  useEffect(() => { const controller = new AbortController(); fetch("/api/account/orders/", { credentials: "same-origin", signal: controller.signal }).then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Unable to load orders."); return data; }).then(data => setOrders(data.data)).catch(error => { if (!controller.signal.aborted) setError(error.message); }); return () => controller.abort(); }, []);
  if (error) return <p role="status" className="mt-8 border border-stone-200 p-6 text-sm">{error} <Link href="/account/" className="underline">Your account</Link></p>;
  if (orders === null) return <p className="mt-8 text-sm text-stone-500">Loading order history…</p>;
  if (!orders.length) return <p className="mt-8 border border-stone-200 bg-white p-6 text-sm text-stone-600">No orders or quotes are available for this account yet.</p>;
  return <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">{orders.map(order => <article key={order.id} className="py-5"><div className="flex flex-wrap justify-between gap-4"><h2 className="font-serif text-2xl text-[#0d2b3f]">Order {order.id.slice(0, 8)}</h2><span className="text-xs uppercase tracking-wide text-stone-500">{order.quote_status} · {order.payment_status} · {order.fulfillment_status}</span></div><p className="mt-2 text-sm text-stone-600">{order.order_items?.map(item => `${item.name} × ${item.quantity}`).join(", ")}</p><p className="mt-2 text-sm text-stone-500">{new Intl.NumberFormat("en-US", { style: "currency", currency: order.currency }).format(order.total_minor / 100)} · {new Date(order.created_at).toLocaleDateString("en-US")}</p>{order.quote_status !== "draft" && <Link href={`/checkout/quote/${order.id}/`} className="mt-3 inline-flex min-h-11 items-center text-sm underline">View quote and order details</Link>}</article>)}</div>;
}
