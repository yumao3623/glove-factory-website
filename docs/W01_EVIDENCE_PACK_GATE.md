# W01 Evidence Pack Gate

Status: `HUMAN_REVIEW_ACCEPTED; W01_EVIDENCE_PACK_GATE_COMPLETE`

Workstream: `W01 — Evidence Pack Gate`

Bounded checkpoint: close the repository evidence/status matrix for missing route materials, legal/contact boundaries, approved product/image inputs, and explicit omissions.

This record is a W01 evidence pack only. It changes no route, runtime, product decision, production-asset selection, external service, or roadmap order. `V1_POST_PREVIEW_EXECUTION_ROADMAP.md` remains the canonical workstream register and records W01 as complete after Human Review acceptance on 2026-09-05. Earlier sections preserve the chronological pre-acceptance review record; the final acceptance section supersedes their then-current `NEXT` and `PENDING_HUMAN_GATE` statements where the Human later supplied or accepted a decision.

## Entry and Scope Check

| Check | Result | Evidence |
| --- | --- | --- |
| Declared workstream and checkpoint | `W01 — Evidence Pack Gate` | `V1_POST_PREVIEW_EXECUTION_ROADMAP.md` current-next-checkpoint section |
| Dependencies | Satisfied for evidence collection | Reviewed baseline; frozen route/spec/boundary documents; tracked product and asset ledgers |
| Allowed scope | Documentation and classification only | W01 allows collecting, classifying, and documenting facts; it excludes route creation, legal invention, and RFQ activation |
| Authority conflict | None found | `PROJECT_SPEC_V1.md`, `ROUTE_REGISTRY.md`, `PUBLISHING_BOUNDARIES.md`, and `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` agree on the unresolved boundaries below |

Evidence terms use the vocabulary in the roadmap. `PENDING_HUMAN_GATE` means the repository contains the prepared evidence but a Human must accept facts, permissions, legal/contact boundaries, or page scope. `UNKNOWN` is deliberately omittable unless a particular claim or page requires it.

## Route Materials and Claim Matrix

