import { createContext, useContext } from 'react'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'

export const PropsContext = createContext<ReactCustomBlockRenderProps<
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema
> | null>(null)
export const useProps = () => {
	const props = useContext(PropsContext)

	if (!props) {
		throw new Error('useProps must be used within a PropsContext')
	}

	return props
}
