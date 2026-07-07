import { memo, useEffect, useRef, useState } from 'react'
import { Button, Space, InputNumber, Tooltip, Radio } from 'antd'
import {
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	DeleteOutlined,
} from '@ant-design/icons'
import { BsFillPlayBtnFill, BsFillVolumeUpFill } from 'react-icons/bs'
import type { ReactCustomBlockRenderProps } from '@blocknote/react'
import type { CustomBlockConfig } from '@blocknote/core'
import { TbSwitchHorizontal } from 'react-icons/tb'
import { debounce } from 'lodash-es'
import Render from '../Render'
import { MediaResizer } from '../../MediaResizer'
import { cn } from '@/main/utils'
import { MediaLibraryModal, useMediaLibraryModal } from '@/refine'

export type TMediaLibraryButton = ReactCustomBlockRenderProps<CustomBlockConfig>

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

const MediaLibraryButton = (
	props: ReactCustomBlockRenderProps<CustomBlockConfig>,
) => {
	// 為了讓 input 的 defaultValue 的整個組件可以重新 render 重新設置 defaultValue，透過 key 來強制重新 render
	const [key, setKey] = useState(0)
	// 定位祖先，供 MediaResizer 量測 media 位置
	const containerRef = useRef<HTMLDivElement>(null)
	const currentBlock = props ? props?.block : null
	const currentBlockProps = currentBlock?.props || null

	const { show, close, modalProps, setModalProps, ...mediaLibraryProps } =
		useMediaLibraryModal({
			onConfirm: (selectedItems) => {
				const item = selectedItems?.[0]
				props!.editor.updateBlock(props!.block, {
					type: 'bunnyVideo',
					props: {
						...currentBlockProps,
						vId: item?.guid as any,
					} as any,
				})

				setKey((prev: number) => prev + 1)
			},
		})

	// 封裝一個簡單的 editor 更新函數，包含 debounce
	const update = debounce((key: string, value: any) => {
		if (!props) {
			return
		}
		props.editor.updateBlock(props.block, {
			type: 'bunnyVideo',
			props: {
				...currentBlockProps,
				[key]: value,
			} as any,
		})
	}, 500)

	const [showTool, setShowTool] = useState(false)

	const vId = currentBlockProps?.vId

	useEffect(() => {
		if (!vId && currentBlock) {
			show()
		}
	}, [vId])

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
							/>
						</div>
						<MediaResizer
							containerRef={containerRef}
							widthValue={currentBlockProps.widthValue}
							widthUnit={currentBlockProps.widthUnit}
							align={currentBlockProps.align || 'start'}
							visible={showTool}
							onResizeEnd={(widthValue) => {
								props.editor.updateBlock(props.block, {
									type: 'bunnyVideo',
									props: {
										...currentBlockProps,
										widthValue,
									} as any,
								})
								setKey((prev: number) => prev + 1)
							}}
						/>
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
									<Space.Addon>寬</Space.Addon>
									<InputNumber
										size="small"
										className="at-w-32"
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

								{'video' === currentBlockProps.player && (
									<Space.Compact>
										<Space.Addon><Tooltip title="可自由填入影片長寬比，例如 16/9 為 1.7778">
											比例
										</Tooltip></Space.Addon>
										<InputNumber
											className="at-w-32"
											size="small"
											defaultValue={currentBlockProps.aspectRatio}
											onChange={(value) => update('aspectRatio', value)}
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
			</div>
			<MediaLibraryModal
				modalProps={modalProps}
				mediaLibraryProps={mediaLibraryProps}
			/>
		</>
	)
}

export default memo(MediaLibraryButton)
