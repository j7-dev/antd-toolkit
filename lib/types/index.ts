import {
  POST_STATUS,
  ORDER_STATUS,
  PRODUCT_TYPES,
  PRODUCT_STOCK_STATUS,
  BACKORDERS,
} from '@/utils'

export type TConstant<T> = {
  label: string
  value: T
  color?: string
}

export type TGetColumnFilterProps<T> = {
  dataSource: readonly TConstant<string | number | boolean>[] | readonly T[]
  dataIndex: keyof T
  dataFrom?: 'local' | 'fetched'
  exactMatch?: boolean
}

export type TPostStatus = (typeof POST_STATUS)[number]['value']

export type TOrderStatus = (typeof ORDER_STATUS)[number]['value']

export type TProductTypes = (typeof PRODUCT_TYPES)[number]['value']

export type TProductStockStatus = (typeof PRODUCT_STOCK_STATUS)[number]['value']

export type TBackorders = (typeof BACKORDERS)[number]['value']
