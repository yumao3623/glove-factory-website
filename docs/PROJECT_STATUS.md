# JS Meilai 当前项目状态

核对日期：2026-09-28（Asia/Shanghai）。本页是当前状态唯一入口；旧阶段文档保留作历史证据，不覆盖本页的生产、Git、平台和现场 HTTP 事实。执行顺序仍由根目录 [`AGENTS.md`](../AGENTS.md) 规定。

## 版本与阶段

- **Production: 2.3.0**。当前已验证生产代码提交为 b07227b；Vercel Production deployment BwgXUvNPMjH1mvChcpCfGThUSSVa 为 Ready，域名继续绑定 www.jsmeilai.com。
- **Development / Current work: 外部获客执行包已准备，进入账号选择与首批发布前置阶段**。GA4、Bing 和归因基础保持生产可用；本轮新增渠道优先级、UTM registry、首批英文内容和发布检查。LinkedIn、Alibaba.com、Made-in-China.com、Global Sources、YouTube、Pinterest/Instagram 已完成研究，但没有代替经营者创建账号或发布。
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
| Git / main | d7f8126 已从归因分支 fast-forward 合并到 main 并推送 origin/main；随后 3c0fce4、ea86197、7613474 和 b07227b 完成 GA4 fail-closed、生产记录、专用 Property 配置记录与首屏事件竞态修复。 |
| Vercel / production | Source main、commit b07227b 的 deployment BwgXUvNPMjH1mvChcpCfGThUSSVa 已实查 Ready；Production 环境变量 NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PP1JPPV9FD 生效，域名 www.jsmeilai.com 正常。 |
| 域名与版本 | `https://www.jsmeilai.com/` 200；HTTP apex、HTTP www、HTTPS apex 最终归一到 HTTPS www；当前 HTTP apex 观测为两跳（HTTP apex → HTTPS apex → HTTPS www），HTTPS apex 为一跳，属于 Vercel 域名设置优化而非索引阻塞；无斜杠核心路径 308 到 trailing slash。 |
| Supabase / 产品 | 本次只读实查 36 个 active 产品、173 个媒体对象：bridal 12、opera 11、costume 3、kids 4、veils 1、arm sleeves 5。15 个 curated slug 均能从当前生产数据解析；未来下架或改 slug 时需同步 sitemap 与部署。 |
| 生产 sitemap | `GET /sitemap.xml` 200，28/28 URL；全部为 canonical host + trailing slash。最终 `lastmod` 为最终产品名清理与 sitemap 修正对应的固定时间 `2026-09-26T19:08:58.000Z`，不在未来；sitemap 外的 legal/utility 页面不参与索引。 |
| 生产索引健康 | 以 Googlebot UA 与普通 UA **模拟请求**审计 sitemap 全部 28 URL：均 200、`index, follow`、自指向 canonical、一个 H1、SSR 正文、标准 `<a href>` 内链；无 `X-Robots-Tag`。`/privacy/`、`/terms/`、`/shipping/`、`/returns/` 和非 curated PDP 有意 `noindex`；`/wedding-gloves/` 一跳 308 到 `/bridal-gloves/`。 |
| Robots / media | `robots.txt` 200，允许 `/` 和 `/api/media/`，sitemap 指向正式 URL；私有 API/后台/账户/购物车/checkout 继续 disallow。旧版本曾用 `Disallow: /api/` 覆盖媒体路径，这是本轮修复的真实技术问题。 |
| Rendering / UA / mobile | 对首页、产品 hub、核心分类、custom、factory、contact、curated PDP 做普通、移动、Googlebot、Google-InspectionTool UA **模拟请求**，HTML hash 一致；SSR 直接含主要正文和 H1，没有 locale/cookie/geo/User-Agent 分流。移动导航保留完整产品、工厂、指南和 RFQ 入口。 |
| 性能与 capacity | 本次 28 URL probe 无 403、429、5xx、timeout；网络计时 p50 约 1.47s、最大约 3.43s，动态页面样本约 0.4–1.2s TTFB。尚无 CrUX/RUM/Core Web Vitals 数据；产品/PDP 使用 `no-store` Supabase 请求，当前不是阻塞，但规模扩大前应评估受控 revalidate/缓存。 |
| Googlebot 证据 | Vercel 可见短保留日志中，2026-09-26T17:55:11.656Z UTC（上海 2026-09-27 01:55:11.656）有一个呈现 Googlebot UA 的 `/kids-dress-gloves/` 请求：200、完成约 332ms、函数约 236ms；相邻首页、hub、分类和 PDP 也为 200。该请求发生在 `b43ce31` 最终生产代码序列之前的 2.3 部署窗口，不能写成 Google 已抓取最新提交。UA 可伪造，故表述为“观察到呈现 Googlebot UA 的请求”，不是反向 DNS 认证。更久历史在 Hobby 日志中不可见。 |
| GSC 历史索引状态 | 本次进入 GSC 前台仍看到旧报告：sitemap 2026-09-26 最近读取、旧索引报告 0 indexed / 11 not indexed（3 noindex、8 discovered-not-indexed）；效果近 3 个月 0 clicks、0 impressions。首页旧记录明确为 2026-09-18 07:41:23 Googlebot 智能手机版抓到 `noindex`；这不是当前 live HTML。 本次实查的新浏览器账号 p142769@siswa.ukm.edu.my 无权访问该 property，未形成新的 GSC 索引或曝光结论；需要正确 Search Console 账号或授权后再观察。 |
| GSC live test / 请求 | 2026-09-27：`/` 和 `/opera-gloves/` live test 显示“网址可编入 Google”；首页与 Opera 各请求一次并成功进入优先抓取队列。`/products/`、`/bridal-gloves/`、`/kids-dress-gloves/`、`/wedding-veils/`、`/custom-manufacturing/`、`/factory/` 各请求一次并成功；Contact 与一个首批 PDP 尝试时 GSC 返回“提交请求时出现问题，请稍后重试”，未继续重试。live test/请求不等于已收录；Google-selected canonical 和新 crawl date 仍未验证。 |
| 0 indexed 的根因判断 | **A 确定**：GSC 保存的是旧 noindex crawl record，且旧代码把 PDP、factory/custom/contact/costume gate 留在 noindex；**B 高概率**：新域名、旧 sitemap 仅 9 URL、无外部权威/零 impressions，crawl demand 较低；**C 有贡献**：旧 PDP 文案模板化、信息增量和内链图较弱，本轮已做 15 页高质量 tranche；**D 未发现证据**：当前无错误状态或 timeout；**E 当前未发现**：canonical、robots、SSR、UA 版本一致。剩余 0 indexed 是历史报告刷新 + Google scheduling/priority 的组合，不可简化为“纯技术无异常所以等”。 |
| Metadata / schema | 所有 28 indexable URL 有唯一 title、description、canonical、OG/Twitter；OG image 为 1200×630 PNG。15 PDP 输出 Product + Breadcrumb，Guide 输出 Article/HowTo + Breadcrumb；没有 Offer/price/stock/review/rating。线上 SSR JSON-LD 已解析检查，未把该检查表述为 Google Rich Results Test 通过。无 verified social profile，因此不伪造 `sameAs`。 |
| Multilingual | 当前有 2.1.5 的 en、简中、de、fr、it 客户端 UI 和持久化选择；SEO 仍只有英文独立 URL。没有 server-rendered locale URL、localized canonical、双向 hreflang、`x-default` 或语言 sitemap，故不宣称完整多语言 SEO，也没有制造机械薄页。 |
| RFQ / contact | 生产 RFQ 开关为 true；页面提供表单、邮箱、电话和已批准号码的 WhatsApp CTA，未在本轮提交真实询盘或发送邮件。数据库当前没有新增 RFQ；不把没有测试写入的状态称为 lead。 |
| Analytics / attribution | 已创建 `JS Meilai | jsmeilai.com` Property 与 https://www.jsmeilai.com Web Data Stream（stream ID 15854461548，Measurement ID G-PP1JPPV9FD），并在 Vercel Production 配置新 ID。代码保持默认拒绝：未同意前不加载 GA4，Allow 后才加载；product_family_view 已加入 GA4-ready 竞态保护。Ready 生产部署现场证据：未同意时 dataLayer=0、gtag 未定义且无 GA 脚本；Allow 后加载 G-PP1JPPV9FD，带 UTM 的 /opera-gloves/ 成功记录 product_family_view 和 session first/last attribution。此前同一新 Property 实时报告已看到 Production 活跃用户、page_view、contact_click 与 whatsapp_click；RFQ 事件路径已代码核验但未提交真实询盘。Vercel Web Analytics/Speed Insights 仍未启用。 当前实时快照（2026-09-28 01:05 CST）显示 1 个 30 分钟活跃用户、1 个 5 分钟活跃用户；可见 page_view 7、product_family_view 3、contact_click 1。该面板是当前快照，不等于与上次检查的净增量。 |
| Bing / IndexNow | IndexNow key 文件线上 200 且内容匹配；最终生产 28 个 canonical URL 已向官方 IndexNow endpoint 提交一次，HTTP 202 accepted。Bing sitemap 本次实查已变为成功：提交 2026-09-27、最近抓取 2026-09-27、已发现 URL 28、错误 0、警告 0。 |
| 外部获客 | 本轮已完成渠道研究、优先级、UTM 规则、落地页映射和首批英文草稿，记录在 docs/GROWTH_CHANNEL_PLAYBOOK.md 与 docs/GROWTH_CHANNEL_REGISTRY.csv；没有创建账号、发布外链、发送消息或购买付费资源。 |
| Payment | `PAYPAL_CHECKOUT_ENABLED=false`；没有假 checkout、价格、账户或支付渠道。待经营者约 5 天后提供真实支付资料、KYC/收单/结算条件并完成受控验收。 |

