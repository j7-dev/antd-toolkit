import { FC } from 'react'
import { useThemedLayoutContext } from '@refinedev/antd'
import { Grid } from 'antd'

/**
 * 固定在頁面底部的操作區域元件
 * 通常搭配可選 Table 裡面放批量操作使用
 * @component
 * @param {Object} props
 * @param {[number, number]} [props.mainPadding=[12, 24]] - Main 區域的內縮 [mobile, desktop] padding
 * @param {number} [props.collapsedWidth=80] - 收起時 Sider 的寬度
 * @param {number} [props.expandedWidth=200] - 展開時 Sider 的寬度
 * @param {React.CSSProperties} [props.style] - 額外的 CSS 樣式
 * @param {React.ReactNode} props.children - 子元件
 * @returns {JSX.Element} ActionArea 元件
 */
type TActionAreaProps = {
	mainPadding?: [number, number] // Main 區域的內縮 [mobile, desktop] padding
	collapsedWidth?: number // 收起時 Sider 的寬度
	expandedWidth?: number // 展開時 Sider 的寬度
	style?: React.CSSProperties
	children: React.ReactNode
}

export const ActionArea: FC<TActionAreaProps> = ({
	mainPadding = [12, 24],
	collapsedWidth = 80,
	expandedWidth = 200,
	children,
	style,
}) => {
	const breakpoint = Grid.useBreakpoint()
	const isMobile = typeof breakpoint.lg === 'undefined' ? false : !breakpoint.lg
	// Main 區域的內縮 px-[24px]
	const padding = isMobile ? mainPadding[0] : mainPadding[1]
	const { siderCollapsed } = useThemedLayoutContext()
	const deskWidth = siderCollapsed
		? `calc(100% - ${collapsedWidth}px - ${padding * 2}px)`
		: `calc(100% - ${expandedWidth}px - ${padding * 2}px)`

	const mobileWidth = `calc(100% - ${padding * 2}px)`
	return (
		<div
			className="at-bottom-0 at-bg-white at-w-full at-py-3 at-px-6 at-shadow-[0_0px_60px_-24px_rgba(0,0,0,0.3)]"
			style={{
				position: 'fixed',
				zIndex: 10,
				width: isMobile ? mobileWidth : deskWidth,
				right: `${padding}px`,
				...style,
			}}
		>
			{children}
		</div>
	)
}
