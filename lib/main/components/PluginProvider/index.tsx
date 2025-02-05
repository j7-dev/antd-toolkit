import React, { FC, useLayoutEffect } from 'react'
import { Provider } from 'jotai'
import { pluginStore, pluginAtom, TEnv } from './atom'
import { usePlugin } from './hooks'
import { simpleDecrypt } from '@/main/utils'

const PluginProviderComponent: FC<{
	children: React.ReactNode
	env: TEnv // 包含加密後的環境變數
}> & {
	usePlugin: typeof usePlugin
} = ({ children, env }) => {
	useLayoutEffect(() => {
		const decryptedEnv = {
			...env,
			// 以下幾個參數都需要解密
			NONCE: simpleDecrypt(env.NONCE),
			BUNNY_LIBRARY_ID: simpleDecrypt(env.BUNNY_LIBRARY_ID),
			BUNNY_CDN_HOSTNAME: simpleDecrypt(env.BUNNY_CDN_HOSTNAME),
			BUNNY_STREAM_API_KEY: simpleDecrypt(env.BUNNY_STREAM_API_KEY),
		}
		pluginStore.set(pluginAtom, decryptedEnv)
	}, [env])
	return <Provider store={pluginStore}>{children}</Provider>
}

PluginProviderComponent.usePlugin = usePlugin

export const PluginProvider = PluginProviderComponent
export * from './atom'
