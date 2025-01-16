import React from 'react'
import { Tooltip, TooltipProps } from 'antd'

export const BooleanIndicator: React.FC<{
  enabled: boolean
  className?: string
  tooltipProps?: TooltipProps & { enabled: boolean }
}> = ({ enabled, className, tooltipProps }) => {
  if (tooltipProps?.enabled) {
    return (
      <Tooltip {...tooltipProps}>
        <div
          className={`${enabled ? 'bg-teal-500' : 'bg-rose-500'} ${
            className ? className : 'w-3 h-3 rounded-full inline-block'
          } `}
        />
      </Tooltip>
    )
  }

  return (
    <div
      className={`${enabled ? 'bg-teal-500' : 'bg-rose-500'} ${
        className ? className : 'w-3 h-3 rounded-full'
      } `}
    />
  )
}
