import { Dayjs } from 'dayjs'
import { MetaQuery } from '@refinedev/core'
import {TExpireDate} from '@/main'

export type TGrantedItemBase = {
	id: string
	name: string
	expire_date: TExpireDate
}



export type TProductFilterProps = Partial<{
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



// refine useCustomMutation 的型別
export type UseCustomMutationParams<TVariables = {
	[key: string]: any
}> = {
	url: string
	method?: 'post' | 'put' | 'patch' | 'delete'
	values?: TVariables
	meta?: MetaQuery
	metaData?: MetaQuery
	dataProviderName?: string
	config?: {
		headers?: {}
	}
}
