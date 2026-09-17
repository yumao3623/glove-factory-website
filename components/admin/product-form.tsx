"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

type Product = { id: string; slug: string; name: string; family: string; material: string | null; length_cm: number | null; finger_style: string | null; colors: string[]; description: string | null; image_urls: string[]; sub_style?: string[]; occasion?: string[]; decoration?: string[]; age_group?: string | null; customizable_fields?: string[]; featured?: boolean; sort_order?: number; status: "draft" | "active" | "archived" };
const empty = { slug: "", name: "", family: "bridal-gloves", material: "", length_cm: null as number | null, finger_style: "", colors: [] as string[], sub_style: [] as string[], occasion: [] as string[], decoration: [] as string[], age_group: "", customizable_fields: [] as string[], description: "", image_urls: [] as string[], featured: false, sort_order: 9999 };
const inputClass = "mt-1 w-full border border-stone-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0d2b3f]";
const families = ["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"];
const preview = (path: string) => `/api/admin/media/preview/?path=${encodeURIComponent(path)}`;

export function ProductForm() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<Product | null>(null);
  const [review, setReview] = useState<Product | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key: string, value: unknown) => setForm(current => ({ ...current, [key]: value }));
  async function load() {
    const response = await fetch("/api/admin/products/", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to load products.");
    setItems(Array.isArray(data.data) ? data.data : []);
  }
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/products/", { cache: "no-store", signal: controller.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Unable to load products."); return data; })
      .then(data => setItems(Array.isArray(data.data) ? data.data : []))
      .catch(error => { if (!controller.signal.aborted) setMessage(error.message); });
    return () => controller.abort();
  }, []);
  function edit(product: Product) {
    setEditing(product);
    setForm({ slug: product.slug, name: product.name, family: product.family, material: product.material ?? "", length_cm: product.length_cm, finger_style: product.finger_style ?? "", colors: product.colors ?? [], sub_style: product.sub_style ?? [], occasion: product.occasion ?? [], decoration: product.decoration ?? [], age_group: product.age_group ?? "", customizable_fields: product.customizable_fields ?? [], description: product.description ?? "", image_urls: product.image_urls ?? [], featured: product.featured ?? false, sort_order: product.sort_order ?? 9999 });
    setReview(null); setReviewed(false); setMessage("");
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch(editing ? `/api/admin/products/${editing.id}/` : "/api/admin/products/", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: "draft" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to save product.");
      setEditing(null); setForm({ ...empty }); setReview(null);
      await load(); window.dispatchEvent(new Event("jsmeilai:products-updated"));
      setMessage("Draft saved. Review the saved details before publishing.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save product."); }
    finally { setBusy(false); }
  }
  async function upload(file: File) {
    setBusy(true); setMessage("");
    try {
      const body = new FormData(); body.set("file", file);
      const response = await fetch("/api/admin/media/", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Upload failed.");
      setForm(current => ({ ...current, image_urls: [...current.image_urls, data.path] }));
      setMessage("Image uploaded. Save the draft to attach it.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  }
  async function publish() {
    if (!review || !reviewed) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/products/${review.id}/publish/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reviewed: true }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to publish product.");
      setReview(null); setReviewed(false); await load(); setMessage("Product published to the catalogue.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to publish product."); }
    finally { setBusy(false); }
  }
  async function archive(product: Product) {
    setBusy(true);
    try { const response = await fetch(`/api/admin/products/${product.id}/`, { method: "DELETE" }); if (!response.ok) throw new Error("Unable to archive product."); await load(); setMessage("Product archived. You can edit it to restore a draft."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to archive product."); }
    finally { setBusy(false); }
  }
  return <div className="mt-10">
    {message && <p role="status" className="mb-5 border-l-2 border-[#0d2b3f] bg-stone-100 p-4 text-sm text-stone-700">{message}</p>}
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <form onSubmit={submit} className="grid content-start gap-4 border border-stone-200 bg-white p-6">
        <div className="flex justify-between gap-4"><div><p className="section-label text-stone-500">{editing ? "Edit product" : "New draft"}</p><h2 className="mt-2 font-serif text-3xl text-[#0d2b3f]">Product details</h2></div>{editing && <button type="button" onClick={() => { setEditing(null); setForm({ ...empty }); }} className="self-start text-xs underline">Cancel</button>}</div>
        {editing?.status === "active" && <p className="text-sm text-stone-600">Saving changes moves this product to draft until you publish it again.</p>}
        {([['name', 'Product name'], ['slug', 'Slug'], ['material', 'Material']] as const).map(([key, label]) => <label key={key} className="text-sm">{label}<input required={key !== 'material'} value={form[key]} onChange={event => set(key, event.target.value)} className={inputClass} /></label>)}
        <label className="text-sm">Family<select value={form.family} onChange={event => set("family", event.target.value)} className={inputClass}>{families.map(family => <option key={family} value={family}>{family.replaceAll("-", " ")}</option>)}</select></label>
        <label className="text-sm">Finger style<select value={form.finger_style} onChange={event => set("finger_style", event.target.value)} className={inputClass}>{["", "full-finger", "fingerless", "half-finger", "not-applicable"].map(style => <option key={style} value={style}>{style.replaceAll("-", " ") || "To confirm"}</option>)}</select></label>
        <label className="text-sm">Length (cm)<input type="number" min="0" max="300" value={form.length_cm ?? ""} onChange={event => set("length_cm", event.target.value ? Number(event.target.value) : null)} className={inputClass} /></label>
        <label className="text-sm">Colours (separate with commas)<input value={form.colors.join(", ")} onChange={event => set("colors", event.target.value.split(",").map(value => value.trim()).filter(Boolean))} className={inputClass} /></label>
        {([['sub_style', 'Style tags'], ['occasion', 'Occasions'], ['decoration', 'Decoration'], ['customizable_fields', 'Customisation fields']] as const).map(([key, label]) => <label key={key} className="text-sm">{label}<input value={form[key].join(", ")} onChange={event => set(key, event.target.value.split(",").map(value => value.trim()).filter(Boolean))} className={inputClass} placeholder="Separate values with commas" /></label>)}
        <label className="text-sm">Age group<select value={form.age_group} onChange={event => set("age_group", event.target.value)} className={inputClass}>{["", "adult", "kids", "mixed"].map(value => <option key={value} value={value}>{value || "To confirm"}</option>)}</select></label>
        <label className="text-sm">Description<textarea rows={4} value={form.description} onChange={event => set("description", event.target.value)} className={inputClass} /></label>
        <div className="grid gap-3 sm:grid-cols-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={event => set("featured", event.target.checked)} />Featured in catalogue</label><label className="text-sm">Sort order<input type="number" min="0" step="1" value={form.sort_order} onChange={event => set("sort_order", Number(event.target.value))} className={inputClass} /></label></div>
        <label className="text-sm">Upload product image<span className="mt-1 block text-xs text-stone-500">JPEG, PNG or WebP. Maximum 5 MB.</span><input disabled={busy} type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }} className="mt-2 block w-full text-sm" /></label>
        <div className="grid grid-cols-3 gap-3">{form.image_urls.map(path => <div key={path}><a href={preview(path)} target="_blank" rel="noreferrer" className="relative block aspect-[4/5] bg-stone-100"><Image src={preview(path)} alt="Product draft" fill unoptimized className="object-contain" /></a><button type="button" onClick={() => set("image_urls", form.image_urls.filter(value => value !== path))} className="mt-2 text-xs underline">Remove from draft</button></div>)}</div>
        <button disabled={busy} className="w-fit bg-[#0d2b3f] px-5 py-3 text-sm text-white disabled:opacity-50">{busy ? "Please wait…" : "Save draft"}</button>
      </form>
      <section><div className="flex items-end justify-between border-b border-stone-300 pb-4"><h2 className="font-serif text-3xl text-[#0d2b3f]">Catalogue</h2><span className="text-sm text-stone-500">{items.length} products</span></div>
        {review && <div className="my-5 border border-stone-300 bg-stone-50 p-5"><h3 className="font-serif text-2xl">Review: {review.name}</h3><p className="mt-3 text-sm leading-6">{review.description || "Add a description before publishing."}</p><p className="mt-2 text-sm text-stone-600">{review.family.replaceAll("-", " ")} · {review.material || "Material to confirm"} · {review.image_urls.length} images</p><div className="mt-4 flex gap-2">{review.image_urls.map(path => <a key={path} href={preview(path)} target="_blank" rel="noreferrer" className="relative block h-24 w-20 bg-white"><Image src={preview(path)} alt={review.name} fill unoptimized className="object-contain" /></a>)}</div><label className="mt-4 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} className="mt-1" />I have reviewed these details and have permission to use the images.</label><button type="button" disabled={!reviewed || busy} onClick={() => void publish()} className="mt-4 bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">Publish product</button></div>}
        <div className="divide-y divide-stone-200">{items.map(product => <article key={product.id} className="py-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl text-[#0d2b3f]">{product.name}</h3><p className="mt-1 text-xs uppercase tracking-wide text-stone-500">{product.family.replaceAll("-", " ")} · {product.status}</p></div><button type="button" disabled={busy} onClick={() => edit(product)} className="border border-[#0d2b3f] px-3 py-2 text-xs">Edit</button></div><div className="mt-3 flex flex-wrap gap-4 text-xs">{product.status === "draft" && <button type="button" onClick={() => { setReview(product); setReviewed(false); }} className="underline">Review and publish</button>}{product.status === "active" && <a href={`/products/${product.slug}/`} className="underline">View product</a>}{product.status !== "archived" && <button type="button" disabled={busy} onClick={() => void archive(product)} className="text-stone-500 underline">Archive</button>}</div></article>)}{!items.length && <p className="py-12 text-sm text-stone-600">No products yet. Save your first draft using the form.</p>}</div>
      </section>
    </div>
  </div>;
}
