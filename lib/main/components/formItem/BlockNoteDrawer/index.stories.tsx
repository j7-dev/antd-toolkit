import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BlockNoteDrawer } from './index'
import { refineDecorator, ENV } from '../../../../stories'

const meta: Meta<typeof BlockNoteDrawer> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/BlockNoteDrawer',
	component: BlockNoteDrawer,
	parameters: {
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
type Story = StoryObj<typeof BlockNoteDrawer>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {
		useBlockNoteParams: {
			apiConfig: {
				apiEndpoint: ENV.UPLOAD_API,
				headers: new Headers({
					Authorization: 'Basic ' + btoa(ENV.USERNAME + ':' + ENV.PASSWORD),
				}),
			},
		},
	},
	decorators: [refineDecorator],
}
