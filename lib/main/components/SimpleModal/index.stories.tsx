import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'antd'
import { SimpleModal, useSimpleModal } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof SimpleModal> & {
	argTypes: any
} = {
	title: 'MAIN/常用/SimpleModal',
	component: SimpleModal,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout

		layout: 'centered',
		docs: {
			description: {
				component: `
因為 antd 的 Modal 渲染大型組件時，效率很差，計算樣式時會花超多時間

此時可以使用此 SimpleModal ，渲染效率較高

				`, // 可以寫 markdown
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {},
}

export default meta
type Story = StoryObj<typeof SimpleModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
	name: '一般用法',
	args: {},
	render: () => {
		const { modalProps, show } = useSimpleModal()

		return (
			<>
				<Button type="primary" onClick={show}>
					顯示
				</Button>
				<SimpleModal {...modalProps}>
					<div className="at-flex at-flex-wrap at-gap-2">
						{Array.from({ length: 10 }).map((_, index) => (
							<div
								key={index}
								className="at-size-[20rem] at-bg-red-200 at-rounded-lg at-flex at-items-center at-justify-center"
							>
								<h1>Hello</h1>
							</div>
						))}
					</div>
				</SimpleModal>
			</>
		)
	},
}
