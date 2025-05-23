import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VideoInput } from './index'
import { refineDecorator } from '../../../../stories'

const meta: Meta<typeof VideoInput> & {
	argTypes: any
} = {
	title: 'MAIN/FormItem/VideoInput',
	component: VideoInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
VideoInput 可以選擇 Youtube, Vimeo, Bunny, Code 四種類型影片

取得的 value 為 \`{ type: string, id: string, meta: object }\`

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof VideoInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	render: () => {
		return (
			<div className="at-w-[20rem]">
				<VideoInput formItemProps={{ name: 'feature_video' }} />
			</div>
		)
	},
	decorators: [refineDecorator],
}
