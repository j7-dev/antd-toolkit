import { CrudFilters, LogicalFilter } from '@refinedev/core'
import { TProductFilterProps } from '@/refine/types'
import {objToCrudFilters} from '@/refine'

/**
 * 將 WooCommerce 產品篩選條件轉換為 Refine CrudFilters
 * 搭配 refine useTable 使用
 * 此函數處理 WooCommerce 產品的篩選條件，將其轉換為 Refine 資料提供者可以理解的格式。
 * 它會將一般的鍵值對轉換為 CrudFilters，並處理特殊的篩選條件如日期範圍。
 *
 * @param {TProductFilterProps} values - 產品篩選條件物件
 * @returns {CrudFilters} 轉換後的 Refine CrudFilters 陣列
 *
 * @example
 * // 基本用法
 * const filters = onProductSearch({
 *   s: '搜尋關鍵字',
 *   type: 'simple',
 *   status: 'publish'
 * });
 *
 * @example
 * // 使用日期範圍篩選
 * const filters = onProductSearch({
 *   date_created: [startDate, endDate],
 *   status: 'publish'
 * });
 */

export const onProductSearch = (
	values: TProductFilterProps,
): CrudFilters | Promise<CrudFilters> => {
// 都轉為 crudFilters
const filters = objToCrudFilters(values)
// date_created 的 operator 要調整為 between
const handleDateOperator = filters.map(filter => {
	if ((filter as LogicalFilter)?.field === 'date_created') {
		filter.operator = 'between'
	}
	return filter
})

	return handleDateOperator
}