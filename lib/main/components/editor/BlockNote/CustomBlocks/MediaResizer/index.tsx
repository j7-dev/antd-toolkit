import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { cn } from '@/main/utils'

const HANDLE_WIDTH = 8 // handle 寬度（px），與右緣定位計算共用
const HANDLE_OFFSET = 4 // handle 距 media 邊緣的內縮距離（px）
const HANDLE_MAX_HEIGHT = 40 // handle 高度上限（px）
const HANDLE_MIN_HEIGHT = 16 // handle 高度下限（px），避免媒體過矮（如破圖）時難以抓取
const MIN_WIDTH_PX = 48 // media 拖曳後的最小寬度（px）

type TMediaResizerProps = {
	/** 定位祖先，須為 position: relative 的容器（Button 最外層 div） */
	containerRef: RefObject<HTMLDivElement>
	/** 目前寬度數值，變動時觸發重新量測 */
	widthValue: number
	/** 寬度單位，'px' 或 '%' */
	widthUnit: string
	/** 對齊方式，決定拖曳時的縮放行為 */
	align: 'start' | 'center' | 'end'
	/** 是否顯示 handle（綁 Button 既有 hover 狀態） */
	visible: boolean
	/** 放開滑鼠時 commit 新寬度（單位維持不變） */
	onResizeEnd: (widthValue: number) => void
}

type TMediaRect = { left: number; top: number; width: number; height: number }

type TDragState = {
	side: 'left' | 'right'
	startX: number
	startWidthPx: number
	containerWidth: number
}

/**
 * 媒體寬度拖曳器
 *
 * 在 container 內尋找第一個 media 元素（img/video/audio/iframe），於其左右緣疊加兩個
 * handle。拖曳時直接改寫 media 的 style.width（不經 React 以維持流暢），放開時換算成
 * 對應單位並透過 onResizeEnd commit。僅供編輯模式使用，不會影響 toExternalHTML 匯出。
 */
