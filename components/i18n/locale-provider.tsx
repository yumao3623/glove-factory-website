"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isLocale, localeList, translate, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "jsmeilai-locale";
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; t: (key: string, fallback?: string) => string } | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const browser = window.navigator.language;
  return localeList.find((locale) => browser.toLowerCase() === locale.toLowerCase() || browser.toLowerCase().startsWith(`${locale.split("-")[0].toLowerCase()}-`)) ?? "en";
}

export function LocaleProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const timer = window.setTimeout(() => setLocaleState(initialLocale()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale: setLocaleState, t: (key: string, fallback?: string) => translate(locale, key, fallback) }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
