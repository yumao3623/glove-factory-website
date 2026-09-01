# Phase 3 Visual Research Gate 2

**Status: Human Visual Gate 2 passed with conditions; Variant E selected for Checkpoint 1 implementation and refinement.**
**Scope: local rendered visual prototypes; no public publishing approval is implied.**

## Why the earlier A/B/C concepts failed

The initial concepts retained the right information architecture, but the Human Visual Research Gate rejected their visual outcome. The shared diagnosis was that they were too sparse and text-led: an oversized headline and one isolated marketplace-style product image carried the hero; five equal family cards read as a component set; and a single workshop image appeared as an abrupt evidence block rather than part of the page rhythm. Their differences were mostly typography and density, not meaningfully different compositions.

This rework preserves the frozen **Editorial Utility** architecture and refines its expression to **Image-led Editorial Utility**: real product imagery carries the visual story while sourcing navigation, custom-manufacturing context, workshop evidence and the RFQ remain direct but secondary.

## Existing research reused

No competitor research was repeated. This rework applies the patterns already documented in [PHASE_3_VISUAL_BENCHMARK.md](../research/ui/PHASE_3_VISUAL_BENCHMARK.md) and the local [visual reference board](../research/ui/visual-reference-board.html). In particular it reuses the editorial pacing and image hierarchy observed in Cornelia James, Grace Loves Lace, Twigs & Honey and Alexandra Grecco, while retaining the range-navigation and B2B clarity learned from Dents, Wedding Factory Direct and Wona Trading.

The two supplied Stitch reference images were treated as visual references only. Stitch was not available as an executable tool or claimed as the prototype authoring method. Their useful signals were restrained serif/sans contrast, asymmetric image groupings, visual product rhythm and an integrated product-to-workshop transition. Their narrow/mobile composition, branding, copy, contact details and implied claims were not reused.

## Variants rendered

| Variant | Direction | Hero composition | Family discovery | Factory integration | CTA study |
| --- | --- | --- | --- | --- | --- |
| D | Balanced Image-led Editorial Utility | Light editorial split: short B2B copy and a three-image bridal/lace/opera mosaic | Bridal lead image, secondary opera image, then three unequal supporting modules | Cool-neutral evidence section, two restrained workshop crops and a video-ready fallback | `Request a Quote` |
| E | More Refined Image-led Editorial Utility | Dark image field: coordinated bridal, opera and veil images dominate; text is a smaller adjacent field | More fashion-led asymmetric sequence with a double-width bridal lead and offset opera/veil studies | Muted process band carries the same two workshop images as supporting evidence, not a hero | `Discuss Your Requirements` |

The variants deliberately differ in composition, visual density, family hierarchy, factory placement and CTA language. They do not change the five family owners, the category-only B2B catalogue model, route registry or SEO ownership.

## Image-density strategy

The homepage uses a sequence of real local candidate images rather than one hero asset: the opening mosaic, family discovery, a material/detail pairing, a cross-family custom-manufacturing bridge and a two-image workshop evidence band. This produces a product-led journey:

`hero -> family discovery -> detail/context -> custom bridge -> workshop evidence -> RFQ`

Image treatment uses stable ratios, consistent neutral framing, `object-fit` crop rules and contained product presentation where the source has an isolated background. No product was materially altered, and no stock, AI-generated, watermarked, promotional-panel or IP-restricted image was used.

## Bridal collection study

Both collection variants introduce the family with multiple real bridal images, then move through a visual product-study grid, a lace/detail editorial break, a sourcing/manufacturing bridge and a procurement/RFQ area. The cards remain B2B catalogue studies: no prices, cart, ratings, inventory or PDP links. Their names are explicitly marked development fixtures; pending procurement values remain pending rather than inferred from photography.

## Factory and optional video treatment

Factory evidence is intentionally below the product story and uses both approved-candidate workshop photographs within a restrained neutral composition. It is labelled as local visual-gate evidence and makes no claim about capacity, MOQ, lead time, certification, quality system or factory history.

