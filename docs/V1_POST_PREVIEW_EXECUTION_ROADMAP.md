# V1 Post-Preview Execution Roadmap

Status: `HUMAN_REVIEW_ACCEPTED_FOR_V1_POST_PREVIEW_ROADMAP_FREEZE`

Human approval: `2026-09-05`

Checkpoint: `V1_POST_PREVIEW_ROADMAP_FREEZE`

Baseline: `fb191850ff9f0f68c1b16112e97a8e81daa5233d` (`main`, `origin/main`, and `phase-4b-stakeholder-preview-safe-reviewed^{}`)

Authored-from branch (provenance): `codex/phase-4c-v1-post-preview-roadmap-freeze` (the branch may be deleted after merge; it is not an ongoing dependency)

This is the single canonical execution roadmap after the bounded stakeholder preview. `PROJECT_SPEC_V1.md` remains the V1 implementation contract; `ROUTE_REGISTRY.md`, `PUBLISHING_BOUNDARIES.md`, `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`, and the product/asset registries remain authoritative within their own domains. This file owns only the post-preview workstream order, dependencies, gates, and anti-drift rules.

This checkpoint changes documentation only. It does not authorize runtime, product data, asset, UI, deployment, DNS, Vercel, Resend, GSC, or other external changes.

## Operating entry

Before any task that changes or evaluates the repository, the operator must:

1. Read this roadmap and the relevant domain authority.
2. Declare exactly one current workstream ID and bounded checkpoint.
3. Verify its listed dependencies, evidence status, and allowed scope.
4. Stop and report if this roadmap conflicts with another authoritative document.

Only the declared workstream/checkpoint may be acted on. A checkpoint is not complete until Human Review explicitly accepts its evidence and its status is updated in the canonical record.

## Evidence vocabulary

- `REPO_CONFIRMED`: directly supported by tracked repository evidence.
- `EXTERNALLY_VERIFIED_REPO_RECORDED`: observed on the live stakeholder-preview host and summarized in the repository evidence record.
- `UNKNOWN`: not proven by repository evidence or an accepted external verification record.
- `PENDING_HUMAN_GATE`: evidence exists or work is prepared, but Human approval is required.
- `DEFERRED`: intentionally outside the current bounded checkpoint.

The stakeholder-preview live URL, Vercel project/deployment, domain binding, HTTPS response, apex/HTTP redirects, noindex behavior, and RFQ `503` behavior were externally verified at the previous checkpoint. The durable summary is recorded in `STAKEHOLDER_PREVIEW.md`; these facts must not be collapsed into repository `UNKNOWN`. Formal launch still requires re-verification and approval of the existing Vercel/domain/DNS/HTTPS/redirect configuration; it must not recreate or rebind those resources solely because the gate is pending. Resend account/domain/API key, mailbox policy, GSC, and GA4 remain unconfigured or `UNKNOWN` until their separately authorized integration checkpoint produces direct evidence.

## Stable workstream register

The IDs below preserve the user's original twelve items. The execution order is recorded separately and does not change the meaning of an ID.

