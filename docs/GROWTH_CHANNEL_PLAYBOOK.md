# JS Meilai 外部获客与归因执行包

核对日期：2026-09-28（Asia/Shanghai）。

状态：PREPARED_FOR_ACCOUNT_REVIEW；本文件已完成渠道筛选、落地页映射、UTM 规则和首批内容草稿；没有创建第三方账号、发送消息、发布外链、投放广告或购买付费资源。

## 当前判断

现阶段最值得做的是少量高意向渠道和可复用内容。站点已经有稳定的英文产品族、OEM/ODM、工厂、材料指南和 RFQ 页面，但还没有可核验的社交 profile、公开的英文法律身份、确认的 WhatsApp 接收人和目标国家。

因此本轮只准备能回到现有页面、能用 GA4/UTM 验证的渠道，不生成新的薄 SEO 页面，不把第三方目录估算写成已获得流量，也不使用未经批准的商业字段。

## 渠道优先级

| 优先级 | 渠道 | 适配理由 | 当前状态 | 必须由经营者确认 |
| --- | --- | --- | --- | --- |
| P0 | LinkedIn Company Page + 经营者个人 profile | 适合 wholesale/OEM 买家、采购和品牌方；可发布专业采购内容并回到 custom 或 guide 页面 | 研究完成，未创建/未发布 | LinkedIn 账号、英文公司名、logo、管理员、公开联系方式 |
| P0 | Alibaba.com supplier profile | 直接覆盖主动寻找供应商的 B2B 买家；官方卖家流程包含账号、Business Verification 和公司资料 | 研究完成，未注册 | 真实企业资料、验证文件、预算；付费 Gold/Verified 方案必须单独批准 |
| P1 | Made-in-China.com supplier profile | 适合中国制造商目录和询盘；官方注册支持 Supplier 账户和 Join Free | 研究完成，未注册 | 手机验证码、英文公司名、联系人、产品事实 |
| P1 | Global Sources supplier profile | 有供应商注册入口，适合采购和展会型买家；基础注册可免费开始 | 研究完成，未注册 | 业务邮箱、公司名、网站、联系人、是否接受平台条款 |
| P1 | YouTube Brand Account | 工厂、材料和款式演示可以长期复用，并可回到 guide/custom 页面 | 只准备内容结构，未建频道 | Google 账号、频道所有者/管理员、真实视频和素材授权 |
| P1 | Pinterest / Instagram | 视觉发现适合婚礼、礼服和头纱，但直接 B2B 意图弱于 LinkedIn/供应商目录 | 未核验 profile，未发布 | 正式账号、品牌头像、素材许可、回复负责人 |
| P2 | Europages | 适合欧洲目录发现，但公司资料公开且帮助文档要求 VAT 和 profile 审批 | 暂不注册 | 可公开的法律身份、VAT、市场范围 |
| P2 | Kompass | 有企业目录和搜索曝光，但当前官方公司 profile 页面显示为付费方案 | 暂不注册 | 费用批准、法律资料、目标国家 |
| 暂不做 | 泛目录、TradeKey/EC21 类大量提交、购买链接 | 相关性、质量和审核边界不足，容易产生低质量外链或不可验证线索 | 明确排除 | 不需要执行 |

