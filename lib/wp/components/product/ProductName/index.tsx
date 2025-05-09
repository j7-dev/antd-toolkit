import { memo } from 'react'
import { Image, ImageProps } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { TImage, TProductType } from '@/wp'
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
		attribute_summary = '',
	} = record
	const image_url = hideImage ? undefined : images?.[0]?.url || defaultImage
	const sku_text = sku ? `SKU: ${sku}` : ''
	const meta_arr = [sku_text, attribute_summary]?.filter((s) => !!s)
	const meta_text = meta_arr.join(', ')

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
							name={name}
							id={id}
						/>
					)}
					{renderBelowTitle ? (
						renderBelowTitle
					) : (
						<div className="product-meta at-flex at-text-[0.625rem] at-text-gray-500">
							{meta_text}
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
