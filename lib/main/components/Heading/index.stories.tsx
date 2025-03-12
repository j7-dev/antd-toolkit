import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof Heading> & {
	argTypes: any
} = {
	title: 'MAIN/常用/Heading',
	component: Heading,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `


				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
		size: {
			control: {
				type: 'radio',
				options: ['sm', 'md'],
			},
			defaultValue: 'md',
		},
		titleProps: {
			control: {
				type: 'object',
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof Heading>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般標題',
	args: {
		children: '這是一個一般尺寸的標題',
	},
	decorators: [
		(Story) => (
			<div className="at-w-[1000px]">
				<Story />
			</div>
		),
	],
}

export const NoIcon: Story = {
	name: '不顯示 icon',
	args: {
		children: '這是一個一般尺寸的標題',
		hideIcon: true,
	},
	decorators: [
		(Story) => (
			<div className="at-w-[1000px]">
				<Story />
			</div>
		),
	],
}

export const Small: Story = {
	name: '小標題',
	args: {
		children: '這是一個小尺寸的標題',
		size: 'sm',
	},
	decorators: [
		(Story) => (
			<div className="at-w-[20rem]">
				<Story />
			</div>
		),
	],
}

export const NoIconSmall: Story = {
	name: '不顯示 icon 的小標題',
	args: {
		children: '這是一個小尺寸的標題',
		size: 'sm',
		hideIcon: true,
	},
	decorators: [
		(Story) => (
			<div className="at-w-[20rem]">
				<Story />
			</div>
		),
	],
}
