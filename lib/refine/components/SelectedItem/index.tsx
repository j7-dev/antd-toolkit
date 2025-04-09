import { Tooltip, Button, TooltipProps } from 'antd'

/**
 * 顯示已選擇項目的元件
 * 通常搭配可選 Table 跨頁選取使用
 * @component
 * @param {Object} props
 * @param {string[]} props.ids - 已選擇項目的 ID 陣列
 * @param {Function} [props.onClear] - 清除選擇的回調函數
 * @param {Function} [props.onSelected] - 顯示已選項目的回調函數
 * @param {string} [props.label='物件'] - 項目的標籤名稱
 * @param {TooltipProps} [props.tooltipProps] - Tooltip 的 props
 * @returns {JSX.Element} SelectedItem 元件
 */
export const SelectedItem = ({
	ids,
	onClear = undefined,
	onSelected = undefined,
	label = '物件',
	tooltipProps,
}: {
	ids: string[]
	onClear?: () => void
	onSelected?: () => void
	label?: string
	tooltipProps?: TooltipProps
}) => {
	return (
		<div>
			{!!ids.length && (
				<div className="at-flex at-gap-x-2 at-items-center">
					<Tooltip
						title={`包含${label} id: ${ids.join(',')}`}
						className="at-bg-yellow-100 at-px-2 at-py-0.5 at-whitespace-nowrap at-rounded-[0.25rem]"
						{...tooltipProps}
					>
						已選擇 {ids.length} 個{label}
					</Tooltip>
					{onClear && (
						<Button type="link" onClick={onClear}>
							清除選取
						</Button>
					)}

					{onSelected && (
						<Button type="link" onClick={onSelected}>
							顯示已選{label}
						</Button>
					)}
				</div>
			)}
			{!ids.length && <div className="at-h-8" />}
		</div>
	)
}
