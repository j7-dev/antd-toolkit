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
import { BooleanRadioButton, termToOptions, defaultSelectProps } from '@/main'
import { TProductFilterProps } from '@/refine'
import {
	productKeyLabelMapper,
	BACKORDERS,
	PRODUCT_STOCK_STATUS,
	PRODUCT_STATUS,
	PRODUCT_TYPES,
	TUserBaseRecord,
} from '@/wp'

import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'
import { FilterContext, initialFilteredValues } from '../index'

const { Item } = Form
const { RangePicker } = DatePicker

/**
 * Filter Component for WooCommerce Product Selector
 * @see https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
 */

const FullFilter: FC<{
	searchFormProps: FormProps
}> = ({ searchFormProps }) => {
	const [isExpand, setIsExpand] = useState(false)
	const form = searchFormProps.form as FormInstance<TProductFilterProps>
	const handleReset = () => {
		form.resetFields()
		form.submit()
	}

	const { isLoading, ...options } = useContext(FilterContext)
	const { product_cats = [], product_tags = [], max_price, min_price } = options

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
						<Input placeholder="模糊搜尋" allowClear />
					</Item>
					<Item name={['type']} label={productKeyLabelMapper('type')}>
						<Select
							{...defaultSelectProps}
							options={PRODUCT_TYPES}
							placeholder="可多選"
						/>
					</Item>
					<Item
						name={['product_category_id']}
						label={productKeyLabelMapper('product_category_id')}
					>
						<Select
							{...defaultSelectProps}
							options={termToOptions(product_cats)}
							placeholder="可多選"
						/>
					</Item>

					<Item name={['status']} label={productKeyLabelMapper('status')}>
						<Select
							{...defaultSelectProps}
							options={PRODUCT_STATUS}
							placeholder="可多選"
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
								隱藏篩選條件{' '}
								<BsChevronDoubleUp className="at-text-xs at-ml-2" />
							</>
						) : (
							<>
								顯示更多篩選條件{' '}
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
							options={termToOptions(product_tags)}
							placeholder="可多選"
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
							placeholder="可多選"
						/>
					</Item>
					<Item
						name={['stock_status']}
						label={productKeyLabelMapper('stock_status')}
					>
						<Select
							{...defaultSelectProps}
							options={PRODUCT_STOCK_STATUS}
							placeholder="可多選"
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
						<Input placeholder="模糊搜尋" allowClear />
					</Item>
					<Item name={['author']} label={productKeyLabelMapper('author')}>
						<Select
							{...defaultSelectProps}
							{...selectProps}
							placeholder="選擇作者"
							mode={undefined}
						/>
					</Item>
					<Item name={['include']} label={productKeyLabelMapper('include')}>
						<Select mode="tags" placeholder="輸入商品 ID" allowClear />
					</Item>
				</div>
				<div className="at-grid at-grid-cols-2 xl:at-grid-cols-4 at-gap-x-4 at-mt-4">
					<Button
						htmlType="submit"
						type="primary"
						className="at-w-full"
						icon={<SearchOutlined />}
					>
						篩選
					</Button>
					<Button
						type="default"
						className="at-w-full"
						onClick={handleReset}
						icon={<UndoOutlined />}
					>
						重置
					</Button>
				</div>
			</Form>
		</Spin>
	)
}

export default memo(FullFilter)
