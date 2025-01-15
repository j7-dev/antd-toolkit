import { memo } from 'react'
import { renderHTML, defaultImage } from '@/utils'
import { Image, ImageProps } from 'antd'
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
	onClick?: () => void
	hideImage?: boolean
	label?: string
	imageProps?: ImageProps
}

const ProductNameComponent = <T extends TBaseRecord>({
	record,
	onClick,
	hideImage = false,
	label,
	imageProps,
}: TProductNameProps<T>) => {
	const { id = '', sku = '', name = '', images = [] } = record
	const image_url = hideImage ? undefined : images?.[0]?.url || defaultImage

	return (
		<>
			<div className="flex">
				{!hideImage && (
					<div className="mr-4">
						<Image
							className="rounded-md object-cover"
							preview={{
								mask: <EyeOutlined />,
								maskClassName: 'rounded-md',
							}}
							width={48}
							height={48}
							src={image_url || defaultImage}
							fallback={defaultImage}
							{...imageProps}
						/>
					</div>
				)}
				<div className="flex-1">
					<p
						className="mb-1 mt-0 text-primary hover:text-primary/70 cursor-pointer"
						onClick={onClick ? onClick : undefined}
					>
						{renderHTML(label ? label : name)}
					</p>
					<div className="flex text-[0.675rem] text-gray-500">
						<span className="pr-3">{`ID: ${id}`}</span>
						{sku && <span className="pr-3">{`SKU: ${sku}`}</span>}
					</div>
				</div>
			</div>
		</>
	)
}

export const ProductName = memo(ProductNameComponent)
