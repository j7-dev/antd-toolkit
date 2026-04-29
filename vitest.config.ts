/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import type { Plugin } from 'vite'

const mockPath = resolve(__dirname, 'vitest.mock.editor.ts')

const mockedPackages = [
	'@blocknote/',
	'@refinedev/',
	'@uidotdev/usehooks',
	'antd-img-crop',
	'react-icons/',
	'canvas-confetti',
	'query-string',
]

function mockExternalDeps(): Plugin {
	return {
		name: 'mock-external-deps',
		enforce: 'pre',
		resolveId(source) {
			if (mockedPackages.some((pkg) => source.startsWith(pkg))) {
				return mockPath
			}
			if (source.endsWith('.scss') || source.endsWith('.css')) {
				if (
					source.includes('@/main/assets/scss') ||
					source.includes('@blocknote')
				) {
					return mockPath
				}
			}
			return null
		},
	}
}

export default defineConfig({
	plugins: [react(), tsconfigPaths(), mockExternalDeps()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'lib'),
			'@/main/components/editor': mockPath,
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		include: ['lib/**/*.test.{ts,tsx}'],
		css: false,
	},
})
