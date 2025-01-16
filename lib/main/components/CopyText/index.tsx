import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { ConfigOptions } from 'antd/es/message/interface'

export const CopyText: React.FC<{
  text: string
  children?: React.ReactNode
  messageConfig?: ConfigOptions
}> = ({
  text,
  children = <CopyOutlined className="text-blue-500 hover:text-blue-500/70" />,
  messageConfig,
}) => {
  const [messageApi, contextHolder] = message.useMessage(messageConfig)

  const copyToClipboard = (textToCopy: string) => () => {
    // 檢查剪貼簿API是否可用

    if (navigator.clipboard) {
      // 請求剪貼簿權限

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          messageApi.success('複製成功')
        })
        .catch((err) => {
          messageApi.error('OOPS! 複製失敗')
        })
    } else {
      messageApi.error('OOPS! 剪貼簿不可用')
    }
  }

  return (
    <>
      {contextHolder}
      <div onClick={copyToClipboard(text)} className="cursor-pointer">
        {children}
      </div>
    </>
  )
}
