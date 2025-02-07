import React, { memo } from 'react'
import { Tooltip, Button } from 'antd'

type TSelectedRecordProps = {
	ids: (string | React.Key)[]
	onClear?: () => void
	onSelected?: () => void
	resourceLabel?: string
	hideOnEmpty?: boolean
}

/**
 * SelectedRecord 已選擇的資源
 * 通常用在跨頁選取用戶，可以知道目前選了誰、清除選取、顯示已選用戶
 *
 * @param {{
 * 	ids: (string | React.Key)[]
 * 	onClear?: () => void
 * 	onSelected?: () => void
 * 	resourceLabel?: string
 * }} param0
 */
const SelectedRecordComponent = ({
	ids,
	onClear,
	onSelected,
	resourceLabel,
	hideOnEmpty = true,
}: TSelectedRecordProps) => {
	return (
		<div>
			{(!!ids.length || !hideOnEmpty) && (
				<div className="at-flex at-gap-x-2 at-items-center">
					<Tooltip
						title={`包含 ${resourceLabel} id: ${ids.join(',')}`}
						className="at-bg-yellow-100 at-px-2 at-py-0.5 at-whitespace-nowrap at-rounded-[0.25rem]"
					>
						已選擇 {ids.length} 個 {resourceLabel}
					</Tooltip>
					{onClear && (
						<Button type="link" onClick={onClear}>
							清除選取
						</Button>
					)}

					{onSelected && (
						<Button type="link" onClick={onSelected}>
							顯示已選 {resourceLabel}
						</Button>
					)}
				</div>
			)}
			{!ids.length && hideOnEmpty && <div className="at-h-8" />}
		</div>
	)
}

export const SelectedRecord = memo(SelectedRecordComponent)
