import { memo } from 'react'
import { Image, ImageProps } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { TImage, TProductType, isVariation as checkVariation } from '@/wp'
import { defaultImage, cn, NameId } from '@/main'

type TBaseRecord = {
	id: string
	name: string
	sku?: string
	images?: TImage[]
	type?: TProductType
	attribute_summary?: string
}

type TProductNameProps<T extends TBaseRecord> = {
	record: T
	onClick?: (_record: T | undefined) => void
	renderTitle?: React.ReactNode
	renderBelowTitle?: React.ReactNode
	hideImage?: boolean
	imageProps?: ImageProps
	className?: string
}

const ProductNameComponent = <T extends TBaseRecord>({
	record,
	onClick,
	renderTitle,
	renderBelowTitle,
	hideImage = false,
	imageProps,
	className,
}: TProductNameProps<T>) => {
	const {
		id = '',
		sku = '',
		name = '',
		images = [],
		type = '',
		attribute_summary = '',
	} = record
	const image_url = hideImage ? undefined : images?.[0]?.url || defaultImage
	const isVariation = checkVariation(type)
	const productName = isVariation ? `${name} - ${attribute_summary}` : name

	return (
		<>
			<div className={cn('at-flex at-items-center', className)}>
				{!hideImage && (
					<div className="at-mr-4">
						<Image
							className="product-image at-rounded-lg at-object-cover"
							preview={{
								mask: <EyeOutlined />,
								maskClassName: 'at-rounded-lg',
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
					className={`at-flex-1 at-min-w-0 ${onClick ? 'at-cursor-pointer hover:at-opacity-75' : ''}`}
					onClick={onClick ? () => onClick(record) : undefined}
				>
					{renderTitle ? (
						renderTitle
					) : (
						<NameId
							className="at-text-primary at-text-base"
							name={productName}
							id={id}
						/>
					)}
					{renderBelowTitle ? (
						renderBelowTitle
					) : (
						<div className="product-meta at-flex at-text-[0.625rem] at-text-gray-500">
							{sku && <span className="at-pr-3">{`SKU: ${sku}`}</span>}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export const ProductName = memo(
	ProductNameComponent,
) as typeof ProductNameComponent
