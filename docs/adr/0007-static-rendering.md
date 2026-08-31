# ADR 0007: Static Rendering For Primary Content

## Context
SEO pages are stable catalogue/factory content; only RFQ submission is dynamic.

## Decision
Use static generation/server rendering for all primary pages and metadata. Keep client JavaScript for progressive enhancement only; isolate the RFQ endpoint.

## Alternatives
Client-rendered SPA, fully dynamic server pages, CMS-driven rendering.

## Consequences
Strong crawlability and performance with deploy-based content updates. Dynamic personalization and live inventory are unavailable.

## Change trigger
Approved live data, personalization or CMS workflow requiring request-time rendering.
