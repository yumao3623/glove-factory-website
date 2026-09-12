"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { productId: string; productName: string; quantity: number };
export default function CartPage() {
  const [items, setItems] = useState<Item[]>(() => { if (typeof window === "undefined") return []; return JSON.parse(window.localStorage.getItem("jsmeilai-cart") ?? "[]") as Item[]; });
  function update(next: Item[]) { setItems(next); window.localStorage.setItem("jsmeilai-cart", JSON.stringify(next)); }
  return <main id="main-content" className="mx-auto min-h-[60vh] max-w-[1100px] px-5 py-14 sm:px-8 lg:py-24"><p className="section-label text-stone-500">采购清单</p><h1 className="mt-3 font-serif text-5xl">你的询价清单</h1><p className="mt-4 max-w-xl text-stone-600">先保存感兴趣的款式，再提交一个包含数量与定制要求的 B2B 询价。</p>{items.length ? <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">{items.map((item) => <div key={item.productId} className="flex items-center justify-between gap-4 py-5"><div><p className="font-serif text-2xl">{item.productName}</p><p className="mt-1 text-sm text-stone-500">产品编号：{item.productId}</p></div><div className="flex items-center gap-3"><label className="text-sm">数量<input aria-label={`${item.productName} 数量`} type="number" min="1" value={item.quantity} onChange={(e) => update(items.map((current) => current.productId === item.productId ? { ...current, quantity: Math.max(1, Number(e.target.value)) } : current))} className="ml-2 w-16 border border-stone-400 bg-transparent px-2 py-2" /></label><button type="button" onClick={() => update(items.filter((current) => current.productId !== item.productId))} className="text-sm underline">移除</button></div></div>)}</div> : <div className="mt-10 border-y border-stone-300 py-16 text-center"><p className="font-serif text-3xl">清单还是空的</p><Link href="/products/" className="mt-5 inline-block underline">浏览全部产品</Link></div>}{items.length ? <Link href="/contact/#rfq" className="mt-8 inline-flex min-h-11 items-center bg-[#0d2b3f] px-6 text-sm font-medium text-white">带着清单提交询价</Link> : null}</main>;
}
