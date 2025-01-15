import React, { FC, memo } from 'react'
import { FormProps } from 'antd'
import { TUseOptionsParams } from '@/components/product/ProductTable/hooks/useOptions'
import { useWindowSize } from '@uidotdev/usehooks'
import FullFilter from './FullFilter'
import MobileFilter from './MobileFilter'

export const initialFilteredValues = {
	status: [],
	featured: '',
	downloadable: '',
	virtual: '',
	sold_individually: '',
	is_course: '',
}

/**
 * Filter Component for WooCommerce Product Selector
 * @see https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
 */

const Filter: FC<{
	searchFormProps: FormProps
	optionParams?: TUseOptionsParams
	isCourse?: boolean
}> = ({ searchFormProps, optionParams, isCourse = false }) => {
	const { width = 1920 } = useWindowSize()
	const isMobile = width ? width < 810 : false

	if (isMobile) {
		return (
			<MobileFilter>
				<FullFilter
					searchFormProps={searchFormProps}
					optionParams={optionParams}
					isCourse={isCourse}
				/>
			</MobileFilter>
		)
	}

	return (
		<FullFilter
			searchFormProps={searchFormProps}
			optionParams={optionParams}
			isCourse={isCourse}
		/>
	)
}

export default memo(Filter)
