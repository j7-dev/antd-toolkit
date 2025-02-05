import { useAtomValue } from 'jotai'
import { envAtom } from './atom'
/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const useEnv = () => {
	const envAtomValue = useAtomValue(envAtom)
	return envAtomValue
}
