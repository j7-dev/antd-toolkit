import { CrudFilters } from '@refinedev/core'
import { TProductFilterProps } from '@/refine/types'
export const onProductSearch = (
	values: TProductFilterProps,
): CrudFilters | Promise<CrudFilters> => {
	return [
		{
			field: 's',
			operator: 'eq',
			value: values.s,
		},
		{
			field: 'sku',
			operator: 'eq',
			value: values.sku,
		},
		{
			field: 'type',
			operator: 'in',
			value: values.type,
		},
		{
			field: 'product_category_id',
			operator: 'in',
			value: values.product_category_id,
		},
		{
			field: 'product_tag_id',
			operator: 'in',
			value: values.product_tag_id,
		},
		{
			field: 'product_brand_id',
			operator: 'in',
			value: values.product_brand_id,
		},
		{
			field: 'status',
			operator: 'in',
			value: values.status,
		},
		{
			field: 'featured',
			operator: 'eq',
			value: values.featured,
		},
		{
			field: 'is_course',
			operator: 'eq',
			value: values.is_course,
		},
		{
			field: 'downloadable',
			operator: 'eq',
			value: values.downloadable,
		},
		{
			field: 'virtual',
			operator: 'eq',
			value: values.virtual,
		},
		{
			field: 'sold_individually',
			operator: 'eq',
			value: values.sold_individually,
		},
		{
			field: 'backorders',
			operator: 'eq',
			value: values.backorders,
		},
		{
			field: 'stock_status',
			operator: 'eq',
			value: values.stock_status,
		},
		{
			field: 'date_created',
			operator: 'between',
			value: values?.date_created,
		},
		{ // TODO
			field: 'price_range',
			operator: 'eq',
			value: values?.price_range,
		},
		{
			field: 'author',
			operator: 'eq',
			value: values?.author,
		},
		{
			field: 'include',
			operator: 'in',
			value: values?.include,
		},

	]
}