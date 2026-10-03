# Changelog

本文件只记录已经完成并可追溯的项目里程碑、发布和治理变更；任务流水账保留在 Git 与专题验收文档中。

## Unreleased

- 2026-09-28：根据当前 B2B manufacturer / supplier / RFQ 模式关闭 2.4.0 readiness gate。确认逐 SKU 实时库存、完整 MOQ/交期/材质、企业邮箱、WhatsApp、域名、locale 和 Payment 分别属于可选补充或后续功能范围，不再作为整个英文 RFQ 网站的统一 blocker；21 个 gated PDP 的原因收敛为逐页 SEO 文案和索引优先级审核。
- 2026-09-28：在显式 opt-in 且确认夹具隔离/清理安全后，完成 Supabase commerce live fixture 11/11 以及 RFQ/报价状态夹具 3/3；所有测试记录已清理，不发送真实邮件、不创建真实报价或业务记录。readiness gate 的技术子门槛已通过，业务资料、运营责任、目标市场和真实通知投递仍待确认。
- 2026-09-28：完成隔离 RFQ readiness smoke（成功保存、通知待处理、非法来源拒绝和状态标记），并修复前台在 `STORED_EMAIL_PENDING` 时的提示，明确告知询价已保存但通知尚待处理；未执行真实询盘、邮件或管理员写入。
- 2026-09-28：根据当前生产探针、代码检查和 2.4.0 状态，明确下一阶段先通过产品与询盘运营 readiness gate；补充正式版本完成后新建对话、同阶段继续当前对话的长期规则。修正 `typecheck` 在未生成 Next.js 路由类型时的可复现失败；不改变生产运行时或公开 URL 边界。
- 2026-09-28：完成外部获客执行包：筛选 LinkedIn、Alibaba.com、Made-in-China.com、Global Sources、YouTube、Pinterest/Instagram、Europages 和 Kompass 的优先级与账户门槛，建立 UTM registry、落地页映射和首批英文内容草稿；本轮没有创建账号、发送消息、发布外链或购买付费资源。Bing sitemap 本次实查成功发现 28 个 URL；GA4 实时快照记录 1 个活跃用户。
- 2026-09-28：使用已授权的 `yumao3623@gmail.com` 重新观察 GSC：0 indexed、11 not indexed、0 clicks/0 impressions；索引报告和 sitemap 仍是旧数据（sitemap 仅发现 9 个 URL），没有新的确认抓取、索引或曝光证据，未重复提交未变化 URL。
- 2026-09-24：将长期项目管理规则正式写入仓库根目录 `AGENTS.md`，明确启动读取顺序、事实来源、版本规则、状态维护、固定结束报告、对话续接判断和下一条可复制指令。
- 2026-09-24：确认并保留 `docs/PROJECT_STATUS.md`、`docs/ROADMAP.md`、`docs/HANDOFF.md`、`docs/PROJECT_WORKFLOW.md`、`docs/RELEASE_HISTORY.md` 作为持续交接体系；补充本变更记录文件。

## 2.6.1

- 2026-10-02：完成截图驱动的定向维护。删除首页及同类页面重复、装饰性 overline 小字；将蓝色 announcement bar 恢复为仅首页显示的多语言无缝 marquee；把 `Analytics settings` 从固定左下角移到 footer，保留首次 consent、重开、GA4 consent update、UTM attribution 和事件门控。提交 `050a317`，Vercel deployment `8PN9yjfY6pFJyPdLFCfPrHuZcnxN` success；桌面/移动正式站复验通过。

## 2.6.0

- 2026-10-01：发布全站买家体验整改。统一首页、产品 hub、六大分类、PDP、联系、账户和移动导航的 B2B 询盘路径；补齐真实搜索/无结果恢复、筛选/排序、收藏找回、询盘清单编辑、账户别名注册验证登录与资料保存、中文管理员后台读路径，并保持在线支付关闭。功能代码最后变更为 `05a459d`（前一功能基线 `0603163`），发布文档基线 `dce0e8b`，后续发布证据同步为 `863e0b7`/`3e67d2a`/`a571feb`/`9f6794f`，均已推送到 `origin/main`，Vercel Git 集成成功，正式站桌面/移动浏览器复验通过，移动端搜索弹层已在最终部署再次验证。授权 RFQ 投递沿用已收到的收件箱证据，没有重复发送或创建真实业务记录。

