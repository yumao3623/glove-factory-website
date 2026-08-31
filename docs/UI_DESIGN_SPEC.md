# UI Design Specification

## Recommended direction: Editorial Utility

Use a restrained B2B interface with fashion sensitivity: real glove and veil photography, quiet navy/ink text, white and cool-neutral surfaces, and a single accessible blue CTA. The UI should feel credible to a sourcing manager while preserving the elegance of occasionwear. The generated UI/UX reference recommends Trust & Authority, Playfair Display plus Inter, and neutral professional blue; these are directional inputs, not a mandate to copy any template.

### Alternative directions considered

1. **Luxury editorial**: stronger serif typography and generous whitespace; attractive for bridal buyers but risks hiding procurement information.
2. **Catalog utility**: dense grids, filters and compact controls; efficient for repeat buyers but can look like a generic wholesaler.
3. **Editorial utility (recommended)**: combines clear family navigation and comparison density with selective editorial photography and trust evidence.

## System rules

- Max content width 1200-1280px with consistent horizontal gutters; full-width bands only for hero/trust transitions.
- 8px spacing unit; common vertical rhythm 16/24/32/48/64px. No decorative card nesting; cards represent individual products or framed tools only.
- Typography: one expressive serif for display headings only if performance/licensing is approved; highly legible sans-serif for body, metadata and forms. Minimum body size 16px on mobile and 1.5 line-height.
- Palette direction: ink `#0F172A`, slate `#334155`, background `#F8FAFC`, text `#020617`, CTA blue `#0369A1`; verify 4.5:1 contrast and provide focus rings.
- Images are the primary visual evidence. Use stable aspect ratios, object-fit rules and descriptive captions where a detail needs interpretation.

## Navigation and page behavior

Primary nav: Products, Custom Manufacturing, Factory, Contact, with a persistent `Request a Quote` action. Products opens the five family owners; style children are secondary and only visible when approved. Mobile uses a keyboard-accessible disclosure menu and keeps the RFQ action reachable without covering content.

Collection pages lead with family, audience/use context, product grid, controlled filters (style/material/length only where data exists), manufacturing evidence and RFQ. Filters update the view without creating indexable URLs by default.

## Accessibility and responsive requirements

- Semantic landmarks, labeled form controls, keyboard navigation, 44px minimum touch targets, visible `:focus-visible`, descriptive alt text and non-color status cues.
- Test 375, 768, 1024 and 1440px widths with no horizontal scrolling or overlap. Respect `prefers-reduced-motion`; transitions stay 150-300ms and never shift layout.
- Error, loading and empty states are explicit and placed next to the affected control. Do not use emoji as icons; use a consistent SVG icon set.

## Trust presentation

Show only approved factory evidence with source/date context. Keep claims adjacent to the proof and label unknown procurement fields as pending/on request rather than filling gaps with badges or statistics.
