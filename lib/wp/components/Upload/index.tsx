import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Upload as AntdUpload } from 'antd'
import { useUpload } from './useUpload'
import ImgCrop from 'antd-img-crop'

const { Dragger } = AntdUpload

export const Upload: React.FC<{}> = () => {
  const { uploadProps } = useUpload()
  return (
    <ImgCrop
      rotationSlider
      quality={1}
      aspectSlider
      showReset
      showGrid
      // cropShape="round"
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">點擊或拖曳文件到這裡上傳</p>
        <p className="ant-upload-hint">
          支持單個或批量上傳。僅支持 jpg/png 文件
        </p>
      </Dragger>
    </ImgCrop>
  )
}

export * from './useUpload'
