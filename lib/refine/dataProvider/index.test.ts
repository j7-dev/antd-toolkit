import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

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

// Mock @/main/types
vi.mock('@/main/types', () => ({}))

// Mock data provider utils
vi.mock('./utils', () => ({
	generateFilter: vi.fn(() => ({})),
	generateSort: vi.fn(() => ''),
}))

import { dataProvider } from './index'

describe('dataProvider', () => {
	const apiUrl = 'https://example.com/wp-json/v1'
	let mockHttpClient: any

	beforeEach(() => {
		mockHttpClient = {
			get: vi.fn(),
			post: vi.fn(),
			put: vi.fn(),
			patch: vi.fn(),
			delete: vi.fn(),
			defaults: { headers: {} },
		}
	})

	describe('getList', () => {
		it('使用 server 分頁模式取得資源列表', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: [{ id: 1 }, { id: 2 }],
				headers: {
					'x-wp-totalpages': '5',
					'x-wp-total': '100',
					'x-wp-currentpage': '1',
				},
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.getList({
				resource: 'products',
				pagination: { current: 1, pageSize: 20, mode: 'server' },
			})

			expect(mockHttpClient.get).toHaveBeenCalledTimes(1)
			expect(result.data).toEqual([{ id: 1 }, { id: 2 }])
			expect(result.total).toBe(100)
			expect((result as any).totalPages).toBe(5)
			expect((result as any).currentPage).toBe(1)
		})

		it('回應 header 缺少分頁資訊時 fallback 為 1', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: [{ id: 1 }],
				headers: {},
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.getList({
				resource: 'products',
			})

			expect(result.total).toBe(1)
			expect((result as any).totalPages).toBe(1)
		})
	})

	describe('getMany', () => {
		it('透過 include 參數取得多筆資源', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: [{ id: 1 }, { id: 2 }],
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.getMany({
				resource: 'products',
				ids: [1, 2],
			})

			const calledUrl = mockHttpClient.get.mock.calls[0][0]
			expect(calledUrl).toContain('products')
			expect(calledUrl).toContain('include')
		})
	})

	describe('getOne', () => {
		it('取得單一資源 by ID', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: { id: 42, name: 'Test' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.getOne({
				resource: 'products',
				id: 42,
			})

			const calledUrl = mockHttpClient.get.mock.calls[0][0]
			expect(calledUrl).toContain('products/42')
		})
	})

	describe('create', () => {
		it('送出 POST 請求建立資源', async () => {
			mockHttpClient.post.mockResolvedValue({
				data: { id: 99, name: 'New' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.create({
				resource: 'products',
				variables: { name: 'New' },
			})

			expect(mockHttpClient.post).toHaveBeenCalledTimes(1)
			const [url, body, config] = mockHttpClient.post.mock.calls[0]
			expect(url).toContain('products')
			expect(body).toEqual({ name: 'New' })
			expect(config.headers['Content-Type']).toContain('multipart/form-data')
		})

		it('支援 meta.method 覆寫請求方法', async () => {
			mockHttpClient.put.mockResolvedValue({
				data: { id: 99 },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await dp.create({
				resource: 'products',
				variables: { name: 'New' },
				meta: { method: 'put' },
			})

			expect(mockHttpClient.put).toHaveBeenCalledTimes(1)
		})
	})

	describe('update', () => {
		it('送出 POST 請求修改資源', async () => {
			mockHttpClient.post.mockResolvedValue({
				data: { id: 1, name: 'Updated' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await dp.update({
				resource: 'products',
				id: 1,
				variables: { name: 'Updated' },
			})

			expect(mockHttpClient.post).toHaveBeenCalledTimes(1)
			const calledUrl = mockHttpClient.post.mock.calls[0][0]
			expect(calledUrl).toContain('products/1')
		})
	})

	describe('deleteOne', () => {
		it('送出 DELETE 請求刪除資源', async () => {
			mockHttpClient.delete.mockResolvedValue({
				data: { deleted: true },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await dp.deleteOne({
				resource: 'products',
				id: 1,
				variables: { force: true },
			})

			expect(mockHttpClient.delete).toHaveBeenCalledTimes(1)
			const calledUrl = mockHttpClient.delete.mock.calls[0][0]
			expect(calledUrl).toContain('products/1')
		})
	})

	describe('getApiUrl', () => {
		it('回傳初始化時的 apiUrl', () => {
			const dp = dataProvider(apiUrl, mockHttpClient)
			expect(dp.getApiUrl()).toBe(apiUrl)
		})
	})

	describe('errorHandler', () => {
		it('錯誤時提取 response.data.message 並 reject', async () => {
			mockHttpClient.get.mockRejectedValue({
				response: {
					data: { message: 'Not found' },
				},
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await expect(
				dp.getOne({ resource: 'products', id: 999 }),
			).rejects.toEqual({
				message: 'Not found',
				statusCode: 500,
			})
		})

		it('錯誤無 response 時 fallback 為 error.message', async () => {
			mockHttpClient.get.mockRejectedValue({
				message: 'Network Error',
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await expect(
				dp.getOne({ resource: 'products', id: 999 }),
			).rejects.toEqual({
				message: 'Network Error',
				statusCode: 500,
			})
		})
	})

	describe('custom', () => {
		it('GET 方法使用 requestUrl', async () => {
			mockHttpClient.get.mockResolvedValue({
				data: { result: 'ok' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			const result = await dp.custom({
				url: `${apiUrl}/custom-endpoint`,
				method: 'get',
			})

			expect(mockHttpClient.get).toHaveBeenCalledTimes(1)
		})

		it('POST 方法使用 payload', async () => {
			mockHttpClient.post.mockResolvedValue({
				data: { result: 'created' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await dp.custom({
				url: `${apiUrl}/custom-endpoint`,
				method: 'post',
				payload: { key: 'value' },
			})

			expect(mockHttpClient.post).toHaveBeenCalledWith(
				`${apiUrl}/custom-endpoint`,
				{ key: 'value' },
			)
		})

		it('DELETE 方法使用 data payload', async () => {
			mockHttpClient.delete.mockResolvedValue({
				data: { result: 'deleted' },
			})

			const dp = dataProvider(apiUrl, mockHttpClient)
			await dp.custom({
				url: `${apiUrl}/custom-endpoint`,
				method: 'delete',
				payload: { id: 1 },
			})

			expect(mockHttpClient.delete).toHaveBeenCalledWith(
				`${apiUrl}/custom-endpoint`,
				{ data: { id: 1 } },
			)
		})
	})
})
