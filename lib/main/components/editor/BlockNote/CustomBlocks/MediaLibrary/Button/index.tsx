import { useState, useEffect, memo } from 'react'
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
import { nanoid } from 'nanoid'
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
			onConfirm: () => {},
		})

	const props = useProps()
	const currentBlock = props.editor.getBlock(props.block)

	const [width, setWidth] = useState({
		value: currentBlock?.props?.widthValue || 100,
		unit: currentBlock?.props?.widthUnit || '%',
	})
	const [align, setAlign] = useState(currentBlock?.props?.align || 'start')
	const currentBlockWidth = `${currentBlock?.props?.widthValue}${currentBlock?.props?.widthUnit}`
	const blockId = currentBlock?.id || ''

	// const { selectedItems } = mediaLibraryProps
	const selectedItems = [
		{
			id: '1',
			url: 'http://test.local/wp-content/uploads/2025/05/了解.jpg',
		},
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			if (width.value) {
				props.editor.updateBlock(props.block, {
					type: 'mediaLibrary',
					props: {
						widthValue: width.value as any,
						widthUnit: width.unit as any,
						align: align as any,
					},
				})
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [JSON.stringify(width), align])
	return (
		<>
			<div className={'bn-file-block-content-wrapper at-w-full'}>
				{!selectedItems.length && (
					<Button size="small" type="primary" onClick={show}>
						開啟媒體庫
					</Button>
				)}

				{selectedItems.map(({ id, url }) => (
					<>
						<div
							className="at-flex at-items-center at-w-full"
							style={{
								justifyContent: align,
							}}
						>
							<img
								className="at-max-w-full"
								style={{ width: currentBlockWidth }}
								key={`${id}-${nanoid(4)}`}
								src={url}
							/>
						</div>

						<div className="at-flex at-items-center at-justify-center at-gap-x-2 at-py-1 at-px-2 at-bg-gray-100 at-rounded-md">
							<Space.Compact>
								<InputNumber
									size="small"
									value={width.value}
									onChange={(value) =>
										setWidth({
											...width,
											value: value || 100,
										})
									}
								/>
								<Select
									size="small"
									value={width.unit}
									onChange={(value) =>
										setWidth({
											...width,
											unit: value || '%',
										})
									}
									className="at-w-16"
									options={[
										{
											label: 'px',
											value: 'px',
										},
										{
											label: '%',
											value: '%',
										},
									]}
								/>
							</Space.Compact>

							<Space.Compact>
								<Button
									size="small"
									icon={<AlignLeftOutlined />}
									onClick={() => setAlign('start')}
								/>
								<Button
									size="small"
									icon={<AlignCenterOutlined />}
									onClick={() => setAlign('center')}
								/>
								<Button
									size="small"
									icon={<AlignRightOutlined />}
									onClick={() => setAlign('end')}
								/>
							</Space.Compact>
						</div>
					</>
				))}

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
