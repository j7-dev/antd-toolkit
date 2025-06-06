import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { TBunnyVideo } from '@/refine/bunny'
import { useSimpleModal } from '@/main/components/SimpleModal'

export const useMediaLibraryModal = (params?: {
	onConfirm?: (selectedItems: TBunnyVideo[]) => void
	initItems?: TBunnyVideo[]
}) => {
	const onConfirm = params?.onConfirm
	const initItems = params?.initItems || []
	const { show, close, modalProps, setModalProps } = useSimpleModal()
	const [selectedItems, setSelectedItems] = useState<TBunnyVideo[]>([])

	/** 按下[選擇檔案]按鈕後，要把值 set 到 form 裡 */
	const handleConfirm = () => {
		close()
		onConfirm?.(selectedItems)
	}

	const formattedModalProps = {
		title: 'Bunny 媒體庫',
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
	}, [initItems?.map((item) => item.guid)?.join(',')])

	return {
		show,
		close,
		modalProps: formattedModalProps,
		setModalProps,
		selectedItems,
		setSelectedItems,
	}
}
