import { memo } from 'react'
import { Image, ImageProps } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { defaultImage, renderHTML, NameId } from '@/main'

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
		<div className="at-flex at-items-center">
			{!hideImage && (
				<div className="at-mr-4">
					<Image
						className="at-rounded-full at-object-cover"
						preview={{
							mask: <EyeOutlined />,
							maskClassName: 'at-rounded-full',
						}}
						src={user_avatar_url || defaultImage}
						fallback={defaultImage}
						width={40}
						height={40}
						{...imageProps}
					/>
				</div>
			)}
			<div
				className={`at-flex-1 at-min-w-0 ${onClick ? 'at-cursor-pointer hover:at-opacity-75' : ''}`}
				onClick={onClick ? () => onClick(record) : undefined}
			>
				{renderTitle ? (
					renderTitle
				) : (
					<NameId className="at-text-base" name={display_name} id={id} />
				)}

				{renderBelowTitle ? (
					renderBelowTitle
				) : (
					<p className="at-my-0 at-text-xs at-text-gray-400">{user_email}</p>
				)}
			</div>
		</div>
	)
}

export const UserName = memo(UserNameComponent) as typeof UserNameComponent
