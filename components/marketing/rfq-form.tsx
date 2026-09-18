"use client";

import { useLocale } from "@/components/i18n/locale-provider";

export function RfqForm() {
  const { t } = useLocale();
  return <div className="border border-border bg-background p-5 text-foreground sm:p-8"><h3 className="font-serif text-3xl">{t("form.offlineTitle", "Enquiries are offline in this preview")}</h3><p className="mt-3 leading-7 text-muted-foreground">{t("form.offlineCopy", "This stakeholder preview collects no names, contact details or project information. Nothing is transmitted or stored.")}</p></div>;
}
