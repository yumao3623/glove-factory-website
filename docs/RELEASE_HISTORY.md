# JS Meilai 简明版本历史

历史叙事保留 **1.x → 2.0 → 2.1 → 2.1.5 → 2.2 → 2.3 → 2.4**。这是产品阶段顺序，不伪造 Git 时间顺序。核对日期：2026-09-28。

| 历史版本 | 真正完成内容 | 可追溯来源 |
| --- | --- | --- |
| 1.x（统一视为 1.0 阶段） | 研究、架构、产品/图片证据、批准目录、视觉选择、预览发布与仓库整理；随后积累成熟 storefront/admin 基础。早期 phase 编号不是软件 MAJOR 版本。 | Git 自 `df79016`（2026-08-31）；phase tags；`77067d4` 仓库整理、`8b168c1` / `e7f8340` storefront 基础；原 V1 文档保留供溯源。 |
| 2.0 | DESIGN.md、目录搜索筛选、六类统一、PDP/定制信息、后台和媒体边界、桌面移动调整、PayPal 方案。Supabase 目录迁移在此阶段形成，完整媒体与生产验收跨到 2.1，不能重复归为两次独立上线。 | `c7a83fe`（2026-09-17）；[实施说明](V2_REQUIREMENTS.md)、[设计系统](../DESIGN.md)。 |
| 2.1 | 邮箱账号/后台、36 产品与云媒体、询价持久化/通知/幂等、报价/订单/库存能力、生产域名部署与真实验收。站点当时 noindex；PayPal 关闭，163 管理员激活延后。 | `4857e34`、`4afee82`、`38b461d`；`9c4d5b9` 发布记录（2026-09-18）；[2.1 release](V2_1_RELEASE.md)。 |
| 2.1.5 | 五语言 UI、核心界面文案、语言选择与刷新持久化。保留此已发生版本名，不能改名/删除。没有完整内容本地化及语言 SEO。 | `d878f14` → `99317f2` → `24645ad` → `55ab484`（2026-09-18）；[范围记录](V2_1_5_LOCALE_UI.md)。 |
| 2.2（当前统一表达 2.2.0） | 限定正式索引开关、9 URL sitemap、canonical/robots/指南内容与技术审计；GSC 验证/sitemap 提交/首页索引请求历史已完成。外链仅台账和模板，非发布；Google 收录不是 release DoD。 | `db853bf`、`fa36a45` 与截至 `2f92a54` 的验收文档（2026-09-18）；[SEO/GSC 手册](V2_2_SEO_GSC_RUNBOOK.md)。 |
| 2.3.0 | B2B 成熟度升级：28 URL 正式 sitemap、15 个 curated PDP、factory/custom/contact/costume 索引边界、SSR/内链/移动语义、canonical/robots/OG/schema、`/api/media/` 抓取修复、claimed-crawler 观察、RFQ/获客事件骨架和 IndexNow 提交；最终生产映射已移除未确认的标题尺寸词。Payment 仍 blocked；多语言 SEO、GA4、Bing property 和外部发送仍需账号/事实。 | `9e68f5e` → `3a29adc` → `314e955` → `a6290e5` → `349201d` → `ac404cf` → `6a08d52` → `b43ce31`；Vercel commit status success；生产 28/28 probe 与 GSC live/request 证据见 `docs/PROJECT_STATUS.md` 和 `docs/evidence/2026-09-27-2.3-production.json`。 |
| 2.4.0 | consented GA4 与 UTM 首触/末触 attribution 生产能力：独立 `jsmeilai.com` Property/Stream、默认拒绝并在同意后加载、配置缺失 fail-closed、GA4-ready 事件门控；同时完成版本与状态文档纠偏。保留 28/15/21 页面边界，Payment 仍 blocked，多语言 SEO 仍未完成。 | `d7f8126` → `7bb286b` → `3c0fce4` → `b07227b`；Production 现场已验证 `G-PP1JPPV9FD` page_view/contact_click/whatsapp_click 与 consent 行为；本轮发布后补充精确 Vercel deployment 证据。 |

## 必须保留的差异

Git 实际顺序是：2.0 → 2.1 → **2.2 SEO 提交与验收** → **2.1.5 UI 提交** → **2.3 indexable B2B surface**；2.3 生产代码提交为 `b43ce31`，其后仅有治理文档提交。所以“准备 2.2 时插入 2.1.5”可作为用户阶段叙述保留，不能作为提交时间事实；2.3 是后续真实代码能力，不重写历史。

package.json/lock 根包当前应与已验收发布为 2.4.0；没有 2.0/2.1/2.1.5/2.2/2.3/2.4 Git tag。不要假装从不存在的 tag 确认了生产版本；本次依据 release 范围、GitHub/Vercel commit status 及线上行为整理。

旧文档出现“未接 Supabase”“RFQ 尚未上线”“GSC 未配置”“2.2 暂停”“2.3 必须多语言”等字句时，按其当时日期理解。当前决策以 PROJECT_STATUS.md / ROADMAP.md 为准。旧证据留在原处，不再复制长篇任务流水账。
