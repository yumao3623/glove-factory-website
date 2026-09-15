"use client";
import Link from "next/link";
import { useState } from "react";
import { useEnquiryList } from "@/components/product/use-enquiry-list";
import { enquiryItemKey, writeEnquiryList, type EnquiryItem } from "@/lib/enquiry-list";
export default function CartPage() {
  const items = useEnquiryList();
  const [error, setError] = useState("");
  function update(next: EnquiryItem[]) { try { writeEnquiryList(next); setError(""); } catch { setError("Your browser could not save the list. Please allow local storage and try again."); } }
  return <main id="main-content" className="mx-auto min-h-[60vh] max-w-[1100px] px-5 py-14 sm:px-8 lg:py-24">
    <p className="section-label text-stone-500">Enquiry list</p><h1 className="mt-3 font-serif text-5xl">Your enquiry list</h1><p className="mt-4 max-w-xl text-stone-600">Compare styles and send the quantities, colours and custom details you need.</p>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {items.length ? <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">{items.map(item => { const key = enquiryItemKey(item); return <div key={key} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-serif text-2xl">{item.productSlug ? <Link href={`/products/${item.productSlug}/`} className="hover:underline">{item.productName}</Link> : item.productName}</p><p className="mt-2 text-sm text-stone-600">{[item.color, item.size, ...(item.addons ?? [])].filter(Boolean).join(" · ")}</p></div><div className="flex items-center gap-4"><label className="text-sm">Quantity<input aria-label={`${item.productName} quantity`} type="number" min="1" max="100000" value={item.quantity} onChange={event => update(items.map(current => enquiryItemKey(current) === key ? { ...current, quantity: Math.max(1, Math.min(100000, Math.floor(Number(event.target.value) || 1))) } : current))} className="ml-2 w-24 border border-stone-400 bg-transparent px-2 py-2" /></label><button type="button" onClick={() => update(items.filter(current => enquiryItemKey(current) !== key))} className="text-sm underline">Remove</button></div></div>; })}</div> : <div className="mt-10 border-y border-stone-300 py-16 text-center"><p className="font-serif text-3xl">Your list is empty</p><Link href="/products/" className="mt-5 inline-block underline">Browse all products</Link></div>}
    {items.length > 0 && <Link href="/contact/?from=list#rfq" className="mt-8 inline-flex min-h-11 items-center bg-[#0d2b3f] px-6 text-sm font-medium text-white">Send enquiry with this list</Link>}
  </main>;
}
