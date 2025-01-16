import { memo } from 'react'
import { Tag, Tooltip } from 'antd'
import {
	StarFilled,
	StarOutlined,
	CloudOutlined,
	CloudFilled,
} from '@ant-design/icons'
import { IoMdDownload } from 'react-icons/io'
import { PRODUCT_TYPES } from '@/utils'
import { TProductTypes } from '@/types'

type TBaseRecord = {
	type?: TProductTypes
	featured?: boolean
	virtual?: boolean
	downloadable?: boolean
}

type TProductTypeProps<T extends TBaseRecord> = {
	record: T
	hideDownloadable?: boolean
	renderBefore?: React.ReactNode
	renderAfter?: React.ReactNode
}

const ProductTypeComponent = <T extends TBaseRecord>({
	record,
	hideDownloadable = true,
	renderBefore,
	renderAfter,
}: TProductTypeProps<T>) => {
	const {
		type = 'simple',
		featured = false,
		virtual = false,
		downloadable = false,
	} = record
	const tag = PRODUCT_TYPES.find((productType) => productType.value === type)
	if (!type) return null
	return (
		<div className="flex items-center gap-2">
			{renderBefore}
			<Tag bordered={false} color={tag?.color} className="m-0">
				{tag?.label}
			</Tag>
			<Tooltip zIndex={1000000 + 20} title={`${featured ? '' : '非'}精選商品`}>
				{featured ? (
					<StarFilled className="text-yellow-400" />
				) : (
					<StarOutlined className="text-gray-400" />
				)}
			</Tooltip>

			<Tooltip zIndex={1000000 + 20} title={`${virtual ? '' : '非'}虛擬商品`}>
				{virtual ? (
					<CloudFilled className="text-primary" />
				) : (
					<CloudOutlined className="text-gray-400" />
				)}
			</Tooltip>

			{!hideDownloadable && (
				<Tooltip
					zIndex={1000000 + 20}
					title={`${downloadable ? '' : '不'}可下載`}
				>
					{downloadable ? (
						<IoMdDownload className="text-gray-700" />
					) : (
						<IoMdDownload className="text-gray-300" />
					)}
				</Tooltip>
			)}
			{renderAfter}
		</div>
	)
}

export const ProductType = memo(ProductTypeComponent)
