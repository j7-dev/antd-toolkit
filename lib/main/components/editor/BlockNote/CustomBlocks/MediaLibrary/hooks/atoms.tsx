import { atom, getDefaultStore } from 'jotai'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema,
} from '@blocknote/core'
import { getFileType } from '../Button'
import { ModalProps, Button } from 'antd'
import { TAttachment } from '@/wp'

// BN 的 Props
export const propsAtom = atom<ReactCustomBlockRenderProps<
	CustomBlockConfig,
	InlineContentSchema,
	StyleSchema
> | null>(null)

export const selectedItemsAtom = atom<TAttachment[]>([])

// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
export const keyAtom = atom<number>(0)

// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
const defaultStore = getDefaultStore()

export const modalOpenAtom = atom<boolean>(false)

export const modalPropsAtom = atom(
	(get) => {
		const selectedItems = get(selectedItemsAtom)
		const props = get(propsAtom)
		const currentBlock = props ? props.editor.getBlock(props.block) : null
		const currentBlockProps = currentBlock?.props || props?.block?.props || null

		const _close = () => {
			defaultStore.set(modalOpenAtom, false)
		}

		/** 按下[選擇檔案]按鈕後，要把值 set 到 form 裡 */
		const handleConfirm = () => {
			_close()
			if (selectedItems?.length && currentBlockProps) {
				const item = selectedItems?.[0]
				const fileType = getFileType(item?.url)
				props!.editor.updateBlock(props!.block, {
					type: 'mediaLibrary',
					props: {
						...currentBlockProps,
						url: item?.url,
						title: item?.title,
						widthValue: 'image' === fileType ? item?.width : 100,
						widthUnit: 'image' === fileType ? 'px' : '%',
						alt: item?._wp_attachment_image_alt || item?.title,
						fileType,
					} as any,
				})

				defaultStore.set(keyAtom, (prev) => prev + 1)
			}
		}

		return {
			title: '媒體庫',
			width: 1600,
			centered: true,
			zIndex: 2000,
			className: 'pc-media-library',
			open: get(modalOpenAtom),
			onCancel: _close,
			footer: (
				<>
					<Button type="primary" onClick={handleConfirm}>
						確定選取 ({selectedItems?.length})
					</Button>
				</>
			),
		}
	},
	(get, set, newModalProps: ModalProps) => {
		set(modalPropsAtom, newModalProps)
	},
)

export const close = () => {
	defaultStore.set(modalOpenAtom, false)
}

export const show = () => {
	defaultStore.set(modalOpenAtom, true)
}
