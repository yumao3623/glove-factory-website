# Phase 3 Publication Preflight and Ingestion Planning Closure

Date: 2026-09-01
Baseline: `main` at `187b6b2ad81b830f13b459bac97a67bc080cffb2`; reviewed checkpoint `phase-3-collection-tranche-2-reviewed`.

> **Historical record - superseded by Human Review on 2026-09-04.** This preflight preserves the facts and decisions known at its original checkpoint. The later Human decision approves `JS Meilai` as the public English brand and metadata identity, `https://www.jsmeilai.com/` as canonical, Resend RFQ delivery, the approved sender/recipient and retention boundaries. It does not create external resources or authorize launch; see `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`.

## Decision

The site is not ready for public release. The next checkpoint should first implement a bounded, static, draft-first Product Batch Ingestion Workflow and process a limited real-product pilot. Collection integration follows only after the pilot's batch Human Gate; this checkpoint does not yet implement Factory, Custom Manufacturing, Contact or production infrastructure.

`jsmeilai.com` is the confirmed official domain. This does not confirm an English legal entity or brand name: `JS Meilai` remains a visual-only provisional display and must not be promoted to an approved legal identity.

## Current evidence and route state

Implemented: `/`, `/products/`, `/bridal-gloves/`, `/opera-gloves/`, `/kids-dress-gloves/`, `/wedding-veils/`, `/wedding-gloves/` redirect, `sitemap.xml`, `robots.txt`, 404 and a development RFQ endpoint.

Deferred: `/costume-gloves/`, `/custom-manufacturing/`, `/factory/`, `/contact/`, `/privacy/`, all conditional child routes, PDPs and ecommerce.

The Route Registry and Phase 2 page ownership remain frozen. The current sitemap correctly excludes deferred routes, but it is development-only because `lib/site.ts` defaults to `http://localhost:3000`; it must not be treated as a production sitemap. Current metadata, page copy and RFQ feedback also explicitly label the application as a development prototype. The current build also reports `/` and `/bridal-gloves/` as dynamic because their visual-gate query-parameter branch remains in the page implementation; remove or isolate that comparison state before publication so primary catalogue content meets the static-rendering requirement. Preview deployments need a distinct noindex/access-control policy before any public preview is shared.

The factory has subsequently authorized public display on `jsmeilai.com` of self-owned product images from its confirmed 1688 storefront. This is a store-level permission grant, subject to storefront/listing/hash provenance validation and separate asset risk review. Existing manifest entries retain their historical `REQUIRES_PERMISSION_CONFIRMATION` state until reconciled through that workflow; the grant does not cover the workshop candidates merely because they are adjacent to product evidence. The asset review still rejects the watermark-bearing fringe assets and the Frozen/Elsa/Disney-context assets. Costume / Stage therefore remains deferred: no independent, clean, provenance-validated and non-IP-risk Costume asset set exists.

The implemented collections use synthetic fixture records: Bridal 4, Opera 3, Kids 2 and Wedding Veils 3. Their labels, material/size/colour/length status and descriptions are intentionally non-public development content. The RFQ route validates and rate-limits in memory, then returns `202 PENDING_PUBLIC_CONTACT`; it does not send or persist an enquiry.

## Publication gaps

| Group | Gap | Disposition |
| --- | --- | --- |
| Repository-solvable | Replace fixtures with status-aware approved records, remove prototype copy and visual-gate dynamic branches, complete the frozen route set only when its page-specific facts are approved, add a preview noindex policy, and harden RFQ implementation after provider details exist. | Next data-and-content checkpoint. |
| Factory confirmation | Asset-to-product mapping and source evidence for a pilot; publishable product names; confirmed material/composition for each shown product; and approved factual custom/factory content. Store-level image permission is confirmed, but provenance and risk validation remain required. Exact colours, sizes and lengths may be omitted until confirmed rather than guessed. | Required before the affected content is public. |
| External service/configuration | Vercel project and deployment, DNS/HTTPS/domain binding, production canonical host, email provider and authenticated sender, business inbox, and later GSC/GA4. | Publication-integration and launch checkpoints only. |
| Deferred | Costume route, conditional child routes, PDPs, uploads, CMS/database, ecommerce, multilingual content and video. | Keep deferred under the existing gates/ADRs. |

