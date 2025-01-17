import {
  POST_STATUS,
  ORDER_STATUS,
  PRODUCT_TYPES,
  PRODUCT_STOCK_STATUS,
  BACKORDERS,
} from '@/wp/utils'
import { Dayjs } from 'dayjs'

// Term
export type TTerm = {
	id: string
	name: string
}

// 圖片
export type TImage = {
	id: number
	url: string
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


export type TFilterProps = Partial<{
	s: string
	sku: string
	product_category_id?: string[]
	product_tag_id?: string[]
	product_brand_id?: string[]
	status: string
	featured: boolean
	downloadable: boolean
	virtual: boolean
	sold_individually: boolean
	backorders: string
	stock_status: string
	date_created: [Dayjs, Dayjs]
	is_course: boolean
	price_range: [number, number]
}>

