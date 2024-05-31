import React from 'react'
import type { UploadProps } from 'antd'
import { message } from 'antd'

export const useUpload = () => {
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.jpg,.png',
    multiple: false,
    data: {
      test: 'testargs',
    },
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {},
    method: 'post',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return { uploadProps }
}
