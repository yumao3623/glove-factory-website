# Phase 3 Visual Research & Prototype Pre-Gate

**Checkpoint status: waiting for Human Visual Research Gate**
**Scope: visual research and low-cost concepts only; formal page implementation is paused.**

## Competitors and evidence

Reviewed Dents Gloves, Cornelia James, Grace Loves Lace, Wedding Factory Direct, Wona Trading, Twigs & Honey and Alexandra Grecco. Desktop/mobile captures are in [`research/ui/competitor-screenshots/`](../research/ui/competitor-screenshots/), with source URLs and page notes in [`research/ui/PHASE_3_VISUAL_BENCHMARK.md`](../research/ui/PHASE_3_VISUAL_BENCHMARK.md). Captures are research artifacts, never production imagery.

## Reference board

Open [`research/ui/visual-reference-board.html`](../research/ui/visual-reference-board.html) locally. It groups typography, palette, CTA, hero, collection grid, product-card, trust and mobile references, plus explicit Do/Don't guardrails. The board uses only a small set of reviewed candidate copies and is marked RESEARCH_ONLY. Render evidence is preserved in [`research/ui/prototype-screenshots/home-desktop.png`](../research/ui/prototype-screenshots/home-desktop.png) and [`research/ui/prototype-screenshots/home-mobile.png`](../research/ui/prototype-screenshots/home-mobile.png).

## Prototype method and variants

Stitch was not available as a usable local skill or tool, so no Stitch prototype is claimed. The replacement is a static HTML/CSS concept with real local images and a small variant switcher: [`research/ui/phase-3-prototype.html`](../research/ui/phase-3-prototype.html).

| Variant | Hero | Grid/card treatment | Best use | Trade-off |
| --- | --- | --- | --- | --- |
| A · Balanced Editorial Utility | Split copy/image, serif H1, direct RFQ | Five-family image rail; 4-column collection grid | Recommended baseline | Least dramatic; strongest buyer clarity |
| B · Refined Fashion Editorial | Larger serif, square hero crop, more whitespace | Fewer visual interruptions, editorial pacing | Human review if premium signal is priority | Can under-serve sourcing scan speed |
| C · Sourcing-forward Editorial Utility | Sans-led H1, wider image crop, denser family list | Compact 3-up family layout and metadata | Human review for catalogue-first buyers | Risks wholesale/marketplace tone if densified further |

Use the top bar to compare Homepage and Bridal collection compositions. The five families remain unchanged in every variant.

## Real images used

The prototype and board use small research copies of reviewed candidates in [`research/ui/prototype-assets/`](../research/ui/prototype-assets/): bridal lace, sheer lace, long satin opera, kids satin bow, wedding veil and one factory workshop image. At this gate, manifest status for every product and factory image was `VISUAL_GATE_APPROVED_CANDIDATE` plus `REQUIRES_PERMISSION_CONFIRMATION`; this authorized local visual-gate review only, not public publication. No production/public asset import was made. Subsequent store-level permission for eligible factory 1688 product images is governed by `ASSET_PIPELINE.md`; it does not promote these historical candidates until provenance and risk validation pass.

Rejected source classes remain excluded: watermarked marketplace images, Chinese marketing panels, factory introduction posters, Frozen/Elsa/IP material and any unreviewed bulk image set.

## Homepage comparison questions

- **Image-led hero:** strongest immediate material signal; must retain a clear B2B H1 and RFQ action.
- **Split copy/image (Variant A):** clearest balance of buyer language and product texture; recommended starting point.
- **Restrained collage / denser sourcing treatment (Variant C):** improves family breadth scanning but needs guardrails against wholesale-marketplace feel.
- **Trust transition:** workshop image works as evidence between family discovery and custom/RFQ bridge; no factory claims or metrics are shown.

## Bridal collection questions

- Intro stays short and buyer-oriented; no invented MOQ, sample, lead time, capacity, material or certification.
- Four-column desktop / two-column mobile is the comparison baseline; 4:5 frames keep lace detail legible.
- Metadata is limited to family/style/context and marked fixture-only in the prototype.
- RFQ appears after the grid and in the closing band; no ecommerce controls or PDP links are introduced.

## Human decisions required

1. Select A, B or C as the bounded layout direction for formal implementation.
2. Approve serif/sans balance and the warm-paper + ink + terracotta palette, or specify a bounded alternative.
3. Confirm CTA label and whether RFQ should be present in the header on mobile.
4. Confirm card radius/border treatment and whether the collection baseline remains 4:5.
5. Choose the final H1 wording for the next gate: “Occasion Gloves & Wedding Veils Manufacturer” versus “Special Occasion Gloves & Wedding Veils Manufacturer”. No winner is declared here.
6. Confirm reuse permission for each selected product/factory image before publication.

## Stop condition

This checkpoint intentionally does not add or alter formal Homepage, Products or Bridal production components, routes, sitemap, identity, contact details or claims. Wait for Human Visual Research Gate approval before continuing implementation.
