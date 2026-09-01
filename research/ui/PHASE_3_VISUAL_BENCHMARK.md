# Phase 3 Visual Benchmark

**Status: RESEARCH_ONLY · captured 2026-08-31**

This is visual decomposition of public pages, not an endorsement or a source of product facts. Screenshots live in [`research/ui/competitor-screenshots/`](competitor-screenshots/). The local prototype is [`phase-3-prototype.html`](phase-3-prototype.html).

## Sites reviewed

| Site | Desktop evidence | Mobile evidence | Pages checked |
| --- | --- | --- | --- |
| Dents Gloves | `dents-home-desktop.png` | `dents-home-mobile.png` | homepage |
| Cornelia James | `cornelia-home-desktop.png`, `cornelia-bridal-desktop.png` | `cornelia-home-mobile.png` | homepage, bridal collection |
| Grace Loves Lace | `grace-home-desktop.png`, `grace-bridal-desktop.png` | `grace-home-mobile.png` | homepage, bridal gloves collection |
| Wedding Factory Direct | `weddingfactorydirect-home-desktop.png`, `weddingfactorydirect-gloves-desktop.png` | `weddingfactorydirect-home-mobile.png` | homepage, gloves category |
| Wona Trading | `wona-home-desktop.png`, `wona-gloves-desktop.png` | `wona-home-mobile.png` | homepage, wholesale gloves |
| Twigs & Honey | `twigs-veils-desktop.png` | `twigs-home-mobile.png` | veil collection, mobile homepage |
| Alexandra Grecco | `alexandra-home-desktop.png`, `alexandra-veils-desktop.png` | `alexandra-home-mobile.png` | homepage, veil collection |

Some Wona captures were blank/loading and Alexandra showed a hydration error; they remain evidence of the inspection attempt but are not weighted as positive patterns. Dents and Grace show cookie overlays in captures.

## Pattern decomposition

| Pattern | Competitor | Why it works | Applicable to us? | Risk |
| --- | --- | --- | --- | --- |
| Split hero with one dominant image | Cornelia James, Grace Loves Lace | Establishes occasion and material before navigation | Yes, with one H1 and RFQ action | Can become retail/editorial-only if buyer path is hidden |
| Oversized serif headline + quiet sans utility | Cornelia James, Twigs & Honey | Creates fashion signal while labels remain scannable | Yes; matches Editorial Utility | Too much display type reduces catalogue density |
| Full-bleed editorial crop | Grace Loves Lace, Alexandra Grecco | Strong emotional entry point and clear visual hierarchy | Limited; use only for hero/transition | Crop can hide product construction or read as stock imagery |
| Stable repeated product frames | Cornelia bridal, Grace bridal, Twigs veils | Lets a buyer compare silhouettes quickly | Yes; use 4:5 frames and restrained metadata | Inconsistent source crops look like marketplace exports |
| Material/occasion wayfinding | Dents, Cornelia James | Gives shoppers a mental model before product detail | Yes; five families remain the top-level model | Filters can imply unsupported attributes |
| Dense category catalogue | Wedding Factory Direct, Wona | Fast breadth scan for wholesale buyers | Yes, as a secondary sourcing-forward variant | Price, SKU and availability chrome would imply ecommerce |
| Trust / service transition | Cornelia James, Grace Loves Lace | Moves from inspiration to an action or consultation | Yes; bridge to RFQ and workshop evidence | Copying heritage, sustainability or service claims is unsafe |
| Visible enquiry CTA | Wholesale references, Cornelia James | Keeps conversion available while browsing | Yes; persistent in header and closing band | A phone/email cannot be invented; use pending-contact state |
| Mobile collapse to two-column grid | All responsive references | Preserves scan speed on narrow screens | Yes, with 44px targets and no horizontal scroll | Tiny cards lose image and metadata clarity |
| Soft borders, low-radius frames | Cornelia, Twigs & Honey | Adds structure without SaaS panels | Yes; 0–4px radius and 1px rules | Over-framing creates dashboard/marketplace tone |

## Reusable rules

- Keep the five-family Products hub as the information architecture; use visual wayfinding rather than a generic “all products” grid.
- Use serif only for display moments and collection names; use a neutral sans for navigation, metadata and RFQ form labels.
- Keep product cards factual and category-oriented: no price, stars, discount, inventory or Add to Cart.
- Use a single terracotta CTA on paper/ink; reserve dark filled buttons for high-contrast utility actions.
- Let workshop photography appear only in a trust/process band and label its permission status during the gate.
- Treat filters as progressive enhancement; expose only confirmed attributes.

## Rejected patterns

- Centred SaaS hero with icon tiles and three feature cards.
- Consumer ecommerce chrome (price, sale badges, reviews, stock, cart).
- Alibaba-style dense grids with tiny thumbnails, promotional labels or unverified SKU/volume claims.
- Luxury bridal moodboards that bury family navigation and RFQ intent.
- Industrial PPE palette, hard technical panels or factory-statistic counters.
- Any marketplace screenshot, watermark, Chinese marketing panel, Frozen/Elsa/Disney reference, stock photo or AI-generated factory image.
