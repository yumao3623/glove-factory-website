"use client";

import { ArrowRightIcon, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { getProductRfqContext } from "@/data/product-rfq-context";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";
import { getSeoProductDescription } from "@/data/seo-editorial";
import { displayFamily } from "@/lib/product-display";
import { LocalizedText } from "@/components/i18n/localized-text";

const favoriteKey = "jsmeilai-favorites";
const favoriteDataKey = "jsmeilai-favorites-data";

export function ProductCard({ product }: { product: ApprovedCatalogueProduct }) {
  const rfqContext = getProductRfqContext(product);
  const [saved, setSaved] = useState(() => { try { return typeof window !== "undefined" && (JSON.parse(window.localStorage.getItem(favoriteKey) ?? "[]") as string[]).includes(product.id); } catch { return false; } });
  function toggleSaved() {
    try {
      const ids = JSON.parse(window.localStorage.getItem(favoriteKey) ?? "[]") as string[];
      const next = ids.includes(product.id) ? ids.filter((id) => id !== product.id) : [...ids, product.id];
      const data = JSON.parse(window.localStorage.getItem(favoriteDataKey) ?? "[]") as Array<{ id: string; name: string; slug: string }>;
      const nextData = data.some((item) => item.id === product.id) ? data.filter((item) => item.id !== product.id) : [...data, { id: product.id, name: product.productName, slug: product.slug }];
      window.localStorage.setItem(favoriteKey, JSON.stringify(next)); window.localStorage.setItem(favoriteDataKey, JSON.stringify(nextData)); window.dispatchEvent(new Event("jsmeilai:favorites")); setSaved(!saved);
    } catch { /* the catalogue remains usable when storage is unavailable */ }
  }
  return <article className="group relative" data-product-id={rfqContext.productId} data-product-slug={rfqContext.slug} data-product-family={rfqContext.family} data-product-name={rfqContext.approvedDisplayName} data-source-route={rfqContext.sourceRoute}>
    <Link href={`/products/${product.slug}/`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]">
      <div className="relative aspect-[4/5] overflow-hidden bg-white"><EditorialImage src={approvedProductImage(product.primaryImage)} alt={product.primaryImage.altText} className="h-full w-full" imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 50vw" /></div>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[.09em] text-stone-500">{displayFamily(product)}</p><h3 className="mt-1 font-serif text-[1.35rem] leading-[1.08] text-[#0d2b3f]">{product.productName}</h3><p className="mt-2 text-xs leading-5 text-stone-600">{getSeoProductDescription(product)}</p>
    </Link><button type="button" onClick={toggleSaved} aria-label={saved ? "Remove from saved products" : "Save product"} className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#0d2b3f] shadow-sm"><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>
    <div className="mt-4 flex flex-wrap gap-3 text-sm"><Link href={`/products/${product.slug}/`} className="inline-flex min-h-10 items-center gap-2 border border-[#0d2b3f] px-3 text-[#0d2b3f] hover:bg-[#0d2b3f] hover:text-white"><LocalizedText k="product.viewDetails" fallback="View product details" /><ArrowRightIcon size={15} /></Link><a href={`/contact/?family=${encodeURIComponent(product.productFamily)}&product=${encodeURIComponent(product.productName)}#rfq`} className="inline-flex min-h-10 items-center underline underline-offset-4"><LocalizedText k="product.discuss" fallback="Enquire" /></a></div>
  </article>;
}
