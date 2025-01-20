
/**
 * 從 Youtube 的 URL 中取得影片 ID
 *
 * @param {string} url
 * @return {string | null} 影片 ID
 */
export const getYoutubeVideoId = (url: string | null): string | null => {
	if (!url) return ''
	try {
		const urlObj = new URL(url)
		if (urlObj.hostname === 'youtu.be') {
			return urlObj.pathname.slice(1)
		}
		const searchParams = new URLSearchParams(urlObj.search)
		return searchParams.get('v')
	} catch (error) {
		console.error('無效的 YouTube URL:', error)
		return null
	}
}

/**
 * 從 vimeo 的 URL 中取得影片 ID
 *
 * @param {string} url // ex: https://vimeo.com/900151069
 * @return {string | null} 影片 ID
 */
export const getVimeoVideoId = (url: string | null): string | null => {
	if (!url) return ''
	try {
		const regex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/
		const match = url.match(regex)
		return match ? match[1] : null
	} catch (error) {
		console.error('无效的 Vimeo URL:', error)
		return null
	}
}

/**
 * 估算上傳時間
 *
 * @param {number} fileSize
 * @returns {*}
 */
export const getEstimateUploadTimeInSeconds = (fileSize: number) => {
	// 將文件大小轉換為 bits（1 byte = 8 bits）

	const fileSizeInBits = fileSize * 8

	// 上傳速度（30 Mbps = 30,000,000 bits/second）
	const uploadSpeed = 30 * 1000 * 1000 // bits per second

	// 計算預期上傳時間（秒）

	const estimatedTimeInSeconds = fileSizeInBits / uploadSpeed

	// 返回秒數，保留兩位小數

	return Number(estimatedTimeInSeconds.toFixed(2))
}

export const getVideoUrl = (file: File) => {
	return URL.createObjectURL(file)
}