| ID | Original scope | Current status | Dependencies | Inputs | Outputs | Human Gate | Allowed scope and non-goals | Bounded checkpoint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W01 | Complete Factory, Custom, Contact, Privacy, Costume and other missing materials | `COMPLETE; HUMAN_REVIEW_ACCEPTED` | Baseline; existing route/spec/boundary docs | Factory answers, legal/contact facts, approved asset evidence, route registry | Accepted evidence pack, claim matrix, route/content readiness decisions | Accepted 2026-09-05: facts, permissions, legal identity/contact boundaries, page scope and omissions | Documentation/classification only; it created no runtime route, legal invention or RFQ activation | **Evidence Pack Gate complete**: `docs/W01_EVIDENCE_PACK_GATE.md` records source/status/owner for requested facts and explicit omissions/deferred claims. |
| W02 | Review the existing 40 imported products and publish only the approved subset | `COMPLETE; HUMAN_REVIEW_ACCEPTED` | W01 product/asset evidence only; ingestion workflow; frozen taxonomy | Listing registry, approved records, image manifest, provenance and risk review | Accepted decision ledger: 39 approvable source candidates resolving to 36 displayable normalized products; 1 IP-risk quarantine; no ProductRecord, asset export or route integration | Accepted 2026-09-06: six family mappings, image exclusions, IP quarantine and no-merge treatment of five possible-variation relationships | Every listing received an auditable disposition; this closure creates no ProductRecord, public publication or new import batch. A separate approved-data/route checkpoint remains required | **40-Listing Decision Gate complete**: `docs/W02_40_LISTING_DECISION_GATE.md` is the accepted closure record; only its 36 displayable normalized candidates may be considered by later approved-data and route/publication work |
| W03 | Continue importing remaining products from the authorized 1688 store | `NOT_STARTED; REMAINDER_UNKNOWN` | W02 workflow and Human Gate; source/provenance permission | Authorized-store listing exports, raw archives, checksums, review ledger | Draft registry entries, quarantine/exception ledger, later approved tranche | Approve exceptions, family decisions, images and any promotion | Ingest and preserve provenance. No claim that the historical “about 118” remainder is current; no public publishing before approval | **Next Ingestion Tranche Gate**: auditable intake, exception decisions and approved export |
| W04 | Enable Resend RFQ | `PENDING_FORMAL_INTEGRATION` | W01 Contact/Privacy; Phase 4A decisions; external provider verification | Approved recipient/from/reply-to, consent copy, provider DNS/API evidence, abuse controls | Tested RFQ delivery, failure fallback, retention/monitoring record | Approve live collection, privacy text, operational owner and provider evidence | No credentials, DNS, provider calls or runtime changes in this roadmap checkpoint | **RFQ Integration Gate**: end-to-end test, abuse controls, privacy/retention and owner sign-off |
| W05 | UI/UX optimization | `PENDING_W11_AND_APPROVED_ASSETS` | W11 visual choice; sufficient approved imagery/content density from W01/W02; UI spec | Human visual direction, approved images, responsive/accessibility/performance checks | Bounded UI change set and visual QA record | Choose visual language and accept desktop/mobile/accessibility result | Evaluate effects; sufficient approved content is enough for the selected surface; all 40 W02 decisions are not required unless that surface depends on them. Do not mechanically add every radius, blur, glow, animation, Bento, noise or overlap idea | **UI/UX Visual Gate**: selected direction implemented in a bounded surface and accepted at required viewports |
| W06 | Add multilingual support | `DEFERRED_UNTIL_ENGLISH_V1` | English V1 content/SEO freeze; route and metadata contract | Approved translations, locale ownership, hreflang/canonical plan | Localized route/content plan and later implementation | Approve languages, translations, legal/SEO ownership and support burden | No language routes, translation automation or hreflang changes before English V1 is stable | **Locale Readiness Gate**: language scope, owners, translated source and URL plan approved |
| W07 | Connect GSC | `DEFERRED_UNTIL_INDEXABLE_LAUNCH` | Formal launch; canonical/robots/sitemap checks; external account access | Verified production host, sitemap, ownership/token evidence and consent/analytics decision | Verified property, sitemap submission and monitoring record | Approve property ownership and submission timing | No GSC submission while stakeholder preview is noindex or formal launch blockers remain | **Search Console Integration Gate**: ownership, sitemap and first inspection evidence accepted |
| W08 | Complete SEO | `PENDING_CONTENT_AND_ROUTE_FREEZE` | W01/W02 route/content evidence; W05 UI; formal host rules | Route registry, metadata/schema/canonical requirements, approved copy/assets | Page-level SEO map, technical checks and launch report | Approve claims, titles, canonicals, schema and indexability | No keyword stuffing, duplicate owners, invented claims or indexing of deferred routes | **SEO Publication Gate**: canonical/indexability/metadata/schema/sitemap checks pass |
| W09 | Research verifiable B2B projects on GitHub | `PARTIAL; NOT_COMPLETE` | Can run as a read-only support stream; no implementation dependency | GitHub source, maintenance signals, competitor-site observations | Separate GitHub project register and competitor reference register | Accept relevance, production/template classification and reusable patterns | GitHub open-source projects and live competitor websites must remain separate; incomplete research cannot be marked complete | **Research Evidence Gate**: each entry has URL, category, maintenance status, evidence and bounded takeaway |
| W10 | Diagnose and organize repository structure | `PENDING_SCOPE_REVIEW` | Roadmap authority; current docs and ownership map | File hierarchy, duplicate/obsolete records, authority graph | Scoped hygiene proposal and, later, low-risk documentation cleanup | Approve deletions/renames, authority changes and compatibility impact | No broad refactor, history rewrite, runtime move or historical Phase rewrite | **Repository Hygiene Gate**: proposed boundary and affected-file list accepted before edits |
| W11 | Filter `awesome-design-md` visual guidance and obtain Human choice | `UPSTREAM_AND_FORK_CHECKED; HUMAN_SELECTION_PENDING` | W01/W02 real content helps evaluate density; W05 consumes decision | Upstream and `yumao3623` fork snapshot, candidate DESIGN.md sources, human visual feedback | 3–5 candidate briefs with borrow/avoid/composition notes and selected direction | Human selects or rejects candidates; selection is not implied by research | Do not copy code or treat upstream/fork as an implementation mandate | **Visual Language Selection Gate**: one chosen direction and explicit rejected options recorded |
| W12 | Audit omitted V1 essentials | `COMPLETE_AS_AUDIT` | Completed in repository-first post-preview audit | Project spec, gates, registries, code/history and prior external evidence | Gap ledger, dependency order and omission decisions | Human accepts audit record; individual gaps close in their own workstreams | Do not repeat the audit as a workstream or treat its completion as implementation approval | **Roadmap Freeze Gate**: this record is reviewed; remaining gaps flow to their owning IDs |

