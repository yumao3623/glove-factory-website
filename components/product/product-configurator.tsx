"use client";

import { useState } from "react";
import Link from "next/link";
import { addEnquiryItem, parseEnquiryList, readEnquirySnapshot, writeEnquiryList } from "@/lib/enquiry-list";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export function ProductConfigurator({ product }: { product: ApprovedCatalogueProduct }) {
  const colors = product.color?.status === "CONFIRMED" ? product.color.value ?? [] : [];
  const sizes = product.size?.status === "CONFIRMED" ? product.size.value ?? [] : [];
  const [color, setColor] = useState(colors[0] ?? "To be confirmed");
  const [size, setSize] = useState(sizes[0] ?? "To be confirmed");
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const addonOptions = ["Custom packaging", "Brand logo", "Colour sample", "Size sample"];
  function toggleAddon(addon: string) { setAddons((current) => current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]); }
  function addToCart() {
    try {
      writeEnquiryList(addEnquiryItem(parseEnquiryList(readEnquirySnapshot()), { productId: product.id, productName: product.productName, productSlug: product.slug, family: product.productFamily, quantity, color, size, addons }));
    } catch { setError("Your browser could not save this list. Please allow local storage."); return; }
    setAdded(true);
  }
  return <div className="mt-8 border-y border-stone-300 py-6">
    {colors.length ? <fieldset><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">Colour <span className="font-normal normal-case tracking-normal text-stone-500">{color}</span></legend><div className="mt-3 flex flex-wrap gap-2">{colors.map((value) => <button key={value} type="button" onClick={() => setColor(value)} aria-pressed={color === value} className={`min-h-9 border px-3 text-xs ${color === value ? "border-[#0d2b3f] bg-[#0d2b3f] text-white" : "border-stone-400 bg-white text-stone-700"}`}>{value}</button>)}</div></fieldset> : null}
    {sizes.length ? <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">Size</legend><div className="mt-3 flex flex-wrap gap-2">{sizes.map((value) => <button key={value} type="button" onClick={() => setSize(value)} aria-pressed={size === value} className={`min-h-9 border px-3 text-xs ${size === value ? "border-[#0d2b3f] bg-[#0d2b3f] text-white" : "border-stone-400 bg-white text-stone-700"}`}>{value}</button>)}</div></fieldset> : null}
    <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">Optional services (select all that apply)</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{addonOptions.map((addon) => <label key={addon} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={addons.includes(addon)} onChange={() => toggleAddon(addon)} className="h-4 w-4 accent-[#0d2b3f]" />{addon}</label>)}</div></fieldset>
    {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    <div className="mt-6 flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 text-sm">Quantity<input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(100000, Math.floor(Number(e.target.value) || 1))))} className="w-16 border border-stone-400 bg-transparent px-2 py-2" /></label><button type="button" onClick={addToCart} className="inline-flex min-h-11 items-center bg-[#0d2b3f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#173f59]">{added ? "Added to enquiry list" : "Add to enquiry list"}</button>{added ? <Link href="/cart/" className="text-sm underline">View list</Link> : null}</div>
  </div>;
}
