import { DrawerProps } from 'antd'
import { TTriggerAt, TriggerAt } from '@/components/emails/SendCondition/enum'

export type THistoryDrawerProps = {
	user_id?: string
	user_name?: string
	course_id?: string
	course_name?: string
	drawerProps?: DrawerProps
}

export type TStudentLog = {
	id: string | number
	user_id: string | number
	course_id: string | number
	title: string
	content: string
	log_type: TimelineLogType
	user_ip: string
	created_at: string
}

export type TimelineLogType = Exclude<TTriggerAt, TriggerAt.FIELD_NAME>

export interface TimelineItemConfig {
	color: string
	icon: React.ReactNode
}
