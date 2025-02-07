import React, { FC, memo, createContext } from 'react'
import { FormProps } from 'antd'
import { useWindowSize } from '@uidotdev/usehooks'
import FullFilter from './FullFilter'
import MobileFilter from './MobileFilter'
import { TTerm } from '@/wp'

export type TOptions = {
	product_cats: TTerm[]
	product_tags: TTerm[]
	product_brands: (TTerm & {
		logo: string
	})[]
	top_sales_products: (TTerm & {
		total_sales: number
	})[]
	max_price: number
	min_price: number
	isLoading: boolean
}

export const defaultOptions: TOptions = {
	product_cats: [],
	product_tags: [],
	product_brands: [],
	top_sales_products: [],
	max_price: 0,
	min_price: 0,
	isLoading: false,
}

export const FilterContext = createContext<TOptions>(defaultOptions)

/**
 * 預設的產品過濾器
 * @see https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
 */

const ProductFilterComponent: FC<{
	searchFormProps: FormProps
	options: TOptions
	mobileWidth: number // 螢幕尺寸低於多少使用手機板
}> = ({ searchFormProps, options, mobileWidth = 810 }) => {
	const { width = 1920 } = useWindowSize()
	const isMobile = width ? width < mobileWidth : false

	if (isMobile) {
		return (
			<MobileFilter>
				<FilterContext.Provider value={options}>
					<FullFilter searchFormProps={searchFormProps} />
				</FilterContext.Provider>
			</MobileFilter>
		)
	}

	return (
		<FilterContext.Provider value={options}>
			<FullFilter searchFormProps={searchFormProps} />
		</FilterContext.Provider>
	)
}

export const ProductFilter = memo(ProductFilterComponent)
