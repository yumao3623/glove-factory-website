export type MarketCode = "US" | "GB" | "EU" | "CN" | "GLOBAL";
export type MarketQuote = {
  market: MarketCode;
  currency: "USD" | "GBP" | "EUR" | "CNY";
  taxRate: number;
  shipping: { method: string; amountMinor: number; etaDays: string };
  wholesale: { enabled: boolean; minQuantity: number; discountPercent: number };
  status: "CONFIGURED_ESTIMATE";
};

const markets: Record<MarketCode, MarketQuote> = {
  US: { market: "US", currency: "USD", taxRate: 0, shipping: { method: "International courier", amountMinor: 2500, etaDays: "5–9" }, wholesale: { enabled: true, minQuantity: 20, discountPercent: 8 }, status: "CONFIGURED_ESTIMATE" },
  GB: { market: "GB", currency: "GBP", taxRate: 0.2, shipping: { method: "Tracked delivery", amountMinor: 1800, etaDays: "3–7" }, wholesale: { enabled: true, minQuantity: 20, discountPercent: 8 }, status: "CONFIGURED_ESTIMATE" },
  EU: { market: "EU", currency: "EUR", taxRate: 0.2, shipping: { method: "Tracked delivery", amountMinor: 2200, etaDays: "4–8" }, wholesale: { enabled: true, minQuantity: 20, discountPercent: 8 }, status: "CONFIGURED_ESTIMATE" },
  CN: { market: "CN", currency: "CNY", taxRate: 0, shipping: { method: "China domestic courier", amountMinor: 3000, etaDays: "2–5" }, wholesale: { enabled: true, minQuantity: 20, discountPercent: 8 }, status: "CONFIGURED_ESTIMATE" },
  GLOBAL: { market: "GLOBAL", currency: "USD", taxRate: 0, shipping: { method: "International courier", amountMinor: 3000, etaDays: "5–12" }, wholesale: { enabled: true, minQuantity: 20, discountPercent: 8 }, status: "CONFIGURED_ESTIMATE" },
};

export function getMarketQuote(market: string | null | undefined): MarketQuote {
  const code = (market ?? "GLOBAL").toUpperCase() as MarketCode;
  return markets[code] ?? markets.GLOBAL;
}

export function applyWholesalePrice(unitAmountMinor: number, quantity: number, quote: MarketQuote) {
  return quote.wholesale.enabled && quantity >= quote.wholesale.minQuantity
    ? Math.round(unitAmountMinor * (1 - quote.wholesale.discountPercent / 100))
    : unitAmountMinor;
}
