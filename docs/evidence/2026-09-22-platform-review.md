# 2026-09-22 平台只读核查摘要

观察时间约 21:41–21:47 Asia/Shanghai。通过用户打开的授权 Chrome 页面读取；不含密钥、客户资料或完整浏览器快照。

## Google Search Console

Property：https://www.jsmeilai.com/（URL-prefix）。授权账号已可访问，不重新验证所有权。

- 概述：0 搜索点击；0 已索引 / 9 未索引。
- Page indexing 报告更新日期：2026/9/18；8 个“已发现—尚未编入索引”，1 个“被 noindex 标记排除”。这不是 9 月 22 日实时全站抓取。
- noindex 示例为首页；URL Inspection 的上次抓取 2026/9/18 07:41:23，Googlebot 智能手机版，抓取成功、允许抓取，但旧 meta robots 含 noindex。用户 canonical 与 Google canonical 均指所查首页。
- 9 月 22 日 21:44 执行一次“测试实际网址”，完成显示 **网址可编入 Google 索引 / 网页可以编入索引**。因此当前 HTTP 可索引与旧排除记录不矛盾；等待后续抓取/报告更新。没有点“请求编入索引”或“验证修正情况”。
- sitemap.xml：提交 9 月 18 日；最近读取 9 月 21 日；成功；发现 9 网页、0 视频。
- Performance 默认最近 3 个月：0 点击、0 曝光、查询表无数据；图表目前显示 9 月 16–19 日，页面提示 4 小时前更新。不能用 0 平均排名推导排名表现。
- 人工处置措施：未检测到任何问题。安全问题：未检测到任何问题。

## Vercel

项目页面：https://vercel.com/creen-ai/glove-factory-website

- Production Deployment Ready；source main / 55ab484。
- deployment：https://glove-factory-website-if02cgr8o-creen-ai.vercel.app
- 详情标识：DxMa5Bp78UUstjDXGJT1TDqN81JF；别名显示 www.jsmeilai.com。
- 生产设置只读 reveal 三个非敏感开关：SEO_INDEXING_ENABLED=true；COMMERCE_RFQ_ENABLED=true；PAYPAL_CHECKOUT_ENABLED=false，均标为 Production、9 月 18 日添加。
- 概览 6h：89 edge requests、11 function invocations、error rate 0%。仅为观察窗口，不能推导长期 uptime 或真实买家访问量。
- Web Analytics 页面入口仍提示 Enable Analytics；未启用或采购任何服务。
- connector/CLI 曾返回 403，浏览器授权会话成功完成所需核查。没有更改设置、推送、部署、回滚或 DNS 操作。

## Supabase

项目 JSMeilai / lkpufupiddbmqzdgpbxo：ACTIVE_HEALTHY，东京。

- 13 public 表全部 RLS enabled；36 active products；173 product-media 对象。
- 分布：bridal 12、opera 11、costume 3、kids 4、veils 1、arm sleeves 5。
- 36 条 description 非空，扩展 specifications 非空数为 0；不是所有基础产品字段都缺失。
- RFQ 0、notification failed 0、orders 0、variants 0、inventory 0；没有客户 PII 查询。
- Security Advisor 唯一提示 leaked password protection disabled。未改 schema、用户、存储或业务数据。

本次未发测试邮件、未提交真实 RFQ、未创建支付，不替代历史 E2E 记录。结论：继续运营与观察，当前无证据支持因旧 noindex 记录改代码。
