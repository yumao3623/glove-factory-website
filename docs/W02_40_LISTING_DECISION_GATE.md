# W02 40-Listing Decision Gate

Status: `COMPLETE; HUMAN_REVIEW_ACCEPTED`

Workstream: `W02 — 40-Listing Decision Gate`

Bounded checkpoint: 完成 40 条 tracked source listing 的逐条资料审计并记录 Human 已接受的候选 disposition，停在 W02 closure。本文件仅同步既有 registry 字段中的 family 接受决定；不创建正式 ProductRecord，不导出 approved asset manifest，不实施页面或 route integration，也不激活后续 checkpoint。

## Human scope correction 与最小权威同步

2026-09-05 Human 明确要求：分类页展示具体产品；产品卡进入本站内部独立详情页；详情页展示多张可用图片、标题和已确认属性；可从具体产品发起询盘；不跳转 1688。详情页继续是静态 `noindex` stakeholder preview，W08 再决定索引；继续使用静态 JSON、文件和 Vercel，不增加数据库、价格、库存、购物车、支付或账户。

该决定与旧的 `category-only` / “禁止 PDP”文字冲突。已对旧权威作最小 bounded amendment：

- `docs/adr/0005-category-only-catalogue.md`：保留不可索引 PDP 的 W08 决定，仅允许未来静态、内部、`noindex` preview，不出 sitemap、无 SEO canonical owner。
- `docs/PROJECT_SPEC_V1.md`：V1 仍是 category-only indexable catalogue，同时允许 approved candidate 的 stakeholder-preview detail route。
- `docs/PRODUCT_DATA_MODEL.md`：`slug` 可作为静态 `noindex` preview route key，仍须遵守 provenance/status 规则。
- `docs/PRODUCT_BATCH_INGESTION.md`：仍不是 indexable PDP system；后续 detail preview 只能消费已审计资料。
- `docs/ROUTE_REGISTRY.md`：detail preview 不是本轮 frozen route；W02 不授权，W08 决定索引/归属。

这些是对既有权威的同步，不是本文件覆盖旧权威，也没有创建新阶段或启动其他 workstream。

## Human Review 接受记录

2026-09-06 Human 接受本轮 W02 审计结论，并作出以下 closure 决定：

- 接受六条原 family pending listing 的归类：`728772172182` 为 `kids-dress-gloves`；`728908046635`、`733063602867`、`735814134529`、`857043957533` 为 `bridal-gloves`；`956309661690` 为 `opera-gloves`。
- `776815144156` 因 Frozen/Elsa 角色/IP 风险继续 `QUARANTINE`；其余 39 条 tracked listing 接受为 `APPROVE_CANDIDATE`。
- 对带店铺文字、水印或不适合公开的单张图片予以排除，并保留同产品其余合格图片。
- 5 条 `POSSIBLE_VARIATION` 关系证据不足，均维持独立产品处理，不合并、不再提问。
- `814978872980` 是未登记 smoke 测试包，明确排除于 W02 40 条产品范围、缺料结论和 Human Review 问题之外。

该接受仅收口 W02 候选审计，未创建或正式批准 ProductRecord，未导出 approved asset manifest，未授权页面、route 或公开发布。

## 审计入口、依赖和口径

已阅读并按其约束执行：`AGENTS.md`、`docs/V1_POST_PREVIEW_EXECUTION_ROADMAP.md`、`docs/PROJECT_SPEC_V1.md`、`docs/PRODUCT_DATA_MODEL.md`、`docs/PRODUCT_BATCH_INGESTION.md`、`docs/ROUTE_REGISTRY.md`、`docs/PUBLISHING_BOUNDARIES.md`、全部 `docs/adr/*.md`、`docs/W01_EVIDENCE_PACK_GATE.md`、`docs/PHASE_3_PRODUCT_BATCH_INGESTION_FINAL_GATE.md`、`assets/asset-manifest.json`、`research/assets/phase-3-review/ASSET_REVIEW.md`。

