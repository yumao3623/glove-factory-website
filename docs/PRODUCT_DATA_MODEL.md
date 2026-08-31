# Product Data Model

This is a catalogue schema for a static, B2B lead-generation site. It is not an inventory or order database. The V1 source may be versioned JSON/TypeScript data in the repository after Phase 3 begins.

## Record

| field | type | required | allowed/notes |
|---|---|---:|---|
| `id` | string | yes | Stable internal identifier; never derived from display text. |
| `slug` | string | no | Reserved for a future PDP; absent while V1 is category-only. |
| `product_name` | string | yes | Factual, buyer-readable name; no unverified superlatives. |
| `product_family` | enum | yes | `bridal-gloves`, `opera-gloves`, `costume-gloves`, `kids-dress-gloves`, `wedding-veils`. |
| `sub_style` | enum/list | no | Satin, lace, sheer/tulle, fingerless, bow, embellished, etc., only when evidenced. |
| `material` | structured value | yes | `{value, status, source}`; status is `CONFIRMED`, `PENDING_CONFIRMATION`, `UNKNOWN`, or `NOT_APPLICABLE`. |
| `length` | structured value | no | Numeric unit plus label only when measured/confirmed. |
| `color` | list | no | Confirmed available color names; do not infer from photography. |
| `size` | list/structured | no | Confirmed size range or `UNKNOWN`. |
| `finger_style` | enum | no | `full-finger`, `fingerless`, `half-finger`, `not-applicable`, or unknown. |
| `decoration` | list | no | Bow, pearl, lace edge, etc., only if visible and accurately named. |
| `age_group` | enum | no | `adult`, `kids`, `mixed`, or unknown. |
| `occasion` | list | no | Wedding, evening, stage, flower-girl, etc.; use supported use cases only. |
| `customizable_fields` | list/status | yes | Pattern, color, size, logo, packaging and supplied-material options each carry a confirmation status. |
| `images` | list | yes | References to approved processed assets with role and dimensions. |
| `thumbnail` | asset ref | yes | One approved crop; never a screenshot. |
| `alt_text` | string | yes | Generated from confirmed family/style/material/colour; reviewed before publish. |
| `short_description` | string | yes | 1-2 factual sentences; no invented MOQ, lead time or capacity. |
| `specifications` | map | yes | Key/value pairs with per-field status and source. |
| `featured` | boolean | yes | Editorial prominence only, not a quality or sales claim. |
| `sort_order` | integer | yes | Deterministic order within a family. |
| `status` | enum | yes | `DRAFT`, `PENDING_REVIEW`, `APPROVED`, `ARCHIVED`. |
| `moq` | structured value | no | `{value, unit, status, source}`; default is `PENDING_CONFIRMATION`, never a number. |
| `sample` | structured value | no | Availability/fee/process with status; no assumed free sample. |
| `lead_time` | structured value | no | Sample and bulk lead time separately; status required. |
| `capacity` | structured value | no | Optional factory-level fact; `UNKNOWN` until approved. |

## Unknown-value contract

Every operational field uses one of `CONFIRMED`, `PENDING_CONFIRMATION`, `UNKNOWN`, `NOT_APPLICABLE`. A missing value is not rendered as a plausible default. The UI may show a neutral “Available on request” only when the field is intentionally withheld and the copy is approved; it must not imply a numeric promise.

## Validation

- `id`, `product_name`, family, status, image references and alt text are mandatory for an approved record.
- A record with unresolved safety, licensing or identity concerns cannot be `APPROVED`.
- Product claims must link to a source/evidence note where the fact is not self-evident in the image.
- Product data is presentation/catalogue data only; no price, stock, checkout, account or order fields are in V1.
