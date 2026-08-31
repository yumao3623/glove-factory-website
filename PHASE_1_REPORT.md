# Phase 1 Report: Keyword, SERP, Competitor and Manual Review

Date: 2026-08-31

## Scope and evidence discipline

`PROVISIONAL_RESEARCH_SCOPE`: United States / English is primary; United Kingdom / English is secondary validation. This is an SEO research scope, not a final commercial-market decision.

Active product scope, general customization and overseas enquiry ownership are `FACTORY_CONFIRMED`. 1688 titles and cumulative sales are `FACTORY_PLATFORM_EVIDENCE` for domestic-platform assortment, product experience and relative traction only. They are not global, export or international sales. Keyword metrics are from `THIRD_PARTY_SEMRUSH_INTERFACE`, not official Semrush first-party data. Google live SERP is a separate volatile `PLATFORM_EVIDENCE` source. Architecture decisions remain `INFERENCE` and all URLs are `PROVISIONAL_ROUTE`.

## Phase 1 findings

### 1. Which 3-5 product families are most worth doing SEO for?

The revised V1 recommendation is five top-level families:

1. Bridal / Wedding Gloves
2. Opera / Evening / Formal Gloves
3. Costume / Stage Gloves
4. Kids / Girls / Princess Dress Gloves
5. Wedding / Bridal Veils

### 2. What supports each decision?

| Family | Factory evidence | Keyword / SERP evidence | Decision |
| --- | --- | --- | --- |
| Bridal / Wedding Gloves | Active production and customization `FACTORY_CONFIRMED`; recurring 1688 lace, sheer and bridal products | Wedding Gloves US 1.6K; Bridal Gloves US 1.3K; commercial collection SERPs | Core; one canonical owner |
| Opera / Evening / Formal Gloves | Active production and customization `FACTORY_CONFIRMED`; long satin/lace products show platform traction | Opera Gloves US 2.9K / KD 17; Satin Opera US 880 / KD 4; commercial retail SERPs | Core; merge occasion synonyms |
| Costume / Stage Gloves | Active production and customization `FACTORY_CONFIRMED`; Halloween/stage/decorative platform evidence | Costume Gloves US 590 / KD 22; broad commercial SERP | Core with strict scope controls |
| Kids / Girls Dress Gloves | Active production and customization `FACTORY_CONFIRMED`; kids satin bow style displays 2.4万+ cumulative 1688 sales | Princess Gloves US 590; clean girls dress/formal and flower-girl SERPs | Independent core recommendation |
| Wedding / Bridal Veils | Active production and customization `FACTORY_CONFIRMED`; listed assortment evidence | Wedding Veils US 6.6K / global 30.3K; commercial SERP | Core; Wedding wording primary |

### 3. What English names do US users use?

Natural family language is `bridal gloves` / `wedding gloves`; `opera gloves` with `evening gloves`, `formal gloves` and `elbow length gloves`; `costume gloves`; `girls dress gloves`, `girls formal gloves` and `flower girl gloves`; and `wedding veils` with `bridal veils` as a secondary synonym.

`Satin`, `Lace`, `Sheer`, `Tulle` and `Fingerless` are real product terms, but they are material/style or child language rather than five separate top-level families. `Princess gloves` is useful but mixed across children, adults, party, wedding and character/IP-adjacent intent.

### 4. Which high-volume terms are unsuitable?

- `fingerless gloves` is dominated by winter, work, leather, sport, motorcycle and other non-target intent.
- `lace gloves` has US 2.9K / global 8.3K but mixes fashion, DIY, costume and other uses.
- `long gloves` has US 1.9K / global 5.6K but mixes leather and generic intent.
- `mesh gloves` mixes industrial, chainmail, sport and fashion uses.
- `wholesale gloves` is about US 480 but its SERP is nitrile, latex, disposable and work-glove led.
- `bridal veils` is valid, but its wider universe includes Bridal Veil Falls / Yosemite place-name pollution; `wedding veils` is cleaner.

### 5. Which B2B money keywords are most valuable?

The best qualified expressions are `wholesale bridal gloves` (about US 20), `wholesale opera gloves` (about US 20), `bridal veil wholesale` (about US 10) and `wedding veils wholesale` (about US 10). Their value is buyer qualification, not traffic scale.

They should appear naturally in B2B evidence, product-range context and RFQ paths on the canonical product page. They do not justify separate wholesale/manufacturer/supplier page variants.

### 6. Which keywords share a canonical page?

- `bridal gloves` and `wedding gloves` -> `/bridal-gloves/`
- `opera gloves`, `evening gloves`, `formal gloves`, `elbow length gloves` and qualified `long gloves` -> `/opera-gloves/`
- `wedding veils` and product-intent `bridal veils` -> `/wedding-veils/`
- `girls dress gloves`, `girls formal gloves`, `flower girl gloves`, qualified `princess gloves` and `girls wedding gloves` -> `/kids-dress-gloves/`

### 7. Which must be split?

The five product families need separate owners because their buyer tasks and result sets differ. Satin Opera may become a child under Opera if approved assortment breadth supports an indexable page. Bridal Lace, Sheer/Tulle and Fingerless may become children or substantial modules under Bridal; they must not become generic top-level owners.

### 8. What is the final Fingerless decision?

