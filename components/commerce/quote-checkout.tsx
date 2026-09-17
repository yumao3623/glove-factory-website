"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Quote = { id: string; currency: string; subtotal_minor: number; tax_minor: number; shipping_minor: number; total_minor: number; quote_terms: string; quote_expires_at: string; quote_status: string; payment_status: string; payable: boolean; items: Array<{ name: string; quantity: number; unit_price_minor: number }> };
export function QuoteCheckout({ orderId }: { orderId: string }) {
  const [quote, setQuote] = useState<Quote | null>(null); const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState("Loading your quote…"); const [accepted, setAccepted] = useState(false); const [busy, setBusy] = useState(false);
  useEffect(() => {
    const access = new URLSearchParams(window.location.hash.slice(1)).get("access");
    // Keep the fragment through React's development double-effect; remove after verification.
    fetch("/api/checkout/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, access }) })
      .then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d; })
      .then(d => { setQuote(d.quote); setEnabled(d.paymentsEnabled); setMessage(new URLSearchParams(window.location.search).has("cancelled") ? "Payment was cancelled. Your quote is still available." : ""); window.history.replaceState(null, "", window.location.pathname); })
      .catch(error => setMessage(error.message));
  }, [orderId]);
  async function pay() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/checkout/paypal/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, acceptedTerms: accepted }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      window.location.assign(data.approvalUrl);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Payment could not be started."); setBusy(false); }
  }
  const money = (minor: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: quote?.currency ?? "USD" }).format(minor / 100);
  return <div className="mt-8 max-w-3xl">{message && <p role="status" className="mb-5 border-l-2 border-[#0d2b3f] bg-stone-100 p-4 text-sm">{message}</p>}{quote && <div className="border border-stone-200 bg-white p-5 sm:p-8"><div className="flex flex-wrap justify-between gap-3"><p className="text-sm text-stone-600">Quote {quote.id.slice(0, 8)}</p><p className="text-sm text-stone-600">{quote.payment_status === "paid" ? "Paid" : `Valid until ${new Date(quote.quote_expires_at).toLocaleDateString("en-US", { timeZone: "UTC" })}`}</p></div><div className="my-6 divide-y border-y border-stone-200">{quote.items.map((item, i) => <div key={i} className="flex justify-between gap-4 py-4 text-sm"><span>{item.name}<span className="mt-1 block text-stone-500">{item.quantity} × {money(item.unit_price_minor)}</span></span><strong className="shrink-0 font-medium">{money(item.quantity * item.unit_price_minor)}</strong></div>)}</div><dl className="ml-auto grid max-w-xs grid-cols-2 gap-3 text-sm"><dt>Subtotal</dt><dd className="text-right">{money(quote.subtotal_minor)}</dd><dt>Shipping</dt><dd className="text-right">{money(quote.shipping_minor)}</dd><dt>Tax</dt><dd className="text-right">{money(quote.tax_minor)}</dd><dt className="font-semibold">Total</dt><dd className="text-right font-semibold">{money(quote.total_minor)}</dd></dl><h2 className="mt-8 font-serif text-2xl text-[#0d2b3f]">Agreed order details</h2><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-stone-600">{quote.quote_terms}</p>{quote.payment_status === "paid" ? <p className="mt-6 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">Payment confirmed. Our team will follow up on production and delivery.</p> : !quote.payable ? <p className="mt-6 text-sm">This quote has expired or is no longer payable. Contact us for an updated quote.</p> : enabled ? <><label className="mt-6 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1" />I have reviewed the products, quantities, production, shipping and tax terms above.</label><button onClick={() => void pay()} disabled={!accepted || busy} className="mt-5 min-h-12 bg-[#0d2b3f] px-6 py-3 text-sm text-white disabled:opacity-50">{busy ? "Opening PayPal…" : "Continue to PayPal"}</button></> : <p className="mt-6 border border-stone-200 bg-stone-50 p-4 text-sm leading-6">Online payment is not available yet. Please contact our team to discuss this quote. No payment has been taken.</p>}</div>}<Link href="/contact/" className="mt-6 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Contact our team</Link></div>;
}

export function PayPalReturn({ orderId, paypalOrderId }: { orderId: string; paypalOrderId: string }) {
  const [message, setMessage] = useState("Confirming your payment with PayPal…"); const [paid, setPaid] = useState(false);
  useEffect(() => {
    fetch("/api/checkout/paypal/capture/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, paypalOrderId }) })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error); return data; })
      .then(data => { setPaid(data.paid === true); setMessage(data.paid ? "Your payment is confirmed. Thank you." : data.message ?? "Payment confirmation is pending. Please contact us before trying again."); })
      .catch(error => setMessage(error.message));
  }, [orderId, paypalOrderId]);
  return <div className="mt-8 max-w-xl border border-stone-200 bg-white p-6"><p role="status" className="text-sm leading-7">{message}</p><Link href={paid ? `/checkout/quote/${orderId}/` : "/contact/"} className="mt-5 inline-flex min-h-11 items-center text-sm underline">{paid ? "View your order" : "Contact our team"}</Link></div>;
}
