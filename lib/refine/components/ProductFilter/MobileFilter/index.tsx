import React, { useState, FC, memo } from 'react'
import { Drawer } from 'antd'
import { SlidersOutlined, CloseOutlined } from '@ant-design/icons'

const MobileFilter: FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [open, setOpen] = useState(false)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<>
			<span
				className="at-text-sm at-mr-4 at-cursor-pointer"
				onClick={showDrawer}
			>
				<SlidersOutlined className="at-mr-2" /> 更多篩選條件
			</span>
			<Drawer
				title="商品篩選條件"
				onClose={onClose}
				open={open}
				zIndex={999999}
				width="90%"
				placement="left"
				extra={<CloseOutlined onClick={onClose} />}
				forceRender={true}
				closeIcon={null}
			>
				{children}
			</Drawer>
		</>
	)
}

export default memo(MobileFilter)
