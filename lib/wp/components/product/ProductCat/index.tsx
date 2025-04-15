import { memo } from 'react'
import { TTerm } from '@/wp/types'
import { Tag } from 'antd'

type TBaseRecord = {
	categories: TTerm[]
	tags: TTerm[]
}

type TProductCatProps<T extends TBaseRecord> = {
	record: T
}

const ProductCatComponent = <T extends TBaseRecord>({
	record,
}: TProductCatProps<T>) => {
	const { categories = [], tags = [] } = record

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
