"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal, X } from "lucide-react";
import { approvedProductImage } from "@/components/product/approved-product-image";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";
import { displayFamily, displayMeta } from "@/lib/product-display";

type Props = { products: readonly ApprovedCatalogueProduct[] };
type Facet = { key: string; label: string; values: string[] };

function valuesFor(products: readonly ApprovedCatalogueProduct[], key: string) {
  const values = products.flatMap((p) => {
    if (key === "family") return [p.productFamily];
    if (key === "material") return p.material.status === "CONFIRMED" && p.material.value ? [p.material.value] : [];
    if (key === "length") return p.length?.status === "CONFIRMED" && p.length.value ? [p.length.value.label] : [];
    if (key === "fingerStyle") return p.fingerStyle?.status === "CONFIRMED" && p.fingerStyle.value ? [p.fingerStyle.value] : [];
    if (key === "color") return p.color?.status === "CONFIRMED" && p.color.value ? p.color.value : [];
    return [];
  });
  return [...new Set(values)].sort();
}

export function CatalogBrowser({ products }: Props) {
  const facets: Facet[] = [
    { key: "family", label: "产品类别", values: valuesFor(products, "family") },
    { key: "material", label: "材料", values: valuesFor(products, "material") },
    { key: "length", label: "长度", values: valuesFor(products, "length") },
    { key: "fingerStyle", label: "指型", values: valuesFor(products, "fingerStyle") },
    { key: "color", label: "颜色", values: valuesFor(products, "color") },
  ].filter((facet) => facet.values.length > 0);
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const restored: Record<string, string[]> = {};
    facets.forEach((facet) => {
      const values = params.getAll(facet.key).filter((value) => facet.values.includes(value));
      if (values.length) restored[facet.key] = values;
    });
    return restored;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(16);
  const [favorites, setFavorites] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem("jsmeilai-favorites") ?? "[]") as string[]);
  const [recent, setRecent] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem("jsmeilai-recent") ?? "[]") as string[]);
  function toggleFavorite(id: string) { const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]; setFavorites(next); window.localStorage.setItem("jsmeilai-favorites", JSON.stringify(next)); }
  function markRecent(id: string) { const next = [id, ...recent.filter((item) => item !== id)].slice(0, 6); setRecent(next); window.localStorage.setItem("jsmeilai-recent", JSON.stringify(next)); }

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([key, values]) => values.forEach((value) => params.append(key, value)));
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [selected]);

  const filtered = useMemo(() => {
    const result = products.filter((product) => facets.every((facet) => {
      const picks = selected[facet.key] ?? [];
      if (!picks.length) return true;
      const available = facet.key === "family" ? [product.productFamily]
        : facet.key === "material" ? [product.material.value]
        : facet.key === "length" ? [product.length?.value?.label]
        : facet.key === "fingerStyle" ? [product.fingerStyle?.value]
        : product.color?.value ?? [];
      return picks.some((pick) => available.map(String).includes(pick));
    }));
    return [...result].sort((a, b) => sort === "name" ? a.productName.localeCompare(b.productName) : a.sortOrder - b.sortOrder);
  }, [products, selected, sort, facets]);

  function toggle(key: string, value: string) {
    setSelected((current) => {
      const values = current[key] ?? [];
      return { ...current, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
    });
  }
  function clear() { setSelected({}); }
  const active = Object.values(selected).flat();

  return <section className="bg-[#f7f5f1] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-5">
        <div><p className="section-label text-stone-500">全部产品</p><h1 className="mt-2 font-serif text-5xl leading-none sm:text-6xl">为采购找到合适的手套。</h1></div>
        <div className="flex items-center gap-3 text-sm"><span className="text-stone-600">{filtered.length} 个产品</span><label className="flex items-center gap-2">排序<select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 border-b border-stone-400 bg-transparent py-2 text-sm"><option value="featured">精选</option><option value="name">名称</option></select></label></div>
      </div>
      <div className="mb-5 flex items-center justify-between lg:hidden"><button type="button" onClick={() => setMobileOpen(true)} className="inline-flex min-h-11 items-center gap-2 border border-stone-400 px-4 text-sm"><SlidersHorizontal size={16} />筛选{active.length ? ` (${active.length})` : ""}</button>{active.length ? <button type="button" onClick={clear} className="text-sm underline">清除全部</button> : null}</div>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className={`${mobileOpen ? "fixed inset-0 z-50 block bg-[#f7f5f1] p-6" : "hidden"} lg:static lg:block lg:p-0`}>
          <div className="mb-5 flex items-center justify-between border-b border-stone-300 pb-4"><h2 className="font-serif text-2xl">筛选</h2><button type="button" onClick={() => setMobileOpen(false)} className="lg:hidden" aria-label="关闭筛选"><X /></button></div>
          {facets.map((facet) => <fieldset key={facet.key} className="mb-7"><legend className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-stone-600">{facet.label}</legend><div className="space-y-2">{facet.values.map((value) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-stone-700"><input type="checkbox" checked={(selected[facet.key] ?? []).includes(value)} onChange={() => toggle(facet.key, value)} className="h-4 w-4 accent-[#0d2b3f]" />{value}</label>)}</div></fieldset>)}
          <button type="button" onClick={clear} className="text-sm underline underline-offset-4">清除全部</button>
        </aside>
        <div>
          {active.length ? <div className="mb-5 flex flex-wrap gap-2">{active.map((item) => <button key={item} type="button" onClick={() => { const facet = facets.find((f) => f.values.includes(item)); if (facet) toggle(facet.key, item); }} className="inline-flex items-center gap-2 border border-stone-400 bg-white px-3 py-2 text-xs">{item}<X size={12} /></button>)}</div> : null}
          {recent.length ? <div className="mb-8 border-y border-stone-300 py-5"><p className="section-label text-stone-500">最近浏览</p><div className="mt-3 flex flex-wrap gap-2">{recent.map((id) => { const item = products.find((product) => product.id === id); return item ? <Link key={id} href={`/products/${item.slug}/`} className="border border-stone-300 bg-white px-3 py-2 text-xs hover:border-[#0d2b3f]">{item.productName}</Link> : null; })}</div></div> : null}
          {filtered.length ? <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">{filtered.slice(0, visibleCount).map((product, index) => <article key={product.id} className="group"><Link href={`/products/${product.slug}/`} onClick={() => markRecent(product.id)} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]"><div className="relative aspect-[4/5] overflow-hidden bg-stone-200"><button type="button" aria-label={favorites.includes(product.id) ? "取消收藏" : "加入收藏"} onClick={(event) => { event.preventDefault(); toggleFavorite(product.id); }} className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-[#0d2b3f] shadow-sm">{favorites.includes(product.id) ? "♥" : "♡"}</button><Image src={approvedProductImage(product.primaryImage)} alt={product.primaryImage.altText} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority={index === 0} loading={index === 0 ? undefined : "lazy"} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 50vw" /></div><p className="mt-3 text-[10px] uppercase tracking-[.1em] text-stone-500">{displayFamily(product)}</p><h3 className="mt-1 font-serif text-xl leading-tight">{product.productName}</h3><p className="mt-1 text-xs text-stone-600">{displayMeta(product)}</p></Link></article>)}</div>
            {filtered.length > visibleCount ? <div className="mt-12 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + 16)} className="inline-flex min-h-11 items-center border border-[#0d2b3f] px-6 text-sm font-medium text-[#0d2b3f] hover:bg-[#0d2b3f] hover:text-white">加载更多产品</button></div> : null}
          </> : <div className="border-y border-stone-300 py-20 text-center"><h2 className="font-serif text-3xl">没有匹配的产品</h2><p className="mt-3 text-stone-600">尝试移除一个筛选条件。</p><button type="button" onClick={clear} className="mt-6 underline">清除筛选</button></div>}
        </div>
      </div>
    </div>
  </section>;
}
