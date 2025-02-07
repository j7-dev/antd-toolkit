import { BaseRecord, CrudFilters } from '@refinedev/core'
import { DeleteButtonProps } from '@refinedev/antd'

export * from './woocommerce'

/**
 * 將 key-value 的物件轉換成 refine 的 crudFilters
 * 以便執行 refine 的 crud 操作
 * @param initialValues
 * @return RefineCrudFilters
 */
export function objToCrudFilters(values: BaseRecord) {
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

/**
 * 將 key-value 的物件轉換成 refine 的 crudFilters
 * 以便執行 refine 的 crud 操作
 * @deprecated 使用 objToCrudFilters 替代
 * @param values
 * @returns RefineCrudFilters
 */
export function getInitialFilters(values: BaseRecord) {
	return objToCrudFilters(values)
}

// refine 預設的 delete button 的 props
export const defaultDeleteButtonProps: DeleteButtonProps = {
	confirmTitle: '確認刪除嗎?',
	confirmOkText: '確認',
	confirmCancelText: '取消',
	hideText: true,
	type: 'text',
}
