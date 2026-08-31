# Infrastructure Registry

| Resource | Status | Phase 2 decision / boundary |
|---|---|---|
| GitHub repository | DECIDED | `yumao3623/glove-factory-website`; phase branch and checkpoint tag are used. |
| Hosting | DECIDED | Vercel for V1; Cloudflare Pages is fallback. No project created. |
| Domain | PENDING_DOMAIN | Factory must provide/approve domain; do not purchase in Phase 2. |
| DNS/CDN | PENDING_DOMAIN | Configure with chosen host only after domain approval; HTTPS and one canonical host required. |
| Business email | PENDING_ACCOUNT | Exact public mailbox/owner not supplied. |
| RFQ/Form | DECIDED | Serverless endpoint + external transactional email provider; provider/account/API key pending. |
| Analytics | DEFERRED | Define events now; create GA4 only at launch with consent/privacy review. |
| Google Search Console | DEFERRED | Verify the approved domain at launch; no property created. |
| Database / Supabase | NOT_REQUIRED | `V1_DATABASE = NONE`; no Supabase project or schema. |
| Environment variables/secrets | NOT_REQUIRED | None created; Phase 3 must use platform secret storage, never commit secrets. |

No production resource, paid service, database, domain or credential was created in Phase 2.
