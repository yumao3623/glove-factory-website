# Phase 1 Report: Keyword, SERP, and Competitor Research

Date: 2026-08-31

## Scope and evidence discipline

`PROVISIONAL_RESEARCH_SCOPE`: United States / English is the primary SEO research locale; United Kingdom / English is secondary validation. This is a research scope, not a decision that the factory will target either market.

Factory product fit remains `PLATFORM_EVIDENCE` from the supplied 1688 storefront screenshots and Phase 0 product map, unless separately marked `CONFIRMED`. Keyword metrics are visible estimates from `THIRD_PARTY_SEMRUSH_INTERFACE` (`sem.3ue.com`), not official Semrush first-party data. Google live SERP is a separate, volatile `PLATFORM_EVIDENCE` source. Neither source confirms factory capabilities.

The live bulk interface accepted a 100-keyword candidate batch. Some low-frequency modifier rows exposed no metric or a request to refresh metrics. Such values are recorded as unavailable; they are not treated as zero demand. The 1,989-row original export remains a seed dataset, not a set of 1,989 individually researched queries.

## Answers to the Phase 1 questions

### 1. Which 3-5 product families are most worth doing SEO for?

The recommended SEO priorities are:

1. **Bridal / Wedding Gloves**: `bridal gloves` (1,300 US volume, KD 13) and `wedding gloves` (1,600, KD 17) have aligned retail-commercial SERPs and high Phase 0 product fit.
2. **Opera / Evening Gloves**: `opera gloves` (2,900, KD 17) is the dominant established name for the long-formal family. The page must explicitly avoid leather and winter positioning.
3. **Satin Opera Gloves**: `satin opera gloves` (880, KD 4) has a materially focused product/category SERP and warrants a child landing rather than being hidden under generic opera.
4. **Lace Bridal Gloves**: `bridal lace gloves`, `lace bridal gloves`, and `lace wedding gloves` have qualified bridal product/collection SERPs and high Phase 0 product fit.
5. **Sheer / Tulle Bridal Gloves**: lower-volume but qualified terms such as `sheer wedding gloves` and `tulle gloves` align with relevant visual product evidence and focused commercial SERPs.

### 2. What is the basis for each product-family decision?

This is an `INFERENCE` from demand, SERP form, and Phase 0 product-fit evidence. The bulk-interface metrics support demand and query wording; Google live SERP supports intent and page form; the supplied storefront/product map supports only product-fit hypothesis. It is not a confirmation that every family is actively manufactured or approved for public claim.

### 3. What real English names do US users use?

US and UK SERPs use **bridal gloves**, **wedding gloves**, **opera gloves**, **evening gloves**, **satin opera gloves**, **long satin gloves**, **elbow length gloves**, **bridal lace gloves**, **lace wedding gloves**, **sheer wedding gloves**, and **tulle gloves**. The terminology evidence is documented in `research/keywords/PRODUCT_TERMINOLOGY_MAP.csv`.

The English product language is not a direct translation exercise. For example, broad **mesh gloves** does not reliably mean bridal mesh gloves, while **opera gloves** is the natural long-formal term but can attract leather-related results.

### 4. Which high-volume terms are unsuitable?

- **wedding veils** (6,600) and **bridal veils** (4,400) have demand, but current product fit is only medium-confidence platform evidence. They are deferred until the active range is confirmed.
- **lace gloves** (2,900) is mixed fashion/DIY/non-bridal traffic, so it does not own a generic category.
- **mesh gloves** (1,000) mixes industrial, hunting, motocross, and fashion results; it is quarantined.
- Generic **fingerless gloves** and **fingerless gloves wholesale** are overwhelmingly winter/work/tactical/non-target, despite large seed-dataset representation.
- Brand, marketplace, `near me`, Amazon, Etsy, winter, thermal, work, cycling, motorcycle, medical, and leather terms remain excluded unless a later, specific evidence case changes that decision.

### 5. Which B2B money keywords are most valuable?

The most relevant qualified procurement terms are **bridal gloves wholesale**, **wholesale bridal gloves**, and **opera gloves wholesale**. US and UK Google results contain wholesale category and product pages, even when the third-party interface showed an unavailable or low exact metric. These are B2B opportunities because of explicit buyer task and SERP page form, not because of inferred volume.

`custom bridal gloves` is deliberately not a primary B2B money term: the observed SERP is consumer bespoke/personalized retail. A future Custom Manufacturing page can support qualified buyers, but must not claim it will rank for that consumer-personalization query.

### 6. Which keywords should share one canonical page?

**Share one canonical owner:**

- `bridal gloves` + `wedding gloves` -> `/bridal-wedding-gloves`
- bridal-qualified lace variants -> `/bridal-wedding-gloves/lace`
- bridal-qualified sheer/tulle variants -> `/bridal-wedding-gloves/sheer-tulle`
- bridal-qualified fingerless variants -> `/bridal-wedding-gloves/fingerless`, only if active style breadth is confirmed

### 7. Which keywords must be split into separate pages?

**Keep separate:**

- `bridal gloves wholesale` / `wholesale bridal gloves` -> `/wholesale-bridal-gloves`, conditional on approved commercial terms
- `opera gloves` / `evening gloves` -> `/opera-evening-gloves`
- `satin opera gloves` / `long satin gloves` -> `/opera-evening-gloves/satin`

The split is based on query task and current page form, not wording alone. Generic lace, mesh, or fingerless queries have no canonical page owner.

