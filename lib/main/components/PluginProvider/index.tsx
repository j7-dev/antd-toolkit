import React, { FC, useLayoutEffect } from 'react'
import { Provider } from 'jotai'
import { pluginStore, pluginAtom } from './atom'
import { usePlugin } from './hooks'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	app_domain: string
}> & {
	usePlugin: typeof usePlugin
} = ({ children, app_domain }) => {
	useLayoutEffect(() => {
		pluginStore.set(pluginAtom, {
			app_domain,
		})
	}, [app_domain])
	return <Provider store={pluginStore}>{children}</Provider>
}

PluginProviderComponent.usePlugin = usePlugin

export const PluginProvider = PluginProviderComponent
export * from './atom'
