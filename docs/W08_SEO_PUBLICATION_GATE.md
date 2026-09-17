# W08 SEO Publication Gate

Status: `FORMAL_INDEXING_ENABLED; TECHNICAL_SEO_ACCEPTED; CONVERSION_GATES_REMAIN`

Checkpoint: `W08 — SEO Publication Gate`

Audit date: `2026-09-18`

## Scope

This audit covers route ownership, metadata, canonical handling, robots, sitemap, structured-data boundaries, static rendering, 404 behavior and the approved product-detail preview boundary. The 2.2 execution additionally verified the canonical production host in Chrome, enabled formal indexing through the Vercel Production environment, and completed the GSC HTML-file and sitemap checkpoints. RFQ delivery, page-specific evidence gates and third-party promotion remain separate boundaries.

## Passed repository evidence

- `docs/ROUTE_REGISTRY.md` defines one owner for each of the five family routes and the products hub; conditional child routes remain uncreated.
- `app/sitemap.ts` contains the approved public home, catalogue hub, six family routes and two educational guides. Product-detail previews, costume until its separate gate, aliases, privacy and system routes are excluded.
- `app/products/[slug]/page.tsx` statically generates the 36 approved slugs, returns `notFound()` for unknown slugs, and applies preview robots metadata.
- Preview detail responses emit `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`; tests confirm no detail canonical and no detail sitemap entry.
- `app/robots.ts` allows the preview pages while disallowing `/api/` and `/404/`; indexing is fail-closed through the global preview metadata.
- `data/product-rfq-context.ts` and product-card/detail tests confirm RFQ context is limited to `productId`, `slug`, `family`, `approvedDisplayName`, and `sourceRoute`.
- `npm test` passes 38/38, including route boundaries, metadata, sitemap, preview and RFQ-context assertions. `npm run typecheck`, `npm run lint`, `npm run validate:products`, and `npm run build` also pass from the W03 verification record.
- The 2.2 production audit checks 9 sitemap URLs with `failures=0` and `warnings=0`; Chrome GSC shows verified ownership, a successfully read sitemap and 9 discovered pages.

## Remaining scope gates

1. `lib/site.ts` uses `NEXT_PUBLIC_SITE_URL` when supplied and otherwise `http://localhost:3000`; the approved formal host is `https://www.jsmeilai.com/`. Production host, canonical and machine-readable endpoint checks passed for the current deployment.
2. The stakeholder preview remains the fail-closed default. The approved public canonical pages are now formally indexable; product-detail previews and gated conversion/evidence routes remain noindex.
3. `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` still requires `/contact/` and `/privacy/`, approved factory/custom-manufacturing evidence, provider controls, and formal host verification. `/factory/` and `/custom-manufacturing/` remain `DEFERRED_LAUNCH_BLOCKER`.
4. The historical checklist wording for `/costume-gloves/` is superseded for bounded integration by the 2026-09-08 `PROJECT_SPEC_V1.md` correction and the accepted Post-W02 handoff. The route remains noindex until its separate SEO flag and Human gate are approved; no historical record was rewritten.
5. Core Web Vitals and rendered metadata on the actual canonical production host are not proven by local build output and remain a formal publication verification item.

## Decision

W08 technical SEO is accepted for the bounded 2.2 public scope: formal indexing is enabled, the canonical host and machine-readable endpoints are live, GSC ownership and sitemap submission are verified, and production audit passes. The remaining gates apply only to the routes and claims explicitly marked noindex or pending human evidence; they must be resolved before those routes are promoted or used in external outreach.