**Subcategory/style.** Qualified `fingerless bridal gloves` is relevant and commercial, but generic fingerless demand is dominated by non-target uses. It is neither a core category nor fully excluded.

### 9. Which manufacturer and wholesale competitors were found?

No reviewed site can be responsibly classified as a proven comparable `MANUFACTURER_COMPETITOR` from the inspected public evidence.

Recurring `WHOLESALER_COMPETITOR` sites are `weddingfactorydirect.com`, `mariellonline.com`, `wonatrading.com` and `cbflowerscrafts.com`. They demonstrate wholesale category, material/length taxonomy, product-grid, pricing/gating and buyer-action patterns.

### 10. Which important SEO competitors were found?

`corneliajames.com` and `graceloveslace.com` recur across bridal, opera, satin, lace and fingerless commercial results with focused collection/product pages. Amazon, Etsy, Faire and DHgate occupy SERP space but are marketplaces, not comparable owned B2B sites.

### 11. Which pages drive competitor non-brand visibility?

The available evidence is page-level: wholesale glove category/product pages for wholesalers and bridal/occasion/material collection pages for retailers. The third-party domain organic module did not provide reliable Top Pages, traffic, position or backlink data, so domain totals and backlink claims remain unavailable rather than inferred.

### 12. What content, trust and conversion gaps are visible?

- Wholesale pages are often catalogue-heavy or price-gated and weak on verified manufacturing evidence.
- Retail pages explain material, length, fit and styling but usually do not serve B2B sourcing evaluation.
- A future page can combine a clear product range with approved customization boundaries, factory proof and an RFQ path.
- This gap does not authorize unconfirmed MOQ, capacity, certifications, lead time, material, sustainability or quality claims.

### 13. What is the recommended V1 architecture?

Recommended: `/`, `/products/`, `/bridal-gloves/`, `/opera-gloves/`, `/costume-gloves/`, `/kids-dress-gloves/`, `/wedding-veils/`, `/custom-manufacturing/`, `/factory/` and `/contact/`. Every route is `PROVISIONAL_ROUTE`.

Do not create generic Lace, Mesh, Satin or Fingerless top-level pages, or near-duplicate wholesale/manufacturer/supplier variants. Detailed ownership and evidence needs are in `docs/SITE_ARCHITECTURE_V1.md` and `research/seo/KEYWORD_TO_PAGE_MAP.csv`.

### 14. Is a blog needed now?

No. A broad Blog/Guides hub is not justified until there is an approved editorial program, factual source material and an owner. Future topics such as glove length or material comparison can be reconsidered after the product architecture is frozen.

### 15. Should Veils / Bridal Accessories enter V1 core?

Yes for **Wedding / Bridal Veils**. Active production and customization are now `FACTORY_CONFIRMED`; `wedding veils` shows US 6.6K / global 30.3K and a commercial SERP. Broader unspecified Bridal Accessories do not automatically receive a page.

### 16. What still needs factory confirmation?

Publishable English identity, exact public contact method, exact customization boundaries, MOQ, samples, lead time, capacity, material/specification details and certifications. These do not block Phase 1.1; each blocks only the architecture or public promise that depends on it.

### 17. Is the project ready for Phase 2?

It is ready for a **human Phase 2 Architecture Freeze gate review**. It is not permission to start Phase 2, UI, code, deployment or publication. Phase 2 must freeze homepage positioning, routes, child-page thresholds and factual publishing boundaries.

## Manual Review Revision

1. **V1 top-level products:** Bridal/Wedding Gloves; Opera/Evening/Formal Gloves; Costume/Stage Gloves; Kids/Girls Dress Gloves; Wedding/Bridal Veils.
2. **Wedding Veils:** upgraded to V1 core.
3. **Kids / Princess Gloves:** independent Kids Dress category; Princess is supporting terminology, not the owner.
4. **Costume Gloves:** top-level, but only with supported-style and licensed-character scope controls.
5. **Opera / Evening / Formal:** one canonical family under `/opera-gloves/`.
6. **Bridal / Wedding Gloves:** one canonical family under `/bridal-gloves/`.
7. **Satin / Lace / Sheer / Fingerless:** child, facet or substantial module; no generic top-level owner.
8. **Homepage scope:** the full confirmed occasion-glove and veil range; final positioning/H1 stays open for Phase 2.
9. **SEO strategy:** formally adopt `High-fit Product Keyword -> Product / Collection Landing Page -> B2B Manufacturing Evidence -> RFQ Conversion`.
10. **Phase 2 readiness:** ready for Architecture Freeze review once the human gate accepts these revisions; no Phase 2 work has started.

## Homepage positioning options

- Fashion & Occasion Gloves Manufacturer
- Bridal, Evening & Costume Gloves Manufacturer
- Gloves & Bridal Accessories Manufacturer
- Occasion Gloves & Wedding Veils Manufacturer

These are positioning options, not approved H1 copy.

## Deliverables and stop

Phase 1.1 updates the factory evidence, keyword terminology/universe/clusters, live SERP findings, keyword-to-page ownership, architecture, decisions and factory questions. `docs/PHASE_1_MANUAL_REVIEW.md` provides the revision trail.

Stop after the Phase 1.1 commit and push. Do not create a PR or tag, merge `main`, start Phase 2 or develop the website.
