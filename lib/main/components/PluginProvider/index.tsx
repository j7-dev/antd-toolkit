import React, { FC, useLayoutEffect } from 'react'
import { Provider } from 'jotai'
import { pluginStore, pluginAtom, TEnv } from './atom'
import { usePlugin } from './hooks'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	env: TEnv
}> & {
	usePlugin: typeof usePlugin
} = ({ children, env }) => {
	useLayoutEffect(() => {
		pluginStore.set(pluginAtom, env)
	}, [env])
	return <Provider store={pluginStore}>{children}</Provider>
}

PluginProviderComponent.usePlugin = usePlugin

export const PluginProvider = PluginProviderComponent
export * from './atom'
