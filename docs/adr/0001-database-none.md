# ADR 0001: V1 Database None

## Context
The V1 catalogue is static and the only transaction is an RFQ notification.

## Decision
`V1_DATABASE = NONE`. Product data is versioned repository content; enquiry persistence is delegated to the selected form/email provider under its retention policy.

## Alternatives
Supabase/Postgres, headless CMS, or a custom order database.

## Consequences
Lower cost, attack surface and maintenance. Catalogue updates require reviewed deploys and provider-side enquiry export/retention must be verified.

## Change trigger
Need for authenticated users, inventory, searchable large catalogue, CRM sync, or durable first-party enquiry records.
