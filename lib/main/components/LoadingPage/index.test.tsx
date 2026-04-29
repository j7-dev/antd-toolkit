import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LoadingPage } from './index'

vi.mock('./styles.scss', () => ({}))

describe('LoadingPage', () => {
	it('渲染不崩潰並顯示 Loading... 文字', () => {
		render(<LoadingPage />)
		expect(screen.getByText('Loading...')).toBeInTheDocument()
	})
})
