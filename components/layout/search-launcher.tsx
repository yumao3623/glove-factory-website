"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/i18n/locale-provider";

const quickLinks = [
  ["nav.bridalGloves", "/bridal-gloves/"],
  ["nav.operaGloves", "/opera-gloves/"],
  ["nav.costumeGloves", "/costume-gloves/"],
  ["nav.veils", "/wedding-veils/"],
] as const;

export function SearchLauncher() {
  const { t } = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return <>
    <button type="button" aria-label={t("nav.search")} onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]"><Search size={18} strokeWidth={1.7} /></button>
    {open ? <div className="fixed inset-0 z-[70] bg-[#0d2b3f]/35 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={t("nav.search")}>
      <div className="mx-auto mt-2 max-w-3xl border border-stone-300 bg-[#f7f5f1] p-5 shadow-2xl sm:mt-10 sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="section-label text-stone-500">JS Meilai</p><h2 className="mt-2 font-serif text-3xl text-[#0d2b3f]">{t("search.title")}</h2><p className="mt-2 text-sm text-stone-600">{t("search.help")}</p></div><button type="button" onClick={() => setOpen(false)} aria-label={t("ui.close")} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-stone-300 bg-white text-[#0d2b3f]"><X size={18} /></button></div>
        <form action="/products/" method="get" className="mt-7 flex min-h-14 items-center border border-[#0d2b3f] bg-white px-4 focus-within:ring-2 focus-within:ring-[#0d2b3f]/25"><input ref={inputRef} name="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("catalog.placeholder", "Try satin, bridal, black or opera")} className="w-full bg-transparent text-base outline-none placeholder:text-stone-400" /><button type="submit" aria-label={t("nav.search")} className="inline-flex min-h-10 min-w-10 items-center justify-center bg-[#0d2b3f] text-white"><Search size={17} /></button></form>
        <div className="mt-7"><p className="section-label text-stone-500">{t("search.browse")}</p><div className="mt-3 flex flex-wrap gap-2">{quickLinks.map(([label, href]) => <button key={href} type="button" onClick={() => { setOpen(false); router.push(href); }} className="min-h-10 border border-stone-300 bg-white px-3 text-sm text-stone-700 transition-colors hover:border-[#0d2b3f] hover:text-[#0d2b3f]">{t(label)}</button>)}</div></div>
      </div>
    </div> : null}
  </>;
}
