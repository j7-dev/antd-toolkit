import { useOne } from '@refinedev/core'
import { UseQueryOptions, QueryKey } from '@tanstack/react-query'
import {
  GetOneResponse,
  BaseRecord,
  HttpError,
} from '@refinedev/core/dist/contexts/data/types'
import { bunny_library_id } from '@/utils'
import { TBunnyVideo } from '../types'

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
  const result = useOne<TBunnyVideo>({
    resource: `${bunny_library_id}/videos`,
    id: videoId,
    dataProviderName: 'bunny-stream',
    queryOptions,
  })

  return result
}