| Surface / requested fact | Repository status | Source record | Owner / required decision | W01 disposition |
| --- | --- | --- | --- | --- |
| Public brand and metadata identity: `JS Meilai` | `REPO_CONFIRMED` | `PROJECT_SPEC_V1.md` sections 1 and 12; `PUBLISHING_BOUNDARIES.md` | No new decision for brand use | May be used as brand/metadata identity only; do not represent it as a legal entity. |
| Registered identity and public brand | `HUMAN_CONFIRMED` | User-provided business licence image in this evidence pack; Human Review supplement (2026-09-05) | Chinese registered name: `江山市美来服饰厂`; public English brand: `JS Meilai` | Use `JS Meilai` as the brand. Where legal identity is needed, show the Chinese registered name exactly; do not call `JS Meilai` a separately registered English legal entity or invent an official English legal name. |
| Official domain: `jsmeilai.com` | `REPO_CONFIRMED` | `FACTS_AND_ASSUMPTIONS.md` | No W01 action | May be described as the confirmed official domain; it is not proof of legal identity, email, or launch configuration. |
| Formal canonical host: `https://www.jsmeilai.com/` | `REPO_CONFIRMED` as a documented decision | `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; `PROJECT_SPEC_V1.md` | Formal-launch re-verification remains a Phase 4A formal-publication check | No Vercel, DNS, redirect, or indexability action in W01. |
| Public fallback and approved RFQ recipient: `yumao3623@gmail.com` | `REPO_CONFIRMED` | `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; `PROJECT_SPEC_V1.md`; `RFQ_SPEC.md` | Human/operational owner must accept live collection and monitoring in W04 | It is an approved recipient and public failure fallback, not proof that RFQ delivery is enabled. |
| Sending identity: `rfq@mail.jsmeilai.com` | `REPO_CONFIRMED` as a future sending identity | `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; `RFQ_SPEC.md` | W04 must verify Resend and mail-domain controls | Never describe it as a receiving mailbox; no provider or DNS action in W01. |
| Public phone and WhatsApp | `HUMAN_CONFIRMED` | Human Review supplements (2026-09-05) | `+60 1114166916` is the only approved public phone/WhatsApp value | Do not use the China phone/mobile/fax values visible in attachment 8. |
| Public address | `HUMAN_CONFIRMED` | Business licence image and Human Review supplement (2026-09-05) | `浙江省衢州市江山市石门镇泉塘村泉塘路37号` | `52号` is not approved for public display in V1. |
| Contact route content and RFQ form/consent/failure handling | `PENDING_HUMAN_GATE` | `PROJECT_SPEC_V1.md`; `RFQ_SPEC.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` | Human accepts live collection, consent copy, operational owner, and W04 provider evidence | No route or form implementation in W01. Current stakeholder preview remains an offline notice. |
| Privacy notice identity, rights contact, processing, cross-border transfer, retention, and deletion process | `HUMAN_APPROVED_V1_POLICY; W04_VERIFICATION_REQUIRED` | `RFQ_SPEC.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; Human Review supplement (2026-09-05); Resend Privacy Policy reviewed 2026-09-05 | Rights/deletion contact: `yumao3623@gmail.com`, monitored by the Human operator. V1 policy: Resend email data boundary of 30 days; Gmail enquiry retention for 12 months after the last business action, then delete unless a documented legal or contractual exception applies. | This is an approved operator policy, not proof of a configured Resend/Gmail/Vercel state. W04 must verify provider terms/configuration, actual deletion operation, cross-border notice and live-RFQ controls. |
| Active product-family scope | `REPO_CONFIRMED` | `FACTS_AND_ASSUMPTIONS.md`; `FACTORY_PRODUCT_MAP.md`; `PUBLISHING_BOUNDARIES.md` | No new fact decision | Supported scope: bridal/wedding, opera/evening/satin, lace, sheer/tulle/fingerless, costume/stage/cosplay-type, kids/girls dress, and wedding/bridal veils. |
| General customization availability across active families | `REPO_CONFIRMED` | `FACTS_AND_ASSUMPTIONS.md`; `FACTORY_PRODUCT_MAP.md`; `PUBLISHING_BOUNDARIES.md` | No new fact decision | May be stated carefully as general availability only. |
| Customization scope | `HUMAN_CONFIRMED_WITH_PROJECT_REVIEW_BOUNDARY` | Human Review supplement (2026-09-05) | Supported areas: style, colour, sizing, logo, packaging and customer-supplied materials | Publishable bounded wording: "Customization is available for style, colour, sizing, logo application, packaging and customer-supplied materials, subject to product and project review." Do not imply automatic acceptance, MOQ, sample, lead time, capacity or a guarantee for every request. |
| Factory staffing and area | `HUMAN_CONFIRMED` | Human Review supplement (2026-09-05), supported but not independently proved by platform evidence | Total team: 19 people; production personnel: 15 people; total factory area: 500 m2; warehouse area: 80 m2 | These may be considered for later approved factory-page copy only. They remain outside W01 implementation; no equipment, OEM/ODM, capacity, QC, certification, years, customer-recognition or platform-metric claim is approved. |
| MOQ, sample availability/fee, sample and bulk lead times, capacity, packaging, QC, certification, exact composition/specification, export history, named customers, sustainability claims | `UNKNOWN` | `PUBLISHING_BOUNDARIES.md`; `FACTORY_QUESTIONS.md`; `PRODUCT_DATA_MODEL.md` | Human supplies documentary support only where the claim will be shown | Omit numeric/operational promises. Product fields remain status-aware rather than inferred. |
| `/factory/` page scope | `EVIDENCE_SCOPE_PARTIALLY_READY; IMPLEMENTATION_UNAUTHORIZED` | `PROJECT_SPEC_V1.md`; `ROUTE_REGISTRY.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; Human Review supplement (2026-09-05) | Identity, approved address, team/area distinctions and a bounded claim list are now supplied. | It remains `DEFERRED_LAUNCH_BLOCKER` until Human accepts the W01 evidence pack and the canonical roadmap records a separate reviewed implementation checkpoint. W01 cannot create the route. |
| `/custom-manufacturing/` page scope | `EVIDENCE_SCOPE_PARTIALLY_READY; IMPLEMENTATION_UNAUTHORIZED` | `PROJECT_SPEC_V1.md`; `ROUTE_REGISTRY.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; Human Review supplement (2026-09-05) | General scope is now supplied with a project-review boundary. | It remains `DEFERRED_LAUNCH_BLOCKER` until Human accepts the W01 evidence pack and the canonical roadmap records a separate reviewed implementation checkpoint. W01 cannot create the route. |
| `/costume-gloves/` page scope | `PENDING_HUMAN_GATE` | `PROJECT_SPEC_V1.md`; `ROUTE_REGISTRY.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`; `ASSET_REVIEW.md` | W02/Human review must accept clean, provenance-validated, non-IP-risk product assets and route integration | Remains `DEFERRED_LAUNCH_BLOCKER`; do not create or sitemap it. |
| `/contact/` and `/privacy/` existence | `PENDING_HUMAN_GATE` | `ROUTE_REGISTRY.md`; `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md` | Human accepts the content/legal boundaries above; W04 owns live RFQ integration | Required before live RFQ/formal launch, but not authorized for runtime creation in W01. |

## Product and Asset Readiness

