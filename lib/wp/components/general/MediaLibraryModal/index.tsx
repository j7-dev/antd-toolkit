import { memo, useEffect, useState } from 'react'
import { Modal, ModalProps } from 'antd'
import { MediaLibrary, TMediaLibraryProps } from '@/wp'

export * from './hooks'

const MediaLibraryModalComponent = ({
	modalProps,
	mediaLibraryProps,
}: {
	modalProps: ModalProps
	mediaLibraryProps: TMediaLibraryProps
}) => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const delay = setTimeout(() => {
			if (modalProps.open) {
				setShow(true)
			}
		}, 100)

		return () => clearTimeout(delay)
	}, [modalProps.open])

	return (
		<Modal {...modalProps}>
			<div className="max-h-[75vh] overflow-x-hidden overflow-y-auto pr-4">
				{show && <MediaLibrary {...mediaLibraryProps} />}
			</div>
		</Modal>
	)
}

export const MediaLibraryModal = memo(MediaLibraryModalComponent)