## Material requiredness

Requiredness is claim- and page-specific, not a universal blocker list.

| Class | Materials | Rule |
| --- | --- | --- |
| Formal V1 release required | Approved RFQ recipient and response owner/process; `/contact/` and `/privacy/` content; evidence-cleared product records/assets for any published tranche | Missing evidence blocks the corresponding formal gate. |
| Specific page/claim required | Legal identity/address for legal/company assertions; phone or WhatsApp when displayed/promised; MOQ, sample availability/fee, sample/bulk lead time, capacity, packaging, exact specs, certifications and QC claims when stated | Unknown values may be omitted or expressed only as approved “available on request” language. |
| Optional | Extra contact channels, commercial details and supporting media that are not claimed or needed by the current route | Do not promote optional material to a blocker without a documented dependency. |
| Unknown and omittable | Any unverified operational, legal, commercial or image claim | Preserve `UNKNOWN`; never invent a plausible default. |

Phone, WhatsApp, MOQ, lead time and capacity therefore must not be upgraded to uniform blockers. Factory/workshop images also require authorization separate from the 1688 store-level product-image grant.

## Human design input

The following is a durable Human direction to validate during W11/W05, not an instruction to apply every effect: desktop composition currently feels too empty; grey image frames are unattractive; typography and media density feel insufficient; the overall result can feel template-like. Evaluate layered radii such as 12/16/24/32, blur/glass layers, restrained gradient glow, restrained motion, Bento/offset/overlap composition, noise/gradient borders, inner shadows and stronger hierarchy only when they improve B2B manufacturer credibility, real-image inspection, performance, accessibility and mobile behavior.

## Recommended execution order

The order below is operational sequencing only; it does not renumber the stable IDs.

## Completed roadmap foundation

- **W12 - V1 omissions audit:** `COMPLETE_AS_AUDIT`; do not schedule or execute it again. Its gap ledger is the input to the queue below.

## Pending execution queue

1. **W11 - Visual Language Selection Gate**, using real approved content and preserving the separate GitHub/competitor classifications.
3. **W05 - UI/UX Visual Gate**, consuming W11 and approved imagery.
4. **W03 - Next Ingestion Tranche Gate**, reusing the accepted W02 ingestion workflow.
5. **W10 - Repository Hygiene Gate**, after the content/data boundaries are known.
6. **W08 - SEO Publication Gate**, after route/content and UI decisions stabilize.
7. **W04 - RFQ Integration Gate**, after Contact/Privacy evidence and provider authorization are available.
8. **W07 - Search Console Integration Gate**, only after indexable formal launch readiness.
9. **W06 - Locale Readiness Gate**, after English V1 and SEO ownership are stable.
W01 is complete. **W02 is the next serial checkpoint but is not activated by this closure.** **W09 is a parallel support lane, not a serial step:** it may run read-only throughout W02-W10 and never substitutes for implementation evidence. W11 preparation may run in parallel with W02, but its Human selection must precede W05. W03 preparation may run in parallel with W05 after W02's workflow is accepted; promotion remains gated. W04, W07 and W06 remain blocked by their explicit launch/dependency conditions.

## Anti-drift rules

- Every subsequent task declares one explicit workstream/checkpoint and handles only that scope.
- Unmet dependencies prohibit early implementation.
- A checkpoint status changes only after Human Review accepts its evidence.
- Any order, scope or Gate change records its evidence and rationale in the canonical roadmap or a new decision record.
- If this roadmap conflicts with another authoritative document, stop and report the conflict; do not choose a version unilaterally.
- Historical Phase documents are records and are not rewritten to make the current sequence appear historical.

## Current next checkpoint

**W11 Visual Language Selection Gate** is the next serial checkpoint after the accepted W02 closure. It remains `HUMAN_SELECTION_PENDING` and is not activated by this documentation update. W02 closure evidence is in `docs/W02_40_LISTING_DECISION_GATE.md`.
