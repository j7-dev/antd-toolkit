import { useState } from 'react'
import { TSimpleModalProps } from './index'

export const useSimpleModal = () => {
	const [modalProps, setModalProps] = useState<Partial<TSimpleModalProps>>({
		title: '媒體庫',
	})


	const show = () => {
		setModalProps((prev) => ({
			...prev,
			opacity: 1,
			pointerEvents: 'auto',
		}))
	}

	const close = () => {
		setModalProps((prev) => ({
			...prev,
			opacity: 0,
			pointerEvents: 'none',
		}))
	}

	modalProps.onCancel = close


	return {
		show,
		close,
		modalProps,
		setModalProps
	}
}
