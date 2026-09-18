"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-provider";
import { useEnquiryList } from "@/components/product/use-enquiry-list";

const familyOptions = [
  ["bridal-gloves", "facet.bridal-gloves", "Bridal gloves"],
  ["opera-gloves", "facet.opera-gloves", "Opera gloves"],
  ["costume-gloves", "facet.costume-gloves", "Costume gloves"],
  ["kids-dress-gloves", "facet.kids-dress-gloves", "Kids dress gloves"],
  ["wedding-veils", "facet.wedding-veils", "Wedding veils"],
  ["arm-sleeves", "facet.arm-sleeves", "Arm sleeves"],
] as const;

export function LiveRfqForm() {
  const { t } = useLocale();
  const items = useEnquiryList();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setStatus("");
    const payload = { name: fields.get("name"), company: fields.get("company"), country: fields.get("country"), email: fields.get("email"), whatsapp: fields.get("whatsapp"), productFamily: fields.get("productFamily"), quantity: fields.get("quantity"), message: fields.get("message"), consent: fields.get("consent") === "on", website: fields.get("website"), productContext: items };
    const fingerprint = JSON.stringify(payload);
    if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/rfq/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, idempotencyKey: submission.current.id }) });
      await response.json().catch(() => ({}));
      setStatus(response.ok ? t("form.received") : t("form.submitError"));
      if (response.ok) { form.reset(); submission.current = null; }
    } catch {
      setStatus(t("form.serviceError"));
    } finally {
      setBusy(false);
    }
  }

  const control = "mt-2 min-h-12 w-full border border-border bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d2b3f]";
  return <form onSubmit={submit} className="space-y-5 border border-border bg-background p-5 text-foreground sm:p-8"><h3 className="font-serif text-3xl">{t("form.enquiryTitle")}</h3>{items.length > 0 && <p className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? t("form.selectedOne") : t("form.selectedMany")} <Link href="/cart/" className="underline">{t("form.reviewList")}</Link></p>}<div className="grid gap-4 sm:grid-cols-2">{[["name", "form.contactName"], ["company", "form.company"], ["country", "form.country"], ["email", "form.email"]].map(([name, label]) => <label key={name} className="block text-sm">{t(label)}<input required name={name} type={name === "email" ? "email" : "text"} maxLength={name === "email" ? 254 : 200} autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "company" ? "organization" : "country-name"} className={control} /></label>)}</div><label className="block text-sm">{t("form.productFamily")}<select required name="productFamily" defaultValue={items[0]?.family ?? ""} className={control}><option value="" disabled>{t("form.chooseFamily")}</option>{familyOptions.map(([value, key, fallback]) => <option key={value} value={value}>{t(key, fallback)}</option>)}</select></label><label className="block text-sm">{t("form.quantity")}<input required name="quantity" maxLength={100} placeholder={t("form.quantityPlaceholder")} className={control} /></label><label className="block text-sm">{t("form.phone")}<input name="whatsapp" type="tel" maxLength={80} autoComplete="tel" className={control} /></label><label className="block text-sm">{t("form.requirements")}<textarea required name="message" maxLength={6000} placeholder={t("form.requirementsPlaceholder")} rows={4} className={control} /></label><label className="flex items-start gap-3 text-sm leading-6"><input required type="checkbox" name="consent" className="mt-1"/><span>{t("form.consent")} <Link href="/privacy/" className="underline">{t("form.privacy")}</Link>.</span></label><input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button disabled={busy} className="min-h-12 w-full bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">{busy ? t("form.sending") : t("form.send")}</button>{status && <p role="status" className="text-sm leading-6 text-muted-foreground">{status}</p>}</form>;
}
