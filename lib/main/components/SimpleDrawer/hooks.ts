import { useState } from 'react'
import { TSimpleDrawerProps } from './index'

type TUseSimpleDrawerParams = {
	closeConfirm?: boolean
}

export const useSimpleDrawer = (params?: TUseSimpleDrawerParams) => {

	const closeConfirm = params?.closeConfirm || false

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

		if(closeConfirm){
			const canClose = window.confirm('確定要關閉嗎？沒有儲存的內容會遺失')
			if (!canClose) return
		}

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
