# ADR 0005: Category-Only Catalogue In V1

## Context
Product breadth and approved specifications are not yet stable, and the business is RFQ-led rather than transactional.

## Decision
Do not create individual **indexable** product detail pages in V1. Collection pages use product cards/modules with confirmed fields and family-level RFQ CTAs.

## Bounded scope amendment (Human decision, 2026-09-05)
The catalogue may expose a static, internal product-detail preview for an approved or stakeholder-preview candidate. The preview may be linked from a product card, show the candidate's approved title, confirmed attributes, mapped image set and product-scoped RFQ context, and must remain `noindex`, outside the sitemap, and without a new SEO canonical owner. This does not authorize runtime implementation in W02, a public/indexable PDP, commerce, database, pricing, inventory, accounts, or a change to W08's indexability decision. The amendment supersedes only the blanket prohibition on non-indexable detail previews; the indexable/category-only decision remains authoritative.

## Alternatives
Full PDP catalogue, or no product-level presentation.

## Consequences
Lower maintenance and no thin/duplicate PDP risk; individual products are less shareable/searchable. Data model reserves slugs for a future migration.

## Change trigger
Reconsider only when the evidence supports product-level information gain: unique approved specifications and imagery for a meaningful share of the catalogue, a demonstrated buyer need for shareable SKU/product URLs, acceptable thin/duplicate-content risk, and a named catalogue owner who can maintain pages. A catalogue larger than roughly 30 active products is a supporting scale signal, not a necessary or sufficient trigger.
