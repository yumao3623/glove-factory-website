# Phase 1 Decisions

Date: 2026-08-31

## Evidence and scope

- `PROVISIONAL_RESEARCH_SCOPE`: US English primary; UK English secondary validation. This is not a final market decision.
- Product fit retains Phase 0 evidence labels. Search and platform observations do not confirm factory capability.
- `sem.3ue.com` is recorded only as `THIRD_PARTY_SEMRUSH_INTERFACE`; it is not an official Semrush first-party source. Google live SERP is a separate `PLATFORM_EVIDENCE` source.

## Decisions

| Decision | Status | Basis |
| --- | --- | --- |
| Prioritise Bridal/Wedding, Opera/Evening, Satin Opera, Lace Bridal, and Sheer/Tulle Bridal product families. | `INFERENCE` | High Phase 0 product fit plus qualified US/UK commercial SERPs. |
| Unite `bridal gloves` and `wedding gloves` under one canonical page. | `INFERENCE` | Both have retail-led commercial page forms and overlapping terminology. |
| Keep Satin Opera separate as a child landing. | `INFERENCE` | Its SERP is more materially specific than generic opera. |
| Treat Fingerless Bridal as a Bridal child/subcategory, not a core category. | `INFERENCE` | Qualified bridal SERP is valid; generic fingerless data is materially non-target. |
| Add a procurement-oriented Bridal Wholesale page only when approved commercial terms exist. | `INFERENCE` | US/UK SERPs show wholesale categories, while interface exact metrics are incomplete. |
| Defer Veils/Accessories as a V1 core page. | `INFERENCE` | Demand is visible but factory active-range proof is only medium confidence. |
| Do not create generic Lace, Mesh or Fingerless pages; do not start a broad blog. | `INFERENCE` | Mixed/non-target SERPs and lack of a factual editorial program. |
| Do not classify a researched site as a comparable manufacturer without adequate public proof. | `CONFIRMED research rule` | Current shortlist supports wholesaler or SEO-competitor labels, not a proven manufacturer-competitor label. |

## Opportunity lenses

1. **Traffic opportunity:** `wedding veils`, `bridal veils`, `opera gloves`, `lace gloves`, and `wedding gloves` have visible demand. Demand alone does not grant page ownership.
2. **Commercial opportunity:** Bridal/Wedding, Opera/Evening, Satin Opera, Lace Bridal, and Sheer/Tulle combine strong product fit with matching commercial page forms.
3. **B2B money opportunity:** `bridal gloves wholesale`, `wholesale bridal gloves` and `opera gloves wholesale` show procurement page forms. Their visible interface metrics are incomplete or low, so prioritisation comes from qualified intent and SERP form, not volume alone.

## Required before Architecture Freeze

- Confirm the active product/SKU range for each proposed hub and whether veils are a first-version product family.
- Confirm the allowed public description of customization/OEM, including exclusions.
- Confirm legal English identity and the enquiry owner/channel.
- Confirm factual materials/specifications that product pages may state.

No website code, UI, deployment, database or production change is authorised by these decisions.
