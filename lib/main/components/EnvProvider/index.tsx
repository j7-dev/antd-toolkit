import React, { FC, useLayoutEffect } from 'react'
import { envAtom, TEnv, envStore } from './atom'
import { Provider } from 'jotai'

const EnvProviderComponent: FC<{
	children: React.ReactNode
	env: TEnv
}> = ({ children, env }) => {
	useLayoutEffect(() => {
		envStore.set(envAtom, env)
	}, [env])
	return <Provider store={envStore}>{children}</Provider>
}

export const EnvProvider = EnvProviderComponent
export * from './atom'
export * from './hooks'
