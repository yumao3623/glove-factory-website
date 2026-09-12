"use client";

import { useState } from "react";
import Link from "next/link";

export function LocalCartButton({ productId, productName }: { productId: string; productName: string }) {
  const [added, setAdded] = useState(false);
  function add() {
    const current = JSON.parse(window.localStorage.getItem("jsmeilai-cart") ?? "[]") as Array<{ productId: string; productName: string; quantity: number }>;
    const existing = current.find((item) => item.productId === productId);
    if (existing) existing.quantity += 1;
    else current.push({ productId, productName, quantity: 1 });
    window.localStorage.setItem("jsmeilai-cart", JSON.stringify(current));
    setAdded(true);
  }
  return <div className="flex flex-wrap gap-3"><button type="button" onClick={add} className="inline-flex min-h-11 items-center bg-[#0d2b3f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#173f59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f] focus-visible:ring-offset-2">{added ? "已加入询价清单" : "加入询价清单"}</button>{added ? <Link href="/cart/" className="inline-flex min-h-11 items-center border border-[#0d2b3f] px-5 text-sm font-medium text-[#0d2b3f]">查看清单</Link> : null}</div>;
}
