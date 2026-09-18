"use client";

import { localeLabels, localeList } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  return <label className={`inline-flex items-center gap-2 text-xs ${compact ? "" : "border border-stone-300 bg-white px-2"}`}>
    <span className="sr-only">{t("language.select")}</span>
    <span aria-hidden="true" className="text-stone-500">{t("language.label")}</span>
    <select aria-label={t("language.select")} value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} className="min-h-10 border-0 bg-transparent py-2 pr-1 text-xs font-medium outline-none">
      {localeList.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
    </select>
  </label>;
}
