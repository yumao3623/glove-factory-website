# Decisions Log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-08-31 | Treat screenshots as the factory's 1688 evidence, not competitors. | User clarification; competitor discovery must come from validated SERPs/Semrush queries. |
| 2026-08-31 | Stop at Phase 0. | Project brief explicitly prohibits development before approval. |
| 2026-08-31 | Keep keyword list as seed research, not final map. | Export contains mixed B2B, B2C and unrelated fingerless-glove intent. |
| 2026-08-31 | Use evidence labels on every claim. | Avoid converting platform displays or hypotheses into fabricated factory facts. |
| 2026-08-31 | No database in initial architecture assumption. | B2B catalogue and enquiry capture do not require accounts, orders or inventory DB. |
| 2026-09-01 | Confirm `jsmeilai.com` as the official domain without enabling production configuration. | Domain selection is complete; DNS, Vercel binding, production canonical URLs, sitemap/robots production state, GSC, GA4, business email and launch remain separate checkpoints. |
| 2026-09-01 | Treat self-owned product images from the confirmed factory 1688 storefront as covered by a store-level public-use grant for `jsmeilai.com`. | Reuse permission inherits only after source/provenance validation; it never clears watermark, third-party, character/IP, poster, Chinese-marketing or mapping risk. |
| 2026-09-01 | Use a static, draft-first Product Batch Ingestion Workflow and begin with a limited real-data pilot. | A 1688 listing is evidence, not automatically a website product. Preserve frozen taxonomy, category-only V1 and `V1_DATABASE = NONE`; concentrate Human Gate on exceptions and retain image cleanup as a separate queue. |
