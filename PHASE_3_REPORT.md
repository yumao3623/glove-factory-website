# Phase 3 Report: Visual Gate

Date: 2026-08-31

## Outcome

All seven supplied marketplace ZIPs were inspected as 229 image files. They were unpacked only into a git-ignored review workspace; no ZIP and no unreviewed marketplace image was copied into `public/` or an approved web-asset directory.

The two supplied workshop photographs are present in `assets/factory/original/` as source-format PNGs. They are usable only for the current Factory/Trust visual prototype and remain `REQUIRES_PERMISSION_CONFIRMATION` before publication.

## Classification

| Status | Asset groups |
| --- | --- |
| `VISUAL_GATE_APPROVED_CANDIDATE` | Bridal lace fingerless gloves; sheer long lace gloves; kids satin bow gloves; long satin/opera gloves; wedding veils; the two workshop photographs. |
| `REQUIRES_PERMISSION_CONFIRMATION` | Every candidate group above. Marketplace availability does not establish website reuse rights; the workshop photographs also require final reuse confirmation. |
| `RESEARCH_ONLY` | Chinese product-information graphics, measurements, material/feature graphics, packaging graphics and factory-introduction posters. |
| `REJECT_FOR_PRODUCTION` | Watermarked fringe-glove image set; princess-print set supplied with Frozen/Elsa IP context. |

## Guardrails Applied

- Visible marketplace UI, watermarks, Chinese marketing copy, price/sales-style graphics and packaging panels are excluded from production imagery.
- No factory-poster claim is publishable from the imagery: establishment year, equipment, quality system, customer recognition and similar claims remain blocked by `docs/PUBLISHING_BOUNDARIES.md`.
- Disney, Frozen and Elsa must not appear in product names, copy, alt text or SEO metadata.
- No stock or AI-generated substitute is introduced as purported factory or product photography.

## Records and Reuse

- `assets/asset-manifest.json` records source, visual decision, permission state, selected review IDs and workshop-photo SHA-256 values.
- `research/assets/phase-3-review/image-inventory.csv` stores dimensions and SHA-256 values for every inspected marketplace image.
- Generated contact sheets in `research/assets/phase-3-review/` support visual review without promoting all source images to production assets.
- `scripts/audit_asset_images.py` regenerates the inventory and sheets from a review-only extraction directory.

## Publication Blocker

Before any candidate product photograph or workshop image is published, obtain explicit confirmation that the factory grants public website reuse, record the confirmation in the manifest, and create only the required named derivatives under the appropriate `assets/*/web/` and `assets/*/thumb/` paths.
