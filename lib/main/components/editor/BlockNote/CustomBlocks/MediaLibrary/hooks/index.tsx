import React, { createContext, useState, useContext } from 'react'
import { TSimpleModalProps } from '@/main/components/SimpleModal'
import { useSimpleModal } from '@/main/components/SimpleModal'
import { TMediaLibraryProps } from '@/wp'

type ContextProps = {
	show: () => void
	close: () => void
	modalProps: TSimpleModalProps
	mediaLibraryProps: TMediaLibraryProps
	setModalProps: React.Dispatch<React.SetStateAction<TSimpleModalProps>>
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
	const { modalProps, show, close, setModalProps } = useSimpleModal()

	const [mediaLibraryProps, setMediaLibraryProps] =
		useState<TMediaLibraryProps>({
			selectedItems: [],
			setSelectedItems: () => {},
			limit: 1,
		})

	return {
		show,
		close,
		modalProps,
		mediaLibraryProps,
		setModalProps,
		setMediaLibraryProps,
	}
}
