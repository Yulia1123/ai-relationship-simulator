# 项目交接文档：AI 正缘人生模拟器

> 本文件用于向新的协同工作者说明项目整体情况、工程规范和当前状态。

## 1. 项目概览

- **项目名称**：AI 正缘人生模拟器（ai-relationship-simulator）
- **GitHub 仓库**：https://github.com/Yulia1123/ai-relationship-simulator
- **项目定位**：一个互动式 AI 恋爱测试 + 剧情模拟 Web 应用。核心功能包括：
  1. **Love DNA 测试**：26 道情景题，输出 24 种动物人格原型及正缘匹配。
  2. **正缘生成**：基于人格生成 AI 正缘画像。
  3. **剧情模拟**：与正缘互动的分支剧情，最终生成结局与 replay。
- **当前阶段**：Love DNA 测试模块已完成并重构了结果页；剧情模拟模块（Story / Soulmate / Ending / Replay）代码在仓库中，但尚未与新版 Love DNA 完全串联验证。

## 2. 技术栈

- **前端**：React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + Framer Motion + Zustand
- **后端**：Express + TypeScript（`api/` 目录），用于 AI 调用（OpenAI）
- **AI**：OpenAI API（gpt-4o-mini）
- **路由**：react-router-dom v7（已切换为 `HashRouter` 以支持静态部署）
- **部署**：GitHub Pages（通过 `.github/workflows/deploy.yml` 自动构建部署到 `gh-pages` 分支）
- **构建产物**：`dist/` 目录；同时生成 `dist/standalone.html` 单文件版供本地直接分享

## 3. 仓库地址与本地启动

```bash
git clone https://github.com/Yulia1123/ai-relationship-simulator.git
cd ai-relationship-simulator
npm install
npm run client:dev   # 前端开发服务器
npm run server:dev   # 后端开发服务器（需 .env 配置 OpenAI key）
npm run dev          # 同时启动前后端
npm run build        # 构建（tsc + vite build）
npm run check        # TypeScript 类型检查
```

## 4. 关键目录结构

```
ai-relationship-simulator/
├── src/
│   ├── App.tsx                 # 路由入口
│   ├── main.tsx                # React 挂载
│   ├── index.css               # 全局样式
│   ├── pages/                  # 页面组件
│   │   ├── Home.tsx
│   │   ├── DnaIntro.tsx        # Love DNA 介绍页
│   │   ├── Dna.tsx             # 26 题测试页
│   │   ├── DnaSummary.tsx      # 结果页（近期重构重点）
│   │   ├── Soulmate.tsx        # AI 正缘生成页
│   │   ├── Story.tsx           # 剧情互动页
│   │   ├── Ending.tsx          # 结局页
│   │   └── Replay.tsx          # 回顾页
│   ├── components/             # 可复用组件
│   ├── data/
│   │   ├── questions.ts        # 26 道情景题
│   │   ├── archetypes.ts       # 24 种动物人格原型（含 vector/spark/flip/advice）
│   │   └── soulmateMatches.ts  # 24 种人格的两种正缘推荐
│   ├── lib/
│   │   └── loveDna.ts          # 核心判型 + 典型度计算逻辑
│   ├── store/
│   │   └── useAppStore.ts      # Zustand 全局状态
│   ├── types/
│   │   └── index.ts            # 核心 TS 类型
│   └── services/
│       └── api.ts              # 前端 API 调用
├── api/                        # Express 后端（Vercel Serverless 结构）
│   ├── index.ts
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   └── services/
├── scripts/
│   └── build-standalone.js     # 生成单文件 standalone.html
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages 自动部署
├── vite.config.ts              # base: './'，HashRouter 适配静态部署
└── vercel.json                 # Vercel 部署配置（备用）
```

## 5. 核心数据模型：22 维 Love DNA 向量

向量顺序定义在 `src/data/archetypes.ts` 注释中：

```
[0]焦虑 [1]回避
[2]激情 [3]游戏 [4]友谊 [5]务实 [6]痴迷 [7]奉献
[8]言语需 [9]时刻需 [10]礼物需 [11]行动需 [12]接触需
[13]言语表 [14]时刻表 [15]礼物表 [16]行动表 [17]接触表
[18]亲密 [19]激情ST [20]承诺 [21]信念
```

判型逻辑：

- **依恋定位**：焦虑轴 + 回避轴 → secure / anxious / avoidant / fearful
- **Lee 主导风格**：eros / ludus / storge / pragma / mania / agape
- **人格原型**：依恋类型 × Lee 风格 = 4 × 6 = 24 种动物人格
- **典型度算法**：见 `src/lib/loveDna.ts` 的 `weightedDistance` / `similarityPercent`，目前仅基于依恋轴 + 主导 Lee 风格维度计算，目标让主型匹配度 ≥ 80%。

## 6. 近期已完成的工作

- 重写了 `DnaSummary.tsx` 结果页，采用小红书风格卡片布局。
- 新增 `soulmateMatches.ts`，为 24 种人格各推荐 2 个最佳正缘人格。
- 移除了“爱的结构 + 关系信念”的人格原型对比展示。
- 将“爱的五种语言错位诊断”从图表改为文字说明。
- 扩充了 `archetypes.ts` 中每种人格的闪光点（spark）和翻车点（flip）。
- 前端路由切换为 `HashRouter`，`vite.config.ts` 设置 `base: './'` 以支持静态部署。
- 新增 `scripts/build-standalone.js`，生成可双击打开的 `dist/standalone.html`。
- 配置 GitHub Actions 自动部署到 GitHub Pages。

## 7. 已知问题与待办

- **GitHub Pages 空白问题**：已修复 `standalone.html` 的 `</script>` 转义问题；GitHub Pages 部署本身需要确认 Pages Source 已改为 `gh-pages / (root)`。
- **剧情模块串联**：`Soulmate / Story / Ending / Replay` 页面代码存在，但需验证与新 Love DNA 数据结构的兼容性。
- **后端 AI 调用**：完整 AI 功能（正缘生成、剧情生成）需要配置 `OPENAI_API_KEY` 等环境变量，目前静态部署只包含纯前端的 Love DNA 测试。
- **临时脚本清理**：根目录有多个 `tmp_*.ts/py` 调试/生成脚本，可按需清理。

## 8. 环境变量

复制 `.env.example` 为 `.env` 并填写：

```bash
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
MODEL_NAME=gpt-4o-mini
```

## 9. 部署说明

- **GitHub Pages**：push 到 `main` 分支后 Actions 自动构建部署；在仓库 Settings → Pages 中确认 Source 为 `gh-pages / (root)`。
- **Vercel**：仓库内已有 `vercel.json` 和 `api/` 入口，可作为完整前后端部署的备选方案。
- **本地分享**：运行 `npm run build && node scripts/build-standalone.js`，得到 `dist/standalone.html`，可直接双击或发送给别人。

## 10. 工程规范

- 使用 TypeScript，所有类型定义在 `src/types/index.ts`。
- 路径别名 `@/` 对应 `src/` 目录。
- 状态管理统一使用 `useAppStore`（Zustand）。
- UI 文案目前全部为中文，避免中英混杂。
- 新增/修改后必须跑 `npm run check` 和 `npm run build` 验证通过。
