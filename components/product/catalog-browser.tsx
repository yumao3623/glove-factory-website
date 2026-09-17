"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { approvedProductImage } from "@/components/product/approved-product-image";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";
import { displayFamily, displayMeta } from "@/lib/product-display";

type Props = { products: readonly ApprovedCatalogueProduct[] };
type Facet = { key: string; label: string; values: string[] };
const COLOUR_TAXONOMY = ["black", "white", "ivory", "nude", "champagne", "red", "pink", "blue", "green", "purple", "brown", "gold", "silver", "custom"];
const MATERIAL_TAXONOMY = ["satin", "silk", "lace", "tulle", "velvet", "cotton", "mesh"];
const LABELS: Record<string, string> = { black: "Black", white: "White", ivory: "Ivory", nude: "Nude", champagne: "Champagne", red: "Red", pink: "Pink", blue: "Blue", green: "Green", purple: "Purple", brown: "Brown", gold: "Gold", silver: "Silver", custom: "Custom colour", satin: "Satin", silk: "Silk", lace: "Lace", tulle: "Tulle", velvet: "Velvet", cotton: "Cotton", mesh: "Mesh", "full-finger": "Full finger", fingerless: "Fingerless", "half-finger": "Half finger", adult: "Adult", kids: "Kids", mixed: "Mixed" };
const labelFor = (value: string) => LABELS[value.toLowerCase()] ?? value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const normalize = (value: string) => value.trim().toLowerCase();

function valuesFor(products: readonly ApprovedCatalogueProduct[], key: string) {
  if (key === "color") return COLOUR_TAXONOMY;
  if (key === "material") return MATERIAL_TAXONOMY;
  const values = products.flatMap((p) => {
    if (key === "family") return [p.productFamily];
    if (key === "length") return p.length?.status === "CONFIRMED" && p.length.value ? [p.length.value.label] : [];
    if (key === "fingerStyle") return p.fingerStyle?.status === "CONFIRMED" && p.fingerStyle.value ? [p.fingerStyle.value] : [];
    if (key === "occasion") return p.occasion?.status === "CONFIRMED" && p.occasion.value ? p.occasion.value : [];
    if (key === "decoration") return p.decoration?.status === "CONFIRMED" && p.decoration.value ? p.decoration.value : [];
    if (key === "ageGroup") return p.ageGroup?.status === "CONFIRMED" && p.ageGroup.value ? [p.ageGroup.value] : [];
    return [];
  });
  return [...new Set(values)].sort();
}

function availableFor(product: ApprovedCatalogueProduct, key: string): string[] {
  if (key === "family") return [product.productFamily];
  if (key === "material") return product.material.status === "CONFIRMED" && product.material.value ? [product.material.value] : [];
  if (key === "length") return product.length?.status === "CONFIRMED" && product.length.value ? [product.length.value.label] : [];
  if (key === "fingerStyle") return product.fingerStyle?.status === "CONFIRMED" && product.fingerStyle.value ? [product.fingerStyle.value] : [];
  if (key === "color") return product.color?.status === "CONFIRMED" && product.color.value ? product.color.value : [];
  if (key === "occasion") return product.occasion?.status === "CONFIRMED" && product.occasion.value ? product.occasion.value : [];
  if (key === "decoration") return product.decoration?.status === "CONFIRMED" && product.decoration.value ? product.decoration.value : [];
  if (key === "ageGroup") return product.ageGroup?.status === "CONFIRMED" && product.ageGroup.value ? [product.ageGroup.value] : [];
  return [];
}

function matchesFacet(available: string[], pick: string, key: string) {
  const target = normalize(pick);
  return available.some((value) => key === "color" ? normalize(value) === target || normalize(value).includes(target) : normalize(value) === target);
}

