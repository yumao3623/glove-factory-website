# W11 Visual Language Selection Gate

Status: `COMPLETE; HUMAN_REVIEW_ACCEPTED`

Workstream: `W11`

Bounded checkpoint: **Visual Language Selection Gate**

Prepared from `main` at `7400abd` on 2026-09-06. This record is limited to visual-language candidates, asset classification, and the Human selection request. It does not authorize UI, runtime, asset export, deployment, DNS, provider, or route changes.

## Authority and dependencies

- Canonical sequence: `docs/V1_POST_PREVIEW_EXECUTION_ROADMAP.md`.
- W01 and W02 are Human-accepted. W02 permits later consideration of 36 displayable normalized candidates, but does not create ProductRecords, an approved asset export, or public publication.
- Existing UI direction remains the historical `Editorial Utility` / refined E baseline in `docs/UI_DESIGN_SPEC.md` and `docs/PHASE_3_VISUAL_GATE.md`. It is an input to comparison, not an automatic W11 selection.
- `research/ui/PHASE_3_VISUAL_BENCHMARK.md`, `research/ui/COMPETITOR_UI_REVIEW.md`, and `research/ui/SHADCN_REFERENCE_REVIEW.md` are research records. They do not transfer competitor assets, copy, architecture, or implementation requirements.

## Asset and reference classification

### Formal-use status

| Input | W11 classification | What it may support now | What is still required before formal use |
| --- | --- | --- | --- |
| `W11_FACTORY_PHOTOS.zip` (3 images; archive SHA-256 `BF854E91CCBEC16260891DB9847FB24FDB9C06F94FDA379E45B433D77E77FEE0`) | `HUMAN_PUBLIC_USE_APPROVED`; placement remains a later W05/Factory implementation decision | Evaluate workshop/process/trust placement and crop intent | Immutable asset manifest, technical/privacy review, confirmation of which visible facts may be stated; do not infer capacity, certification, QC, or customer claims |
| Existing `_stitch_input_pack/02_CONTENT_PRODUCTS/` and `03_CONTENT_FACTORY/` images | Local visual evaluation pool; publication status remains governed by `docs/ASSET_PIPELINE.md` and the accepted W02 workflow | Test density, family wayfinding, product framing, and trust-band balance | Listing/storefront provenance link, source hash and reviewed approved export for each published image; no unsupported material/performance claims |
| `W11_HOMEPAGE_CANDIDATE_ASSETS.zip` (24 images; archive SHA-256 `3E3A321C552DE48A0EAF3BEBD60807CB2F2B143D031E920B99793C9736ED53F5`) | `HUMAN_PUBLIC_USE_APPROVED_FOR_EDITORIAL_DECORATIVE_USE; ASSET_PIPELINE_PROCESSING_PENDING` | May be used in later W05 for Hero, background, section visual, family entry, or other editorial/decorative placement; may be cropped or web-processed | File-level SHA-256 manifest, technical processing and final asset review under `docs/ASSET_PIPELINE.md`; do not map an image to a specific JS Meilai product without evidence, and do not describe it as factory production imagery |
| `motionsites.ai` | Style/interaction reference only | Noticeable motion, browsing/filter language, dark/light contrast, and editorial card rhythm | No copied prompts, assets, code, or motion dependency |
| `seesaw.website/category/e-commerce` | Style/layout reference only | E-commerce composition patterns and image density | No copied imagery, wording, branding, or exact layout |
| `VoltAgent/awesome-design-md` and `yumao3623` fork | Design-system guidance reference only | Compare hierarchy, spacing, type and component vocabulary | No code copying or architecture mandate; reconcile any idea with this repository's Next.js/spec/accessibility boundaries |

Human has explicitly authorized the homepage ZIP images for use on `jsmeilai.com` as editorial and decorative visual material. The authorization does not assign product identity, factory provenance, or unsupported claims to any image. The ZIP still needs the normal file-level hash, technical and asset review before W05 publishes derivatives. The factory ZIP remains Human-approved public-use input, with the same claim and technical boundaries.

## Candidate briefs

The four candidates share the frozen information architecture: five product families, a visible RFQ path, factual product cards without retail commerce chrome, and a supporting factory/process band. The choice concerns visual language and composition, not route scope or claims.

### A. Editorial Utility / Refined E (recommended)

**One-line brief:** A product-led manufacturer homepage with a quiet editorial opening, dense family wayfinding, and a factual workshop bridge.

**Composition:** Split or offset hero using approved product imagery only; five-family asymmetric discovery; repeated 4:5 or 1:1 product frames; a restrained process band using the wide workshop photos; closing RFQ action with strong hierarchy.

**Borrow:** Cornelia James / Grace-like serif-display plus sans utility contrast; Twigs-like repeated frames; MotionSites-style browsing/filter clarity where it improves scanning.

**Avoid:** Retail styling claims, oversized empty hero, competitor crops, full-bleed workshop hero, and decorative glass/blur that reduces image inspection.

**Fit:** Best balance of fashion sensitivity, B2B credibility, product density and the existing E evidence. It directly addresses the stakeholder complaint that the page feels empty without turning into a wholesale marketplace.

**Risk:** Requires disciplined crop consistency and enough approved product images to keep the page from falling back to generic placeholders.

### B. Sourcing Catalogue / Dense Utility

**One-line brief:** A comparison-first catalogue entrance for buyers who need breadth and a fast route to an enquiry.