| Input | Repository status | Source record | W01 disposition |
| --- | --- | --- | --- |
| Listing registry | `REPO_CONFIRMED` | `data/ingestion/listing-registry.json` | Contains 40 source listings: 39 `PENDING_REVIEW` and 1 `QUARANTINED`. This is W02's full decision population, not an approved publication tranche. |
| Listing family decisions | `REPO_CONFIRMED` as partial evidence only | `data/ingestion/listing-registry.json` | 33 listings have a Human-accepted family classification, 6 require a family decision, and 1 is quarantined. Every non-quarantined listing still has overall `PENDING_REVIEW`; family classification is not final publication approval. |
| Approved ProductRecords | `REPO_CONFIRMED` | `data/products/approved/initial-public-tranche.json` | Four approved normalized records cover seven source listing IDs: one each for bridal, opera, kids dress, and wedding veils. They do not settle the other 33 source listings or authorize collection integration. |
| Approved production assets | `REPO_CONFIRMED` | `assets/asset-manifest.json` | Nine assets for the four approved records have `STORE_LEVEL_PERMISSION_INHERITED` and `HUMAN_PRODUCTION_APPROVED`. Their source listing IDs and hashes are recorded. |
| Legacy visual candidates | `PENDING_HUMAN_GATE` | `assets/asset-manifest.json`; `research/assets/phase-3-review/ASSET_REVIEW.md` | Seven candidates still require permission confirmation. They remain non-public evidence until provenance and risk review pass. |
| Rejected / research-only image sets | `REPO_CONFIRMED` | `assets/asset-manifest.json`; `ASSET_REVIEW.md` | Watermarked fringe gloves, Frozen/Elsa-context gloves, and marketplace/Chinese posters are excluded from production use. |
| Factory workshop imagery | `PENDING_HUMAN_GATE` | `assets/asset-manifest.json`; `ASSET_REVIEW.md`; `ASSET_PIPELINE.md` | Two workshop images require separate authorization; product-store permission cannot be inherited for them. |
| Product facts not visible or separately confirmed | `UNKNOWN` unless each field says otherwise | `PRODUCT_DATA_MODEL.md`; approved ProductRecords | Composition, color availability, dimensions, sizes, MOQ, samples, lead time, capacity, and most customization fields remain omitted/pending. Photography is not a substitute for fact evidence. |

The four approved ProductRecords are not a status conflict with the listing registry: the registry preserves the 40-source-listing W02 decision state, while a normalized ProductRecord may deliberately group several source listings. W02 must still record an auditable final disposition for every listing before any approved subset proceeds to a separate route/publication integration check.

## Explicit Omissions and Deferred Boundaries

| Item | Status | Reason / owning gate |
| --- | --- | --- |
| Runtime route creation, page copy implementation, sitemap changes, and collection integration | `DEFERRED` | Outside W01; later reviewed implementation checkpoint only. |
| Resend credentials and delivery testing; DNS, Vercel, domain binding, mailbox setup; analytics, GSC, and GA4 | `DEFERRED` | Outside W01; W04 owns RFQ integration, W07 owns GSC, and Phase 4A retains the formal host/publication checks. |
| Legal identity, address, phone, WhatsApp, public contact policy, and privacy rights contact | `PENDING_HUMAN_GATE` | Human must supply or explicitly approve omission before an affected page can make the statement. |
| Detailed custom capability, MOQ, sample terms, lead times, capacity, specifications, certificates, QC, packaging, export/customer/sustainability claims | `UNKNOWN` | Omit unless Human provides direct publishable evidence. |
| Factory and costume routes | `PENDING_HUMAN_GATE` | Both remain launch blockers under their existing route/content and asset gates. |
| Formal launch and indexability | `DEFERRED` | Stakeholder preview verification is `EXTERNALLY_VERIFIED_REPO_RECORDED`; formal launch requires the separate Phase 4A re-verification and approval. |

## Human Review Required to Close W01

Human Review must accept the evidence classification and make or confirm only the following bounded decisions:

1. Confirm the publishable English legal/operator identity, or explicitly retain its omission for the present page scope.
2. Confirm whether any phone, WhatsApp, physical address, or additional public contact channel will be published; otherwise retain the approved fallback email as the only documented public fallback.
3. Confirm the scope of `/factory/` and `/custom-manufacturing/`: which direct evidence and exact buyer-facing claims may appear, including whether the two workshop images are authorized for public use.
4. Confirm the privacy-notice legal/operator and rights-contact facts and that the approved retention terms match the intended operating practice. This does not activate RFQ or authorize W04.
5. Accept the product/asset readiness summary as W02 input: 40 tracked listings, four approved normalized ProductRecords, nine approved production assets, one quarantined IP-risk listing, and no automatic approval of the remainder.
6. Accept the explicit omissions. Any newly requested operational or legal claim must have a source, status, and owner before it is added to a later page or integration checkpoint.

Until Human Review explicitly accepts this pack, W01 remains the only active workstream and its canonical roadmap status remains unchanged.

## W01 Human Review Supplement (2026-09-05)

This supplement records the new Human-provided facts and eight attached images as W01 evidence. It does not change the checkpoint status, promote platform fields to public facts, approve a product tranche, or authorize W02, route work, UI work, external services, or launch.

### New fact disposition