审计使用 registry、每批 `intake-ledger.json`、raw archive SHA-256、图片 SHA-256/尺寸/role、既有 cross-listing relationship evidence 和 W01 授权记录。`STORE_LEVEL_PERMISSION_INHERITED` 只证明来源权限继承，不等于 production approval。正常图片全部按既有规则保留 role 映射：`main`、`sku`、`description`；不再压缩为一张图。SKU/description 图可进入后续详情页 gallery，但不能自动成为公开 hero。

除已确认同一 normalized group 的 source listing 外，每条 registry listing 的 independent candidate ID 为 `candidate-<listingId>`；这只是 W02 审计标识，不创建 ProductRecord。原始标题如下，均直接取自 intake ledger：

| Listing | 原始标题 |
|---|---|
| `730186552239` | 夏季万圣节圣诞节55CM防晒加长款缎面光滑手套女排队舞会晚宴礼服 |
| `737751870967` | 厂家直销儿童缎面蝴蝶结手套儿童演出派对礼服配饰防晒长款女孩 |
| `800814497148` | 黑色头纱万圣节鬼节新娘蕾丝花边头饰欧美婚礼道具公主发饰高级感 |
| `856992679458` | 新品跨境长款网纱手套婚纱礼服欧美万圣节婚礼配饰黑色蕾丝袖套女 |
| `728772172182` | 儿童弹力复古黑色花边蕾丝网纱手套白色新娘镂空薄款防晒配饰婚纱 |
| `728908046635` | 镂空手套结婚婚纱长款蕾丝绣花钉珠露指婚礼手套勾指黑色白色无指 |
| `733063602867` | 夏季短款蕾丝手套网纱复古优雅新娘花嫁拍照演出礼服表演花嫁风 |
| `735814134529` | 夏季防晒长款缎面褶皱新娘手套色丁包指手套结婚婚礼舞台派对时尚 |
| `776815144156` | 跨境 欧美热卖印花冰雪艾莎儿童舞台表演王子公主裙配饰色丁手套 |
| `857043957533` | 夏季新品长款勾指色丁手套化妆舞会新娘婚手臂套礼防晒露指袖套 |
| `733010943271` | 夏季透气复古半截短款网纱女手套无手指薄款新娘花嫁花边手袖手套 |
| `814984964565` | 儿童蝴蝶结缎面手套全指演出手套女童春秋薄款晚礼服长款手套批发 |
| `819967426657` | 欧美时尚烫钻手套蕾丝网眼表演礼服手套cosplay渔网新娘手套全指 |
| `844530638864` | 跨境缎面色丁弹力加长款55cm手套新娘结婚婚纱黑色紫色香槟色性感 |
| `956309661690` | 跨境55cm色丁手套新娘缎面防晒婚礼宴会结婚礼服手套万圣节性感 |
| `962080651234` | 亚马逊跨境万圣节羽毛勾指手套派对舞会黑色蕾丝手环袖套配饰黑色 |
| `1002636896918` | 多巴胺格子纱手套六一儿童节公主拍照道具小女孩生日写真装扮 |
| `691557112631` | 夏季防晒复古万圣节欧美新娘婚纱礼服旗袍派对礼仪年会演出女袖套 |
| `729142545579` | 镂空钩指弹力礼服婚纱手套中长绣珠外贸源头蝴蝶结婚庆晚礼服露指 |
| `730371444820` | 厂家直销长款色丁缎面手套女防嗮新娘婚纱晚宴礼服旗袍优雅美婚庆 |
| `730659973350` | 夏季短款缎面手套女防嗮新娘婚纱晚宴礼服旗袍手套简约优雅美表演 |
| `732732478288` | 夏季防晒骑行长款漆面手套复古赫本风晚礼服新娘婚纱拍照手臂套配 |
| `761321664860` | 时尚钉珠网纱袖套唯美新娘简约时尚袖套素纱袖套飞边花边袖套 |
| `950693682364` | 跨境新品短款睫毛边蕾丝新娘手套简约高档夏季防晒结婚拍照配饰 |
| `728194389811` | 复古蕾丝手套女夏季薄款流行黑网纱高级感优雅旗袍跳舞表演lolita |
| `728592614367` | 夏季透气网纱手套蕾丝花边蝴蝶结赫本风礼仪黑色法式复古礼服 |
| `728659873446` | 网纱手套黑色蕾丝波点花边蝴蝶结短筒法式赫本风礼服舞台表演婚纱 |
| `732419024504` | 跨境新娘网纱珍珠袖套钉珠防晒简约时尚婚纱服装搭配薄款纱袖优雅 |
| `732561509757` | 夏季防晒长款网纱蕾丝手套优雅简约新娘手套菊花点缀夏季薄款 |
| `741321749838` | 黑色白色舞台表演长款蝴蝶结蕾丝手套色丁缎面婚纱新娘礼仪演出 |
| `775921736857` | 冰雪公主手套裙配饰儿童服装舞台表演双层蝴蝶节花童婚纱摄影道具 |
| `776820765686` | 新娘结婚手套防晒短款蕾丝全指薄手套红黑白粉色演出手套厂家直销 |
| `728600712961` | 夏季薄蕾丝新娘结婚礼服婚纱手套长款遮手臂袖套透气五指性感 |
| `732867076935` | 夏季无指蕾丝袖套手套女小梅花礼服袖套夏季薄款防晒手袖装饰 |
| `733406564887` | 夏季复古半截长款蕾丝女手套无手指薄款小梅花新娘婚礼女透气清新 |
| `741154552428` | 万圣节蕾丝花边手套新娘手套蝴蝶结烫钻网纱遮阳性感袖套 |
| `788133828087` | 儿童蝴蝶结手套新娘婚礼花童蕾丝花边色丁缎面学生表演礼服手套白 |
| `819969614484` | 半指漆皮亮皮弹力手套万圣节节日派对cosplay服饰装饰中长款性感 |
| `956904395389` | 23厘米短款色丁百搭婚庆手套 复古白色短缎面跳舞礼仪照婚礼手套 |
| `977246337453` | 夏季新品蕾丝蝴蝶结手套白色网格礼服新娘网红生日派对公主手袖 |

