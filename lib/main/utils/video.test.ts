import { describe, it, expect } from 'vitest'
import {
	getYoutubeVideoId,
	getVimeoVideoId,
	getEstimateUploadTimeInSeconds,
} from './video'

describe('getYoutubeVideoId', () => {
	it('從 youtu.be 短網址取得影片 ID', () => {
		expect(getYoutubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe(
			'dQw4w9WgXcQ',
		)
	})

	it('從 ?v= 格式取得影片 ID', () => {
		expect(
			getYoutubeVideoId(
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			),
		).toBe('dQw4w9WgXcQ')
	})

	it('null 輸入回傳空字串', () => {
		expect(getYoutubeVideoId(null)).toBe('')
	})

	it('無效 URL 回傳 null', () => {
		expect(getYoutubeVideoId('not-a-url')).toBeNull()
	})
})

describe('getVimeoVideoId', () => {
	it('從 vimeo.com URL 取得影片 ID', () => {
		expect(getVimeoVideoId('https://vimeo.com/900151069')).toBe(
			'900151069',
		)
	})

	it('null 輸入回傳空字串', () => {
		expect(getVimeoVideoId(null)).toBe('')
	})

	it('無效 URL 回傳 null', () => {
		expect(getVimeoVideoId('https://example.com/video')).toBeNull()
	})
})

describe('getEstimateUploadTimeInSeconds', () => {
	it('依 30 Mbps 估算上傳時間', () => {
		// 30 MB file = 30 * 1024 * 1024 bytes = 31457280 bytes
		// 31457280 * 8 bits = 251658240 bits
		// 251658240 / 30000000 = 8.39 seconds
		const fileSize = 30 * 1024 * 1024
		const result = getEstimateUploadTimeInSeconds(fileSize)
		expect(result).toBeCloseTo(8.39, 1)
	})
})
