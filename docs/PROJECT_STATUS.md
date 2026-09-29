# JS Meilai 当前项目状态

核对日期：2026-09-28（Asia/Shanghai）。本页是当前状态唯一入口，优先级高于旧阶段文档、聊天记录和未更新的运营计划。当前判断同时基于仓库代码/Git、生产 HTTP、Vercel 环境与部署、Supabase 匿名可见数据及已记录的第三方现场证据；无法用当前权限复核的事项明确标为历史或未验证。

## 版本与阶段

- **Production：2.5.0（本轮已发布）**。2.3.0 的 indexable B2B surface 与 2.4.0 的 consented GA4/UTM attribution 继续保留；本轮新增首页采购入口/三步 sourcing path 与产品 hub `ItemList` 搜索结构，已通过生产探针与 SEO audit。
- **Development：无正在开发的新正式版本**。2.5.0 初始 buyer-experience slice 已发布；后续 2.5 扩展按真实搜索/询盘反馈和业务输入触发，不把域名、邮箱、WhatsApp 或 Payment 设为统一 gate。
- **Current work：2.5.0 发布后的英文 B2B 运营观察与范围输入整理**。当前定位是 B2B manufacturer / supplier / RFQ；产品资料、WhatsApp、域名、邮箱和渠道账号按功能范围推进，不再把它们合并成一个无限期 gate。
- `package.json` 与 lock 根包版本应为 `2.4.0`。包版本、Git 推送、Vercel Ready 和生产验收分别记录，不能互相替代。
- **Payment：`BLOCKED / awaiting real payment information`**，只阻塞未来 To C/在线收款，不阻塞 B2B RFQ 网站。

## 代码、部署与数据基线

