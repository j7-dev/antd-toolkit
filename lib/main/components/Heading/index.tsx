import React, { FC, memo } from 'react'
import { Divider, Typography, TypographyProps, DividerProps } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const { Title } = Typography

const HeadingComponent: FC<
	{
		children: React.ReactNode
		titleProps?: TypographyProps['Title']
		size?: 'sm' | 'md'
	} & DividerProps
> = ({ children, titleProps, size = 'md', ...rest }) => {
	if (size === 'sm') {
		return (
			<Divider
				orientation="left"
				className="text-sm text-gray-500 my-8"
				plain
				orientationMargin="0"
				{...rest}
			>
				<SendOutlined className="mr-2" /> {children}
			</Divider>
		)
	}

	return (
		<Divider orientation="left" orientationMargin={0} plain {...rest}>
			<Title
				level={2}
				className="font-bold text-lg pl-2"
				style={{
					borderLeft: '4px solid #60a5fa',
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
