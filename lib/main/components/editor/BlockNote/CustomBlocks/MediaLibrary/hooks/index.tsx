import React, { createContext, useState, useContext } from 'react'
import { ModalProps } from 'antd'
import { TMediaLibraryProps } from '@/wp'

type ContextProps = {
	show: () => void
	close: () => void
	modalProps: ModalProps
	mediaLibraryProps: TMediaLibraryProps
	setModalProps: React.Dispatch<React.SetStateAction<ModalProps>>
	setMediaLibraryProps: React.Dispatch<React.SetStateAction<TMediaLibraryProps>>
}

export const WpMediaLibraryModalContext = createContext<ContextProps | null>(
	null,
)

export const useContextProps = () => {
	const context = useContext(WpMediaLibraryModalContext)
	if (!context) {
		throw new Error(
			'useContextProps must be used within a WpMediaLibraryModalContext',
		)
	}
	return context
}

export const useWpMediaLibraryModal = () => {
	const [modalProps, setModalProps] = useState<ModalProps>({
		title: '媒體庫',
		width: 1600,
		centered: true,
		zIndex: -2000,
		className: 'pc-media-library',
		open: true,
	})
	const [mediaLibraryProps, setMediaLibraryProps] =
		useState<TMediaLibraryProps>({
			selectedItems: [],
			setSelectedItems: () => {},
			limit: 1,
		})

	const show = () => {
		setModalProps((prev) => ({ ...prev, zIndex: 2000 }))
	}

	const close = () => {
		setModalProps((prev) => ({ ...prev, zIndex: -2000 }))
	}

	modalProps.onCancel = close

	return {
		show,
		close,
		modalProps,
		mediaLibraryProps,
		setModalProps,
		setMediaLibraryProps,
	}
}