- Git 主线为 `main`；2.3 之后的 GA4/UTM 提交链为 `d7f8126`、`7bb286b`、`3c0fce4`、`b07227b`，2.4.0 发布为 `9377f2a`，本轮 2.5.0 为 `1e4215f`。没有伪造历史 release tag。
- 当前生产域名为 `https://www.jsmeilai.com/`。2.5.0 已由提交 `1e4215f` 推送并通过 Vercel 部署（部署记录：[14cyyy1f1t9KoEj7V5rSHJeKS5dx](https://vercel.com/mao-yu/glove-factory-website/14cyyy1f1t9KoEj7V5rSHJeKS5dx)）；生产 smoke 与本轮 SEO audit 均通过：28/28 URL、首页/产品 hub/15 个 PDP、sitemap/robots 200，未授权 admin API 仍为 401。
- Vercel Production 已有独立 GA4 Measurement ID `G-PP1JPPV9FD`，以及 Supabase、Resend、管理员和 RFQ 相关生产变量；`SEO_INDEXING_ENABLED=true`、目录/RFQ 开关为 true，PayPal checkout 为 false。
- Supabase 匿名读取显示 36 个 active products、137 个生产引用媒体 URL；本地媒体 manifest 有 173 个对象。匿名角色无法读取 RFQ、订单、客户和变体表，符合 RLS 边界；本轮没有使用管理员会话写入数据。

## 产品范围与完成度

- 前台真实路由包括首页、产品 hub、六个产品族、15 个正式可索引 PDP、custom manufacturing、factory、contact、guides、legal 和 utility 页面。生产 sitemap 仍为 **28 个 URL**；**15 个 curated PDP** 保持可索引，**21 个 catalogue preview PDP** 继续 gated/noindex；它们等待逐页 SEO 文案、内部链接和索引优先级审核，不是因为 B2B 必须先有实时库存。
- 28 个正式 URL 已有 SSR 主体、H1、self-canonical、index/follow、内链和结构化数据；生产探针未发现新的 403、429、5xx、timeout、canonical、SSR 或 robots 异常。
- 36 个 active 产品可供 B2B 目录展示。当前网站的上线必需事实是稳定产品身份、产品族、已批准图片/来源、可核验的可见风格事实、RFQ context 和明确的未知字段表达；material composition、exact size、MOQ、sample、lead time、packaging、certification 和 stock 可在询价/项目中逐项确认，不是整个 B2B 网站的统一阻塞。
- `/factory/`、`/custom-manufacturing/`、`/contact/` 和两篇 guide 已形成 B2B 采购路径。页面明确 availability/feasibility 按产品和项目确认，不把生产能力写成现货库存或固定商业承诺。
- 产品媒体可显示且有 alt/aspect box；对象名、gallery alt、衍生图和缓存策略仍可优化，但不是当前 B2B RFQ 运营阻塞。

## 库存定位

- 当前 inventory 表和后台能力只承担受控运营/未来交易准备，不是 B2B catalogue 的公开库存来源。生产没有可靠的逐 SKU 实时库存，不能写入 500 件或任何虚构数字。
- 当前产品状态应理解为 `available for inquiry`、`made-to-order` 或 `customizable subject to review`；公开 PDP、Product schema 和 RFQ context 不输出数量、价格或 stock。
- 真实库存、预留、订单扣减、客户地址、checkout、退款和履约状态，等未来明确进入 To C/在线交易后再扩展。

## 后台、账户与运营能力

- 后台真实存在且受保护：产品 CRUD、draft/archive/publish、媒体预览/上传、变体/库存记录、RFQ 状态、报价操作；生产未认证 admin 路径逐项得到 401，同源写入和 Supabase RLS 生效。已确认的管理员会话完成 `/admin/` 只读验收：36 个 active products、4 张私有媒体和 Supabase signed preview 正常；RFQ、订单/报价及变体/库存当前均为 0 条。显式 opt-in 的隔离 Supabase 夹具完成真实 Auth、产品、媒体、变体、库存、发布、订单 RLS 和清理验证 11/11；另用唯一 marker 的 RFQ/报价夹具验证 reviewing → quoted、报价取消和状态事件 3/3，均已清理，未改变真实业务记录。该证据关闭了核心数据/RLS/状态 RPC 的技术风险，但不替代浏览器写路径与真实通知投递验收。
- RFQ 已有服务端校验、限流、幂等、Supabase 持久化、状态事件、Resend 通知和受保护报价路径；隔离 smoke 验证了 201 成功保存、202 `STORED_EMAIL_PENDING`、非法来源 403 及通知失败后的状态标记。唯一 marker 的 live Supabase 夹具进一步验证 RFQ 状态事件、管理员报价创建、quoted → cancelled 以及清理完成（3/3）。管理员会话下后台 RFQ 列表正常显示空状态，前台已修复 202 场景提示。生产开关为 true，但未提交真实 RFQ，故没有新的 lead、真实邮件投递或真实报价证据；Resend 生产投递和浏览器端管理员写路径仍需单独授权/验收。
- 账户支持邮箱会话、确认、重置和订单历史；Google OAuth 代码存在但生产未开启。购物车是本地询价清单，checkout 是报价/支付边界页面，不是已启用的消费者结账。
- 当前缺少完整 CMS、内容页编辑器、多角色/审计 UI、CRM/SLA 报表、履约工作流、客户地址/数据库购物车和管理员运营看板。对当前轻量 B2B RFQ 定位，这些是部分能力或后续选择，不应冒充已完成。

## 多语言真实状态

- **UI 翻译与持久化：已完成**：`en`、简中、`de-DE`、`fr-FR`、`it-IT` 客户端语言切换、localStorage/cookie 持久化和 `document.lang` 更新。
- **内容、URL、SSR 和 SEO：未完成/架构骨架**：没有 locale 路由、服务端翻译内容、localized metadata/canonical、双向 hreflang、`x-default`、语言 sitemap、翻译后的产品数据或后台语言维护；RFQ 文案/通知也未形成多语言运营流程。
- 因此当前不能称为完整国际多语言网站。下一次多语言工作应先选择一个目标市场并确认翻译、法律、产品事实和内容负责人，再做一个可验收的 SSR locale slice；不要一次生成五套薄页。

## SEO、搜索与分析

- Google：历史 GSC 仍显示 0 indexed/11 not indexed、0 clicks/0 impressions，sitemap 旧报告只发现 9 URL；没有新的确认索引、曝光或最新抓取证据。曾观察到呈现 Googlebot UA 的请求，但未做反向 DNS 验证，也不能证明已抓取最新提交。不要重复 Request Indexing 或使用 Google Indexing API。
- Bing：已通过 Google Search Console 只读导入验证；历史现场显示 sitemap 成功、最近抓取 2026-09-27、已发现 28、错误 0、警告 0。后续等待点击/索引数据，不需要重复提交。
- IndexNow：key 文件线上可取，28 个 canonical URL 历史提交返回 HTTP 202 accepted。
- 结构化数据包括 Organization/WebSite/Breadcrumb/Product/Guide；Product 不含伪造 Offer、price、stock、review/rating；无已核验社交 profile，因此没有伪造 sameAs。
- GA4：独立 `JS Meilai | jsmeilai.com` Property 与 `https://www.jsmeilai.com` stream（ID `15854461548`，Measurement ID `G-PP1JPPV9FD`）已接入生产。默认拒绝，用户同意后加载；UTM 首触/末触和 landing page 存储；page_view、product_family_view、contact_click、whatsapp_click 已有真实生产事件证据，RFQ 事件路径代码已核验但无本轮真实提交。错误的 `G-4EZW646Z1F` 属于 `majuscape.fun`，不得复用。
- Vercel Web Analytics 和 Speed Insights 未启用；当前没有 CrUX/RUM/Core Web Vitals 数据，不能宣称性能已被真实用户验证。

## 转化、隐私、安全与支付

- contact、RFQ 和 WhatsApp CTA 存在；历史 Human Review 记录曾确认公开号码 `+60 1114166916`，但当前接收人、回复负责人和 SLA 未重新确认。这只阻塞 WhatsApp 运营承诺和渠道发布，不阻塞 B2B RFQ 网站。没有正式社交 profile，也没有对外发布社交链接。
- consent 横幅默认拒绝分析 cookies；GA4 只在用户同意后加载。隐私/terms 页面存在，但多语言隐私文本和完整 consent 管理仍有限。
- 测试状态（本次实查）：`npm test` 69/69、`npm run typecheck`（含 Next typegen）、lint、production build 和 `validate:products` 均通过；隔离 RFQ smoke 覆盖 201/202/403 结果，生产 admin 路径矩阵保持 401。`scripts/verify-commerce-live.mjs` 使用 `integration-${randomUUID()}` marker、独立测试账号和 storage 路径，异常时打印清理告警，finally 删除订单/产品/媒体/测试账号，不调用邮件、报价或 RFQ；正确 `.env.local` 下本轮实际通过 11/11 且 `cleanupComplete=true`。RFQ/报价状态另有唯一 marker 的 Supabase 夹具 3/3 且清理完成；这些是受控技术验收，不是生产业务动作。
- Supabase leaked-password protection 的最后可引用证据是 2026-09-22 的历史提示，本轮没有管理员权限复核；它只影响账号安全加固，不是当前 SEO 阻塞。
- `PAYPAL_CHECKOUT_ENABLED=false`；Stripe/Paddle/PayPal 适配器 fail-closed，未上线虚假价格、库存、shipping、checkout 或支付能力。

## 文档漂移与本轮纠偏

已发现并纠正：

- 2.3.0 之后 GA4/UTM 已生产可用，但 package、README、AGENTS、workflow、release history 和状态入口仍把 2.3 写成当前，或把 GA4 写成未来能力；本轮统一为 2.4.0，并保留 2.3 历史。
- `CHANGELOG.md` 的 Unreleased 混入已完成发布事项，且 2.3 段落写“GA4 未启用”；本轮将已验收 analytics 能力归入 2.4.0。
- HANDOFF/ROADMAP 原来把“选择渠道并发布”作为唯一下一步；本轮收敛为产品资料、多语言切片、运营观察和外部获客门槛，不把研究稿写成发布。
- `lib/analytics.ts` 和 SEO audit 脚本的 2.3/“未来 GA4”注释已纠正。
- `REQUIREMENTS_MATURITY_COMMERCE.md` 与 `RFQ_SPEC.md` 明确标为历史需求/规格基线，避免将旧 preview 文字当成当前生产事实。
- 旧 release/ADR/验收文档保留作历史证据；没有把历史状态删除或重写为当前状态。旧计划中“重复 Request Indexing、批量开放 gated PDP、伪造商业字段、立刻启用支付”不再是有效工作项。
- 本轮根据当前 B2B 模式关闭 [产品与获客 readiness gate](PRODUCT_READINESS_GATE.md)，并完成 2.5.0 初始 buyer-experience slice：后续重点转为英文 B2B 运营观察、买家反馈和逐页内容选择，不把 To C 库存或未确认商业字段倒灌到英文 RFQ 站；同时继续遵守同阶段续接对话、正式 minor/major 阶段新建对话的长期规则。

## 待办分类

### 可以现在继续做

- 观察 GA4/Bing/Google 和真实 RFQ 反馈；选择一个经过事实审核、带 UTM 的小范围渠道实验。
- 继续补充产品资料；按产品/项目逐项确认 material、尺寸、MOQ、sample、lead time、packaging 和 certification，不等待全量一次齐备。
- 继续在 `jsmeilai.com` 上补充页面、产品资料、SEO 内链和小范围获客准备；`meilaigloves.com` 只保留为未来候选，不购买、不迁移、不改变当前 canonical。
- 研究 B2B UI/UX/SEO 模式，准备下一正式 minor 的范围，不复制第三方品牌或资产。

### 外部等待

- `meilaigloves.com` ownership / DNS confirmation（只影响未来迁移评估，不影响当前网站建设）。
- 企业邮箱域名、发件人和账号资料。
- WhatsApp 当前号码接收人、运营负责人、工作时间和 SLA。
- 一个目标市场及其翻译/法律负责人。
- Google/Bing 后续索引与搜索数据。

### 真正阻塞（只阻塞对应工作）

- 未来域名 ownership 只阻塞迁移、未来 canonical/redirect、依赖该域名的企业邮箱和正式账号；不阻塞 `jsmeilai.com` 上的 UI、SEO、内容、询盘和当前运营。
- WhatsApp 责任只阻塞公开 WhatsApp 运营承诺和渠道发布；不阻塞 RFQ 表单。
- 目标市场/翻译/法律负责人只阻塞 localized SSR、hreflang 和多语言 RFQ；不阻塞英文 B2B 站。
- 支付资料只阻塞 To C checkout、收款和履约。
- 真实测试邮箱只阻塞真实 Resend 投递证据；不阻塞已完成的代码和受控状态验证。

### 暂时不值得做

- 不重复已经完成的 admin/RLS/RFQ fixture 验收。
- 不为 B2B 网站制造逐 SKU 库存，不把所有产品设为 500 件。
- 不因 material、MOQ、lead time 等未知就关闭整个产品目录；未知值继续按 on-request/项目确认表达。
- 不把未来域名迁移与当前 UI/SEO 混成全站重构；在 `jsmeilai.com` 上继续做有范围、可验证的买家体验和搜索改进。
- 不启动 Payment、完整 To C 电商或大规模多语言薄页。

## 证据入口

- [Production](https://www.jsmeilai.com/)、[sitemap](https://www.jsmeilai.com/sitemap.xml)、[robots](https://www.jsmeilai.com/robots.txt)
- [固定工作规则](PROJECT_WORKFLOW.md)、[交接](HANDOFF.md)、[路线图](ROADMAP.md)、[版本历史](RELEASE_HISTORY.md)
- [2.4 发布审计](evidence/2026-09-28-2.4-audit.json)、[2.3 生产探针](evidence/2026-09-27-2.3-production.json)
- [GA4/UTM 源码](../lib/analytics.ts) 与 [consent loader](../components/analytics/ga4-consent.tsx)
