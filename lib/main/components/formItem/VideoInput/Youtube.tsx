import { FormItemProps } from 'antd'
import { FC } from 'react'
import { getYoutubeVideoId } from '@/main/utils'
import Iframe from './Iframe'

const Youtube: FC<FormItemProps> = (formItemProps) => {
	const getVideoUrl = (videoId: string | null, input?: string) => {
		if (input) {
			const urlObj = new URL(input)
			if (urlObj.hostname === 'youtu.be') {
				return `https://youtu.be/${videoId}`
			}
			return `https://www.youtube.com/watch?v=${videoId}`
		}

		if (videoId) {
			return `https://www.youtube.com/watch?v=${videoId}`
		}

		return ''
	}
	const getEmbedVideoUrl = (videoId: string | null) =>
		videoId ? `https://www.youtube.com/embed/${videoId}` : ''

	return (
		<Iframe
			type="youtube"
			formItemProps={formItemProps}
			getVideoId={getYoutubeVideoId}
			getEmbedVideoUrl={getEmbedVideoUrl}
			getVideoUrl={getVideoUrl}
			exampleUrl="https://www.youtube.com/watch?v=fqcPIPczRVA"
		/>
	)
}

export default Youtube
