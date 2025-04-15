import { memo } from 'react'
import { TTerm } from '@/wp/types'
import { Tag } from 'antd'

type TProps = {
	categories: TTerm[]
	tags: TTerm[]
}

const ProductCatComponent = ({ categories, tags }: TProps) => {
	return (
		<>
			<div>
				{(categories as TTerm[])?.map(({ value, label }) => {
					return (
						<Tag
							key={value}
							color="blue"
							bordered={false}
							className="at-mb-1 at-mr-1"
						>
							{label}
						</Tag>
					)
				})}
			</div>
			<div>
				{(tags as TTerm[])?.map(({ value, label }) => {
					return (
						<span
							key={value}
							className="at-text-gray-400 at-text-xs at-mr-1 at-mb-1"
						>
							#{label}
						</span>
					)
				})}
			</div>
		</>
	)
}

export const ProductCat = memo(
	ProductCatComponent,
) as typeof ProductCatComponent
