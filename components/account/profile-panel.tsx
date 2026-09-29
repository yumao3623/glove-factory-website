"use client";

import { FormEvent, useEffect, useState } from "react";

type Form = { contactName: string; company: string; country: string; phone: string };
const blank: Form = { contactName: "", company: "", country: "", phone: "" };

export function ProfilePanel() {
  const [form, setForm] = useState<Form>(blank);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/account/profile/", { credentials: "same-origin" }).then(async response => { if (!response.ok) throw new Error(); return response.json(); }).then(data => { setForm({ ...blank, ...(data.profile ?? {}) }); setEmail(data.email ?? ""); }).catch(() => undefined); }, []);
  function set(key: keyof Form, value: string) { setForm(current => ({ ...current, [key]: value })); }
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); setMessage(""); try { const response = await fetch("/api/account/profile/", { method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Unable to save your details."); setMessage(data.message); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save your details."); } finally { setBusy(false); } }
  const input = "mt-2 min-h-11 w-full border border-stone-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d2b3f]/25";
  return <section className="mt-8 border border-stone-200 bg-white p-6 sm:p-7"><div><p className="section-label text-stone-500">Your details</p><h2 className="mt-2 font-serif text-3xl text-[#0d2b3f]">Keep your sourcing details ready</h2><p className="mt-3 text-sm leading-6 text-stone-600">These details help prefill future enquiries. You can change them at any time.</p></div><form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm">Contact name<input value={form.contactName} onChange={event => set("contactName", event.target.value)} className={input} autoComplete="name" /></label><label className="text-sm">Email<input value={email} readOnly className={`${input} bg-stone-50 text-stone-500`} /></label><label className="text-sm">Company or shop<input value={form.company} onChange={event => set("company", event.target.value)} className={input} autoComplete="organization" /></label><label className="text-sm">Country or market<input value={form.country} onChange={event => set("country", event.target.value)} className={input} autoComplete="country-name" /></label><label className="text-sm sm:col-span-2">WhatsApp or phone<input value={form.phone} onChange={event => set("phone", event.target.value)} className={input} autoComplete="tel" /></label><div className="sm:col-span-2"><button disabled={busy} className="min-h-11 bg-[#0d2b3f] px-5 text-sm font-medium text-white disabled:opacity-50">{busy ? "Saving…" : "Save details"}</button>{message && <p role="status" className="mt-3 text-sm text-stone-600">{message}</p>}</div></form></section>;
}
