# Product Batch Ingestion Workflow

Status: `READY_FOR_PILOT_UPLOAD` before raw intake; `PILOT_HUMAN_GATE` after inspection. This is a bounded, local, static and draft-first workflow. It is not a CMS, upload endpoint, database, import-to-page feature, indexable PDP system, taxonomy change, or publication approval. A later checkpoint may consume approved evidence for a static `noindex` stakeholder-preview detail route under ADR 0005; that route is outside this ingestion gate.

## Hard boundary

Raw source ZIPs, extracted originals, inspection output, drafts, quarantine records and cleanup queues live only under the Git-ignored `.product-ingestion/` directory. They never enter the Next application. The repository may contain only an explicitly exported checksum-based intake ledger, reviewed evidence summary, approved product JSON and approved processed site assets.

The existing store-level permission for self-owned product images on the confirmed `https://jsmeilai.1688.com/` storefront is inherited automatically when the retained source metadata identifies that storefront and listing ID/URL, the untouched raw ZIP has a checksum, and each extracted image has a checksum. This establishes reuse permission only; it does not approve a production visual or publish an asset. Storefront/listing mismatch, missing provenance, third-party source indication, IP/character/brand risk, or product/image mapping conflict are Human Gate exceptions. Workshop images are outside this grant.

## Pilot workflow

1. Initialize a named local batch: `npm run ingest:batch -- init --batch pilot-2026-09-01`.
2. Put untouched single-listing ZIPs in `.product-ingestion/pilot-2026-09-01/raw/`. Do not rename, translate, group, classify or clean them.
3. Inspect them: `npm run ingest:batch -- inspect --batch pilot-2026-09-01`.
4. Review `.product-ingestion/<batch>/review/`, `draft/`, `quarantine/` and `cleanup/`. Inspection preserves the original ZIP filename and hashes each archive and extracted image. It parses retained `_URL.txt` source title/storefront/listing URLs when present; tags main, SKU and description-image references; records exact duplicate and SKU evidence; and may generate a frozen-family/name suggestion with confidence and explicit conflicts. `review/cross-listing-analysis.json` compares listing IDs, source title cues, exact image hashes and SKU evidence, but never merges drafts or creates website products; insufficient evidence remains separate or is sent to Human Gate. Recognizable third-party character/brand wording in source metadata is a listing-level Human Gate exception, not an automatic cleanup record for every image. Those suggestions and all candidate primary images remain `PENDING_REVIEW`/`UNAPPROVED`. It creates no `ProductRecord` and no public asset. A local, Git-ignored `review/human-decisions.json` can record a Human Gate family decision, a one-draft variation decision, an own-brand visual note, or `QUARANTINE_DEFER` when a confirmed exception keeps a listing excluded from the approved catalogue.
5. After the batch Human Gate, export only the ledger and summary: `npm run ingest:batch -- export-review --batch pilot-2026-09-01`. This creates `data/ingestion/batch-reviews/<batch>/` for a reviewed commit; it does not export raw source or drafts.
6. A later approved-data change can add JSON under `data/products/approved/` and must pass `npm run validate:products`. Approval does not itself wire records into collection pages. Integration is a separate checkpoint.

The inspector handles at most eight ZIPs per batch. It processes archive names in deterministic order, extracts only after rejecting unsafe ZIP paths, inventories JPG/JPEG/PNG/WebP files with SHA-256 and intrinsic dimensions, and treats other files as metadata or unsupported review items. Filename risk hints are conservative prompts, not automated approval or rejection.

## Durable cumulative registry

`data/ingestion/listing-registry.json` is the lightweight, tracked cumulative identity and Human Gate registry. It records each processed source listing's ID, batch, raw archive SHA-256, normalized draft mapping, family decision and review status. Raw ZIPs, extracted images and local draft/review files remain under Git-ignored `.product-ingestion/`.

During `inspect`, the workflow reads this registry before extraction and rejects a listing ID or raw archive hash already registered in another batch. Re-inspection of the same batch remains possible; a new batch must use new listing IDs and archive hashes. The registry is bookkeeping only and never creates a `ProductRecord`, approved asset or public catalogue entry.

