import { useOne } from '@refinedev/core'
import { UseQueryOptions, QueryKey } from '@tanstack/react-query'
import { GetOneResponse, BaseRecord, HttpError } from '@refinedev/core'
import { TBunnyVideo } from '../types'
import { BunnyProvider } from '@/refine'

type TUseGetVideoParams<T = BaseRecord> = {
	videoId: string
	queryOptions?:
		| UseQueryOptions<GetOneResponse<T>, HttpError, GetOneResponse<T>, QueryKey>
		| undefined
}

export const useGetVideo = ({
	videoId,
	queryOptions,
}: TUseGetVideoParams<TBunnyVideo>) => {
	const { bunny_library_id } = BunnyProvider.useBunny()
	const result = useOne<TBunnyVideo>({
		resource: `${bunny_library_id}/videos`,
		id: videoId,
		dataProviderName: 'bunny-stream',
		queryOptions,
	})

	return result
}
