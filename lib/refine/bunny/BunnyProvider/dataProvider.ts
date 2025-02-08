/**
 * TODO Bunny 用
 * 還沒有調整過
 * 目前應該只有 getList / getOne / deleteOne 能用
 *
 */

import { DataProvider } from '@refinedev/core'
import { generateSort, generateFilter } from '@/refine/dataProvider/utils'
import { AxiosInstance, AxiosResponse } from 'axios'
import queryString from 'query-string'
import { THttpMethods, THttpMethodsWithBody } from '@/main/types'
import { TGetVideosResponse } from '@/refine'

const { stringify } = queryString


export const dataProvider = (
	apiUrl: string,
	httpClient: AxiosInstance,
): Omit<
	Required<DataProvider>,
	'createMany' | 'updateMany' | 'deleteMany'
> => ({
	getList: async ({ resource, pagination, filters, sorters, meta }) => {
		const url = `${apiUrl}/${resource}`

		const { current = 1, pageSize = 20, mode = 'server' } = pagination ?? {}

		const { headers: headersFromMeta, method } = meta ?? {}
		const requestMethod = (method as THttpMethods) ?? 'get'

		const queryFilters = generateFilter(filters)

		const query: {
			page?: number
			itemsPerPage?: number
			search?: string | null
			collection?: string | null
			orderBy?: string | null //Defaults to date
		} = {}

		if (mode === 'server') {
			query.page = current
			query.itemsPerPage = pageSize
		}

		// const generatedSort = generateSort(sorters)
		// if (generatedSort) {
		// 	const { _sort, _order } = generatedSort
		// 	query.orderby = _sort.join(',')
		// 	query.order = _order.join(',')
		// }

		const { data } = (await httpClient[requestMethod](
			`${url}?${stringify(query)}&${stringify(queryFilters, { arrayFormat: 'bracket' })}`,
			{
				headers: headersFromMeta,
			},
		)) as AxiosResponse<TGetVideosResponse>

		const total = data?.totalItems || data?.items?.length || 0
		const items = data?.items || []

		return {
			data: items,
			total,
		}
	},

	getMany: async ({ resource, ids, meta }) => {
		const { headers, method } = meta ?? {}
		const requestMethod = (method as THttpMethods) ?? 'get'

		const { data } = await httpClient[requestMethod](
			`${apiUrl}/${resource}?${stringify({ id: ids }, { arrayFormat: 'bracket' })}`,
			{ headers },
		)

		return {
			data,
		}
	},

	create: async ({ resource, variables, meta }) => {
		const url = `${apiUrl}/${resource}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as THttpMethodsWithBody) ?? 'post'

		const { data } = await httpClient[requestMethod](url, variables, {
			headers,
		})

		return {
			data,
		}
	},

	update: async ({ resource, id, variables, meta }) => {
		const url = `${apiUrl}/${resource}/${id}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as THttpMethodsWithBody) ?? 'post'

		const { data } = await httpClient[requestMethod](url, variables, {
			headers,
		})

		return {
			data,
		}
	},

	getOne: async ({ resource, id, meta }) => {
		const url = `${apiUrl}/${resource}/${id}`

		const { headers, method } = meta ?? {}
		const requestMethod = (method as THttpMethods) ?? 'get'

		const { data } = await httpClient[requestMethod](url, { headers })

		return {
			data,
		}
	},

	deleteOne: async ({ resource, id, variables, meta }) => {
		const url = `${apiUrl}/${resource}/${id}`
		const { headers, method } = meta ?? {}
		const requestMethod = (method ?? 'delete') as THttpMethodsWithBody

		const result = await httpClient?.[requestMethod](url, {
			data: variables,
			headers,
		})

		return {
			data: result.data,
		}
	},

	getApiUrl: () => {
		return apiUrl
	},

	custom: async ({
		url,
		method,
		filters,
		sorters,
		payload,
		query,
		headers,
	}) => {
		let requestUrl = `${url}?`

		if (sorters) {
			const sortQueryString = generateSort(sorters)
			requestUrl = `${requestUrl}&${sortQueryString}`
		}

		if (filters) {
			const filterQuery = generateFilter(filters)
			requestUrl = `${requestUrl}&${stringify(filterQuery, { arrayFormat: 'bracket' })}`
		}

		if (query) {
			requestUrl = `${requestUrl}&${stringify(query, { arrayFormat: 'bracket' })}`
		}

		if (headers) {
			httpClient.defaults.headers = {
				...httpClient.defaults.headers,
				...headers,
			}
		}

		let axiosResponse
		switch (method) {
			case 'put':
			case 'post':
			case 'patch':
				axiosResponse = await httpClient[method](url, payload)
				break
			case 'delete':
				axiosResponse = await httpClient.delete(url, {
					data: payload,
				})
				break
			default:
				axiosResponse = await httpClient.get(requestUrl)
				break
		}

		const { data } = axiosResponse

		return Promise.resolve({ data })
	},
})
