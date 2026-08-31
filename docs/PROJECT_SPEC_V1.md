# Project Specification V1

Status: `PHASE_2_FREEZE_PENDING_HUMAN_APPROVAL`

This is the single implementation contract for Phase 3. Phase 3 must not change the routes, data semantics, infrastructure boundaries or factual claims below without a reviewed ADR and human approval.

## 1. Business positioning

### Candidates considered

| candidate | accuracy | buyer clarity | SEO implication | extensibility | risks |
|---|---|---|---|---|---|
| Fashion & Occasion Gloves Manufacturer | Accurate for gloves; omits veils | Clear enough to glove buyers | Broad, weak veil ownership | High for glove styles | Too broad; misses veil search and may sound consumer-facing. |
| Bridal, Evening & Costume Gloves Manufacturer | Accurate for three prominent families | Strong for those buyers | Good family vocabulary | Medium | Too narrow for kids and veils. |
| Gloves & Bridal Accessories Manufacturer | Potentially accurate | “Accessories” is vague | Weak family specificity | High | Too broad and can imply products not confirmed. |
| Occasion Gloves & Wedding Veils Manufacturer | Covers confirmed commercial range | Clear product nouns and B2B role | Supports occasion-glove and veil families | High | “Occasion” needs family navigation to clarify kids/costume. |
| Bridal & Occasion Gloves and Veils Manufacturer | Covers range and bridal context | Understandable but long/awkward | Good, but less natural phrase | High | Too long for repeated headings and may over-index bridal. |

`PRIMARY_POSITIONING`: **Occasion Gloves & Wedding Veils Manufacturer**.

`FALLBACK_POSITIONING`: **Bridal, Evening & Costume Gloves Manufacturer**, to be used only if the factory elects to defer veil/kids publication.

Homepage H1 direction is the primary positioning phrase. It is not a brand name. Use an approved English company name only after the factory supplies it; until then use a placeholder in metadata/spec tests, never an invented identity.

## 2. Final sitemap and page ownership

```text
/
├── /products/
│   ├── /bridal-gloves/
│   ├── /opera-gloves/
│   ├── /costume-gloves/
│   ├── /kids-dress-gloves/
│   └── /wedding-veils/
├── /custom-manufacturing/
├── /factory/              (Factory + About owner)
├── /contact/              (RFQ owner)
└── /privacy/              (legal, noindex)
```

`/about/` is not a separate V1 route. Factory evidence and company context have one owner at `/factory/`, preventing a thin duplicate trust page. Generic material/modifier routes are omitted or redirected as defined in `ROUTE_REGISTRY.md`.

## 3. Page templates

- **Homepage**: positioning/H1, five family entry points, approved evidence, custom-manufacturing bridge, RFQ CTA.
- **Products hub**: concise comparison of the five families, links to each owner, no generic “all gloves” keyword target.
- **Collection**: family intent/H1, curated product grid, confirmed style/material/length context, B2B evidence, procurement questions with status labels, RFQ CTA.
- **Custom Manufacturing**: supported customization workflow, boundaries and enquiry qualification; no invented OEM promises.
- **Factory**: approved identity, process/evidence imagery and factual capability context; unknown metrics omitted.
- **Contact/RFQ**: labeled form, consent, privacy link, success/error states and pending public fallback channel.
- **Privacy**: provider, data use, retention, rights and contact placeholders completed before launch.

## 4. Child-page threshold

Each candidate child (`/opera-gloves/satin/`, `/bridal-gloves/lace/`, `/bridal-gloves/sheer-tulle/`, `/bridal-gloves/fingerless/`) becomes `FROZEN` and indexable only when **all** conditions are met:

1. At least 8 active, distinct products in the child with approved status.
2. At least 3 approved images per representative product and at least 12 usable child images overall.
3. A distinct search intent is observed in a current SERP sample: at least 6 of the top 10 organic results materially match the child intent, and the parent page cannot answer it without a dedicated experience.
4. At least 400 words of unique, factory-confirmed content plus unique metadata and internal links.
5. No material cannibalization with a parent or another child, documented in the keyword ownership map.
6. A named owner agrees to maintain the page when products change.

