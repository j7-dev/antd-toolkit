import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CheckIcon } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof CheckIcon> & {
	argTypes: any
} = {
	title: 'MAIN/Icons/CheckIcon',
	component: CheckIcon,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
Check Icon
        				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof CheckIcon>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
}
