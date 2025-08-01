import React, { FC, createContext, useContext, useMemo } from 'react'
import { AxiosInstance } from 'axios'

export type TEnv = {
	SITE_URL: string
	AJAX_URL: string
	API_URL: string
	CURRENT_USER_ID: number
	CURRENT_POST_ID: string | false
	PERMALINK: string
	APP_NAME: string
	KEBAB: string
	SNAKE: string
	NONCE: string
	BUNNY_LIBRARY_ID?: string
	BUNNY_CDN_HOSTNAME?: string
	BUNNY_STREAM_API_KEY?: string
	AXIOS_INSTANCE?: AxiosInstance
} & {
	[key: string]: any
}

export const EnvContext = createContext<TEnv>({
	SITE_URL: '',
	AJAX_URL: '',
	API_URL: '',
	CURRENT_USER_ID: 0,
	CURRENT_POST_ID: '',
	PERMALINK: '',
	APP_NAME: '',
	KEBAB: '',
	SNAKE: '',
	NONCE: '',
	ELEMENTOR_ENABLED: true,
})

export const EnvProvider: FC<{
	children: React.ReactNode
	env: TEnv
}> = ({ children, env }) => {
	const parentContext = useContext(EnvContext)

	const context = useMemo(() => {
		return {
			...parentContext,
			...env,
		}
	}, [env, parentContext])

	return <EnvContext.Provider value={context}>{children}</EnvContext.Provider>
}

export * from './hooks'
