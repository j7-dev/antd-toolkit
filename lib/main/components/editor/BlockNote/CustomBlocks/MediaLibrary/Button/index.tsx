import { memo, useEffect, useState } from 'react'
import {
	Button,
	Select,
	Space,
	InputNumber,
	Input,
	Checkbox,
	Tooltip,
} from 'antd'
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
import { useProps } from '../hooks'
import { TbSwitchHorizontal } from 'react-icons/tb'
import { cn, isImageFile, isAudioFile, isVideoFile, AltIcon } from '@/main'
import {
	useMediaLibraryModal,
	MediaLibraryModal,
} from '@/wp/components/general/MediaLibraryModal'
import Render from '../Render'

export type TMediaLibraryButton = ReactCustomBlockRenderProps<
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema
>

function getFileType(url: string) {
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

const MediaLibraryButton = () => {
	const props = useProps()
	const currentBlock = props.editor.getBlock(props.block)
	const currentBlockProps = currentBlock?.props || props.block.props

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

	// 要顯示的副工具列
	const [tool, setTool] = useState<string | null>(null)
	// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
	const [key, setKey] = useState<number>(0)
	const [showTool, setShowTool] = useState<boolean>(false)

	const { show, close, modalProps, ...mediaLibraryProps } =
		useMediaLibraryModal({
			onConfirm: (items) => {
				if (items?.length) {
					const item = items?.[0]
					const fileType = getFileType(item?.url)
					props.editor.updateBlock(props?.block, {
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

					setKey((prev) => prev + 1)
				}
			},
		})

	const url = currentBlockProps?.url

	useEffect(() => {
		if (!url && currentBlock) {
			show()
		}
	}, [url])

	const fileType = currentBlockProps?.fileType || getFileType(url || '')

	return (
		<>
			<div
				className="at-w-full"
				onMouseEnter={() => setShowTool(true)}
				onMouseLeave={() => setShowTool(false)}
			>
				{url && (
					<>
						<div
							className="[&_*]:at-pointer-events-none at-cursor-pointer"
							onClick={show}
						>
							<Render
								block={props.block}
								editor={props.editor}
								contentRef={props.contentRef}
							/>
						</div>
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
										<InputNumber
											addonBefore="寬"
											className="at-w-32"
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

				<MediaLibraryModal
					modalProps={modalProps}
					mediaLibraryProps={{
						initialIds: [],
						...mediaLibraryProps,
					}}
				/>
			</div>
		</>
	)
}

export default memo(MediaLibraryButton)
