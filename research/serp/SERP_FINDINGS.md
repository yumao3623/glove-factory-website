# Phase 1 SERP Findings

## Scope and evidence

`PROVISIONAL_RESEARCH_SCOPE`: United States / English is the primary research locale; United Kingdom / English is secondary validation only. It is not a commercial-market decision.

All Google observations in `SERP_ANALYSIS.csv` are `PLATFORM_EVIDENCE`: live desktop snapshots from 2026-08-31, with `hl=en` and `gl=us` or `gl=uk`. Rankings and features are volatile. Volume, KD, CPC and tool intent are visible estimates from `THIRD_PARTY_SEMRUSH_INTERFACE`, not official Semrush first-party data and not factory facts.

## Intent decisions

| Cluster | Google dominant form | Decision |
| --- | --- | --- |
| Bridal / wedding gloves | Retail collection/category and product pages; shopping modules; some guides | One Bridal / Wedding Gloves canonical owner. `bridal gloves` and `wedding gloves` must not become duplicate pages. |
| Bridal wholesale | Wholesale categories and wholesale product listings in US and UK; exact modifier demand is low | Integrate B2B evidence and RFQ into the Bridal canonical owner; do not create a near-duplicate modifier page. |
| Opera / evening | Retail product, collection, marketplace and editorial mixture | Create an Opera / Evening Gloves owner, constrained to the documented formal-product range. |
| Satin opera | Focused satin long-glove products and collections | A distinct child landing is justified; it should not be force-merged with generic opera without losing material specificity. |
| Lace bridal | Bridal retail product/collection | A Bridal Lace child can sit under the Bridal hub. Generic `lace gloves` is too mixed for a core owner. |
| Sheer / tulle | Fashion/bridal retail products | A qualified child page is defensible; generic `mesh gloves` is quarantined due industrial and sport results. |
| Fingerless bridal | Bridal retail and marketplace | Keep as a subcategory/filter under Bridal and Lace/Sheer, not a first-level core category. |
| Costume / stage gloves | Broad commercial costume products mixed with monster, character, paw, DIY and cosplay intent | Create a scope-controlled product-family owner; include only factory-supported, non-licensed product evidence. |
| Kids / girls dress gloves | Clean children special-occasion product results for `girls dress gloves`, `girls formal gloves` and `flower girl gloves`; `princess gloves` is mixed | Create an independent family owner rather than force all styles under Bridal or Costume. |
| Veils | Commercial bridal retail collections and products; `wedding veils` is cleaner than `bridal veils` | Promote Wedding / Bridal Veils to a V1 core owner after factory confirmation of active production and customization. |

## Fingerless finding

The historical seed export is dominated by fingerless/half-finger terms, but 1,456 of 1,989 rows use that language and include cashmere, thermal, work, motorcycle, cycling, leather, medical and brand traffic. The live US `fingerless gloves wholesale` SERP is likewise alpaca/work/tactical/winter-led. By contrast, `fingerless bridal gloves` is a focused retail bridal SERP. The appropriate architecture decision is **subcategory**, not core category and not exclusion of the qualified bridal styles.

## Phase 1.1 manual-review revision

The user manually reviewed the displayed US and global estimates in `THIRD_PARTY_SEMRUSH_INTERFACE`. These estimates confirm that high-fit product terms are materially larger than their exact wholesale modifiers. For example, `opera gloves` displays US 2.9K while `wholesale opera gloves` is about US 20; `wedding veils` displays US 6.6K while `wedding veils wholesale` is about US 10. Generic `wholesale gloves` displays about US 480 but Google is dominated by nitrile, latex, disposable and work gloves.

The resulting search model is:

`High-fit Product Keyword -> Product / Collection Landing Page -> B2B Manufacturing Evidence -> RFQ Conversion`

Wholesale, manufacturer, supplier, custom and OEM language can inform copy, evidence modules and calls to action. It does not justify near-duplicate modifier routes when the search volume and page-form evidence are weak.

Kids terminology was separately validated in Google US. `girls dress gloves`, `girls formal gloves` and `flower girl gloves` are clean commercial expressions. `princess gloves` is useful but mixed across children, adults, wedding, party and character/IP-adjacent intent. `kids costume gloves` is more Halloween/character-led. The family owner should therefore use a neutral Kids / Girls Dress Gloves scope and treat princess, flower-girl, formal and costume uses as supported collections or modules.

## SERP gaps worth addressing later

- Wholesale result pages are often catalog-heavy or gated. A factual B2B page can differentiate through clear capability boundaries, enquiry routing and evidence once supplied by the factory.
- Retail pages explain materials, length, fit, styling and product choice. A manufacturer-oriented page should add truthful specifications and customization workflow only after confirmation.
- Competitors frequently show product grids but disclose limited sourcing/manufacturing evidence. This is a potential gap, not permission to claim factory capacity, OEM range, quality systems or certifications.
- No broad blog hub is justified now. Possible future guides are length selection, satin vs lace vs tulle, and bridal glove styling, only after a factual editorial owner and approved source material exist.
