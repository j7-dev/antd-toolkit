import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('jotai', () => ({
	atom: vi.fn((init: any) => ({ init })),
	useAtom: vi.fn(() => [[], vi.fn()]),
}))

vi.mock('@/main/components/LocaleProvider', () => ({
	useLocale: () => ({
		uploading: '上傳中...',
	}),
}))

vi.mock('./FileUploadProgress', () => ({
	default: () => <div data-testid="file-upload-progress" />,
}))

import { MediaLibraryNotification, filesInQueueAtom } from './index'

describe('MediaLibraryNotification', () => {
	it('不崩潰地渲染上傳通知元件', () => {
		const { container } = render(<MediaLibraryNotification />)
		expect(container).toBeInTheDocument()
	})

	it('匯出 filesInQueueAtom', () => {
		expect(filesInQueueAtom).toBeDefined()
	})
})
