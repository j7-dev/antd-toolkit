import { useList } from '@refinedev/core'
import { bunny_library_id } from '@/utils'
import { UseQueryOptions, QueryKey } from '@tanstack/react-query'
import {
  GetListResponse,
  HttpError,
} from '@refinedev/core/dist/contexts/data/types'
import { TBunnyVideo } from '@/refine/bunny/types'

type TUseListVideoParams<T = TBunnyVideo> = {
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
  const queryOptions = params?.queryOptions
  const result = useList({
    resource: `${bunny_library_id}/videos`,
    pagination: {
      pageSize: 50,
    },
    dataProviderName: 'bunny-stream',
    queryOptions,
  })

  return result
}
