import React, { createContext, useState, useContext } from 'react'
import { ModalProps } from '@/main/components/editor/BlockNote/Modal'
import { TMediaLibraryProps } from '@/refine/bunny'

type ContextProps = {
	show: () => void
	close: () => void
	modalProps: ModalProps
	mediaLibraryProps: TMediaLibraryProps
	setModalProps: React.Dispatch<React.SetStateAction<ModalProps>>
	setMediaLibraryProps: React.Dispatch<React.SetStateAction<TMediaLibraryProps>>
}

export const BunnyMediaLibraryModalContext = createContext<ContextProps | null>(
	null,
)

export const useContextProps = () => {
	const context = useContext(BunnyMediaLibraryModalContext)
	if (!context) {
		throw new Error(
			'useContextProps must be used within a BunnyMediaLibraryModalContext',
		)
	}
	return context
}

export const useBunnyMediaLibraryModal = () => {
	const [modalProps, setModalProps] = useState<ModalProps>({
		title: 'Bunny 媒體庫',
		width: 1600,
		className: 'pc-media-library',
		zIndex: -2000,
		opacity: 0,
		pointerEvents: 'none',
	})
	const [mediaLibraryProps, setMediaLibraryProps] =
		useState<TMediaLibraryProps>({
			selectedItems: [],
			setSelectedItems: () => {},
			limit: 1,
		})

	const show = () => {
		setModalProps((prev) => ({
			...prev,
			zIndex: 2000,
			opacity: 1,
			pointerEvents: 'auto',
		}))
	}

	const close = () => {
		setModalProps((prev) => ({
			...prev,
			zIndex: -2000,
			opacity: 0,
			pointerEvents: 'none',
		}))
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
