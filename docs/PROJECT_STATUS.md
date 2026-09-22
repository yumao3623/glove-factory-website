# JS Meilai 当前项目状态

核对日期：2026-09-22（Asia/Shanghai）。这是当前状态唯一入口；先读本页，再读 ROADMAP.md 和 HANDOFF.md。历史版本事实见 RELEASE_HISTORY.md；执行规则见 PROJECT_WORKFLOW.md。

## 版本与阶段

- **Production: 2.2.0**，是历史 2.2 的规范表达，包含已上线的 2.1.5 UI 能力，不重命名历史版本。
- **Development: 无在开发版本**。当前工作是项目治理与运营核查，不产生 2.2.1，不启动 2.3.0。
- **2.2 已完成限定的技术 SEO 发布范围**，不是全站所有页面 SEO 完成，也不代表 Google 已收录、支付上线或多语言 SEO 完成。
- 阶段：**上线运营 + SEO observation + 外部等待**。不是纯等待：可以整理采购事实、明确询价负责人、筛选真实外链目标；目前没有必要改代码。
- package.json / package-lock.json 的 2.1.0 是滞后包元数据，不作为生产版本证据。本次不为版本美化触发网站构建；下次实际软件 release 时同步包版本、发布记录和部署证据。

## 当前事实

| 领域 | 状态和证据边界 |
| --- | --- |
| Git / main | 核查前工作树干净，fetch 后 main = origin/main = `55ab4840186ce214c685d49d8bbe331419d7e2f9`。本次文档整理在本地 main 提交，未推送；远端及生产代码仍为此 SHA。未来任务重新检查 ahead/behind，不照抄本行。 |
| Vercel | GitHub 最新 Production deployment `6520058115` 为 success（2026-09-18 07:55:29Z），SHA 为 `55ab484`；Vercel commit status 同为 success。域名今天返回 Vercel 200。用户打开授权浏览器后，直接确认 Production Ready、同一 SHA 和 www.jsmeilai.com 绑定；6h 概览错误率 0%（89 edge requests / 11 function invocations，仅此窗口）。生产设置实查 SEO_INDEXING_ENABLED=true、COMMERCE_RFQ_ENABLED=true、PAYPAL_CHECKOUT_ENABLED=false。连接器/CLI 曾 403，但浏览器已解除本次核查阻塞。 |
| 域名 | `https://www.jsmeilai.com/` HTTPS 200；HTTP apex 与 HTTPS apex 最终跳转到该 canonical host 200。未改 DNS；未重新验证注册商续费和所有邮件 DNS。 |
| Supabase | `JSMeilai` / `lkpufupiddbmqzdgpbxo` / 东京，API 实查 ACTIVE_HEALTHY。13 张 public 表均启用 RLS；不等于本次完整权限渗透验收。list_projects 只返回别的项目，但按仓库项目 ID 直接读取成功，不能误用其他项目。 |
| Product | SQL 实查 36 active 产品、173 个 product-media 对象；六类分布：bridal 12、opera 11、costume 3、kids 4、veils 1、arm sleeves 5。所有产品有 description，但扩展 specifications 均为空；基础材质/颜色等不因此被视为空。变体与库存记录均为 0。后台 CRUD/库存机制有 2.1 验收，不能称已有确认库存。 |
| SEO | 今天 9 个 sitemap URL 全部 200、一个 title/description/H1、正确自引用 canonical、index/follow。robots 指向正式 sitemap。factory、custom-manufacturing、contact、抽样 PDP 仍 noindex 且无 canonical；costume 仍独立 noindex gate。保持既有边界，不批量解除。 |
| Search Console | 2026-09-18 仓库验收记录：URL-prefix property 验证成功、sitemap 成功且发现 9 URL、首页 live test 可索引、收录请求已受理；当时旧结果是“已抓取—尚未编入索引”。今天用户切换到已授权账号后实查：sitemap 成功、9 URL、最近读取 9 月 21 日；索引报告更新日 9 月 18 日，0 已索引、8 已发现尚未索引、首页 1 个旧 noindex 排除。首页 Inspection 仍为 9 月 18 日 07:41:23 抓取的 noindex；今天 21:44 实时测试“网址可编入 Google 索引”。效果报告默认 3 个月为 0 点击/0 曝光、无查询；人工处置和安全问题均未检测到问题。没有重复提交索引请求。 |
| 搜索可见性 | 用户报告普通 Google 搜索尚无官网结果；今天搜索工具 `site:jsmeilai.com` 无结果，仅为弱信号，不证明未收录，也不是 Google URL Inspection。GSC 今日报告及首页 Inspection 尚未收录；报告有数据截止延迟，不声称实时覆盖所有 URL。 |
| Multilingual | 2.1.5 的 English、简体中文、Deutsch、Français、Italiano UI 与持久化已实现并随最新代码部署。大量正文和产品英文；没有独立语言 URL / hreflang / localized canonical / 多语言 sitemap。今天所查页面无 hreflang。不是完整本地化。 |
| RFQ / Email | 2.1 记录已验证持久化、幂等、后台状态和 Resend delivered。今天 SQL：RFQ 0、订单 0、失败通知 0；零失败不等于链路已重新验收。生产 RFQ 开关今天实查为 true。本次未提交询价、未发邮件、未登录后台写数据；最新投递和跟进履约未验证。 |
| Payment | 今天 Vercel Production 设置实查 `PAYPAL_CHECKOUT_ENABLED=false`；代码具备 create/capture/webhook/金额校验/幂等，未完成商户真实验收。本次仅查看开关，未调用付款或更改配置。生产支付保持未验收，不得称可收款。经营者材料、KYC/审核与结算待本人确认。 |
| Growth | 台账与模板已存在，但目前是 6 种候选类型，尚无真实站点域名/联系人资格核查；不能称已有可直接投放的六家名单。仓库无本站已发布外链证据，本次未对外发送/提交。 |

