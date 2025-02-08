import { SelectProps, RadioGroupProps, TableProps } from 'antd'
import { NameId } from '@/main'

export const defaultSelectProps: SelectProps = {
	placeholder: '搜尋',
	className: 'at-w-full',
	allowClear: true,
	showSearch: true,
	mode: 'multiple',
	optionRender: ({ value, label }) => {
		return <NameId name={label} id={value as string} />
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