## What each future page needs

- **Factory:** not ready for the next route tranche. It needs permission-cleared workshop evidence plus approved identity and factual process/capability copy. Platform metrics and posters remain excluded.
- **Custom Manufacturing:** not ready. General customization is confirmed, but the page requires the actual supported fields and exclusions by family (pattern, colour, sizing, logo, packaging and supplied material) before it can make a useful buyer promise.
- **Contact and Privacy:** not ready. They require a public recipient/fallback method, approved privacy notice, provider/data-processing terms, retention/deletion policy and a real delivery path.
- **RFQ:** the UI and server-side field validation are a useful skeleton only. A live flow still needs an external transactional provider, protected credentials, recipient routing, authenticated sending domain, durable rate limiting, provider-side spam/risk controls, consent/privacy copy, failure handling and delivery monitoring. The current honeypot is not sufficient on its own.

## Domain status and timing

| Item | Current status | Owner checkpoint |
| --- | --- | --- |
| Official domain | `jsmeilai.com` confirmed | Complete. |
| DNS and Vercel domain binding | Not configured | Publication integration, after content/contact approval. |
| Production canonical | Not configured; runtime defaults to localhost | Publication integration, with the final canonical host decision. |
| Production sitemap URL | Not active | Publication integration, after the final indexable route set and canonical host are ready. |
| Production robots state | Not active; current rules are development code | Publication integration: protect/noindex previews, enable production crawl rules only at launch readiness. |
| GSC and GA4 | Not created | Launch: GSC after binding; GA4 after consent/privacy review. |
| Business email | Not provisioned | Before live RFQ, with authenticated sender and monitored recipient. |
| Public launch | Not authorized | Only after all publication blockers pass. |

## Minimal necessary factory input

1. **Pilot raw batch:** provide untouched single-listing 1688 ZIPs from the confirmed storefront. Retain the available listing URL/ID, title, metadata and original images, but no manual renaming, translation, classification or image cleanup is required.
2. **Only for claims to display now:** confirm material/composition for a product only where the pilot source cannot support it and the site intends to display it. Exact length, available colours and size range can remain omitted.
3. **One operational packet for the later conversion tranche:** approved public enquiry recipient/fallback, English legal identity if it will be published, customization fields/exclusions, and the privacy/data-retention policy. MOQ, sample terms, lead time, capacity, certifications and platform metrics are not needed unless the factory wants them displayed.

## Human-approved ingestion planning closure

The next phase is a limited pilot, not a bulk import. It uses immutable raw source archives, derived inspection, normalized draft/quarantine records and approved public records as separate layers. `1688 source listing != website product`: listing-to-product grouping, variation handling and family classification are evidence-based and retain their source mapping.

Normal, source-clear records may be drafted automatically. Human Gate receives only actionable exceptions: uncertain grouping or family, conflicting facts, unusual English naming, missing provenance, no safe primary image, risky asset/cleanup, IP/third-party concern, or a claim that would expand a publication boundary. The output also includes a separate non-blocking image cleanup queue. No draft is visible to the Next application, sitemap or collection pages until approved.

The pilot preserves the five-family taxonomy, frozen Route Registry, category-only V1 and `V1_DATABASE = NONE`. It creates no PDP, child route, CMS, database, production resource or public launch configuration.

## Human Review request

Human Review: `PASS`. Proceed next with the bounded Product Batch Ingestion Workflow and real-product pilot, retaining Costume and the Factory/Custom/Contact/Privacy route tranche as deferred. No production account, DNS, domain binding, mailbox, database or analytics resource will be created in that checkpoint.
