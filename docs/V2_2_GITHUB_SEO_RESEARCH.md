# JS Meilai 2.2 GitHub SEO 参考研究

日期：2026-09-18  
用途：把 GitHub 上可复用的 GSC、技术 SEO、内链和外链工作流转成仓库内的可审计步骤。项目代码、外部平台观察和第三方估算继续分开记录。

## 参考项目与采用结论

| 领域 | 项目 | 观察 | JS Meilai 2.2 采用方式 |
| --- | --- | --- | --- |
| 全站技术审计 | [nurkamol/seo-audit](https://github.com/nurkamol/seo-audit) | 从 sitemap 遍历每个页面，覆盖 indexability、重复元数据、链接、图片、结构化数据、robots 和回归 diff；GSC 是显式可选的只读连接。 | 新增 `scripts/seo-audit.mjs`，默认只读；先跑 preview 基线，再在正式开关打开后跑 production 基线。 |
| 浏览器/渲染审计 | [Addy0-com/free-open-technical-SEO-crawler](https://github.com/Addy0-com/free-open-technical-SEO-crawler) | 同时检查 sitemap/spider、原始与渲染 DOM、CWV、可访问性和 JSON-LD。 | 作为外部发布前检查工具候选；仓库不复制其依赖，不把一次扫描当作长期监控。 |
| 可恢复回归 | [MelnixDev/seo-crawl-audit](https://github.com/MelnixDev/seo-crawl-audit) | Snapshot、broken links、orphan、canonical、metadata、schema 和“新问题才阻断”的 diff。 | 采用其基线思路；本仓库脚本输出 JSON，后续可在 CI 比较 `failures`。 |
| GSC 只读 | [googleapis/google-api-python-client Search Analytics sample](https://github.com/googleapis/google-api-python-client/blob/main/samples/searchconsole/search_analytics_api_sample.py) | 以 date、query、page、country、device、searchAppearance 维度读取自有站点数据。 | GSC 第一个 checkpoint 只读：先验证 property，再拉 query/page/date；不把 API 结果写入产品数据库。 |
| GSC sitemap API | [stateful/google-searchconsole-nodejs](https://github.com/stateful/google-searchconsole-nodejs) | `sites.list` 验权后再提交 sitemap；服务账号密钥放 Secret。 | 可作为后续部署脚本参考；未获得服务账号/property 授权前不自动提交。 |
| 内链机会 | [mehicned/linkagent](https://github.com/mehicned/linkagent)、[IgorOdaryuk/site-architecture-mri](https://github.com/IgorOdaryuk/site-architecture-mri) | 通过链接图寻找 orphan、弱链接和 underlinked money pages。 | 先维护 `V2_2_INTERNAL_LINK_MATRIX.csv`，建议人工审核锚文本；不在生产自动注入链接。 |
| SERP 聚类 | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo/blob/main/skills/seo-cluster/SKILL.md) | 用 SERP overlap 做 hub-and-spoke 聚类，避免只按词面相似建页。 | 继续沿用现有 family canonical owner；材质和用途先做指南/模块，不创建重复目录页。 |
| 外链开发 | [danpoletaev/backlink-outreach-js](https://github.com/danpoletaev/backlink-outreach-js)、[oratis/influencex](https://github.com/oratis/influencex) | 候选发现、相关性评分、个性化草稿、Draft→Review→Approve→Send。 | 建立候选台账和草稿阶段；不自动群发、不购买链接、不生成未经核验的合作背书。 |
| 反链台账 | [SwappsyLinkBuilding/link-tracker](https://github.com/SwappsyLinkBuilding/link-tracker) | 记录 placement、target、anchor、link type、状态和人工复核。 | 采用数据字段思路，保存到仓库文档/CSV；GSC 不被当作完整反链数据库。 |

## 不直接采用的做法

- 不把第三方 backlink index、PageRank 或爬虫推断写成 Google 已确认数据。
- 不把 `robots.txt` 当作隐私控制；正式开关前仍由 metadata 和 HTTP `X-Robots-Tag` fail-closed。
- 不用程序化页面、关键词堆叠、泛目录提交、付费链接或自动化群发替代真实行业关系。
- 不在没有合法身份、产品事实、案例、认证、MOQ、交期或客户授权时写入这些声明。

## 证据分类

`GSC_OBSERVED` 只表示 Google Search Console 直接返回的 property、query、page、click、impression、CTR、position 或 sitemap 状态；`THIRD_PARTY_ESTIMATE` 表示外部索引估算；`HUMAN_CONFIRMED` 表示人工核验的合作方或已上线链接；`REPO_CHECKED` 表示本地构建、静态检查或 crawler 结果。不同类别不能互相替代。
