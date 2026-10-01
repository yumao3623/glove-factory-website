"use client";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useEnquiryList } from "@/components/product/use-enquiry-list";
import { enquiryItemKey, writeEnquiryList, type EnquiryItem } from "@/lib/enquiry-list";
import { useLocale } from "@/components/i18n/locale-provider";
type SavedProduct = { id: string; name: string; slug: string };
const favoriteDataKey = "jsmeilai-favorites-data";
const savedSnapshot = () => typeof window === "undefined" ? "[]" : window.localStorage.getItem(favoriteDataKey) ?? "[]";
const subscribeSaved = (notify: () => void) => { window.addEventListener("storage", notify); window.addEventListener("jsmeilai:favorites", notify); return () => { window.removeEventListener("storage", notify); window.removeEventListener("jsmeilai:favorites", notify); }; };
export default function CartPage() {
  const { t } = useLocale();
  const items = useEnquiryList();
  const [error, setError] = useState("");
  const savedRaw = useSyncExternalStore(subscribeSaved, savedSnapshot, () => "[]");
  let saved: SavedProduct[] = [];
  try { saved = JSON.parse(savedRaw) as SavedProduct[]; } catch { saved = []; }
  function update(next: EnquiryItem[]) { try { writeEnquiryList(next); setError(""); } catch { setError(t("storage.error")); } }
  return <main id="main-content" className="mx-auto min-h-[60vh] max-w-[1100px] px-5 py-14 sm:px-8 lg:py-24">
    <p className="section-label text-stone-500">{t("list.title")}</p><h1 className="mt-3 font-serif text-5xl">{t("list.title")}</h1><p className="mt-4 max-w-xl text-stone-600">{t("list.intro")}</p>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {items.length ? <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">{items.map(item => { const key = enquiryItemKey(item); const editHref = `/products/${item.productSlug}/?edit=${encodeURIComponent(key)}#enquiry-options`; return <div key={key} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-serif text-2xl">{item.productSlug ? <Link href={editHref} className="hover:underline">{item.productName}</Link> : item.productName}</p><p className="mt-2 text-sm text-stone-600">{[item.color, item.size, ...(item.addons ?? [])].filter(Boolean).join(" · ") || "Options to discuss"}</p></div><div className="flex flex-wrap items-center gap-4">{item.productSlug && <Link href={editHref} className="text-sm underline">{t("list.edit")}</Link>}<label className="text-sm">{t("product.quantity")}<input aria-label={`${item.productName} ${t("product.quantity")}`} type="number" min="1" max="100000" value={item.quantity} onChange={event => update(items.map(current => enquiryItemKey(current) === key ? { ...current, quantity: Math.max(1, Math.min(100000, Math.floor(Number(event.target.value) || 1))) } : current))} className="ml-2 w-24 border border-stone-400 bg-transparent px-2 py-2" /></label><button type="button" onClick={() => update(items.filter(current => enquiryItemKey(current) !== key))} className="text-sm underline">{t("list.remove")}</button></div></div>; })}</div> : <div className="mt-10 border-y border-stone-300 py-16 text-center"><p className="font-serif text-3xl">{t("list.empty")}</p><Link href="/products/" className="mt-5 inline-block underline">{t("nav.allProducts")}</Link></div>}
    {items.length > 0 && <Link href="/contact/?from=list#rfq" className="mt-8 inline-flex min-h-11 items-center bg-[#0d2b3f] px-6 text-sm font-medium text-white">{t("list.send")}</Link>}
    <section id="saved-products" className="mt-16 border-t border-stone-300 pt-10"><h2 className="font-serif text-3xl">{t("saved.title")}</h2><p className="mt-3 text-sm leading-6 text-stone-600">{t("saved.note")}</p>{saved.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{saved.map(item => <article key={item.id} className="flex items-center justify-between gap-4 border border-stone-200 bg-white p-4"><Link href={`/products/${item.slug}/`} className="font-serif text-xl hover:underline">{item.name}</Link><button type="button" onClick={() => { const next = saved.filter(current => current.id !== item.id); window.localStorage.setItem(favoriteDataKey, JSON.stringify(next)); window.localStorage.setItem("jsmeilai-favorites", JSON.stringify(next.map(current => current.id))); window.dispatchEvent(new Event("jsmeilai:favorites")); }} className="shrink-0 text-sm underline">{t("list.remove")}</button></article>)}</div> : <p className="mt-6 border border-stone-200 bg-white p-5 text-sm text-stone-600">{t("saved.empty")}</p>}</section>
  </main>;
}
