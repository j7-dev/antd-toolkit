import { useAtomValue } from 'jotai'
import { pluginAtom } from './atom'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const usePlugin = () => {
	const pluginAtomValue = useAtomValue(pluginAtom)
	const appDomain = pluginAtomValue.app_domain
	// @ts-ignore
	const env = window?.[appDomain]?.env
	// @ts-ignore
	const wpApiSettings = window?.[appDomain]?.wpApiSettings
	return {
		...env,
		...wpApiSettings,
	}
}
