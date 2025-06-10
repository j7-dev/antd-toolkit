import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TAttachment, TImage } from '@/wp'
import { useSimpleModal } from '@/main/components/SimpleModal'

export const useMediaLibraryModal = (params?: {
	onConfirm?: (selectedItems: (TAttachment | TImage)[]) => void
	initItems?: (TAttachment | TImage)[]
}) => {
	const onConfirm = params?.onConfirm
	const initItems = params?.initItems || []
	const { modalProps, setModalProps, show, close } = useSimpleModal()
	const [selectedItems, setSelectedItems] = useState<(TAttachment | TImage)[]>(
		[],
	)

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

	useEffect(() => {
		setSelectedItems(initItems)
	}, [initItems?.map((item) => item?.id || '')?.join(',')])

	return {
		show,
		close,
		modalProps: formattedModalProps,
		setModalProps,
		selectedItems,
		setSelectedItems,
	}
}
