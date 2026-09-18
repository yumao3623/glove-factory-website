"use client";

import { useLocale } from "./locale-provider";

export function LocalizedText({ k, fallback }: { k: string; fallback?: string }) {
  const { t } = useLocale();
  return <>{t(k, fallback)}</>;
}
