import { useState } from 'react'
import { Button } from 'antd'
import { TAttachment } from '@/wp'
import { useSimpleModal } from '@/main/components/SimpleModal'

export const useMediaLibraryModal = (params?: {
	onConfirm?: (selectedItems: TAttachment[]) => void
}) => {
	const onConfirm = params?.onConfirm
	const { modalProps, setModalProps, show, close } = useSimpleModal()
	const [selectedItems, setSelectedItems] = useState<TAttachment[]>([])

	/** 按下[選擇檔案]按鈕後，要把值 set 到 form 裡 */
	const handleConfirm = () => {
		close()
		onConfirm?.(selectedItems)
	}

	const formattedModalProps = {
		title: '媒體庫',
		footer: (
			<>
				<Button type="primary" onClick={handleConfirm}>
					確定選取 ({selectedItems?.length})
				</Button>
			</>
		),
		onCancel: close,
		destroyOnHidden: true,
		...modalProps,
	}

	return {
		show,
		close,
		modalProps: formattedModalProps,
		setModalProps,
		selectedItems,
		setSelectedItems,
	}
}
