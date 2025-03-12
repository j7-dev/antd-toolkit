import React, { FC, memo } from 'react'
import { Divider, Typography, TypographyProps, DividerProps } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const { Title } = Typography

const HeadingComponent: FC<
	{
		children: React.ReactNode
		titleProps?: TypographyProps['Title']
		size?: 'sm' | 'md'
		hideIcon?: boolean
	} & DividerProps
> = ({ children, titleProps, size = 'md', hideIcon = false, ...rest }) => {
	if (size === 'sm') {
		return (
			<Divider
				orientation="left"
				className="at-text-sm at-text-gray-500 at-my-8"
				plain
				orientationMargin="0"
				{...rest}
			>
				{!hideIcon && <SendOutlined className="at-mr-2" />}
				{children}
			</Divider>
		)
	}

	return (
		<Divider orientation="left" orientationMargin={0} plain {...rest}>
			<Title
				level={2}
				className="at-font-bold at-text-lg at-pl-2"
				style={{
					borderLeft: hideIcon ? 'none' : '4px solid #60a5fa',
					lineHeight: '1',
				}}
				{...titleProps}
			>
				{children}
			</Title>
		</Divider>
	)
}

export const Heading = memo(HeadingComponent)
