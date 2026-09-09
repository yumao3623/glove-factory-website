# Post-W02 Approved-Data and Product-Preview Integration Handoff

Status: `IN_PROGRESS; ARCHITECTURE_CONTINUED_IN_NEXTJS`

Bounded checkpoint: `Post-W02 approved-data and product-preview integration handoff`

This record implements the concrete successor defined in `docs/V1_POST_PREVIEW_EXECUTION_ROADMAP.md`. It does not reopen W02, import the remaining 1688 catalogue, change W05 status, activate RFQ delivery, or make product-detail pages indexable.

## Current boundary

On 2026-09-08 Human Review resumed this repository's existing Next.js/Vercel implementation after evaluating a separate WordPress experiment. WordPress remains an optional reference for later page structure and SEO patterns; it is not an implementation dependency or a replacement project. This handoff continues in the current repository and still requires the complete 36-product evidence set before its Human Gate.

## Evidence

| Requirement | Repository evidence | Status |
| --- | --- | --- |
| Approved data conversion | `data/products/approved/initial-public-tranche.json` contains 36 status-valid `APPROVED` ProductRecords for the 39 W02-approved source listings; `npm run validate:products` validates the record/manifest/provenance loop. | `REPO_CONFIRMED` |
| Approved asset manifest | `data/approved-catalogue.ts` exposes records whose confirmed `/products/...` images map to `HUMAN_PRODUCTION_APPROVED` manifest derivatives under `public/products/media`. | `REPO_CONFIRMED` |
| Collection integration | `components/product/product-card.tsx` renders all approved product identities, links to detail previews and emits the product-scoped RFQ context across five family routes. | `REPO_CONFIRMED` |
| Detail preview | `app/products/[slug]/page.tsx` statically generates all 36 approved slugs, returns 404 for other slugs, and renders each product's mapped multi-image detail preview. | `REPO_CONFIRMED` |
| Indexability boundary | Detail metadata sets `previewRobots` (`noindex`, `nofollow`, `noarchive`, `noimageindex`), has no canonical alternate, and is absent from `app/sitemap.ts`. | `REPO_CONFIRMED` |
| RFQ context contract | `data/product-rfq-context.ts` defines exactly `productId`, `slug`, `family`, `approvedDisplayName` and `sourceRoute`. Collection cards and detail previews emit this context; no price, MOQ, inventory, delivery, capacity, certification or QC field is included. | `REPO_CONFIRMED` |

## Product scope

The handoff integrates all 36 W02-approved normalized products:

- `kids-dress-gloves-satin-bow-001` -> `/kids-dress-gloves/`
- `bridal-gloves-sheer-lace-long-001` -> `/bridal-gloves/`
- `opera-gloves-satin-short-001` -> `/opera-gloves/`
- `wedding-veils-black-lace-trim-001` -> `/wedding-veils/`

The four `costume-gloves` records are supported non-licensed styles. The quarantined Frozen/Elsa listing `776815144156` is excluded from both records and production assets. No W02 audit is repeated here.

The remaining authorized-store 1688 intake is the separate W03 `Next Ingestion Tranche Gate`; it is not part of this handoff.

## Human gate

Human Review is required for this handoff before W08 freezes route/content and before W04 consumes the contract for live RFQ integration. Until acceptance, the detail previews remain internal stakeholder-preview surfaces and RFQ delivery remains disabled.
