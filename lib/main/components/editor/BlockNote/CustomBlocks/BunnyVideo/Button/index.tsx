import { memo, useEffect, useState } from 'react'
import { Button, Select, Space, InputNumber, Tooltip, Radio } from 'antd'
import {
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	DeleteOutlined,
} from '@ant-design/icons'
import { BsFillPlayBtnFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useMediaLibraryModal, MediaLibraryModal } from '@/refine/bunny'
import { ReactCustomBlockRenderProps } from '@blocknote/react'
import {
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema,
} from '@blocknote/core'
import { TbSwitchHorizontal } from 'react-icons/tb'
import { debounce } from 'lodash-es'
import Render from '../Render'
import { cn } from '@/main/utils'

export type TMediaLibraryButton = ReactCustomBlockRenderProps<
	CustomBlockConfig,
	DefaultInlineContentSchema,
	DefaultStyleSchema
>

const playerOptions = [
	{
		label: <BsFillPlayBtnFill className="at-relative at-top-0.5" />,
		value: 'video',
	},
	{
		label: <BsFillVolumeUpFill className="at-relative at-top-0.5" />,
		value: 'audio',
	},
]

const MediaLibraryButton = (props: TMediaLibraryButton) => {
	const currentBlock = props.editor.getBlock(props.block)
	const currentBlockProps = currentBlock?.props || props.block.props

	// 封裝一個簡單的 editor 更新函數，包含 debounce
	const update = debounce((key: string, value: any) => {
		props.editor.updateBlock(props.block, {
			type: 'bunnyVideo',
			props: {
				...currentBlockProps,
				[key]: value,
			} as any,
		})
	}, 500)

	// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
	const [key, setKey] = useState<number>(0)
	const [showTool, setShowTool] = useState(false)

	const { show, close, modalProps, ...mediaLibraryProps } =
		useMediaLibraryModal({
			onConfirm: (items) => {
				if (items?.length) {
					const item = items?.[0]
					props.editor.updateBlock(props.block, {
						type: 'bunnyVideo',
						// @ts-ignore
						props: {
							...currentBlockProps,
							vId: item?.guid as any,
						},
					})

					setKey((prev) => prev + 1)
				}
			},
		})

	const vId = currentBlockProps?.vId

	useEffect(() => {
		if (!vId && currentBlock) {
			show()
		}
	}, [vId, currentBlock])

	return (
		<>
			<div
				className="at-w-full"
				onMouseEnter={() => setShowTool(true)}
				onMouseLeave={() => setShowTool(false)}
			>
				{!!vId && (
					<>
						<div
							className="[&_*]:at-pointer-events-none at-cursor-pointer"
							onClick={show}
						>
							<Render
								block={props.block}
								// @ts-ignore
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
								<Radio.Group
									options={playerOptions}
									size="small"
									defaultValue={currentBlockProps.player}
									optionType="button"
									buttonStyle="solid"
									onChange={(e) => update('player', e.target.value)}
								/>

								<Space.Compact>
									<InputNumber
										addonBefore="寬"
										size="small"
										className="at-w-32"
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

								{'video' === currentBlockProps.player && (
									<InputNumber
										addonBefore={
											<Tooltip title="可自由填入影片長寬比，例如 16/9 為 1.7778">
												比例
											</Tooltip>
										}
										className="at-w-32"
										size="small"
										defaultValue={currentBlockProps.aspectRatio}
										onChange={(value) => update('aspectRatio', value)}
									/>
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
						</div>
					</>
				)}
				<MediaLibraryModal
					modalProps={modalProps}
					mediaLibraryProps={{
						...mediaLibraryProps,
						initialIds: vId ? [vId] : [],
					}}
				/>
			</div>
		</>
	)
}

export default memo(MediaLibraryButton)
