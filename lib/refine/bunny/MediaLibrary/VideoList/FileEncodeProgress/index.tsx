import { FC } from 'react'
import { Progress, Tooltip } from 'antd'
import { TFileInQueue, useBunny } from '@/refine'

const FileEncodeProgress: FC<{
	fileInQueue: TFileInQueue
}> = ({ fileInQueue }) => {
	const { bunny_library_id } = useBunny()
	const { status = 'active', videoId = '', encodeProgress } = fileInQueue

	const bunnyUrl = `https://dash.bunny.net/stream/${bunny_library_id}/library/videos?videoId=${videoId}&page=1&search=${videoId}#noscroll`

	return (
		<>
			<Tooltip
				title={
					<>
						影片已上傳至 Bunny，Bunny 正在編碼中...您可以離開去做其他事情了，或
						<a href={bunnyUrl} target="_blank" rel="noreferrer">
							前往 Bunny
						</a>{' '}
						查看編碼狀態
					</>
				}
				className="m-2 text-xs"
			>
				Bunny 編碼中...
			</Tooltip>
			<Progress
				percent={encodeProgress}
				percentPosition={{ align: 'center', type: 'outer' }}
				status={status}
			/>
		</>
	)
}

export default FileEncodeProgress
