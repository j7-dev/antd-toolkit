import { memo } from 'react'
import { Image, ImageProps } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { defaultImage, renderHTML } from '@/utils'

type TBaseRecord = {
	display_name: string
	user_email: string
	id: string
	user_avatar_url: string
}

type TUserNameProps<T extends TBaseRecord> = {
	record: T
	onClick?: (_record: T | undefined) => void
	renderTitle?: React.ReactNode
	renderBelowTitle?: React.ReactNode
	hideImage?: boolean
	imageProps?: ImageProps
}

const UserNameComponent = <T extends TBaseRecord>({
	record,
	onClick,
	renderTitle,
	renderBelowTitle,
	hideImage = false,
	imageProps,
}: TUserNameProps<T>) => {
	const { display_name, user_email, id, user_avatar_url } = record

	return (
		<div className="flex items-center">
			{!hideImage && (
				<div className="mr-4">
					<Image
						className="rounded-full object-cover"
						preview={{
							mask: <EyeOutlined />,
							maskClassName: 'rounded-full',
						}}
						src={user_avatar_url || defaultImage}
						fallback={defaultImage}
						width={36}
						height={36}
						{...imageProps}
					/>
				</div>
			)}
			<div
				className={`flex-1 min-w-0 ${onClick ? 'cursor-pointer hover:opacity-75' : ''}`}
				onClick={onClick ? () => onClick(record) : undefined}
			>
				{renderTitle ? (
					renderTitle
				) : (
					<div className="flex mb-1 items-end">
						<p className="min-w-0 m-0 text-base [&_*]:truncate">
							{renderHTML(display_name)}
						</p>
						<p className="my-0 ml-2 text-gray-400 text-xs shrink-0">#{id}</p>
					</div>
				)}

				{renderBelowTitle ? (
					renderBelowTitle
				) : (
					<p className="my-0 text-xs text-gray-400">{user_email}</p>
				)}
			</div>
		</div>
	)
}

export const UserName = memo(UserNameComponent)
