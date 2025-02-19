import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import alias from '@rollup/plugin-alias'
import dts from 'vite-plugin-dts'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

const isBuildForStoryBook = process.env.BUILD_ENV === 'storybook'
console.log("⭐ isBuildForStoryBook:", isBuildForStoryBook)

const defaultPlugins = [alias(), react(), tsconfigPaths()]
const plugins = isBuildForStoryBook
  ? defaultPlugins
  : [...defaultPlugins, dts({ include: ['lib'] })]

const config: UserConfig = {
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  build: {
		cssCodeSplit: false,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
			fileName: 'style',
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
				'@uidotdev/usehooks',
        '@refinedev/antd',
        '@refinedev/core',
        'antd',
        'antd-img-crop',
        'axios',
        'canvas-confetti',
        'currency-symbol-map',
        'jotai',
        'lodash-es',
        'nanoid',
        'query-string',
        'react-countdown',
        'react-highlight-words',
				'react-icons',
				'storybook',


				// ---
        '@storybook/builder-manager@7.4.6',
        '@storybook/cli@7.4.6',
        '@storybook/codemod@7.4.6',
        '@storybook/core-server@7.4.6',
        '@storybook/docs-mdx@0.1.0',
        '@storybook/preview-api@7.4.6',
      ],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', { ignore: ['lib/**/*.stories.{ts,tsx}'] })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo

            relative('lib', file.slice(0, file.length - extname(file).length)),

            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts

            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
}

if (isBuildForStoryBook) {
  delete config.build
}

// https://vitejs.dev/config/

export default defineConfig(config)
