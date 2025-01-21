import React, { FC, useLayoutEffect } from 'react'
import { atom, Provider, useAtomValue, createStore } from 'jotai'

export const pluginStore = createStore()

export const pluginAtom = atom<{
	app_domain: string
}>({
	app_domain: '',
})

export const PluginProvider: FC<{
	children: React.ReactNode
	app_domain: string
}> = ({ children, app_domain }) => {
	useLayoutEffect(() => {
		pluginStore.set(pluginAtom, {
			app_domain,
		})
	}, [app_domain])
	return <Provider store={pluginStore}>{children}</Provider>
}

/**
 * 從 Bootstrap::wp_localize_script env 傳給前端的參數
 */
export const usePlugin = () => {
	const pluginAtomValue = useAtomValue(pluginAtom)
	const appDomain = pluginAtomValue.app_domain
	const env = window?.[appDomain]?.env
	const wpApiSettings = window?.[appDomain]?.wpApiSettings
	return {
		...env,
		...wpApiSettings,
	}
}
