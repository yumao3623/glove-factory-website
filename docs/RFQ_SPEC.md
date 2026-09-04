# RFQ / B2B Conversion Specification

V1 is lead generation, not ecommerce. There is no cart, checkout, payment, account or consumer order flow.

## Stakeholder preview boundary

While runtime mode is `STAKEHOLDER_PREVIEW`, the RFQ UI is an informational notice with no form controls, browser state, client submission or personal-data fields. `POST /api/rfq/` returns service-disabled status before reading the request body; it does not validate, rate-limit, log, transmit or persist payloads. Resend, storage and visitor-data collection remain disabled until a separately approved formal publication checkpoint.

## Required fields

| field | requirement |
|---|---|
| Name | Required; plain text. |
| Company | Required for B2B qualification; allow “independent buyer” only if approved. |
| Country/region | Required; controlled list plus “Other”. |
| Email | Required; server-side format and disposable-domain checks where lawful. |
| WhatsApp | Optional; international format, never the only contact path. |
| Product / product family | Required; selected family and optional product IDs. |
| Quantity | Required as a free range or number with unit; do not promise MOQ in the form. |
| Customization requirements | Optional structured checkboxes plus free text; options remain `PENDING_CONFIRMATION` until factory approval. |
| Message | Required; concise project context. |
| File/reference image | Deferred in V1. |
| Consent/privacy | Required checkbox linked to `/privacy/`; no pre-checked consent. |

## Flow

1. CTA opens `/contact/` with family/product context passed as a safe query value or hidden signed field.
2. Client validates required fields for usability; server validates again, rate-limits and sanitizes.
3. Endpoint sends a structured notification to `yumao3623@gmail.com` using `JS Meilai RFQ <rfq@mail.jsmeilai.com>` and sets `Reply-To` to the buyer email. A neutral confirmation is sent to the buyer only after the provider accepts the send.
4. Failure state preserves entered data locally for the current session and provides the approved fallback contact route.
5. Record only the minimum data needed for fulfilment and abuse handling; retention and deletion terms live in the privacy policy.

## Implementation comparison

| option | cost | spam/privacy | deliverability | maintenance | V1 decision |
|---|---|---|---|---|---|
| Serverless endpoint + transactional email | Low to moderate usage cost; provider free tier may apply | Full server validation, rate limit and consent control; no client secret | Strong when SPF/DKIM/DMARC are configured | Small endpoint plus provider monitoring | **Recommended** |
| Hosted third-party form provider | Subscription or per-submission cost | Fast CAPTCHA and storage, but more third-party data processing and branding | Usually managed; vendor dependence | Lowest code, ongoing vendor/privacy review | **Backup** |
| Provider-native function/worker | Low runtime cost | Similar controls, but runtime-specific APIs | Depends on provider integration | Higher platform coupling | Defer unless hosting fallback requires it |
| `mailto:` or client-only form | No service cost | Poor validation, privacy and abuse control | Unreliable; exposes recipient | Low code but high operational failure | Reject |

The recommended and backup choices both exclude file uploads for V1. If uploads are later approved, add malware scanning, object-storage access controls, size/type limits, retention/deletion and signed links before implementation.

## CTA hierarchy

Primary: `Request a Quote`. Secondary: `Request Samples` (only when sample handling is confirmed), `Discuss Custom Order`, and `Contact Us`. Product cards and family pages should route to the same RFQ destination rather than competing forms.

## File upload decision

No upload in V1. Secure object storage, content scanning, size limits, retention, consent and email-link handling add material risk while the factory can receive reference images by email/WhatsApp after first contact. Reconsider only through an ADR when a verified workflow owner and storage budget exist.

## Approved delivery boundary

- Provider: Resend.
- Sending identity: `JS Meilai RFQ <rfq@mail.jsmeilai.com>`; this is not an inbox and V1 does not configure inbound mail for it.
- Recipient and approved failure fallback: `yumao3623@gmail.com`.
- Resend domain authentication: verify `mail.jsmeilai.com`, publish provider-supplied SPF/DKIM records and configure DMARC before live delivery.
- Retention: Resend email data for 30 days; Gmail enquiries for 12 months after the last business action, then delete unless a documented legal or contractual exception applies.

## Abuse, privacy and delivery

Use server-side rate limiting, honeypot and provider-supported CAPTCHA/risk checks; do not rely on client-only validation. Avoid logging message bodies or contact data in analytics. SPF/DKIM/DMARC and a monitored sending domain are launch blockers for email delivery. Verify Resend webhook signatures and deduplicate at-least-once events. `RESEND_API_KEY` is server-only. The privacy notice must identify Resend and Gmail processing, cross-border transfer, fields, purpose, retention and deletion rights.
