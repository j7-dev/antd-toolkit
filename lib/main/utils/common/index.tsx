import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合併 Tailwind CSS 的 class
 */
export const cn = (...args: ClassValue[]) => twMerge(clsx(args))

/**
 * 判斷是否為 iPhone
 */
export const isIphone = /iPhone/.test(navigator.userAgent)

/**
 * 渲染 HTML 字串
 */
export const renderHTML = (HTMLstring: string, allowJS: boolean = false) => {
	if (allowJS) {
		// 當 HTMLstring 裡面包含 script 標籤時 就執行裡面的 js代碼
		setTimeout(() => {
			const parser = new DOMParser()
			const doc = parser.parseFromString(HTMLstring, 'text/html')
			const scripts = doc.querySelectorAll('script')

			scripts.forEach((script) => {
				try {
					// 創建一個新的 script 元素
					const newScript = document.createElement('script')
					// 如果有 src 屬性，則複製
					if (script.src) {
						newScript.src = script.src
					}
					// 複製其他屬性
					Array.from(script.attributes).forEach((attr) => {
						if (attr.name !== 'src') {
							newScript.setAttribute(attr.name, attr.value)
						}
					})
					// 複製腳本內容
					newScript.textContent = script.textContent
					// 將新建的腳本添加到文檔中執行
					document.head.appendChild(newScript)

					// 執行後移除腳本，保持文檔整潔
					setTimeout(() => {
						document.head.removeChild(newScript)
					}, 0)
				} catch (error) {
					console.error('執行腳本時發生錯誤:', error)
				}
			})
		}, 0)
	}

	return React.createElement('div', {
		dangerouslySetInnerHTML: { __html: HTMLstring },
	})
}

/**
 * 轉換 HTML 實體
 * @param text
 * @returns
 */
export function escapeHtml(text: string) {
	const div = document.createElement('div')
	div.textContent = text
	return div.innerHTML
}

/**
 * 取得可複製的 JSON 字串
 */
export const getCopyableJson = (variable: object) => {
	const jsonStringStrippedEscapeC = JSON.stringify(
		JSON.stringify(variable || '{}'),
	).replace(/\\/g, '')
	const jsonString = jsonStringStrippedEscapeC.slice(
		1,
		jsonStringStrippedEscapeC.length - 1,
	)

	if (typeof variable === 'object') {
		const countKeys = Object.keys(variable).length

		return countKeys === 0 ? '' : jsonString
	}
	return variable ? jsonString : ''
}

/**
 * 取得 URL 查詢字串
 */
export const getQueryString = (name: string) => {
	const urlParams = new URLSearchParams(window.location.search)
	const paramValue = urlParams.get(name)
	return paramValue
}

/**
 * 取得貨幣字串
 */
export const getCurrencyString = ({
	price,
	symbol = 'NT$',
}: {
	price: number | string | undefined
	symbol?: string
}) => {
	if (typeof price === 'undefined') return ''
	if (typeof price === 'string') return `${symbol} ${price}`
	return `${symbol} ${price.toString()}`
}

/**
 * 過濾物件的鍵值
 * 例如: 把一個深層物件 value 為 undefined 的 key 過濾掉
 */
export const filterObjKeys = (
	obj: object,
	filterValues: (string | number | boolean | undefined | null)[] = [undefined],
) => {
	for (const key in obj) {
		if (filterValues.includes(obj[key as keyof typeof obj])) {
			delete obj[key as keyof typeof obj]
		} else if (typeof obj[key as keyof typeof obj] === 'object') {
			filterObjKeys(obj[key as keyof typeof obj]) // 递归处理嵌套对象
			if (Object.keys(obj[key as keyof typeof obj]).length === 0) {
				delete obj[key as keyof typeof obj]
			}
		}
	}

	return obj
}

/**
 * 將駝峰或蛇形字串轉換為單字
 * Camel or snake case to word
 */
