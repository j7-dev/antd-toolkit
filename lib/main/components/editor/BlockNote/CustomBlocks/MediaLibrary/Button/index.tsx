import { memo } from 'react'
import { Button, Modal, Select, Space, InputNumber } from 'antd'
import {
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
} from '@ant-design/icons'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema,
} from '@blocknote/core'
import { debounce } from 'lodash-es'
import { useApiUrlMediaLibraryModal, useProps } from '../hooks'
import { MediaLibrary } from '@/wp'
import { TbSwitchHorizontal } from 'react-icons/tb'
export type TMediaLibraryButton = ReactCustomBlockRenderProps<
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema
>

const MediaLibraryButton = () => {
	const { show, close, modalProps, ...mediaLibraryProps } =
		useApiUrlMediaLibraryModal({
			onConfirm: (items) => {
				if (items.length) {
					const item = items[0]
					props.editor.updateBlock(props.block, {
						type: 'mediaLibrary',
						props: {
							...currentBlockProps,
							url: item.url,
						} as any,
					})
				}
			},
		})

	const props = useProps()
	const currentBlock = props.editor.getBlock(props.block)

	const currentBlockWidth = `${currentBlock?.props?.widthValue}${currentBlock?.props?.widthUnit}`
	const currentBlockProps = currentBlock?.props

	return (
		<>
			<div className={'bn-file-block-content-wrapper at-w-full'}>
				{!currentBlockProps?.url && (
					<Button size="small" type="primary" onClick={show}>
						開啟媒體庫
					</Button>
				)}

				{currentBlockProps?.url && (
					<>
						<div
							className="at-flex at-items-center at-w-full"
							style={{
								justifyContent: currentBlockProps.align,
							}}
						>
							<img
								className="at-max-w-full"
								style={{ width: currentBlockWidth }}
								src={currentBlockProps.url}
							/>
						</div>

						<div className="at-flex at-items-center at-justify-center at-gap-x-2 at-py-1 at-px-2 at-bg-gray-100 at-rounded-md">
							<Space.Compact>
								<InputNumber
									size="small"
									defaultValue={currentBlockProps.widthValue}
									onChange={debounce((value) => {
										props.editor.updateBlock(props.block, {
											type: 'mediaLibrary',
											props: {
												...currentBlockProps,
												widthValue: value as any,
											} as any,
										})
									}, 500)}
								/>
								<Select
									size="small"
									defaultValue={currentBlockProps.widthUnit}
									onChange={debounce((value) => {
										props.editor.updateBlock(props.block, {
											type: 'mediaLibrary',
											props: {
												...currentBlockProps,
												widthUnit: value as any,
											} as any,
										})
									}, 500)}
									className="at-w-16"
									options={['px', '%'].map((unit) => ({
										label: unit,
										value: unit,
									}))}
								/>
							</Space.Compact>

							<Space.Compact>
								{Object.entries({
									start: <AlignLeftOutlined />,
									center: <AlignCenterOutlined />,
									end: <AlignRightOutlined />,
								}).map(([key, icon]) => (
									<Button
										key={key}
										type={
											currentBlockProps.align === key ? 'primary' : 'default'
										}
										size="small"
										icon={icon}
										onClick={debounce(() => {
											props.editor.updateBlock(props.block, {
												type: 'mediaLibrary',
												props: {
													...currentBlockProps,
													align: key as any,
												} as any,
											})
										}, 500)}
									/>
								))}
							</Space.Compact>
						</div>
					</>
				)}

				<Modal centered {...modalProps}>
					<div className="at-max-h-[75vh] at-overflow-x-hidden at-overflow-y-auto at-pr-4">
						<MediaLibrary {...mediaLibraryProps} />
					</div>
				</Modal>
			</div>
		</>
	)
}

export default memo(MediaLibraryButton)
