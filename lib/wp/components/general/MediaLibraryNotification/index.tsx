import { useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { notification, UploadFile } from 'antd'
import FileUploadProgress from './FileUploadProgress'
import { atom, useAtom } from 'jotai'

export const filesInQueueAtom = atom<UploadFile[]>([])

export const MediaLibraryNotification = () => {
	const [filesInQueue, setFilesInQueue] = useAtom(filesInQueueAtom)
	// upload indicator
	useEffect(() => {
		if (filesInQueue?.length) {
			notification.open({
				key: 'files-uploading',
				icon: <CloudUploadOutlined style={{ color: '#1677ff' }} />,
				message: '檔案上傳中',
				description: (
					<>
						{filesInQueue?.map((fileInQueue) => (
							<FileUploadProgress
								key={`${fileInQueue?.uid}-${new Date().getTime()}`}
								fileInQueue={fileInQueue}
							/>
						))}
					</>
				),
				duration: null,
				onClose: () => {
					if (!setFilesInQueue) return
					// @ts-ignore
					setFilesInQueue([])
				},
			})
		} else {
			notification.destroy('files-uploading')
		}
	}, [filesInQueue])

	return <></>
}
