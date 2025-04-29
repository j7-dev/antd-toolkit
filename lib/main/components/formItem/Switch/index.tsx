import { FC, memo } from 'react'
import { Form, Switch as AntdSwitch, FormItemProps, SwitchProps } from 'antd'
import { stringToBool } from '@/wp'

const { Item } = Form

const SwitchComponent: FC<{
	formItemProps?: FormItemProps
	switchProps?: SwitchProps
}> = ({ formItemProps, switchProps }) => {
	return (
		<Item
			getValueProps={(value) => (stringToBool(value) ? { checked: true } : {})}
			normalize={(value) => (stringToBool(value) ? 'yes' : 'no')}
			{...formItemProps}
		>
			<AntdSwitch {...switchProps} />
		</Item>
	)
}

/**
 * 存入 'yes' 或 'no' 的 switch
 */
export const Switch = memo(SwitchComponent)
