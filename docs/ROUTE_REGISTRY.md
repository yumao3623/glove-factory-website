# Route Registry

Status: `FROZEN` for Phase 2. Canonical URLs use lowercase, hyphenated slugs and a trailing slash. No route may be renamed in Phase 3 without an ADR, redirect plan and human approval.

| route | status | page_type | primary_intent | primary_keyword | supporting_keywords | canonical_owner | parent | index_status | reason |
|---|---|---|---|---|---|---|---|---|---|
| `/` | FROZEN | Homepage | Range and supplier discovery | occasion gloves manufacturer | bridal gloves manufacturer; wedding veils manufacturer | Homepage | none | INDEX | Covers the confirmed range without competing with a family page. |
| `/products/` | FROZEN | Product hub | Compare product families | occasion gloves and bridal accessories | bridal gloves; opera gloves; costume gloves; kids dress gloves; wedding veils | Products hub | `/` | INDEX | Useful navigation hub with five genuine families; not a generic wholesale page. |
| `/bridal-gloves/` | FROZEN | Collection | Bridal/wedding glove sourcing | bridal gloves | wedding gloves; bridal lace gloves; sheer wedding gloves; fingerless bridal gloves; wholesale bridal gloves | Bridal Gloves | `/products/` | INDEX | One owner for overlapping bridal and wedding intent. |
| `/opera-gloves/` | FROZEN | Collection | Formal long-glove sourcing | opera gloves | evening gloves; formal gloves; elbow length gloves; satin opera gloves; wholesale opera gloves | Opera Gloves | `/products/` | INDEX | Merges close synonyms while constraining generic long/leather intent. |
| `/costume-gloves/` | FROZEN | Scope-controlled collection | Costume/stage glove sourcing | costume gloves | stage gloves; decorative gloves; cosplay gloves | Costume Gloves | `/products/` | INDEX | Approved only for supported, non-licensed styles. |
| `/kids-dress-gloves/` | FROZEN | Collection | Girls' formal/special-occasion sourcing | girls dress gloves | flower girl gloves; girls formal gloves; princess gloves; girls wedding gloves | Kids Dress Gloves | `/products/` | INDEX | Independent owner because the SERP spans formal, bridal and costume use. |
| `/wedding-veils/` | FROZEN | Collection | Wedding veil sourcing | wedding veils | bridal veils; wedding veils wholesale; bridal veil wholesale | Wedding Veils | `/products/` | INDEX | Wedding wording is cleaner than place-name-polluted bridal veil results. |
| `/custom-manufacturing/` | FROZEN | Capability/conversion | B2B custom/OEM enquiry | custom glove manufacturing | private label gloves; OEM gloves; custom bridal gloves | Custom Manufacturing | `/` | INDEX | One service owner; modifiers support copy and RFQ, not duplicate pages. |
| `/factory/` | FROZEN | Factory/About evidence | Validate supplier evidence | glove factory | glove manufacturer; glove supplier; production process | Factory | `/` | INDEX WHEN FACTS APPROVED | Factory and About are merged to avoid a thin duplicate trust page. |
| `/contact/` | FROZEN | RFQ/contact | Submit a qualified enquiry | glove manufacturer contact | request a quote; request samples | Contact | `/` | INDEX | Single enquiry destination for all commercial CTAs. |
| `/privacy/` | FROZEN | Legal | Understand enquiry data handling | privacy policy | RFQ privacy; contact data | Privacy | `/` | NOINDEX | Required before collecting enquiries; not a search landing page. |
| `/404/` | FROZEN | System | Handle missing URL | none | none | System | none | NOINDEX | Helpful error state; never a sitemap entry. |
| `/opera-gloves/satin/` | CONDITIONAL | Child collection | Satin opera glove sourcing | satin opera gloves | satin gloves; long satin gloves | Satin Opera | `/opera-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Requires the child-page threshold in `PROJECT_SPEC_V1.md`. |
| `/bridal-gloves/lace/` | CONDITIONAL | Child collection | Bridal lace glove sourcing | bridal lace gloves | lace wedding gloves | Bridal Lace | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Qualified bridal intent; no generic lace owner. |
| `/bridal-gloves/sheer-tulle/` | CONDITIONAL | Child collection | Sheer/tulle bridal glove sourcing | sheer wedding gloves | tulle gloves; sheer bridal gloves | Sheer/Tulle Bridal | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Qualified material intent; no generic mesh owner. |
| `/bridal-gloves/fingerless/` | CONDITIONAL | Child collection | Fingerless bridal glove sourcing | fingerless bridal gloves | half-finger bridal gloves | Fingerless Bridal | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Generic fingerless intent is non-target; qualified child only. |
| `/wedding-gloves/` | NOINDEX | Redirect alias | Legacy synonym | wedding gloves | bridal gloves | Bridal Gloves | `/bridal-gloves/` | NOINDEX/301 | Never a second canonical owner; redirect to `/bridal-gloves/`. |
| `/lace-gloves/` | NOINDEX | Unsupported generic alias | Mixed generic intent | lace gloves | mesh gloves; fingerless gloves | none | none | NOINDEX | SERP is polluted by DIY, costume and non-target uses. |
| `/mesh-gloves/` | NOINDEX | Unsupported generic alias | Industrial/sport mixed intent | mesh gloves | sheer gloves | none | none | NOINDEX | No clean product-family intent. |
| `/fingerless-gloves/` | NOINDEX | Unsupported generic alias | Winter/work/sport mixed intent | fingerless gloves | half-finger gloves | none | none | NOINDEX | Qualified bridal styles belong under Bridal only. |
| `/wholesale-gloves/` | NOINDEX | Unsupported generic alias | Non-target procurement | wholesale gloves | nitrile gloves; work gloves | none | none | NOINDEX | SERP is dominated by disposable and work-glove procurement. |

## Route ownership rules

- One primary intent has one indexable canonical owner.
- `manufacturer`, `supplier`, `wholesale`, `OEM` and `private label` are conversion/context terms, not automatic URL dimensions.
- Facets and query parameters are non-indexable by default; only approved child routes may enter the sitemap.
- Conditional children require all threshold conditions and an approval record before status changes to `FROZEN`.
