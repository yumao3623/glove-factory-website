"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ProductFamily } from "@/types/product";

export function ProductFamilyView({ family }: { family: ProductFamily }) {
  const sent = useRef<string | null>(null);
  useEffect(() => {
    const send = () => {
      if (sent.current === family) return;
      if (window.__jsmeilaiAnalyticsConsent !== true || typeof window.gtag !== "function") return;
      sent.current = family;
      trackEvent("product_family_view", { family, source_route: window.location.pathname });
    };
    send();
    window.addEventListener("jsmeilai-analytics-ready", send);
    return () => window.removeEventListener("jsmeilai-analytics-ready", send);
  }, [family, sent]);
  return null;
}
