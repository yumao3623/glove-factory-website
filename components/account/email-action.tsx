"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";

const input = "mt-2 block min-h-12 w-full border border-stone-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d2b3f]";
const button = "inline-flex min-h-12 items-center justify-center bg-[#0d2b3f] px-6 py-3 text-sm text-white disabled:opacity-50";

export function ConfirmEmail() {
  const [message, setMessage] = useState("Continue to verify your email. Password links take you to a secure password form.");
  const [busy, setBusy] = useState(false);
  async function confirm() {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const proof = { token_hash: hash.get("token_hash"), type: hash.get("type") };
    if (!proof.token_hash || !proof.type) { setMessage("Open the complete link from your latest JS Meilai email."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/auth/confirm/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(proof) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      window.history.replaceState(null, "", window.location.pathname);
      window.location.assign(data.next);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to verify the link."); setBusy(false); }
  }
  return <div className="mt-8 max-w-lg border border-stone-200 bg-white p-6 sm:p-8"><p role="status" className="text-sm leading-7 text-stone-600">{message}</p>{<button onClick={() => void confirm()} disabled={busy} className={`${button} mt-6`}>{busy ? "Verifying…" : "Continue securely"}</button>}<Link href="/account/" className="mt-6 block text-sm underline underline-offset-4">Return to sign in</Link></div>;
}

export function ResetPassword() {
  const [password, setPassword] = useState(""); const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password !== confirmation) { setMessage("Passwords do not match."); return; }
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/auth/reset-password/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDone(true); setPassword(""); setConfirmation(""); setMessage(data.message);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save your password."); }
    finally { setBusy(false); }
  }
  return <div className="mt-8 max-w-lg border border-stone-200 bg-white p-6 sm:p-8">{!done && <form onSubmit={submit} className="space-y-5"><p className="text-sm leading-6 text-stone-600">Choose a unique password of at least 12 characters.</p><label className="block text-sm">New password<input autoComplete="new-password" required type="password" minLength={12} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} className={input} /></label><label className="block text-sm">Confirm password<input autoComplete="new-password" required type="password" minLength={12} maxLength={128} value={confirmation} onChange={e => setConfirmation(e.target.value)} className={input} /></label><button disabled={busy} className={button}>{busy ? "Saving…" : "Save password"}</button></form>}{message && <p role="status" className="mt-5 text-sm leading-6 text-stone-600">{message}</p>}<Link href="/account/" className="mt-6 block text-sm underline underline-offset-4">{done ? "Sign in with your new password" : "Return to sign in"}</Link></div>;
}
