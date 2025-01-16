import { CrudSorting } from '@refinedev/core'

// unset($args['order']);
// $args['orderby'] = [
// 	'menu_order' => 'ASC',
// 	'date'       => 'DESC',
// ];

// orderby['menu_order'] = 'ASC'
// orderby['date'] = 'DESC'

// sorters {field:string, order:string}[]
export const generateSort = (sorters?: CrudSorting): string => {
	if (!Array.isArray(sorters)) {
		return ''
	}

	const sortQueryString = sorters
		.map(({ field, order }) => {
			return `orderby[${field}]=${order}`
		})
		.join('&')

	return sortQueryString
}
