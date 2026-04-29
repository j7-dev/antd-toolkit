import React, { memo } from 'react'
import { Tooltip, Button } from 'antd'
import { useLocale } from '@/main/components/LocaleProvider'

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
	const t = useLocale('SelectedRecord')

	return (
		<div>
			{(!!ids.length || !hideOnEmpty) && (
				<div className="at-flex at-gap-x-2 at-items-center">
					<Tooltip
						title={t.tooltipContent(resourceLabel || '', ids.join(','))}
						className="at-bg-yellow-100 at-px-2 at-py-0.5 at-whitespace-nowrap at-rounded-[0.25rem]"
					>
						{t.selectedCount(ids.length, resourceLabel || '')}
					</Tooltip>
					{onClear && (
						<Button type="link" onClick={onClear}>
							{t.clearSelection}
						</Button>
					)}

					{onSelected && (
						<Button type="link" onClick={onSelected}>
							{t.showSelected(resourceLabel || '')}
						</Button>
					)}
				</div>
			)}
			{!ids.length && hideOnEmpty && <div className="at-h-8" />}
		</div>
	)
}

export const SelectedRecord = memo(SelectedRecordComponent)
