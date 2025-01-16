import React, { ReactNode } from 'react'
import { CheckOutlined, CloseOutlined, BarsOutlined } from '@ant-design/icons'
import { Form, Segmented, FormItemProps, SegmentedProps } from 'antd'

type TOption =
  | string
  | number
  | {
      label: ReactNode
      value: string
      icon?: ReactNode
      disabled?: boolean
      className?: string
    }
const defaultOptions: TOption[] = [
  { label: 'ALL', value: '', icon: <BarsOutlined /> },
  { label: 'TRUE', value: '1', icon: <CheckOutlined /> },
  { label: 'FALSE', value: '0', icon: <CloseOutlined /> },
]

const textOptions: TOption[] = [
  { label: 'ALL', value: '' },
  { label: 'TRUE', value: '1' },
  { label: 'FALSE', value: '0' },
]

const iconOptions: TOption[] = [
  { label: 'ALL', value: '' },
  { label: <CheckOutlined />, value: '1' },
  { label: <CloseOutlined />, value: '0' },
]

const verticalOptions: TOption[] = [
  {
    label: (
      <div className="py-2">
        <BarsOutlined />
        <div>ALL</div>
      </div>
    ),
    value: '',
  },
  {
    label: (
      <div className="py-2">
        <CheckOutlined />
        <div>TRUE</div>
      </div>
    ),
    value: '1',
  },
  {
    label: (
      <div className="py-2">
        <CloseOutlined />
        <div>FALSE</div>
      </div>
    ),
    value: '0',
  },
]

const optionsMap = {
  default: defaultOptions,
  text: textOptions,
  icon: iconOptions,
  vertical: verticalOptions,
}

export const BooleanSegmented: React.FC<{
  formItemProps: FormItemProps
  segmentedProps?: Omit<SegmentedProps, 'ref'> &
    React.RefAttributes<HTMLDivElement>
  type?: 'default' | 'text' | 'icon' | 'vertical'
}> = ({ formItemProps, segmentedProps, type = 'default' }) => {
  const options = segmentedProps?.options || optionsMap?.[type]
  return (
    <Form.Item {...formItemProps}>
      <Segmented block options={options} {...segmentedProps} />
    </Form.Item>
  )
}
