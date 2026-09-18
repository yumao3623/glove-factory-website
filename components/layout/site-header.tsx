"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLocale } from "@/components/i18n/locale-provider";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { provisionalBrandDisplay } from "@/lib/site-identity";

const menus = [
  { key: "shop", links: [["nav.allProducts", "/products/"], ["nav.bridalGloves", "/bridal-gloves/"], ["nav.operaGloves", "/opera-gloves/"], ["nav.costumeGloves", "/costume-gloves/"], ["nav.kidsGloves", "/kids-dress-gloves/"], ["nav.veils", "/wedding-veils/"], ["nav.armSleeves", "/arm-sleeves/"]] },
  { key: "bespoke", links: [["nav.oem", "/custom-manufacturing/"], ["nav.privateLabel", "/custom-manufacturing/#private-label"], ["nav.materialsColours", "/guides/materials/"], ["nav.samplingPackaging", "/custom-manufacturing/#sampling"]] },
  { key: "factory", links: [["nav.factoryCapabilities", "/factory/"], ["nav.qualityProcess", "/factory/#quality"], ["nav.contact", "/contact/"]] },
  { key: "guides", links: [["nav.measuringGuide", "/guides/size-guide/"], ["nav.materialGuide", "/guides/materials/"], ["nav.sourcingNotes", "/factory/#sourcing"]] },
] as const;

export function SiteHeader() {
  const { t } = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const notices = [t("announcement.1"), t("announcement.2"), t("announcement.3")];
  return <>
    <div className="announcement-bar" aria-label="Site announcements">
      <p className="sr-only">{notices.join(" • ")}</p>
      <div className="announcement-track" aria-hidden="true">
        {[...notices, ...notices].map((notice, index) => <span key={`${notice}-${index}`} className="announcement-item">{notice}<span className="announcement-dot" aria-hidden="true">•</span></span>)}
      </div>
    </div>
    <header className="sticky top-0 z-40 border-b border-[#c9ced0] bg-[#f5f6f5]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="font-serif text-[1.7rem] leading-none tracking-tight text-[#0d2b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]">{provisionalBrandDisplay}</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {menus.map((menu) => <div key={menu.key} className="relative" onMouseEnter={() => setOpen(menu.key)} onMouseLeave={() => setOpen(null)}><button type="button" onClick={() => setOpen(open === menu.key ? null : menu.key)} className="inline-flex min-h-11 items-center gap-1 px-4 py-3 text-[11px] font-medium uppercase tracking-[.1em] text-stone-700 hover:text-[#0d2b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]">{t(`menu.${menu.key}`)}<span aria-hidden="true" className="text-stone-400">⌄</span></button>{open === menu.key ? <div className="absolute left-0 top-full z-50 min-w-56 border border-stone-200 bg-[#f5f6f5] p-3 shadow-[0_18px_50px_rgba(13,43,63,.12)]">{menu.links.map(([label, href]) => <Link key={`${menu.key}-${href}`} href={href} onClick={() => setOpen(null)} className="block px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-100 hover:text-[#0d2b3f]">{t(label)}</Link>)}</div> : null}</div>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex"><LanguageSwitcher compact /><Link href="/products/?search=" aria-label={t("nav.search")} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><Search size={18} strokeWidth={1.6} /></Link><Link href="/account/" aria-label={t("nav.account")} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><UserRound size={18} strokeWidth={1.6} /></Link><Link href="/cart/" aria-label={t("nav.enquiryList")} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] hover:bg-stone-100"><ShoppingBag size={18} strokeWidth={1.6} /></Link></div>
        <Sheet><SheetTrigger asChild><button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] lg:hidden" aria-label={t("nav.open")}><Menu size={22} /></button></SheetTrigger><SheetContent side="right" className="w-[min(88vw,380px)] bg-[#f5f6f5]"><SheetHeader><SheetTitle className="font-serif text-3xl text-[#0d2b3f]">{t("nav.exploreProducts")}</SheetTitle><SheetDescription>{t("nav.browseDescription")}</SheetDescription></SheetHeader><nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-5 pb-8"><div className="mb-2"><LanguageSwitcher /></div><div className="grid grid-cols-3 gap-2 border-y border-stone-300 py-3"><SheetClose asChild><Link href="/products/?search=" className="inline-flex min-h-11 items-center justify-center border border-stone-300 bg-white px-2 text-xs font-medium">{t("nav.search")}</Link></SheetClose><SheetClose asChild><Link href="/account/" className="inline-flex min-h-11 items-center justify-center border border-stone-300 bg-white px-2 text-xs font-medium">{t("nav.account")}</Link></SheetClose><SheetClose asChild><Link href="/cart/" className="inline-flex min-h-11 items-center justify-center border border-stone-300 bg-white px-2 text-xs font-medium">{t("nav.enquiryList")}</Link></SheetClose></div>{menus.flatMap((menu) => [<p key={`${menu.key}-label`} className="mt-5 border-b border-stone-300 pb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-stone-500">{t(`menu.${menu.key}`)}</p>, ...menu.links.map(([label, href]) => <SheetClose key={`${menu.key}-${href}`} asChild><Link href={href} className="min-h-11 px-2 py-3 text-base text-stone-800 hover:bg-stone-100">{t(label)}</Link></SheetClose>)])}</nav></SheetContent></Sheet>
      </div>
    </header>
  </>;
}
