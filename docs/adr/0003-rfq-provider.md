# ADR 0003: Serverless RFQ Endpoint With External Email Provider

## Context
The site needs qualified enquiry delivery without a database or public credentials in the client.

## Decision
Implement one serverless endpoint with server-side validation/rate limiting and an external transactional email provider. Keep recipient and provider credentials pending until factory approval.

## Alternatives
Third-party hosted form, provider-native edge function, mailto-only form.

## Consequences
Good UX and control with modest operational work: DNS authentication, spam controls, privacy review and deliverability monitoring are required. File upload is deferred.

## Change trigger
Provider cannot meet privacy/deliverability needs, or secure uploads/CRM routing become an approved requirement.
