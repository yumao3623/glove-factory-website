# V1 Requirements Freeze

## IN_SCOPE_V1

- English B2B lead-generation site for five approved product families.
- Homepage, products hub, five collection pages, custom manufacturing, factory/about evidence, contact/RFQ and privacy page.
- Static/server-rendered SEO content, canonical metadata, sitemap, robots, 404, breadcrumbs and approved structured data.
- Product cards/modules backed by the status-aware catalogue model.
- RFQ form with server validation, spam controls and email notification through an external provider.
- Real approved product/factory imagery and responsive accessible UI.
- Event taxonomy definition for future GA4/Search Console integration.

## OUT_OF_SCOPE_V1

Consumer ecommerce, cart, checkout, payment, accounts, order management, CRM, database/Supabase, inventory/stock, automatic shipping quotes, multilingual pages, broad blog, uncontrolled programmatic SEO, public pricing tables, and file upload.

## DEFERRED

Individual PDPs, conditional style child pages, second-language routes, secure reference-image upload, CMS, advanced filtering, downloadable spec library, and automated CRM sync. Each requires evidence and an ADR before implementation.

## Implementation aid boundary

Phase 3 may use Build Web Apps skills as implementation/testing aids, while `PROJECT_SPEC_V1.md` remains authoritative. The presence of Frontend App Builder, Frontend Testing/Debugging, React Best Practices or shadcn/ui does not permit Stripe, payment, Supabase, Postgres, database, ecommerce or another out-of-scope feature. Such a change requires a new reviewed ADR and explicit scope approval.
