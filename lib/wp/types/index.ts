import {
  POST_STATUS,
  ORDER_STATUS,
} from '@/wp/utils'

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


export * from './product'

export type TUserBaseRecord = {
	id: string
	user_login: string
	user_email: string
	display_name: string
	user_registered: string
	user_registered_human: string
	user_avatar_url: string
	description: string
	roles: string[]
	billing_phone: string
	date_last_active: string | null
	date_last_order: string | null
	orders_count: number | null
	total_spend: number | null
	avg_order_value: number | null
	pc_birthday: number | null // timestamp 10位
}

