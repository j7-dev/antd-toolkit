import { TProductType } from '@/wp/types'
import { TProductFilterProps } from '@/refine'
import { POST_STATUS } from '@/wp'

export const PRODUCT_STATUS = POST_STATUS

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

/**
 * 商品類型
 * @see https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/src/Enums/ProductType.php
 * */
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
export const getIsVariation = (productType: TProductType) => {
  return ['variation', 'subscription_variation'].includes(productType)
}

/** Label 對應 */
export const getProductFilterLabels = (
	label = '商品',
): {
	[key in keyof TProductFilterProps]: string
} => ({
	s: '關鍵字',
	sku: '貨號(sku)',
	type: '商品類型',
	product_category_id: `${label}分類`,
	product_tag_id: `${label}標籤`,
	product_brand_id: '品牌',
	status: `${label}狀態`,
	featured: '精選商品',
	downloadable: '可下載',
	virtual: '虛擬商品',
	sold_individually: '單獨販售',
	backorders: '允許延期交貨',
	stock_status: '庫存狀態',
	date_created: `${label}發佈日期`,
	price_range: '價格範圍',
	author: '作者',
})

export const productKeyLabelMapper = (key: keyof TProductFilterProps, label = '商品'):string => {
	return getProductFilterLabels(label)?.[key] || key
}