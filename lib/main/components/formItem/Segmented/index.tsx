import { FC, memo } from 'react'
import {
	Form,
	Segmented as AntdSegmented,
	FormItemProps,
	SegmentedProps,
} from 'antd'
import { BOOLEAN_OPTIONS_REVERSE } from '@/wp'

const { Item } = Form

const SegmentedComponent: FC<{
	formItemProps?: FormItemProps
	segmentedProps?: Omit<SegmentedProps, 'ref'> &
		React.RefAttributes<HTMLDivElement>
}> = ({ formItemProps, segmentedProps }) => {
	return (
		<Item {...formItemProps}>
			<AntdSegmented
				block
				className="at-w-full"
				options={BOOLEAN_OPTIONS_REVERSE}
				{...segmentedProps}
			/>
		</Item>
	)
}

/**
 * 存入 'yes' 或 'no' 的 Segmented
 */
export const Segmented = memo(SegmentedComponent)
