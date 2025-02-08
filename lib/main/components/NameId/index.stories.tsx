import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NameId } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof NameId> & {
	argTypes: any
} = {
	title: 'MAIN/常用/NameId',
	component: NameId,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
顯示單行名稱與 ID

寬度自適應內容 100%

如果名稱太長也不會擠壓到 id

TODO: 如果縮闔自動開啟 Tooltip



				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		currency: {
			control: {
				type: 'text',
			},
		},
		symbol: {
			control: {
				type: 'boolean',
				defaultValue: false,
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof NameId>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法，沒有 tooltip',
	args: {
		name: '這是能蟲，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體內經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。',
		id: '123456',
		className: 'at-w-[200px]',
	},
}

export const Tooltip: Story = {
	name: '有 tooltip',
	args: {
		name: '這是能蟲，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體內經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。',
		id: '123456',
		className: 'at-w-[200px]',
		tooltipProps: {},
	},
}

export const renderHtmlString: Story = {
	name: '允許 HTML',
	args: {
		name: '這是<b><i><u>能蟲</u></i></b>，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體內經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。',
		id: '123456',
		className: 'at-w-[200px]',
	},
}

export const Larger: Story = {
	name: '較大字體，不同顏色',
	args: {
		name: '這是能蟲，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體內經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。',
		id: '123456',
		className: 'at-w-[400px] at-text-4xl at-text-primary',
	},
}

export const Smaller: Story = {
	name: '較小字體，不同粗細',
	args: {
		name: '這是能蟲，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體內經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。',
		id: '123456',
		className: 'at-w-[100px] at-text-sm at-font-black',
	},
}
