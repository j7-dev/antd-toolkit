import React, { memo, useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Portal } from '@/main/components/Portal'
import { Skeleton } from 'antd'

export type TSimpleDrawerProps = {
	width?: number
	title?: React.ReactNode
	children?: React.ReactNode
	footer?: React.ReactNode | null
	className?: string
	onCancel?: () => void
	transform?: string
	zIndex?: number
	opacity?: number
	pointerEvents?: 'auto' | 'none'
	destroyOnHidden?: boolean
	closeConfirm?: boolean
	fullWidth?: boolean
}

export * from './hooks'

const SimpleDrawerComponent = ({
	width = 1600,
	title = '',
	children,
	footer = null,
	className = '',
	onCancel,
	transform = 'translateX(-100%)',
	zIndex = 2000,
	opacity = 0,
	pointerEvents = 'none',
	destroyOnHidden = false,
	closeConfirm = false,
	fullWidth = false,
}: TSimpleDrawerProps) => {
	const [show, setShow] = useState(false)
	const open = opacity === 1

	useEffect(() => {
		const delay = setTimeout(() => {
			if (open) {
				setShow(true)
			}
		}, 700)
		return () => clearTimeout(delay)
	}, [open])

	if (destroyOnHidden && !open) {
		return null
	}

	const handleClickClose = (
		e: React.MouseEvent<HTMLDivElement>,
		context?: 'bg',
	) => {
		if ('bg' === context) {
			e.stopPropagation()
			e.preventDefault()
			if (e.target !== e.currentTarget) {
				return
			}
		}

		if (!onCancel) {
			return
		}

		if (closeConfirm) {
			const canClose = window.confirm('確定要關閉嗎？沒有儲存的內容會遺失')
			if (!canClose) return
		}
		onCancel()
	}

	return (
		<Portal>
			<div
				style={{
					contain: 'strict',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex,
					pointerEvents,
				}}
			>
				<div
					style={{
						zIndex: zIndex - 1,
						position: 'relative',
						width: fullWidth ? '100%' : `${width}px`,
						height: '100%',
						maxWidth: fullWidth ? '100%' : 'max(75%, calc(100% - 100rem))',
						backgroundColor: '#ffffff',
						padding: '2rem 1.5rem 2rem 2rem',
						transform,
						transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
						willChange: 'transform',
					}}
					className={className}
				>
					{/* head */}
					<div className="at-px-4 at-absolute at-top-4 at-left-0 at-w-full at-h-8 at-flex at-items-center at-justify-between">
						<div className="at-font-semibold at-text-lg at-ml-4">{title}</div>
						<div>
							<CloseOutlined
								onClick={handleClickClose}
								className="at-text-2xl at-text-gray-700 at-cursor-pointer"
							/>
						</div>
					</div>

					{/* body */}
					{!show && <Skeleton active className="at-my-8" />}
					{show && (
						<>
							<div className="at-h-[calc(100%-5rem)] at-mt-12 at-mb-4 at-overflow-auto at-pr-2">
								{children}
							</div>
						</>
					)}

					{/* footer */}
					<div className="at-px-4 at-absolute at-bottom-2 at-left-0 at-w-full at-h-12 at-flex at-flex-row-reverse at-items-center at-justify-between">
						{footer}
					</div>
				</div>
				<div
					className="at-absolute at-top-0 at-left-0 at-w-full at-h-full at-bg-black/50"
					style={{
						zIndex: zIndex - 2,
						opacity,
						transition: 'opacity 0.3s ease-out',
						willChange: 'opacity',
					}}
					onClick={(e) => handleClickClose(e, 'bg')}
				/>
			</div>
		</Portal>
	)
}
export const SimpleDrawer = memo(SimpleDrawerComponent)
