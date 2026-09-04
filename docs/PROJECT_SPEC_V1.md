# Project Specification V1

Status: `PHASE_4A_PUBLICATION_GATE_PENDING_IMPLEMENTATION`

This is the single implementation contract for the V1 site. The Phase 2 architecture and Phase 3 route/data boundaries remain frozen; publication decisions below are approved for documentation and the later publication gate only. Runtime or external changes still require the bounded implementation checkpoint.

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

The positioning concept is frozen, but exact homepage H1 copy remains `COPY_FREEZE_PENDING_VISUAL_REVIEW`. Phase 3 reviewed evidence did not approve the exact H1: `PHASE_3_CHECKPOINT_1_REPORT.md` records that Human copy approval is still required, and `PHASE_3_VISUAL_RESEARCH_GATE_2.md` lists the final public H1 as pending. Do not infer or freeze an H1 from the positioning candidate; formal publication requires an explicit Human copy approval record. `JS Meilai` is the Human-approved public English brand and metadata title identity; it must not be presented as a separate unapproved legal entity.

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

### Publication blocker state

The sitemap above is the route-ownership map, not a launch-pass list. The following route owners are currently `DEFERRED_LAUNCH_BLOCKER`:

- `/factory/`: comprehensive factory evidence and approved facts remain deferred; its absence must not be checked as publication-gate completion.
- `/custom-manufacturing/`: the capability/conversion route remains deferred; its absence must not be checked as publication-gate completion.
- `/costume-gloves/`: no approved production asset set or route integration exists; do not create the page or add it to the sitemap. Its unresolved status is a launch blocker, not an ignorable omission.

No restricted launch is permitted. Formal launch requires every `DEFERRED_LAUNCH_BLOCKER` to be resolved by a reviewed implementation/evidence decision, in addition to the required `/contact/` and `/privacy/` gates.

## 3. Page templates

- **Homepage**: positioning/H1, five family entry points, approved evidence, custom-manufacturing bridge, RFQ CTA.
- **Products hub**: concise comparison of the five families, links to each owner, no generic “all gloves” keyword target.
- **Collection**: family intent/H1, curated product grid, confirmed style/material/length context, B2B evidence, procurement questions with status labels, RFQ CTA.
- **Custom Manufacturing**: supported customization workflow, boundaries and enquiry qualification; no invented OEM promises.
- **Factory**: approved identity, process/evidence imagery and factual capability context; unknown metrics omitted.
- **Contact/RFQ**: labeled form, consent, privacy link, success/error states and the approved public fallback `yumao3623@gmail.com`.
- **Privacy**: Resend and Gmail processing, data use, retention, rights and contact details completed before launch.

## 4. Child-page threshold

Each candidate child (`/opera-gloves/satin/`, `/bridal-gloves/lace/`, `/bridal-gloves/sheer-tulle/`, `/bridal-gloves/fingerless/`) becomes `FROZEN` and indexable only when **all** conditions are met:

1. At least 8 active, distinct products in the child with approved status.
2. At least 3 approved images per representative product and at least 12 usable child images overall.
3. A distinct search intent is observed in a current SERP sample: at least 6 of the top 10 organic results materially match the child intent, and the parent page cannot answer it without a dedicated experience.
4. Sufficient unique, factory-confirmed content, imagery and specifications exist to satisfy the child intent independently, without filler, duplication or keyword padding. A planning estimate may be recorded, but no word count is a pass/fail rule.
5. No material cannibalization with a parent or another child, documented in the keyword ownership map.
6. A named owner agrees to maintain the page when products change.

If any condition fails, render the style as a section/filter on the parent and keep the route absent from the sitemap or `noindex`. This is an executable gate, not a future review placeholder.

## 5. Product page model

V1 is **category-only B2B catalogue**. Do not build individual indexable PDPs. Collection cards expose approved name, image, style/material, dimensions and “Request a Quote” context from `PRODUCT_DATA_MODEL.md`; unresolved values are omitted or marked pending. Reconsider PDPs only when the ADR 0005 evidence triggers are met: product-level information gain, unique approved specs/images for a meaningful share, demonstrated shareable-URL demand, acceptable thin-content risk and a catalogue owner. Roughly 30 active products is supporting scale evidence only.

## 6. Data and assets

Use the status-aware fields and validation contract in `PRODUCT_DATA_MODEL.md`. Use `ASSET_PIPELINE.md` for immutable originals, processed WebP/AVIF, thumbnails, manifests, alt text, duplicate detection and the 1688 screenshot policy.

