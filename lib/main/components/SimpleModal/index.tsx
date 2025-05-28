import React, { memo, useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Portal } from '@/main/components/Portal'

export type TSimpleModalProps = {
	width?: number
	title?: React.ReactNode
	children?: React.ReactNode
	footer?: React.ReactNode | null
	className?: string
	onCancel?: () => void
	zIndex?: number
	opacity?: number
	pointerEvents?: 'auto' | 'none'
	destroyOnHidden?: boolean
}

export * from './hooks'

const SimpleModalComponent = ({
	width = 1600,
	title = '',
	children,
	footer = null,
	className = 'pc-media-library',
	onCancel,
	zIndex = 2000,
	opacity = 0,
	pointerEvents = 'none',
	destroyOnHidden = false,
}: TSimpleModalProps) => {
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

	const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		e.preventDefault()
		if (e.target === e.currentTarget) {
			if (onCancel) {
				onCancel()
			}
		}
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
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex,
					opacity,
					pointerEvents,
					transition: 'opacity 0.3s ease-out',
					willChange: 'opacity',
				}}
				onClick={handleBgClick}
			>
				<div
					style={{
						position: 'relative',
						width: `${width}px`,
						maxWidth: 'max(90%, calc(100vw - 4rem))',
						backgroundColor: '#ffffff',
						padding: '2rem',
						borderRadius: '1rem',
					}}
					className={className}
				>
					{/* head */}
					<div className="at-px-4 at-absolute at-top-4 at-left-0 at-w-full at-h-8 at-flex at-items-center at-justify-between">
						<div className="at-font-semibold at-text-lg at-ml-4">{title}</div>
						<div>
							<CloseOutlined
								onClick={onCancel}
								className="at-text-2xl at-text-gray-700 at-cursor-pointer"
							/>
						</div>
					</div>

					{/* body */}
					{show && (
						<>
							<div className="at-h-fit at-max-h-[calc(100vh-20rem)] at-my-8 at-overflow-auto at-pr-2">
								{children}
							</div>
						</>
					)}

					{/* footer */}
					<div className="at-px-4 at-absolute at-bottom-2 at-left-0 at-w-full at-h-12 at-flex at-flex-row-reverse at-items-center at-justify-between">
						{footer}
					</div>
				</div>
			</div>
		</Portal>
	)
}
export const SimpleModal = memo(SimpleModalComponent)
