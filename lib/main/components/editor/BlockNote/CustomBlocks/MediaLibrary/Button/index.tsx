import { memo, useEffect, useState } from 'react'
import { Button, Modal, Select, Space, InputNumber, Input } from 'antd'
import {
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	DeleteOutlined,
	LinkOutlined,
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
	const props = useProps()

	// 封裝一個簡單的 editor 更新函數，包含 debounce
	const update = debounce((key: string, value: any) => {
		props.editor.updateBlock(props.block, {
			type: 'mediaLibrary',
			props: {
				...currentBlockProps,
				[key]: value,
			} as any,
		})
	}, 500)

	const { show, close, modalProps, ...mediaLibraryProps } =
		useApiUrlMediaLibraryModal({
			onConfirm: (items) => {
				if (items.length) {
					const item = items[0]
					update('url', item.url)
				}
			},
		})

	const currentBlock = props.editor.getBlock(props.block)

	const currentBlockWidth = `${currentBlock?.props?.widthValue}${currentBlock?.props?.widthUnit}`
	const currentBlockProps = currentBlock?.props

	useEffect(() => {
		if (!currentBlockProps?.url) {
			show()
		}
	}, [currentBlockProps?.url])

	// 要顯示的副工具列
	const [tool, setTool] = useState<string | null>(null)

	return (
		<>
			<div className={'bn-file-block-content-wrapper at-w-full'}>
				{/* {!currentBlockProps?.url && (
					<Button size="small" type="primary" onClick={show}>
						開啟媒體庫
					</Button>
				)} */}

				{currentBlockProps?.url && (
					<>
						<div
							className="at-flex at-items-center at-w-full at-cursor-pointer"
							onClick={show}
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

						<div className="at-py-1 at-px-2 at-bg-gray-100 at-rounded-md">
							<div className="at-flex at-items-center at-justify-center at-gap-x-2">
								<Space.Compact>
									<InputNumber
										size="small"
										defaultValue={currentBlockProps.widthValue}
										onChange={(value) => update('widthValue', value)}
									/>
									<Select
										size="small"
										defaultValue={currentBlockProps.widthUnit}
										onChange={(value) => update('widthUnit', value)}
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
											onClick={() => update('align', key)}
										/>
									))}
									<Button
										size="small"
										icon={<TbSwitchHorizontal />}
										onClick={show}
									/>
									<Button
										size="small"
										icon={<LinkOutlined />}
										onClick={() => setTool('link')}
									/>
									<Button danger size="small" icon={<DeleteOutlined />} />
								</Space.Compact>
							</div>
							{tool && (
								<div className="at-mt-1">
									<div className={tool === 'link' ? 'at-block' : 'at-hidden'}>
										<Input
											placeholder="請輸入連結"
											size="small"
											onChange={(e) => update('link', e.target.value)}
											allowClear
										/>
									</div>
								</div>
							)}
						</div>
					</>
				)}

				<Modal {...modalProps}>
					<div className="at-max-h-[75vh] at-overflow-x-hidden at-overflow-y-auto at-pr-4">
						<MediaLibrary {...mediaLibraryProps} />
					</div>
				</Modal>
			</div>
		</>
	)
}

export default memo(MediaLibraryButton)
