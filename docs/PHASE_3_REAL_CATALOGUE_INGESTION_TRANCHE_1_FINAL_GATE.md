# Phase 3 Real Catalogue Ingestion Tranche 1 Final Gate

Status: `PASS - REAL INGESTION REVIEWED; CATALOGUE INTEGRATION DEFERRED`

Baseline: `bb4bb0a7bce3aa817b81a8c9a6a9fa25fe16ed6e`

This bounded tranche closes six new real single-listing inputs and the durable cross-batch relationship capability. It does not create public products, collection integration, a Costume route, a PDP, a database, or production infrastructure.

## Reviewed result

- Batch `tranche-1-batch-01`: 6 real listings, 6 non-publishable drafts, 0 quarantine records, 236 inherited-image references, and 0 cleanup records.
- Family Human Gate: `819967426657` and `733010943271` accepted as `bridal-gloves`; `962080651234` accepted as `costume-gloves` with route/sitemap deferred; `814984964565` accepted as `kids-dress-gloves`; `956309661690` and `844530638864` accepted as `opera-gloves`.
- Cross-batch Human Gate: `814984964565` and `737751870967` share ingestion group `kids-dress-gloves-group-737751870967` as `SAME_PRODUCT_DIFFERENT_LISTING` / `DUPLICATE_MARKETPLACE_PRESENTATION`, while both source records and provenance remain separate. The two satin relationships to `730186552239` remain `POSSIBLE_VARIATION` / `RELATED_LISTING`; `844530638864` versus `857043957533` is `KEEP_SEPARATE`.
- Durable state: 16 unique listing registry entries and 16 relationship fingerprints. Approved public ProductRecord count remains 0.

## Boundary and verification

- Raw ZIPs, extracted images, drafts, quarantine output, cleanup queues and local review overlays remain Git-ignored. Only checksum-based ledgers and lightweight JSON review evidence are exported.
- Duplicate protection continues to reject a listing ID or raw archive hash already registered in another batch, while same-batch reinspection remains idempotent.
- `V1_DATABASE = NONE`, frozen taxonomy, Route Registry, sitemap ownership, SEO ownership and collection integration are unchanged. Costume classification does not create `/costume-gloves/`.
- No relationship automatically merges ProductRecords. The accepted SAME_PRODUCT decision only records an ingestion-level group ID.

Required checks: `npm test`, `npm run typecheck`, `npm run lint`, `npm run validate:products`, `npm run build`, `git diff --check`, targeted sensitive-data scan, and staged-file review.

## Next checkpoint

Begin the next bounded real batch only from the reviewed main baseline after this checkpoint is merged and tagged. Catalogue-to-collection integration remains a separate later checkpoint.
