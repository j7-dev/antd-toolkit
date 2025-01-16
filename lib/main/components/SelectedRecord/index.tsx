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
				<div className="flex gap-x-2 items-center">
					<Tooltip
						title={`包含 ${resourceLabel} id: ${ids.join(',')}`}
						className="bg-yellow-100 px-2 py-0.5 whitespace-nowrap rounded-[0.25rem]"
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
			{!ids.length && hideOnEmpty && <div className="h-8" />}
		</div>
	)
}

export const SelectedRecord = memo(SelectedRecordComponent)