## 已知问题与待办分类

### 可以现在继续做

- 读取已有 FACTORY_QUESTIONS / W01 资料，复用已批准事实，形成优先产品规格缺口表；由经营者确认未知项。不要重复索要已有资料。
- 明确询价负责人、备用人、首次回复目标和每日后台/邮箱核对流程；目前不能从零询价推导“需要 CRM 重构”。
- 筛选 3–5 个真实、相关、允许公司资料投稿的行业目标，核对规则后制作逐站草稿。未获具体发送授权不发信。
- 有权限的账号下只读复核 GSC；同步本地治理文档到远端时单独记录 Git 与可能触发的部署结果。

### 外部等待

- Google 抓取、索引与报告积累；不承诺收录日期。
- PayPal 商户审核仅在经营者已提交申请后才称“等待审核”；现在申请完成与否未确认。
- 第三方外链/目录审核仅在实际提交后才开始等待；目前尚未进入此状态。

### 真正阻塞（只阻塞对应工作）

- 本次 GSC / Vercel 浏览器访问已由用户解决，不再列为阻塞；连接器/CLI 权限异常只影响将来使用对应工具，不能据此要求重建平台。
- 新商业承诺、认证、MOQ/交期、可售库存：需要对应真实证据和经营者确认；不阻塞现有 RFQ 站运行。
- 支付启用：经营者身份/企业材料、审核、收单和结算条件、真实验收缺一不可。

### 暂时不值得做

- 因没有首次索引而每天改 metadata、重复提交首页、批量解锁 PDP、全站重构或增加版本。
- 尚无市场/翻译负责人时一次生成四种语言索引页；把薄英文正文放大成五套。
- 在没有商户条件和买家付款需求时继续打磨 PayPal，或重建已通过验收的后台。

## 运营关注

Supabase Security Advisor 今天唯一提示：泄露密码保护未启用。见 [官方说明](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)。历史记录说明套餐限制，本次未重新核对套餐价格或购买升级；该项进入 Operations 决策，不虚报已解决，也不直接阻断 2.2。

163 管理员激活仅有历史待办，今天未复核。发信域不等于可收件邮箱。不要把 notification_status=accepted 写成 delivered；投递必须由邮件平台确认。

## 本次可复核证据

- Git：`git fetch origin`、`git log`、`git status`；无 2.x release tag，历史 phase tags 保留，不追补假标签。
- GitHub：`repos/yumao3623/glove-factory-website/commits/55ab484/status`；`deployments/6520058115/statuses`。
- [生产部署记录](https://vercel.com/creen-ai/glove-factory-website/DxMa5Bp78UUstjDXGJT1TDqN81JF)；[生产站点](https://www.jsmeilai.com/)。
- 本次平台证据摘要：[2026-09-22 平台实查](evidence/2026-09-22-platform-review.md)。本次 HTTP 精简证据：`evidence/2026-09-22-production-readonly.json`。原 `seo:audit` 受 Node fetch 网络失败未完成；curl fallback 核对以上项目通过，不宣称整个原审计或 63 项测试本次重新通过。
- Supabase：按上述项目 ID 只读 get_project/list_tables、产品分组与业务计数 SQL、security advisor。只存汇总，不存客户数据或密钥。
- 历史详细验收按 RELEASE_HISTORY.md 的来源链接查阅；最新证据不能由旧聊天替代。