## 7. RFQ and contact

Use one `/contact/` flow per `RFQ_SPEC.md`. V1 has no upload, cart, checkout, payment or account. Required fields are name, company, country, email, product family, quantity, message and consent; WhatsApp is optional. Resend sends `JS Meilai RFQ <rfq@mail.jsmeilai.com>` to `yumao3623@gmail.com` with `Reply-To` set to the buyer email. The sender address is not an inbox. Implement server validation, durable rate limiting, honeypot/provider risk checks, privacy-safe logging and authenticated email delivery.

## 8. Infrastructure

GitHub remains the source repository. `V1_HOSTING = Vercel`; Cloudflare Pages is fallback. `V1_DATABASE = NONE`. `https://www.jsmeilai.com/` is the approved canonical host and matching apex URLs permanently redirect to it. DNS, Vercel binding, Resend account/domain/API key and analytics properties remain pending publication integration and must not be created in this checkpoint. The approved RFQ recipient is `yumao3623@gmail.com`; no independent sender mailbox is provisioned. See `HOSTING_DECISION.md` and `INFRASTRUCTURE_REGISTRY.md`.

## 9. SEO and rendering

Follow `SEO_TECHNICAL_SPEC.md`: HTTPS and one host, trailing slash, one canonical owner, unique metadata, one H1, static/server-rendered primary content, sitemap/robots/404/redirects, truthful Organization/CollectionPage/BreadcrumbList/Product/FAQ schema, non-indexable facets, English-only and CWV targets LCP <=2.5s, INP <=200ms, CLS <=0.1.

## 10. UI direction

Implement the Human-approved Variant E `Image-led Editorial Utility` direction from `UI_DESIGN_SPEC.md`: real photography, restrained ink/neutral palette, 1200-1280px content width, 8px spacing unit, dense but scannable catalogue grids, mobile-safe navigation and WCAG-oriented focus/contrast/touch behavior. Human Visual Gate 2 approved the visual direction; fonts, exact hex values and CTA treatment remain provisional design tokens pending final publication implementation. This visual approval does not approve the exact homepage H1 copy. shadcn is a reference/component source, not architecture.

## 11. Analytics taxonomy

Define events now; wire GA4 only after launch consent and property approval: `rfq_submit`, `contact_click`, `whatsapp_click`, `product_family_view`, `sample_request`. Event parameters may include family, source route and success/failure state, but never message bodies or personal contact fields.

## 12. Factual boundaries

Only `FACTORY_CONFIRMED` scope, general customization availability and overseas enquiry ownership are publishable now. The approved RFQ recipient and public failure fallback are `yumao3623@gmail.com`; legal identity and other public contacts (WhatsApp, phone and physical address) remain pending, along with MOQ, sample terms, lead times, capacity, certifications and exact specs, as defined in `PUBLISHING_BOUNDARIES.md`.

## 13. Phase 3 implementation-aid policy

This specification is the source of truth. Build Web Apps skills/plugins may be used as implementation or testing aids: Frontend App Builder, Frontend Testing/Debugging, React Best Practices and shadcn/ui. Their existence does not authorize scope expansion. Stripe, payment, Supabase, Postgres, any database, ecommerce or other out-of-scope capability requires a new reviewed ADR and explicit V1 scope change.

## 14. Phase 3 acceptance criteria

- Every route matches `ROUTE_REGISTRY.md`; no duplicate keyword owner or unapproved child route.
- Build is static/server-rendered for primary content and produces valid metadata, sitemap, robots, 404 and redirects.
- Formal launch is blocked while any `DEFERRED_LAUNCH_BLOCKER` remains unresolved; omitting a blocked route is not a passing condition and no restricted launch is allowed.
- The exact homepage H1 has an explicit Human copy approval record; `COPY_FREEZE_PENDING_VISUAL_REVIEW` cannot pass the publication gate.
- Product records pass status/source validation; no fabricated values or marketplace screenshots appear as product imagery.
- RFQ flow validates server-side, respects consent, handles failure and does not expose secrets.
- Responsive/accessibility checks pass at 375/768/1024/1440px; images reserve space and meet CWV targets in representative tests.
- No database, payment, account, multilingual or broad blog feature is introduced.
- Human review approves English identity, contact recipient, customization boundaries and any operational claims before publication.
