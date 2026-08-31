# Route Registry

Status: `FROZEN` for Phase 2. Canonical URLs use lowercase, hyphenated slugs and a trailing slash. No route may be renamed in Phase 3 without an ADR, redirect plan and human approval. `status` describes SEO treatment; `implementation` explicitly states whether Phase 3 creates a page, a redirect, or no route at all.

| route | status | implementation | page_type | primary_intent | primary_keyword | supporting_keywords | canonical_owner | parent | index_status | reason |
|---|---|---|---|---|---|---|---|---|---|
| `/` | FROZEN | CREATE_PAGE | Homepage | Range and supplier discovery | N/A | bridal gloves manufacturer; wedding veils manufacturer | Homepage | none | INDEX | Covers the confirmed range without competing with a family page. |
| `/products/` | FROZEN | CREATE_PAGE | Product hub | Compare product families | N/A | bridal gloves; opera gloves; costume gloves; kids dress gloves; wedding veils | Products hub | `/` | INDEX | Navigation/comparison hub; no single Phase 1 keyword owner is required. |
| `/bridal-gloves/` | FROZEN | CREATE_PAGE | Collection | Bridal/wedding glove sourcing | bridal gloves | wedding gloves; bridal lace gloves; sheer wedding gloves; fingerless bridal gloves; wholesale bridal gloves | Bridal Gloves | `/products/` | INDEX | One owner for overlapping bridal and wedding intent. |
| `/opera-gloves/` | FROZEN | CREATE_PAGE | Collection | Formal long-glove sourcing | opera gloves | evening gloves; formal gloves; elbow length gloves; satin opera gloves; wholesale opera gloves | Opera Gloves | `/products/` | INDEX | Merges close synonyms while constraining generic long/leather intent. |
| `/costume-gloves/` | FROZEN | CREATE_PAGE | Scope-controlled collection | Costume/stage glove sourcing | costume gloves | stage gloves; decorative gloves; cosplay gloves | Costume Gloves | `/products/` | INDEX | Approved only for supported, non-licensed styles. |
| `/kids-dress-gloves/` | FROZEN | CREATE_PAGE | Collection | Girls' formal/special-occasion sourcing | girls dress gloves | flower girl gloves; girls formal gloves; princess gloves; girls wedding gloves | Kids Dress Gloves | `/products/` | INDEX | Independent owner because the SERP spans formal, bridal and costume use. |
| `/wedding-veils/` | FROZEN | CREATE_PAGE | Collection | Wedding veil sourcing | wedding veils | bridal veils; wedding veils wholesale; bridal veil wholesale | Wedding Veils | `/products/` | INDEX | Wedding wording is cleaner than place-name-polluted bridal veil results. |
| `/custom-manufacturing/` | FROZEN | CREATE_PAGE | Capability/conversion | B2B custom/OEM enquiry | N/A | private label gloves; OEM gloves; custom bridal gloves | Custom Manufacturing | `/` | INDEX | Service/conversion owner; no independent Phase 1 keyword owner. |
| `/factory/` | FROZEN | CREATE_PAGE | Factory/About evidence | Validate supplier evidence | N/A | glove factory; glove manufacturer; production process | Factory | `/` | INDEX WHEN FACTS APPROVED | Trust/evidence page; no reliable independent Phase 1 keyword owner. |
| `/contact/` | FROZEN | CREATE_PAGE | RFQ/contact | Submit a qualified enquiry | N/A | request a quote; request samples | Contact | `/` | INDEX | Conversion endpoint, not a search landing page. |
| `/privacy/` | FROZEN | CREATE_PAGE | Legal | Understand enquiry data handling | N/A | RFQ privacy; contact data | Privacy | `/` | NOINDEX | Required before collecting enquiries; not a search landing page. |
| `/404/` | FROZEN | CREATE_SYSTEM_STATE | System | Handle missing URL | N/A | none | System | none | NOINDEX | Helpful error state; never a sitemap entry. |
| `/opera-gloves/satin/` | CONDITIONAL | CREATE_PAGE_IF_THRESHOLD | Child collection | Satin opera glove sourcing | satin opera gloves | satin gloves; long satin gloves | Satin Opera | `/opera-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Requires the child-page threshold in `PROJECT_SPEC_V1.md`. |
| `/bridal-gloves/lace/` | CONDITIONAL | CREATE_PAGE_IF_THRESHOLD | Child collection | Bridal lace glove sourcing | bridal lace gloves | lace wedding gloves | Bridal Lace | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Qualified bridal intent; no generic lace owner. |
| `/bridal-gloves/sheer-tulle/` | CONDITIONAL | CREATE_PAGE_IF_THRESHOLD | Child collection | Sheer/tulle bridal glove sourcing | sheer wedding gloves | tulle gloves; sheer bridal gloves | Sheer/Tulle Bridal | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Qualified material intent; no generic mesh owner. |
| `/bridal-gloves/fingerless/` | CONDITIONAL | CREATE_PAGE_IF_THRESHOLD | Child collection | Fingerless bridal glove sourcing | fingerless bridal gloves | half-finger bridal gloves | Fingerless Bridal | `/bridal-gloves/` | INDEX ONLY IF THRESHOLD PASSES | Generic fingerless intent is non-target; qualified child only. |
| `/wedding-gloves/` | NOINDEX | REDIRECT_301_ONLY | Redirect alias | Legacy synonym | N/A | bridal gloves | Bridal Gloves | `/bridal-gloves/` | NO HTML | Permanent redirect to `/bridal-gloves/`; never render a noindex page. |
| `/lace-gloves/` | NOINDEX | DO_NOT_CREATE | SEO exclusion record | Mixed generic intent | N/A | mesh gloves; fingerless gloves | none | none | NO HTML | SERP is polluted by DIY, costume and non-target uses. |
| `/mesh-gloves/` | NOINDEX | DO_NOT_CREATE | SEO exclusion record | Industrial/sport mixed intent | N/A | sheer gloves | none | none | NO HTML | No clean product-family intent. |
| `/fingerless-gloves/` | NOINDEX | DO_NOT_CREATE | SEO exclusion record | Winter/work/sport mixed intent | N/A | half-finger gloves | none | none | NO HTML | Qualified bridal styles belong under Bridal only. |
| `/wholesale-gloves/` | NOINDEX | DO_NOT_CREATE | SEO exclusion record | Non-target procurement | N/A | nitrile gloves; work gloves | none | none | NO HTML | SERP is dominated by disposable and work-glove procurement. |

## Route ownership rules

- One primary intent has one indexable canonical owner.
- `manufacturer`, `supplier`, `wholesale`, `OEM` and `private label` are conversion/context terms, not automatic URL dimensions.
- Facets and query parameters are non-indexable by default; only approved child routes may enter the sitemap.
- Conditional children require all threshold conditions and an approval record before status changes to `FROZEN`.
- `NOINDEX + DO_NOT_CREATE` is a research/SEO exclusion record, not an HTML page requirement.
- `NOINDEX + REDIRECT_301_ONLY` means emit a one-hop 301 and no destination page at that alias.
