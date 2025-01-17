import { memo } from 'react'
import { renderHTML } from '@/main/utils'
import './style.scss'

type TBaseRecord = {
	price_html: string
}

type TProductPriceProps<T extends TBaseRecord> = {
	record: T
}

const ProductPriceComponent = <T extends TBaseRecord>({
	record,
}: TProductPriceProps<T>) => {
	const { price_html } = record
	if (!price_html) return null
	return <div className="at-product-price">{renderHTML(price_html)}</div>
}

export const ProductPrice = memo(
	ProductPriceComponent,
) as typeof ProductPriceComponent
