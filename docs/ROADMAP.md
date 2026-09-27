# JS Meilai 路线图

核对日期：2026-09-28。只保留当前仍有价值的里程碑；历史已完成事项见 [RELEASE_HISTORY](RELEASE_HISTORY.md)。

## 当前阶段：2.4.0 运行观察与产品/获客 readiness gate

**目标**：让代码、生产、版本和运营事实保持一致，补齐买家资料与询盘运营的最小闭环，再用 GA4/Bing/Google 的真实数据判断是否值得扩大获客。当前最重要的产品问题是采购信号与跟进责任仍不完整，不是缺少更多薄页面。

**DoD**：2.4.0 的 package/Git/Vercel/production 证据一致；28/15/21 页面边界不变；RFQ、consent、UTM attribution 和独立 GA4 不回归；完成一次受控 admin/RFQ 验收准备；没有重复搜索提交或未确认商业事实。完整条件见 [产品与获客 readiness gate](PRODUCT_READINESS_GATE.md)。

## 候选 2.5.0：一个目标市场的 SSR 多语言内容切片（尚未启动）

**进入条件**：先通过产品资料、询盘运营和目标市场三项 readiness gate；确认目标国家/语言、翻译和法律负责人、产品事实及 URL/metadata 方案。没有这些事实时不生成语言薄页。

**范围**：选择一个市场实现服务端 locale URL、翻译后的核心内容/PDP 数据、localized canonical、双向 hreflang、x-default、语言 sitemap、语言感知 RFQ 文案与验收；不一次生成五套薄页。

**完成条件**：SSR/metadata/canonical/hreflang/sitemap、产品资料和 RFQ 路径通过生产验证，且现有英文 URL/28 URL 边界无回归。

## 候选 2.6.0：买家运营与支付（条件式）

仅在真实支付商户资料、KYC/收单/结算政策、退款/运输事实和受控验收条件齐备后，重新评估 payment、客户地址、报价转订单和履约能力。没有这些资料时保持 fail-closed，不为版本制造支付工作。

## 渠道执行门槛

LinkedIn、Alibaba、Made-in-China、Global Sources、YouTube、Pinterest/Instagram、Europages、Kompass 的研究、UTM registry 和草稿保留，但当前是**准备态**。通过 readiness gate 后可选择一个渠道做小范围事实审核发布，并在 GA4 中观察首触/末触与 RFQ；不购买付费资源、不群发、不发布未经确认的 profile 或商业字段。

## 明确不做

- 不批量解锁 21 个 gated PDP，不用模板制造产品/指南/语言薄页。
- 不重复提交未变化 Google URL，不使用 Google Indexing API 处理普通网页。
- 不伪造价格、库存、MOQ、交期、认证、客户案例、社交账号或支付能力。
- 不因正常数据延迟重新推翻 2.3/2.4 的技术 SEO 修复。
