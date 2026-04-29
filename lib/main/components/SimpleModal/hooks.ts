import { useState } from 'react'
import { TSimpleModalProps } from './index'
import { useLocale } from '@/main/components/LocaleProvider'

export const useSimpleModal = () => {
	const t = useLocale('SimpleDrawerModal')
	const [modalProps, setModalProps] = useState<Partial<TSimpleModalProps>>({
		title: t.defaultTitle,
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