| Human-provided item | Evidence/status | W01 judgment | Remaining boundary |
| --- | --- | --- | --- |
| Public phone and WhatsApp: `+60 1114166916` | `HUMAN_PROVIDED_FOR_PUBLIC_CONTACT` | The supplied number may be used as the website phone/WhatsApp contact. The other numbers visible in attachment 8 are explicitly not approved and must not be used. | This does not by itself identify the legal operator or make the number the privacy rights channel. |
| All previously uploaded images except the known IP-risk item are authorized for this website | `HUMAN_CONFIRMED_USE_PERMISSION; PRODUCTION_APPROVAL_UNCHANGED` | Resolves the use-permission fact, including the two prior workshop candidates, except for the already identified IP-risk item. It does not clear watermarks, marketplace UI, third-party/character content, provenance, quality, or product mapping; it does not convert a legacy candidate into `HUMAN_PRODUCTION_APPROVED`. | The existing manifest is not rewritten in W01. Each asset still needs its required storefront/listing/hash linkage plus risk and mapping review before production approval. For factory imagery, an affirmative public production-use decision and fact-to-image mapping remain required. |
| All factory products support customization, including style, colour, sizing, Logo, packaging and customer-supplied materials | `HUMAN_CONFIRMED` | Supports only a qualified capability statement: customization is available in these areas, subject to product and project review. | No automatic acceptance, MOQ, sampling, lead-time, capacity, price, material or compliance promise follows from this fact. |
| User handles early enquiries and Privacy daily operations alone | `HUMAN_CONFIRMED_OPERATIONAL_OWNER` | The user will monitor `yumao3623@gmail.com` for early enquiry and Privacy rights/deletion requests. | This does not prove provider/mailbox configuration or live deletion operation; W04 remains responsible for those checks. |
| Potential third-party visual-material website for future decorative imagery | `POTENTIAL_FUTURE_W11_W05_INPUT; UNKNOWN_LICENSE` | Record availability only. Such images may be atmosphere/decorative material and may not represent JS Meilai products, customers, factory, or capability evidence. | URL, exact asset pages, commercial-use license, attribution, modification, model/property and other restrictions must be verified before W11/W05 selection or use. |

### Supplementary image evidence ledger

The files remain in their external temporary locations and are not copied into the repository. Hashes and dimensions identify the supplied evidence set.

| # | User-provided external attachment | Full SHA-256 |
| --- | --- | --- |
| 1 | `codex-clipboard-a7114aef-3cd8-4570-9ffe-e63c4b12360f.png` | `3962BF81CB43393A911BCF0FA6215A10E7304F3AAF04018F54A2627EA7BE6BA2` |
| 2 | `codex-clipboard-ee888fe1-a9b7-4c43-9b19-69e6ad4f2118.png` | `FA13A6DB7183603C0A8A1AB244E17122A1B41054276EF7E55CF96BF836B42CB1` |
| 3 | `codex-clipboard-8d9f9e10-5d16-4ebb-b47f-b3442d3bd518.png` | `2141E0582FEC49CAEDCCD5340501B91D27EC6A5CF89F798CDF5CCCB90AAE5B13` |
| 4 | `codex-clipboard-25eac055-a727-47ba-af40-656023c52d08.png` | `E2919D7CB77701F367ED65B738DA0C3D6C5D24BE9C8D67F776FA2DD335A01883` |
| 5 | `codex-clipboard-8c8332ec-adf4-4b9b-ab37-54012a52f9c6.png` | `BF69F99A2C9B7F7C038C3574010C4D7C6B81CE084240E159C6AD7D0A562397CF` |
| 6 | `codex-clipboard-57a843e2-3ce9-47ef-9c68-b01812726d98.png` | `79667DDE810C224AA575D88C482F2D138C78395453CD14106289D11EF1AE173E` |
| 7 | `codex-clipboard-168d3da2-d3bd-4e01-8cb7-05c1cedd4af2.png` | `7C450B55503ACAFF094B8F0BFDD3E85E0C288A0971C5C3C7E6CC9AB4F6E8117D` |
| 8 | `codex-clipboard-8a7e0fc7-fece-4dc0-bbca-df45f50f0853.png` | `DCB153A6F37B57C1A5DD0DB64FF9EBF81EB8FEF346897833BE3F01F457CDCF9F` |

