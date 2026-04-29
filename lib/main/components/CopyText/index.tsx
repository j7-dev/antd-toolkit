import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { ConfigOptions } from 'antd/es/message/interface'
import { useLocale } from '@/main/components/LocaleProvider'

export const CopyText: React.FC<{
	text: string
	children?: React.ReactNode
	messageConfig?: ConfigOptions
}> = ({
	text,
	children = (
		<CopyOutlined className="at-text-blue-500 hover:at-text-blue-500/70" />
	),
	messageConfig,
}) => {
	const [messageApi, contextHolder] = message.useMessage(messageConfig)
	const t = useLocale('CopyText')

	const copyToClipboard = (textToCopy: string) => () => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					messageApi.success(t.success)
				})
				.catch(() => {
					messageApi.error(t.fail)
				})
		} else {
			messageApi.error(t.clipboardUnavailable)
		}
	}

	return (
		<>
			{contextHolder}
			<div onClick={copyToClipboard(text)} className="at-cursor-pointer">
				{children}
			</div>
		</>
	)
}