## 2.5.0

- 2026-09-29：发布 B2B buyer-experience slice：修正首页桌面首屏标题/CTA，新增三步采购路径并补齐五语言 UI 文案；产品 hub 为正式索引边界生成 `ItemList` 结构化数据。提交 `1e4215f`，Vercel 部署 `14cyyy1f1t9KoEj7V5rSHJeKS5dx`；本地浏览器回归、SEO preview audit、lint、typecheck、69/69 tests、production build 和生产 SEO audit 28/28 均通过。
- 2026-09-29：根据预算决定，继续使用 `jsmeilai.com` 开展 UI、SEO、内容和获客；`meilaigloves.com` 暂不购买，仅保留为未来候选。已修正当前路线图、状态、交接和 readiness 文档，不改变 canonical、跳转、公开邮箱或生产账号。

## 2.4.0

- 2026-09-28：将 2.3 之后已完成并在生产验收的 consented GA4、UTM 首触/末触 attribution、配置缺失时 fail-closed 和 GA4-ready 事件门控正式归档为 2.4.0；独立 Property/Stream 使用 `G-PP1JPPV9FD`，不复用属于 `majuscape.fun` 的旧 ID。
- 2026-09-28：完成版本/状态审计，修正 package、治理入口、路线图、交接、release history、analytics 注释与历史规格的当前状态；28/15/21 页面边界、RFQ 和支付边界未改变。

## 2.3.0

- 2026-09-27：完成并部署 B2B indexable surface：28 URL sitemap、13 个核心/指南页面、15 个首批高质量 PDP、factory/custom/contact/costume 正式索引边界、canonical/robots/OG/Twitter、Organization/Breadcrumb/Product schema、SSR/内链/移动语义检查；Product schema 不伪造 Offer、价格、库存、评价或评分。
- 2026-09-27：修复旧 `/api/` robots 规则对 `/api/media/` 的覆盖，加入隐私安全的 claimed-crawler 观察标记、IndexNow key 和一次 28 URL HTTP 202 提交；新增 RFQ/contact/WhatsApp/product-family 事件骨架但保持 GA4/consent 未启用。
- 2026-09-27：依据生产 Supabase 事实撤掉 PDP editorial copy 中未确认的长度断言，改善目录收藏按钮语义并明确生成视觉为 editorial；`a6290e5` 推送到 `origin/main`，随后以 `349201d` 修复首页 CTA 的嵌套交互语义，以 `ac404cf`/`6a08d52` 移除未确认的产品名尺寸词，并以 `b43ce31` 校正最终 sitemap `lastmod`。Vercel success，线上 28/28 probe 通过，测试 67/67。Google live test/Request Indexing 结果与历史 0 indexed 状态见状态文档；不把请求当成已收录。

## 2.2.0

- 2026-09-27：只读 SEO observation 记录 sitemap 成功并发现 9 个 URL，0 已索引、3 个 noindex 排除、8 个已发现未索引，3 个月搜索点击与曝光均为 0；随后该旧观察边界被 2.3.0 实施取代。
- 2026-09-18：技术 SEO、正式 sitemap、canonical/robots 边界、GSC 验证与首页收录请求完成并部署。Google 后续收录属于运营观察，不是发布完成条件。

## 2.1.5

- 2026-09-18：English、简体中文、Deutsch、Français、Italiano 的 UI 多语言基础上线。完整多语言 URL、hreflang、localized metadata、canonical 和 sitemap 未包含在此版本。

## 2.1

- 2026-09-18：账号、后台 CRUD、产品目录、RFQ、报价、邮件和生产部署能力完成验收；PayPal 保持关闭。

## 2.0

- 2026-09-17：完成目录、搜索/筛选、六类产品结构、PDP、定制能力、后台与媒体边界、视觉体系及支付方案决策。

## 1.x

- 早期研究、架构、产品/素材证据、预览和仓库整理阶段统一保留为 1.x 历史。详细来源见 `docs/RELEASE_HISTORY.md`。
