export type AnalyticsEvent = "rfq_submit" | "contact_click" | "whatsapp_click" | "product_family_view" | "sample_request";
export type AnalyticsParams = Record<string, string>;

export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Attribution = Partial<Record<(typeof attributionKeys)[number], string>> & { landing_page?: string };
type StoredAttribution = { first?: Attribution; last?: Attribution };

const attributionStorageKey = "jsmeilai-attribution-v1";

/** Read only the standard campaign parameters. Values are kept as strings and never treated as HTML. */
export function readAttribution(search: string, pathname = "/"): Attribution {
  const query = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const result: Attribution = { landing_page: pathname || "/" };
  for (const key of attributionKeys) {
    const value = query.get(key)?.trim();
    if (value) result[key] = value.slice(0, 160);
  }
  return result;
}

declare global {
  interface Window {
    __jsmeilaiAnalyticsConsent?: boolean;
    dataLayer?: unknown[];
    gtag?: (command: "event" | "config" | "js" | "consent", eventName: string | Date, params?: AnalyticsParams | Record<string, string>) => void;
  }
}

/**
 * Keep event call sites behind the explicitly consented, configured GA4 loader.
 * Until both consent and `window.gtag` exist this function remains deliberately
 * inert, which also keeps local and preview builds fail-closed.
 */
export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || window.__jsmeilaiAnalyticsConsent !== true || typeof window.gtag !== "function") return;
  const current = readAttribution(window.location.search, window.location.pathname);
  let stored: StoredAttribution = {};
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(attributionStorageKey) ?? "{}") as StoredAttribution & Attribution;
    // Ignore pre-release flat values while allowing a clean upgrade from them.
    stored = parsed.first || parsed.last ? parsed : { last: parsed };
  } catch {
    stored = {};
  }
  const hasCampaign = attributionKeys.some((key) => current[key]);
  const first = stored.first ?? (hasCampaign ? current : { landing_page: current.landing_page });
  const last = hasCampaign ? current : (stored.last ?? current);
  const next: StoredAttribution = { first, last };
  try {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in privacy modes; event delivery still remains useful.
  }
  const enriched: AnalyticsParams = { ...params };
  for (const key of attributionKeys) {
    if (current[key]) enriched[key] = current[key]!;
    else if (last[key]) enriched[key] = last[key]!;
    const firstKey = `first_${key}`;
    const firstValue = first[key];
    if (firstValue && !enriched[firstKey as string]) enriched[firstKey as string] = firstValue;
  }
  if (first.landing_page) enriched.landing_page = first.landing_page;
  enriched.page_path = window.location.pathname;
  window.gtag("event", event, enriched);
}
