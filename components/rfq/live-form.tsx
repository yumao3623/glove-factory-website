"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useEnquiryList } from "@/components/product/use-enquiry-list";

export function LiveRfqForm() {
  const items = useEnquiryList(); const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const fields = new FormData(form); setBusy(true); setStatus("");
    const payload = { name: fields.get("name"), company: fields.get("company"), country: fields.get("country"), email: fields.get("email"), whatsapp: fields.get("whatsapp"), productFamily: fields.get("productFamily"), quantity: fields.get("quantity"), message: fields.get("message"), consent: fields.get("consent") === "on", website: fields.get("website"), productContext: items };
    const fingerprint = JSON.stringify(payload);
    if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/rfq/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, idempotencyKey: submission.current.id }) });
      const data = await response.json().catch(() => ({}));
      setStatus(data.message ?? (response.ok ? "Enquiry received." : "Unable to submit your enquiry."));
      if (response.ok) { form.reset(); submission.current = null; }
    } catch { setStatus("Unable to reach the enquiry service. Please try again; your current submission will not be duplicated."); }
    finally { setBusy(false); }
  }
  const control = "mt-2 min-h-12 w-full border border-border bg-background px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d2b3f]";
  return <form onSubmit={submit} className="space-y-5 border border-border bg-background p-5 text-foreground sm:p-8"><h3 className="font-serif text-3xl">Request a wholesale quote</h3>{items.length > 0 && <p className="text-sm text-muted-foreground">{items.length} selected {items.length === 1 ? "style" : "styles"} will be included in your enquiry. <Link href="/cart/" className="underline">Review list</Link></p>}<div className="grid gap-4 sm:grid-cols-2">{[["name", "Contact name"], ["company", "Company"], ["country", "Country"], ["email", "Business email"]].map(([name, label]) => <label key={name} className="block text-sm">{label}<input required name={name} type={name === "email" ? "email" : "text"} maxLength={name === "email" ? 254 : 200} autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "company" ? "organization" : "country-name"} className={control} /></label>)}</div><label className="block text-sm">Product family<select required name="productFamily" defaultValue={items[0]?.family ?? ""} className={control}><option value="" disabled>Choose a family</option>{[["bridal-gloves", "Bridal gloves"], ["opera-gloves", "Opera gloves"], ["costume-gloves", "Costume gloves"], ["kids-dress-gloves", "Kids dress gloves"], ["wedding-veils", "Wedding veils"], ["arm-sleeves", "Arm sleeves"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="block text-sm">Estimated quantity<input required name="quantity" maxLength={100} placeholder="For example: 200 pairs" className={control} /></label><label className="block text-sm">WhatsApp or phone (optional)<input name="whatsapp" type="tel" maxLength={80} autoComplete="tel" className={control} /></label><label className="block text-sm">Your requirements<textarea required name="message" maxLength={6000} placeholder="Materials, colours, sizing, custom details and delivery date" rows={4} className={control} /></label><label className="flex items-start gap-3 text-sm leading-6"><input required type="checkbox" name="consent" className="mt-1"/><span>I agree that JS Meilai may use these details to process this enquiry. Read our <Link href="/privacy/" className="underline">privacy policy</Link>.</span></label><input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button disabled={busy} className="min-h-12 w-full bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">{busy ? "Sending…" : "Send enquiry"}</button>{status && <p role="status" className="text-sm leading-6 text-muted-foreground">{status}</p>}</form>;
}
