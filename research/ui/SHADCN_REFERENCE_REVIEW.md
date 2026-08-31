# shadcn Reference Review

Reviewed sources on 2026-08-31:

- `github.com/yumao3623/shadcn-landing-page` repository metadata and README.
- `zippystarter.com/tools/shadcn-ui-theme-generator` public tool page.

## Repository findings

- License: MIT (copyright notice for the repository author). Retain the license notice if code is reused; still review each dependency's license.
- Stack: Next.js `14.2.3`, React 18, TypeScript 5, Tailwind 3.4, Radix primitives, `lucide-react`, `react-hook-form`, `zod`, carousel/marquee packages and dark-mode support.
- Sections include Navbar, Hero, Sponsors, Benefits, Features, Testimonials, Team, Community, Contact, Pricing, FAQ, Services and Footer. This is a generic marketing demo, not a product-catalogue architecture.
- Responsive navigation and Radix-based controls are useful patterns. The number of dependencies and demo sections increase bundle/maintenance cost if copied wholesale.

## Theme generator findings

The generator is useful for exploring shadcn-compatible CSS variables, semantic color roles and light/dark contrast. It is a design aid only; generated values require accessibility checks and must be reconciled with real product photography.

## Decision for this project

Use shadcn as a component reference and optionally copy individual MIT-compatible primitives into the Phase 3 codebase after license review. Do not clone the repository, inherit its sections, or treat its Next.js version as the project version. The architecture source of truth is `docs/PROJECT_SPEC_V1.md`; visual direction is `docs/UI_DESIGN_SPEC.md`.

## Acceptance checks before reuse

Confirm dependency licenses, keyboard/focus behavior, reduced-motion handling, responsive behavior at 375/768/1024/1440px, bundle impact and semantic headings. Remove unused demo dependencies and avoid client-side components for static SEO content.
