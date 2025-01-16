import { FC } from 'react'
import { Drawer, DrawerProps, Form, Input } from 'antd'
import { UserAvatarUpload } from '@/components/user'

const { Item } = Form

export const UserDrawer: FC<DrawerProps> = (drawerProps) => {
	const form = Form.useFormInstance()
	const watchId = Form.useWatch(['id'], form)
	const isUpdate = !!watchId

	return (
		<>
			<Drawer {...drawerProps}>
				{/* 這邊這個 form 只是為了調整 style */}

				<Form layout="vertical" form={form}>
					<Item name={['id']} hidden>
						<Input />
					</Item>
					<UserAvatarUpload />

					<Item
						name={['user_login']}
						label="帳號名稱(username)"
						rules={[
							{
								required: true,
								message: '帳號名稱為必填欄位',
							},
						]}
					>
						<Input disabled={isUpdate} />
					</Item>
					<Item
						name={['user_pass']}
						label="密碼"
						initialValue={undefined}
						rules={[
							{
								required: !isUpdate,
								message: '密碼為必填欄位',
							},
						]}
					>
						<Input.Password />
					</Item>
					<Item
						name={['user_email']}
						label="Email"
						rules={[
							{
								required: true,
								message: 'Email為必填欄位',
							},
						]}
					>
						<Input disabled={isUpdate} />
					</Item>
					<Item name={['display_name']} label="顯示名稱">
						<Input />
					</Item>
					<Item name={['description']} label="講師介紹">
						<Input.TextArea rows={8} allowClear />
					</Item>
				</Form>
			</Drawer>
		</>
	)
}
