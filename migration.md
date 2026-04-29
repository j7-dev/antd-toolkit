# antd-toolkit i18n 遷移指南

## 概述

antd-toolkit 新增了多語系（i18n）支援，採用 `LocaleProvider` + `useLocale` 模式。

- **預設語系**：繁體中文（`zh_TW`），不需任何設定即可使用
- **切換語系**：包裹 `<LocaleProvider locale={en_US}>` 即可
- **向下相容**：所有既有 API 保持不變，不需要立即遷移

---

## 快速開始

### 不需要多語系（維持現狀）

不需要做任何改動，所有元件預設顯示繁體中文。

### 切換為英文

```tsx
import { LocaleProvider, en_US } from 'antd-toolkit'

function App() {
  return (
    <LocaleProvider locale={en_US}>
      <YourApp />
    </LocaleProvider>
  )
}
```

### 部分覆寫翻譯

```tsx
import { LocaleProvider, zh_TW } from 'antd-toolkit'
import type { TLocale } from 'antd-toolkit'

const myLocale: TLocale = {
  ...zh_TW,
  ActionButton: {
    ...zh_TW.ActionButton,
    edit: 'Edit',
    save: 'Save',
  },
}

function App() {
  return (
    <LocaleProvider locale={myLocale}>
      <YourApp />
    </LocaleProvider>
  )
}
```

### 搭配 WordPress i18n

```tsx
import { __ } from '@wordpress/i18n'
import { LocaleProvider, zh_TW } from 'antd-toolkit'
import type { TLocale } from 'antd-toolkit'

const wpLocale: TLocale = {
  ...zh_TW,
  ActionButton: {
    ...zh_TW.ActionButton,
    edit: __('編輯', 'your-text-domain'),
    save: __('儲存', 'your-text-domain'),
    cancel: __('取消', 'your-text-domain'),
    delete: __('刪除', 'your-text-domain'),
  },
  // 只需覆寫你想要透過 WordPress 翻譯系統管理的字串
}

function App() {
  return (
    <LocaleProvider locale={wpLocale}>
      <YourApp />
    </LocaleProvider>
  )
}
```

---

## 常數遷移（選擇性）

以下模組層級常數新增了對應的 Hook 版本。原常數**保留不變**，只有需要多語系時才需遷移。

### WordPress 常數

| 原常數 | Hook 版本 | import 來源 |
|--------|-----------|------------|
| `BOOLEAN_OPTIONS` | `useBooleanOptions()` | `antd-toolkit/wp` |
| `POST_STATUS` | `usePostStatus()` | `antd-toolkit/wp` |
| `PRODUCT_STATUS` | `usePostStatus()` | `antd-toolkit/wp` |
| `USER_ROLES` | `useUserRoles()` | `antd-toolkit/wp` |

```diff
- import { BOOLEAN_OPTIONS } from 'antd-toolkit/wp'
+ import { useBooleanOptions } from 'antd-toolkit/wp'

  const MyComponent = () => {
+   const BOOLEAN_OPTIONS = useBooleanOptions()
    return <Select options={BOOLEAN_OPTIONS} />
  }
```

### WooCommerce 常數

| 原常數 | Hook 版本 | import 來源 |
|--------|-----------|------------|
| `BACKORDERS` | `useBackorders()` | `antd-toolkit/wp` |
| `PRODUCT_STOCK_STATUS` | `useProductStockStatus()` | `antd-toolkit/wp` |
| `PRODUCT_DATE_FIELDS` | `useProductDateFields()` | `antd-toolkit/wp` |
| `PRODUCT_TYPES` | `useProductTypes()` | `antd-toolkit/wp` |
| `PRODUCT_CATALOG_VISIBILITIES` | `useProductCatalogVisibilities()` | `antd-toolkit/wp` |
| `ORDER_STATUS` | `useOrderStatus()` | `antd-toolkit/wp` |
| `getProductFilterLabels()` | `useProductFilterLabels()` | `antd-toolkit/wp` |

```diff
- import { ORDER_STATUS } from 'antd-toolkit/wp'
+ import { useOrderStatus } from 'antd-toolkit/wp'

  const OrderList = () => {
+   const ORDER_STATUS = useOrderStatus()
    return <Table columns={[
      {
        title: 'Status',
        render: (status) => {
          const item = ORDER_STATUS.find(s => s.value === status)
          return <Tag color={item?.color}>{item?.label}</Tag>
        }
      }
    ]} />
  }
```

### Refine 常數

| 原常數 | Hook 版本 | import 來源 |
|--------|-----------|------------|
| `defaultDeleteButtonProps` | `useDeleteButtonProps()` | `antd-toolkit/refine` |

```diff
- import { defaultDeleteButtonProps } from 'antd-toolkit/refine'
+ import { useDeleteButtonProps } from 'antd-toolkit/refine'

  const MyTable = () => {
+   const deleteButtonProps = useDeleteButtonProps()
    return (
-     <DeleteButton {...defaultDeleteButtonProps} />
+     <DeleteButton {...deleteButtonProps} />
    )
  }
```

### Antd 工具

| 原 API | Hook 版本 | import 來源 |
|--------|-----------|------------|
| `defaultSelectProps` | `useDefaultSelectProps()` | `antd-toolkit` |
| `getDefaultPaginationProps()` | `useDefaultPaginationProps()` | `antd-toolkit` |

```diff
- import { defaultSelectProps, getDefaultPaginationProps } from 'antd-toolkit'
+ import { useDefaultSelectProps, useDefaultPaginationProps } from 'antd-toolkit'

  const MyPage = () => {
+   const selectProps = useDefaultSelectProps()
+   const paginationProps = useDefaultPaginationProps('商品')
    return (
-     <Select {...defaultSelectProps} />
+     <Select {...selectProps} />
    )
  }
```

---

## 內建語系

| 語系 | import | 說明 |
|------|--------|------|
| `zh_TW` | `import { zh_TW } from 'antd-toolkit'` | 繁體中文（預設） |
| `en_US` | `import { en_US } from 'antd-toolkit'` | English |
| `ja_JP` | `import { ja_JP } from 'antd-toolkit'` | 日本語 |

### 自訂語系

實作 `TLocale` 型別即可新增語系：

```tsx
import type { TLocale } from 'antd-toolkit'

const ja_JP: TLocale = {
  ActionButton: {
    edit: '編集',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    confirmTitle: '削除してよろしいですか？',
    confirmOk: '確認',
    confirmCancel: 'キャンセル',
  },
  // ... 其他 namespace
}
```

---

## 注意事項

1. **LocaleProvider 必須在 React 樹的上層**：確保所有使用 antd-toolkit 元件的地方都被 `LocaleProvider` 包裹
2. **Hook 版本只能在 React 元件/Hook 中使用**：`useBooleanOptions()` 等不能在模組頂層或純函式中呼叫
3. **語系切換需要重新渲染**：切換 `locale` prop 會觸發所有使用 `useLocale` 的元件重新渲染
4. **Ant Design 自身的語系需要另外設定**：antd-toolkit 的 `LocaleProvider` 只管 antd-toolkit 的元件文字，Ant Design 元件（如 Table 的空狀態文字、Pagination 等）需要透過 antd 的 `ConfigProvider` + `locale` 另外設定