ZIP 只读核验结果：`.product-ingestion/` 下发现 41 个 ZIP；其中 40 条与 canonical registry 对应，另有 `814978872980` smoke ZIP。41 个 ZIP 均可打开，未发现 unsafe archive path；41 个实际 SHA-256 均与对应 intake ledger 的 raw archive hash 一致，40 条 registry source listing 无缺 ZIP。`814978872980` 是未登记 smoke 测试包，不属于 W02 产品范围、产品缺料结论或 Human Review 问题，无需采取产品动作。没有网络请求或配置修改。

本文件的候选 disposition 已获 Human 接受，但不是正式 ProductRecord 状态：

- `APPROVE_CANDIDATE`：资料足以在后续批准数据工作中建立新 ProductRecord 或复用已有 normalized group；不是正式 `APPROVED`。
- `QUARANTINE`：已确认的 IP/角色风险继续隔离。

## 逐 listing 审计与已接受 disposition

图片数为 intake ledger 中的 role 映射条目数（同一文件可在不同 role 出现）；`other` 是不属于三种标准 role 的条目。下方另列出每项以 SHA-256 去重后的可用图片数。全部 40 条 tracked listing 均有标题、来源 listing/店铺、raw archive hash、可用 main 图和继承权限；`1002636896918` 没有 SKU role，`728908046635` 没有 description role，但其余既有图片足以形成候选，不能因此自动延后。属性只写标题和图片明确可见/可读的内容；未明确的尺码、MOQ、价格、库存、材质成分、认证、交期、产能、包装、QC 和性能声明均保持 `UNKNOWN`。

