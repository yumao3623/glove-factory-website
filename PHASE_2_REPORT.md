# Phase 2 Report: Architecture Freeze and Product Specification

Date: 2026-08-31
Baseline: `97688bab79de6de89ea768abe7ad9ac761648a6f` (`phase-1.1-reviewed`)
Branch: `codex/phase-2-architecture-freeze`

## FROZEN DECISIONS

- Homepage positioning concept: **Occasion Gloves & Wedding Veils Manufacturer**; exact H1 is `COPY_FREEZE_PENDING_VISUAL_REVIEW`.
- V1 sitemap: `/`, `/products/`, five family collections, `/custom-manufacturing/`, `/factory/` (Factory + About), `/contact/`, `/privacy/`.
- Canonical routes and ownership are frozen in `docs/ROUTE_REGISTRY.md`; exclusion records explicitly distinguish `DO_NOT_CREATE` from `REDIRECT_301_ONLY`.
- Child styles are not top-level owners; generic lace/mesh/fingerless/wholesale routes are excluded or redirected.
- V1 uses category-only B2B catalogue pages; no individual PDPs.
- `V1_DATABASE = NONE`; no Supabase or other database.
- Hosting recommendation: Vercel, portable Next.js; Cloudflare Pages fallback.
- RFQ: one serverless endpoint plus external transactional email provider; no V1 upload.
- English-only launch; future localization requires an ADR and operating owner.
- Stack: Next.js App Router, TypeScript, Tailwind CSS, audited shadcn primitives, static/server rendering.
- UI direction: Editorial Utility, specified in `docs/UI_DESIGN_SPEC.md`; exact fonts, colors and CTA treatment remain provisional tokens pending visual review.

## CONDITIONAL DECISIONS

`/opera-gloves/satin/`, `/bridal-gloves/lace/`, `/bridal-gloves/sheer-tulle/` and `/bridal-gloves/fingerless/` become indexable only when all six child threshold conditions in `PROJECT_SPEC_V1.md` pass. The content condition is qualitative and explicitly rejects filler; no fixed word count is a gate. Individual PDPs are deferred until ADR 0005 evidence triggers pass. File upload, second language, CMS, advanced facets and CRM sync are deferred.

## PENDING FACTS / BLOCKERS BEFORE PUBLICATION

- Approved English legal/company identity and domain.
- Exact public recipient and mailbox/WhatsApp/phone decision.
- Confirmed customization boundaries by family.
- Approved values for MOQ, samples, lead time, capacity, materials/specifications and certifications.
- Privacy retention/contact details and transactional email provider/account, SPF/DKIM/DMARC.
- Permission and curation for all product/factory images.

These are publication and implementation blockers only where a page or promise depends on them; they do not justify inventing values.

## OUT OF SCOPE

Consumer ecommerce, checkout/payment, accounts/orders/CRM, database/Supabase, automatic shipping quotes, multilingual pages, broad blog and uncontrolled pSEO, production hosting/domain registration and any Phase 3 code.

## Required answers

1. Homepage positioning concept: **Occasion Gloves & Wedding Veils Manufacturer** (fallback: Bridal, Evening & Costume Gloves Manufacturer); exact H1 remains pending visual/copy review.
2. Final sitemap: as listed above and in `ROUTE_REGISTRY.md`.
3. Frozen routes: all `FROZEN` rows in the registry; aliases/exclusions carry explicit implementation actions and are not accidental HTML pages.
4. Conditional child pages: Satin Opera, Bridal Lace, Sheer/Tulle Bridal and Fingerless Bridal, under the explicit threshold.
5. Individual product pages: **No for V1**.
6. Database: **NONE**.
7. Hosting: **Vercel**, Cloudflare Pages fallback.
8. RFQ: serverless endpoint + external email provider, no file upload in V1.
9. English-only: **frozen for V1**.
10. Technical stack: Next.js + TypeScript + Tailwind + selected shadcn primitives.
11. UI direction: **Editorial Utility**.
12. Phase 3 blockers: identity/domain/contact facts, approved operational specs, image permissions, email provider/privacy setup and human approval of this spec.

## Review evidence

Documentation consistency, route ownership, SEO rules, asset/RFQ boundaries, infrastructure status and external UI references are cross-referenced from `docs/PROJECT_SPEC_V1.md`. No website code, production service, database, domain or secret was created in Phase 2. Stop here for Human Phase 2 Gate Review.
