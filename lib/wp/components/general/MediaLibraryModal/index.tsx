import { memo } from 'react'
import { Modal, ModalProps } from 'antd'
import { MediaLibrary, TMediaLibraryProps } from '@/wp'

const MediaLibraryModalComponent = ({
	modalProps,
	mediaLibraryProps,
}: {
	modalProps: ModalProps
	mediaLibraryProps: TMediaLibraryProps
}) => {
	return (
		<Modal {...modalProps}>
			<div className="max-h-[75vh] overflow-x-hidden overflow-y-auto pr-4">
				<MediaLibrary {...mediaLibraryProps} />
			</div>
		</Modal>
	)
}

export const MediaLibraryModal = memo(MediaLibraryModalComponent)