| # | Supplied file (SHA-256 prefix) | Dimensions | Observed source/content | Source strength and publication risk |
| --- | --- | --- | --- | --- |
| 1 | `codex-clipboard-a7114aef-3cd8-4570-9ffe-e63c4b12360f.png` (`3962BF81...7BE6BA2`) | 2000x1432 | Chinese business licence: `江山市美来服饰厂`, individual business, operator `曹青海`, registration `2010-08-13`, registered location ending `泉塘路37号`, clothing/glove/accessory scope. | Strongest documentary evidence in this set, but user approval is still required for English rendering and whether to publish legal/address details. It is not an English public identity by itself. |
| 2 | `codex-clipboard-ee888fe1-a9b7-4c43-9b19-69e6ad4f2118.png` (`FA13A6DB...42CB1`) | 1199x678 | 1688 licence-information UI repeating name/code/date/operator and a `37号` address ending; latest annual inspection shown as 2025. | Platform presentation derived from the licence; supportive only. Do not publish annual-inspection or platform fields without separate approval. |
| 3 | `codex-clipboard-8d9f9e10-5d16-4ebb-b47f-b3442d3bd518.png` (`2141E058...AAE5B13`) | 1201x755 | 1688 factory/equipment UI: self-owned factory, 15 people, 23 equipment, `52号` address ending, OEM 40%/ODM 60%, and displayed machine counts. | Platform display only. None of these metrics, ratios or equipment claims are public facts. The `52号` address conflicts with the licence/contact `37号`. |
| 4 | `codex-clipboard-25eac055-a727-47ba-af40-656023c52d08.png` (`E2919D7C...5A01883`) | 1205x673 | 1688 R&D/QC UI: no design outsourcing, 100 new styles/year, designer tenure, one engineer, sampling figures, and QC/self-inspection fields. | Platform display only; no public R&D, sampling, staffing, output or QC claim is approved. |
| 5 | `codex-clipboard-8c8332ec-adf4-4b9b-ab37-54012a52f9c6.png` (`BF69F99A...62397CF`) | 1202x830 | 1688 sales/warehouse UI: one online platform/1688 URL, wedding gloves, Zhejiang location, warehouse/inventory images and `80 m²` display. | Platform display only. Warehouse imagery may be use-authorized under the new Human statement, but identity mapping, area, stock and capability claims remain unapproved. |
| 6 | `codex-clipboard-57a843e2-3ce9-47ef-9c68-b01812726d98.png` (`79667DDE...1AE173E`) | 1202x467 | SGS-branded `深度认证报告` platform screen for `江山市美来服饰厂`, report `HGHWT00371059`, dated `2026-03-12`; disclaimer says it describes merchant-provided material and does not verify/analyse/legal-evaluate all information. | Third-party/platform report evidence with an explicit limitation. Do not call the site or factory “SGS certified” without independently verified report scope and authority. |
| 7 | `codex-clipboard-168d3da2-d3bd-4e01-8cb7-05c1cedd4af2.png` (`7C450B55...6E8117D`) | 1202x454 | Detailed 1688/SGS report UI: formation `2010-08-13`, production type, area `500 m²`, employees `19`, office location ending `52号`; AI analysis also shows legal person and `37号`. | Third-party/platform evidence only. It contains unresolved address (`37`/`52`) and headcount (`15`/`19`) conflicts; do not choose a value or publish either. |
| 8 | `codex-clipboard-8a7e0fc7-fece-4dc0-bbca-df45f50f0853.png` (`DCB153A6...7CDCF9F`) | 1636x674 | 1688 contact UI: China phone/mobile/fax values, address ending `37号`, and `曹青海先生`. | Platform display only and explicitly not approved for website publication. Do not add these numbers to Contact, Privacy, fallback, or metadata. |

### Conflicts and non-selection record

| Field | Observed values | W01 disposition |
| --- | --- | --- |
| Address | Licence, licence UI, contact UI and AI text: `...泉塘路37号`; factory/office UI: `...泉塘路52号` | Human decision resolves the public selection: publish `浙江省衢州市江山市石门镇泉塘村泉塘路37号`; do not publish `52号`. The platform's `52号` display remains non-authoritative. |
| Headcount | Factory UI: `15`; report UI: `19` | Human decision resolves the scope: total factory team is 19; 15 is the production-personnel subset. Neither value establishes capacity. |
| Facility area | Report UI: `500 m²`; warehouse UI: `80 m²` | Human decision resolves the scope: total factory area is 500 m2; warehouse area is 80 m2. Neither value establishes capacity or stock. |
| Public contacts | Human-supplied Malaysian number; screenshot China phone/mobile/fax | Only `+60 1114166916` is approved for website phone/WhatsApp use; screenshot numbers remain non-public. |
| SGS/report meaning | “Deep certification report” UI plus limitation disclaimer | Evidence of a platform report record only, not a general product, factory, or legal certification. |

### Six Human Review items: current assessment

| Item | Current status | Assessment |
| --- | --- | --- |
| 1. Legal/operator identity | `RESOLVED_FOR_V1_EVIDENCE` | The Chinese registered identity is `江山市美来服饰厂`; `JS Meilai` is the public English brand only. The public address is `浙江省衢州市江山市石门镇泉塘村泉塘路37号`. No invented English legal entity/translation is allowed. |
| 2. Public contacts | `RESOLVED_FOR_V1_EVIDENCE` | `+60 1114166916` is the only approved website phone/WhatsApp value. No screenshot number is approved. Privacy rights/deletion requests go to the separately approved `yumao3623@gmail.com`. |
| 3. Factory/custom scope and workshop imagery | `PARTIALLY_RESOLVED; EVIDENCE_REQUIRED` | Customization covers style, colour, sizing, Logo, packaging and customer-supplied materials, subject to product/project review. Address, team and area have bounded meanings. Factory imagery still lacks W01 production-use approval and direct fact-to-image mapping; exact process/QC/equipment/capacity claims remain unavailable. `/factory/` and `/custom-manufacturing/` remain `DEFERRED_LAUNCH_BLOCKER` pending reviewed implementation/evidence decision. |
| 4. Privacy identity, rights contact and retention practice | `RESOLVED_AS_V1_POLICY; IMPLEMENTATION_VERIFICATION_REQUIRED` | Legal identity/brand boundary, rights contact and operational owner are supplied. Human authorizes the existing Resend 30-day and Gmail 12-month-after-last-action policy, with documented legal/contractual exceptions. W04 must still verify actual provider/mailbox/log state and publishable notice details. |
| 5. Product/asset readiness | `PARTIALLY_RESOLVED; W02_INPUT_ONLY` | Website-use permission is clarified for the supplied image set except the known IP-risk item, but production approval, watermark/UI/third-party/IP checks, listing mapping and all-40 dispositions remain governed by W02 and the asset manifest. |
| 6. Explicit omissions | `REPLACED_BY_UPDATED_MATRIX; HUMAN_ACCEPTANCE_REQUIRED` | The prior omissions matrix is superseded by the exact list below. It preserves only facts still unsupported or outside W01, rather than treating the newly confirmed matters as omissions. |

