# Phase 4A Publication Gate Checklist

Status: `HUMAN_APPROVED_FOR_DOCUMENTATION_SYNC`

Date: 2026-09-04

This is a decision and launch-gate record only. It does not provision accounts, alter DNS, create secrets, connect Vercel or Resend, change runtime code, deploy, or authorize a reduced launch.

## Approved decisions

- Canonical host: `https://www.jsmeilai.com/`.
- Matching apex URLs `https://jsmeilai.com/*` permanently redirect to the corresponding `www` URL. Use one-hop server-side 308 (301 is acceptable if required by the platform); preserve path and query.
- RFQ provider: Resend.
- From: `JS Meilai RFQ <rfq@mail.jsmeilai.com>`.
- To: `yumao3623@gmail.com`.
- Reply-To: the buyer's submitted email address.
- `rfq@mail.jsmeilai.com` is a sending identity only. V1 does not register an independent mailbox or configure inbound receiving for it.
- Failure fallback may publicly display `yumao3623@gmail.com`.
- Resend data retention: 30 days.
- Gmail enquiry retention: 12 months after the last business action, then delete unless a documented legal or contractual exception applies.
- `/contact/` and `/privacy/` are required before live RFQ and formal launch.
- `/factory/` and `/custom-manufacturing/` are `DEFERRED_LAUNCH_BLOCKER`; their deferred state cannot be used to pass the publication gate.
- `/costume-gloves/` is `DEFERRED_LAUNCH_BLOCKER` because no approved production asset set or route integration exists. Do not create the page or add it to the sitemap; its absence is not a gate pass.
- No restricted launch is permitted. Formal launch requires the complete publication gate.

## Publication gate

### Content and route readiness

- [ ] `/contact/` is the single RFQ/contact owner and contains the approved form, consent and failure fallback.
- [ ] `/privacy/` is published as a noindex legal page before any live enquiry is collected.
- [x] Human formally approved the exact homepage H1: `Occasion Gloves & Wedding Veils Manufacturer` (2026-09-04).
- [ ] Factory and customization claims are approved and evidence-bounded.

### Launch-blocking deferred routes

These are status records, not checkboxes. Keeping a page absent or explicitly blocked does not satisfy the publication gate.

| Route | Current status | Gate meaning |
|---|---|---|
| `/factory/` | `DEFERRED_LAUNCH_BLOCKER` | Resolve with approved factory evidence/content and reviewed implementation before formal launch. |
| `/custom-manufacturing/` | `DEFERRED_LAUNCH_BLOCKER` | Resolve with approved capability boundaries/content and reviewed implementation before formal launch. |
| `/costume-gloves/` | `DEFERRED_LAUNCH_BLOCKER` | No approved assets or route integration; do not create or sitemap it. Resolve through a reviewed asset/route decision before formal launch. |

Formal launch is blocked while any row remains in this state. No restricted launch exception exists.

## Stakeholder preview exception

`STAKEHOLDER_PREVIEW` is a bounded, public-review implementation and is not a formal publication-gate pass. It keeps `/factory/`, `/custom-manufacturing/` and `/costume-gloves/` deferred, leaves `/contact/` and `/privacy/` unresolved, disables RFQ collection and Resend, and applies noindex/nofollow behavior independently of the deployment hostname. These formal blockers remain unchanged and must be resolved in a separate checkpoint before SEO launch.

### Host, DNS and preview safety

- [ ] Existing Vercel project and production deployment are explicitly approved for formal launch and re-verified.
- [ ] Existing `www.jsmeilai.com` binding is re-verified as the production canonical host; do not duplicate-bind it.
- [ ] Existing apex, HTTP and alternate host redirects are re-verified to reach the HTTPS `www` URL with a one-hop permanent redirect; do not recreate them without evidence.
- [ ] Preview deployments are access-protected and emit noindex behavior; they are not linked or submitted to Search Console.
- [ ] `NEXT_PUBLIC_SITE_URL` and all absolute URL outputs use `https://www.jsmeilai.com/`.

### RFQ delivery and abuse controls

- [ ] `mail.jsmeilai.com` is verified in Resend with provider-supplied SPF/DKIM records and DMARC.
- [ ] `RESEND_API_KEY` exists only in server-side platform secret storage.
- [ ] The endpoint sends only to the approved recipient and uses the approved From/Reply-To values.
- [ ] Provider/API failure returns an actionable error, preserves entered fields locally and shows the approved fallback.
- [ ] Durable rate limiting, payload limits, honeypot and provider-supported CAPTCHA/risk controls are enabled; the current per-instance memory map is not sufficient.
- [ ] Resend webhooks for delivery, failure, bounce, complaint and suppression are signature-verified and deduplicated.
- [ ] Operational logs retain only minimum diagnostics and never RFQ bodies or unnecessary contact data.

### Privacy, retention and observability

- [ ] Privacy notice identifies the fields, purpose, consent, Resend processing, Gmail receipt, cross-border transfer, retention, deletion and rights process.
- [ ] Resend's 30-day email-data boundary and the 12-month Gmail mailbox policy match the published notice and operator practice.
- [ ] Vercel log retention and access controls are verified for the actual account; repository state alone cannot prove them.
- [ ] Delivery failure, suppression and mailbox monitoring owners are named.

### SEO and indexability

- [ ] Every indexable page self-canonicalizes to the HTTPS `www` host.
- [ ] Sitemap contains only approved canonical indexable routes and uses the `www` host.
- [ ] Production `robots.txt` references that sitemap, permits approved pages and does not substitute robots rules for preview privacy.
- [ ] Redirect, canonical, sitemap, metadata and rendered status checks pass on the production host.

## External state requiring verification

The repository records stakeholder-preview verification (Vercel project/deployment, host, HTTPS, redirects, noindex and RFQ `503`) in `STAKEHOLDER_PREVIEW.md`. Formal launch must re-verify and approve that existing Vercel/DNS/host configuration; it must not duplicate-bind resources. Resend account/domain/API key, Gmail mailbox policy, preview protection, GSC and GA4 remain `UNKNOWN` or pending until their separately authorized publication-integration checkpoint verifies them.
