# JS Meilai 2.2 外链与推广草稿包

状态：`CANDIDATE_LEDGER_READY; NO_EXTERNAL_SEND`

本文件把 2.2 的可发布内容和联系模板准备好，但不虚构收件人、合作关系、客户案例、认证或已上线反链。只有补充真实域名、联系人、允许公开的事实并完成人工批准后，草稿才能发送。

## 可发布内容

| 内容 | 目标 URL | 可引用事实边界 | CTA |
| --- | --- | --- | --- |
| Materials guide | `/guides/materials/` | 页面中的材质比较、采购检查项和询盘路径 | Read the materials guide |
| Size guide | `/guides/size-guide/` | 页面中的测量步骤、尺寸准备和询盘路径 | Prepare measurements |
| Wedding veil collection | `/wedding-veils/` | 当前公开目录中的婚礼头纱集合和产品导航 | Explore wedding veils |
| Opera gloves collection | `/opera-gloves/` | 当前公开目录中的舞台/正式手套集合和产品导航 | Explore opera gloves |
| Catalogue hub | `/products/` | 当前公开目录的系列导航和询盘入口 | Browse the catalogue |

## 个性化联系草稿

发送前必须替换方括号字段，并由人工核对目标站点的相关性、编辑政策、nofollow/sponsored 要求和链接落地页。模板不包含未经核验的工厂规模、MOQ、交期、认证、客户名称或合作背书。

### P-001 — bridal trade publication

**Subject:** A practical materials guide for wedding glove and veil buyers

**Body:**

> Hi [EDITOR_NAME],
>
> I read [ARTICLE_OR_SECTION] and noticed your readers compare wedding accessories by material, finish and fit. We prepared a concise materials guide for buyers evaluating wedding gloves and veils: [https://www.jsmeilai.com/guides/materials/].
>
> It explains the comparison points and measurement questions without requiring a particular supplier. If it fits your editorial standards, you may reference it as a buyer resource. Please use any attribution and link format your policy requires.
>
> Best,
> [SENDER_NAME]

### P-002 — occasionwear trade publication

**Subject:** Buyer resource for formal and opera glove material decisions

**Body:**

> Hi [EDITOR_NAME],
>
> Your [ARTICLE_OR_SECTION] covers formalwear sourcing. Our public opera-glove collection and materials guide may be useful as a neutral reference when readers compare fabric, silhouette and measurement requirements: [https://www.jsmeilai.com/opera-gloves/] and [https://www.jsmeilai.com/guides/materials/].
>
> Please review the pages first and only reference them if they meet your audience and disclosure rules.
>
> Best,
> [SENDER_NAME]

### P-003 — manufacturer or sourcing directory

**Subject:** Request to review a public occasion-glove catalogue listing

**Body:**

> Hello [DIRECTORY_EDITOR],
>
> We are reviewing relevant sourcing directories for a public occasion-glove catalogue. Could you confirm whether [DIRECTORY_NAME] accepts verified company profiles, the evidence required, and whether links must be nofollow or sponsored? The review destination is [https://www.jsmeilai.com/products/].
>
> We will provide only facts that can be documented and will follow your submission and disclosure policy.
>
> Regards,
> [SENDER_NAME]

### P-004 — industry association

**Subject:** Evidence requirements for an accessory-manufacturing member profile

**Body:**

> Hello [ASSOCIATION_CONTACT],
>
> Could you share the eligibility and evidence requirements for a relevant member or resource listing? We are considering a factual profile that points buyers to [https://www.jsmeilai.com/products/] and does not make unverified capacity, certification or customer claims.
>
> We will submit only after confirming membership, approval and the association’s link policy.
>
> Regards,
> [SENDER_NAME]

### P-005 — retailer or buying partner

**Subject:** Permission request for a co-created bridal buyer resource

**Body:**

> Hi [PARTNER_NAME],
>
> Would you be open to reviewing a short buyer guide about bridal glove materials and measurements? Any mention of your business, collaboration or product use would require your written approval first. The proposed public reference page is [https://www.jsmeilai.com/bridal-gloves/].
>
> We will not publish your name, logo, quote or link until you approve the exact wording and destination.

### P-006 — creator or stylist

**Subject:** Useful materials reference for bridal and formal styling content

**Body:**

> Hi [CREATOR_NAME],
>
> Your [POST_OR_SERIES] helps readers choose formal accessories. If useful, you can review our materials guide at [https://www.jsmeilai.com/guides/materials/] as a reference for comparing options. Any referral, sponsorship or affiliate relationship would be disclosed and agreed before publication.
>
> Please let us know your editorial and link requirements.

## 链接与发布记录

每个被批准的合作链接使用独立的 `utm_source`、`utm_medium=referral` 和 `utm_campaign=seo_2_2`。上线后记录：

`prospect_id, partner_domain, target_url, anchor_text, link_type, rel_attributes, published_url, first_seen_at, last_checked_at, status, evidence, referral_sessions, qualified_enquiries`

允许的状态：`DRAFT_REQUIRED` → `HUMAN_APPROVAL_REQUIRED` → `SENT` → `LIVE_HUMAN_CONFIRMED`。第三方工具发现但未人工打开核验的链接只能记为 `THIRD_PARTY_ESTIMATE`；当前没有任何链接可标为 `LIVE_HUMAN_CONFIRMED`。
