"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormState = Record<string, string | boolean>;

const initialState: FormState = { name: "", company: "", country: "", email: "", whatsapp: "", productFamily: "", quantity: "", message: "", consent: false, website: "" };

export function RfqForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const setValue = (name: string, value: string | boolean) => setValues((current) => ({ ...current, [name]: value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true); setErrors({}); setNotice("");
    try {
      const response = await fetch("/api/rfq/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const body = await response.json();
      if (!response.ok) {
        setErrors(body.errors ?? {});
        setNotice(body.message ?? "Please review the highlighted fields.");
        return;
      }
      setNotice("Validation passed. Delivery remains PENDING_PUBLIC_CONTACT for this development checkpoint.");
      setValues(initialState);
    } catch {
      setNotice("The development endpoint could not be reached. No enquiry was sent.");
    } finally { setSubmitting(false); }
  }

  return <form onSubmit={submit} noValidate className="border border-border bg-background p-5 sm:p-8">
    <FieldGroup>
      <div><h3 className="font-serif text-3xl">Request a quote</h3><FieldDescription className="mt-2">This development form validates data only. Its public recipient is still PENDING_PUBLIC_CONTACT.</FieldDescription></div>
      <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><Input id="website" tabIndex={-1} autoComplete="off" value={String(values.website)} onChange={(event) => setValue("website", event.target.value)} /></div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" aria-invalid={Boolean(errors.name)} value={String(values.name)} onChange={(event) => setValue("name", event.target.value)} />{errors.name ? <FieldError>{errors.name}</FieldError> : null}</Field>
        <Field data-invalid={Boolean(errors.company)}><FieldLabel htmlFor="company">Company</FieldLabel><Input id="company" aria-invalid={Boolean(errors.company)} value={String(values.company)} onChange={(event) => setValue("company", event.target.value)} />{errors.company ? <FieldError>{errors.company}</FieldError> : null}</Field>
        <Field data-invalid={Boolean(errors.country)}><FieldLabel htmlFor="country">Country</FieldLabel><Input id="country" aria-invalid={Boolean(errors.country)} value={String(values.country)} onChange={(event) => setValue("country", event.target.value)} />{errors.country ? <FieldError>{errors.country}</FieldError> : null}</Field>
        <Field data-invalid={Boolean(errors.email)}><FieldLabel htmlFor="email">Business email</FieldLabel><Input id="email" type="email" aria-invalid={Boolean(errors.email)} value={String(values.email)} onChange={(event) => setValue("email", event.target.value)} />{errors.email ? <FieldError>{errors.email}</FieldError> : null}</Field>
        <Field><FieldLabel htmlFor="whatsapp">WhatsApp (optional)</FieldLabel><Input id="whatsapp" value={String(values.whatsapp)} onChange={(event) => setValue("whatsapp", event.target.value)} /></Field>
        <Field data-invalid={Boolean(errors.quantity)}><FieldLabel htmlFor="quantity">Quantity</FieldLabel><Input id="quantity" aria-invalid={Boolean(errors.quantity)} value={String(values.quantity)} onChange={(event) => setValue("quantity", event.target.value)} />{errors.quantity ? <FieldError>{errors.quantity}</FieldError> : null}</Field>
      </div>
      <Field data-invalid={Boolean(errors.productFamily)}><FieldLabel>Product family</FieldLabel><Select value={String(values.productFamily)} onValueChange={(value) => setValue("productFamily", value)}><SelectTrigger className="h-11 w-full" aria-invalid={Boolean(errors.productFamily)}><SelectValue placeholder="Select a family" /></SelectTrigger><SelectContent><SelectGroup><SelectLabel>Product families</SelectLabel><SelectItem value="bridal-gloves">Bridal / Wedding Gloves</SelectItem><SelectItem value="opera-gloves">Opera / Evening / Formal Gloves</SelectItem><SelectItem value="costume-gloves">Costume / Stage Gloves</SelectItem><SelectItem value="kids-dress-gloves">Kids / Girls Dress Gloves</SelectItem><SelectItem value="wedding-veils">Wedding / Bridal Veils</SelectItem></SelectGroup></SelectContent></Select>{errors.productFamily ? <FieldError>{errors.productFamily}</FieldError> : null}</Field>
      <Field data-invalid={Boolean(errors.message)}><FieldLabel htmlFor="message">Message</FieldLabel><Textarea id="message" rows={5} aria-invalid={Boolean(errors.message)} value={String(values.message)} onChange={(event) => setValue("message", event.target.value)} />{errors.message ? <FieldError>{errors.message}</FieldError> : null}</Field>
      <Field orientation="horizontal" data-invalid={Boolean(errors.consent)}><Checkbox id="consent" checked={Boolean(values.consent)} onCheckedChange={(checked) => setValue("consent", checked === true)} aria-invalid={Boolean(errors.consent)} /><FieldLabel htmlFor="consent">I consent to the handling of this enquiry for quotation follow-up.</FieldLabel>{errors.consent ? <FieldError>{errors.consent}</FieldError> : null}</Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center"><Button type="submit" size="lg" className="min-h-11" disabled={submitting}>{submitting ? "Validating..." : "Submit enquiry"}</Button>{notice ? <p aria-live="polite" className="text-sm leading-6 text-muted-foreground">{notice}</p> : null}</div>
    </FieldGroup>
  </form>;
}
