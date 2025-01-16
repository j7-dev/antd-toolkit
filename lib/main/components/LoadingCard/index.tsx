import React, { HTMLAttributes } from 'react'

type LoadingCardProps = {
  ratio?: string
} & HTMLAttributes<HTMLDivElement>

export const LoadingCard: React.FC<LoadingCardProps> = ({
  ratio = 'aspect-video',
  children = 'LOADING...',
  ...rest
}) => (
  <div
    className={`${ratio} bg-gray-200 animate-pulse rounded-lg py-[21px] pl-[28px] pr-6 relative mb-[10px] text-gray-500 flex items-center justify-center`}
    {...rest}
  >
    {children}
  </div>
)
