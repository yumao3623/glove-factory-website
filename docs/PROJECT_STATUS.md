# JS Meilai 当前项目状态

核对日期：2026-09-27（Asia/Shanghai）。本页是当前状态唯一入口；旧阶段文档保留作历史证据，不覆盖本页的生产、Git、平台和现场 HTTP 事实。执行顺序仍由根目录 [`AGENTS.md`](../AGENTS.md) 规定。

## 版本与阶段

- **Production: 2.3.0**。当前生产代码对应 `main`/`origin/main` 的 `349201d`，Vercel commit check 为 success；线上最终复核已通过。
- **Development / Current work: 无（2.3.0 已完成，进入持续运营）**。后续是 SEO、外部获客、事实补充和账号配置的运营工作，不把“等待 Google 报告更新”当成开发阶段。
- `package.json` 与 lock 根包版本为 `2.3.0`；包字段、Git push、Vercel Ready 和线上验收分别记录，不互相替代。
- Payment 仍为 **`BLOCKED / awaiting real payment information`**，不阻塞站内完善、索引、外链准备或 RFQ。

## 本轮交付边界

2.3 将旧的“只读观察”改为可抓取、可发现、可询盘的正式英文 B2B surface：

- 正式 sitemap 为 28 个 URL：13 个核心/指南页面 + 15 个基于批准目录、资料完整度筛选的 PDP；其余 21 个目录产品仍可在目录中浏览，但 PDP 保持 `noindex`、不进 sitemap。
- `/custom-manufacturing/`、`/factory/`、`/contact/` 和受控 `/costume-gloves/` 已在正式生产模式可索引。About、manufacturing capability、quality control 内容合并在 `/factory/`，OEM/ODM 合并在 `/custom-manufacturing/`，没有为凑数量创建薄页。
- 15 个首批 PDP 使用真实 Supabase 产品与云媒体，并只公开已核对的 family、occasion、颜色、手指/年龄方向、装饰或定制字段；material、length、MOQ、sample、lead time、stock、certification、price、review 等未确认字段明确留在询价确认。
- Product、Breadcrumb、Organization、WebSite、Guide 相关结构化数据和 OG/Twitter 元数据已上线；Product JSON-LD 不包含伪造 `Offer`、库存、评价或评分。
- robots 明确允许 `/api/media/`，同时限制 `/api/`、账户、后台、购物车和 checkout；加入隐私安全的 claimed-crawler 观察标记。

## 当前事实

