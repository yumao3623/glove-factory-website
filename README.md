# JS Meilai 手套工厂网站

JS Meilai 的 B2B 产品展示网站，面向婚礼手套、礼服手套、儿童礼服手套、舞台手套、婚礼头纱和袖套等海外采购场景。项目使用 Next.js App Router、TypeScript、Tailwind CSS 和少量 shadcn/ui 组件。商务与应用基线为 **2.1.0**，账号、后台、询价与报价验收见 [2.1 发布记录](docs/V2_1_RELEASE.md)；2.2 SEO/GSC 工程已部署，执行记录见 [2.2 SEO/GSC 执行手册](docs/V2_2_SEO_GSC_RUNBOOK.md)。运行时读取 Supabase 产品表和受保护的 `product-media` 对象存储；Git 仅保留产品数据与图片清单。

2.0 版本的结构、设计系统、需求与支付边界见 [仓库结构说明](docs/REPOSITORY_MAP.md)、[设计系统](DESIGN.md)、[2.0 实施说明](docs/V2_REQUIREMENTS.md) 和 [2.0 支付决策](docs/V2_PAYMENT_DECISION.md)。

## 环境要求

- Node.js `>=20.9.0`；本项目已在 macOS Apple Silicon 和 Node.js `24.21.0` 上验证。
- npm；依赖版本由 `package-lock.json` 锁定。
- Python 3 仅用于部分研究与资产辅助脚本，不是网站启动依赖。

## 安装

克隆仓库后，在项目根目录运行：

```bash
npm ci
```

`npm ci` 会严格按照 `package-lock.json` 安装依赖。不要把 Windows 上的 `node_modules` 复制到 macOS；应在 macOS 上重新安装，以获取正确的 Apple Silicon 原生模块。

## 启动

启动本地开发服务器：

```bash
npm run dev
```

默认访问地址为 <http://localhost:3000>。

生产构建与启动：

```bash
npm run build
npm start
```

## 主要 npm 脚本

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Next.js 开发服务器 |
| `npm run build` | 创建生产构建 |
| `npm start` | 启动已完成的生产构建 |
| `npm run lint` | 运行 ESLint |
| `npm run typecheck` | 运行 TypeScript 类型检查 |
| `npm test` | 运行 Node 测试套件 |
| `npm run seo:audit -- --origin <URL> --mode <preview\|production>` | 按 sitemap 逐页检查状态码、robots、title、description、canonical、H1 和正式索引边界 |
| `npm run validate:products` | 校验已批准产品、图片、哈希和溯源闭环 |
| `npm run ingest:batch -- <command>` | 执行本地、分批、审阅优先的产品导入流程 |

历史数据重建工具使用 `node --env-file=.env.local scripts/migrate-approved-catalogue-to-supabase.mjs --dry-run` 预检。重新上传需要通过 `PRODUCT_MEDIA_ARCHIVE_ROOT` 指向仓库外的图片备份。日常上新、编辑、图片上传和归档使用 `/admin/`，不要重跑迁移覆盖经营中的产品。

## 目录结构

```text
app/                    Next.js 路由、页面和 API
components/             页面、产品和界面组件
lib/                    产品导入、询盘校验和站点工具
data/                   已批准产品、分类和导入审阅记录
assets/                 资产清单、原始素材和站内派生素材
supabase/               数据库迁移、访问策略和订单原子操作
scripts/                产品导入、资产处理和研究辅助脚本
tests/                  自动化测试
docs/                   项目规范、决策、路线图和操作边界
research/               关键词、竞品、搜索引擎优化和视觉研究材料
.product-ingestion/     仅本地保存的原始导入与溯源工作目录
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并按实际环境配置；环境文件不进入 Git。

- `NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_SITE_URL`：本地开发地址；生产均为 `https://www.jsmeilai.com`。
- `SEO_INDEXING_ENABLED=true`：2.2 正式索引开关；只有同时配置精确的 `NEXT_PUBLIC_SITE_URL=https://www.jsmeilai.com` 才会切换到正式 robots/canonical 行为，默认保持 noindex。
- `SEO_COSTUME_INDEXING_ENABLED=true`：仅在正式索引开关和 `/costume-gloves/` 的 Human gate 同时通过后启用该 family；默认不进入 sitemap。
- Supabase URL、anon key、服务端 service-role key：账户、后台、目录和受保护媒体所需。
- `COMMERCE_CATALOG_ENABLED=true`：读取数据库目录；关闭时不会展示历史静态产品。
- `COMMERCE_RFQ_ENABLED=true`、`RESEND_API_KEY`、`EMAIL_FROM`、`RFQ_RECIPIENT`：询价存储及通知邮件。
- `ADMIN_EMAILS`：已授权管理员邮箱；必须先完成邮箱验证才有后台权限。
- `PAYPAL_CHECKOUT_ENABLED=false`：2.1 保持关闭，完成商户及真实支付验收后再开启。

