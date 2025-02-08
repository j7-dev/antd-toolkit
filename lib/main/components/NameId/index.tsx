import { FC, memo } from 'react'
import { renderHTML } from '@/main/utils'
import { cn } from '@/main'
import { Tooltip, TooltipProps } from 'antd'

const NameIdBase: FC<{
	name: React.ReactNode
	id: string
	className?: string
}> = ({ name, id, className }) => {
	return (
		<div className={cn('at-flex at-items-end', className)}>
			<div className="at-name at-min-w-0 at-m-0 [&_*]:at-truncate">{name}</div>
			<div className="at-id at-my-0 at-ml-0 at-text-gray-400 at-text-[0.5em] at-font-light at-shrink-0">
				#{id}
			</div>
		</div>
	)
}

const NameIdComponent: FC<{
	name: React.ReactNode
	id: string
	className?: string
	tooltipProps?: TooltipProps
}> = ({ name, id, className, tooltipProps = null }) => {
	// 判斷 name 是否為 string 或 ReactNode
	const isNameString = typeof name === 'string'
	const formattedName = isNameString ? renderHTML(name as string) : name
	if (null === tooltipProps) {
		return <NameIdBase name={formattedName} id={id} className={className} />
	}

	return (
		<>
			<Tooltip title={formattedName} {...tooltipProps}>
				<NameIdBase name={formattedName} id={id} className={className} />{' '}
			</Tooltip>
		</>
	)
}

export const NameId = memo(NameIdComponent)
