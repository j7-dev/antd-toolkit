import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SecondToStr } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof SecondToStr> & {
	argTypes: any
} = {
	title: '常用/SecondToStr',
	component: SecondToStr,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
輸入秒數，轉換成時、分、秒

TODO

提供 format 參數，自動轉換並自動格式化

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof SecondToStr>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {
		second: 10000,
	},
}
