# Phase 3 Product Batch Ingestion Final Gate

Status: `PASS - FOUNDATION REVIEWED; CATALOGUE INTEGRATION DEFERRED`

Baseline: `a2f6e7a0ad822773495571f6bab886c029dfddd2`

This gate closes the static Product Batch Ingestion Foundation and its two real pilots. It does not approve any product for the public catalogue, replace synthetic fixtures, change a collection page, or expand product, route, sitemap, SEO, infrastructure, or database scope.

## Real pilot evidence

| Batch | Scope | Result |
| --- | --- | --- |
| `pilot-2026-09-01` | Four independent 1688 single-listing source ZIPs | Four non-publishable normalized drafts, 140 inherited-image references, no provenance exceptions, and no cleanup work. Human review accepted `opera-gloves`, `kids-dress-gloves`, `bridal-gloves`, and `wedding-veils` as the four primary-family decisions. |
| `pilot-2026-09-01-cross-listing` | Six related real 1688 listing ZIPs | Five pending non-publishable drafts and one quarantined listing, 200 inherited-image references, zero cleanup records, and 15 pairwise relationships. All relationships remain `KEEP_SEPARATE`; there are no exact shared binaries and zero automatic merges. |

For `776815144156`, the explicit Frozen/Elsa source-title signal is retained as a third-party IP exception. The Human Decision `QUARANTINE_DEFER` excludes it from the approved catalogue even though its storefront reuse permission remains inherited. No logo removal, text removal, generative edit, Costume route, or publication path is created.

For `728772172182`, a focused review of main and SKU images, source metadata, construction, proportion, and styling supports `bridal-gloves` as the strongest recommendation: the visual evidence shows a short full-finger lace/mesh glove with a ruffled cuff, adult-looking hand proportions, bridal styling, and black/white/pink presentation. The source title mixes children and bridal audience wording, and there is no reliable age, size, or option-label evidence. It therefore remains `PENDING_HUMAN_DECISION`; the recommendation is not an approved classification.

## Boundary verification

- Raw archives, extraction, drafts, quarantine output, cleanup queues, and local Human Decisions remain under Git-ignored `.product-ingestion/`; no raw source ZIP, image, local review output, or decision overlay is committed.
- The inspector creates only local review artifacts. A draft is always `PENDING_REVIEW` or `QUARANTINED`, never application data or a public render input. `data/products/approved/` is intentionally empty except for its tracked placeholder.
- Store-level permission inherits only with the confirmed storefront, listing URL/ID, raw archive SHA-256, and image SHA-256. This establishes reuse permission, not production-visual approval.
- Provenance, storefront mismatch, third-party/IP signals, and product/image mapping conflicts remain Human Gate exceptions. Own-store branding may be non-preferred visually but is not a third-party permission blocker.
- Image triage is exception-focused. Description, SKU, duplicate, promotional, and Chinese information graphics stay non-public evidence unless they need genuine cleanup, provenance, IP, or mapping work.
- Archive enumeration and generated review records are deterministic. Repeat inspection of the second pilot produced matching hashes for its ledger, summary, cross-listing analysis, drafts, quarantine, and cleanup output.
- Cross-listing analysis is conservative: it can report `KEEP_SEPARATE`, `POSSIBLE_VARIATION`, `POSSIBLE_DUPLICATE`, or `HUMAN_REVIEW`, but never merges records or creates a website product.

## Frozen architecture check

The workflow uses local files only. `V1_DATABASE = NONE` remains unchanged: no CMS, Supabase, Postgres, ecommerce, account system, PDP, conditional child route, or public catalogue integration has been added. Frozen taxonomy, Route Registry, sitemap ownership, and SEO ownership are unchanged. No route, sitemap, DNS, Vercel, email, analytics, or production configuration change is included.

## Verification record

The final implementation must pass the following checks before merge:

- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:products`
- `npm run build`
- `git diff --check`
- a targeted sensitive-data scan excluding generated, Git, dependency, and local ingestion directories
- a manual staged-diff and tracked-file review confirming the raw archive boundary and absence of public catalogue drift

## Next checkpoint

Continue ingesting more real listings in bounded batches before catalogue integration. Prioritize naturally occurring same-product marketplace presentations, clear shared binaries, reliable option labels, and genuine variation evidence; retain separate drafts whenever evidence is insufficient. Once a materially reviewed set of approved records and production-safe assets exists, begin a separate catalogue-to-collection integration checkpoint.
