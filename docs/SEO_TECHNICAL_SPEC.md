# SEO Technical Specification

## Canonical and host conventions

- HTTPS only; the confirmed official domain is `jsmeilai.com`, but its production binding and canonical-host decision remain pending the publication-integration checkpoint. Use one canonical host and permanent redirects from every alternate host before public launch.
- Canonical URLs are absolute, lowercase, hyphenated and trailing-slash terminated: `/bridal-gloves/`.
- Query strings, sort orders and filters are non-canonical and `noindex,follow` unless an ADR approves a child landing route.
- Staging/preview deployments are access-protected and `noindex`; they must not be linked in production or submitted to Search Console.

## Metadata and headings

- Title template: `{Page topic} | {Approved English company name}`. Until identity is confirmed, use a placeholder in specs and never invent a brand.
- Every indexable page has a unique 50-60 character target title where practical and a 140-160 character factual meta description; no keyword lists or unsupported promises.
- Exactly one H1 states the page topic. H2s cover product range, evidence/capability, procurement details and next step in task order; H3s are subordinate, never styling hooks.
- Homepage positioning direction: `Occasion Gloves & Wedding Veils Manufacturer`; exact H1 is `COPY_FREEZE_PENDING_VISUAL_REVIEW` and must retain the same range intent after visual/copy review.

## Crawl and index

- Generate `sitemap.xml` from approved `FROZEN` indexable routes only; omit conditional children until they pass threshold and omit `/privacy/`, aliases and system routes.
- `robots.txt` permits approved public pages, disallows preview paths and does not use robots as a substitute for `noindex`.
- Custom 404 returns HTTP 404, offers family links and RFQ CTA, and is excluded from sitemap.
- Maintain a redirect map for legacy or renamed routes; use one-hop 301 redirects and avoid chains.

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
