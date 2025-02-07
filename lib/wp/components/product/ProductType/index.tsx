import { memo } from 'react'
import { Tag, Tooltip } from 'antd'
import {
	StarFilled,
	StarOutlined,
	CloudOutlined,
	CloudFilled,
} from '@ant-design/icons'
import { IoMdDownload } from 'react-icons/io'
import { PRODUCT_TYPES } from '@/wp/utils'
import { TProductType } from '@/wp/types'

type TBaseRecord = {
	type?: TProductType
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
		<div className="at-flex at-items-center at-gap-2">
			{renderBefore}
			<Tag bordered={false} color={tag?.color} className="at-m-0">
				{tag?.label}
			</Tag>
			<Tooltip zIndex={1000000 + 20} title={`${featured ? '' : '非'}精選商品`}>
				{featured ? (
					<StarFilled className="at-text-yellow-400" />
				) : (
					<StarOutlined className="at-text-gray-400" />
				)}
			</Tooltip>

			<Tooltip zIndex={1000000 + 20} title={`${virtual ? '' : '非'}虛擬商品`}>
				{virtual ? (
					<CloudFilled className="at-text-primary" />
				) : (
					<CloudOutlined className="at-text-gray-400" />
				)}
			</Tooltip>

			{!hideDownloadable && (
				<Tooltip
					zIndex={1000000 + 20}
					title={`${downloadable ? '' : '不'}可下載`}
				>
					{downloadable ? (
						<IoMdDownload className="at-text-gray-700" />
					) : (
						<IoMdDownload className="at-text-gray-300" />
					)}
				</Tooltip>
			)}
			{renderAfter}
		</div>
	)
}

export const ProductType = memo(
	ProductTypeComponent,
) as typeof ProductTypeComponent
