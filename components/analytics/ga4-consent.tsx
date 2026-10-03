"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "jsmeilai-analytics-consent-v1";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SETTINGS_EVENT = "jsmeilai:open-analytics-settings";

type Consent = "granted" | "denied" | null;

export function Ga4Consent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    const timer = window.setTimeout(() => {
      if (saved === "granted" || saved === "denied") setConsent(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openSettings = () => setOpen(true);
    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  if (!MEASUREMENT_ID) return null;

  function choose(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.gtag?.("consent", "update", { analytics_storage: value === "granted" ? "granted" : "denied" });
    setConsent(value);
    setOpen(false);
    window.__jsmeilaiAnalyticsConsent = value === "granted";
  }

  const showPanel = open || consent === null;
  return <>
    {consent === "granted" && <>
      <Script id="jsmeilai-ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" onLoad={() => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = window.gtag ?? ((...args: unknown[]) => { window.dataLayer?.push(args); });
        window.gtag("js", new Date());
        window.gtag("config", MEASUREMENT_ID);
        window.__jsmeilaiAnalyticsConsent = true;
        window.dispatchEvent(new Event("jsmeilai-analytics-ready"));
      }} />
      <Script id="jsmeilai-ga4-config" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}; window.gtag('consent','default',{analytics_storage:'granted'});`}</Script>
    </>}
    {showPanel ? <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl border border-[#0d2b3f]/20 bg-[#f5f6f5] p-5 text-[#0d2b3f] shadow-[0_18px_55px_rgba(13,43,63,.18)]" role="dialog" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description">
      <p id="analytics-consent-title" className="font-serif text-xl">Optional analytics</p>
      <p id="analytics-consent-description" className="mt-2 text-sm leading-6 text-stone-600">Allow anonymous Google Analytics measurement to help us understand visits, campaign sources and enquiry journeys. We do not send enquiry message contents or contact details to GA4. Read our <Link href="/privacy/" className="underline">privacy policy</Link>.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("granted")} className="min-h-10 bg-[#0d2b3f] px-4 text-sm text-white">Allow analytics</button>
        <button type="button" onClick={() => choose("denied")} className="min-h-10 border border-[#0d2b3f] px-4 text-sm">Decline</button>
      </div>
    </div> : null}
  </>;
}
