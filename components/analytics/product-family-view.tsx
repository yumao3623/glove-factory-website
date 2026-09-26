"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ProductFamily } from "@/types/product";

export function ProductFamilyView({ family }: { family: ProductFamily }) {
  const sent = useRef<string | null>(null);
  useEffect(() => {
    if (sent.current === family) return;
    sent.current = family;
    trackEvent("product_family_view", { family, source_route: window.location.pathname });
  }, [family, sent]);
  return null;
}
