---
globs: "**/*.scss,**/*.tsx,**/*.ts,tailwind.config.js"
description: Tailwind CSS 與 SCSS 樣式規則，涵蓋前綴、衝突處理、斷點設定
---

# Tailwind CSS + SCSS 樣式規則

## Tailwind CSS 設定

### 前綴系統

- **所有 Tailwind class 必須使用 `at-` 前綴**
  - 正確：`at-flex`, `at-p-4`, `at-text-lg`, `at-whitespace-nowrap`
  - 錯誤：`flex`, `p-4`, `text-lg`

### 重要性選擇器

- `important: '#tw'` -- 所有 Tailwind class 只在 `#tw` 容器內生效
- Storybook preview 已在 `document.body` 設定 `id="tw"`
- 消費專案需自行確保存在 `id="tw"` 的容器

### WordPress 衝突 class

以下 class 因與 WordPress 核心 CSS 衝突，使用 `tw-` 前綴替代，定義在 `tailwind.config.js` 的 custom utilities：

| 禁止使用 | 替代方案 |
|----------|---------|
| `at-hidden` | `tw-hidden` |
| `at-block` | `tw-block` |
| `at-inline` | `tw-inline` |
| `at-fixed` | `tw-fixed` |
| `at-columns-1` | `tw-columns-1` |
| `at-columns-2` | `tw-columns-2` |

這些 class 同時在 `blocklist` 中被禁用，確保不會產生衝突。

### 自訂斷點

| 斷點 | 寬度 | 用途 |
|------|------|------|
| `sm` | 576px | iPhone SE |
| `md` | 810px | iPad Portrait |
| `lg` | 1080px | iPad Landscape |
| `xl` | 1280px | MacBook Air |
| `xxl` | 1440px | 大螢幕 |

### 自訂色彩

- `primary`: `#1677ff`（與 Ant Design 預設主色一致）

### 其他設定

- `preflight: false` -- 停用 CSS Reset，避免與 Ant Design 衝突
- `disableColorOpacityUtilitiesByDefault: true` -- 停用預設的顏色透明度工具
- `safelist: ['opacity-50']` -- 確保 opacity-50 一定被產出

## SCSS 規則

### Import 語法

- **必須使用 `@use` 語法**，禁止 `@import`
- 檔案結構：
  ```
  lib/main/assets/scss/
    index.scss         # 入口，@use 其他檔案
    _tailwind.scss     # Tailwind directives
    _variables.scss    # SCSS 變數
    global.scss        # 全域樣式
  ```

### 樣式入口

- 三個模組入口（main/refine/wp）都 import `@/main/assets/scss/index.scss`
- CSS 不做 code split，建置產出單一 `dist/style.css`
- 消費專案使用 `import 'antd-toolkit/style.css'` 引入

## `cn()` 工具函式

`lib/main/utils/common/index.tsx` 匯出 `cn()`，結合 `clsx` + `tailwind-merge`：

```tsx
import { cn } from 'antd-toolkit'
<div className={cn('at-flex at-p-4', isActive && 'at-bg-blue-500')} />
```

建議在需要條件式 class 合併時使用 `cn()`。

## 禁止事項

- 禁止使用非前綴的 Tailwind class（所有 class 必須加 `at-` 前綴）
- 禁止使用 `@import` 引入 SCSS
- 禁止在元件中使用 inline style 取代 Tailwind class（除非動態計算值）
- 禁止修改 Tailwind preflight 設定（已停用以避免 Ant Design 衝突）