| 领域 | 当前状态与证据边界 |
| --- | --- |
| Git / main | `main` 与 `origin/main` 同步到 `349201d`；工作树在文档提交前应保持干净。2.3 代码沿 `9e68f5e`、`3a29adc`、`314e955`、`a6290e5`、`349201d` 连续推送，未重写旧历史。 |
| Vercel / production | `349201d` 的 Vercel commit status 为 success（本次实查）；`https://www.jsmeilai.com/` 及正式页面已返回新 2.3 HTML。当前可见 API 未提供可稳定引用的 deployment ID，因此以 commit status + live probe 作为部署证据。 |
| 域名与版本 | `https://www.jsmeilai.com/` 200；HTTP apex、HTTP www、HTTPS apex 最终归一到 HTTPS www；无斜杠核心路径 308 到 trailing slash。 |
| Supabase / 产品 | 本次只读实查 36 个 active 产品、173 个媒体对象：bridal 12、opera 11、costume 3、kids 4、veils 1、arm sleeves 5。15 个 curated slug 均能从当前生产数据解析；未来下架或改 slug 时需同步 sitemap 与部署。 |
| 生产 sitemap | `GET /sitemap.xml` 200，28/28 URL；全部为 canonical host + trailing slash。最终 `lastmod` 为对应本轮内容/UX 修正的固定时间 `2026-09-26T18:42:00.000Z`，不在未来；sitemap 外的 legal/utility 页面不参与索引。 |
| 生产索引健康 | 以 Googlebot UA 与普通 UA **模拟请求**审计 sitemap 全部 28 URL：均 200、`index, follow`、自指向 canonical、一个 H1、SSR 正文、标准 `<a href>` 内链；无 `X-Robots-Tag`。`/privacy/`、`/terms/`、`/shipping/`、`/returns/` 和非 curated PDP 有意 `noindex`；`/wedding-gloves/` 一跳 308 到 `/bridal-gloves/`。 |
| Robots / media | `robots.txt` 200，允许 `/` 和 `/api/media/`，sitemap 指向正式 URL；私有 API/后台/账户/购物车/checkout 继续 disallow。旧版本曾用 `Disallow: /api/` 覆盖媒体路径，这是本轮修复的真实技术问题。 |
| Rendering / UA / mobile | 对首页、产品 hub、核心分类、custom、factory、contact、curated PDP 做普通、移动、Googlebot、Google-InspectionTool UA **模拟请求**，HTML hash 一致；SSR 直接含主要正文和 H1，没有 locale/cookie/geo/User-Agent 分流。移动导航保留完整产品、工厂、指南和 RFQ 入口。 |
| 性能与 capacity | 本次 28 URL probe 无 403、429、5xx、timeout；网络计时 p50 约 1.47s、最大约 3.43s，动态页面样本约 0.4–1.2s TTFB。产品/PDP 使用 `no-store` Supabase 请求，当前不是阻塞，但规模扩大前应评估受控 revalidate/缓存。 |
| Googlebot 证据 | Vercel 可见短保留日志中，2026-09-26T17:55:11.656Z UTC（上海 2026-09-27 01:55:11.656）有一个呈现 Googlebot UA 的 `/kids-dress-gloves/` 请求：200、完成约 332ms、函数约 236ms；相邻首页、hub、分类和 PDP 也为 200。UA 可伪造，故表述为“观察到呈现 Googlebot UA 的请求”，不是反向 DNS 认证。更久历史在 Hobby 日志中不可见。 |
| GSC 历史索引状态 | 本次进入 GSC 前台仍看到旧报告：sitemap 2026-09-26 最近读取、旧索引报告 0 indexed / 11 not indexed（3 noindex、8 discovered-not-indexed）；效果近 3 个月 0 clicks、0 impressions。首页旧记录明确为 2026-09-18 07:41:23 Googlebot 智能手机版抓到 `noindex`；这不是当前 live HTML。 |
| GSC live test / 请求 | 2026-09-27：`/` 和 `/opera-gloves/` live test 显示“网址可编入 Google”；首页与 Opera 各请求一次并成功进入优先抓取队列。`/products/`、`/bridal-gloves/`、`/kids-dress-gloves/`、`/wedding-veils/`、`/custom-manufacturing/`、`/factory/` 各请求一次并成功；Contact 与一个首批 PDP 尝试时 GSC 返回“提交请求时出现问题，请稍后重试”，未继续重试。live test/请求不等于已收录；Google-selected canonical 和新 crawl date 仍未验证。 |
| 0 indexed 的根因判断 | **A 确定**：GSC 保存的是旧 noindex crawl record，且旧代码把 PDP、factory/custom/contact/costume gate 留在 noindex；**B 高概率**：新域名、旧 sitemap 仅 9 URL、无外部权威/零 impressions，crawl demand 较低；**C 有贡献**：旧 PDP 文案模板化、信息增量和内链图较弱，本轮已做 15 页高质量 tranche；**D 未发现证据**：当前无错误状态或 timeout；**E 当前未发现**：canonical、robots、SSR、UA 版本一致。剩余 0 indexed 是历史报告刷新 + Google scheduling/priority 的组合，不可简化为“纯技术无异常所以等”。 |
| Metadata / schema | 所有 28 indexable URL 有唯一 title、description、canonical、OG/Twitter；OG image 为 1200×630 PNG。15 PDP 输出 Product + Breadcrumb，Guide 输出 Article/HowTo + Breadcrumb；没有 Offer/price/stock/review/rating。线上 SSR JSON-LD 已解析检查，未把该检查表述为 Google Rich Results Test 通过。无 verified social profile，因此不伪造 `sameAs`。 |
| Multilingual | 当前有 2.1.5 的 en、简中、de、fr、it 客户端 UI 和持久化选择；SEO 仍只有英文独立 URL。没有 server-rendered locale URL、localized canonical、双向 hreflang、`x-default` 或语言 sitemap，故不宣称完整多语言 SEO，也没有制造机械薄页。 |
| RFQ / contact | 生产 RFQ 开关为 true；页面提供表单、邮箱、电话和已批准号码的 WhatsApp CTA，未在本轮提交真实询盘或发送邮件。数据库当前没有新增 RFQ；不把没有测试写入的状态称为 lead。 |
| Analytics / attribution | 代码有隐私门控的 `rfq_submit`、`contact_click`、`whatsapp_click`、`product_family_view`、`sample_request` 事件骨架，但没有 GA4 measurement ID、consent UI、GTM、Vercel Web Analytics 或 Speed Insights 数据；UTM 只做链接约定，尚未捕获/持久化。 |
| Bing / IndexNow | IndexNow key 文件线上 200 且内容匹配；最终生产 28 个 canonical URL 已向官方 IndexNow endpoint 提交一次，HTTP 202 accepted（不代表已被 Bing/Google 索引）。Bing Webmaster 当前账号没有 jsmeilai.com，sitemap/站点验证尚未完成。IndexNow 不等同于 Google Indexing API。 |
| 外部获客 | LinkedIn、Facebook、Instagram、TikTok、Pinterest、YouTube 和目录目前没有已核验 profile/link 证据；仓库外链台账仍是 qualify-first 草稿，没有发送、群发或已发布 backlink。稳定落地页为产品族、指南、custom、contact，待账号和合规核验后使用。 |
| Payment | `PAYPAL_CHECKOUT_ENABLED=false`；没有假 checkout、价格、账户或支付渠道。待经营者约 5 天后提供真实支付资料、KYC/收单/结算条件并完成受控验收。 |

