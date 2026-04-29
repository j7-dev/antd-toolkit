import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ExtIcon } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ExtIcon> & {
	argTypes: any
} = {
	title: 'MAIN/Icons/ExtIcon',
	component: ExtIcon,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
依照不同副檔名顯示 Icon
        				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof ExtIcon>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {
		ext: 'txt',
	},
}
