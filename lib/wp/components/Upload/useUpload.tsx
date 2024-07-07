import { useState } from 'react'
import { message, GetProp, UploadFile, UploadProps } from 'antd'

// const API_URL = 'https://partnerdemo.wpsite.pro/wp-json/wp/v2/media'
// const USERNAME = 'j7.dev.gg'
// const PASSWORD = 'VDdl Ek8F w76p fg9f iPyf AMsc'

const API_URL = 'http://ltest.test:8080/wp-json/wp/v2/media'
const USERNAME = 'j7'
const PASSWORD = 'gRJ0 14kC n9ye kQft k2Iz 5BAP'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

/**
 * accept: string
 * @example '.jpg,.png' , 'image/*', 'video/*', 'audio/*', 'image/png,image/jpeg', '.pdf, .docx, .doc, .xml'
 * @ref accept https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
 */

type TUseUploadParams = {
  apiUrl: string
  accept?: string
  uploadProps?: UploadProps
}

export const useUpload = ({
  apiUrl,
  accept = 'image/*',
  uploadProps,
}: TUseUploadParams) => {
  /**
   * fileList: UploadFile[]
   * @example
   * [
   *    {
   *     uid: '-1',
   *     name: 'image.png',
   *     status: 'done',
   *     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
   *   },
   *  ]
   */

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const mergedUploadProps: UploadProps = {
    name: 'file',
    accept,
    multiple: false,
    action: apiUrl,
    method: 'post',
    onChange({ file, fileList: theFileList }) {
      const { status, name } = file
      console.log('uploading', { file, theFileList, status })

      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${name} file upload failed.`)
      }
      setFileList(theFileList)
    },
    onPreview: async (file: UploadFile) => {
      let src = file.url as string
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj as FileType)
          reader.onload = () => resolve(reader.result as string)
        })
      }
      const image = new Image()
      image.src = src
      const imgWindow = window.open(src)
      imgWindow?.document.write(image.outerHTML)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    listType: 'picture',
    fileList,
    ...uploadProps,
  }

  return { uploadProps: mergedUploadProps }
}
