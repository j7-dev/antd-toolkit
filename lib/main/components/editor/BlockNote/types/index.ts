import {
	DefaultStyleSchema,
	DefaultInlineContentSchema,
	BlockNoteEditorOptions,
	BlockNoteEditor,
	BlockSchemaFromSpecs,
} from '@blocknote/core'
import { DefaultReactSuggestionItem } from '@blocknote/react'
import { schema } from '../useBlockNote'

export type TApiConfig = {
	apiEndpoint: string
	headers?: Headers
}

export type TUseBlockNoteParams = {
	editor?: BlockNoteEditor<BlockSchemaFromSpecs<any>>
	options?: BlockNoteEditorOptions<
		typeof schema.blockSchema,
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