export function CatalogBrowser({ products }: Props) {
  const facets: Facet[] = [
    { key: "family", label: "Product family", values: valuesFor(products, "family") },
    { key: "material", label: "Material", values: valuesFor(products, "material") },
    { key: "length", label: "Length", values: valuesFor(products, "length") },
    { key: "fingerStyle", label: "Finger style", values: valuesFor(products, "fingerStyle") },
    { key: "color", label: "Colour", values: valuesFor(products, "color") },
    { key: "occasion", label: "Occasion", values: valuesFor(products, "occasion") },
    { key: "decoration", label: "Decoration", values: valuesFor(products, "decoration") },
    { key: "ageGroup", label: "Age group", values: valuesFor(products, "ageGroup") },
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
  const [search, setSearch] = useState(() => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("search") ?? "");
  const [favorites, setFavorites] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem("jsmeilai-favorites") ?? "[]") as string[]);
  const [recent, setRecent] = useState<string[]>(() => typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem("jsmeilai-recent") ?? "[]") as string[]);
  function toggleFavorite(id: string) { const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]; setFavorites(next); window.localStorage.setItem("jsmeilai-favorites", JSON.stringify(next)); }
  function markRecent(id: string) { const next = [id, ...recent.filter((item) => item !== id)].slice(0, 6); setRecent(next); window.localStorage.setItem("jsmeilai-recent", JSON.stringify(next)); }

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([key, values]) => values.forEach((value) => params.append(key, value)));
    if (search.trim()) params.set("search", search.trim());
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [selected, search]);

  const filtered = useMemo(() => {
    const query = normalize(search);
    const result = products.filter((product) => {
      if (query) {
        const haystack = [product.productName, product.productFamily, product.shortDescription, ...(product.subStyle ?? []), ...(product.color?.value ?? []), product.material.value ?? "", ...(product.occasion?.value ?? []), ...(product.decoration?.value ?? [])].join(" ").toLowerCase();
        if (!query.split(/\s+/).every((term) => haystack.includes(term))) return false;
      }
      return facets.every((facet) => {
      const picks = selected[facet.key] ?? [];
      if (!picks.length) return true;
      return picks.some((pick) => matchesFacet(availableFor(product, facet.key), pick, facet.key));
      });
    });
    return [...result].sort((a, b) => sort === "name" ? a.productName.localeCompare(b.productName) : a.sortOrder - b.sortOrder);
  }, [products, selected, sort, facets, search]);

  function toggle(key: string, value: string) {
    setSelected((current) => {
      const values = current[key] ?? [];
      return { ...current, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
    });
  }
  function clear() { setSelected({}); }
  const active = Object.entries(selected).flatMap(([key, values]) => values.map((value) => ({ key, value })));

  return <section className="bg-[#f7f5f1] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-5">
        <div><p className="section-label text-stone-500">All products</p><h1 className="mt-2 font-serif text-5xl leading-none sm:text-6xl">Find the right gloves for sourcing.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600">Search the approved catalogue, then narrow by family, material, colour, length and occasion.</p></div>
        <div className="flex items-center gap-3 text-sm"><span className="text-stone-600">{filtered.length} products</span><label className="flex items-center gap-2">Sort<select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 border-b border-stone-400 bg-transparent py-2 text-sm"><option value="featured">Featured</option><option value="name">Name</option></select></label></div>
      </div>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center"><label htmlFor="catalogue-search" className="section-label shrink-0 text-stone-600">Search catalogue</label><div className="flex min-h-12 flex-1 items-center border border-stone-400 bg-white px-4 focus-within:border-[#0d2b3f] focus-within:ring-1 focus-within:ring-[#0d2b3f]"><input id="catalogue-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try satin, bridal, black or opera" className="w-full bg-transparent text-base outline-none placeholder:text-stone-400" /><Search size={18} aria-hidden="true" className="text-stone-500" /></div>{search ? <button type="button" onClick={() => setSearch("")} className="min-h-11 px-2 text-sm underline underline-offset-4">Clear search</button> : null}</div>
      <div className="mb-5 flex items-center justify-between lg:hidden"><button type="button" onClick={() => setMobileOpen(true)} className="inline-flex min-h-11 items-center gap-2 border border-stone-400 px-4 text-sm"><SlidersHorizontal size={16} />Filters{active.length ? ` (${active.length})` : ""}</button>{active.length ? <button type="button" onClick={clear} className="text-sm underline">Clear all</button> : null}</div>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className={`${mobileOpen ? "fixed inset-0 z-50 block bg-[#f7f5f1] p-6" : "hidden"} lg:static lg:block lg:p-0`}>
          <div className="mb-5 flex items-center justify-between border-b border-stone-300 pb-4"><h2 className="font-serif text-2xl">Filters</h2><button type="button" onClick={() => setMobileOpen(false)} className="lg:hidden" aria-label="Close filters"><X /></button></div>
          {facets.map((facet) => <fieldset key={facet.key} className="mb-7"><legend className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-stone-600">{facet.label}</legend><div className="space-y-2">{facet.values.map((value) => { const count = products.filter((product) => matchesFacet(availableFor(product, facet.key), value, facet.key)).length; return <label key={value} className="flex cursor-pointer items-center justify-between gap-2 text-sm text-stone-700"><span className="flex items-center gap-2"><input type="checkbox" checked={(selected[facet.key] ?? []).includes(value)} onChange={() => toggle(facet.key, value)} className="h-4 w-4 accent-[#0d2b3f]" />{facet.key === "family" ? labelFor(value).replace("｜", " · ") : labelFor(value)}</span><span className="text-xs text-stone-400">{count}</span></label>; })}</div></fieldset>)}
          <button type="button" onClick={clear} className="text-sm underline underline-offset-4">Clear all</button>
        </aside>
        <div>
          {active.length ? <div className="mb-5 flex flex-wrap gap-2">{active.map((item) => <button key={`${item.key}-${item.value}`} type="button" onClick={() => toggle(item.key, item.value)} className="inline-flex items-center gap-2 border border-stone-400 bg-white px-3 py-2 text-xs">{labelFor(item.value)}<X size={12} /></button>)}</div> : null}
          {recent.length ? <div className="mb-8 border-y border-stone-300 py-5"><p className="section-label text-stone-500">Recently viewed</p><div className="mt-3 flex flex-wrap gap-2">{recent.map((id) => { const item = products.find((product) => product.id === id); return item ? <Link key={id} href={`/products/${item.slug}/`} className="border border-stone-300 bg-white px-3 py-2 text-xs hover:border-[#0d2b3f]">{item.productName}</Link> : null; })}</div></div> : null}
          {filtered.length ? <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">{filtered.slice(0, visibleCount).map((product, index) => { const imageSrc = approvedProductImage(product.primaryImage); return <article key={product.id} className="group"><Link href={`/products/${product.slug}/`} onClick={() => markRecent(product.id)} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]"><div className="relative aspect-[4/5] overflow-hidden bg-stone-200"><button type="button" aria-label={favorites.includes(product.id) ? "Remove from favourites" : "Add to favourites"} onClick={(event) => { event.preventDefault(); toggleFavorite(product.id); }} className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0d2b3f] shadow-sm"><Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button><Image src={imageSrc} alt={product.primaryImage.altText} fill unoptimized={typeof imageSrc === "string"} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority={index === 0} loading={index === 0 ? undefined : "lazy"} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 50vw" /></div><p className="mt-3 text-[10px] uppercase tracking-[.1em] text-stone-500">{displayFamily(product)}</p><h3 className="mt-1 font-serif text-xl leading-tight">{product.productName}</h3><p className="mt-1 text-xs text-stone-600">{displayMeta(product)}</p></Link></article>; })}</div>
            {filtered.length > visibleCount ? <div className="mt-12 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + 16)} className="inline-flex min-h-11 items-center border border-[#0d2b3f] px-6 text-sm font-medium text-[#0d2b3f] hover:bg-[#0d2b3f] hover:text-white">Load more products</button></div> : null}
          </> : <div className="border-y border-stone-300 py-20 text-center"><h2 className="font-serif text-3xl">No matching products</h2><p className="mt-3 text-stone-600">Try removing a filter.</p><button type="button" onClick={clear} className="mt-6 underline">Clear filters</button></div>}
        </div>
      </div>
    </div>
  </section>;
}
