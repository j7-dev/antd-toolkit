import { Form, FormItemProps, Input } from 'antd'
import {
	FC,
	DetailedHTMLProps,
	IframeHTMLAttributes,
	useEffect,
	useState,
} from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { TVideoType } from './types/video'

const { Item } = Form

// 抽象組件，適用任何拿來 iFrame 的平台
const Iframe: FC<{
	type: TVideoType
	formItemProps: FormItemProps
	getVideoId: (_url: string | null) => string | null
	getEmbedVideoUrl: (_videoId: string | null) => string
	getVideoUrl: (_videoId: string | null, input?: string) => string
	exampleUrl: string
	iframeProps?: Partial<
		DetailedHTMLProps<
			IframeHTMLAttributes<HTMLIFrameElement>,
			HTMLIFrameElement
		>
	>
}> = ({
	type,
	formItemProps,
	getVideoId,
	getEmbedVideoUrl,
	getVideoUrl,
	exampleUrl,
	iframeProps,
}) => {
	const [vIdOrUrl, setVIdOrUrl] = useState('')
	const form = Form.useFormInstance()
	const { name } = formItemProps
	const watchField = Form.useWatch(name, form)
	const platFormName = type.toUpperCase()

	useEffect(() => {
		if (watchField?.id) {
			const url = getVideoUrl(watchField.id, vIdOrUrl)
			setVIdOrUrl(url)
		}
	}, [watchField?.id])

	if (!name) {
		throw new Error('name is required')
	}

	const videoId = watchField?.id
	const validVideoId = watchField && videoId
	const invalidVideoId = watchField && videoId === null

	const embedVideoUrl = getEmbedVideoUrl(videoId)

	const handleDelete = () => {
		form.setFieldValue(name, {
			type,
			id: '',
			meta: {},
		})
	}

	return (
		<div className="at-relative">
			<Input
				size="small"
				allowClear
				placeholder={`請輸入 ${platFormName} 影片連結`}
				value={vIdOrUrl}
				onChange={(e) => {
					const string = e.target.value
					setVIdOrUrl(string)
					const vId = string ? getVideoId(string) : ''
					form.setFieldValue(name, {
						type,
						id: vId,
						meta: {},
					})
				}}
				className="at-mb-1"
			/>
			<Item {...formItemProps} hidden />

			{/* 如果章節已經有存影片，則顯示影片，有瀏覽器 preview，則以 瀏覽器 preview 優先 */}
			{validVideoId && (
				<>
					<div
						className="at-aspect-video at-w-full at-p-2"
						style={{
							border: '1px dashed #d9d9d9',
							backgroundColor: 'rgba(0, 0, 0, 0.02)',
							borderRadius: '8px',
						}}
					>
						<div className="at-size-full at-rounded-xl at-overflow-hidden">
							<div
								className={`at-rounded-xl at-bg-gray-200 ${watchField ? 'at-tw-block' : 'at-tw-hidden'}`}
								style={{
									position: 'relative',
									paddingTop: '56.25%',
								}}
							>
								<iframe
									className="at-border-0 at-absolute at-top-0 at-left-0 at-size-full at-rounded-xl"
									src={embedVideoUrl}
									loading="lazy"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen={true}
									{...iframeProps}
								></iframe>
								<div
									onClick={handleDelete}
									className="at-group at-absolute at-top-4 at-right-4 at-rounded-md at-size-12 at-bg-white at-shadow-lg at-flex at-justify-center at-items-center at-transition at-duration-300 hover:at-bg-red-500 at-cursor-pointer"
								>
									<DeleteOutlined className="at-text-red-500 group-hover:at-text-white" />
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			{invalidVideoId && (
				<div>
					請輸入有效的 {platFormName} 影片連結 例如:
					{exampleUrl}
				</div>
			)}
		</div>
	)
}

export default Iframe
