import { memo } from 'react'
import { renderHTML, defaultImage } from '@/utils'
import { Image, ImageProps, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

type TBaseRecord = {
	id: string
	name: string
	sku?: string
	images?: {
		url: string
	}[]
}

type TProductNameProps<T extends TBaseRecord> = {
	record: T
	onClick?: (_record: T | undefined) => void
	renderTitle?: React.ReactNode
	renderBelowTitle?: React.ReactNode
	hideImage?: boolean
	imageProps?: ImageProps
}

const { Title } = Typography

const ProductNameComponent = <T extends TBaseRecord>({
	record,
	onClick,
	renderTitle,
	renderBelowTitle,
	hideImage = false,
	imageProps,
}: TProductNameProps<T>) => {
	const { id = '', sku = '', name = '', images = [] } = record
	const image_url = hideImage ? undefined : images?.[0]?.url || defaultImage

	return (
		<>
			<div className="flex items-center">
				{!hideImage && (
					<div className="mr-4">
						<Image
							className="rounded-lg object-cover"
							preview={{
								mask: <EyeOutlined />,
								maskClassName: 'rounded-lg',
							}}
							width={40}
							height={40}
							src={image_url || defaultImage}
							fallback={defaultImage}
							{...imageProps}
						/>
					</div>
				)}
				<div
					className={`flex-1 min-w-0 ${onClick ? 'cursor-pointer hover:opacity-75' : ''}`}
					onClick={onClick ? () => onClick(record) : undefined}
				>
					{renderTitle ? (
						renderTitle
					) : (
						<div className="flex mb-1 items-end">
							<p className="min-w-0 m-0 text-primary text-base [&_*]:truncate">
								{renderHTML(name)}
							</p>
							<p className="my-0 ml-2 text-gray-400 text-xs shrink-0">#{id}</p>
						</div>
					)}
					{renderBelowTitle ? (
						renderBelowTitle
					) : (
						<div className="flex text-[0.625rem] text-gray-500">
							{sku && <span className="pr-3">{`SKU: ${sku}`}</span>}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export const ProductName = memo(ProductNameComponent)