Both homepage variants reserve a **video-ready media slot** in that evidence sequence. With no approved video currently available, the slot gracefully describes a future approved product/process clip and retains the workshop-image sequence as its current fallback. No stock or AI production footage is used.

## Typography, palette and CTA treatment

Both directions use an expressive display serif only for headings, a neutral sans-serif for operational copy/form controls, close-to-black text, white/cool-neutral surfaces and square, high-contrast actions. This reduces the generic landing-page button treatment while retaining visible focus states and 44px minimum interactive targets.

D is the lower-contrast, lighter editorial study. E uses a high-contrast dark hero and a more strongly image-dominant opening. The CTA labels are shown as comparative copy studies only; neither label is finalized here.

## Real assets and permission boundary

Every local image used by the rendered prototypes is listed in [data/visual-gate-media.ts](../data/visual-gate-media.ts) and sourced from [the selected visual input pack](../_stitch_input_pack/). The pack contains 14 reviewed product candidates across bridal, opera, costume, kids and veils, plus two workshop candidates.

Per [ASSET_REVIEW.md](../research/assets/phase-3-review/ASSET_REVIEW.md) and `assets/asset-manifest.json`, every selected product and workshop asset is:

- `VISUAL_GATE_APPROVED_CANDIDATE`
- `REQUIRES_PERMISSION_CONFIRMATION`
- allowed for local/development/Visual Gate use only

They are not production publishing assets. No image was moved into `public/`; rejected watermarked marketplace images, Chinese promotional panels, factory introduction posters and Frozen/Elsa/Disney/IP material remain excluded.

These were the permission states at the visual gate. Subsequent store-level permission for eligible self-owned factory 1688 product images is governed by `ASSET_PIPELINE.md`; it requires source/provenance validation and does not promote workshop, watermarked, poster, third-party or IP-risk assets.

## Rendered evidence

All screenshots are local research artifacts in [research/ui/prototype-screenshots-v2/](../research/ui/prototype-screenshots-v2/):

| Surface | Variant D | Variant E |
| --- | --- | --- |
| Homepage desktop | [home-d-desktop.png](../research/ui/prototype-screenshots-v2/home-d-desktop.png) | [home-e-desktop.png](../research/ui/prototype-screenshots-v2/home-e-desktop.png) |
| Homepage mobile | [home-d-mobile.png](../research/ui/prototype-screenshots-v2/home-d-mobile.png) | [home-e-mobile.png](../research/ui/prototype-screenshots-v2/home-e-mobile.png) |
| Bridal collection desktop | [bridal-d-desktop.png](../research/ui/prototype-screenshots-v2/bridal-d-desktop.png) | [bridal-e-desktop.png](../research/ui/prototype-screenshots-v2/bridal-e-desktop.png) |
| Bridal collection mobile | [bridal-d-mobile.png](../research/ui/prototype-screenshots-v2/bridal-d-mobile.png) | [bridal-e-mobile.png](../research/ui/prototype-screenshots-v2/bridal-e-mobile.png) |

## Human Visual Gate 2 outcome

Human Visual Gate 2 passed with conditions. Variant E, **Refined Image-led Editorial Utility**, was selected as the Checkpoint 1 implementation direction. The implementation may refine E's spacing, crop, typography proportion, card treatment, mobile density, CTA treatment and factory integration without reopening the frozen route, SEO, product-family, catalogue or V1 database decisions.

The following publication decisions remain pending and are not granted by this visual approval:

1. Final public H1 and buyer-facing catalogue copy.
2. Provenance, risk and product-mapping review for every product or factory image selected for publication. Eligible self-owned 1688 product images can inherit the subsequent documented store-level permission; factory/workshop images remain separate.
3. Approved English identity, legal details and public contact details. `jsmeilai.com` is now the confirmed official domain, but DNS, hosting binding, production canonical configuration and launch remain separate pending decisions.
4. Any MOQ, sample, lead-time, capacity, certification, material or specification claim.

## Stop condition

This checkpoint provides visual evidence for Human Gate review. It does not expand routes, create deployment/domain/email services, change frozen architecture or authorize public use of the imagery. Formal production direction remains pending Human Visual Gate 2.
