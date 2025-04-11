import { FC, memo } from 'react'
import { Form, Switch as AntdSwitch, FormItemProps, SwitchProps } from 'antd'

const { Item } = Form

const SwitchComponent: FC<{
	formItemProps?: FormItemProps
	switchProps?: SwitchProps
}> = ({ formItemProps, switchProps }) => {
	return (
		<Item
			initialValue={false}
			getValueProps={(value) => (isTrue(value) ? { checked: true } : {})}
			normalize={(value) => (isTrue(value) ? 'yes' : 'no')}
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

function isTrue(value: string | boolean) {
	return value === 'yes' || value === true
}
