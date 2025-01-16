import { TProductTypes } from '@/main/types'

// 無庫存下單
export const BACKORDERS = [
  { label: '不允許', value: 'no' as const },
  { label: '允許', value: 'yes' as const },
  { label: '只有缺貨時允許', value: 'notify' as const },
]

export const PRODUCT_STOCK_STATUS = [
  {
    label: '有庫存',
    value: 'instock' as const,
    color: 'blue',
  },
  {
    label: '缺貨',
    value: 'outofstock' as const,
    color: 'magenta',
  },
  {
    label: '預定',
    value: 'onbackorder' as const,
    color: 'cyan',
  },
]

export const PRODUCT_DATE_FIELDS = [
  {
    label: '商品發佈日期',
    value: 'date_created',
  },
  {
    label: '商品修改日期',
    value: 'date_modified',
  },
  {
    label: '特價開始日期',
    value: 'date_on_sale_from',
  },
  {
    label: '特價結束日期',
    value: 'date_on_sale_to',
  },
]

// 商品類型
export const PRODUCT_TYPES = [
  {
    value: 'simple' as const,
    label: '簡單商品',
    color: 'processing', // 藍色
  },
  {
    value: 'grouped' as const,
    label: '組合商品',
    color: 'orange', // 綠色
  },
  {
    value: 'external' as const,
    label: '外部商品',
    color: 'lime', // 橘色
  },
  {
    value: 'variable' as const,
    label: '可變商品',
    color: 'magenta', // 紅色
  },
  {
    value: 'variation' as const,
    label: '商品變體',
    color: 'magenta', // 紅色
  },
  {
    value: 'subscription' as const,
    label: '簡易訂閱',
    color: 'cyan', // 紫色
  },
  {
    value: 'variable-subscription' as const,
    label: '可變訂閱',
    color: 'purple', // 青色
  },
  {
    value: 'subscription_variation' as const,
    label: '訂閱變體',
    color: 'purple',
  },
]

/**
 * 判斷是否為商品變體
 */
export const getIsVariation = (productType: TProductTypes) => {
  return ['variation', 'subscription_variation'].includes(productType)
}