export const keyToWord = (str: string) => {
	// 判斷是否為 snake_case 或 Camel Case

	if (str.includes('_')) {
		// 將 snake_case 轉換為 Camel Case

		return str
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	} else {
		// 將 Camel Case 轉換為 Camel Case（確保第一個單詞首字母大寫）

		return (
			str.charAt(0).toUpperCase() +
			str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')
		)
	}
}

/**
 * 判斷是否使用區塊編輯器
 */
export const isUsingBlockEditor =
	typeof window?.wp !== 'undefined' && typeof window?.wp?.blocks !== 'undefined'

/**
 * 移除字串尾部的斜杠
 */
export function removeTrailingSlash(str: string) {
	if (str.endsWith('/')) {
		// 如果字符串以斜杠结尾，使用 slice 方法去除最后一个字符

		return str.slice(0, -1)
	}

	// 否则，返回原字符串

	return str
}

/**
 * 取得物件陣列 item[][] 的最大公約數
 */
export function getGCDItems<T>(items: T[][], key = 'id'): T[] {
	if (items.length === 0) return []

	// sort by items length asc
	const sortedItems = items.sort((a, b) => a.length - b.length)
	if (sortedItems[0].length === 0) return []
	const firstItemIds = sortedItems?.[0]?.map((item) => item?.[key as keyof T])

	const gcdIds: string[] = []
	firstItemIds.forEach((id) => {
		if (
			sortedItems.every((item) =>
				item.some((course) => course?.[key as keyof T] === id),
			)
		) {
			gcdIds.push(id as string)
		}
	})
	const gcdItems = gcdIds
		.map((id) => {
			return sortedItems[0].find((item) => item?.[key as keyof T] === id)
		})
		.filter((item) => item !== undefined)

	return gcdItems
}

/**
 * 取得檔案副檔名
 */
export function getFileExtension(url: string) {
	return url?.split('.')?.pop()?.toLowerCase() ?? ''
}

/**
 * 判斷是否為圖片檔案
 */
export function isImageFile(url: string) {
	const imageExtensions = [
		'jpg',
		'jpeg',
		'png',
		'gif',
		'webp',
	]
	return imageExtensions.includes(getFileExtension(url))
}

/**
 * 判斷是否為音訊檔案
 */
export function isAudioFile(url: string) {
	const audioExtensions = [
		'mp3',
		'wav',
		'm4a',
		'aac',
		'flac',
	]
	return audioExtensions.includes(getFileExtension(url))
}

/**
 * 判斷是否為影片檔案
 */
export function isVideoFile(url: string) {
	const videoExtensions = ['mp4', 'webm']
	return videoExtensions.includes(getFileExtension(url))
}

/**
 * 簡單解密
 */
export function simpleDecrypt(str: string): any {
	if (typeof str !== 'string') return null

	// 反向位移
	let decoded = ''
	for (let i = 0; i < str.length; i++) {
		decoded += String.fromCharCode(str?.charCodeAt(i) - 1)
	}

	// base64 解碼
	const jsonStr = atob(decoded)
	try {
		return JSON.parse(jsonStr)
	} catch (error) {
		console.error('JSON.parse env 參數解析失敗:', error)
		return null
	}
}

/**
 * 取得 HTML 的純文字內容
 */
export function getTextContent(html: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')
	return doc.body.textContent || ''
}

/**
 * 將值轉換為字串
 */
export function valueStringify(value: any) {
	if (value === null) {
		return 'null'
	}
	if (value === undefined) {
		return 'undefined'
	}
	if (typeof value === 'string') {
		return value
	}
	if (typeof value === 'number') {
		return value.toString()
	}
	if (Array.isArray(value)) {
		return value.join(', ')
	}
	if (typeof value === 'boolean') {
		return value ? 'true' : 'false'
	}
	if (typeof value === 'object') {
		return JSON.stringify(value)
	}
	return value?.toString()
}
