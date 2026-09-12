# W08 SEO Publication Gate

Status: `PENDING_FORMAL_PUBLICATION_DEPENDENCIES`

Checkpoint: `W08 — SEO Publication Gate`

Audit date: `2026-09-12`

## Scope

This audit covers route ownership, metadata, canonical handling, robots, sitemap, structured-data boundaries, static rendering, 404 behavior and the approved product-detail preview boundary. It does not provision or verify production DNS/Vercel, enable indexing, activate RFQ delivery, or change external services.

## Passed repository evidence

- `docs/ROUTE_REGISTRY.md` defines one owner for each of the five family routes and the products hub; conditional child routes remain uncreated.
- `app/sitemap.ts` contains only `/`, `/products/`, and the five implemented family routes. Product-detail previews, aliases, privacy and system routes are excluded.
- `app/products/[slug]/page.tsx` statically generates the 36 approved slugs, returns `notFound()` for unknown slugs, and applies preview robots metadata.
- Preview detail responses emit `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex`; tests confirm no detail canonical and no detail sitemap entry.
- `app/robots.ts` allows the preview pages while disallowing `/api/` and `/404/`; indexing is fail-closed through the global preview metadata.
- `data/product-rfq-context.ts` and product-card/detail tests confirm RFQ context is limited to `productId`, `slug`, `family`, `approvedDisplayName`, and `sourceRoute`.
- `npm test` passes 38/38, including route boundaries, metadata, sitemap, preview and RFQ-context assertions. `npm run typecheck`, `npm run lint`, `npm run validate:products`, and `npm run build` also pass from the W03 verification record.

## Formal-gate blockers

1. `lib/site.ts` uses `NEXT_PUBLIC_SITE_URL` when supplied and otherwise `http://localhost:3000`; the approved formal host is `https://www.jsmeilai.com/`. A production host verification and environment-controlled canonical check are still required.
2. The stakeholder preview intentionally emits noindex. W08 cannot convert it to indexable output until the formal publication decision, host/HTTPS/redirect verification, and all launch blockers are resolved.
3. `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` still requires `/contact/` and `/privacy/`, approved factory/custom-manufacturing evidence, provider controls, and formal host verification. `/factory/` and `/custom-manufacturing/` remain `DEFERRED_LAUNCH_BLOCKER`.
4. The historical checklist wording for `/costume-gloves/` is superseded for bounded integration by the 2026-09-08 `PROJECT_SPEC_V1.md` correction and the accepted Post-W02 handoff, but formal launch status remains governed by Phase 4A. No historical record was rewritten.
5. Core Web Vitals and rendered metadata on the actual canonical production host are not proven by local build output and remain a formal publication verification item.

## Decision

W08 is not accepted as a formal SEO publication pass. The repository implementation is internally consistent for the stakeholder preview and its noindex boundary. The next required evidence is a separately authorized publication review that resolves the formal host, route-content, legal/privacy, RFQ and infrastructure dependencies, then rechecks canonical URLs, robots, sitemap, structured data, status codes and performance on the production host.
