import { FormItemProps } from 'antd'
import { FC } from 'react'
import { getVimeoVideoId } from '@/main/utils'
import Iframe from './Iframe'

const Vimeo: FC<FormItemProps> = (formItemProps) => {
	const getVideoUrl = (videoId: string | null) =>
		videoId ? `https://vimeo.com/${videoId}` : ''
	const getEmbedVideoUrl = (videoId: string | null) =>
		videoId
			? `https://player.vimeo.com/video/${videoId}?h=f741860ba7&color=a6a8a8&title=0&byline=0&portrait=0`
			: ''

	return (
		<Iframe
			type="vimeo"
			formItemProps={formItemProps}
			getVideoId={getVimeoVideoId}
			getEmbedVideoUrl={getEmbedVideoUrl}
			getVideoUrl={getVideoUrl}
			exampleUrl="https://vimeo.com/900151069"
		/>
	)
}

export default Vimeo
