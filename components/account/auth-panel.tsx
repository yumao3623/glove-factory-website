"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

export function AuthPanel({ authError, googleEnabled = false }: { authError?: string; googleEnabled?: boolean }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(authError ? "We could not complete that link. If you confirmed your email on another device, sign in here with your email and password." : "");
  const [busy, setBusy] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  async function resendConfirmation(){setBusy(true);try{const r=await fetch("/api/auth/resend-confirmation",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.trim()})});const d=await r.json().catch(()=>({}));setMessage(d.message??d.error??"Unable to send confirmation email.")}catch{setMessage("Unable to reach the account service.")}finally{setBusy(false)}}
  useEffect(() => {
    fetch("/api/auth/session", { credentials: "same-origin" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data?.authenticated) { setAuthenticated(true); setUserEmail(data.user?.email ?? null); setIsAdmin(data.isAdmin === true); }
      }).catch(() => undefined);
  }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/auth/${mode === "signin" ? "sign-in" : "sign-up"}`, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const data = await response.json().catch(() => ({}));
      setMessage(data.message ?? data.error ?? (response.ok ? "Done." : "Request failed."));
      if (response.ok && mode === "signin") { setAuthenticated(true); setUserEmail(email.trim()); setPassword(""); const session = await fetch("/api/auth/session/").then(r => r.json()); setIsAdmin(session.isAdmin === true); }
    } catch { setMessage("Unable to reach the account service. Please try again."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true); setMessage("");
    try { const response = await fetch("/api/auth/sign-out", { method: "POST", credentials: "same-origin" }); if (!response.ok) throw new Error(); setAuthenticated(false); setUserEmail(null); setMessage("You are signed out."); }
    catch { setMessage("Unable to sign out right now."); }
    finally { setBusy(false); }
  }
  if (authenticated) return <div className="mt-10 max-w-md border border-stone-200 bg-white p-6 shadow-sm"><p className="text-sm text-stone-600">Signed in{userEmail ? ` as ${userEmail}` : ""}.</p><nav aria-label="Account" className="mt-5 grid gap-3 border-y border-stone-200 py-4 text-sm"><Link href="/account/orders/" className="underline">Your orders</Link>{isAdmin && <Link href="/admin/" className="underline">Manage products and enquiries</Link>}</nav><button type="button" onClick={signOut} disabled={busy} className="mt-4 w-full bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">{busy ? "Please wait…" : "Sign out"}</button>{message && <p className="mt-4 text-sm text-stone-600" role="status">{message}</p>}</div>;
  return <div className="mt-10 max-w-md border border-stone-200 bg-white p-6 shadow-sm">
    <div className="flex gap-4 border-b border-stone-200 pb-3 text-sm"><button type="button" className={mode === "signin" ? "font-medium text-[#0d2b3f]" : "text-stone-500"} onClick={() => setMode("signin")}>Sign in</button><button type="button" className={mode === "signup" ? "font-medium text-[#0d2b3f]" : "text-stone-500"} onClick={() => setMode("signup")}>Create account</button></div>
    <form className="mt-5 space-y-4" onSubmit={submit}><label className="block text-sm">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-stone-300 px-3 py-2" /></label><label className="block text-sm">Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-stone-300 px-3 py-2" /></label><button disabled={busy} className="w-full bg-[#0d2b3f] px-4 py-3 text-sm text-white disabled:opacity-50">{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button></form>
    {googleEnabled && <Link href="/api/auth/oauth/google" className="mt-3 block w-full border border-[#0d2b3f] px-4 py-3 text-center text-sm text-[#0d2b3f]">Continue with Google</Link>}
    {message && <p className="mt-4 text-sm text-stone-600" role="status">{message}</p>}
    {mode === "signup" && email && <button type="button" onClick={resendConfirmation} disabled={busy} className="mt-3 text-sm underline">Resend confirmation email</button>}
  </div>;
}
