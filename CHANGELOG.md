# Changelog

本文件只记录已经完成并可追溯的项目里程碑、发布和治理变更；任务流水账保留在 Git 与专题验收文档中。

## Unreleased

- 2026-09-28：创建独立 `JS Meilai | jsmeilai.com` GA4 Property 与 `JS Meilai Web | www.jsmeilai.com` Web Data Stream（`https://www.jsmeilai.com`，stream ID `15854461548`，Measurement ID `G-PP1JPPV9FD`）；在 Vercel Production 保存 `NEXT_PUBLIC_GA_MEASUREMENT_ID`，保持默认拒绝 consent，待新部署完成后验证页面、RFQ/contact/WhatsApp/UTM 事件。旧 `G-4EZW646Z1F` 明确属于 `majuscape.fun`，未复用。
- 2026-09-28：修复首屏 GA4 脚本加载竞态：`product_family_view` 会等待 consented GA4 ready 信号后再发送，避免首屏产品族事件在用户已同意时被跳过。
- 2026-09-28：接入 env-gated 的默认拒绝 GA4 consent 横幅、可重新打开的分析设置和隐私说明；通过 GSC 只读 OAuth 将 `https://www.jsmeilai.com/` 导入 Bing Webmaster，并提交正式 sitemap。核验发现现有 `G-4EZW646Z1F` 属于其他站点，已移除错误 fallback，避免跨站数据污染。
- 2026-09-27：为既有 RFQ/contact/WhatsApp/product-family 事件骨架增加 consent + `gtag` 双门控的 UTM、落地页和 session 级首触/末触归因准备；未配置 GA4 时保持惰性，不改变当前生产数据收集边界。
- 2026-09-24：将长期项目管理规则正式写入仓库根目录 `AGENTS.md`，明确启动读取顺序、事实来源、版本规则、状态维护、固定结束报告、对话续接判断和下一条可复制指令。
- 2026-09-24：确认并保留 `docs/PROJECT_STATUS.md`、`docs/ROADMAP.md`、`docs/HANDOFF.md`、`docs/PROJECT_WORKFLOW.md`、`docs/RELEASE_HISTORY.md` 作为持续交接体系；补充本变更记录文件。

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
