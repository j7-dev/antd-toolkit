import type { Meta, StoryObj } from '@storybook/react'
import { refineDecorator } from '../../../../stories'
import { OnChangeUpload } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof OnChangeUpload> & {
	argTypes: any
} = {
	title: 'WordPress/組件/OnChangeUpload',
	component: OnChangeUpload,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
這種 UPLOAD 會在 onChange 時，將圖片上傳到媒體庫，並回傳 attachmentId, url 等資訊

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		// currency: {
		//   control: {
		//     type: 'text',
		//   },
		// },
		// symbol: {
		//   control: {
		//     type: 'boolean',
		//     defaultValue: false,
		//   },
		// },
	},
}

export default meta
type Story = StoryObj<typeof OnChangeUpload>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	decorators: [refineDecorator],
}
