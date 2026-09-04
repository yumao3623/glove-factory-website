# Infrastructure Registry

| Resource | Status | Phase 2 decision / boundary |
|---|---|---|
| GitHub repository | DECIDED | `yumao3623/glove-factory-website`; phase branch and checkpoint tag are used. |
| Hosting | DECIDED | Vercel for V1; Cloudflare Pages is fallback. No project created. |
| Domain | CONFIRMED_OFFICIAL_DOMAIN | `jsmeilai.com` is the confirmed official domain. The canonical host is separately approved as `https://www.jsmeilai.com/`; this row does not create or authorize DNS, hosting, email, public links, or launch. |
| DNS/CDN | PENDING_PUBLICATION_CONFIGURATION | Configure with Vercel at the publication-integration checkpoint. Canonical host is `https://www.jsmeilai.com/`; permanently redirect matching apex URLs to `www`. HTTPS and one canonical host are required before public launch. |
| Business email | DECIDED_PENDING_PROVISIONING | RFQ recipient/fallback is `yumao3623@gmail.com`. `rfq@mail.jsmeilai.com` is an approved sending identity only; no V1 mailbox or inbound receiving service is provisioned. Gmail retention is 12 months after the last business action. |
| RFQ/Form | DECIDED_PENDING_PUBLICATION | Serverless endpoint + Resend transactional email. Send as `JS Meilai RFQ <rfq@mail.jsmeilai.com>`, deliver to `yumao3623@gmail.com`, and set `Reply-To` to the buyer email. Resend data retention is 30 days; API key and verified DNS records remain to be provisioned at publication integration. |
| Analytics | DEFERRED | Define events now; create GA4 only at launch with consent/privacy review. |
| Google Search Console | DEFERRED | Verify `jsmeilai.com` at launch after the production domain binding is live; no property created. |
| Database / Supabase | NOT_REQUIRED | `V1_DATABASE = NONE`; no Supabase project or schema. |
| Environment variables/secrets | PENDING_PUBLICATION_CONFIGURATION | `RESEND_API_KEY` will be required server-side at publication integration; no secret is created or committed in this checkpoint. |

No production resource, paid service, database, DNS record, domain binding or credential was created in Phase 2. Domain ownership/selection is now confirmed separately from production configuration.
