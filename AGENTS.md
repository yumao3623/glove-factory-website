<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# JS Meilai 项目长期规则

`jsmeilai.com` 是已上线、持续运营的 B2B 独立站。每个 Codex 对话都必须把仓库事实、Git 历史和生产证据当作连续项目的一部分处理，不能把新对话当成新项目，也不能要求用户重复解释历史。

## 开始任何任务前

按以下顺序读取：

1. `AGENTS.md`（本文件）；
2. [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)；
3. [`docs/HANDOFF.md`](docs/HANDOFF.md)；
4. [`docs/ROADMAP.md`](docs/ROADMAP.md)；
5. [`docs/PROJECT_WORKFLOW.md`](docs/PROJECT_WORKFLOW.md)；
6. 只有需要历史或领域细节时，才读取 [`docs/RELEASE_HISTORY.md`](docs/RELEASE_HISTORY.md) 和相关原始验收文档。

然后检查当前目录、`git status`、分支、远端 `main` 和必要的生产平台事实。旧聊天、旧计划和旧文档与当前代码、Git、当前状态文档或生产证据冲突时，以后者为准，并记录证据日期与验证边界。

## 事实来源与职责

- `docs/PROJECT_STATUS.md`：当前生产版本、开发状态、Git、Vercel、Supabase、域名、产品、SEO、GSC、多语言、RFQ/邮件、支付、已知问题和阻塞分类。
- `docs/ROADMAP.md`：只保留未来 2–4 个有价值的里程碑、启动条件、范围、DoD 和明确不做事项。
- `docs/HANDOFF.md`：短交接区，只写最近完成、当前等待、触发条件和唯一下一任务。
- `docs/PROJECT_WORKFLOW.md`：版本规则、触发式维护、开始/结束流程和固定报告规范。
- `docs/RELEASE_HISTORY.md`：1.x、2.0、2.1、2.1.5、2.2、2.3、2.4 的简明历史，不重编号、不重写历史。
- `CHANGELOG.md`：正式完成的代码、文档、发布和治理记录；不记录聊天流水账。只有真实完成并验证的事项才能进入已完成区。

## 版本规则

历史版本 `1.x → 2.0 → 2.1 → 2.1.5 → 2.2 → 2.3` 永远保留；当前稳定生产版本按已验证部署表达（本次为 `2.4.0`）。不能因为新对话、GSC 检查、等待收录或普通运营工作增加版本号。

- PATCH：小 Bug、文案、样式、接口或局部 SEO 修复；
- MINOR：有清晰边界和完整验收的新能力；
- MAJOR：产品定位、核心架构、商业模式或整体体验显著变化。

只有在代码、Git、部署和生产验收都对应完成时，才能把版本写成已发布。`package.json` 的版本字段、准备好的代码、main 推送、Vercel Ready 和生产可用必须分别说明，不能混为一谈。

## 每次任务完成前

按实际变化更新 `PROJECT_STATUS.md`、`HANDOFF.md`、`ROADMAP.md`；形成正式完成记录时更新 `CHANGELOG.md`。如果建议新建对话，必须先完成这些更新，确保下一轮不依赖当前聊天。纯核查或无状态变化时不要制造流水账或版本。

不要未经授权发送邮件、发布外链、提交第三方表单、支付、修改生产开关、删除数据或改变安全权限。等待 Google、PayPal 或第三方审核不算开发版本；稳定线上产品不因“保持活跃”而重构。

## 每次最终回复的强制格式

无论任务大小，最终回复必须包含以下标题和内容：

### 当前版本

- `Production:`
- `Development / Current work:`

### 本次完成

只写真正完成并验证的代码、文档、测试、Git、推送、部署、生产验证和第三方操作；准备但未执行的内容单独标注。

### 当前状态

简要说明本任务涉及模块现在的真实状态；涉及 SEO、GSC、支付、邮件或部署时，注明“本次实查 / 历史验收 / 未验证”。

### 尚未完成

分成四类：

- 可以立即继续；
- 外部等待；
- 真正阻塞；
- 暂时不值得做。

### 当前版本状态

明确写：`X.X.X 已完成` 或 `X.X.X 尚未完成`，并说明是否仍处于运营观察或外部等待。

### 下一步

明确下一项最合理的工作、触发条件，以及现在是否没有必要改代码。

### 对话建议

必须二选一并说明原因：

- **建议：继续当前对话**；或
- **建议：新建 Codex 对话**。

### 下一条指令

无论选择继续还是新建，都给出一段可以直接复制发送的完整 Codex 指令。新建对话的指令必须指向本仓库的状态文件；不得要求用户重新解释版本历史。

完整执行细节见 [`docs/PROJECT_WORKFLOW.md`](docs/PROJECT_WORKFLOW.md)。
