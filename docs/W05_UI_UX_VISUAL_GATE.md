# W05 UI/UX Visual Gate

Status: `COMPLETE; HUMAN_REVIEW_ACCEPTED`

Workstream: `W05 — UI/UX Visual Gate`

Bounded checkpoint: **UI/UX Visual Gate**

Human Review: `ACCEPTED 2026-09-07`

## Authority and scope

This record closes the bounded visual work on the current stakeholder-preview homepage and its reused collection visual components. It consumes the selected `A — Editorial Utility / Refined E` direction and the approved W11 asset-use boundaries. It does not implement or pre-approve product-data conversion, new catalogue routes, indexable product-detail pages, live RFQ delivery, or formal publication.

The next implementation handoff is recorded in `docs/V1_POST_PREVIEW_EXECUTION_ROADMAP.md` as **Post-W02 approved-data and product-preview integration handoff**. That handoff keeps the existing W01-W12 IDs, does not reopen W02, and is not W03's remaining 1688 ingestion work.

## Accepted visual result

- **Hero and editorial composition:** multiple W11-authorized editorial images are used in split/offset, layered and locally cropped relationships rather than an equal-width row of boxed placeholders. Hero, material/detail, custom-manufacturing and transition areas use distinct crops and image density to establish an editorial opening and a continuous visual rhythm.
- **Continuous visual field:** satin, lace, veil and texture imagery is used as restrained background/transition treatment with opacity, crop and dark/light overlays kept behind readable copy. Editorial images remain decorative and are not represented as products or factory evidence.
- **Typography and hierarchy:** serif display headings are paired with compact sans utility text, clear section labels and explicit sourcing CTAs. Scale is bounded for desktop and mobile and remains readable as B2B manufacturer communication.
- **Five family entries:** each family has a stable 4:5 full-bleed image frame and consistent subject dimensions, with controlled vertical offsets providing composition rhythm. Product imagery and editorial imagery are kept distinct. The current stable homepage mapping is recorded in `data/w05-homepage-visuals.ts`:
  - `bridal-gloves` -> `bridal-gloves-sheer-lace-long-001`, source listing `856992679458`; approved lace primary view selected for a legible full-bleed crop.
  - `opera-gloves` -> `opera-gloves-satin-short-001`, source listings `730659973350`, `956904395389`; approved satin primary view selected for formalwear context.
  - `costume-gloves` -> `costume-stage-gloves-legacy-001`, source `_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_costume_01.jpg`; non-IP stage-glove product view retained as a category visual only, not an approved ProductRecord or route launch decision.
  - `kids-dress-gloves` -> `kids-dress-gloves-satin-bow-001`, source listings `737751870967`, `814984964565`, `775921736857`; approved bow/full-finger primary view selected for stable category framing.
  - `wedding-veils` -> `wedding-veils-black-lace-trim-001`, source listing `800814497148`; approved lace-edge primary view selected for a truthful veil signal.
- **Product detail visual moment:** the homepage detail section is a compact, dense multi-image composition combining approved product detail views with W11-authorized editorial close-ups. It uses near/detail crops and a bounded grid rather than reserving a tall empty panel.
- **Factory treatment:** existing factory photographs are absent from the homepage. The homepage retains one designed Factory bridge/CTA using editorial material only. Factory evidence remains owned by the future `/factory/` route and is not inferred from editorial imagery.
- **Viewport and quality checks:** the changed surfaces preserve responsive grid constraints at 1440, 1024, 768 and 375px, keyboard-visible focus treatment, alt-text boundaries, reserved image aspect ratios and reduced-motion handling. `npm run build` and `git diff --check` pass for the current worktree.

## Asset-use boundary

W11's `W11_HOMEPAGE_CANDIDATE_ASSETS.zip` is used as Human-authorized editorial/decorative media after repository processing recorded in `assets/asset-manifest.json`; it is never assigned product identity, factory provenance or unsupported claims. Product-category images come from the mapped product assets in `data/w05-homepage-visuals.ts`. The quarantined Frozen/Elsa listing is not used.

## Deferred work carried forward

The following are intentionally outside this accepted W05 gate and are now explicitly scheduled by the canonical roadmap handoff:

- convert the 36 W02 displayable normalized candidates into status-valid `ProductRecord` data and an approved asset manifest;
- connect those records to the five collection pages and product cards;
- implement static, internal, `noindex` multi-image product-detail previews with product-scoped RFQ context under ADR 0005;
- let W04 consume that context for later formal Resend integration;
- let W08 decide indexability, canonical ownership and sitemap treatment.

These items are not the remaining 1688 listing import owned by W03, and no runtime implementation is claimed by this W05 closure.

## Closure

Human Review accepted the bounded W05 visual result on 2026-09-07. W05 is complete as a checkpoint; the overall V1 project and the later approved-data, route, SEO and RFQ gates remain open.
