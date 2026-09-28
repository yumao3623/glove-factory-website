# JS Meilai 路线图

核对日期：2026-09-28。只保留当前仍有价值的里程碑；历史已完成事项见 [RELEASE_HISTORY](RELEASE_HISTORY.md)。

## 当前阶段：2.4.0 readiness 已关闭，进入范围输入与运营观察

**目标**：确认 2.4.0 已满足 B2B manufacturer / supplier / RFQ 模式的技术和公开运营最低条件；之后按域名、市场、邮箱、WhatsApp 和产品资料的实际依赖安排正式 minor，不把 To C 库存或完整商业字段倒灌到当前网站。

**DoD**：2.4.0 的 package/Git/Vercel/production 证据一致；28/15/21 页面边界明确；RFQ、consent、UTM attribution、admin 边界、RLS 和受控状态夹具已验证；B2B 产品身份/媒体/来源/询价路径可运营；逐 SKU stock、MOQ、lead time、企业邮箱、WhatsApp、locale 和 Payment 不属于本版本统一 gate。2.4.0 readiness 已关闭。

## 候选 2.5.0：B2B 品牌基础与买家体验优化（尚未启动）

**进入条件**：确认长期品牌域名 ownership/DNS，明确一个优先买家市场或证明当前英文 B2B 路径已足够，具备企业邮箱/WhatsApp 运营决策；不要求全量产品一次补齐零售字段。

**范围**：在确认域名后完成一次性品牌/canonical/redirect/GA4-UTM/账号基础设施规划，并结合 B2B 信息架构、产品发现、PDP/RFQ 转化和 SEO 内容结构做一轮可验收优化；若目标市场已确定，再纳入一个 SSR locale slice、localized metadata、hreflang 和语言 sitemap。

**完成条件**：品牌域名和账号迁移无 attribution/SEO 回归；B2B buyer journey、PDP/RFQ、UTM/GA4 和英文 28 URL 边界通过生产验收；若包含 locale，再额外验收 SSR/metadata/canonical/hreflang/sitemap。

## 候选 2.6.0：买家运营与支付（条件式）

仅在真实支付商户资料、KYC/收单/结算政策、退款/运输事实和受控验收条件齐备后，重新评估 payment、客户地址、报价转订单和履约能力。没有这些资料时保持 fail-closed，不为版本制造支付工作。

## 渠道执行门槛

LinkedIn、Alibaba、Made-in-China、Global Sources、YouTube、Pinterest/Instagram、Europages、Kompass 的研究、UTM registry 和草稿可继续保留。小范围实验只需要事实审核、账号负责人、公开身份和可接收的 RFQ 跟进；大规模投入应等长期域名/邮箱/WhatsApp 基础设施稳定。

## 后续阶段依赖顺序

- B2B 站点和 RFQ 先按当前英文能力运行；产品事实、询盘跟进责任和目标市场负责人按需要补齐，不再作为 2.4.0 总 gate。
- `meilaigloves.com` 只有在购买并取得 DNS 控制权后才进入迁移；迁移应早于大量获客、企业邮箱、正式社交/B2B 账号和最终 UI/SEO 定稿。
- 企业邮箱和正式 WhatsApp 在域名/公开身份确定后、渠道账号和扩大获客前接入；当前 CTA 和旧域名继续可用。
- Cornelia James 与 `ai-website-cloner-template` 先作为研究参考；正式视觉/SEO 实现放到品牌基础设施稳定后的 2.5.0，不复制代码、文案、图片或商标。
- 多语言不预设为下一 minor；它只有在目标市场和责任人确定后才进入 2.5.0 的可选 slice。

## 明确不做

- 不批量解锁 21 个 gated PDP；按独立 SEO 文案、内部链接和搜索价值逐项审核。
- 不重复提交未变化 Google URL，不使用 Google Indexing API 处理普通网页。
- 不伪造价格、库存、MOQ、交期、认证、客户案例、社交账号或支付能力；B2B 缺失字段保持 unknown/on request。
- 不因正常数据延迟重新推翻 2.3/2.4 的技术 SEO 修复。
