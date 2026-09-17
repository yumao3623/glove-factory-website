# JS Meilai 2.2 SEO / GSC 执行手册

状态：`FORMAL_INDEXING_DEPLOYED; GSC_VERIFIED; SITEMAP_SUBMITTED; REPORTS_PROCESSING`
日期：2026-09-18

2.2 正式索引已按用户授权开启。Vercel Production 环境已设置 `SEO_INDEXING_ENABLED=true`，错误 host 即使误设开关也会继续走 preview fail-closed 分支。历史上被标为 launch blocker 的 `/costume-gloves/` 仍受 `SEO_COSTUME_INDEXING_ENABLED` 和 Human gate 控制，不能因为打开总开关而自动进入 sitemap；当前保持 noindex。

## 本地和发布前检查

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run seo:audit -- --origin http://localhost:3000 --mode preview --json .tmp/seo-preview.json
```

启动 `npm run start` 后，再对 production-like 构建运行同一个审计。正式模式要求：

- sitemap 中只有 `https://www.jsmeilai.com/` 的 canonical、无 query 的 200 URL；
- 每个 sitemap URL 有一个 title、description、canonical 和 H1；
- `/guides/materials/` 和 `/guides/size-guide/` 是正式模式下可索引的教育内容页，并分别输出 Article / HowTo 结构化数据；
- 正式页面没有 `noindex`；
- `robots.txt` 明确声明 `https://www.jsmeilai.com/sitemap.xml`；
- `/api/`、`/admin/`、`/account/`、`/cart/` 和 `/checkout/` 不进入 sitemap，并保持 noindex/受保护状态。

正式部署观察（2026-09-18）：commit `fa36a45` 已由 Vercel Production 部署。Chrome 和线上响应共同确认 `robots.txt` 为 200 且声明 `https://www.jsmeilai.com/sitemap.xml`，`sitemap.xml` 为 200 且不含 `X-Robots-Tag`，当前发现 9 个正式 URL；首页和两篇 guide 均返回绝对 canonical、无 `noindex`。`/costume-gloves/` 仍按独立 gate 保持 noindex，未进入 sitemap。

Chrome GSC 证据（2026-09-18）：以 `yumao3623@gmail.com` 完成 HTML 文件验证，文件名为 `google14a276efa04bb12e.html`；随后提交 `https://www.jsmeilai.com/sitemap.xml`，状态为“成功”，最近读取日期为 2026-09-18，发现网页数为 9。Performance、Indexing、Enhancements 和 Links 报告均显示“正在处理数据，请过 1 天左右再来查看”，当前无可用查询/页面数据。

Chrome URL Inspection 证据（2026-09-18）：首页旧抓取结果显示“已抓取 - 尚未编入索引”。在 Chrome 中先完成“测试实际网址”，结果为“网址可编入 Google 索引”，随后重新提交请求，GSC 显示“已请求编入索引”，并确认网址已加入优先抓取队列。该状态代表请求已受理，不代表已经完成收录。

最终自动化验证（2026-09-18）：`npm run typecheck`、`npm run lint`、`npm test`（63/63）、`npm run build`、preview audit 和 production audit 均通过；production audit 检查 9 个 sitemap URL，`failures=0`、`warnings=0`。

## GSC checkpoint

1. 在 Google Search Console 确认 `https://www.jsmeilai.com/` URL-prefix 或 `sc-domain:jsmeilai.com` property 的所有权。当前已完成 URL-prefix property 的 HTML 文件验证；token 未写入 Git。
2. 先检查 Manual actions、Security issues、Page indexing 和现有 sitemap 状态。
3. 正式索引开关已打开并部署，`https://www.jsmeilai.com/sitemap.xml` 已提交且 GSC 显示成功、发现 9 个网页。
4. 读取最近 28 天的 query/page/date/device/country 数据，优先找：有 impression 无 click、平均位置 11–20、商业 family 页低 CTR、孤立或 underlinked 页面。
5. 对首页、产品 hub 和六个 family canonical URL 做 URL Inspection；记录 Google 实际的 canonical、crawl、index 状态和检查时间。
6. 一周后复查 sitemap discovered/indexed、excluded reason 和 query/page 变化。GSC 结果只作为 `GSC_OBSERVED` 证据，不替代浏览器和源代码检查。

## API 选项

当需要自动化时，使用只读 OAuth `webmasters.readonly` 或已获 property 授权的服务账号。密钥只能放 CI/Vercel Secret；脚本必须先 `sites.list` 验权，再读取 Search Analytics，最后才允许 sitemap submit。当前仓库不包含 OAuth client、refresh token、service-account JSON，也没有自动提交动作。

## 外链、内链与推广

- 内链：按 `docs/V2_2_INTERNAL_LINK_MATRIX.csv` 逐页核对，优先 family → materials/size guide → contact/custom；锚文本写清目标，不使用重复的“learn more”。
- 外链：按 `docs/V2_2_BACKLINK_PROSPECTS.csv` 逐个完成 relevance、audience、permission 和 destination 检查；只生成个性化草稿，人工批准后发送。
- 反链：只有页面上线并人工确认可访问后，才把记录标为 `LIVE_HUMAN_CONFIRMED`；第三方工具的发现标为 `THIRD_PARTY_ESTIMATE`。
- 推广：每个合作链接使用独立 UTM，记录 referral landing page 和合格询盘，不购买或交换低相关链接。
