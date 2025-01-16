import { memo } from 'react'
import { TTerm } from '@/main/types'
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
						<Tag key={id} color="blue" bordered={false} className="mb-1 mr-1">
							{name}
						</Tag>
					)
				})}
			</div>
			<div>
				{(tags as TTerm[])?.map(({ id, name }) => {
					return (
						<span key={id} className="text-gray-400 text-xs mr-1 mb-1">
							#{name}
						</span>
					)
				})}
			</div>
		</>
	)
}

export const ProductCat = memo(ProductCatComponent)