### Minimum decisions still required to close W01

1. For legal/operator identity, either provide the exact English legal rendering and publication scope, or confirm that legal identity/address assertions remain omitted except where a later legal notice requires the registered name.
2. Choose a reachable Privacy rights/deletion contact: `yumao3623@gmail.com`, `+60 1114166916` (phone/WhatsApp), or both; confirm that the chosen channel is monitored for such requests.
3. Decide whether to adopt the existing approved operating terms (Resend data 30 days; Gmail enquiries 12 months after the last business action, then delete unless a documented legal/contractual exception applies) or defer/request a different policy for later legal review. This message is not treated as acceptance of those terms.
4. For any public factory/address assertion, either confirm omission of address/site claims or explain whether `37号` and `52号` are different sites and provide the one exact address to publish. No address will be selected automatically.
5. Accept the bounded deferral of `/factory/` and `/custom-manufacturing/` until direct evidence, exact claim scope and required image permissions are complete, or provide the narrowly bounded claims/evidence to be evaluated. Generic “all products customizable” does not close this page-scope decision.
6. Explicitly accept this supplemented evidence classification and omissions matrix as the W01 Human Review decision, including that W02 remains gated and no third-party visual material is approved yet.

### Future real-factory photo request (not a W01 implementation)

These are evidence requests for later owning gates, not permission to use stock imagery or a reason to start W02/W05 now.

| Capture set | Subject and use | Orientation / ratio | Minimum quality and safeguards |
| --- | --- | --- | --- |
| Site identity | Exterior, entrance and sign; maps a real site only after address/site identity is confirmed. | Horizontal, 3:2 | At least 3000 px on the long edge; daylight; no third-party/platform UI; avoid visible personal data. |
| Production workflow | Cutting, sewing, finishing/QC and packing; supports bounded process description, not automatic capacity proof. | Horizontal 3:2 plus vertical 4:5 | At least 3000 px on the long edge; obtain consent for identifiable people; exclude customer documents, labels and unrelated brands. |
| Equipment | Each relevant machine in context; supports equipment illustration only. | Horizontal 3:2 | At least 2500 px on the long edge; obscure or separately approve serial/brand labels; do not infer capacity. |
| Warehouse | Storage and packing readiness; supports a factual visual only. | Horizontal, 3:2 | At least 3000 px on the long edge; no claim of area, inventory level or throughput from the photo alone. |
| Product details | Front/back/detail/scale-context views mapped to a product or listing ID. | Square 1:1 or vertical 4:5 | At least 2000 px on the shortest side; retain raw source and checksum; no watermark, marketplace UI, poster, or unresolved IP context. |
| People/team | Workers or team only where needed for a factual page. | Horizontal 3:2 or vertical 4:5 | Consent documented; avoid names, faces or personal data unless explicitly approved for publication. |

### W01 gate decision

`W01 = NEXT; PREPARED_FOR_HUMAN_REVIEW; CHECKPOINT_STATUS_UNCHANGED`.

W01 cannot be closed from the supplied message alone because legal/operator publication scope, Privacy rights contact, executable retention decision, factory/address selection, bounded factory/custom page claims, and explicit acceptance of the supplemented omissions matrix remain unresolved. No W02 action is started. This record pauses at the Human Review boundary.

## W01 Human Review Supplement II (2026-09-05)

This section supersedes the earlier minimum-decision list, conflict treatment and omissions assessment where the Human Review supplement supplied a confirmed fact. It remains evidence documentation only and does not modify the canonical roadmap, create `/factory/` or `/custom-manufacturing/`, change an asset manifest, or start W02.

### Confirmed V1 public-fact matrix

| Subject | Confirmed fact | Accurate V1 boundary / wording |
| --- | --- | --- |
| Legal identity and brand | Registered Chinese entity: `江山市美来服饰厂`; public English brand: `JS Meilai` | Use `JS Meilai` as a brand. When a legal operator must be identified, write the registered Chinese name exactly, for example: "This website is operated by `江山市美来服饰厂` under the `JS Meilai` brand." Do not invent an English registered name or say that `JS Meilai` is an independently registered legal entity. |
| Public address | `浙江省衢州市江山市石门镇泉塘村泉塘路37号` | This is the only approved V1 address. Do not publish `52号` or reconcile it by inference. |
| Team and area | 19 people total; 15 production personnel; 500 m2 factory area; 80 m2 warehouse area | These are contextual factory facts only, not proof of output, capacity, stock, quality system or delivery ability. Use current, plainly attributed copy only after the route has a reviewed implementation decision. |
| Customization | All products support customization in style, colour, sizing, logo application, packaging and customer-supplied materials | Use: "Customization is available for style, colour, sizing, logo application, packaging and customer-supplied materials, subject to product and project review." Do not promise automatic acceptance, exact outcome, MOQ, sampling, lead time, capacity, price, material/compliance result or exclusions not yet evidenced. |
| Contact | Phone and WhatsApp: `+60 1114166916` | This is the only approved telephone/WhatsApp contact. Do not republish the attachment-8 China numbers. |
| Privacy rights/deletion | `yumao3623@gmail.com`, monitored by the Human operator | Use as the rights/deletion contact only. It is also the already approved RFQ recipient/failure fallback; this does not activate RFQ delivery. |
| Retention | Resend email data: 30 days. Gmail enquiries: 12 months after the last business action, then delete, unless a documented legal or contractual exception applies. | `HUMAN_APPROVED_V1_EXECUTION_POLICY`. This implements purpose limitation and storage minimisation. Resend's public Privacy Policy (reviewed 2026-09-05) states retention only as long as necessary for stated purposes and legal/dispute/agreement needs, and acknowledges international transfer; it does not prove the project's provider/account configuration. The specific 30-day boundary remains the existing repository Phase 4A/RFQ decision now accepted by Human. W04 must verify actual configuration and operation. |

