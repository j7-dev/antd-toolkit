import { BaseRecord, CrudFilters } from '@refinedev/core'
import { DeleteButtonProps } from '@refinedev/antd'

/**
 * Get initial filters Refine 用
 * @param initialValues
 * @return RefineCrudFilters
 */

export function getInitialFilters(values: BaseRecord) {
	return Object.keys(values).reduce((acc: CrudFilters, key) => {
		if (values[key]) {
			acc.push({
				field: key,
				operator: 'eq',
				value: values[key],
			})
		}
		return acc
	}, [])
}

// refine 預設的 delete button 的 props
export const defaultDeleteButtonProps: DeleteButtonProps = {
	confirmTitle: '確認刪除嗎?',
	confirmOkText: '確認',
	confirmCancelText: '取消',
	hideText: true,
	type: 'text',
}
