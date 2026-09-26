export type AnalyticsEvent = "rfq_submit" | "contact_click" | "whatsapp_click" | "product_family_view" | "sample_request";
export type AnalyticsParams = Record<string, string>;

declare global {
  interface Window {
    __jsmeilaiAnalyticsConsent?: boolean;
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

/**
 * Keep event call sites ready for GA4 without collecting data today. A future
 * consented GA4 loader can set the flag and provide `window.gtag`; until both
 * exist this function is deliberately inert.
 */
export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || window.__jsmeilaiAnalyticsConsent !== true || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
