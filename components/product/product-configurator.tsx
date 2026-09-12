"use client";

import { useState } from "react";
import Link from "next/link";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export function ProductConfigurator({ product }: { product: ApprovedCatalogueProduct }) {
  const colors = product.color?.status === "CONFIRMED" ? product.color.value ?? [] : [];
  const sizes = product.size?.status === "CONFIRMED" ? product.size.value ?? [] : [];
  const [color, setColor] = useState(colors[0] ?? "待确认");
  const [size, setSize] = useState(sizes[0] ?? "待确认");
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const addonOptions = ["定制包装", "品牌 Logo", "颜色确认样", "尺寸打样"];
  function toggleAddon(addon: string) { setAddons((current) => current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]); }
  function addToCart() {
    const current = JSON.parse(window.localStorage.getItem("jsmeilai-cart") ?? "[]") as Array<Record<string, unknown>>;
    current.push({ productId: product.id, productName: product.productName, quantity, color, size, addons });
    window.localStorage.setItem("jsmeilai-cart", JSON.stringify(current));
    setAdded(true);
  }
  return <div className="mt-8 border-y border-stone-300 py-6">
    {colors.length ? <fieldset><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">颜色 <span className="font-normal normal-case tracking-normal text-stone-500">{color}</span></legend><div className="mt-3 flex flex-wrap gap-2">{colors.map((value) => <button key={value} type="button" onClick={() => setColor(value)} aria-pressed={color === value} className={`min-h-9 border px-3 text-xs ${color === value ? "border-[#0d2b3f] bg-[#0d2b3f] text-white" : "border-stone-400 bg-white text-stone-700"}`}>{value}</button>)}</div></fieldset> : null}
    {sizes.length ? <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">尺寸</legend><div className="mt-3 flex flex-wrap gap-2">{sizes.map((value) => <button key={value} type="button" onClick={() => setSize(value)} aria-pressed={size === value} className={`min-h-9 border px-3 text-xs ${size === value ? "border-[#0d2b3f] bg-[#0d2b3f] text-white" : "border-stone-400 bg-white text-stone-700"}`}>{value}</button>)}</div></fieldset> : null}
    <fieldset className="mt-5"><legend className="text-xs font-semibold uppercase tracking-[.12em] text-stone-600">可选服务（可多选）</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{addonOptions.map((addon) => <label key={addon} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={addons.includes(addon)} onChange={() => toggleAddon(addon)} className="h-4 w-4 accent-[#0d2b3f]" />{addon}</label>)}</div></fieldset>
    <div className="mt-6 flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 text-sm">数量<input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className="w-16 border border-stone-400 bg-transparent px-2 py-2" /></label><button type="button" onClick={addToCart} className="inline-flex min-h-11 items-center bg-[#0d2b3f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#173f59]">{added ? "已加入询价清单" : "加入询价清单"}</button>{added ? <Link href="/cart/" className="text-sm underline">查看清单</Link> : null}</div>
  </div>;
}
