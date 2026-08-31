# Technical Stack Decision

## Decision

`V1_STACK = Next.js App Router + TypeScript + Tailwind CSS + a small, audited subset of shadcn/ui primitives`, deployed as static/server-rendered pages on Vercel with one serverless RFQ endpoint. Use the latest project-supported stable Next.js major at Phase 3 kickoff, pin exact versions in the lockfile, and upgrade only through a reviewed change.

## Why

- Next.js provides static generation, metadata, sitemap/robots conventions and a clean path to a server endpoint without a database.
- TypeScript makes the product data status model enforceable and reduces accidental publication of unknown fields.
- Tailwind gives predictable responsive tokens and keeps the design system close to the specification.
- shadcn components are source-owned and can provide accessible form, dialog, button and navigation primitives without adopting a full design system.

## Trade-offs and policy

This stack adds React/Next build complexity compared with plain static HTML, but the project already targets a maintainable catalogue and future growth. Avoid adding a CMS, state library, UI kit or analytics SDK unless a concrete V1 requirement exists. No shadcn landing-page repository is cloned; components are references only. Keep business data in versioned files and isolate the RFQ provider behind a small adapter.
