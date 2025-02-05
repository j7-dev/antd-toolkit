import React, { FC, useLayoutEffect } from 'react'
import { useSetAtom } from 'jotai'
import { pluginAtom, TEnv } from './atom'
import { usePlugin } from './hooks'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	env: TEnv
}> & {
	usePlugin: typeof usePlugin
} = ({ children, env }) => {
	const setPluginAtom = useSetAtom(pluginAtom)
	useLayoutEffect(() => {
		setPluginAtom(env)
	}, [env])
	return <>{children}</>
}

PluginProviderComponent.usePlugin = usePlugin

export const PluginProvider = PluginProviderComponent
export * from './atom'
