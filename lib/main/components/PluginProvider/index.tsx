import React, { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { pluginAtom, TEnv } from './atom'
import { Provider } from 'jotai'

type Props = {
	children: React.ReactNode
	env: TEnv
}

// 建立一個內部組件來處理 env 的更新
const PluginUpdater = ({ env }: { env: TEnv }) => {
	const setPlugin = useSetAtom(pluginAtom)

	useEffect(() => {
		setPlugin(env)
	}, [env, setPlugin])

	return null
}

export const PluginProvider = ({ children, env }: Props) => {
	return (
		<Provider>
			<PluginUpdater env={env} />
			{children}
		</Provider>
	)
}

export * from './atom'
export * from './hooks'
