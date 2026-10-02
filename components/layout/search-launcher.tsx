"use client";

import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/i18n/locale-provider";

const quickLinks = [
  ["nav.bridalGloves", "/bridal-gloves/"],
  ["nav.operaGloves", "/opera-gloves/"],
  ["nav.costumeGloves", "/costume-gloves/"],
  ["nav.veils", "/wedding-veils/"],
] as const;

export function SearchLauncher({ open, onOpenChange, onCloseFocus }: { open: boolean; onOpenChange: (open: boolean) => void; onCloseFocus: () => void }) {
  const { t } = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Trigger asChild><button type="button" aria-label={t("nav.search")} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#0d2b3f] transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]"><Search size={18} strokeWidth={1.7} /></button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#0d2b3f]/35" />
      <Dialog.Content onOpenAutoFocus={event => { event.preventDefault(); inputRef.current?.focus(); }} onCloseAutoFocus={event => { event.preventDefault(); onCloseFocus(); }} className="fixed left-1/2 top-6 z-[71] max-h-[calc(100dvh-3rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 overflow-y-auto border border-stone-300 bg-[#f7f5f1] p-5 shadow-2xl sm:top-16 sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="section-label text-stone-500">JS Meilai</p><Dialog.Title className="mt-2 font-serif text-3xl text-[#0d2b3f]">{t("search.title")}</Dialog.Title><Dialog.Description className="mt-2 text-sm text-stone-600">{t("search.help")}</Dialog.Description></div><Dialog.Close asChild><button type="button" aria-label={t("ui.close")} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-stone-300 bg-white text-[#0d2b3f]"><X size={18} /></button></Dialog.Close></div>
        <form action="/products/" method="get" className="mt-7 flex min-h-14 items-center border border-[#0d2b3f] bg-white px-4 focus-within:ring-2 focus-within:ring-[#0d2b3f]/25"><input ref={inputRef} name="search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("catalog.placeholder", "Try satin, bridal, black or opera")} className="w-full bg-transparent text-base outline-none placeholder:text-stone-400" /><button type="submit" aria-label={t("nav.search")} className="inline-flex min-h-10 min-w-10 items-center justify-center bg-[#0d2b3f] text-white"><Search size={17} /></button></form>
        <div className="mt-7"><p className="section-label text-stone-500">{t("search.browse")}</p><div className="mt-3 flex flex-wrap gap-2">{quickLinks.map(([label, href]) => <button key={href} type="button" onClick={() => { onOpenChange(false); router.push(href); }} className="min-h-10 border border-stone-300 bg-white px-3 text-sm text-stone-700 transition-colors hover:border-[#0d2b3f] hover:text-[#0d2b3f]">{t(label)}</button>)}</div></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
