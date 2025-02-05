import { pluginAtom, pluginStore } from './atom'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const usePlugin = () => {
	const pluginAtomValue = pluginStore.get(pluginAtom)
	return pluginAtomValue
}
