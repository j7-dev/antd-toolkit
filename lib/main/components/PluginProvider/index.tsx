import React, { FC, useLayoutEffect } from 'react'
import { Provider } from 'jotai'
import { pluginStore, pluginAtom, TEnv } from './atom'
import { usePlugin } from './hooks'
import { simpleDecrypt } from '@/main/utils'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	env: string // 加密後的環境變數
}> & {
	usePlugin: typeof usePlugin
} = ({ children, env }) => {
	useLayoutEffect(() => {
		const decryptedEnv = simpleDecrypt(env) as TEnv
		pluginStore.set(pluginAtom, decryptedEnv)
	}, [env])
	return <Provider store={pluginStore}>{children}</Provider>
}

PluginProviderComponent.usePlugin = usePlugin

export const PluginProvider = PluginProviderComponent
export * from './atom'
