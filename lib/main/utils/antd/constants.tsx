import { SelectProps, RadioGroupProps, TableProps } from 'antd'

export const defaultSelectProps: SelectProps = {
	className: 'w-full',
	mode: 'multiple',
	optionRender: ({ value, label }) => {
		return (
			<span>
				<sub className="text-gray-500">#{value}</sub> {label}
			</span>
		)
	},
	allowClear: true,
	showSearch: true,
	optionFilterProp: 'label',
}

export const defaultBooleanRadioButtonProps: {
	radioGroupProps: RadioGroupProps
} = {
	radioGroupProps: {
		size: 'small',
	},
}

export const defaultTableProps: TableProps = {
	size: 'small',
	rowKey: 'id',
	bordered: true,
	sticky: true,
}
