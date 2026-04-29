import { useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import { notification, UploadFile } from 'antd'
import FileUploadProgress from './FileUploadProgress'
import { atom, useAtom } from 'jotai'
import { useLocale } from '@/main/components/LocaleProvider'

export const filesInQueueAtom = atom<UploadFile[]>([])

export const MediaLibraryNotification = () => {
	const [filesInQueue, setFilesInQueue] = useAtom(filesInQueueAtom)
	const t = useLocale('MediaLibraryNotification')
	// upload indicator
	useEffect(() => {
		if (filesInQueue?.length) {
			notification.open({
				key: 'files-uploading',
				icon: <CloudUploadOutlined style={{ color: '#1677ff' }} />,
				message: t.uploading,
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