export const MediaResizer = ({
	containerRef,
	widthValue,
	widthUnit,
	align,
	visible,
	onResizeEnd,
}: TMediaResizerProps) => {
	const [mediaRect, setMediaRect] = useState<TMediaRect | null>(null)
	const [dragLabel, setDragLabel] = useState<string | null>(null)
	const dragRef = useRef<TDragState | null>(null)

	// 每次都重新查找 media 節點：block props 改變會使 React 重建該節點，不可快取舊節點
	const getMedia = useCallback(
		() =>
			containerRef.current?.querySelector<HTMLElement>(
				'img, video, audio, iframe',
			) ?? null,
		[containerRef],
	)

	const measure = useCallback(() => {
		const container = containerRef.current
		const media = getMedia()
		if (!container || !media) {
			setMediaRect(null)
			return
		}
		const m = media.getBoundingClientRect()
		const c = container.getBoundingClientRect()
		setMediaRect({
			left: m.left - c.left,
			top: m.top - c.top,
			width: m.width,
			height: m.height,
		})
	}, [containerRef, getMedia])

	// 量測時機：props 變化、media 尺寸變化（載入 / 工具列改寬 / 比例改變）、視窗縮放
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		measure()

		const handleWinResize = () => measure()
		window.addEventListener('resize', handleWinResize)

		let observer: ResizeObserver | undefined
		if (typeof ResizeObserver !== 'undefined') {
			observer = new ResizeObserver(() => measure())
			observer.observe(container)
			const media = getMedia()
			if (media) observer.observe(media)
		}

		return () => {
			observer?.disconnect()
			window.removeEventListener('resize', handleWinResize)
		}
	}, [measure, getMedia, widthValue, widthUnit, align, visible])

	// 卸載時還原 userSelect（拖曳中被卸載的保險）
	useEffect(
		() => () => {
			document.body.style.userSelect = ''
		},
		[],
	)

	const formatLabel = useCallback(
		(px: number, containerWidth: number) => {
			if (widthUnit === 'px') {
				return `${Math.round(px)}px`
			}
			const pct = Math.round((px / containerWidth) * 100 * 10) / 10
			return `${pct}%`
		},
		[widthUnit],
	)

	const handlePointerDown =
		(side: 'left' | 'right') => (e: ReactPointerEvent<HTMLDivElement>) => {
			e.preventDefault()
			e.stopPropagation()
			const container = containerRef.current
			const media = getMedia()
			if (!container || !media) return

			e.currentTarget.setPointerCapture(e.pointerId)
			const startWidthPx = media.getBoundingClientRect().width
			const containerWidth = container.getBoundingClientRect().width
			dragRef.current = { side, startX: e.clientX, startWidthPx, containerWidth }
			document.body.style.userSelect = 'none'
			setDragLabel(formatLabel(startWidthPx, containerWidth))
		}

	const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current
		const media = getMedia()
		if (!drag || !media) return

		const dx = e.clientX - drag.startX
		let delta = drag.side === 'left' ? -dx : dx
		if (align === 'center') delta *= 2 // 置中時兩側同步縮放，邊緣才跟得上游標
		const nextPx = Math.min(
			Math.max(drag.startWidthPx + delta, MIN_WIDTH_PX),
			drag.containerWidth,
		)

		media.style.width = `${nextPx}px`
		setDragLabel(formatLabel(nextPx, drag.containerWidth))
		measure() // 同步更新 handle 位置，緊貼 media 邊緣
	}

	const handlePointerUp = () => {
		const drag = dragRef.current
		if (!drag) return
		const media = getMedia()
		const currentPx = media
			? media.getBoundingClientRect().width
			: drag.startWidthPx

		let commit: number
		if (widthUnit === 'px') {
			commit = Math.round(currentPx)
		} else {
			commit = Math.round((currentPx / drag.containerWidth) * 100 * 10) / 10
			commit = Math.min(Math.max(commit, 1), 100)
		}

		// 先把寬度設回 commit 值，避免 commit 與原值相同時 React 不重繪、殘留拖曳中的 px
		if (media) media.style.width = `${commit}${widthUnit}`

		dragRef.current = null
		document.body.style.userSelect = ''
		setDragLabel(null)
		onResizeEnd(commit)
	}

	if (!mediaRect) return null

	const handleHeight = Math.max(
		HANDLE_MIN_HEIGHT,
		Math.min(HANDLE_MAX_HEIGHT, mediaRect.height * 0.6),
	)
	const handleTop = mediaRect.top + mediaRect.height / 2 - handleHeight / 2

	const handleClassName = cn(
		'at-absolute at-z-10 at-rounded-full at-cursor-ew-resize at-touch-none',
		'at-border at-border-solid at-border-white at-bg-[rgba(0,0,0,0.6)]',
		'at-shadow-[0_0_3px_rgba(0,0,0,0.6)] at-transition-opacity at-duration-200',
		visible ? 'at-opacity-100' : 'at-opacity-0 at-pointer-events-none',
	)

	const handleStyle = {
		width: HANDLE_WIDTH,
		height: handleHeight,
		top: handleTop,
	}

	return (
		<>
			<div
				className={handleClassName}
				style={{ ...handleStyle, left: mediaRect.left + HANDLE_OFFSET }}
				onPointerDown={handlePointerDown('left')}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
			/>
			<div
				className={handleClassName}
				style={{
					...handleStyle,
					left: mediaRect.left + mediaRect.width - HANDLE_OFFSET - HANDLE_WIDTH,
				}}
				onPointerDown={handlePointerDown('right')}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
			/>
			{dragLabel && (
				<div
					className="at-absolute at-z-10 at-rounded at-px-2 at-py-0.5 at-text-xs at-text-white at-bg-[rgba(0,0,0,0.7)] at-pointer-events-none at-whitespace-nowrap"
					style={{
						left: mediaRect.left + mediaRect.width / 2,
						top: mediaRect.top + mediaRect.height / 2,
						transform: 'translate(-50%, -50%)',
					}}
				>
					{dragLabel}
				</div>
			)}
		</>
	)
}
