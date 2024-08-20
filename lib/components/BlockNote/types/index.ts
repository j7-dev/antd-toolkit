import {
  DefaultStyleSchema,
  DefaultInlineContentSchema,
  BlockNoteEditorOptions,
  DefaultBlockSchema,
} from '@blocknote/core'
import { DefaultReactSuggestionItem } from '@blocknote/react'

export type TApiConfig = {
  apiEndpoint: string
  headers?: Headers
}

export type TUseBlockNoteParams = {
  options?: BlockNoteEditorOptions<
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema
  >
  deps?: React.DependencyList
  apiConfig: TApiConfig
  itemsFilter?: (
    _items: DefaultReactSuggestionItem[],
    _query: string,
  ) => DefaultReactSuggestionItem[]
}
