import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

// Mock @/main/types
vi.mock('@/main/types', () => ({}))

// Mock @/refine - TGetVideosResponse
vi.mock('@/refine', () => ({}))

// Mock query-string
vi.mock('query-string', () => ({
	default: {
		stringify: (obj: any, opts?: any) => {
			if (!obj) return ''
			return Object.entries(obj)
				.filter(([_, v]) => v !== undefined && v !== null)
				.map(([k, v]) => `${k}=${v}`)
				.join('&')
		},
	},
}))

// Mock data provider utils
vi.mock('../utils', () => ({
	generateFilter: vi.fn(() => ({})),
	generateSort: vi.fn(() => ''),
}))

import { bunnyStreamDataProvider } from './index'

describe('bunnyStreamDataProvider', () => {
	const apiUrl = 'https://video.bunnycdn.com/library'
	let mockHttpClient: any

	beforeEach(() => {
		mockHttpClient = {
			get: vi.fn(),
			post: vi.fn(),
			put: vi.fn(),
			delete: vi.fn(),
			defaults: { headers: {} },
		}
	})

	describe('getList', () => {
		it('從 Bunny Stream API 取得影片列表', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: {
					totalItems: 50,
					currentPage: 1,
					itemsPerPage: 10,
					items: [
						{ guid: 'vid-1', title: 'Video 1' },
						{ guid: 'vid-2', title: 'Video 2' },
					],
				},
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			const result = await dp.getList({
				resource: 'lib-id/videos',
				pagination: { current: 1, pageSize: 10, mode: 'server' },
			})

			expect(result.data).toHaveLength(2)
			expect(result.total).toBe(50)
		})

		it('回應無 items 時 fallback 為空陣列和 total 0', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: {},
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			const result = await dp.getList({
				resource: 'lib-id/videos',
			})

			expect(result.data).toEqual([])
			expect(result.total).toBe(0)
		})
	})

	describe('getOne', () => {
		it('取得單一影片 by ID', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: { guid: 'vid-1', title: 'Video 1' },
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			const result = await dp.getOne({
				resource: 'lib-id/videos',
				id: 'vid-1',
			})

			expect(result.data).toEqual({ guid: 'vid-1', title: 'Video 1' })
			const calledUrl = mockHttpClient.get.mock.calls[0][0]
			expect(calledUrl).toContain('vid-1')
		})
	})

	describe('deleteOne', () => {
		it('刪除單一影片', async () => {
			mockHttpClient.delete.mockResolvedValue({
				data: { success: true },
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			const result = await dp.deleteOne({
				resource: 'lib-id/videos',
				id: 'vid-1',
			})

			expect(result.data).toEqual({ success: true })
			expect(mockHttpClient.delete).toHaveBeenCalledTimes(1)
		})
	})

	describe('getApiUrl', () => {
		it('回傳 Bunny Stream API URL', () => {
			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			expect(dp.getApiUrl()).toBe(apiUrl)
		})
	})

	describe('create', () => {
		it('建立影片資源', async () => {
			mockHttpClient.post.mockResolvedValue({
				data: { guid: 'new-vid', title: 'New Video' },
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			const result = await dp.create({
				resource: 'lib-id/videos',
				variables: { title: 'New Video' },
			})

			expect(result.data).toEqual({ guid: 'new-vid', title: 'New Video' })
		})
	})

	describe('custom', () => {
		it('POST 方法使用 payload', async () => {
			mockHttpClient.post.mockResolvedValue({
				data: { result: 'ok' },
			})

			const dp = bunnyStreamDataProvider(apiUrl, mockHttpClient)
			await dp.custom({
				url: `${apiUrl}/lib-id/videos/fetch`,
				method: 'post',
				payload: { url: 'https://example.com/video.mp4' },
			})

			expect(mockHttpClient.post).toHaveBeenCalledWith(
				`${apiUrl}/lib-id/videos/fetch`,
				{ url: 'https://example.com/video.mp4' },
			)
		})
	})
})
