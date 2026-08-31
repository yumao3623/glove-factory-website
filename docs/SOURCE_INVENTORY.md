# Source Inventory

## Evidence sources

| Source | Type | Reliability / use |
| --- | --- | --- |
| User pasted project brief | CONFIRMED | Governs scope, sequencing, prohibitions and deliverables. |
| `C:/Users/毛彧/Desktop/SEO_GUIDE.md` -> `docs/SEO_GUIDE.md` | CONFIRMED | Original user-supplied SEO reference restored byte-for-byte in the repository (SHA-256: `AA88300DBD684D01CE5A3EBC8F9DA08EF45AC738F913C0CCB5126C2B8F6C9C3C`). Its original AI tools/SaaS scope is unchanged; `docs/B2B_SEO_ADAPTATION.md` is the separate adaptation. |
| `C:/Users/毛彧/Documents/temp/Keyword Stats 2026-08-26 at 17_46_17.xlsx` -> `research/keywords/raw/keyword-stats-2026-08-26.xlsx` | CONFIRMED as dataset | Original Google keyword export dated 2026-08-26, restored byte-for-byte in `raw/` (SHA-256: `C2AAD8263E70FE0BEF74A9D6642024693E7E88417585C813753F88BDF140E573`). Directional seed evidence, not final keyword truth. |
| `research/keywords/processed/keyword-stats-normalized.csv` | Derived dataset | UTF-8 analysis copy generated only from the raw XLSX by `scripts/normalize_keyword_stats.py`. It retains all 1,989 source data rows and raw cell text; the header mapping and no-cleaning rules are documented in `research/keywords/processed/README.md`. |
| `https://sem.3ue.com/` | THIRD_PARTY_SEMRUSH_INTERFACE / PLATFORM_EVIDENCE | Third-party Semrush-style interface, not an official Semrush first-party data source. Visible estimates and SERP panels are platform evidence only; record date, database, device, and displayed values. |
| `https://sem.3ue.com/analytics/keywordoverview/bulk/` | THIRD_PARTY_SEMRUSH_INTERFACE / PLATFORM_EVIDENCE | A 100-keyword US-English product and procurement candidate batch was submitted in the current Chrome session on 2026-08-31. Only cells that visibly displayed a metric are transcribed into Phase 1 files. Empty or "refresh metric data" cells mean unavailable in that session, not zero demand. No browser credentials, cookies, tokens, or session secrets were read or stored. |
| Google live SERP | PLATFORM_EVIDENCE | Independent live SERP data source. Record query, locale, device, snapshot date, visible result URL/title, and SERP features; results are volatile and may be personalized. |
| `research/keywords/KEYWORD_UNIVERSE.csv` and `research/keywords/KEYWORD_CLUSTER_MAP.csv` | Derived Phase 1 research | Curated research decisions derived from the raw seed, visible `THIRD_PARTY_SEMRUSH_INTERFACE` estimates and Google live SERPs. They are not raw source data or factory facts. |
| `research/serp/SERP_ANALYSIS.csv` | PLATFORM_EVIDENCE | US and UK Google live desktop snapshots observed 2026-08-31. Result ranking/order and features are volatile. |
| `research/competitors/COMPETITOR_MATRIX.csv` | Public-page observation / PLATFORM_EVIDENCE | Read-only observations of competitor public pages on 2026-08-31. No login, account data, traffic estimate or competitor claim is treated as a factory fact. |
| `C:/Users/毛彧/Desktop/SOP.png` | PLATFORM_EVIDENCE / process reference | Mind map supplied by user; useful for workflow, not proof of factory capability. |
| User-provided 1688 screenshots (20 PNG attachments) | PLATFORM_EVIDENCE | Primary visual evidence for store categories, products, profile, production line and contact data. |
| `https://jsmeilai.1688.com/` | PLATFORM_EVIDENCE | Public request returned HTTP 200 and a JS application shell; not sufficient for complete extraction. |
| `https://github.com/yumao3623/shadcn-landing-page` | UNKNOWN / future visual reference | Record only; do not clone or treat as architecture. |
| `https://zippystarter.com/tools/shadcn-ui-theme-generator` | UNKNOWN / future visual reference | Record only; do not use to choose site structure before SEO research. |

## Attachment interpretation

The screenshots are the factory's own 1688 storefront and profile material, not SEO competitors. Future competitors must be discovered from validated seed queries in Semrush/Google SERPs.

## Phase 1 provisional research scope

`PROVISIONAL_RESEARCH_SCOPE`: Primary SEO research locale is **United States / English**. Secondary validation locale is **United Kingdom / English**. This scope supports consistent Keyword/SERP/Competitor research and is not a final commercial market decision.