No competitor policy was used as an authority for the retention decision. A cross-border B2B site's public policy can illustrate common notice sections but cannot establish this site's legal basis, provider retention, or operating practice.

### Factory and custom route readiness

The Human direction that both pages must be completed changes their intended outcome, not W01's allowed scope. Under the canonical roadmap W01 may make their evidence and content scope ready, but it may not implement routes. Under `PROJECT_SPEC_V1.md` and `PHASE_4A_PUBLICATION_GATE_CHECKLIST.md`, each remains `DEFERRED_LAUNCH_BLOCKER` until a reviewed implementation/evidence decision resolves it; an absent page does not pass the formal publication gate.

The canonical roadmap currently names no separate active route-implementation workstream for these two pages. Therefore no status, owner, order or checkpoint is changed here. After W01 is Human-accepted, the canonical record needs an explicitly reviewed bounded implementation checkpoint before either route can be created; that checkpoint must consume this evidence and keep the existing W02/W11/W05 dependencies and order unless an accepted roadmap decision records a justified change. W01 cannot create that checkpoint unilaterally.

| Route | W01 evidence now usable | Evidence/copy still needed before an implementation checkpoint can produce the page |
| --- | --- | --- |
| `/factory/` | Brand/legal boundary, public address, 19-person total/15-person production subset, 500 m2 factory/80 m2 warehouse distinction, user-confirmed use permission for prior imagery. | A Human production/publication approval that identifies whether `factory-workshop-01` and `factory-workshop-02` depict this factory and may appear publicly; or replacement real factory photos with the same identification. At least one approved photo each for site/entrance, production work, and finishing/QC or packing is needed because the page contract requires process/evidence imagery. Exact optional claims must have their own direct evidence; equipment, OEM/ODM split, capacity, annual output, QC system, certificates, export history, customer recognition and platform metrics remain excluded. |
| `/custom-manufacturing/` | Complete generic capability set and a qualified V1 statement covering style, colour, sizing, logo application, packaging and customer-supplied materials. | A Human-approved plain-language enquiry workflow. It can be minimal: buyer shares product and requirements; factory reviews product/project feasibility; next steps are discussed by enquiry. It must not promise quotation timing, sampling, MOQ, bulk lead time, manufacturing capacity, compliance, acceptance of every supplied material, or an outcome absent a separate fact. A real product-detail or development/process image set is desirable for the page but must have product/listing mapping and production approval. |

### Current production-image boundary

The Human confirmation resolves website-use permission for prior uploads, except the known IP-risk item. It does not itself give the two factory-workshop assets `HUMAN_PRODUCTION_APPROVED`, because the asset pipeline requires a separate, explicit public production-use decision and fact-to-image mapping. The minimum image decision is therefore:

> Confirm whether `assets/factory/original/factory-workshop-01.png` and `assets/factory/original/factory-workshop-02.png` both depict the approved factory and may be used as public production assets for `/factory/`; otherwise provide the replacement photos described above.

No listing or product image gains approval from this confirmation. The independent repository count remains: 40 registry entries, 39 `PENDING_REVIEW`, 1 `QUARANTINED`; 4 approved normalized ProductRecords reference 7 unique source listing IDs; and 9 production asset records have `STORE_LEVEL_PERMISSION_INHERITED` plus `HUMAN_PRODUCTION_APPROVED`. The separate legacy manifest contains 7 visual candidates still requiring its later production/risk disposition, 2 rejected production sets, and 1 research-only set. W02 remains gated and has not started.

### Updated omissions proposed for Human acceptance

The following is the replacement for the earlier omissions matrix. Each item is intentionally absent from V1 public copy until a source, status and appropriate implementation gate exist.

