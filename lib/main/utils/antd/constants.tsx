import { SelectProps, RadioGroupProps, TableProps } from 'antd'

export const defaultSelectProps: SelectProps = {
	placeholder: '搜尋',
	className: 'w-full',
	allowClear: true,
	showSearch: true,
	mode: 'multiple',
	optionRender: ({ value, label }) => {
		return (
			<span>
				{label} <span className="at-text-gray-400 at-text-xs">#{value}</span>
			</span>
		)
	},
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
