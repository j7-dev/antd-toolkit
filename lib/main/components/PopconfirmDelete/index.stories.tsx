import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PopconfirmDelete } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof PopconfirmDelete> & {
	argTypes: any
} = {
	title: 'MAIN/常用/PopconfirmDelete',
	component: PopconfirmDelete,
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
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof PopconfirmDelete>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般',
	args: {},
}
