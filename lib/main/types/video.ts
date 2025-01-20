export type TVideoType = 'youtube' | 'vimeo' | 'bunny-stream-api' | 'code'

export type TVideo = {
	type: TVideoType
	id: string
	meta: {
		[key: string]: any
	}
}
