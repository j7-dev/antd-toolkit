import { createContext, useContext, FC } from 'react'
import type { TLocale } from '@/main/locales/types'
import { zh_TW } from '@/main/locales/zh_TW'

const LocaleContext = createContext<TLocale>(zh_TW)

export const LocaleProvider: FC<{
	children: React.ReactNode
	locale?: TLocale
}> = ({ children, locale = zh_TW }) => {
	return (
		<LocaleContext.Provider value={locale}>
			{children}
		</LocaleContext.Provider>
	)
}

export const useLocale = <K extends keyof TLocale>(
	namespace: K,
): TLocale[K] => {
	const locale = useContext(LocaleContext)
	return locale[namespace]
}
