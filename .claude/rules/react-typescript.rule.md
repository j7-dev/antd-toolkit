---
globs: "**/*.ts,**/*.tsx"
description: React + TypeScript 元件庫開發規則，涵蓋命名、元件結構、hooks、型別系統
---

# React + TypeScript 開發規則

## 命名慣例

- **元件名稱**：PascalCase，與資料夾名稱一致（`Amount/index.tsx` 匯出 `Amount`）
- **Hook 名稱**：camelCase，`use` 前綴（`useColor`, `useColumnSearch`）
- **型別名稱**：PascalCase，`T` 前綴（`TConstant`, `TProductBaseRecord`, `TVideo`）
- **常數名稱**：UPPER_SNAKE_CASE（`POST_STATUS`, `USER_ROLES`, `BOOLEAN_OPTIONS`）
- **工具函式**：camelCase（`getCurrencyString`, `filterObjKeys`, `toFormData`）
- **檔案名稱**：元件用 PascalCase 資料夾名，工具/hooks 用 camelCase

## 元件結構

```
ComponentName/
  index.tsx           # 元件實作（必要）
  index.stories.tsx   # Storybook 故事（必要）
  hooks.ts            # 元件專屬 hook（可選，如 SimpleDrawer/hooks.ts）
  types/index.ts      # 元件專屬型別（可選）
```

- 每個元件獨立資料夾，不允許把多個元件放同一檔案
- 元件使用 `const ComponentName: React.FC<Props> = (props) => {}` 模式
- 匯出方式：named export（不使用 default export），唯一例外是 `useUpdateRecord`

## Barrel Export 規則

- 每個模組（main/refine/wp）下的 `components/index.ts` 負責 re-export 所有元件
- `hooks/index.tsx` 負責 re-export 所有 hooks
- `utils/index.tsx` 負責 re-export 所有工具函式
- `types/index.ts` 負責 re-export 所有型別
- 模組入口（`lib/main/index.tsx` 等）re-export 上述所有 barrel

新增任何元件/hook/util/type 時，必須在對應的 barrel file 加上 re-export。

## TypeScript 嚴格模式

- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- 路徑別名：`@/*` -> `lib/*`，import 時優先使用 `@/` 路徑
- 目標：ES2020，JSX：react-jsx
- 泛型：善用 generic 提供型別安全（見 `useColumnSearch<DataType, DataIndex>`）
- 使用 `as const` 確保常數陣列的字面型別推導（見 `POST_STATUS`）

## Props 定義

- 簡單 props 直接在 FC 泛型中定義行內型別（見 `Amount` 元件）
- 複雜 props 抽為獨立 `T` 前綴型別（見 `TUpdateRecordProps`）
- 可選 props 搭配預設值（destructuring 時指定 default）

## Import 順序

1. React / React 生態系（react, react-dom）
2. 第三方套件（antd, @refinedev/*, axios, dayjs, lodash-es）
3. 內部模組（`@/main/*`, `@/refine/*`, `@/wp/*`）
4. 同層模組（相對路徑 `./`）
5. 型別 import（type-only import 使用 `import type`）

## 禁止事項

- 禁止使用 `@import` 引入 SCSS，改用 `@use`
- 禁止在元件中直接使用 `window.location` 以外的瀏覽器 API 而不做 guard
- 禁止在 library 程式碼中使用 `console.log`（`console.warn` / `console.error` 允許）
- 禁止使用 default export（唯一例外：`useUpdateRecord` 歷史因素）
- 禁止在 `lib/` 外的目錄放置要打包的程式碼

## Storybook 故事慣例

- 使用 CSF3 格式（`Meta` + `StoryObj`）
- `title` 按模組分類：`MAIN/...`, `REFINE/...`, `WP/...`
- `tags: ['autodocs']` 啟用自動文件產生
- Story 名稱使用繁體中文
- 描述可使用 Markdown 語法
- `parameters.layout` 選擇 `centered` 或 `padded`

## 範例參考

- 好的元件範例：`lib/main/components/Amount/index.tsx`（簡潔、型別明確）
- 好的 hook 範例：`lib/main/hooks/useColumnSearch.tsx`（完整泛型、清晰 API）
- 好的工具函式範例：`lib/main/utils/common/index.tsx`（JSDoc 註解完整）
- 好的 story 範例：`lib/main/components/Amount/index.stories.tsx`（CSF3 + autodocs）
