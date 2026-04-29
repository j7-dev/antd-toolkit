import { memo } from 'react'
import { Tag, Tooltip } from 'antd'
import {
	StarFilled,
	StarOutlined,
	CloudOutlined,
	CloudFilled,
} from '@ant-design/icons'
import { IoMdDownload } from 'react-icons/io'
import { TProductType } from '@/wp/types'
import { stringToBool, useWoocommerce } from '@/wp'
import { useLocale } from '@/main/components/LocaleProvider'

type TBaseRecord = {
	type: TProductType
	featured: boolean
	virtual: boolean
	downloadable: boolean
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

	const t = useLocale('ProductType')
	const { product_types } = useWoocommerce()
	const tag = product_types?.find((productType) => productType.value === type)
	if (!type) return null
	return (
		<div className="at-flex at-items-center at-gap-2">
			{renderBefore}
			<Tag bordered={false} color={tag?.color} className="at-m-0">
				{tag?.label}
			</Tag>
			<Tooltip zIndex={1000000 + 20} title={stringToBool(featured) ? t.featured : t.notFeatured}>
				{stringToBool(featured) ? (
					<StarFilled className="at-text-yellow-400" />
				) : (
					<StarOutlined className="at-text-gray-400" />
				)}
			</Tooltip>

			<Tooltip zIndex={1000000 + 20} title={stringToBool(virtual) ? t.virtual : t.notVirtual}>
				{stringToBool(virtual) ? (
					<CloudFilled className="at-text-primary" />
				) : (
					<CloudOutlined className="at-text-gray-400" />
				)}
			</Tooltip>

			{!hideDownloadable && (
				<Tooltip
					zIndex={1000000 + 20}
					title={stringToBool(downloadable) ? t.downloadable : t.notDownloadable}
				>
					{stringToBool(downloadable) ? (
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
