import { memo, useEffect, useRef, useState } from 'react'
import { Button, Space, InputNumber, Input, Checkbox, Tooltip } from 'antd'
import {
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	DeleteOutlined,
	LinkOutlined,
} from '@ant-design/icons'
import type { ReactCustomBlockRenderProps } from '@blocknote/react'
import type { CustomBlockConfig } from '@blocknote/core'
import { debounce } from 'lodash-es'
import { TbSwitchHorizontal } from 'react-icons/tb'
import Render from '../Render'
import { MediaResizer } from '../../MediaResizer'
import { cn, isImageFile, isAudioFile, isVideoFile, AltIcon } from '@/main'
import { MediaLibraryModal, useMediaLibraryModal } from '@/wp'

export type TMediaLibraryButton = ReactCustomBlockRenderProps<CustomBlockConfig>

export function getFileType(url: string) {
	if (isImageFile(url)) {
		return 'image'
	}
	if (isAudioFile(url)) {
		return 'audio'
	}
	if (isVideoFile(url)) {
		return 'video'
	}
	return 'other'
}

const MediaLibraryButton = (
	props: ReactCustomBlockRenderProps<CustomBlockConfig>,
) => {
	// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
	const [key, setKey] = useState(0)
	// 定位祖先，供 MediaResizer 量測 media 位置
	const containerRef = useRef<HTMLDivElement>(null)
	const currentBlock = props ? props?.block : null
	const currentBlockProps = currentBlock?.props || null

	const url = currentBlockProps?.url

	const { show, close, modalProps, setModalProps, ...mediaLibraryProps } =
		useMediaLibraryModal({
			onConfirm: (selectedItems) => {
				if (!currentBlock) {
					return
				}
				const item = selectedItems?.[0] as any
				const fileType = getFileType(item?.url)
				props!.editor.updateBlock(currentBlock, {
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

				setKey((prev: number) => prev + 1)
			},
		})

	useEffect(() => {
		if (!url && currentBlock) {
			show()
		}
	}, [url])

	// 封裝一個簡單的 editor 更新函數，包含 debounce
	const update = debounce((key: string, value: any) => {
		if (!props) {
			return
		}
		props.editor.updateBlock(props.block, {
			type: 'mediaLibrary',
			props: {
				...currentBlockProps,
				[key]: value,
			} as any,
		})
	}, 500)

	// 要顯示的副工具列
	const [tool, setTool] = useState<string | null>(null)

	const [showTool, setShowTool] = useState<boolean>(false)

	const fileType = currentBlockProps?.fileType || getFileType(url || '')

	return (
		<>
			<div
				ref={containerRef}
				className="at-w-full at-relative"
				onMouseEnter={() => setShowTool(true)}
				onMouseLeave={() => setShowTool(false)}
				style={{
					contain: 'layout paint paint',
				}}
			>
				{url && (
					<>
						<div
							className="[&_*]:at-pointer-events-none at-cursor-pointer"
							onClick={show}
						>
							<Render block={props.block} editor={props.editor} />
						</div>
						{'other' !== fileType && (
							<MediaResizer
								containerRef={containerRef}
								widthValue={currentBlockProps.widthValue}
								widthUnit={currentBlockProps.widthUnit}
								align={currentBlockProps.align || 'start'}
								visible={showTool}
								onResizeEnd={(widthValue) => {
									props.editor.updateBlock(props.block, {
										type: 'mediaLibrary',
										props: {
											...currentBlockProps,
											widthValue,
										} as any,
									})
									setKey((prev: number) => prev + 1)
								}}
							/>
						)}
						<div
							className={cn(
								'at-py-1 at-px-2 at-bg-gray-100 at-rounded-md at-transition-opacity at-duration-300',
								showTool ? 'at-opacity-100' : 'at-opacity-30',
							)}
							key={key}
						>
							<div className="at-flex at-items-center at-justify-center at-gap-x-2">
								{'other' !== fileType && (
									<Space.Compact>
										<Space.Addon>寬</Space.Addon>
										<InputNumber
											className="at-w-32"
											size="small"
											defaultValue={currentBlockProps.widthValue}
											onChange={(value) => update('widthValue', value)}
										/>
										{['px', '%'].map((unit) => (
											<Button
												key={unit}
												type={
													currentBlockProps.widthUnit === unit
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() => update('widthUnit', unit)}
											>
												{unit}
											</Button>
										))}
									</Space.Compact>
								)}

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

									{'image' === fileType && (
										<Tooltip title="設定圖片連結">
											<Button
												type={tool === 'link' ? 'primary' : 'default'}
												size="small"
												icon={<LinkOutlined />}
												onClick={() => setTool(tool === 'link' ? null : 'link')}
											/>
										</Tooltip>
									)}

									<Tooltip
										title={'image' === fileType ? '設定 alt 文字' : '設定文字'}
									>
										<Button
											type={tool === 'alt' ? 'primary' : 'default'}
											size="small"
											icon={
												<AltIcon color={tool === 'alt' ? '#fff' : '#444'} />
											}
											onClick={() => setTool(tool === 'alt' ? null : 'alt')}
										/>
									</Tooltip>

									<Tooltip title="換一個">
										<Button
											size="small"
											icon={<TbSwitchHorizontal />}
											onClick={show}
										/>
									</Tooltip>
									<Tooltip title="刪除">
										<Button
											danger
											type="primary"
											size="small"
											icon={<DeleteOutlined />}
											onClick={() => {
												props.editor.removeBlocks([props.block])
											}}
										/>
									</Tooltip>
								</Space.Compact>
							</div>

							<div className={cn('at-mt-1', tool ? 'at-block' : 'at-hidden')}>
								<div
									className={cn(
										'at-flex at-items-center at-gap-x-2',
										'link' === tool ? 'at-block' : 'at-hidden',
									)}
								>
									<Input
										defaultValue={currentBlockProps.link}
										placeholder="請輸入包含 https:// 的連結，例如  https://www.google.com"
										size="small"
										onChange={(e) => update('link', e.target.value)}
										allowClear
									/>
									<Checkbox
										defaultChecked={currentBlockProps.target === '_blank'}
										onChange={(e) =>
											update('target', e.target.checked ? '_blank' : '_self')
										}
										className="at-text-xs at-text-nowrap"
									>
										新視窗開啟
									</Checkbox>
								</div>
								<div
									className={cn(
										'at-flex at-flex-col at-gap-1',
										'alt' === tool ? 'at-block' : 'at-hidden',
									)}
								>
									{'image' === fileType && (
										<Input
											defaultValue={currentBlockProps.alt}
											placeholder="請輸入圖片 alt 替代文字"
											size="small"
											onChange={(e) => update('alt', e.target.value)}
											allowClear
										/>
									)}
									<Input
										defaultValue={currentBlockProps.title}
										placeholder="請輸入圖片 title 文字"
										size="small"
										onChange={(e) => update('title', e.target.value)}
										allowClear
									/>
									{'image' === fileType && (
										<Input
											defaultValue={currentBlockProps.caption}
											placeholder="請輸入圖片 caption 文字"
											size="small"
											onChange={(e) => update('caption', e.target.value)}
											allowClear
										/>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<MediaLibraryModal
				modalProps={modalProps}
				mediaLibraryProps={mediaLibraryProps}
			/>
		</>
	)
}

export default memo(MediaLibraryButton)
