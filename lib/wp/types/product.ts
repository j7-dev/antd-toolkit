import {
	PRODUCT_TYPES,
	PRODUCT_STOCK_STATUS,
	BACKORDERS,
} from '@/wp/utils'
import { TImage } from '@/wp/types'

// 商品類型
export type TProductType = (typeof PRODUCT_TYPES)[number]['value']

// 商品庫存狀態
export type TProductStockStatus = (typeof PRODUCT_STOCK_STATUS)[number]['value']

// 商品允許缺貨
export type TBackorders = (typeof BACKORDERS)[number]['value']


export type TProductAttribute = {
	id:string
	name: string
	taxonomy: string
	variation: boolean
	visible: boolean
	options: {value:string,label:string}[]
	position: number
}

export type TProductBaseRecord = {
	// 商品基本資料
	id: string
	type: Omit<TProductType, 'variation' | "subscription_variation">
	name: string
	slug: string
	date_created: string
	date_modified: string
	status: string
	featured: boolean
	catalog_visibility: string
	sku: string
	menu_order: number
	virtual: boolean
	downloadable: boolean
	permalink: string
	edit_url:string
	parent_id: string

	// 商品描述
	description?: string
	short_description?: string
	page_template?: string
	page_template_options?: {
		value: string
		label: string
	}[]

	// 商品價格
	price_html: string
	regular_price: string
	sale_price: string
	on_sale: boolean
	sale_date_range: [number, number]
	date_on_sale_from?: number
	date_on_sale_to?: number
	total_sales: number

	// 商品庫存
	stock: number | null
	stock_status: TProductStockStatus
	manage_stock: boolean
	stock_quantity: number | null
	backorders: TBackorders
	backorders_allowed: boolean
	backordered: boolean
	low_stock_amount: number | null

	// 交叉銷售商品
	upsell_ids: number[]
	cross_sell_ids: number[]

	// 商品屬性
	attributes: TProductAttribute[]
	attribute_summary: string

	// 商品分類
	category_ids: string[]
	tag_ids: string[]

	// 圖片
	images: TImage[]



	// 訂閱商品資料
	_subscription_price?: string
	_subscription_period?: string
	_subscription_period_interval?: string
	_subscription_length?: string
	_subscription_sign_up_fee?: string
	_subscription_trial_length?: string
	_subscription_trial_period?: string

	// 可變商品變體
	children?: TProductVariationBase[]
}

export type TProductVariationBase = TProductBaseRecord & {
	type: Extract<TProductType, 'variation' | "subscription_variation">
}