## 运营已知事项

- Supabase Security Advisor 上次有证据的状态（2026-09-22）仍提示 leaked-password protection 未启用；本轮未重新检查套餐或修改安全设置，不把旧提示写成已解决，也不把它误判为 2.3 索引阻塞。
- 163 管理员激活是历史待办，本轮未复核；它不影响公开英文站、RFQ 或当前 SEO surface。
- 产品媒体由 `/api/media/` 映射到云对象，当前有 alt 和稳定 aspect box，但源对象名不是 SEO 描述性文件名、图片走 `unoptimized`；公共 derivative/CDN 和更细的 gallery alt 是后续资产优化，不是当前 Web indexing blocker。
- 15 个 PDP 有可展开的 sizing/customisation 说明，但尚未发布事实完整的 FAQ/FAQPage；待真实规格批准后再扩充，不用模板问题凑内容。
- 产品目录依赖 request-scoped Supabase 读取；本次线上数据完整，但未来数据库短暂故障可能让 200 页面变薄，后续应在目录扩大前评估受控缓存或经审核的降级策略。
- 来源 registry 仍保留原始标题中的尺寸词（例如 `55 cm`），但 runtime `length_cm` 为空时，生产映射已从公开产品名、标题和图片 alt 中移除该词；只有确认的 `length_cm` 才保留。Product JSON-LD 和正文规格同样不发布未确认尺寸。
- HTTP apex 的两跳归一可在 Vercel 域名设置中进一步合并；当前最终 canonical、HTTPS、状态码和 sitemap host 均正确，不阻塞抓取或索引。