| Listing | Batch | 已接受 family | 图片 total/main/SKU/desc/other | 已确认属性（标题/图） | 关系/IP 证据 | 已接受 disposition |
|---|---|---:|---:|---|---|---|
| `730186552239` | pilot-2026-09-01 | opera-gloves | 74/26/21/27/0 | 女款、55 cm、长款、缎面、光滑、防晒/礼服用途 | 与 `956309661690`、`844530638864` 为 `POSSIBLE_VARIATION`；部分主图有店铺字样但有 clean sibling | `APPROVE_CANDIDATE` |
| `737751870967` | pilot-2026-09-01 | kids-dress-gloves | 36/15/10/11/0 | 儿童、缎面、蝴蝶结、长款、演出/礼服 | 与 `814984964565`、`775921736857` 同一 normalized group，已有 approved record | `APPROVE_CANDIDATE`（映射 `kids-dress-gloves-satin-bow-001`） |
| `800814497148` | pilot-2026-09-01 | wedding-veils | 15/7/2/6/0 | 黑色头纱、蕾丝花边、婚礼/新娘、头饰 | 无重复证据；已有 approved record | `APPROVE_CANDIDATE`（映射 `wedding-veils-black-lace-trim-001`） |
| `856992679458` | pilot-2026-09-01 | bridal-gloves | 15/7/2/6/0 | 长款、网纱/蕾丝、婚纱礼服、黑色、露指/袖套语境 | 已有 approved record；一张图有店铺字样，clean sibling 可用 | `APPROVE_CANDIDATE`（映射 `bridal-gloves-sheer-lace-long-001`） |
| `728772172182` | pilot-2026-09-01-cross-listing | kids-dress-gloves | 26/10/5/11/0 | 儿童、黑/白、蕾丝网纱、无指/镂空、防晒 | Human 接受儿童归类；无合并证据 | `APPROVE_CANDIDATE` |
| `728908046635` | pilot-2026-09-01-cross-listing | bridal-gloves | 29/17/12/0/0 | 长款蕾丝、绣花/钉珠、露指、黑白、婚礼 | Human 接受归类；无合并证据 | `APPROVE_CANDIDATE` |
| `733063602867` | pilot-2026-09-01-cross-listing | bridal-gloves | 22/9/4/9/0 | 短款蕾丝网纱、复古、新娘花嫁、演出 | Human 接受归类；无合并证据 | `APPROVE_CANDIDATE` |
| `735814134529` | pilot-2026-09-01-cross-listing | bridal-gloves | 53/19/14/20/0 | 长款缎面褶皱、包指、新娘/婚礼、舞台/派对 | Human 接受归类；与 opera 形态有重叠但不合并 | `APPROVE_CANDIDATE` |
| `776815144156` | pilot-2026-09-01-cross-listing | costume-gloves（建议；registry 原为 kids） | 26/11/6/9/0 | 儿童舞台、印花缎面、王子公主语境 | 标题含 Frozen/Elsa/冰雪艾莎，已确认 IP/角色风险 | `QUARANTINE` |
| `857043957533` | pilot-2026-09-01-cross-listing | bridal-gloves | 44/18/13/13/0 | 长款勾指、色丁、新娘/婚礼、露指袖套 | Human 接受归类；与 `844530638864` 明确 `KEEP_SEPARATE` | `APPROVE_CANDIDATE` |
| `733010943271` | tranche-1-batch-01 | bridal-gloves | 15/7/2/6/0 | 短款网纱、无指、蕾丝花边、新娘/花嫁 | 独立候选，无合并证据 | `APPROVE_CANDIDATE` |
| `814984964565` | tranche-1-batch-01 | kids-dress-gloves | 40/13/8/19/0 | 儿童、蝴蝶结、缎面、全指、长款 | 与 `737751870967`、`775921736857` 同一 normalized group | `APPROVE_CANDIDATE`（映射 `kids-dress-gloves-satin-bow-001`） |
| `819967426657` | tranche-1-batch-01 | bridal-gloves | 11/6/1/4/0 | 烫钻、蕾丝网眼、全指、礼服/新娘、cosplay 语境 | 独立候选；需避免把 cosplay 用途当品牌/IP 结论 | `APPROVE_CANDIDATE` |
| `844530638864` | tranche-1-batch-01 | opera-gloves | 54/26/21/7/0 | 加长、55 cm、缎面、黑/紫/香槟色、新娘/婚礼 | 与 `730186552239` 为 `POSSIBLE_VARIATION`，但已有 `KEEP_SEPARATE` 证据 | `APPROVE_CANDIDATE` |
| `956309661690` | tranche-1-batch-01 | opera-gloves | 85/32/27/26/0 | 55 cm、缎面、长款、新娘/婚礼、宴会、颜色词 | Human 接受归类；与 `730186552239` 为 `POSSIBLE_VARIATION` | `APPROVE_CANDIDATE` |
| `962080651234` | tranche-1-batch-01 | costume-gloves | 31/12/7/12/0 | 黑色蕾丝、羽毛、勾指、万圣节/派对 | 独立候选；保留 costume 风险说明 | `APPROVE_CANDIDATE` |
| `1002636896918` | tranche-2-batch-01 | kids-dress-gloves | 9/5/0/4/0 | 儿童、格子纱、派对/公主拍照道具 | 独立候选 | `APPROVE_CANDIDATE` |
| `691557112631` | tranche-2-batch-01 | costume-gloves | 28/10/5/13/0 | 复古、万圣节、礼服/旗袍、派对/演出 | 独立候选 | `APPROVE_CANDIDATE` |
| `729142545579` | tranche-2-batch-01 | opera-gloves | 30/11/6/13/0 | 中长、钩指、弹力、绣珠/蝴蝶结、婚纱礼服 | 独立候选 | `APPROVE_CANDIDATE` |
| `730371444820` | tranche-2-batch-01 | opera-gloves | 74/26/21/27/0 | 长款、色丁/缎面、新娘婚纱、晚宴/旗袍 | 与 `730659973350`、`844530638864`、`730186552239` 存在 `POSSIBLE_VARIATION` 关系 | `APPROVE_CANDIDATE` |
| `730659973350` | tranche-2-batch-01 | opera-gloves | 73/26/21/26/0 | 短款、缎面、新娘婚纱、晚宴/旗袍 | 与 `956904395389` 同一 normalized group，已有 approved record | `APPROVE_CANDIDATE`（映射 `opera-gloves-satin-short-001`） |
| `732732478288` | tranche-2-batch-01 | costume-gloves | 29/11/6/12/0 | 长款漆面、复古、骑行/礼服、新娘/拍照 | 独立候选；保留用途混合风险 | `APPROVE_CANDIDATE` |
| `761321664860` | tranche-2-batch-01 | bridal-gloves | 16/7/2/7/0 | 网纱、钉珠、袖套、花边、新娘 | 独立候选 | `APPROVE_CANDIDATE` |
| `950693682364` | tranche-2-batch-01 | bridal-gloves | 19/7/2/10/0 | 短款、睫毛边蕾丝、新娘、结婚拍照 | 独立候选 | `APPROVE_CANDIDATE` |
| `728194389811` | tranche-2-batch-02 | opera-gloves | 29/11/6/12/0 | 复古蕾丝、薄款、黑网纱、旗袍/舞蹈/礼服 | 独立候选 | `APPROVE_CANDIDATE` |
| `728592614367` | tranche-2-batch-02 | opera-gloves | 15/7/2/6/0 | 网纱、蕾丝花边、蝴蝶结、短筒、礼服 | 独立候选 | `APPROVE_CANDIDATE` |
| `728659873446` | tranche-2-batch-02 | opera-gloves | 30/11/6/13/0 | 网纱、黑色蕾丝、波点花边、蝴蝶结、短筒 | 独立候选 | `APPROVE_CANDIDATE` |
| `732419024504` | tranche-2-batch-02 | bridal-gloves | 14/7/2/5/0 | 新娘、网纱、珍珠/钉珠、薄款袖套 | 独立候选 | `APPROVE_CANDIDATE` |
| `732561509757` | tranche-2-batch-02 | bridal-gloves | 22/9/4/9/0 | 长款网纱蕾丝、菊花装饰、新娘、防晒 | 独立候选 | `APPROVE_CANDIDATE` |
| `741321749838` | tranche-2-batch-02 | opera-gloves | 22/8/3/11/0 | 黑/白、长款、蝴蝶结、蕾丝/缎面、舞台/新娘 | 独立候选 | `APPROVE_CANDIDATE` |
| `775921736857` | tranche-2-batch-02 | kids-dress-gloves | 44/18/13/13/0 | 儿童/花童、蝴蝶结、缎面、舞台/婚纱摄影 | 与 `737751870967`、`814984964565` 同一 normalized group；无可识别角色图形证据 | `APPROVE_CANDIDATE`（映射 `kids-dress-gloves-satin-bow-001`） |
| `776820765686` | tranche-2-batch-02 | bridal-gloves | 21/9/4/8/0 | 短款蕾丝、全指、红/黑/白/粉色、婚礼/演出 | 独立候选 | `APPROVE_CANDIDATE` |
| `728600712961` | tranche-3-batch-01 | bridal-gloves | 27/10/5/12/0 | 长款薄蕾丝、五指、婚纱/新娘、遮手臂 | 独立候选 | `APPROVE_CANDIDATE` |
| `732867076935` | tranche-3-batch-01 | opera-gloves | 27/11/6/10/0 | 无指蕾丝袖套、小梅花、礼服/防晒 | registry 已接受为 opera；独立候选 | `APPROVE_CANDIDATE` |
| `733406564887` | tranche-3-batch-01 | bridal-gloves | 30/11/6/13/0 | 半截长款蕾丝、无指、小梅花、新娘/婚礼 | 与相关 listing 只有 `POSSIBLE_VARIATION`，不自动合并 | `APPROVE_CANDIDATE` |
| `741154552428` | tranche-3-batch-01 | opera-gloves | 23/8/3/12/0 | 蕾丝花边、蝴蝶结、烫钻、网纱、万圣节/新娘 | 独立候选 | `APPROVE_CANDIDATE` |
| `788133828087` | tranche-3-batch-01 | kids-dress-gloves | 12/6/1/5/0 | 儿童/花童、蝴蝶结、蕾丝花边、缎面、白色 | 与既有 kids group 明确 `KEEP_SEPARATE` | `APPROVE_CANDIDATE` |
| `819969614484` | tranche-3-batch-01 | costume-gloves | 24/8/3/13/0 | 半指、漆皮/亮皮、弹力、中长、万圣节/cosplay | 仅 `POSSIBLE_VARIATION`，保留独立候选 | `APPROVE_CANDIDATE` |
| `956904395389` | tranche-3-batch-01 | opera-gloves | 24/9/4/11/0 | 23 cm、短款、白色缎面、婚庆/舞蹈/礼仪 | 与 `730659973350` 同一 normalized group；非首选品牌营销图排除 | `APPROVE_CANDIDATE`（映射 `opera-gloves-satin-short-001`） |
| `977246337453` | tranche-3-batch-01 | bridal-gloves | 31/11/6/14/0 | 白色网格蕾丝、蝴蝶结、礼服/新娘、派对 | 独立候选；水印/不合适宣传图只保留为排除证据 | `APPROVE_CANDIDATE` |
### 每个产品的可用图片数（SHA-256 去重）

