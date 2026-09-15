# 商业基础设施接入与验收

更新：2026-09-15。本文件区分本地实现、真实服务状态与未完成验收；编译通过不代表登录、付款或邮件已经走通。

## 已连接的 Supabase

- 项目：JSMeilai；项目 ID：`lkpufupiddbmqzdgpbxo`。
- 组织：JS Meilai Glove Factory；免费计划。
- 区域：`ap-northeast-1`（东京）；创建后状态 `ACTIVE_HEALTHY`。
- URL：`https://lkpufupiddbmqzdgpbxo.supabase.co`。
- 迁移：`20260915015612_commerce_foundation.sql`、`20260915015804_restrict_automatic_rls_function.sql`、`20260915021033_admin_transactions.sql`、`20260915023711_rfq_delivery.sql`，已通过 Supabase apply_migration 实际执行。
- 已建立 products、product_variants、inventory、customers、carts、cart_items、orders、order_items、rfq_requests、product_publications、rfq_status_events，共 11 张业务表/审计表；admin_save_variant、admin_publish_product、admin_update_rfq_status 为服务端原子操作。
- 全部表启用 RLS；真实 SQL 检查确认匿名用户不能创建订单、普通客户不能自行修改 wholesale_status。
- `product-media` 私有素材库：JPEG/PNG/WebP，单文件不超过 5MB。草稿图片只允许管理员预览；已发布产品通过短期签名地址展示。
- 安全 Advisor 当前唯一告警是 Auth 的泄露密码保护未启用；Supabase 文档说明该能力属于 Pro 及以上计划，免费项目不能把它标为已开启。
- 本机使用公开 anon key 查询 products 成功（HTTP 200，当前数据库产品 0 条）。原有 36 个审核产品仍保留在本地目录中，不会因数据库为空而消失；发布后台支持新增真实产品，需逐条审核后进入数据库目录。

## 账户、目录与后台

- 邮箱注册、密码登录、session 检查/刷新、退出和 Google PKCE 入口已实现。Google provider 当前为关闭状态；邮箱注册开启、要求确认邮箱。
- 新增目录来源由 `COMMERCE_CATALOG_ENABLED=true` 控制，读取数据库 active 产品，与原有目录合并。分类、筛选、产品详情和推荐使用统一模型；草稿不进入目录。真实联调脚本 `scripts/verify-commerce-live.mjs` 使用带清理的临时用户、产品、订单验证了该路径。
- 管理后台 `/admin/`：管理员必须使用 Supabase 已确认的邮箱，且邮箱存在于服务端 `ADMIN_EMAILS`。支持产品草稿、列表、编辑、归档、图片上传和变体库存录入。真实写入验收需要 service role 密钥及管理员店铺账号。
- 权限只信任 Supabase 验证后的用户，不信任可由用户修改的 metadata。
- 普通客户可修改自己的联系方式；批发审批、库存、订单金额由服务端管理。
- 页面仍保留 noindex。开启本地商业功能不等于授权公开上线。

## 支付：Paddle 不适用

Paddle 官方 AUP 明确将实物商品及需要实物配送的商品列为禁止类别，手套不能通过 Paddle 收款。原先新增的 Paddle checkout/webhook 已关闭，调用返回 503，不会创建交易或更新订单。不要配置 Paddle 密钥。

已确认开户主体为中国大陆的江山市美莱服装厂。候选替代方案为 PayPal 企业账户，待用户确认后配置沙盒；正式开户、主体认证、银行卡绑定和收款资格由平台审核。当前店面保留询价路径，不收款。

依据：
- [Paddle 禁售类别](https://www.paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle)
- [PayPal 中国企业账户](https://www.paypal.cn/portal/account-selection)

## 邮件与域名

已确认域名 `jsmeilai.com`，DNS 在火山引擎。拟用发信子域 `mail.jsmeilai.com`，发件人 `JS Meilai <rfq@mail.jsmeilai.com>`，询价通知收件人 `yumao3623@gmail.com`。

Resend 需要账户、API key 及平台实际生成的 SPF/DKIM DNS 记录；不可猜测 DKIM 内容。当前尚未建立并验证 Resend 发信域。Gmail 是登录/收件地址，不是可供本项目验证的发信域名。

公开的任意邮件发送 API 已关闭（403）。邮件函数仅允许在经过验证的 RFQ/订单业务动作内调用。RFQ 邮件动态文本必须 HTML 转义；发信失败时不能把已保存的询价报告成完全失败。

依据：[Resend 域名验证](https://resend.com/docs/dashboard/domains/introduction)。

## 测试假设，不能直接作为正式报价

以下是用户允许的临时测试参数，不是市场平均值的统计结论，也不是已确认税率/运价/库存：

| 地区 | 展示币种 | 税率占位 | 运费占位 | 时效占位 |
| --- | --- | --- | --- | --- |
| 美国 | USD | 0%（待确认） | 25 USD | 5–9 天 |
| 英国 | GBP | 20%（待确认） | 18 GBP | 3–7 天 |
| 欧盟 | EUR | 20%（待确认，不能代表所有成员国） | 22 EUR | 4–8 天 |
| 中国 | CNY | 0%（待确认） | 30 CNY | 2–5 天 |
| 其他 | USD | 0%（待确认） | 30 USD | 5–12 天 |

测试 MOQ：20 件；测试批发折扣：8%。初始真实库存保持 0/未确认，计划估算可按 100 件做演示，但不写成可售库存。各币种金额是独立占位价，不是汇率换算结果。正式税务、物流重量/区域、批发等级和可售库存确认后，才能启用真实收款。

## 本地环境

`.env.local` 已被 Git 忽略，文件权限 600。公开 URL、anon key 与服务端 secret/service_role 已写入并验证；Resend API key 已配置；`mail.jsmeilai.com` 已通过 Resend 验证，三条 DNS 记录均为 verified。不要将密钥发送到聊天或提交 Git。

```text
NEXT_PUBLIC_APP_URL=http://localhost:3005
COMMERCE_CATALOG_ENABLED=true
COMMERCE_RFQ_ENABLED=false
ADMIN_EMAILS=yumao3623@gmail.com
```

RFQ 只有显式打开且数据库配置齐全时才显示提交表单，默认预览不采集数据。正式打开前验证：提交 -> 数据库行 -> 邮件送达 -> 后台查看。Google 还需 Google Cloud OAuth client、Supabase provider 和允许回调地址。

## 未完成的真实验收

1. 管理员店铺账号注册、邮箱确认、登录和上传/发布图片。
2. Supabase 服务端密钥接入；Google OAuth provider 与 callback 配置。
3. Resend 账户、API key、火山引擎 SPF/DKIM 与真实邮件送达。
4. Stripe 测试账户需由用户在账户管理页删除误连账户并新建/连接 JS Meilai 测试账户；代码已提供 Checkout Session 与 webhook 验签入口，仍待测试密钥、Price/订单事务和沙盒交易闭环。
5. 正式税费、物流、批发政策、MOQ 与库存；公开部署和生产验收。

## 英文内容编辑依据

使用已安装的 Taste Skill 维护 UI，并参考 [Humanizer SKILL.md](https://github.com/blader/humanizer/blob/main/SKILL.md) 的具体编辑规则：保留事实，删除空泛赞词、模板式对比、重复收尾以及泄露到页面中的实现说明。首页/页脚已重写为采购场景英文，保留真实公司地址和联系方式。未运行来源不明的自动改写程序。
