# ADR 0003: Serverless RFQ Endpoint With External Email Provider

## Context
The site needs qualified enquiry delivery without a database or public credentials in the client.

## Decision
Implement one serverless endpoint with server-side validation/rate limiting and Resend as the external transactional email provider.

The approved V1 routing is:

- `From`: `JS Meilai RFQ <rfq@mail.jsmeilai.com>`
- `To`: `yumao3623@gmail.com`
- `Reply-To`: the buyer-supplied email address
- `rfq@mail.jsmeilai.com` is a sending identity only; V1 does not provision a mailbox or inbound receiving service for it.

The sending subdomain must be verified in Resend with its supplied SPF/DKIM records and a DMARC policy before live delivery. `RESEND_API_KEY` is server-only and must be stored in platform secret storage. Resend email data is recorded with a 30-day retention boundary. The receiving Gmail mailbox retains each enquiry for 12 months after the last business action, then deletes it unless a documented legal or contractual need requires longer retention.

## Alternatives
Third-party hosted form, provider-native edge function, mailto-only form.

## Consequences
Good UX and control with modest operational work: DNS authentication, spam controls, privacy review and deliverability monitoring are required. Delivery webhooks must be signature-verified and deduplicated; bounce, complaint, failed and suppressed events require operator follow-up. Application logs must not retain RFQ bodies or unnecessary contact data. File upload is deferred.

## Change trigger
Provider cannot meet privacy/deliverability needs, or secure uploads/CRM routing become an approved requirement.
