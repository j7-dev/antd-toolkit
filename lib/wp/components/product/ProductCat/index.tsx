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
				{(categories as TTerm[])?.map(({ id, name }) => {
					return (
						<Tag
							key={id}
							color="blue"
							bordered={false}
							className="at-mb-1 at-mr-1"
						>
							{name}
						</Tag>
					)
				})}
			</div>
			<div>
				{(tags as TTerm[])?.map(({ id, name }) => {
					return (
						<span
							key={id}
							className="at-text-gray-400 at-text-xs at-mr-1 at-mb-1"
						>
							#{name}
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
