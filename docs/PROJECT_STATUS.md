# JS Meilai 当前项目状态

核对日期：2026-09-28（Asia/Shanghai）。本页是当前状态唯一入口，优先级高于旧阶段文档、聊天记录和未更新的运营计划。当前判断同时基于仓库代码/Git、生产 HTTP、Vercel 环境与部署、Supabase 匿名可见数据及已记录的第三方现场证据；无法用当前权限复核的事项明确标为历史或未验证。

## 版本与阶段

- **Production：2.4.0（本轮发布）**。2.3.0 完成 indexable B2B surface；其后已上线并验收的 consented GA4、UTM 首触/末触 attribution 和事件就绪门控构成完整的新能力，按仓库 MINOR 规则纠正为 2.4.0。
- **Development：无正在开发的新正式版本**。本轮在 2.4.0 基线上补充产品/获客 readiness gate 和可复现性维护；2.5.0 尚未启动，外部获客扩张暂停，等待网站成熟度与真实商业资料门槛。
- **Current work：产品资料、受控 admin/RFQ 验收准备与运营观察，不新增正式版本**。观察 GA4/Bing/Google 数据、确认 WhatsApp 责任人、整理产品事实；不重复提交未变化 URL。
- `package.json` 与 lock 根包版本应为 `2.4.0`。包版本、Git 推送、Vercel Ready 和生产验收分别记录，不能互相替代。
- **Payment：`BLOCKED / awaiting real payment information`**，不阻塞 SEO、RFQ、内容或渠道准备。

## 代码、部署与数据基线

