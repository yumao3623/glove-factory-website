# Hosting Decision

## Options

| criterion | Vercel | Cloudflare Pages | Other managed static host |
|---|---|---|---|
| Next.js compatibility | First-party; strongest App Router and preview support | Strong for static/edge, but some Next.js features need adapters | Varies; more configuration |
| Cost | Free tier suitable for low-volume site; usage limits must be monitored | Free tier generous for static delivery; functions/limits vary | Usually low cost, less integrated |
| Images | `next/image` and CDN optimizations | Static image CDN; Next image behavior needs deliberate setup | Depends on provider |
| Forms | Serverless/route handler or external provider | Pages Functions/Workers or external provider | Often external endpoint |
| CDN/SEO | Global CDN, SSR/SSG crawlable | Global CDN, static crawlable | Usually crawlable |
| Git/preview | Native GitHub previews and rollbacks | Native Git integration and previews | Often webhook-based |
| Lock-in | Moderate to Vercel runtime conventions | Moderate to Workers runtime if used | Lower, but more operational work |

## Decision

`V1_HOSTING = Vercel` for the Next.js static/mostly-static site, using GitHub integration, preview deployments and a custom domain after the human gate. Pages should remain portable: standard Next.js, no Vercel-only data service, and form delivery behind an adapter. Cloudflare Pages is the documented fallback if pricing, account policy or regional delivery makes Vercel unsuitable.

No project, domain, DNS record or deployment is created in Phase 2.
