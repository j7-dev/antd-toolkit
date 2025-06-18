import { useList } from '@refinedev/core'
import { UseQueryOptions, QueryKey } from '@tanstack/react-query'
import { GetListResponse, HttpError } from '@refinedev/core'
import { TBunnyVideo } from '../types'
import { useBunny } from '@/refine'

type TUseListVideoParams<T = TBunnyVideo> = {
	dataProviderName?: string
	queryOptions?:
	| UseQueryOptions<
		GetListResponse<T>,
		HttpError,
		GetListResponse<T>,
		QueryKey
	>
	| undefined
}

export const useListVideo = (params?: TUseListVideoParams) => {
	try {
		const { bunny_library_id } = useBunny()
		const queryOptions = params?.queryOptions
		const result = useList({
			resource: `${bunny_library_id}/videos`,
			pagination: {
				pageSize: 50,
			},
			dataProviderName: params?.dataProviderName || 'bunny-stream',
			queryOptions: {
				enabled: !!bunny_library_id,
				...queryOptions,
			},
		})

		return result
	} catch (error) {
		console.error('❌', error)
		return {
			data: [],
			isFetching: false,
			isLoading: false,
			isError: true,
		}
	}
}
