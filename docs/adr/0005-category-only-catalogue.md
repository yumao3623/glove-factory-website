# ADR 0005: Category-Only Catalogue In V1

## Context
Product breadth and approved specifications are not yet stable, and the business is RFQ-led rather than transactional.

## Decision
Do not create individual indexable product detail pages in V1. Collection pages use product cards/modules with confirmed fields and family-level RFQ CTAs.

## Alternatives
Full PDP catalogue, or no product-level presentation.

## Consequences
Lower maintenance and no thin/duplicate PDP risk; individual products are less shareable/searchable. Data model reserves slugs for a future migration.

## Change trigger
Reconsider only when the evidence supports product-level information gain: unique approved specifications and imagery for a meaningful share of the catalogue, a demonstrated buyer need for shareable SKU/product URLs, acceptable thin/duplicate-content risk, and a named catalogue owner who can maintain pages. A catalogue larger than roughly 30 active products is a supporting scale signal, not a necessary or sufficient trigger.
