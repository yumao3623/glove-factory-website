"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { provisionalBrandDisplay } from "@/lib/site-identity";

const menus = [
  { label: "Shop", links: [["全部产品", "/products/"], ["婚礼手套", "/bridal-gloves/"], ["Opera｜晚礼服", "/opera-gloves/"], ["舞台与服装", "/costume-gloves/"], ["儿童礼服", "/kids-dress-gloves/"], ["婚礼头纱", "/wedding-veils/"], ["袖套｜场合配饰", "/arm-sleeves/"]] },
  { label: "Bespoke", links: [["OEM｜ODM", "/custom-manufacturing/"], ["私人品牌", "/custom-manufacturing/#private-label"], ["材料与色彩", "/guides/materials/"], ["打样与包装", "/custom-manufacturing/#sampling"]] },
  { label: "Factory", links: [["工厂能力", "/factory/"], ["质量流程", "/factory/#quality"], ["联系我们", "/contact/"]] },
  { label: "Guides", links: [["尺寸测量", "/guides/size-guide/"], ["材料词典", "/guides/materials/"], ["采购说明", "/factory/#sourcing"]] },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  return <>
    <div className="bg-[#0d2b3f] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[.14em] text-white">Handmade glove directions for global buyers · Wholesale &amp; OEM enquiries welcome</div>
    <header className="sticky top-0 z-40 border-b border-[#c9ced0] bg-[#f5f6f5]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="font-serif text-[1.7rem] leading-none tracking-tight text-[#0d2b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]">{provisionalBrandDisplay}</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {menus.map((menu) => <div key={menu.label} className="relative" onMouseEnter={() => setOpen(menu.label)} onMouseLeave={() => setOpen(null)}><button type="button" onClick={() => setOpen(open === menu.label ? null : menu.label)} className="inline-flex min-h-11 items-center gap-1 px-4 py-3 text-[11px] font-medium uppercase tracking-[.1em] text-stone-700 hover:text-[#0d2b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]">{menu.label}<span aria-hidden="true" className="text-stone-400">⌄</span></button>{open === menu.label ? <div className="absolute left-0 top-full z-50 min-w-56 border border-stone-200 bg-[#f5f6f5] p-3 shadow-[0_18px_50px_rgba(13,43,63,.12)]">{menu.links.map(([label, href]) => <Link key={`${menu.label}-${href}`} href={href} onClick={() => setOpen(null)} className="block px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-100 hover:text-[#0d2b3f]">{label}</Link>)}</div> : null}</div>)}
        </nav>
        <div className="hidden items-center gap-1 lg:flex"><Link href="/products/?search=" aria-label="搜索" className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><Search size={18} strokeWidth={1.6} /></Link><Link href="/account/" aria-label="账户" className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><UserRound size={18} strokeWidth={1.6} /></Link><Link href="/cart/" aria-label="询价清单" className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><ShoppingBag size={18} strokeWidth={1.6} /></Link></div>
        <Sheet><SheetTrigger asChild><button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] lg:hidden" aria-label="打开导航"><Menu size={22} /></button></SheetTrigger><SheetContent side="right" className="w-[min(88vw,380px)] bg-[#f5f6f5]"><SheetHeader><SheetTitle className="font-serif text-3xl text-[#0d2b3f]">探索产品</SheetTitle><SheetDescription>按产品族、材料与采购服务浏览。</SheetDescription></SheetHeader><nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-5 pb-8">{menus.flatMap((menu) => [<p key={`${menu.label}-label`} className="mt-5 border-b border-stone-300 pb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-stone-500">{menu.label}</p>, ...menu.links.map(([label, href]) => <SheetClose key={`${menu.label}-${href}`} asChild><Link href={href} className="min-h-11 px-2 py-3 text-base text-stone-800 hover:bg-stone-100">{label}</Link></SheetClose>)])}<SheetClose asChild><Link href="/cart/" className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#0d2b3f] px-4 py-3 text-sm font-medium text-white">打开询价清单</Link></SheetClose></nav></SheetContent></Sheet>
      </div>
    </header>
  </>;
}
