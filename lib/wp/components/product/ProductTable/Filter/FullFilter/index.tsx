import React, { FC, useState, useEffect, memo } from 'react'
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
import { BooleanRadioButton } from 'antd-toolkit'
import { TFilterProps } from '@/components/product/ProductTable/types'
import {
	keyLabelMapper,
	termToOptions,
} from '@/components/product/ProductTable/utils'
import useOptions, {
	TUseOptionsParams,
} from '@/components/product/ProductTable/hooks/useOptions'
import {
	backordersOptions,
	stockStatusOptions,
	statusOptions,
	defaultSelectProps,
} from '@/utils'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs'

const { Item } = Form
const { RangePicker } = DatePicker

export const initialFilteredValues = {
	status: [],
	featured: '',
	downloadable: '',
	virtual: '',
	sold_individually: '',
	is_course: '',
}

/**
 * Filter Component for WooCommerce Product Selector
 * @see https://github.com/woocommerce/woocommerce/wiki/wc_get_products-and-WC_Product_Query
 */

const FullFilter: FC<{
	searchFormProps: FormProps
	optionParams?: TUseOptionsParams
	isCourse?: boolean
}> = ({ searchFormProps, optionParams, isCourse }) => {
	const [isExpand, setIsExpand] = useState(false)
	const form = searchFormProps.form as FormInstance<TFilterProps>
	const handleReset = () => {
		form.resetFields()
		form.submit()
	}

	const { options, isLoading } = useOptions(optionParams)
	const { product_cats = [], product_tags = [], max_price, min_price } = options

	useEffect(() => {
		if (!isLoading) {
			form.setFieldValue(['price_range'], [min_price, max_price])
		}
	}, [isLoading])

	return (
		<Spin spinning={isLoading}>
			<Form<TFilterProps>
				{...searchFormProps}
				layout="vertical"
				initialValues={{
					...initialFilteredValues,
					is_course: isCourse ? 'yes' : '',
				}}
				className="antd-form-sm"
			>
				<div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4">
					<Item name={['s']} label={keyLabelMapper('s')}>
						<Input placeholder="模糊搜尋" allowClear />
					</Item>

					<BooleanRadioButton
						formItemProps={{
							name: ['is_course'],
							label: keyLabelMapper('is_course'),
						}}
						radioGroupProps={{
							disabled: isCourse,
						}}
					/>

					<Item
						name={['product_category_id']}
						label={keyLabelMapper('product_category_id')}
					>
						<Select
							{...defaultSelectProps}
							options={termToOptions(product_cats)}
							placeholder="可多選"
						/>
					</Item>

					<Item
						name={['product_tag_id']}
						label={keyLabelMapper('product_tag_id')}
					>
						<Select
							{...defaultSelectProps}
							options={termToOptions(product_tags)}
							placeholder="可多選"
						/>
					</Item>
					{/* <Item
            name={['price_range']}
            label={keyLabelMapper('price_range')}
            initialValue={[min_price, max_price]}
          >
            <Slider range min={min_price} max={max_price} />
          </Item> */}
				</div>
				<Divider plain className="my-2">
					<Button
						type="link"
						onClick={() => {
							setIsExpand(!isExpand)
						}}
					>
						{isExpand ? (
							<>
								隱藏篩選條件 <BsChevronDoubleUp className="text-xs ml-2" />
							</>
						) : (
							<>
								顯示更多篩選條件{' '}
								<BsChevronDoubleDown className="text-xs ml-2" />
							</>
						)}
					</Button>
				</Divider>
				<div
					className={`grid-cols-2 xl:grid-cols-4 gap-x-4 ${isExpand ? 'grid' : 'tw-hidden'}`}
				>
					{(
						[
							'featured',
							'downloadable',
							'virtual',
							'sold_individually',
						] as (keyof TFilterProps)[]
					).map((key) => (
						<BooleanRadioButton
							key={key}
							formItemProps={{
								name: [key],
								label: keyLabelMapper(key),
							}}
						/>
					))}
					<Item name={['status']} label={keyLabelMapper('status')}>
						<Select
							{...defaultSelectProps}
							options={statusOptions}
							placeholder="可多選"
						/>
					</Item>
					<Item name={['backorders']} label={keyLabelMapper('backorders')}>
						<Select
							{...defaultSelectProps}
							options={backordersOptions}
							placeholder="可多選"
						/>
					</Item>
					<Item name={['stock_status']} label={keyLabelMapper('stock_status')}>
						<Select
							{...defaultSelectProps}
							options={stockStatusOptions}
							placeholder="可多選"
						/>
					</Item>
					<Item name={['date_created']} label={keyLabelMapper('date_created')}>
						<RangePicker className="w-full" />
					</Item>
					<Item name={['sku']} label={keyLabelMapper('sku')}>
						<Input placeholder="模糊搜尋" allowClear />
					</Item>
				</div>
				<div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 mt-4">
					<Button
						htmlType="submit"
						type="primary"
						className="w-full"
						icon={<SearchOutlined />}
					>
						篩選
					</Button>
					<Button
						type="default"
						className="w-full"
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
