import { Badge } from 'antd'
import { USER_ROLES } from '@/wp'

export const UserRole = ({ role }: { role: string }) => {
	const roleData = USER_ROLES.find((r) => r.value === role)

	return (
		<Badge
			color={roleData?.color || 'gray'}
			text={
				<span
					className="text-xs"
					style={{
						color: roleData?.color || 'gray',
					}}
				>
					{roleData?.label || role}
				</span>
			}
		/>
	)
}
