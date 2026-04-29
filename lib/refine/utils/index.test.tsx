import { describe, it, expect, vi, beforeEach } from 'vitest'

// Use vi.hoisted so mock fns are available before vi.mock factories execute
const {
	mockNotificationInfo,
	mockNotificationSuccess,
	mockNotificationError,
	mockNotificationDestroy,
} = vi.hoisted(() => ({
	mockNotificationInfo: vi.fn(),
	mockNotificationSuccess: vi.fn(),
	mockNotificationError: vi.fn(),
	mockNotificationDestroy: vi.fn(),
}))

// Mock antd notification
vi.mock('antd', async () => {
	const actual = await vi.importActual<any>('antd')
	return {
		...actual,
		notification: {
			info: mockNotificationInfo,
			success: mockNotificationSuccess,
			error: mockNotificationError,
			destroy: mockNotificationDestroy,
		},
	}
})

// Mock @ant-design/icons with stub components for all icons used in the
// transitive dependency chain
vi.mock('@ant-design/icons', () => {
	const stub = () => null
	return {
		InfoCircleTwoTone: stub,
		CheckCircleTwoTone: stub,
		CloseCircleTwoTone: stub,
		CheckOutlined: stub,
		CloseOutlined: stub,
		BarsOutlined: stub,
		SearchOutlined: stub,
		CloseCircleFilled: stub,
		CopyOutlined: stub,
		EditFilled: stub,
		SaveFilled: stub,
		DeleteOutlined: stub,
		UndoOutlined: stub,
		SendOutlined: stub,
		ExportOutlined: stub,
		ExclamationCircleFilled: stub,
		DoubleRightOutlined: stub,
		InboxOutlined: stub,
		CaretUpOutlined: stub,
		CaretDownOutlined: stub,
		EyeOutlined: stub,
		CloudUploadOutlined: stub,
		SlidersOutlined: stub,
		CalendarOutlined: stub,
		ClockCircleOutlined: stub,
		SettingOutlined: stub,
		CodeOutlined: stub,
		StarFilled: stub,
		StarOutlined: stub,
		DownloadOutlined: stub,
		ShoppingCartOutlined: stub,
		TagOutlined: stub,
		PictureOutlined: stub,
	}
})

// Mock @/main
vi.mock('@/main', () => ({
	getTextContent: (html: string) => {
		const div = document.createElement('div')
		div.innerHTML = html
		return div.textContent || ''
	},
}))

import {
	objToCrudFilters,
	getInitialFilters,
	defaultDeleteButtonProps,
	notificationProvider,
	notificationProps,
} from './index'

describe('objToCrudFilters', () => {
	it('將 truthy key-value 物件轉換為 CrudFilters 陣列', () => {
		const values = {
			name: 'test',
			status: 'publish',
		}
		const result = objToCrudFilters(values)
		expect(result).toEqual([
			{ field: 'name', operator: 'eq', value: 'test' },
			{ field: 'status', operator: 'eq', value: 'publish' },
		])
	})

	it('跳過 falsy 值的 key', () => {
		const values = {
			name: 'test',
			status: '',
			count: 0,
			flag: null,
			missing: undefined,
		}
		const result = objToCrudFilters(values)
		expect(result).toEqual([
			{ field: 'name', operator: 'eq', value: 'test' },
		])
	})

	it('空物件回傳空陣列', () => {
		const result = objToCrudFilters({})
		expect(result).toEqual([])
	})
})

describe('getInitialFilters（已棄用別名）', () => {
	it('與 objToCrudFilters 行為一致', () => {
		const values = { name: 'test' }
		expect(getInitialFilters(values)).toEqual(objToCrudFilters(values))
	})
})

describe('defaultDeleteButtonProps', () => {
	it('提供標準刪除按鈕設定', () => {
		expect(defaultDeleteButtonProps).toMatchObject({
			confirmTitle: '確認刪除嗎?',
			confirmOkText: '確認',
			confirmCancelText: '取消',
			hideText: true,
			type: 'text',
		})
	})
})

describe('notificationProvider', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('open 方法根據 type 呼叫對應的 antd notification', () => {
		notificationProvider.open({
			key: 'test-key',
			message: 'Success!',
			type: 'success',
			description: 'It worked',
		})
		expect(mockNotificationSuccess).toHaveBeenCalledTimes(1)
		const callArg = mockNotificationSuccess.mock.calls[0][0]
		expect(callArg.key).toBe('test-key')
		expect(callArg.description).toBe('It worked')
		expect(callArg.showProgress).toBe(true)
		expect(callArg.pauseOnHover).toBe(true)
	})

	it('type 為 progress 時映射為 info 通知', () => {
		notificationProvider.open({
			key: 'progress-key',
			message: 'Loading...',
			type: 'progress',
			description: '',
		})
		expect(mockNotificationInfo).toHaveBeenCalledTimes(1)
	})

	it('close 方法呼叫 notification.destroy', () => {
		notificationProvider.close('some-key')
		expect(mockNotificationDestroy).toHaveBeenCalledWith('some-key')
	})
})

describe('notificationProps', () => {
	it('successNotification 從 AxiosResponse 提取 message', () => {
		const axiosResponse = {
			data: {
				code: 200,
				message: '操作成功',
			},
		}
		const result = notificationProps.successNotification(
			axiosResponse,
			{},
			'products',
		)
		expect(result).toEqual({
			message: '操作成功',
			type: 'success',
		})
	})

	it('successNotification 無 message 時 fallback 為「成功」', () => {
		const axiosResponse = { data: {} }
		const result = notificationProps.successNotification(
			axiosResponse,
			{},
			'products',
		)
		expect(result).toEqual({
			message: '成功',
			type: 'success',
		})
	})

	it('errorNotification 從 AxiosError 提取 response.data.message 並去除 HTML', () => {
		const axiosError = {
			response: {
				data: {
					message: '<p>Something went wrong</p>',
				},
			},
			message: 'Network Error',
		}
		const result = notificationProps.errorNotification(
			axiosError,
			{},
			'products',
		)
		expect(result).toEqual({
			message: 'Something went wrong',
			type: 'error',
		})
	})

	it('errorNotification 無 response 時 fallback 為 error.message', () => {
		const axiosError = {
			message: 'timeout exceeded',
		}
		const result = notificationProps.errorNotification(
			axiosError,
			{},
			'products',
		)
		expect(result).toEqual({
			message: 'timeout exceeded',
			type: 'error',
		})
	})
})
