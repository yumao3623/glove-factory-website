# 近期 Roadmap

更新：2026-09-28。2.3.0 已完成并进入持续运营；以下只保留有业务价值、具备启动条件的工作。Google 抓取延迟本身不创建版本，也不暂停站内完善或外部获客。

## 当前运营阶段：2.3 之后的持续获客与证据运营

当前并行线：

- 维护 28 个正式 indexable URL、15 个 curated PDP 和 21 个 gated catalogue preview；只有新的批准事实、真实搜索/询盘信号或技术异常才改代码。
- Bing Webmaster property/sitemap、专用 GA4 Property、默认拒绝 consent、UTM attribution 与核心事件已完成；下一步是核验 WhatsApp 接收人/响应负责人和真实社交 profile 后，使用 `/custom-manufacturing/`、产品族、指南和 `/contact/` 做有 UTM 约定的合规推广。
- 从 GSC、Vercel 短留存日志和真实 RFQ 记录收集：Technical indexing health、Googlebot crawl evidence、indexed URLs、impressions、clicks、leads/RFQs。live test 和 IndexNow 202 都不等于 indexed。
- 继续维护产品事实确认表；下架/改 slug 时必须同步 `data/seo-index.ts`、Supabase active row、sitemap 和生产部署。

**不做：** 每日重复 URL Inspection/Request Indexing、普通页面 Indexing API、批量薄 PDP、未经审核机器翻译、垃圾外链、伪造商业字段、为了活跃而重构。

## 候选 2.4.0：有目标市场的完整多语言 SEO

**目标：** 在英文采购内容和 RFQ 已有真实信号后，把一个有明确商业需求的语言市场扩展成可抓取、可维护的独立 URL。

**启动条件：** 至少一个语言由询盘、市场策略或搜索数据证明值得投入；有翻译、事实、法律审核负责人和预算；英文核心页面稳定。

**范围 / DoD：** server-rendered locale URL；每页 localized title/description/self canonical；双向 hreflang、`x-default`、语言 sitemap；未翻译页面不进入索引；人工审核商业事实、schema、移动体验和 RFQ；发布后抽样抓取和 GSC 验证。当前客户端语言切换不计入完成。

**不做：** 只翻 metadata、把机器译文批量入索引、所有语言一次性上线、把英文 canonical 复制给其他语言。

## 候选 2.5.0：可核验的外部获客与转化归因

**目标：** 让 LinkedIn、行业目录、社交内容和合作推广能回到稳定 landing page，并在获同意后量化 RFQ、email、WhatsApp 和产品族行为。

**启动条件：** 专用 GA4 measurement ID、consent 决策和 UTM 保存已完成；核验社交账号与 WhatsApp；选出真实目录/媒体目标并批准逐站发送；明确 UTM 保存和隐私边界。

**范围 / DoD：** 允许列表 UTM 读取与合规持久化；事件去重；RFQ 结果区分 received/duplicate/pending/error；落地页、OG、文案和联系人一致；完成一次受控测试并保留数据证据；不发送未经授权的第三方消息。

## 候选后续 MINOR：确认报价后的 Payment

**目标：** 仅在真实买家需要和经营者拿到完整商户资料后，减少已批准报价的付款摩擦。

**启动条件：** 企业账户/KYC/收单/结算完成，真实支付场景明确，运费/税/退款/交期条款可确认；经营者提供生产凭据并参与受控验收。

**范围 / DoD：** 复用现有 adapter；sandbox 与生产 create→approve→capture、webhook 验签、金额/币种、幂等、取消/退款、邮件/后台状态和回滚开关均有证据。仅把开关改为 true 不算完成。

## 版本判断

历史 `1.x → 2.0 → 2.1 → 2.1.5 → 2.2` 保留；当前 `2.3.0` 已完成索引、内容、转化和可观察性升级。没有真实新能力前，GSC 观察、Bing 提交、外链草稿和资料补充属于运营，不自动生成 2.3.1。支付或完整多语言达到上面 DoD 时再分配新的 MINOR 版本。