官方入口和事实边界：  
- [LinkedIn Pages](https://www.business.linkedin.com/advertise/linkedin-pages)：Company Page 可免费创建，支持网站、内容、CTA 和受众分析。  
- [Alibaba seller onboarding](https://seller.alibaba.com/how-to-sell?tracelog=pc_registration_success)：需要 seller account 和 Business Verification；官方 onboarding 也说明不同国家可能有不同 membership/package。  
- [Alibaba Verified Supplier](https://seller.alibaba.com/verified-supplier)：第三方验证和工厂资料展示属于额外信任服务，不等于 JS Meilai 已经取得该认证。  
- [Made-in-China Join Free](https://www.madeinchina.com/source/register.html)：支持 Supplier 账户和免费注册起步；注册后的平台审核、手机验证和产品资料仍需实际完成。  
- [Global Sources supplier registration](https://www.globalsources.com/member/register)：注册表要求公司名、网站、联系人和业务邮箱，并包含平台条款与资料分享同意。  
- [Europages company profile](https://help.europages.com/en/supplier/company-profile-basic-information)：公开资料需要审批和激活，帮助文档列出 VAT 等必填资料。  
- [Kompass company profile](https://us.kompass.com/register/company/)：当前页面显示 12 个月 USD 40 起的方案，不能在未批准费用前创建。  
- [YouTube business channel](https://support.google.com/youtube/answer/1646861?hl=en)：可使用 Brand Account，并增加多个所有者或管理员。

## 第一批落地页

只使用现有生产页面：

1. OEM/ODM 采购：/custom-manufacturing/
2. 产品发现：/products/
3. 婚礼/头纱视觉内容：/wedding-veils/ 或 /bridal-gloves/
4. 材料和采购教育：/guides/materials/
5. 工厂信任：/factory/
6. 直接询盘：/contact/

生产检查（本次实查）：这些页面带 UTM 访问时均返回 200，canonical 不包含 UTM，SSR 有正文和 RFQ 路径。

## UTM 规则

固定 campaign 使用 buyer-intro-2026q4；不要把每个帖子随意改成新的 campaign。

| 使用场景 | utm_source | utm_medium | utm_campaign | utm_content 示例 |
| --- | --- | --- | --- | --- |
| LinkedIn 公司/个人自然内容 | linkedin | organic_social | buyer-intro-2026q4 | custom-manufacturing |
| Instagram/Pinterest 视觉内容 | instagram 或 pinterest | organic_social | buyer-intro-2026q4 | bridal-visual-01 |
| YouTube 视频描述 | youtube | organic_video | buyer-intro-2026q4 | materials-explainer-01 |
| Alibaba/Made-in-China/Global Sources 公司页 | 平台名 | directory | directory-profile-2026q4 | company-profile |
| 目录内的采购指南链接 | 平台名 | referral | buyer-guide-2026q4 | materials-guide |
| 获批准的合作媒体 | 域名短名 | referral | buyer-guide-2026q4 | editorial-reference |

示例：

- https://www.jsmeilai.com/custom-manufacturing/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=buyer-intro-2026q4&utm_content=custom-manufacturing
- https://www.jsmeilai.com/guides/materials/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=buyer-intro-2026q4&utm_content=materials-guide
- https://www.jsmeilai.com/products/?utm_source=made-in-china&utm_medium=directory&utm_campaign=directory-profile-2026q4&utm_content=company-profile

UTM 只描述来源和内容，不在 URL 中放姓名、邮箱、电话、RFQ 文本或其他个人信息。

## 首批英文内容草稿

这些内容是发布草稿，不能在没有账号、公司身份和发布授权时自动发送。

### LinkedIn buyer-intro post

A useful first conversation about occasion gloves starts with the brief: silhouette, colour direction, fit, finishing and the market you are buying for.

JS Meilai’s materials guide collects the questions buyers can prepare before discussing a bridal, formal or veil range.

Read the guide: https://www.jsmeilai.com/guides/materials/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=buyer-intro-2026q4&utm_content=materials-guide

For a custom direction, start here: https://www.jsmeilai.com/custom-manufacturing/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=buyer-intro-2026q4&utm_content=custom-manufacturing

#wholesale #sourcing #bridalaccessories #occasionwear

事实边界：不声称 MOQ、价格、交期、认证、出口国家、客户案例或工厂产能。

### Supplier-directory profile draft

JS Meilai presents an English B2B catalogue for bridal and wedding gloves, formal and opera gloves, costume and stage gloves, kids dress gloves, wedding veils and arm sleeves. Buyers can review product directions, prepare material and sizing questions, and send an enquiry for a wholesale or custom discussion. Product specifications and commercial terms are confirmed for each project.

目标页：/products/  
建议 UTM：utm_source=平台名，utm_medium=directory，utm_campaign=directory-profile-2026q4，utm_content=company-profile

### Pinterest / Instagram caption draft

A clear sourcing brief helps a buyer compare occasion-glove directions.

Start with the silhouette, colour direction and fit questions, then bring the details to a custom discussion.

Materials guide: https://www.jsmeilai.com/guides/materials/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=buyer-intro-2026q4&utm_content=materials-guide

### YouTube outline

Title: Questions to prepare before sourcing bridal and formal gloves

1. Show the silhouette or reference image.
2. Note the intended occasion and buyer market.
3. Prepare colour, sizing and finishing questions.
4. Separate confirmed requirements from items that need a sample discussion.
5. Direct viewers to the materials guide and RFQ page.

没有真实工厂视频、流程照片或人员授权前，不制作“工厂 tour”、产能、认证或客户案例视频。

## 发布前检查

每个渠道发布前逐项完成：

1. 账号、管理员和公开公司身份由经营者确认。
2. 目标市场、语言和回复负责人已确认。
3. 头像、封面、产品图片和视频有可公开使用依据。
4. 目标页、UTM、canonical 和 RFQ CTA 已检查。
5. 文案不包含未确认的价格、MOQ、库存、交期、认证、客户、产能或支付承诺。
6. 发布后记录 URL、发布时间、渠道、UTM、link type、负责人和首次 GA4 访问/询盘证据。
7. 目录或媒体要求 nofollow、sponsored、披露或删除时，按对方规则执行。

## 当前唯一外部动作

优先由经营者选择并登录一个渠道，建议顺序是：

1. LinkedIn Company Page；
2. Alibaba.com 或 Made-in-China.com 其中一个；
3. Global Sources；
4. YouTube/Pinterest 作为有真实素材后的补充。

未完成账号登录、验证码、法律身份、WhatsApp 接收人和市场选择前，本文件保持准备状态，不把任何渠道写成已发布。
