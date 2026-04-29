import React, { FC, useState, useEffect, memo, useContext } from 'react'
import {
	FormProps,
	Form,
	Input,
	Select,
	DatePicker,
	Button,
	FormInstance,
	Divider,
	Spin,
} from 'antd'
import { useSelect } from '@refinedev/antd'
import { BooleanRadioButton, defaultSelectProps } from '@/main'
import { TProductFilterProps } from '@/refine'
import {
	productKeyLabelMapper,
	BACKORDERS,
	PRODUCT_STOCK_STATUS,
	PRODUCT_STATUS,
	TUserBaseRecord,
	useWoocommerce,
	isVariation,
} from '@/wp'

import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'
import { FilterContext, initialFilteredValues } from '../index'
import { useLocale } from '@/main/components/LocaleProvider'

const { Item } = Form
const { RangePicker } = DatePicker

/**
 * Filter Component for WooCommerce Product Selector
 * @see https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
 */

const FullFilter: FC<{
	searchFormProps: FormProps
}> = ({ searchFormProps }) => {
	const t = useLocale('ProductFilter')
	const [isExpand, setIsExpand] = useState(false)
	const form = searchFormProps.form as FormInstance<TProductFilterProps>
	const handleReset = () => {
		form.resetFields()
		form.submit()
	}

	const { isLoading, ...options } = useContext(FilterContext)
	const { product_cats = [], product_tags = [], max_price, min_price } = options
	const { product_types } = useWoocommerce()
	const renameProductType = product_types
		.map((productType) => {
			if (productType.value === 'simple') {
				return {
					...productType,
					label: t.simpleProduct(productType.label as string),
				}
			}

			if (productType.value === 'variable') {
				return {
					...productType,
					label: t.variableProduct(productType.label as string),
				}
			}

			return productType
		})
		.filter((productType) => !isVariation(productType?.value?.toString()))

	useEffect(() => {
		if (!isLoading) {
			form.setFieldValue(['price_range'], [min_price, max_price])
		}
	}, [isLoading])

	const { selectProps } = useSelect<TUserBaseRecord>({
		resource: 'users',
		optionLabel: 'display_name',
		optionValue: 'id',
		filters: [
			{
				field: 'search',
				operator: 'eq',
				value: '',
			},
		],
		onSearch: (value) => [
			{
				field: 'search',
				operator: 'eq',
				value,
			},
		],
	})

	return (
		<Spin spinning={isLoading}>
			<Form<TProductFilterProps>
				{...searchFormProps}
				layout="vertical"
				initialValues={initialFilteredValues}
				className="antd-form-sm"
			>
				<div className="at-grid at-grid-cols-2 xl:at-grid-cols-4 at-gap-x-4">
					<Item name={['s']} label={productKeyLabelMapper('s')}>
						<Input placeholder={t.fuzzySearch} allowClear />
					</Item>
					<Item name={['type']} label={productKeyLabelMapper('type')}>
						<Select
							{...defaultSelectProps}
							options={renameProductType}
							placeholder={t.multiSelect}
						/>
					</Item>
					<Item
						name={['product_category_id']}
						label={productKeyLabelMapper('product_category_id')}
					>
						<Select
							{...defaultSelectProps}
							options={product_cats}
							placeholder={t.multiSelect}
						/>
					</Item>

					<Item name={['status']} label={productKeyLabelMapper('status')}>
						<Select
							{...defaultSelectProps}
							options={PRODUCT_STATUS}
							placeholder={t.multiSelect}
						/>
					</Item>
					{/* <Item
            name={['price_range']}
            label={productKeyLabelMapper('price_range')}
            initialValue={[min_price, max_price]}
          >
            <Slider range min={min_price} max={max_price} />
          </Item> */}
				</div>
				<Divider plain className="at-my-2">
					<Button
						type="link"
						onClick={() => {
							setIsExpand(!isExpand)
						}}
					>
						{isExpand ? (
							<>
								{t.hideFilters}{' '}
								<BsChevronDoubleUp className="at-text-xs at-ml-2" />
							</>
						) : (
							<>
								{t.showFilters}{' '}
								<BsChevronDoubleDown className="at-text-xs at-ml-2" />
							</>
						)}
					</Button>
				</Divider>
				<div
					className={`at-grid-cols-2 xl:at-grid-cols-4 at-gap-x-4 ${isExpand ? 'at-grid' : 'at-tw-hidden'}`}
				>
					<Item
						name={['product_tag_id']}
						label={productKeyLabelMapper('product_tag_id')}
					>
						<Select
							{...defaultSelectProps}
							options={product_tags}
							placeholder={t.multiSelect}
						/>
					</Item>
					{(
						[
							'featured',
							'downloadable',
							'virtual',
							'sold_individually',
						] as (keyof TProductFilterProps)[]
					).map((key) => (
						<BooleanRadioButton
							key={key}
							formItemProps={{
								name: [key],
								label: productKeyLabelMapper(key),
							}}
						/>
					))}
					<Item
						name={['backorders']}
						label={productKeyLabelMapper('backorders')}
					>
						<Select
							{...defaultSelectProps}
							options={BACKORDERS}
							placeholder={t.multiSelect}
						/>
					</Item>
					<Item
						name={['stock_status']}
						label={productKeyLabelMapper('stock_status')}
					>
						<Select
							{...defaultSelectProps}
							options={PRODUCT_STOCK_STATUS}
							placeholder={t.multiSelect}
						/>
					</Item>
					<Item
						name={['date_created']}
						label={productKeyLabelMapper('date_created')}
					>
						<RangePicker
							placeholder={['開始日期', '結束日期']}
							className="at-w-full"
						/>
					</Item>
					<Item name={['sku']} label={productKeyLabelMapper('sku')}>
						<Input placeholder={t.fuzzySearch} allowClear />
					</Item>
					<Item name={['author']} label={productKeyLabelMapper('author')}>
						<Select
							{...defaultSelectProps}
							{...selectProps}
							placeholder={t.selectAuthor}
							mode={undefined}
						/>
					</Item>
					<Item name={['include']} label={productKeyLabelMapper('include')}>
						<Select mode="tags" placeholder={t.productIdPlaceholder} allowClear />
					</Item>
				</div>
				<div className="at-grid at-grid-cols-2 xl:at-grid-cols-4 at-gap-x-4 at-mt-4">
					<Button
						htmlType="submit"
						type="primary"
						className="at-w-full"
						icon={<SearchOutlined />}
					>
						{t.filter}
					</Button>
					<Button
						type="default"
						className="at-w-full"
						onClick={handleReset}
						icon={<UndoOutlined />}
					>
						{t.reset}
					</Button>
				</div>
			</Form>
		</Spin>
	)
}

export default memo(FullFilter)
