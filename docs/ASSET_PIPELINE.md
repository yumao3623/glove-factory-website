# Image and Asset Pipeline

## Repository layout

```text
assets/
  products/<family>/<product-id>/original/
  products/<family>/<product-id>/web/
  products/<family>/<product-id>/thumb/
  factory/original/  web/  thumb/
  veils/<product-id>/original/  web/  thumb/
  research/1688-screenshots/
```

Originals are immutable archives. Processed derivatives are reproducible and may be replaced. 1688 screenshots remain research evidence and are not product assets unless the factory grants explicit reuse permission and the image passes the same approval workflow.

## Filename convention

`<family>__<product-id>__<view>__<variant>__v<revision>.<ext>`

Example: `bridal-gloves__BG-001__front__ivory__v1.webp`. Use ASCII lowercase, hyphens inside tokens, double underscores between tokens, and no spaces or marketing adjectives. Keep the original filename in a manifest.

## Processing rules

- Preserve the original file and record SHA-256, source, permission, capture date and dimensions in an asset manifest.
- Generate WebP as the baseline web format and AVIF where the build pipeline can produce a visually equivalent derivative; retain JPEG/PNG fallback only when required.
- Product cards use a consistent 4:5 or 1:1 crop selected per family; detail zoom, if ever added, uses the uncropped derivative. Factory/process imagery may use 3:2.
- Record intrinsic width/height and reserve layout space to prevent CLS. Use responsive `srcset`/`sizes` and lazy loading below the first viewport.
- Minimum approved product source: one clear product image; preferred: front, detail and scale/context views. Do not upscale a low-resolution screenshot.

## Mapping and alt text

`asset-manifest.json` maps each asset to `product_id`, `role`, `source`, `permission_status` and derivative paths. Alt text follows: `[style/material] [product family] glove/veil, [view or detail]`. It describes what is visible, not an unverified feature or benefit. Decorative factory backgrounds use empty alt text.

## Quality and safety checks

- Detect duplicate binaries with SHA-256 and near-duplicate derivatives with perceptual hash; flag for review rather than silently deduplicating.
- Reject unsupported formats, embedded personal data, watermarks that imply another brand, and images with visible marketplace UI for production use.
- Verify color and material claims against factory-confirmed data; photography alone cannot establish composition, certification or performance.
- Run a manual provenance/risk review for every external image. A documented store-level permission grant may satisfy reuse permission only after the asset is linked to the authorized storefront, listing identifier and immutable source hash. No stock or third-party image may be presented as the factory's product.

## Store-level permission and batch-ingestion boundary

The factory has authorized public display on `jsmeilai.com` of self-owned product images from its confirmed 1688 storefront. Record the storefront identity, authorization date/scope, listing URL or ID, raw archive checksum and image hash before an asset inherits this permission. Historical visual-gate candidates remain at their recorded manifest status until that provenance link and risk review are completed.

Permission inheritance does not approve an asset with a watermark, marketplace UI/poster, Chinese promotional graphic, third-party material, character/brand/IP risk, unclear provenance or product-mapping conflict. Keep raw listing ZIPs and unreviewed extracted originals in an immutable local/archive staging area rather than Git by default. Commit only a checksum-based intake ledger, reviewed evidence summaries and approved site assets.

Batch processing is draft-first: raw source, derived inspection, normalized draft/quarantine and approved public assets must remain separate. Exact binary duplicates may share one presentation asset while preserving every source reference; near-duplicate matches are review candidates only. A safe edge crop is allowed only when reversible, recorded and non-semantic. Do not use generative removal or reconstruction; unresolved images belong in a separate cleanup queue and do not block clean sibling assets.
