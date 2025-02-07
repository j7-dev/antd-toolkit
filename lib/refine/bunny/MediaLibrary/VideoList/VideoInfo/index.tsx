import { TBunnyVideo, useBunny } from '@/refine'
import { SimpleImage } from '@/main/components'
import { ObjectTable, CopyText } from '@/main/components'
import { Button, Tooltip } from 'antd'
import { CopyOutlined, ExportOutlined } from '@ant-design/icons'
import { DeleteButton } from '@refinedev/antd'

const VideoInfo = ({ video }: { video: TBunnyVideo }) => {
	const { bunny_cdn_hostname, bunny_library_id } = useBunny()
	const { guid, videoLibraryId } = video
	const iframeText = `<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/${videoLibraryId}/${guid}?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>`
	const bunnyUrl = `https://dash.bunny.net/stream/${bunny_library_id}/library/videos?videoId=${guid}&page=1&search=${guid}#noscroll`

	return (
		<>
			<SimpleImage
				className="at-w-full at-rounded-md at-overflow-hidden"
				loadingClassName="at-text-sm at-text-gray-500 at-font-bold"
				src={`https://${bunny_cdn_hostname}/${guid}/preview.webp`}
			/>
			<div className="at-flex at-gap-4 at-my-4">
				<CopyText text={iframeText}>
					<Button type="default" icon={<CopyOutlined />} iconPosition="end">
						複製 iframe 影片嵌入代碼
					</Button>
				</CopyText>
				<Tooltip title="前往 Bunny 頁面">
					<Button
						type="default"
						href={bunnyUrl}
						target="_blank"
						className="at-px-0 at-w-8"
					>
						<ExportOutlined />
					</Button>
				</Tooltip>
				<Tooltip title="刪除 Bunny 影片">
					<DeleteButton
						hideText
						resource={`${bunny_library_id}/videos`}
						dataProviderName="bunny-stream"
						recordItemId={guid}
						confirmTitle="確認刪除 Bunny 影片嗎?"
						confirmOkText="確認"
						confirmCancelText="取消"
					/>
				</Tooltip>
			</div>
			<ObjectTable record={video} />
		</>
	)
}

export default VideoInfo
