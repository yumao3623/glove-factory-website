# JS Meilai Glove Factory Website

JS Meilai 的 B2B 产品展示网站，面向婚礼手套、礼服手套、儿童礼服手套、舞台手套和婚礼头纱等采购场景。项目使用 Next.js App Router、TypeScript、Tailwind CSS 和少量 shadcn/ui 组件。当前询盘功能处于预览关闭状态；产品数据和图片必须通过仓库内的溯源校验后才能使用。

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

## 主要 npm scripts

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Next.js 开发服务器 |
| `npm run build` | 创建生产构建 |
| `npm start` | 启动已完成的生产构建 |
| `npm run lint` | 运行 ESLint |
| `npm run typecheck` | 运行 TypeScript 类型检查 |
| `npm test` | 运行 Node 测试套件 |
| `npm run validate:products` | 校验已批准产品、图片、哈希和溯源闭环 |
| `npm run ingest:batch -- <command>` | 执行本地、分批、审阅优先的产品导入流程 |

## 目录结构

```text
app/                    Next.js 路由、页面和 API
components/             页面、产品和 UI 组件
lib/                    产品导入、询盘校验和站点工具
data/                   已批准产品、分类和导入审阅记录
assets/                 资产清单、原始素材和站内派生素材
public/products/media/  网站使用的产品图片
scripts/                产品导入、资产处理和研究辅助脚本
tests/                  自动化测试
docs/                   项目规范、决策、路线图和操作边界
research/               关键词、竞品、SEO 和视觉研究材料
.product-ingestion/     仅本地保存的原始导入与溯源工作目录
```

## 环境变量

当前本地预览不要求 `.env` 文件。

- `NEXT_PUBLIC_SITE_URL`：可选。未设置时使用 `http://localhost:3000`。
- `RESEND_API_KEY`：仅在未来正式启用 Resend RFQ 集成时需要；当前预览不读取或要求该变量。

环境变量文件已被 `.gitignore` 排除。若后续需要提供示例，只提交不含密钥的 `.env.example`。

## 成熟独立站需求基线

成熟 B2B 电商方向、页面结构、筛选、商品详情、购物车、账户、Supabase/Stripe 接口和分阶段验收标准见 [docs/REQUIREMENTS_MATURITY_COMMERCE.md](docs/REQUIREMENTS_MATURITY_COMMERCE.md)。本文件与 [docs/DECISION_MATURITY_COMMERCE_SCOPE.md](docs/DECISION_MATURITY_COMMERCE_SCOPE.md) 记录了从预览站向成熟独立站演进的边界；真实第三方账号和支付仍需单独授权。

## 产品数据来源

产品原始资料来自已授权的 JS Meilai 1688 店铺导出。公开使用的数据位于 `data/products/approved/`，图片与来源哈希映射位于 `assets/asset-manifest.json`，网站派生图片位于 `public/products/media/`。

不要直接从原始 ZIP 或未审阅草稿生成公开产品。产品状态、来源 listing、图片许可、哈希和人工审核结论必须保持可追溯。

## `.product-ingestion` 的作用

`.product-ingestion/` 保存：

- 未改动的原始产品 ZIP；
- 解压和检查得到的原始图片；
- 批次配置、草稿、审阅、隔离和清理队列；
- 产品图片与来源 listing 的本地溯源证据。

这些文件用于产品导入和 `validate:products` 的原图哈希校验，但不会被 Next.js 网站直接发布。

## `.product-ingestion` 不进入 Git

`.product-ingestion/` 可能很大，并包含仅用于本地审阅的源文件，因此已被 `.gitignore` 明确排除。不要强制添加、提交或上传这个目录。仓库只保留经过批准的产品记录、轻量审阅证据、资产清单和公开派生图片。

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

## Validate products

运行：

```bash
npm run validate:products
```

校验会检查已批准产品记录、registry/manifest 映射、原图和派生图是否存在，以及文件哈希、图片格式和尺寸是否匹配。校验失败时不要通过跳过检查、重新生成产品数据或修改资产清单来掩盖问题；应先恢复缺失的原始资料或确认迁移过程是否改变了路径、大小写、编码或文件内容。

更完整的产品导入边界和流程见 `docs/PRODUCT_BATCH_INGESTION.md`。