`可用图` 为同一 listing 内去重后的图片 SHA-256 数；后面的 `role refs` 是保留的全量映射，格式为 total/main/SKU/description/other。后续详情页应从全部可用图中选择，不限制一张图。

| Listing | 可用图 | role refs |
|---|---:|---:|
| `730186552239` | 30 | 74/26/21/27/0 |
| `737751870967` | 14 | 36/15/10/11/0 |
| `800814497148` | 7 | 15/7/2/6/0 |
| `856992679458` | 8 | 15/7/2/6/0 |
| `728772172182` | 15 | 26/10/5/11/0 |
| `728908046635` | 16 | 29/17/12/0/0 |
| `733063602867` | 10 | 22/9/4/9/0 |
| `735814134529` | 25 | 53/19/14/20/0 |
| `776815144156` | 9 | 26/11/6/9/0 |
| `857043957533` | 15 | 44/18/13/13/0 |
| `733010943271` | 9 | 15/7/2/6/0 |
| `814984964565` | 21 | 40/13/8/19/0 |
| `819967426657` | 5 | 11/6/1/4/0 |
| `844530638864` | 28 | 54/26/21/7/0 |
| `956309661690` | 28 | 85/32/27/26/0 |
| `962080651234` | 13 | 31/12/7/12/0 |
| `1002636896918` | 7 | 9/5/0/4/0 |
| `691557112631` | 16 | 28/10/5/13/0 |
| `729142545579` | 17 | 30/11/6/13/0 |
| `730371444820` | 31 | 74/26/21/27/0 |
| `730659973350` | 30 | 73/26/21/26/0 |
| `732732478288` | 17 | 29/11/6/12/0 |
| `761321664860` | 7 | 16/7/2/7/0 |
| `950693682364` | 11 | 19/7/2/10/0 |
| `728194389811` | 16 | 29/11/6/12/0 |
| `728592614367` | 12 | 15/7/2/6/0 |
| `728659873446` | 14 | 30/11/6/13/0 |
| `732419024504` | 6 | 14/7/2/5/0 |
| `732561509757` | 10 | 22/9/4/9/0 |
| `741321749838` | 11 | 22/8/3/11/0 |
| `775921736857` | 19 | 44/18/13/13/0 |
| `776820765686` | 11 | 21/9/4/8/0 |
| `728600712961` | 16 | 27/10/5/12/0 |
| `732867076935` | 12 | 27/11/6/10/0 |
| `733406564887` | 14 | 30/11/6/13/0 |
| `741154552428` | 13 | 23/8/3/12/0 |
| `788133828087` | 6 | 12/6/1/5/0 |
| `819969614484` | 13 | 24/8/3/13/0 |
| `956904395389` | 20 | 24/9/4/11/0 |
| `977246337453` | 21 | 31/11/6/14/0 |