If any condition fails, render the style as a section/filter on the parent and keep the route absent from the sitemap or `noindex`. This is an executable gate, not a future review placeholder.

## 5. Product page model

V1 is **category-only B2B catalogue**. Do not build individual indexable PDPs. Collection cards expose approved name, image, style/material, dimensions and “Request a Quote” context from `PRODUCT_DATA_MODEL.md`; unresolved values are omitted or marked pending. Reconsider PDPs only when the ADR 0005 triggers are met: >30 active products, unique approved specs/images for most, buyer need for shareable SKU links and a catalogue owner.

## 6. Data and assets

Use the status-aware fields and validation contract in `PRODUCT_DATA_MODEL.md`. Use `ASSET_PIPELINE.md` for immutable originals, processed WebP/AVIF, thumbnails, manifests, alt text, duplicate detection and the 1688 screenshot policy.

## 7. RFQ and contact

Use one `/contact/` flow per `RFQ_SPEC.md`. V1 has no upload, cart, checkout, payment or account. Required fields are name, company, country, email, product family, quantity, message and consent; WhatsApp is optional. Public recipient is `PENDING_PUBLIC_CONTACT`. Implement server validation, rate limiting, honeypot/provider risk checks, privacy-safe logging and authenticated email delivery.

## 8. Infrastructure

GitHub remains the source repository. `V1_HOSTING = Vercel`; Cloudflare Pages is fallback. `V1_DATABASE = NONE`. Domain, DNS, business mailbox, form provider account/API key and analytics properties are pending and must not be created in this phase. See `HOSTING_DECISION.md` and `INFRASTRUCTURE_REGISTRY.md`.

## 9. SEO and rendering

Follow `SEO_TECHNICAL_SPEC.md`: HTTPS and one host, trailing slash, one canonical owner, unique metadata, one H1, static/server-rendered primary content, sitemap/robots/404/redirects, truthful Organization/CollectionPage/BreadcrumbList/Product/FAQ schema, non-indexable facets, English-only and CWV targets LCP <=2.5s, INP <=200ms, CLS <=0.1.

## 10. UI direction

Implement `Editorial Utility` from `UI_DESIGN_SPEC.md`: real photography, restrained ink/neutral palette, accessible blue CTA, serif display plus sans body, 1200-1280px content width, 8px spacing unit, dense but scannable catalogue grids, mobile-safe navigation and WCAG-oriented focus/contrast/touch behavior. shadcn is a reference/component source, not architecture.

## 11. Analytics taxonomy

Define events now; wire GA4 only after launch consent and property approval: `rfq_submit`, `contact_click`, `whatsapp_click`, `product_family_view`, `sample_request`. Event parameters may include family, source route and success/failure state, but never message bodies or personal contact fields.

## 12. Factual boundaries

Only `FACTORY_CONFIRMED` scope, general customization availability and overseas enquiry ownership are publishable now. MOQ, sample terms, lead times, capacity, certifications, exact specs, legal identity and public contacts remain pending as defined in `PUBLISHING_BOUNDARIES.md`.

## 13. Phase 3 acceptance criteria

- Every route matches `ROUTE_REGISTRY.md`; no duplicate keyword owner or unapproved child route.
- Build is static/server-rendered for primary content and produces valid metadata, sitemap, robots, 404 and redirects.
- Product records pass status/source validation; no fabricated values or marketplace screenshots appear as product imagery.
- RFQ flow validates server-side, respects consent, handles failure and does not expose secrets.
- Responsive/accessibility checks pass at 375/768/1024/1440px; images reserve space and meet CWV targets in representative tests.
- No database, payment, account, multilingual or broad blog feature is introduced.
- Human review approves English identity, contact recipient, customization boundaries and any operational claims before publication.
