import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useContext } from 'react'

// Mock @refinedev/core
vi.mock('@refinedev/core', () => ({}))

// Mock axios
vi.mock('axios', () => {
	const mockAxiosInstance = {
		get: vi.fn(),
		post: vi.fn(),
		defaults: { headers: {} },
	}
	return {
		default: {
			create: vi.fn(() => mockAxiosInstance),
			get: vi.fn(),
			post: vi.fn(),
			defaults: { headers: {} },
		},
	}
})

// Mock the internal dataProvider
vi.mock('./dataProvider', () => ({
	dataProvider: vi.fn(() => ({
		getList: vi.fn(),
		getOne: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		deleteOne: vi.fn(),
		getApiUrl: vi.fn(),
		custom: vi.fn(),
	})),
}))

import { BunnyProvider, BunnyContext } from './index'
import { useBunny } from './hooks'
import axios from 'axios'

// Test consumer component
const TestConsumer = () => {
	const context = useContext(BunnyContext)
	return (
		<div>
			<span data-testid="library-id">{context.bunny_library_id}</span>
			<span data-testid="cdn-hostname">{context.bunny_cdn_hostname}</span>
			<span data-testid="has-axios">
				{context.bunny_stream_axios ? 'yes' : 'no'}
			</span>
			<span data-testid="has-provider">
				{context.bunny_data_provider_result ? 'yes' : 'no'}
			</span>
		</div>
	)
}

describe('BunnyProvider', () => {
	it('建立 axios instance 並提供 BunnyContext', () => {
		render(
			<BunnyProvider
				bunny_library_id="test-lib-123"
				bunny_stream_api_key="test-key-456"
				bunny_cdn_hostname="test.b-cdn.net"
			>
				<TestConsumer />
			</BunnyProvider>,
		)

		expect(screen.getByTestId('library-id').textContent).toBe(
			'test-lib-123',
		)
		expect(screen.getByTestId('cdn-hostname').textContent).toBe(
			'test.b-cdn.net',
		)
		expect(screen.getByTestId('has-axios').textContent).toBe('yes')
		expect(screen.getByTestId('has-provider').textContent).toBe('yes')
	})

	it('使用 AccessKey header 建立 axios instance', () => {
		render(
			<BunnyProvider
				bunny_library_id="lib-id"
				bunny_stream_api_key="my-api-key"
				bunny_cdn_hostname="cdn.example.com"
			>
				<div />
			</BunnyProvider>,
		)

		expect(axios.create).toHaveBeenCalledWith({
			baseURL: 'https://video.bunnycdn.com/library',
			headers: {
				AccessKey: 'my-api-key',
			},
		})
	})

	it('支援巢狀 BunnyProvider 合併 parent context', () => {
		const InnerConsumer = () => {
			const context = useContext(BunnyContext)
			return (
				<span data-testid="inner-lib">
					{context.bunny_library_id}
				</span>
			)
		}

		render(
			<BunnyProvider
				bunny_library_id="outer-lib"
				bunny_stream_api_key="outer-key"
				bunny_cdn_hostname="outer.cdn"
			>
				<BunnyProvider
					bunny_library_id="inner-lib"
					bunny_stream_api_key="inner-key"
					bunny_cdn_hostname="inner.cdn"
				>
					<InnerConsumer />
				</BunnyProvider>
			</BunnyProvider>,
		)

		expect(screen.getByTestId('inner-lib').textContent).toBe(
			'inner-lib',
		)
	})
})

describe('useBunny', () => {
	it('回傳 BunnyContext 的值', () => {
		const HookConsumer = () => {
			const bunny = useBunny()
			return (
				<span data-testid="hook-lib">{bunny.bunny_library_id}</span>
			)
		}

		render(
			<BunnyProvider
				bunny_library_id="hook-test-lib"
				bunny_stream_api_key="hook-test-key"
				bunny_cdn_hostname="hook.cdn"
			>
				<HookConsumer />
			</BunnyProvider>,
		)

		expect(screen.getByTestId('hook-lib').textContent).toBe(
			'hook-test-lib',
		)
	})
})
