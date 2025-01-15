import { useState } from 'react'
import { UploadFile, UploadProps } from 'antd'
import { bunnyStreamAxios } from '@/rest-data-provider/bunny-stream'
import { RcFile } from 'antd/lib/upload/interface'
import { filesInQueueAtom, TUploadStatus } from '@/refine/bunny/MediaLibrary'
import { useSetAtom } from 'jotai'
import { getVideoUrl, bunny_library_id } from '@/utils'
import { TBunnyVideo, TUploadVideoResponse } from 'bunny/types'

export const useMediaUpload = (props?: any) => {
  const setFilesInQueue = useSetAtom(filesInQueueAtom)

  const uploadProps = props?.uploadProps
  const setActiveKey = props?.setActiveKey

  const [fileList, setFileList] = useState<
    (UploadFile & {
      videoId?: string
    })[]
  >([])

  const mergedUploadProps: UploadProps = {
    customRequest: async (options) => {
      const file = options?.file as RcFile
      const preview = getVideoUrl(file) // 用瀏覽器轉換為預覽的 URL
      setActiveKey('bunny-media-library')

      // 添加到佇列
      setFilesInQueue((prev) => [
        ...prev,
        {
          key: file?.uid,
          file: file as RcFile,
          status: 'active' as
            | 'active'
            | 'normal'
            | 'exception'
            | 'success'
            | undefined,
          videoId: '',
          isEncoding: false,
          encodeProgress: 0,
          uploadProgress: 0,
          preview,
        },
      ])

      try {
        // 創建影片 API
        const createVideoResult = await bunnyStreamAxios.post<TBunnyVideo>(
          `/${bunny_library_id}/videos`,
          {
            title: (file as RcFile)?.name || 'unknown name',
          },
        )

        // 取得 bunny 影片 ID
        const vId = createVideoResult?.data?.guid || 'unknown id'

        // 把 vid, preview URL 更新到全局佇列狀態
        setFilesInQueue((prev) => {
          return prev.map((fileInQueue) => {
            if (fileInQueue?.key === file?.uid) {
              return {
                ...fileInQueue,
                videoId: vId,
              }
            }

            return fileInQueue
          })
        })

        // 上傳影片 API
        const uploadVideo = await bunnyStreamAxios.put<TUploadVideoResponse>(
          `/${bunny_library_id}/videos/${vId}?enabledResolutions=720p%2C1080p`,
          file,
          {
            headers: {
              'Content-Type': 'video/*',
            },
          },
        )

        if (uploadVideo?.data?.success) {
          // 設定為 100% 並顯示成功
          setFilesInQueue((prev) => {
            return prev.map((fileInQueue) => {
              if (fileInQueue.key === file?.uid) {
                return {
                  ...fileInQueue,
                  uploadProgress: 100,
                  isEncoding: true,
                }
              }

              return fileInQueue
            })
          })
        } else {
          // 顯示失敗
          setFilesInQueue((prev) => {
            return prev.map((fileInQueue) => {
              if (fileInQueue.key === file?.uid) {
                return {
                  ...fileInQueue,
                  status: 'exception' as TUploadStatus,
                }
              }

              return fileInQueue
            })
          })
        }
      } catch (error) {
        // 顯示失敗
        setFilesInQueue((prev) => {
          return prev.map((fileInQueue) => {
            if (fileInQueue.key === file?.uid) {
              return {
                ...fileInQueue,
                status: 'exception' as TUploadStatus,
              }
            }

            return fileInQueue
          })
        })
      }
    },
    onRemove: (file) => {
      setFileList(fileList.filter((fileItem) => fileItem.uid !== file.uid))
    },
    listType: 'text',
    itemRender: () => <></>,
    fileList,
    accept: 'video/*',
    multiple: true, // 是否支持多選文件，ie10+ 支持。按住 ctrl 多選文件
    // maxCount: 1, // 最大檔案數
    ...uploadProps,
  }

  return { uploadProps: mergedUploadProps, fileList, setFileList }
}
