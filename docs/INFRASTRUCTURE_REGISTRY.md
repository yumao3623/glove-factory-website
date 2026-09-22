# Infrastructure Registry

> 2026-09-22 治理注记：本文保留当时的范围与验收，不作为当前任务队列或实时平台状态。当前事实见 [PROJECT_STATUS.md](PROJECT_STATUS.md)，未来顺序见 [ROADMAP.md](ROADMAP.md)。文内旧“待上线/未配置/2.3 必做多语言”等表述按历史理解；不抹除已完成的 2.1.5 或 2.2。

| Resource | Status | Phase 2 decision / boundary |
|---|---|---|
| GitHub repository | DECIDED | `yumao3623/glove-factory-website`; phase branch and checkpoint tag are used. |
| Hosting | PREVIEW_CONFIGURED_EXTERNALLY_VERIFIED; FORMAL_LAUNCH_REVERIFY_PENDING | Vercel serves the stakeholder preview, as recorded in `STAKEHOLDER_PREVIEW.md`; formal launch requires re-verification and approval of this existing project/deployment, not duplicate creation. Cloudflare Pages is fallback. |
| Domain | CONFIRMED_OFFICIAL_DOMAIN; PREVIEW_VERIFIED | `jsmeilai.com` is the confirmed official domain and `https://www.jsmeilai.com/` is the approved canonical host. Preview binding/HTTPS/redirect observations are recorded in `STAKEHOLDER_PREVIEW.md`; this row does not authorize formal launch. |
| DNS/CDN | PREVIEW_CONFIGURED_EXTERNALLY_VERIFIED; FORMAL_LAUNCH_REVERIFY_PENDING | The stakeholder-preview host and apex/HTTP redirect behavior were externally verified and are recorded in `STAKEHOLDER_PREVIEW.md`. Formal launch requires re-verification and approval of the existing configuration, not duplicate binding. |
| Business email | DECIDED_PENDING_PROVISIONING | RFQ recipient/fallback is `yumao3623@gmail.com`. `rfq@mail.jsmeilai.com` is an approved sending identity only; no V1 mailbox or inbound receiving service is provisioned. Gmail retention is 12 months after the last business action. |
| RFQ/Form | DECIDED_PENDING_PUBLICATION | Serverless endpoint + Resend transactional email. Send as `JS Meilai RFQ <rfq@mail.jsmeilai.com>`, deliver to `yumao3623@gmail.com`, and set `Reply-To` to the buyer email. Resend data retention is 30 days; API key and verified DNS records remain to be provisioned at publication integration. |
| Analytics | DEFERRED | Define events now; create GA4 only at launch with consent/privacy review. |
| Google Search Console | DEFERRED | Verify `jsmeilai.com` at launch after the production domain binding is live; no property created. |
| Database / Supabase | NOT_REQUIRED | `V1_DATABASE = NONE`; no Supabase project or schema. |
| Environment variables/secrets | PENDING_PUBLICATION_CONFIGURATION | `RESEND_API_KEY` will be required server-side at publication integration; no secret is created or committed in this checkpoint. |

| Stakeholder preview runtime | IMPLEMENTED; EXTERNALLY_VERIFIED | Code-baked `STAKEHOLDER_PREVIEW` mode is noindex on metadata and HTTP responses, keeps four approved collection routes, disables RFQ collection/API processing, and was externally verified on `https://www.jsmeilai.com/`; evidence is recorded in `STAKEHOLDER_PREVIEW.md`. |

No formal-production resource, paid service, database, DNS record, domain binding or credential was created in Phase 2. The separately recorded stakeholder-preview deployment does not change the formal publication boundary.
