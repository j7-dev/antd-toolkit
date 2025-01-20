import { FC, memo } from 'react'
import { Form, Switch, FormItemProps, SwitchProps } from 'antd'

const { Item } = Form

const FiSwitchComponent: FC<{
	formItemProps?: FormItemProps
	switchProps?: SwitchProps
}> = ({ formItemProps, switchProps }) => {
	return (
		<Item
			initialValue={false}
			getValueProps={(value) => (value === 'yes' ? { checked: true } : {})}
			normalize={(value) => (value ? 'yes' : 'no')}
			{...formItemProps}
		>
			<Switch {...switchProps} />
		</Item>
	)
}

/**
 * 存入 'yes' 或 'no' 的 switch
 */
export const FiSwitch = memo(FiSwitchComponent)
