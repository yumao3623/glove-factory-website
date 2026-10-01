# JS Meilai 路线图

核对日期：2026-10-01。只保留当前仍有价值的里程碑；历史已完成事项见 [RELEASE_HISTORY](RELEASE_HISTORY.md)。

## 当前阶段：2.5.0 生产稳定；2.6.0 全站体验整改收尾

**目标**：在 `jsmeilai.com` 上持续改善 B2B manufacturer / supplier / RFQ 的买家路径和可发现性；按域名、市场、邮箱、WhatsApp 和产品资料的实际依赖安排后续范围，不把 To C 库存或完整商业字段倒灌到当前网站。

**DoD**：2.4.0 的 package/Git/Vercel/production 证据一致；28/15/21 页面边界明确；RFQ、consent、UTM attribution、admin 边界、RLS 和受控状态夹具已验证；B2B 产品身份/媒体/来源/询价路径可运营；逐 SKU stock、MOQ、lead time、企业邮箱、WhatsApp、locale 和 Payment 不属于统一 gate。2.4.0 readiness 已关闭。2.6.0 的实现、六分类视觉、桌面/移动关键路径、搜索/筛选/收藏/询盘编辑、账户别名、中文管理员读路径和支付边界已有最终本地证据；本轮未部署，Production 仍为 2.5.0。

## 2.6.0：全站买家体验整改（用户验收未通过，继续实施）

**范围**：根据 2026-09-29 的真实使用截图，统一全站搜索、导航、目录筛选、六大分类页、产品详情页、联系入口、账户资料和管理员中文操作；修复标题比例、按钮触达、无结果反馈、移动端菜单与真实联系方式优先级；补齐收藏找回、询盘选项编辑/删除和公司字段可选。支付保持关闭，未知商业事实继续按询价确认。

**验证**：`npm test` 69/69、`npm run typecheck`、lint（0 warning）、production build 均通过；本地浏览器覆盖桌面/移动端、搜索提交、无结果且无 hydration/runtime 错误、筛选/排序/收藏、六大分类逐页、PDP、联系、账户别名、询盘选项编辑、支付关闭反馈和管理员未登录/已登录读路径；授权邮箱已确认真实 RFQ 通知送达，测试行已清理。证据见 [2.6.0 UX final](evidence/2026-10-01-2.6-ux-final.json)。

## 2.5.0：B2B 买家体验与搜索结构（已发布初始 slice）

**进入条件**：当前无需购买新域名即可启动。先明确一个优先买家市场或证明当前英文 B2B 路径已足够；企业邮箱和 WhatsApp 运营决策按实际接入范围确认，不作为 UI/SEO、产品发现或内容工作的总前置条件。不要求全量产品一次补齐零售字段。

**范围**：本轮先在 `https://www.jsmeilai.com/` 上交付首屏采购入口、三步 sourcing path、产品发现和产品 hub `ItemList` 搜索结构；继续按页审核 21 个 gated PDP 是否具备独立搜索价值；若目标市场已确定，再纳入一个 SSR locale slice、localized metadata、hreflang 和语言 sitemap。未来若购买 `meilaigloves.com`，再单独规划一次性品牌/canonical/redirect/GA4-UTM/账号迁移，不提前为它设计或改动现站。

**完成条件**：首屏 CTA 在桌面/移动可见且可达 RFQ；采购路径、六系列发现、PDP/RFQ 内链与 `ItemList` 结构化数据通过本地和生产验证；UTM/GA4 与英文 28 URL 边界不回归；可独立交付的 UI/SEO 内容改进不等待未来域名、邮箱、WhatsApp 或支付。本轮初始 slice 已满足并发布。若包含 locale，再额外验收 SSR/metadata/canonical/hreflang/sitemap。未来域名迁移另设范围，不与本轮网站建设混合。

## 后续候选：买家运营与支付（条件式，不预设版本）

仅在真实支付商户资料、KYC/收单/结算政策、退款/运输事实和受控验收条件齐备后，重新评估 payment、客户地址、报价转订单和履约能力。没有这些资料时保持 fail-closed，不为版本制造支付工作。

## 渠道执行门槛

LinkedIn、Alibaba、Made-in-China、Global Sources、YouTube、Pinterest/Instagram、Europages、Kompass 的研究、UTM registry 和草稿可继续保留。小范围实验只需要事实审核、账号负责人、公开身份和可接收的 RFQ 跟进；大规模投入应等长期域名/邮箱/WhatsApp 基础设施稳定。

## 后续阶段依赖顺序

- B2B 站点和 RFQ 先按当前英文能力运行；产品事实、询盘跟进责任和目标市场负责人按需要补齐，不再作为 2.4.0 总 gate。
- `meilaigloves.com` 只保留为未来候选；只有购买并取得 DNS 控制权后才进入独立迁移评估。当前不购买、不迁移、不改 canonical、不配置跳转，也不把未来域名邮箱写进公开页面。
- 企业邮箱在需要真实发件身份、正式 B2B/社交账号或扩大获客前接入；WhatsApp 在公开渠道实验前确认号码、接收人和 SLA。二者按功能范围接入，不能阻塞当前 UI/SEO、产品资料或英文 RFQ 站。
- Cornelia James 与 `ai-website-cloner-template` 继续作为研究参考；正式视觉/SEO 实现可在现有 `jsmeilai.com` 上按小范围交付，不复制代码、文案、图片或商标。
- 多语言不预设为下一 minor；它只有在目标市场和责任人确定后才进入 2.5.0 的可选 slice。

## 明确不做

- 不批量解锁 21 个 gated PDP；按独立 SEO 文案、内部链接和搜索价值逐项审核。
- 不重复提交未变化 Google URL，不使用 Google Indexing API 处理普通网页。
- 不伪造价格、库存、MOQ、交期、认证、客户案例、社交账号或支付能力；B2B 缺失字段保持 unknown/on request。
- 不因正常数据延迟重新推翻 2.3/2.4 的技术 SEO 修复。
