import {
  POST_STATUS,
  ORDER_STATUS,
  PRODUCT_TYPES,
  PRODUCT_STOCK_STATUS,
  BACKORDERS,
} from '@/utils'

export type TConstant<T> = {
  label: string
  value: T
  color?: string
}

export type TGetColumnFilterProps<T> = {
  dataSource: readonly TConstant<string | number | boolean>[] | readonly T[]
  dataIndex: keyof T
  dataFrom?: 'local' | 'fetched'
  exactMatch?: boolean
}

// Term
export type TTerm = {
	id: string
	name: string
}

// 圖片
export type TImage = {
	id: number
	src: string
	thumbnail: string
	srcset: string
	sizes: string
	name: string
	alt: string
}

// 文章狀態
export type TPostStatus = (typeof POST_STATUS)[number]['value']

// 訂單狀態
export type TOrderStatus = (typeof ORDER_STATUS)[number]['value']

// 商品類型
export type TProductTypes = (typeof PRODUCT_TYPES)[number]['value']

// 商品庫存狀態
export type TProductStockStatus = (typeof PRODUCT_STOCK_STATUS)[number]['value']

// 商品允許缺貨
export type TBackorders = (typeof BACKORDERS)[number]['value']