## 已知问题与待办分类

### 可以现在继续做

- 继续观察 Bing 已成功 sitemap 的后续 URL/点击数据，并记录 GA4 实时到历史数据的变化。
- 先由经营者选择并登录一个 P0 渠道（LinkedIn Company Page 或 Alibaba/Made-in-China 之一），再按执行包发布第一条经过事实审核的内容；不把准备稿写成已发布。
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
- Bing 的 GSC 只读导入和 GA4 的 Property/Stream 创建已由当前授权账号完成；后续只剩数据延迟和现场验证，不阻塞 2.3 站点。
- Payment 的真实商户资料和受控验收只阻塞在线收款，不阻塞前段获客。

### 暂时不值得做

- 每天修改 metadata、重复提交同一个 URL、重复提交 sitemap、用 Indexing API 处理普通网页，或把 live test 当已收录。
- 在没有事实负责人和目标市场前一次生成五套语言 SEO 页，或把 21 个 gated PDP 批量解锁。
- 没有 verified profile、目录规则和发送授权时购买/群发外链。
- 为了保留短期 Googlebot 日志而立刻引入数据库 crawl 事件表；先用现有 proxy marker + Vercel 请求详情，长期留存由平台方案决定。

## 本次可复核证据

- Git / build：历史 SEO 验收基线为 b43ce31；当前 GA4 生产代码为 b07227b，npm run lint、npm run typecheck、npm test（69/69）、formal npm run build 均通过。
- 线上 probe：`docs/evidence/2026-09-27-2.3-production.json`；包括 sitemap、robots、URL normalization、UA hash、legal/noindex 边界和 schema 摘要。
- 生产站点：[https://www.jsmeilai.com/](https://www.jsmeilai.com/)、[sitemap.xml](https://www.jsmeilai.com/sitemap.xml)、[robots.txt](https://www.jsmeilai.com/robots.txt)。
- GSC 现场证据：本次浏览器中的 URL Inspection/live test；新报告尚未刷新 indexed state，不能用旧截图替代新 live HTML。
- IndexNow：官方 endpoint 返回 HTTP 202；key 文件为仓库 `public/057cf023d52f25be2f9aebe3189740fe.txt`。
- Vercel 日志：Hobby 短留存窗口中的 claimed-Googlebot 请求；没有宣称可回溯的完整历史。
