# SEO Technical Specification

## Canonical and host conventions

- HTTPS only; the approved canonical host is `https://www.jsmeilai.com/`. Permanently redirect every matching apex URL (`https://jsmeilai.com/*`) to the corresponding `www` URL. HTTP variants must also terminate at the HTTPS `www` URL.
- Canonical URLs are absolute, lowercase, hyphenated and trailing-slash terminated: `/bridal-gloves/`.
- Query strings, sort orders and filters are non-canonical and `noindex,follow` unless an ADR approves a child landing route.
- The code-baked `STAKEHOLDER_PREVIEW` deployment is public-reviewable but emits `noindex, nofollow` metadata and `X-Robots-Tag` on every path, independent of the deployment hostname. It must not be submitted to Search Console. Formal production may use a different policy only after the publication gate passes.

## Metadata and headings

- Title template: `{Page topic} | JS Meilai`. `JS Meilai` is the Human-approved public English brand and metadata identity.
- Every indexable page has a unique 50-60 character target title where practical and a 140-160 character factual meta description; no keyword lists or unsupported promises.
- Exactly one H1 states the page topic. H2s cover product range, evidence/capability, procurement details and next step in task order; H3s are subordinate, never styling hooks.
- Homepage exact H1 `Occasion Gloves & Wedding Veils Manufacturer` is formally Human-approved on 2026-09-04; this does not by itself pass the formal publication gate.

## Crawl and index

- Generate `sitemap.xml` from approved `FROZEN` indexable routes only; omit conditional children until they pass threshold and omit `/privacy/`, aliases and system routes.
- Routes marked `DEFERRED_LAUNCH_BLOCKER` in `PROJECT_SPEC_V1.md` and `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` (`/factory/`, `/custom-manufacturing/`, `/costume-gloves/`) remain excluded from the production sitemap and must not be silently ignored. Their absence protects indexability but does not satisfy the publication gate; no restricted launch is allowed.
- `robots.txt` permits approved public pages, disallows preview paths and does not use robots as a substitute for `noindex`.
- Custom 404 returns HTTP 404, offers family links and RFQ CTA, and is excluded from sitemap.
- Maintain a redirect map for legacy or renamed routes; use one-hop permanent redirects (308 preferred, 301 acceptable) and avoid chains. The apex-to-`www` host redirect is part of this map.

## Structured data

- Organization schema on the site shell only after legal identity, logo and contact facts are confirmed.
- Collection pages may use `CollectionPage` and `BreadcrumbList`; product cards do not use fake aggregate ratings or price fields.
- `Product` schema is reserved for approved, uniquely identifiable products if individual PDPs are later introduced; no invented SKU, availability, price or review.
- FAQPage is used only when the exact visible Q&A is factory-confirmed and materially helpful; never for keyword stuffing.

## Images and links

- Follow `ASSET_PIPELINE.md`: real product/factory photos first, descriptive alt text, intrinsic dimensions, WebP/AVIF derivatives, responsive sizes and lazy loading below the first viewport.
- Breadcrumbs mirror the route hierarchy. Contextual links connect the homepage/products hub to family pages, family pages to custom manufacturing and contact, and factory evidence back to relevant families.
- Avoid generic “learn more” links when a specific label can state the destination.

## Internationalization and rendering

`V1_LANGUAGE = English only`. Do not emit hreflang until a second language has an owned translation workflow and equivalent page set. Keep route/data boundaries locale-ready, but no placeholder language pages.

Use static generation for all catalogue/factory pages with server-rendered metadata and content. A server endpoint is permitted only for RFQ delivery. No client-only rendering of primary product copy.

## Performance targets

Target Core Web Vitals at the 75th percentile: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 on mobile and desktop. Reserve image space, minimize JavaScript, self-host or optimize fonts, and test representative collection pages on a mid-tier mobile connection.

Open Graph/Twitter metadata uses the same approved title/description and a permitted representative image; no social claim is stronger than the page evidence.

## Publication gate dependencies

- Every indexable page must use the approved `JS Meilai` metadata identity and the HTTPS `www` canonical host.
- The exact homepage H1 approval is recorded, but formal publication remains blocked by unresolved route, legal, infrastructure and delivery gates.
- `DEFERRED_LAUNCH_BLOCKER` routes are unresolved launch blockers even when their pages are absent. Formal publication cannot pass until each blocker is explicitly resolved.
