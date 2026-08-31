# ADR 0002: Host On Vercel

## Context
The site needs Next.js static rendering, GitHub previews and a low-ops CDN.

## Decision
Use Vercel for V1, with portable Next.js and no Vercel-only data service. Cloudflare Pages is the fallback.

## Alternatives
Cloudflare Pages/Workers, Netlify, self-hosted VPS.

## Consequences
Fast setup and preview workflow; moderate platform coupling and usage-limit monitoring. No production project is created in Phase 2.

## Change trigger
Account, regional delivery, cost, or runtime requirements materially favor another host.
