import React, { FC, useLayoutEffect } from 'react'
import { useSetAtom } from 'jotai'
import { pluginAtom, TEnv } from './atom'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	env: TEnv
}> = ({ children, env }) => {
	const setPluginAtom = useSetAtom(pluginAtom)
	useLayoutEffect(() => {
		setPluginAtom(env)
	}, [env])
	return <>{children}</>
}

export const PluginProvider = PluginProviderComponent
export * from './atom'
export * from './hooks'
