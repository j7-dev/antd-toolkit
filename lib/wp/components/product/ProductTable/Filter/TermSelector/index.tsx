import React, { FC, memo } from 'react'
import { useSelect } from '@refinedev/antd'
import { Form, Select, FormItemProps, SelectProps } from 'antd'
import { TFilterProps, TTerm } from '@/components/product/ProductTable/types'
import { keyLabelMapper } from '@/components/product/ProductTable/utils'
import { defaultSelectProps } from '@/utils'

const { Item } = Form

type TTermSelector = {
	name: [keyof TFilterProps]
	taxonomy: string
	formItemProps?: Omit<FormItemProps, 'name'>
	selectProps?: SelectProps
}

/**
 * TermSelector Component for WooCommerce Product Filter
 * Fetches terms from WordPress API and renders a Select component.
 *
 * @param name          Field name in Form, passed to WooCommerce `wc_get_products` PHP function.
 * @param taxonomy      WordPress term taxonomy name, optional.
 * @param formItemProps Antd Form.Item props, excluding `name`.
 * @param selectProps   Antd Select props, optional.
 * @return ReactNode
 */

const TermSelector: FC<TTermSelector> = ({
	name: formName,
	taxonomy,
	formItemProps,
	selectProps,
}) => {
	const name = formName[0]
	const fieldLabel = keyLabelMapper(name)
	const { selectProps: selectPropsFetched } = useSelect<TTerm>({
		resource: 'terms',
		optionLabel: 'name',
		optionValue: 'id',
		sorters: [
			{
				field: 'name',
				order: 'asc',
			},
		],
		pagination: {
			mode: 'off',
		},
		filters: [
			{
				field: 'taxonomy',
				operator: 'eq',
				value: taxonomy,
			},
		],
		errorNotification: () => {
			return {
				message: `獲取${fieldLabel} API 失敗`,
				type: 'error',
			}
		},
	})

	return (
		<Item name={formName} label={fieldLabel} {...formItemProps}>
			<Select
				{...defaultSelectProps}
				{...selectPropsFetched}
				size="small"
				placeholder="可多選"
				{...selectProps}
			/>
		</Item>
	)
}

export default memo(TermSelector)
