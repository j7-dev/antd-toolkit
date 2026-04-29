---
globs: "vite.config.ts,package.json,tsconfig.json,tsconfig.node.json"
description: Vite library mode 建置設定與 npm 發布規則
---

# Vite 建置與發布規則

## Library Mode 建置

### Entry Points

- 所有 `lib/**/*.{ts,tsx}`（排除 `*.stories.{ts,tsx}`）皆為獨立 entry point
- 由 `glob.sync` 動態掃描，不需手動維護 input 清單
- 輸出格式：ESM only (`formats: ['es']`)
- 輸出路徑：`dist/`，保留原始目錄結構

### CSS

- `cssCodeSplit: false` -- 不拆分 CSS，產出單一 `dist/style.css`
- SCSS 由 Vite 內建支援（透過 `sass` + `sass-loader`）

### DTS 產生

- `vite-plugin-dts` 自動產生 `.d.ts` 宣告檔
- 僅在 library build 時啟用（非 Storybook build）

### Storybook Build

- `BUILD_ENV=storybook` 環境變數觸發 Storybook 專用建置
- Storybook 模式下 `config.build` 被移除，使用 Storybook 自己的建置
- 透過 `cross-env` 確保跨平台相容

## External Dependencies

以下套件在 rollup 中標記為 external，**不會打包進產出**。消費專案需自行安裝：

### 核心 Peer Dependencies
- `react`, `react/jsx-runtime`
- `antd`

### Refine 模組相關
- `@refinedev/core`, `@refinedev/antd`

### 工具套件
- `axios`, `lodash-es`, `dayjs`, `nanoid`, `query-string`
- `jotai`, `zod`
- `react-icons`, `@uidotdev/usehooks`

### 特定功能
- `antd-img-crop` -- 圖片裁切
- `@blocknote/core`, `@blocknote/react`, `@blocknote/mantine` -- BlockNote 編輯器
- `canvas-confetti`, `react-countdown`, `react-highlight-words` -- 特效/倒數/高亮

### Bundled Dependencies (打包進產出)

- `clsx` (2.1.1), `tailwind-merge` (2.6.0) -- 透過 `cn()` 函式使用
- `currency-symbol-map` (5.1.0) -- `Amount` 元件的貨幣符號對照

## 發布流程

```bash
pnpm publish:npm
# 等同於: pnpm build && pnpm version patch && git push && npm publish
```

- 版本自動 patch bump
- 自動 git push + npm publish
- 目前版本：1.3.220

## package.json exports

新增模組時，需在 `package.json` 的 `exports` 欄位加入對應路徑。目前三個模組：

```json
{
  ".": { "import": "./dist/main/index.js", "types": "./dist/main/index.d.ts" },
  "./refine": { "import": "./dist/refine/index.js", "types": "./dist/refine/index.d.ts" },
  "./wp": { "import": "./dist/wp/index.js", "types": "./dist/wp/index.d.ts" },
  "./style.css": { "import": "./dist/style.css" }
}
```

## 禁止事項

- 禁止修改 `rollupOptions.external` 而不同步更新 CLAUDE.md
- 禁止在 `lib/` 目錄外放置要建置的源碼
- 禁止在 library 程式碼中使用 dynamic import（會破壞 tree-shaking）
- 禁止在 `sideEffects` 中添加 JS/TS 檔案（僅 CSS 有副作用）