忘记密码从 `/account/` 进入。管理员邀请工具为 `node --env-file=.env.local --import tsx scripts/send-admin-access.ts <管理员邮箱>`；正式邀请前确认应用 URL 为生产域名。密码由收件人自己设置。

## 成熟独立站需求基线

成熟 B2B 电商方向、页面结构、筛选、商品详情、购物车、账户、Supabase、询价邮件接口和分阶段验收标准见 [成熟独立站需求基线](docs/REQUIREMENTS_MATURITY_COMMERCE.md)。Paddle 不适用于实物手套；替代支付商和真实商业政策在沙盒验收前保持关闭。

## 产品数据来源

产品原始资料来自已授权的 JS Meilai 1688 店铺导出。已批准记录位于 `data/products/approved/`，图片与来源哈希映射位于 `assets/asset-manifest.json`，云端路径与校验值位于 `data/products/media-storage.json`；产品图片不再存入仓库。

不要直接从原始 ZIP 或未审阅草稿生成公开产品。产品状态、来源商品条目、图片许可、哈希和人工审核结论必须保持可追溯。

## `.product-ingestion` 的作用

`.product-ingestion/` 保存：

- 未改动的原始产品 ZIP；
- 解压和检查得到的原始图片；
- 批次配置、草稿、审阅、隔离和清理队列；
- 产品图片与来源商品条目的本地溯源证据。

这些文件用于产品导入和 `validate:products` 的原图哈希校验，但不会被 Next.js 网站直接发布。派生图校验从 Supabase 获取；离线时可通过 `PRODUCT_MEDIA_ARCHIVE_ROOT` 指定仓库外备份。

## `.product-ingestion` 不进入 Git

`.product-ingestion/` 可能很大，并包含仅用于本地审阅的源文件，因此已被 `.gitignore` 明确排除。不要强制添加、提交或上传这个目录。仓库只保留经过批准的产品记录、轻量审阅证据和资产清单。

可以这样确认忽略规则：

```bash
git check-ignore -v .product-ingestion
git status --short
```

## 从备份恢复 `.product-ingestion`

1. 将备份 ZIP 放在项目目录之外，例如 macOS 桌面。
2. 使用 Finder 的“归档实用工具”解压。Windows 创建且包含中文文件名的传统 ZIP 可能在命令行 `unzip` 中出现反斜杠路径或乱码，因此不要在未检查文件名时直接解压到项目。
3. 确认解压结果的根目录名正好是 `.product-ingestion`。Finder 中可按 `Command + Shift + .` 显示隐藏目录。
4. 确认项目根目录当前没有同名目录；不要把备份直接覆盖或合并到已有导入状态。
5. 将已检查的 `.product-ingestion` 整体复制到本项目根目录。
6. 运行下面的产品校验；只有校验通过后才继续导入或修改产品数据。

目标结构示例：

```text
.product-ingestion/
  <batch-name>/
    batch.json
    raw/
    inspection/
    draft/
    review/
    quarantine/
    cleanup/
```

## 产品校验

运行：

```bash
npm run validate:products
```

校验会检查已批准产品记录、登记表与资产清单的映射、原图和派生图是否存在，以及文件哈希、图片格式和尺寸是否匹配。校验失败时不要通过跳过检查、重新生成产品数据或修改资产清单来掩盖问题；应先恢复缺失的原始资料或确认迁移过程是否改变了路径、大小写、编码或文件内容。

更完整的产品导入边界和流程见 `docs/PRODUCT_BATCH_INGESTION.md`。