**Composition:** Compact header with persistent RFQ; family rail or segmented wayfinding; 3- or 4-column product grid with stable frames and short factual metadata; workshop evidence as a narrow proof strip; editorial image used as a secondary transition.

**Borrow:** Wedding Factory Direct / Wona-style breadth scan; Dents-like department navigation; Seesaw category density.

**Avoid:** Prices, SKUs, availability, ratings, sale badges, tiny thumbnails, filters that imply unverified attributes, and Alibaba-style promotional panels.

**Fit:** Strongest for procurement efficiency and lower visual ambiguity; easiest to keep performant.

**Risk:** Can read as a generic wholesaler and underplay the occasionwear material quality that differentiates this factory.

### C. Material Atelier / Quiet Luxury

**One-line brief:** A tactile, light-toned visual system that makes satin, lace and veil texture the primary story, with sourcing actions kept close to each section.

**Composition:** Tonal paper/ink palette; one expressive serif for collection moments; macro product/detail frames; generous but bounded whitespace; small family index and a clearly repeated RFQ action; factory photos appear only after the product story.

**Borrow:** Alexandra Grecco / Cornelia whitespace, soft material transitions, and close-up inspection.

**Avoid:** Moodboard-only pages, lifestyle imagery with unknown licensing, pale text on pale backgrounds, and a hero that hides family navigation or B2B intent.

**Fit:** Best for bridal and occasionwear buyers who respond to finish and styling.

**Risk:** Highest chance of repeating the current “too empty/template-like” problem and weakest for breadth comparison on desktop.

### D. Motion-led Layered Gallery (reject unless Human explicitly wants a bounded experiment)

**One-line brief:** A high-contrast, animated gallery with layered image cards, restrained depth and scroll-linked transitions.

**Composition:** Dark/light sectional contrast; offset or overlap cards; subtle reveal motion; family navigation embedded in the gallery; RFQ anchored at entry and exit.

**Borrow:** MotionSites' browsing language, not its prompts/assets; limited use of layered borders, inner shadows, or a single low-amplitude transition.

**Avoid:** 3D/particle backgrounds, auto-playing video, heavy blur/glass, scroll-jacking, motion as the only hierarchy, and anything that makes product details hard to inspect.

**Fit:** Could answer the template-like complaint and create a stronger desktop presence.

**Risk:** Highest performance, accessibility, and maintenance risk; also easiest to drift from a credible manufacturer site into a design demo. This should not be selected as the default W05 direction.

## Factory-photo placement assessment (not implementation)

- The two 1920x1080 workshop images are suitable candidates for a 3:2 process/trust band or a split Factory-page introduction. They show active sewing work and material handling, so captions must stay descriptive and avoid production-volume or quality-system claims.
- The close-up machine image is suitable as a small process-detail insert or equipment-context image. The visible machine branding and marketplace-origin marking make it unsuitable as the dominant hero. Any crop decision belongs to the later asset review and must remain reversible.
- None of the three images should be used as the homepage hero or as evidence for certifications, capacity, lead time, export history, named customers, or QC statistics.

## Optional future material for later W05 / Factory work (non-blocking)

The current photos are sufficient to implement and evaluate the selected visual language and a bounded trust/process treatment. The following could improve a later Factory story, but their absence is not a W11 or W05-wide blocker:

- exterior/entrance and an identifiable but privacy-safe workshop establishing view;
- clean close-ups of cutting, sewing, finishing, inspection and packing stages;
- product-in-process or material/detail photos that can be mapped to approved families;
- packaging/dispatch context if that process will be described;
- a small set of consistent vertical and horizontal crops, with consent and source dates;
- any factual facility or process evidence that the Human intends to publish, paired with the exact claim boundary.

These are optional future inputs, not requirements for the selected direction. Unknown facts must remain omitted.

## Human decision

Human Review on 2026-09-06 selected **A — Editorial Utility / Refined E** as the site-wide visual language. This is an active direction for future W05 work, not a decision to preserve the current UI unchanged.

The selected direction must continue with:

- split/offset Hero composition;
- higher meaningful product-image density;
- asymmetric entry to all five product families;
- a restrained factory trust/process section using the approved factory photos;
- restrained use of light layering, offset cards, tactile borders, and low-amplitude motion only where they improve hierarchy, inspection, performance, accessibility, and mobile behavior.

Human explicitly rejected D as the default direction. B and C remain rejected alternatives for this gate unless a later Human decision reopens them.

## Decision log

| Decision | Evidence / rationale | Status |
| --- | --- | --- |
| Preserve five-family, sourcing-forward architecture | `docs/UI_DESIGN_SPEC.md`, `docs/PHASE_3_VISUAL_BENCHMARK.md`, W01/W02 boundaries | `REPO_CONFIRMED` |
| Treat homepage ZIP as Human-authorized editorial/decorative site content, pending normal asset processing | Human Review decision 2026-09-06; archive checksum recorded above; no product/factory identity may be inferred | `HUMAN_REVIEW_ACCEPTED; ASSET_PROCESSING_PENDING` |
| Treat factory ZIP as Human-approved public-use input, subject to technical/fact review | User request plus `research/assets/phase-3-review/ASSET_REVIEW.md` | `HUMAN_REVIEW_ACCEPTED` |
| Select Candidate A and reject D as the default | Human Review decision 2026-09-06; A best fits B2B credibility, content density, accessibility/performance and the accepted E baseline | `HUMAN_REVIEW_ACCEPTED` |
