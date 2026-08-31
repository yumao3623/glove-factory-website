# Phase 2 Human Review Disposition

Date: 2026-08-31
Review type: Human Phase 2 Gate comments
Disposition: analyzed independently; this document records accepted refinements and retained decisions.

| Review comment | Decision | Rationale and evidence | Resulting change |
|---|---|---|---|
| Excluded routes may be mistaken for noindex HTML pages; wedding-gloves should be redirect-only. | PARTIALLY_ACCEPT | Existing `NOINDEX` status correctly described SEO treatment, but did not state implementation action. That is a credible Phase 3 ambiguity. Phase 1 explicitly treated generic lace/mesh/fingerless/wholesale as no page and wedding-gloves as an alias. | Added `implementation` column. Exclusions are `DO_NOT_CREATE`; wedding-gloves is `REDIRECT_301_ONLY` with one-hop 301 and no HTML. |
| Fixed 400-word child-page threshold is mechanical. | ACCEPT | `SEO_GUIDE.md` and `B2B_SEO_ADAPTATION.md` prioritize user value, information gain and no filler. Phase 1 SERP findings support distinct intent, breadth and evidence, not a word-count minimum. | Replaced the hard gate with sufficient unique, factory-confirmed content/imagery/specifications; explicitly reject filler and keyword padding. |
| Exact homepage H1 should remain open for copy/visual review. | PARTIALLY_ACCEPT | The range concept is supported by factory-confirmed scope and Phase 1 terminology. “Occasion Gloves” is natural and more inclusive; “Special Occasion Gloves” has no stronger measured evidence. Exact line length and visual hierarchy still need real imagery review. | Positioning concept remains frozen; exact H1 is `COPY_FREEZE_PENDING_VISUAL_REVIEW`. SEO ownership and fallback remain unchanged. |
| Freeze Editorial Utility, but make fonts/palette/CTA provisional. | PARTIALLY_ACCEPT | UI direction is supported by competitor review and B2B/fashion balance. Exact tokens need contrast, performance and photography validation; shadcn review does not justify inheriting its theme. | Marked fonts, hex palette and CTA candidate as `PROVISIONAL_DESIGN_TOKENS`; retained accessibility/performance requirements. |
| Utility/trust/contact pages need not have artificial primary keywords. | ACCEPT | Phase 1 keyword ownership evidence is strong for five product collections, but weak or absent for hub, factory, custom and contact tasks. Their primary jobs are navigation, trust and conversion. | Set `primary_keyword = N/A` for `/products/`, `/custom-manufacturing/`, `/factory/` and `/contact/`; supporting language and page intent remain. |
| `30 active products` is a mechanical PDP trigger. | ACCEPT | Product count is only a scale signal. Information gain, unique approved specs/images, shareable URL demand, thin-content risk and maintenance ownership are the substantive criteria. | ADR 0005 and Project Spec now treat ~30 products as supporting evidence, neither necessary nor sufficient. V1 remains category-only. |
| Build Web Apps plugin policy should prevent scope drift. | ACCEPT | Plugins/skills are implementation aids, while the Project Spec is the source of truth. Existing V1 out-of-scope list already excludes Stripe, Supabase, database and ecommerce; making the policy explicit reduces accidental expansion. | Added a concise policy to `PROJECT_SPEC_V1.md` and `REQUIREMENTS_V1.md`. No plugin introduced code or services. |

## Unchanged original decisions

- Five product-family keyword owners remain unchanged.
- V1 remains B2B lead generation, not ecommerce.
- `V1_DATABASE = NONE`, Vercel recommendation, English-only launch and no-file-upload RFQ remain unchanged.
- No website code, Phase 3 branch, production service, domain, database, PR or merge was created.
