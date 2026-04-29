import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import {
	Title,
	Subtitle,
	Description,
	Primary,
	Controls,
} from '@storybook/blocks'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../lib/main/assets/scss/index.scss'
import './preview.scss'
import { LocaleProvider } from '../lib/main/components/LocaleProvider'
import { zh_TW } from '../lib/main/locales/zh_TW'
import { en_US } from '../lib/main/locales/en_US'

const localeMap = { zh_TW, en_US } as const

const preview: Preview = {
	parameters: {
		// viewport: {
		// 	viewports: INITIAL_VIEWPORTS,
		// },
		actions: { argTypesRegex: '^on[A-Z].*' },

		docs: {
			toc: {
				title: '目錄',
				disable: false,
				headingSelector: 'h1, h2, h3, h4, h5, h6',
			},
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
				</>
			),
		},
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /date$/,
				boolean: /enabled$/,
				text: /className$/,
				number: /amount$/,
				object: /^[a-zA-Z]*[Pp]rops$/,
			},
		},
		status: {
			statuses: {
				dev: {
					color: '#c41d7f',
					background: '#fff0f6',
					description: '組件 / 文件還在開發中',
				},
			},
		},
	},
	globalTypes: {
		locale: {
			name: 'Locale',
			description: 'antd-toolkit i18n locale',
			defaultValue: 'zh_TW',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'zh_TW', title: '繁體中文' },
					{ value: 'en_US', title: 'English' },
				],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => {
			const localeKey = (context.globals.locale || 'zh_TW') as keyof typeof localeMap
			const locale = localeMap[localeKey] ?? zh_TW
			useEffect(() => {
				const bodyId = document.body.id
				if (!bodyId) {
					document.body.id = 'tw'
				}
			}, [])
			return (
				<LocaleProvider locale={locale}>
					<Story />
				</LocaleProvider>
			)
		},

		withThemeByDataAttribute({
			themes: {
				light: 'light',
				dark: 'dark',
			},
			defaultTheme: 'light',
			attributeName: 'data-mode',
		}),
	],
}

export default preview