`export-review` refreshes the current batch's registry entries from its intake ledger and normalized draft/quarantine output. Commit the resulting registry with the reviewed checkpoint; do not commit the raw or derived local batch files.

When Human Gate accepts multiple source listings as one normalized ingestion group, the registry may carry the same stable `normalizedProductGroupId` on each source entry. This is provenance-preserving bookkeeping only: each listing keeps its own listing ID, archive checksum and draft mapping, and the group ID does not create or approve a `ProductRecord`.

`data/ingestion/listing-relationship-fingerprints.json` is a second, lightweight tracked ledger for cross-batch relationship evidence. It stores each reviewed listing's batch, archive checksum, normalized draft/family mapping, source title, unique image/SKU SHA-256 values, and per-hash reference counts. It intentionally stores no image bytes, extracted files or local draft/review output. Run `npm run ingest:batch -- refresh-relationship-fingerprints` after a reviewed registry update to rebuild it from the local historical drafts and the durable registry.

Every later `inspect` compares the new batch against these historical fingerprints as well as within-batch drafts. Exact shared binaries produce conservative `POSSIBLE_DUPLICATE` or `POSSIBLE_VARIATION` evidence and remain `HUMAN_DECISION_REQUIRED`; title-only overlap can produce `HUMAN_REVIEW`, while construction conflicts remain `KEEP_SEPARATE`. No relationship automatically merges normalized products. The reported shared-reference metric is the conservative sum of the per-hash minimum references between the two listings; unique hash lists and reference maps preserve the underlying evidence. Perceptual/near-duplicate matching is not performed unless a future fingerprint explicitly adds that evidence, so absence of an exact hash must not be treated as proof of separation.

`export-review` also preserves the lightweight `human-decisions.json`, `cross-listing-analysis.json` and `cross-batch-analysis.json` under `data/ingestion/batch-reviews/<batch>/`. Relationship decisions are explicit (`SAME_PRODUCT_DIFFERENT_LISTING`, `POSSIBLE_VARIATION`, or `KEEP_SEPARATE`) and never trigger an automatic merge or public publication.

## Human Gate

Before any record or derivative enters `data/products/approved/` or the asset manifest, verify:

- the original archive is from the authorized storefront and its listing ID/URL is retained;
- the raw archive checksum and every selected image hash are present in the intake ledger;
- one or more source listings are deliberately grouped into each website product, without assuming one listing equals one product;
- the family, English buyer-readable name, visible style terms and safe primary image are reviewed;
- every selected image is clean and provenance-validated; production visual suitability remains a separate decision from reuse permission;
- material/composition, dimensions, colours, sizes, commercial terms and performance claims stay `UNKNOWN`/`PENDING_CONFIRMATION` unless separately evidenced; and
- the record adds no indexable/public canonical route, child route, SEO owner, factory/custom/contact/privacy content, ecommerce, account, database, DNS, Vercel, email or analytics scope. A non-indexable detail preview is permitted only under the bounded ADR 0005 amendment and a later route/publication checkpoint.

`npm run validate:products` accepts only `APPROVED` records with status-aware claims, an approved image and thumbnail under `/products/`, provenance, intrinsic dimensions and reviewed alt text. Draft output cannot satisfy that validator.

## Image triage

The cleanup queue is exception-focused. An image enters it only when it needs a real remediation or risk decision, such as an actual watermark/copyright/IP indication, third-party/provenance anomaly, or an ambiguous product mapping. Description-only images, Chinese information/spec graphics, marketplace promotional graphics, redundant binaries, and SKU evidence without reliable option labels remain non-public research evidence and do not create cleanup work by themselves. Confirmed own-store text such as `江山美来` may be marked `NON_PREFERRED_PRODUCTION` when a clean sibling exists; it is neither a third-party permission blocker nor a cleanup task. No generative removal or product-detail redraw is part of this workflow.
