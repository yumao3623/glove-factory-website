"use client";

import { FormEvent, useEffect, useState } from "react";

type Product = { id: string; name: string };
type Stock = { quantity: number; reserved: number };
type Variant = { id: string; product_id: string; sku: string; color: string | null; size: string | null; retail_price_minor: number | null; wholesale_price_minor: number | null; currency: string; active: boolean; inventory?: Stock | Stock[] | null };
const empty = { id: null as string | null, product_id: "", sku: "", color: "", size: "", retail: "", wholesale: "", currency: "USD", quantity: "0", reserved: "0", active: true };
const control = "mt-1 w-full border border-stone-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0d2b3f]";
const stockOf = (variant: Variant) => (Array.isArray(variant.inventory) ? variant.inventory[0] : variant.inventory) ?? { quantity: 0, reserved: 0 };

async function readRecords(signal?: AbortSignal) {
  const responses = await Promise.all([fetch("/api/admin/products/", { cache: "no-store", signal }), fetch("/api/admin/variants/", { cache: "no-store", signal })]);
  if (responses.some(response => !response.ok)) throw new Error("Unable to load products and stock. Check your session and try again.");
  const [products, variants] = await Promise.all(responses.map(response => response.json()));
  return { products: (products.data ?? []) as Product[], variants: (variants.data ?? []) as Variant[] };
}

export function VariantForm() {
  const [records, setRecords] = useState<{ products: Product[]; variants: Variant[] }>({ products: [], variants: [] });
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const refresh = () => readRecords(controller.signal).then(data => {
      setRecords(data);
      setForm(current => ({ ...current, product_id: current.product_id || data.products[0]?.id || "" }));
    }).catch(error => { if (!controller.signal.aborted) setMessage(error.message); });
    void refresh();
    window.addEventListener("jsmeilai:products-updated", refresh);
    return () => { controller.abort(); window.removeEventListener("jsmeilai:products-updated", refresh); };
  }, []);
  function edit(variant: Variant) {
    const stock = stockOf(variant);
    setForm({ id: variant.id, product_id: variant.product_id, sku: variant.sku, color: variant.color ?? "", size: variant.size ?? "", retail: variant.retail_price_minor == null ? "" : String(variant.retail_price_minor / 100), wholesale: variant.wholesale_price_minor == null ? "" : String(variant.wholesale_price_minor / 100), currency: variant.currency, quantity: String(stock.quantity), reserved: String(stock.reserved), active: variant.active });
    setMessage("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    const quantity = Number(form.quantity), reserved = Number(form.reserved);
    if (!form.product_id || !Number.isInteger(quantity) || !Number.isInteger(reserved) || quantity < 0 || reserved < 0 || reserved > quantity) { setMessage("Choose a product and valid whole-number stock values. Reserved stock cannot exceed quantity."); return; }
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/variants/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id, product_id: form.product_id, sku: form.sku, color: form.color, size: form.size, retail_price_minor: form.retail === "" ? null : Math.round(Number(form.retail) * 100), wholesale_price_minor: form.wholesale === "" ? null : Math.round(Number(form.wholesale) * 100), currency: form.currency, active: form.active, quantity, reserved }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to save variant.");
      setRecords(await readRecords()); setForm({ ...empty, product_id: form.product_id }); setMessage("Variant and stock saved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to reach the stock service."); }
    finally { setBusy(false); }
  }
  const set = (key: keyof typeof empty, value: string | boolean) => setForm(current => ({ ...current, [key]: value }));
  return <section className="mt-10 grid gap-8 border border-stone-200 bg-white p-6">
    <div><p className="section-label text-stone-500">Inventory</p><h2 className="mt-2 font-serif text-3xl text-[#0d2b3f]">Variants and stock</h2><p className="mt-3 text-sm text-stone-600">Leave a price blank if it needs a quote. Enter only confirmed stock.</p></div>
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm sm:col-span-2">Product<select required value={form.product_id} onChange={event => set("product_id", event.target.value)} className={control}><option value="" disabled>Choose a saved product</option>{records.products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
      {([['sku', 'SKU'], ['color', 'Colour'], ['size', 'Size'], ['retail', `Retail price (${form.currency})`], ['wholesale', `Wholesale price (${form.currency})`], ['quantity', 'Quantity'], ['reserved', 'Reserved']] as const).map(([key, label]) => <label key={key} className="text-sm">{label}<input required={key === 'sku' || key === 'quantity' || key === 'reserved'} type={['retail', 'wholesale', 'quantity', 'reserved'].includes(key) ? 'number' : 'text'} min="0" step={key === 'retail' || key === 'wholesale' ? '0.01' : '1'} value={form[key]} onChange={event => set(key, event.target.value)} className={control} /></label>)}
      <label className="text-sm">Currency<select value={form.currency} onChange={event => set("currency", event.target.value)} className={control}>{['USD', 'EUR', 'GBP', 'CNY'].map(currency => <option key={currency}>{currency}</option>)}</select></label>
      <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={form.active} onChange={event => set("active", event.target.checked)} />Active variant</label>
      <div className="flex gap-4 sm:col-span-2"><button disabled={busy || !records.products.length} className="w-fit bg-[#0d2b3f] px-5 py-3 text-sm text-white disabled:opacity-50">{busy ? 'Saving…' : form.id ? 'Save variant' : 'Add variant'}</button>{form.id && <button type="button" onClick={() => setForm({ ...empty, product_id: form.product_id })} className="text-sm underline">Cancel editing</button>}</div>
      {message && <p className="text-sm text-stone-600 sm:col-span-2" role="status">{message}</p>}
    </form>
    <div className="divide-y divide-stone-200 border-y border-stone-200">{records.variants.map(variant => <button type="button" key={variant.id} onClick={() => edit(variant)} className="flex w-full items-center justify-between gap-4 py-3 text-left hover:bg-stone-50"><span><strong className="font-medium text-[#0d2b3f]">{variant.sku}</strong><span className="ml-3 text-sm text-stone-600">{variant.color} {variant.size}</span></span><span className="text-xs text-stone-500">Edit · {variant.currency} · stock {stockOf(variant).quantity}</span></button>)}</div>
  </section>;
}
