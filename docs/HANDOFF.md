# 当前交接

更新：2026-09-28（Asia/Shanghai）。

- Production **2.3.0**；`d7f8126` 已从归因分支 fast-forward 合并并推送到 `origin/main`。最后已验证生产代码仍记录为 `b43ce31`；Vercel 新部署状态因 API 403 尚未核验，线上旧 surface 仍可访问。
- 最近完成：修复旧 sitemap/索引边界、解除本轮批准的核心服务页和 15 个 PDP 的正式索引 gate、补齐 canonical/metadata/schema/OG、允许 `/api/media/`、加入 claimed-crawler 观察、RFQ/contact 事件骨架、IndexNow key 和 28 URL 提交；修复目录收藏按钮的嵌套交互语义，并标明生成视觉为 editorial。
- GSC 现场：历史索引状态仍是 0 indexed/11 not indexed，首页旧 crawl 明确为 2026-09-18 noindex；首页与 Opera live test 已显示可编入。首页、Opera、Products、Bridal、Kids、Veils、Custom、Factory 的一次请求已进入队列；Contact 与一个 PDP 请求遇到 GSC 稍后重试错误，没有重复提交。
- 当前事实：生产 sitemap 28/28 200、index/follow、自 canonical、SSR H1；Vercel 可见日志确认过一个发生在最终 `b43ce31` 之前的 2.3 部署窗口、呈现 Googlebot UA 的 200 请求（2026-09-27 01:55:11 CST，短留存窗口）。这不是“全站已收录”，也不是对 UA 的反向 DNS 认证。
- 当前外部配置：IndexNow endpoint 已返回 202；Bing Webmaster 已登录但只有 `folveta.com`，GSC 导入需要 Google OAuth 只读授权；现有 GA4 属性实查到 Measurement ID `G-4EZW646Z1F`，尚未接入网站；社交 profile、长期日志留存和真实 factory photo 事实审核仍待账号/负责人。
- Payment 保持 **BLOCKED / awaiting real payment information**；不改支付开关，不伪造价格、库存、MOQ、交期或支付资料。

## 唯一下一任务

下一步先核验 Vercel 是否已部署 `d7f8126`；随后等待你确认 GA4 consent/隐私方案，并由你在 Google OAuth 页面授权 Bing 读取 Search Console 站点列表。授权完成后再导入 `jsmeilai.com` 并提交 `/sitemap.xml`。不要因为 Google 延迟再次启动一个等待型开发版本。

下一次对话仍先读 `AGENTS.md`、本页、`PROJECT_STATUS.md`、`ROADMAP.md`、`PROJECT_WORKFLOW.md`，并以当前 Git/生产证据为准。
