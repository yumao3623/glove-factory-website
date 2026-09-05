# Stakeholder Preview

Status: `IMPLEMENTED; EXTERNALLY_VERIFIED_ON_PREVIEW_HOST`

This checkpoint prepares a public review build for family viewing. It is not a formal SEO launch and does not alter formal-launch blockers.

## Runtime boundary

- Mode is code-baked as `STAKEHOLDER_PREVIEW` and fail-closed.
- Only the four approved collection routes are presented: bridal gloves, opera gloves, kids dress gloves and wedding veils.
- `/factory/`, `/custom-manufacturing/` and `/costume-gloves/` remain absent.
- RFQ/contact handling is an offline notice. The UI has no fields or submit request. `POST /api/rfq/` returns `503` before reading a body and performs no validation, logging, rate limiting, storage or Resend call.
- Root/page metadata and a global `X-Robots-Tag` emit noindex, nofollow, noarchive and noimageindex. `robots.txt` does not advertise a sitemap. No GSC submission is permitted.

## External verification record

Verification class: `EXTERNALLY_VERIFIED_REPO_RECORDED`

Source: previous checkpoint live verification of the stakeholder-preview host (2026-09-04 review). This section is the durable repository summary; it does not authorize formal publication.

Observed on `https://www.jsmeilai.com/`:

- A Vercel project/deployment served the reviewed stakeholder-preview build.
- The `www` domain binding and HTTPS response were valid.
- Apex and HTTP variants redirected to the HTTPS `www` host in the expected one-hop form.
- Page metadata/response headers emitted the preview noindex policy.
- `POST /api/rfq/` returned `503` without enabling collection or provider delivery.

This verifies the externally observed preview state only. Formal production binding, launch indexability, Resend, GSC, mailbox policy and other publication controls remain governed by the Phase 4A gate and their separate integration evidence.

## Formal publication integration checklist

The preview observations above cover the stakeholder-preview deployment checks. The numbered list below remains the formal publication checklist and is intentionally not a claim that formal launch configuration is complete.

1. For formal launch, reuse the existing Vercel project/deployment after Human Review; do not create a duplicate solely for this gate.
2. Set `NEXT_PUBLIC_SITE_URL=https://www.jsmeilai.com` and deploy the preview-safe code.
3. Re-verify the existing `www.jsmeilai.com` binding, rendered canonical URLs and noindex headers on the real `www` host.
4. Re-verify the existing `jsmeilai.com` apex binding and DNS instructions; do not duplicate-bind it. Confirm apex HTTP/HTTPS variants permanently redirect in one hop to the matching `https://www.jsmeilai.com/<path>?<query>` URL.
5. Re-verify HTTPS, trailing slash, canonical links, `X-Robots-Tag`, `robots.txt`, and RFQ `503` behavior on `www` and redirect behavior on apex/HTTP variants.
6. Do not add GSC, submit a sitemap, configure Resend, create `RESEND_API_KEY`, publish mail DNS records, or enable analytics in this preview.
7. Keep `STAKEHOLDER_PREVIEW` enabled until a separate formal publication review explicitly changes the mode and resolves every blocker.
