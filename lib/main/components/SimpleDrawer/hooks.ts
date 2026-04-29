import { useState } from 'react'
import { TSimpleDrawerProps } from './index'
import { useLocale } from '@/main/components/LocaleProvider'

export const useSimpleDrawer = () => {
	const t = useLocale('SimpleDrawerModal')

	const [drawerProps, setDrawerProps] = useState<Partial<TSimpleDrawerProps>>({
		title: t.defaultTitle,
	})


	const show = () => {
		setDrawerProps((prev) => ({
			...prev,
			transform: 'translateX(0)',
			pointerEvents: 'auto',
			opacity: 1,
		}))
	}

	const close = () => {
		setDrawerProps((prev) => ({
			...prev,
			transform: 'translateX(-100%)',
			pointerEvents: 'none',
			opacity: 0,
		}))
	}

	drawerProps.onCancel = close

	return {
		show,
		close,
		drawerProps,
		setDrawerProps
	}
}