- Git 主线为 `main`；2.3 之后的 GA4/UTM 提交链为 `d7f8126`、`7bb286b`、`3c0fce4`、`b07227b`，随后是治理文档提交。没有伪造历史 release tag。
- 当前生产域名为 `https://www.jsmeilai.com/`。2.4.0 应用发布提交为 `9377f2a`；本轮 `cfeec58` 是 2.4.0 基线上的 RFQ 状态提示维护提交，已推送并通过 Vercel（部署记录：[8bjZw5PHo1FHo6YHhhsTfZLQSVqD](https://vercel.com/mao-yu/glove-factory-website/8bjZw5PHo1FHo6YHhhsTfZLQSVqD)）。生产 smoke 仍为核心页面/PDP 200、sitemap/robots 200、未授权 admin API 401；生产探针见 [2.4 audit evidence](evidence/2026-09-28-2.4-audit.json)。
- Vercel Production 已有独立 GA4 Measurement ID `G-PP1JPPV9FD`，以及 Supabase、Resend、管理员和 RFQ 相关生产变量；`SEO_INDEXING_ENABLED=true`、目录/RFQ 开关为 true，PayPal checkout 为 false。
- Supabase 匿名读取显示 36 个 active products、137 个生产引用媒体 URL；本地媒体 manifest 有 173 个对象。匿名角色无法读取 RFQ、订单、客户和变体表，符合 RLS 边界；本轮没有使用管理员会话写入数据。

## 产品范围与完成度

- 前台真实路由包括首页、产品 hub、六个产品族、15 个正式可索引 PDP、custom manufacturing、factory、contact、guides、legal 和 utility 页面。生产 sitemap 仍为 **28 个 URL**；**15 个 curated PDP** 保持可索引，**21 个资料不足 PDP** 继续 gated/noindex，不为数量批量开放。
- 28 个正式 URL 已有 SSR 主体、H1、self-canonical、index/follow、内链和结构化数据；生产探针未发现新的 403、429、5xx、timeout、canonical、SSR 或 robots 异常。
- 36 个 active 产品可供目录展示，但资料深度不一致。生产不编造价格、库存、MOQ、交期、认证、评价、评分或 Offer；缺失字段仍应通过 RFQ 确认。
- `/factory/`、`/custom-manufacturing/`、`/contact/` 和两篇 guide 已形成基础采购路径；仍缺事实完整的材料/尺寸/MOQ/sample/包装/交期/质量证据、FAQ 和可公开的信任资料。没有必要为 SEO 制造薄页面。
- 产品媒体可显示且有 alt/aspect box；对象名、gallery alt、衍生图和缓存策略仍可优化，但不是当前索引阻塞。

## 后台、账户与运营能力

- 后台真实存在且受保护：产品 CRUD、draft/archive/publish、媒体预览/上传、变体/库存记录、RFQ 状态、报价操作；本轮生产 smoke 对 products、requests、variants、quotes、media、publish 等未认证路径均得到 401，同源写入和 Supabase RLS 生效。真实管理员验收本轮未使用管理员登录，因此 UX/权限细节仍需一次受控运营验收。
- RFQ 已有服务端校验、限流、幂等、Supabase 持久化、状态事件、Resend 通知和受保护报价路径；本轮用隔离的 fake Supabase/Resend 链路验证了 201 成功保存、202 `STORED_EMAIL_PENDING`、非法来源 403 及通知失败后的状态标记。前台已修复 202 场景提示，避免把“已保存但通知待处理”误显示为普通成功。生产开关为 true，但未提交真实 RFQ，故没有新的 lead 或邮件成功证据。
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

- contact、RFQ 和 WhatsApp CTA 存在；仓库历史 Human Review 记录曾确认公开号码 `+60 1114166916`，但当前状态仍缺少对该号码的实时接收人、回复负责人和响应 SLA 的重新确认，因此本轮没有把历史号码证据升级为当前运营承诺。没有正式社交 profile，也没有对外发布社交链接。
- consent 横幅默认拒绝分析 cookies；GA4 只在用户同意后加载。隐私/terms 页面存在，但多语言隐私文本和完整 consent 管理仍有限。
- 测试状态（本次实查）：`npm test` 69/69、`npm run typecheck`（含 Next typegen）、lint、production build 和 `validate:products` 均通过；隔离 RFQ smoke 覆盖 201/202/403 结果。生产 API 对未授权 admin 返回 401，RLS 保持数据库边界。
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
- 本轮根据生产探针和代码检查补充 [产品与获客 readiness gate](PRODUCT_READINESS_GATE.md)：当前核心缺口是买家资料与询盘跟进责任，不是继续扩张薄页面或直接生成五语言站；同时明确同阶段续接对话、正式 minor/major 阶段新建对话的长期规则。

## 待办分类

### 可以现在继续做

- 完成一次受控管理员后台验收，确认产品发布、媒体、RFQ 状态和报价 UX；不改变公开 URL 边界。
- 从真实工厂资料批准下一批 PDP 字段，或为一个目标市场准备 SSR 多语言 slice。
- 确认 WhatsApp 接收人/负责人/SLA，补充经过核验的社交 profile 后再加 profile 链接或 sameAs。
- 观察 GA4/Bing/Google 的历史数据变化，并用现有 UTM registry 做小范围、事实审核后的渠道实验。

### 外部等待

- Google 重新抓取、索引报告和 Search performance 数据。
- Bing 后续索引/点击数据、真实 RFQ 回复和邮件反馈。
- 真实支付商户资料、KYC、收单和结算条件。

### 真正阻塞（只阻塞对应工作）

- 未确认产品/工厂事实只阻塞相应字段、PDP 解锁和内容发布，不阻塞现有英文核心站或 RFQ 入口。
- WhatsApp 负责人/社交 profile 只阻塞对应公开 CTA/渠道发布。
- 支付资料只阻塞在线收款。

### 暂时不值得做

- 重复提交未变化 Google URL/sitemap、Google Indexing API、把 live test 当已收录。
- 在没有目标市场和翻译/事实负责人前生成完整五语言 SEO 站。
- 批量解锁 21 个 gated PDP、购买/群发垃圾外链、启用无真实资料的支付。
- 为追求指标而启用 Vercel Analytics/Speed Insights 或建立新后台系统，除非有明确运营问题。
- 在 readiness gate 通过前直接启动 2.5.0 的完整多语言实现或扩大多个外部渠道。

## 证据入口

- [Production](https://www.jsmeilai.com/)、[sitemap](https://www.jsmeilai.com/sitemap.xml)、[robots](https://www.jsmeilai.com/robots.txt)
- [固定工作规则](PROJECT_WORKFLOW.md)、[交接](HANDOFF.md)、[路线图](ROADMAP.md)、[版本历史](RELEASE_HISTORY.md)
- [2.4 发布审计](evidence/2026-09-28-2.4-audit.json)、[2.3 生产探针](evidence/2026-09-27-2.3-production.json)
- [GA4/UTM 源码](../lib/analytics.ts) 与 [consent loader](../components/analytics/ga4-consent.tsx)
