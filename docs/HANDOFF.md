# 当前交接

更新：2026-09-28（Asia/Shanghai）。

- Production **2.3.0**；`d7f8126` 已从归因分支 fast-forward 合并，随后 `3c0fce4`/`ea86197` 完成错误 GA4 fallback 移除与 fail-closed 生产记录。Vercel 已保存 Production `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PP1JPPV9FD`，新部署待本轮提交后完成；绑定 `www.jsmeilai.com`。
- 最近完成：修复旧 sitemap/索引边界、解除本轮批准的核心服务页和 15 个 PDP 的正式索引 gate、补齐 canonical/metadata/schema/OG、允许 `/api/media/`、加入 claimed-crawler 观察、RFQ/contact 事件骨架、IndexNow key 和 28 URL 提交；修复目录收藏按钮的嵌套交互语义，并标明生成视觉为 editorial。
- GSC 现场：历史索引状态仍是 0 indexed/11 not indexed，首页旧 crawl 明确为 2026-09-18 noindex；首页与 Opera live test 已显示可编入。首页、Opera、Products、Bridal、Kids、Veils、Custom、Factory 的一次请求已进入队列；Contact 与一个 PDP 请求遇到 GSC 稍后重试错误，没有重复提交。
- 当前事实：生产 sitemap 28/28 200、index/follow、自 canonical、SSR H1；Vercel 可见日志确认过一个发生在最终 `b43ce31` 之前的 2.3 部署窗口、呈现 Googlebot UA 的 200 请求（2026-09-27 01:55:11 CST，短留存窗口）。这不是“全站已收录”，也不是对 UA 的反向 DNS 认证。
- 当前外部配置：IndexNow endpoint 已返回 202；Bing 已通过 GSC 只读导入添加 `https://www.jsmeilai.com/`，并提交正式 sitemap，当前正在处理；已创建独立 `JS Meilai | jsmeilai.com` GA4 Property 与 `JS Meilai Web | www.jsmeilai.com` Web Data Stream（`https://www.jsmeilai.com`，stream ID `15854461548`，Measurement ID `G-PP1JPPV9FD`），旧 `G-4EZW646Z1F` 仍只属于 `majuscape.fun`；社交 profile、长期日志留存和真实 factory photo 事实审核仍待账号/负责人。
- Payment 保持 **BLOCKED / awaiting real payment information**；不改支付开关，不伪造价格、库存、MOQ、交期或支付资料。

## 唯一下一任务

下一步等待本轮 main 部署 Ready 后，核验默认拒绝/Allow 后加载、页面访问与现有 RFQ/contact/WhatsApp/UTM 事件；同时观察 Bing sitemap 处理和 Google 新抓取/索引证据，不重复提交未变化 URL。

下一次对话仍先读 `AGENTS.md`、本页、`PROJECT_STATUS.md`、`ROADMAP.md`、`PROJECT_WORKFLOW.md`，并以当前 Git/生产证据为准。