| Proposed omission | Why it remains omitted |
| --- | --- |
| An English registered legal-company name or assertion that `JS Meilai` is a legal entity | Only the Chinese registered name is evidenced; brand and legal entity must remain distinct. |
| Address `52号` and all attachment-8 China phone/mobile/fax values | `52号` is not approved; the numbers are explicitly not approved for website display. |
| Equipment counts, OEM/ODM percentage, annual new-style count, designer/engineer counts, sample turnaround, annual output, platform sales, warehouse stock and platform metrics | They appear only in platform/report UI or are otherwise not confirmed for public use. |
| MOQ, sample availability/fee, sample/bulk lead times, quotation timing, capacity, pricing, material composition, dimensions, colours/sizes by product, testing, certifications, QC-system claims, packaging specifications, export history, named customers and sustainability claims | No claim-specific documentary evidence and/or approved page promise exists. Generic customization does not establish these operational specifics. |
| “SGS certified” or equivalent certification wording | The supplied SGS-branded platform report includes a limitation statement and does not establish an independently verified certification scope. |
| Any claim that a photo proves factory location, capacity, quality, product ownership or a specific product mapping | A photo needs a separate fact/source mapping and production approval; visual appearance alone is insufficient. |
| Third-party visual-material-site assets | No source URL, exact asset page or verified commercial-use, attribution, modification, territorial, model/property or editorial restrictions has been supplied. W11/W05 own later selection/use. |
| Marketplace UI, Chinese promotional posters, watermarked images and known character/IP-risk material | The asset pipeline excludes them from production; use permission does not remove these risks. |

### Minimum remaining Human Review decision

All prior questions in this evidence pack that are answered above are closed. To close W01, the remaining Human decision is limited to:

1. Accept this updated evidence matrix and proposed omissions list, including the bounded route plan: `/factory/` and `/custom-manufacturing/` must be completed through a later explicitly reviewed implementation checkpoint, not by W01 or by changing their blocker status prematurely.
2. Either approve the two named factory-workshop images for public production use and confirm their identity, or provide replacement factory images according to the route-readiness table.
3. Approve the minimal `/custom-manufacturing/` enquiry workflow stated in the route-readiness table, or provide a corrected workflow with no unsupported timing, MOQ, sampling, capacity or outcome promise.

`W01 = NEXT; PREPARED_FOR_HUMAN_REVIEW; CHECKPOINT_STATUS_UNCHANGED`.

W01 remains open only at these Human Review boundaries. No W02 action is started.

## W01 Final Human Review Acceptance (2026-09-05)

Human Review explicitly accepted the updated evidence classification and omissions matrix. The following final decisions close the W01 Evidence Pack Gate:

| Decision | W01 recorded outcome |
| --- | --- |
| Commercial data | MOQ, sample fee, quotation timing, lead time and capacity are intentionally omitted from public V1 copy. They are not page or W01 blockers; buyers may discuss them through enquiry. |
| Factory-photo permission | Every user-provided image explicitly identified as a factory photo is approved for public website use, including `factory-workshop-01.png` and `factory-workshop-02.png`. Their asset-manifest permission status is updated to `HUMAN_PUBLIC_USE_APPROVED`. The known character/IP-risk item remains excluded. |
| Image review boundary | This approval resolves permission only. Watermark, marketplace UI, third-party content, character/IP, privacy, technical quality, provenance and fact-to-image review continue under the asset pipeline and owning implementation checkpoint without another permission request. |
| Custom-page copy boundary | Public copy need only state that customization is supported and that buyers can discuss requirements via RFQ form, email or WhatsApp. It must not present a mandatory factory-evaluation process or promise MOQ, timing, capacity, fixed steps or acceptance of every request. |
| Required routes | `/factory/` and `/custom-manufacturing/` must be completed. W01 does not implement routes or alter roadmap order; their `DEFERRED_LAUNCH_BLOCKER` state remains until an explicitly reviewed later implementation/evidence checkpoint resolves each route. |
| Updated omissions | Human accepts the omission of unconfirmed commercial numbers, certifications and other unsupported claims documented above. |

### Remaining image intake for the required factory route

The two approved workshop images are 1920x1080 and may be used only after the implementation checkpoint applies its technical/privacy/factual review. They do not by themselves cover all planned factory evidence. The next route-owning checkpoint should request only these additional images if it needs fuller source material:

| Needed capture | Page use | Orientation / minimum |
| --- | --- | --- |
| Factory entrance or exterior with the approved `37号` site identifiable, where lawful and safe | `/factory/` identity/context image; do not expose unrelated personal data | Horizontal 3:2, at least 3000 px on long edge |
| Finishing/QC or packing step | `/factory/` process evidence; no quality-system/capacity claim without separate proof | Horizontal 3:2, at least 3000 px on long edge |
| Clean product-detail or customization-development views mapped to a product/listing | `/custom-manufacturing/` supporting media; does not approve the product/listing | Square 1:1 or vertical 4:5, at least 2000 px on shortest edge, raw source and mapping retained |

No new Human decision is required for W01. These are future material requests for the later route implementation/evidence checkpoint, not W01 blockers.

### Closure record

`HUMAN_REVIEW_ACCEPTED; W01_EVIDENCE_PACK_GATE_COMPLETE`.

W01 has met its bounded checkpoint: requested facts have a source/status/owner, unresolved claims are expressly omitted or deferred, and the Human Gate has accepted the pack. This closure changes no runtime, route, product listing, production asset selection, external service or formal-launch state. W02 is the next serial checkpoint in the canonical queue but is not started by this W01 closure.
