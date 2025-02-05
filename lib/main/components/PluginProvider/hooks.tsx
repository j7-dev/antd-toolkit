import { pluginAtom } from './atom'
import { useAtomValue } from 'jotai'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const usePlugin = () => {
	const pluginAtomValue = useAtomValue(pluginAtom)
	return pluginAtomValue
}
