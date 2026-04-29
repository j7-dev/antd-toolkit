# antd-toolkit

Ant Design 元件庫封裝，發布至 npm。提供 main / refine / wp 三個獨立匯出模組。

---

## 技術棧

| 類別 | 選擇 | 版本 |
|------|------|------|
| Runtime | React | 18.3.1 |
| UI Framework | Ant Design | 5.25.3 |
| Language | TypeScript (strict) | 5.7.3 |
| Bundler | Vite (library mode, ESM) | 5.4.14 |
| CSS | Tailwind CSS | 3.4.17 |
| CSS Preprocessor | Sass | 1.83.4 |
| Docs | Storybook | 8.5.3 |
| State | Jotai | 2.11.3 |
| Validation | Zod | 3.25.x |
| Package Manager | pnpm | - |

---

## 架構概覽

```
lib/
  main/                 # 主模組 -> antd-toolkit
    components/         # 通用 UI 元件（Amount, CopyText, Editor, FormItem 等）
    hooks/              # useColor, useColumnSearch, useConstantSelect, useRowSelection
    utils/              # 工具函式：antd/, api/, common/, dayjs, video, zod
    types/              # 共用型別（TConstant, TLimit, TVideo, env/global.d.ts）
    assets/scss/        # 全域 SCSS（Tailwind + global）
  refine/               # Refine 模組 -> antd-toolkit/refine
    components/         # FilterTags, BindItems, ProductFilter, GrantUsers 等
    hooks/              # useUpdateRecord（inline editable table）
    dataProvider/       # WordPress REST API data provider + bunny-stream provider
    bunny/              # BunnyCDN 影片整合（MediaLibrary, Provider, hooks）
    utils/              # notificationProvider, objToCrudFilters, WooCommerce 工具
    types/              # Refine 專用型別
  wp/                   # WordPress 模組 -> antd-toolkit/wp
    components/
      general/          # Upload, MediaLibrary, MediaLibraryModal, BackToWpAdmin
      formItem/         # FileUpload
      product/          # ProductName, ProductPrice, ProductCat, ProductStock 等
      user/             # UserName, UserAvatarUpload, UserFilter, UserRole
    hooks/              # useItemSelect, useWoocommerce
    utils/              # POST_STATUS, USER_ROLES, WooCommerce 常數與工具
    types/              # TProductBaseRecord, TUserBaseRecord, TOrderStatus
```

---

## 匯出設定

| import 路徑 | 對應建置產出 |
|---|---|
| `antd-toolkit` | `dist/main/index.js` |
| `antd-toolkit/refine` | `dist/refine/index.js` |
| `antd-toolkit/wp` | `dist/wp/index.js` |
| `antd-toolkit/style.css` | `dist/style.css` |

每個 `lib/**/*.{ts,tsx}`（排除 stories）都是獨立 entry point，支援 tree-shaking。

---

## 常用指令

```bash
pnpm dev              # Vite build --watch
pnpm build            # 正式建置
pnpm lint             # ESLint 檢查
pnpm lint:fix         # ESLint 自動修復
pnpm storybook        # 啟動 Storybook (port 6006)
pnpm build-storybook  # 建置靜態 Storybook
pnpm publish:npm      # build -> version patch -> git push -> npm publish
```

本專案無單元測試。Storybook 為主要的元件文件與視覺驗證方式。

---

## 開發慣例

- **格式化**：Prettier（tabs, 單引號, 無分號, trailing comma, print width 80）
- **Linting**：ESLint（extends `@power/eslint-config`）
- **命名**：元件 PascalCase、hooks `useXxx`、型別 `T` prefix（`TProductBaseRecord`）
- **Commit**：Conventional Commits，繁體中文描述
- **分支**：master 為主分支

---

## 關鍵檔案索引

- `lib/main/index.tsx` -- 主模組入口，re-export components/hooks/utils/types
- `lib/refine/index.tsx` -- Refine 模組入口
- `lib/wp/index.tsx` -- WordPress 模組入口
- `lib/refine/dataProvider/index.ts` -- WordPress REST API data provider 實作
- `lib/main/components/EnvProvider/index.tsx` -- 環境變數 Context（AJAX_URL, API_URL, NONCE 等）
- `vite.config.ts` -- Vite library mode 建置設定
- `tailwind.config.js` -- Tailwind CSS 設定（prefix `at-`, important `#tw`）

---

## 既有工具

- `.claude/rules/` -- 語言/框架層級開發規則
- `specs/` -- 模組架構規格

---

## 快速上手（For AI Agents）

1. 先讀本檔
2. 讀 `.claude/rules/*.rule.md` 了解程式碼慣例
3. 讀 `specs/` 了解模組架構
4. 新增元件時：建立獨立資料夾 `ComponentName/index.tsx` + `index.stories.tsx`，在對應模組的 `components/index.ts` 加上 re-export
5. 新增 hook 時：在對應模組的 `hooks/` 下建檔，在 `hooks/index.tsx` 加上 re-export