## 关系、分类和统计

- W02 registry population：40 条 tracked source listing，其中 39 条已接受为 `APPROVE_CANDIDATE`，`776815144156` 继续 `QUARANTINE`。
- 已接受的 normalized duplicate group：2 组，合计 5 条 source listing：`737751870967`、`814984964565`、`775921736857` 为 kids group；`730659973350`、`956904395389` 为 opera group。39 条可批准候选据此归并为 36 个可展示的 normalized 产品；另有 1 个隔离产品。此归并不是新建 ProductRecord 授权。
- `POSSIBLE_VARIATION` 关系：5 条 evidence edge，Human 接受继续独立处理、不合并；其余关系按 `KEEP_SEPARATE` 或未达合并证据处理。
- `814978872980` 仅作为未登记 smoke ZIP 的操作性核验记录，明确不计入本节任何产品、缺料或 Human Review 数字。

分类统计同时列示 source listing 数和可展示 normalized 产品数，避免把 39 个候选误认为 39 个不同展示产品：

| 已接受分类 | tracked listing 数 | 可展示 normalized 产品数 | 隔离 normalized 产品数 |
|---|---:|---:|---:|
| `bridal-gloves` | 15 | 15 | 0 |
| `opera-gloves` | 13 | 12 | 0 |
| `kids-dress-gloves` | 6 | 4 | 0 |
| `costume-gloves` | 5 | 4 | 1 |
| `wedding-veils` | 1 | 1 | 0 |
| **合计** | **40** | **36** | **1** |

最终已接受 disposition（仅 40 条 registry listing）：`APPROVE_CANDIDATE` 39 条（其中 7 条映射既有 4 个 approved ProductRecord，32 条是可在后续提出的新候选），`QUARANTINE` 1 条（`776815144156`）。这些是 W02 已接受候选，仍不是正式 `APPROVED` ProductRecord 或发布许可。

## 缺料结论与下一 checkpoint

40 条 tracked listing 均已有标题、main 图、来源和权限证据；其中 37 条另同时有 SKU 和 description role，`1002636896918` 缺 SKU role、`728908046635` 缺 description role，但其余多图资料足够支持已接受候选。W02 没有需要 Human 补充资料的 tracked 产品。`814978872980` 不属于产品范围，不构成缺料或待答问题。

W02 已以 `COMPLETE; HUMAN_REVIEW_ACCEPTED` 收口。详情 preview、route、ProductRecord、approved asset manifest 和公开发布均不在本 checkpoint 内。下一 serial checkpoint 为 **W11 Visual Language Selection Gate**，状态仍为 `HUMAN_SELECTION_PENDING`，本次 W02 closure 不激活它。
