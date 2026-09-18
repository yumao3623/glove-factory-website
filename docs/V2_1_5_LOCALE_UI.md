# 2.1.5 多语言界面基础

状态：`IMPLEMENTED; CORE_UI_TRANSLATED; FULL_LOCALE_SEO_DEFERRED_TO_2.3`

本记录定义 2.1.5 的范围。用户要求暂时跳过 2.2 后，先为现有英文站点增加可用的语言选择。该工作属于 **2.1.5 多语言界面基础**，不改变已经完成的 2.2 技术 SEO/GSC 基线，也不提前引入会改变索引面的多语言 SEO。

## 版本归类

- **2.1.5**：语言选择器、浏览器语言初始识别、客户端语言持久化、`html[lang]` 更新，以及核心导航、公告、首页、产品目录和询价流程的界面翻译。
- **2.2**：原有正式索引、robots、canonical、sitemap、GSC 和技术 SEO 基线。当前按用户要求暂停新增 2.2 工作，已部署基线保持不变。
- **2.3**：完整多语言内容与多语言 SEO，包括独立可抓取语言 URL、逐页人工审核翻译、localized metadata、canonical、双向 hreflang、localized sitemap、结构化数据语言字段和 GSC 分语言验证。

## 当前语言范围

| Locale | 界面名称 | 选择理由 |
| --- | --- | --- |
| `en` | English | 现有主语言，并覆盖美国、英国、加拿大等采购市场。 |
| `zh-CN` | 简体中文 | 覆盖中国大陆工厂、供应链和中文采购沟通。 |
| `de-DE` | Deutsch | 德国是欧洲时尚配饰和手套采购的重要市场。 |
| `fr-FR` | Français | 法国是欧洲时尚配饰和手套贸易的重要市场。 |
| `it-IT` | Italiano | 意大利是欧洲时尚、礼服和配饰供应链的重要市场。 |

市场选择参考了 CBI 对欧洲时尚配饰进口市场的比较，以及 World Bank WITS 的 2023 年手套进口数据：

- [CBI Europe fashion accessories market potential](https://www.cbi.eu/market-information/apparel/fashion-accessories/market-potential)
- [CBI European market research PDF](https://www.cbi.eu/sites/default/files/pdf/research/2608.pdf)
- [World Bank WITS 2023 gloves imports](https://wits.worldbank.org/trade/comtrade/en/country/All/year/2023/tradeflow/Imports/partner/WLD/product/621600)

## 已实现内容

- `lib/i18n.ts` 集中维护语言列表、语言名称和界面翻译；默认语言为英语。
- `components/i18n/locale-provider.tsx` 读取 `localStorage` 和浏览器语言，切换后写入 `jsmeilai-locale` cookie，并同步 `document.documentElement.lang`。
- `components/i18n/language-switcher.tsx` 在桌面和移动导航提供可访问的语言下拉框。
- Header、Footer、公告条、首页核心区块、产品目录筛选／搜索／排序、集合页采购操作文案和询价表单随语言切换。
- 产品名称、产品属性、集合页的具体采购说明和法律／商业事实保持批准数据中的英文来源，避免在没有人工审核的情况下生成新的商业承诺。

## 明确不在 2.1.5 的内容

本版本不创建 `/zh-cn/`、`/de/`、`/fr/` 或 `/it/` 等独立索引路由，不增加 hreflang，不改写现有 canonical，不扩展 sitemap，也不把客户端选择器误当作可抓取的语言版本。这样可以避免同一 URL 因客户端状态产生重复索引和语言信号冲突，并保护 2.2 的 SEO 基线。

## 2.3 进入条件与计划

进入 2.3 前需要确定：

1. 每种语言的人工翻译 owner、术语表、法律和产品事实复核人。
2. 稳定的语言 URL 方案（建议 `/zh-cn/`、`/de/`、`/fr/`、`/it/`，最终以路由评审为准）。
3. 每个公开页面的翻译、title、description、OG、JSON-LD、canonical 和双向 hreflang。
4. localized sitemap、Search Console 分语言检查和回滚方案。

在 2.3 发布前，语言选择器继续作为客户端 UI 功能使用；完整翻译内容和可索引语言页面不能仅凭机器翻译直接作为正式 SEO 页面发布。

