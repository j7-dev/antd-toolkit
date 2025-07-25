import { FC, memo } from 'react'
import { cn } from '@/main/utils'
import { useEnv } from '@/main'

type TBackToWpAdminProps = {
	iconClassName?: string
	collapsed: boolean
	href?: string
}

const BackToWpAdminComponent: FC<TBackToWpAdminProps> = ({
	iconClassName = '',
	collapsed = false,
	href = '',
}) => {
	const { SITE_URL = '' } = useEnv()
	return (
		<a
			href={href ? href : `${SITE_URL}/wp-admin/`}
			className="hover:at-opacity-75 at-transition at-duration-300"
		>
			<div className="at-flex at-gap-4 at-items-center">
				<>
					<svg
						className={cn('at-size-6', iconClassName)}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="1"
							d="M16.19 2H7.82C4.17 2 2 4.17 2 7.81V16.18C2 19.82 4.17 21.99 7.81 21.99H16.18C19.82 21.99 21.99 19.82 21.99 16.18V7.81C22 4.17 19.83 2 16.19 2Z"
							fill="#eee"
						/>
						<path
							d="M13.9195 8.48006H8.76945L9.09945 8.15006C9.38945 7.86006 9.38945 7.38006 9.09945 7.09006C8.80945 6.80006 8.32945 6.80006 8.03945 7.09006L6.46945 8.66006C6.17945 8.95006 6.17945 9.43006 6.46945 9.72006L8.03945 11.2901C8.18945 11.4401 8.37945 11.5101 8.56945 11.5101C8.75945 11.5101 8.94945 11.4401 9.09945 11.2901C9.38945 11.0001 9.38945 10.5201 9.09945 10.2301L8.83945 9.97006H13.9195C15.1995 9.97006 16.2495 11.0101 16.2495 12.3001C16.2495 13.5901 15.2094 14.6301 13.9195 14.6301H8.99945C8.58945 14.6301 8.24945 14.9701 8.24945 15.3801C8.24945 15.7901 8.58945 16.1301 8.99945 16.1301H13.9195C16.0295 16.1301 17.7495 14.4101 17.7495 12.3001C17.7495 10.1901 16.0295 8.48006 13.9195 8.48006Z"
							fill="#21759B"
						/>
					</svg>
				</>
				{!collapsed && (
					<span className="at-text-gray-600 at-font-light">回網站後台</span>
				)}
			</div>
		</a>
	)
}

export const BackToWpAdmin = memo(BackToWpAdminComponent)