### 8. What is the final fingerless decision?

**Decision: subcategory.** `fingerless bridal gloves` has a qualified bridal retail SERP (390 US volume, KD 8), while generic fingerless demand in the seed is dominated by cashmere, thermal, winter, work, motorcycle, cycling, leather, medical, and brand intent. It should be a Bridal/Lace/Sheer child or controlled filter, not a first-level category and not a generic `fingerless gloves` SEO target.

### 9. Which real manufacturer / wholesale competitors were found?

**Manufacturer competitors:** none can be responsibly classified from the public evidence inspected. A retailer or wholesaler's product assortment and claims are not evidence that it is a comparable factory.

**Wholesale competitors:** `weddingfactorydirect.com`, `mariellonline.com`, `wonatrading.com`, and `cbflowerscrafts.com`. They recur in relevant wholesale SERPs and use wholesale categories, product grids, length/material taxonomy, pricing or buyer gating.

### 10. Which important SEO competitors were found?

`corneliajames.com` and `graceloveslace.com` recur across bridal, opera, satin, lace, and fingerless commercial queries with focused collection/product pages.

### 11. What pages obtain their main non-brand organic visibility?

The evidence supports page-level, not domain-traffic, conclusions. The visible non-brand entry points are wholesale glove category/product pages for wholesale competitors and occasion/material/bridal collections for retailers. The current third-party domain-organic module was not available for a reliable top-pages/estimated-traffic reading, so no domain totals, rankings, or backlink claims have been invented.

### 12. What content, trust, and conversion gaps are visible in the SERPs?

- Wholesale results are often catalog-heavy, price-gated, or weak on sourcing evidence. A future B2B page could differentiate with factual product scope, qualification route, and approved proof.
- Retail pages commonly explain material, length, fit, and styling. A supplier page should add only factory-confirmed specifications and customization boundaries.
- Competitor pages expose limited verified process/factory evidence in this pass. This is an opportunity to publish approved evidence, not permission to invent capacity, OEM, quality, certification, delivery, or sustainability claims.

### 13. What is the recommended first-version site architecture?

Recommended candidate pages are Home, Products Hub, Bridal/Wedding Gloves, conditional Bridal Wholesale, Opera/Evening Gloves, Satin Opera child, Bridal Lace child, Sheer/Tulle child, conditional Bridal Fingerless child, conditional Custom Manufacturing, conditional Factory/About, and Contact/Request Quote.

Do not create a generic Lace Gloves, Mesh Gloves, or Fingerless Gloves page. Defer Veils/Bridal Accessories as a V1 core category. The full page-purpose, evidence, CTA, internal-link, index-status, and confidence matrix is in `docs/SITE_ARCHITECTURE_V1.md`; page ownership is in `research/seo/KEYWORD_TO_PAGE_MAP.csv`.

### 14. Is a blog needed now?

**Do not launch a broad Blog/Guides hub now.** The research supports a future factual guide opportunity around length selection or satin/lace/tulle comparison, but no approved editorial evidence owner or ongoing content program exists. A keyword alone does not justify a page.

### 15. Should veils / bridal accessories enter V1 core structure?

**Do not include Veils / Bridal Accessories in the V1 core architecture yet.** Demand is real, but Phase 0 supports only medium-confidence platform evidence that this is an active, strategic factory range. The architecture can be reconsidered when active SKU/manufacturing scope is confirmed.

### 16. What still needs factory confirmation?

The remaining narrow questions are in `docs/FACTORY_QUESTIONS.md`:

1. Publishable legal English company/brand identity and enquiry owner/channel.
2. Active product-family and meaningful SKU-style breadth for the proposed glove pages.
3. Whether veils/accessories are an actively manufactured strategic range or a deferred cross-sell range.
4. Permitted customization/OEM/private-label scope and exclusions.
5. Approved materials, specifications, testing/certification, and quality claims.

MOQ, samples, lead time, capacity, equipment count, and certification claims remain `UNKNOWN` or `PLATFORM_EVIDENCE` until dated factory confirmation is obtained. They do not block keyword/SERP/competitor research; they block only a page or public promise that depends on them.

### 17. Is the project ready to enter Phase 2?

**Conditional readiness only.** Phase 1 supplies a defensible provisional architecture and page ownership map. It is sufficient to hold an Architecture Freeze gate after the five factual confirmations above. It does not authorize Phase 2 work, site design, UI, code, deployment, or publication before that review.

## Deliverables and traceability

- Product language: `research/keywords/PRODUCT_TERMINOLOGY_MAP.csv`
- Curated keyword universe and clusters: `research/keywords/KEYWORD_UNIVERSE.csv`, `research/keywords/KEYWORD_CLUSTER_MAP.csv`
- Live SERP records and findings: `research/serp/SERP_ANALYSIS.csv`, `research/serp/SERP_FINDINGS.md`
- Competitor evidence: `research/competitors/COMPETITOR_MATRIX.csv`, `research/competitors/COMPETITOR_ANALYSIS.md`
- Canonical ownership: `research/seo/KEYWORD_TO_PAGE_MAP.csv`
- Architecture and decisions: `docs/SITE_ARCHITECTURE_V1.md`, `docs/PHASE_1_DECISIONS.md`

## Phase 1 stop

Phase 1 research is complete pending human Phase 1 Gate Review. No pull request, merge, site development, production change, or Phase 2 execution is included in this checkpoint.
