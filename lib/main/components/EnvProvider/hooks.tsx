import { useContext } from 'react'
import { EnvContext } from './index'

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const useEnv = () => {
	const context = useContext(EnvContext)
	return context
}
