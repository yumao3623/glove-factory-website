# Product Batch Ingestion Workflow

Status: `READY_FOR_PILOT_UPLOAD` before raw intake; `PILOT_HUMAN_GATE` after inspection. This is a bounded, local, static and draft-first workflow. It is not a CMS, upload endpoint, database, import-to-page feature, PDP system, taxonomy change, or publication approval.

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

## Human Gate

Before any record or derivative enters `data/products/approved/` or the asset manifest, verify:

- the original archive is from the authorized storefront and its listing ID/URL is retained;
- the raw archive checksum and every selected image hash are present in the intake ledger;
- one or more source listings are deliberately grouped into each website product, without assuming one listing equals one product;
- the family, English buyer-readable name, visible style terms and safe primary image are reviewed;
- every selected image is clean and provenance-validated; production visual suitability remains a separate decision from reuse permission;
- material/composition, dimensions, colours, sizes, commercial terms and performance claims stay `UNKNOWN`/`PENDING_CONFIRMATION` unless separately evidenced; and
- the record adds no public route, child route, PDP, SEO owner, factory/custom/contact/privacy content, ecommerce, account, database, DNS, Vercel, email or analytics scope.

`npm run validate:products` accepts only `APPROVED` records with status-aware claims, an approved image and thumbnail under `/products/`, provenance, intrinsic dimensions and reviewed alt text. Draft output cannot satisfy that validator.

## Image triage

The cleanup queue is exception-focused. An image enters it only when it needs a real remediation or risk decision, such as an actual watermark/copyright/IP indication, third-party/provenance anomaly, or an ambiguous product mapping. Description-only images, Chinese information/spec graphics, marketplace promotional graphics, redundant binaries, and SKU evidence without reliable option labels remain non-public research evidence and do not create cleanup work by themselves. Confirmed own-store text such as `江山美来` may be marked `NON_PREFERRED_PRODUCTION` when a clean sibling exists; it is neither a third-party permission blocker nor a cleanup task. No generative removal or product-detail redraw is part of this workflow.
