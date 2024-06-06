import React, { useState } from 'react'
import { renderHTML } from '@/utils'

export const ToggleContent: React.FC<{ content: string }> = ({ content }) => {
  const [isExpand, setIsExpand] = useState(false)
  const html = renderHTML(content)

  const handleExpand = () => {
    setIsExpand(true)
  }

  const handleCollapsed = () => {
    setIsExpand(false)
  }

  return (
    <div className={`${isExpand ? '' : 'h-full overflow-hidden'} relative`}>
      {html}
      {isExpand && (
        <div className="text-center w-full py-4">
          <span className="px-12" onClick={handleCollapsed}>
            收合全部
          </span>
        </div>
      )}
      {!isExpand && (
        <div className="absolute bottom-0 text-center w-full pb-4 pt-12 bg-gradient-to-t from-white to-white/0">
          <span className="px-12" onClick={handleExpand}>
            展開全部
          </span>
        </div>
      )}
    </div>
  )
}
