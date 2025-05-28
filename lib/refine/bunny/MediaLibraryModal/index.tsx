import { memo } from 'react'
import { MediaLibrary, TMediaLibraryProps } from '@/refine/bunny'
import { SimpleModal, TSimpleModalProps } from '@/main/components/SimpleModal'

export * from './hooks'

const MediaLibraryModalComponent = ({
	modalProps,
	mediaLibraryProps,
}: {
	modalProps: TSimpleModalProps
	mediaLibraryProps: TMediaLibraryProps
}) => {
	return (
		<SimpleModal {...modalProps}>
			<MediaLibrary {...mediaLibraryProps} />
		</SimpleModal>
	)
}

export const MediaLibraryModal = memo(MediaLibraryModalComponent)
