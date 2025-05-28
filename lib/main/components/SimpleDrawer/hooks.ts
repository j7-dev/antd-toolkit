import { useState } from 'react'
import { TSimpleDrawerProps } from './index'

export const useSimpleDrawer = () => {
	const [drawerProps, setDrawerProps] = useState<Partial<TSimpleDrawerProps>>({
		title: '媒體庫',
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
