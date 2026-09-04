# Stakeholder Preview

Status: `IMPLEMENTED_PENDING_DEPLOYMENT`

This checkpoint prepares a public review build for family viewing. It is not a formal SEO launch and does not alter formal-launch blockers.

## Runtime boundary

- Mode is code-baked as `STAKEHOLDER_PREVIEW` and fail-closed.
- Only the four approved collection routes are presented: bridal gloves, opera gloves, kids dress gloves and wedding veils.
- `/factory/`, `/custom-manufacturing/` and `/costume-gloves/` remain absent.
- RFQ/contact handling is an offline notice. The UI has no fields or submit request. `POST /api/rfq/` returns `503` before reading a body and performs no validation, logging, rate limiting, storage or Resend call.
- Root/page metadata and a global `X-Robots-Tag` emit noindex, nofollow, noarchive and noimageindex. `robots.txt` does not advertise a sitemap. No GSC submission is permitted.

## Human-operated deployment checklist

1. After Human Review, create/import a Vercel project from the reviewed branch.
2. Set `NEXT_PUBLIC_SITE_URL=https://www.jsmeilai.com` and deploy the preview-safe code.
3. Add `www.jsmeilai.com` to Vercel and use the DNS target Vercel provides; verify rendered canonical URLs and noindex headers on the real `www` host.
4. Add `jsmeilai.com` as the apex domain in Vercel. Configure DNS as instructed and make apex HTTP/HTTPS variants permanently redirect in one hop to the matching `https://www.jsmeilai.com/<path>?<query>` URL.
5. Verify HTTPS, trailing slash, canonical links, `X-Robots-Tag`, `robots.txt`, and RFQ `503` behavior on `www` and redirect behavior on apex/HTTP variants.
6. Do not add GSC, submit a sitemap, configure Resend, create `RESEND_API_KEY`, publish mail DNS records, or enable analytics in this preview.
7. Keep `STAKEHOLDER_PREVIEW` enabled until a separate formal publication review explicitly changes the mode and resolves every blocker.