## 运营已知事项

- Supabase Security Advisor 上次有证据的状态（2026-09-22）仍提示 leaked-password protection 未启用；本轮未重新检查套餐或修改安全设置，不把旧提示写成已解决，也不把它误判为 2.3 索引阻塞。
- 163 管理员激活是历史待办，本轮未复核；它不影响公开英文站、RFQ 或当前 SEO surface。
- 产品媒体由 `/api/media/` 映射到云对象，当前有 alt 和稳定 aspect box，但源对象名不是 SEO 描述性文件名、图片走 `unoptimized`；公共 derivative/CDN 和更细的 gallery alt 是后续资产优化，不是当前 Web indexing blocker。
- 15 个 PDP 有可展开的 sizing/customisation 说明，但尚未发布事实完整的 FAQ/FAQPage；待真实规格批准后再扩充，不用模板问题凑内容。
- 产品目录依赖 request-scoped Supabase 读取；本次线上数据完整，但未来数据库短暂故障可能让 200 页面变薄，后续应在目录扩大前评估受控缓存或经审核的降级策略。

## 已知问题与待办分类

### 可以现在继续做

- 在有权限的 Bing 账号导入或验证 `www.jsmeilai.com`，提交 `/sitemap.xml`，并保存验证结果。
- 提供真实 GA4 measurement ID 和同意方案，或决定启用 Vercel Analytics/Speed Insights；随后把现有事件骨架接入并做一次 RFQ/联系方式测试。
- 核验 WhatsApp 号码由谁接收、回复负责人和 SLA；补充真实社交 profile URL 后再加 `sameAs` 或社交落地链接。
- 从现有工厂资料确认 material、尺寸、MOQ、sample、包装、lead time 和负责人，逐项批准下一批 PDP；不批量解锁 21 个 gated 页面。
- 按行业目录规则筛选 3–5 个真实目标，先做逐站草稿；没有用户明确发送授权，不提交表单或发消息。
- 若目录规模增长，评估 request-scoped cache/revalidate 和更长期的 Vercel Log Drain/Observability 方案。

### 外部等待

- Google 重新抓取、索引报告和 Search performance 数据；live test 可用不承诺收录时间。
- Bing 站点验证/导入、sitemap 读取和 IndexNow 后续发现。
- 真实支付资料、商户/KYC/收单审核和结算条件。
- 真实 RFQ、邮件回复和买家反馈，才能形成转化数据。

### 真正阻塞（只阻塞对应工作）

- 未确认的商业事实只阻塞相应产品字段发布，不阻塞英文核心站、技术 SEO 或询盘入口。
- Bing、GA4、社交和长期日志需要账号/权限，只阻塞对应第三方配置，不阻塞 2.3 生产站。
- Payment 的真实商户资料和受控验收只阻塞在线收款，不阻塞前段获客。

### 暂时不值得做

- 每天修改 metadata、重复提交同一个 URL、重复提交 sitemap、用 Indexing API 处理普通网页，或把 live test 当已收录。
- 在没有事实负责人和目标市场前一次生成五套语言 SEO 页，或把 21 个 gated PDP 批量解锁。
- 没有 verified profile、目录规则和发送授权时购买/群发外链。
- 为了保留短期 Googlebot 日志而立刻引入数据库 crawl 事件表；先用现有 proxy marker + Vercel 请求详情，长期留存由平台方案决定。

## 本次可复核证据

- Git / build：`349201d`；`npm run lint`、`npm run typecheck`、`npm test`（66/66）、formal `npm run build` 均通过。
- 线上 probe：`docs/evidence/2026-09-27-2.3-production.json`；包括 sitemap、robots、URL normalization、UA hash、legal/noindex 边界和 schema 摘要。
- 生产站点：[https://www.jsmeilai.com/](https://www.jsmeilai.com/)、[sitemap.xml](https://www.jsmeilai.com/sitemap.xml)、[robots.txt](https://www.jsmeilai.com/robots.txt)。
- GSC 现场证据：本次浏览器中的 URL Inspection/live test；新报告尚未刷新 indexed state，不能用旧截图替代新 live HTML。
- IndexNow：官方 endpoint 返回 HTTP 202；key 文件为仓库 `public/057cf023d52f25be2f9aebe3189740fe.txt`。
- Vercel 日志：Hobby 短留存窗口中的 claimed-Googlebot 请求；没有宣称可回溯的完整历史。
