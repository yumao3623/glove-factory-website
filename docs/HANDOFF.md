# 当前交接

核对日期：2026-09-28（Asia/Shanghai）。

## 最近完成

- 2.3.0 的 28 个正式 URL、15 个 curated PDP、21 个 gated PDP 边界保持不变。
- consented GA4、UTM 首触/末触 attribution 和事件 ready gate 已在生产可用；独立 Measurement ID 为 `G-PP1JPPV9FD`。
- 本轮完成全量状态审计：将实际已上线能力纠正为 2.4.0 候选发布，并收敛版本、状态、路线图、变更记录和历史规格的漂移。
- RFQ、后台、账户、目录、报价和支付适配器的真实范围已重新核对；支付仍冻结。
- 本轮依据生产 28 URL SEO audit、未授权 admin 401、69/69 测试和 build/lint/product validation 结果，补充产品与获客 readiness gate；修正 Next 路由类型未生成时 `typecheck` 的可复现维护失败。
- 本轮进一步完成隔离 RFQ 链路 smoke：验证 201 保存、202 通知待处理、非法来源 403 和通知失败状态标记；前台补充 202 的明确提示。生产未执行真实询盘或邮件发送。
- 管理员本人已完成登录；只读后台验收通过，36 个 active products、4 张私有媒体和 signed preview 均可见，RFQ/订单/报价及变体/库存均为空；生产当前没有可供操作的真实业务记录，受控状态流转已由隔离夹具完成。
- 在确认夹具具备唯一 marker、隔离范围、finally 清理且不触发邮件/真实报价后，已显式 opt-in 运行 `scripts/verify-commerce-live.mjs`：真实 Auth、产品、媒体、变体、库存、发布、订单 RLS 和清理 11/11 通过；另一个唯一 marker 的 RFQ/报价夹具验证 reviewing → quoted、报价取消及状态事件 3/3，全部清理完成。没有真实 RFQ、邮件、报价或业务记录被保留。
- 根据当前 B2B manufacturer / supplier / RFQ 模式重新分类：2.4.0 readiness gate 已关闭。逐 SKU 实时库存、完整 MOQ/交期/材质、企业邮箱、WhatsApp、域名、locale 和 Payment 不再作为整个网站的统一 blocker。

## 当前等待

- 2.4.0 版本纠偏已有生产证据；本轮 2.5.0 buyer-experience slice 尚在本地验证，待部署后补充生产 smoke，不能把本地通过写成已上线。
- Google 的索引/曝光和 Bing 的后续数据继续观察，不重复提交未变化 URL。
- `jsmeilai.com` 继续作为正式网站域名；`meilaigloves.com` 暂不购买，仅保留未来候选。未来 ownership/DNS 只阻塞迁移评估，不阻塞当前英文 B2B RFQ 站、UI、SEO、内容或获客准备。
- 企业邮箱、WhatsApp 负责人/SLA、目标市场与翻译/法律负责人仍待确认；这些分别只阻塞真实发件身份、公开 WhatsApp 运营、渠道责任或 localized SSR，不阻塞当前网站改进。
- 历史 Human Review 曾确认 `+60 1114166916` 为公开号码；当前负责人/SLA 仍未确认，只阻塞 WhatsApp 运营承诺。
- live commerce 技术夹具已完成并清理；真实 Resend 投递仍未验证，但属于通知运营证据，不再阻塞 2.4.0 B2B readiness。

## 唯一下一任务

2.5.0 buyer-experience slice 已在本轮启动，下一任务是完成其生产部署/探针并把首屏采购入口、三步 sourcing path 和产品 hub `ItemList` 证据写入发布记录；不把未来域名、邮箱、WhatsApp 或 Payment 设为这些工作的总前置条件。待目标市场/运营责任事实齐备后，再决定是否追加 2.5.0 的 locale 或账号工作。
