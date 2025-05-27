import React from 'react'
import { CloseOutlined } from '@ant-design/icons'

export type ModalProps = {
	width: number
	title: React.ReactNode
	children?: React.ReactNode
	footer?: React.ReactNode | null
	className?: string
	onCancel?: () => void
	zIndex: number
	opacity?: number
	pointerEvents?: 'auto' | 'none'
}

const Modal = ({
	width,
	title,
	children,
	footer,
	className,
	onCancel,
	zIndex,
	opacity = 0,
	pointerEvents = 'none',
}: ModalProps) => {
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
		<div
			style={{
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
			}}
			onClick={handleBgClick}
		>
			<div
				style={{
					position: 'relative',
					width: `${width}px`,
					maxWidth: '100%',
					backgroundColor: '#f0f0f0',
					padding: '2rem',
					borderRadius: '1rem',
				}}
				className={className}
			>
				<div className="at-mb-2 at-font-semibold at-text-lg">{title}</div>
				<div className="at-h-[75vh] at-max-h-[calc(100vh-16rem)] at-overflow-y-auto at-overflow-x-hidden at-pr-2">
					{children}
				</div>
				<div className="at-flex at-justify-end at-mt-4">{footer}</div>

				<div
					onClick={onCancel}
					className="at-absolute at-top-4 at-right-4 at-p-2 at-cursor-pointer"
				>
					<CloseOutlined className="at-text-2xl at-text-gray-700" />
				</div>
			</div>
		</div>
	)
}
export default Modal
