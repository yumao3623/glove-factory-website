# Infrastructure Registry

| Resource | Status | Phase 2 decision / boundary |
|---|---|---|
| GitHub repository | DECIDED | `yumao3623/glove-factory-website`; phase branch and checkpoint tag are used. |
| Hosting | DECIDED | Vercel for V1; Cloudflare Pages is fallback. No project created. |
| Domain | CONFIRMED_OFFICIAL_DOMAIN | `jsmeilai.com` is the confirmed official domain. This confirms domain selection only; it does not create or authorize DNS, hosting, canonical metadata, email, public links, or launch. |
| DNS/CDN | PENDING_PUBLICATION_CONFIGURATION | Configure with the chosen host at the publication-integration checkpoint. HTTPS and one canonical host are required before public launch. |
| Business email | PENDING_ACCOUNT | Exact public mailbox/owner not supplied. |
| RFQ/Form | DECIDED | Serverless endpoint + external transactional email provider; provider/account/API key pending. |
| Analytics | DEFERRED | Define events now; create GA4 only at launch with consent/privacy review. |
| Google Search Console | DEFERRED | Verify `jsmeilai.com` at launch after the production domain binding is live; no property created. |
| Database / Supabase | NOT_REQUIRED | `V1_DATABASE = NONE`; no Supabase project or schema. |
| Environment variables/secrets | NOT_REQUIRED | None created; Phase 3 must use platform secret storage, never commit secrets. |

No production resource, paid service, database, DNS record, domain binding or credential was created in Phase 2. Domain ownership/selection is now confirmed separately from production configuration.
