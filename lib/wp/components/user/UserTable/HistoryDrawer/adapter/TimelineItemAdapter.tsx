import {
	PlusCircleOutlined,
	UserAddOutlined,
	PlayCircleOutlined,
	CheckCircleOutlined,
	CheckCircleFilled,
	UserDeleteOutlined,
	UserSwitchOutlined,
	RocketOutlined,
	CloseCircleOutlined,
	CalendarOutlined,
} from '@ant-design/icons'
import { TimelineLogType, TimelineItemConfig } from '../types'
import { TimelineItemProps } from 'antd'
import { TriggerAt } from '@/components/emails/SendCondition/enum'

const timelineItemMapper: Record<TimelineLogType, TimelineItemConfig> = {
	[TriggerAt.COURSE_GRANTED]: {
		color: '#91caff',
		icon: <UserAddOutlined />,
	},
	[TriggerAt.COURSE_FINISH]: {
		color: '#0958d9',
		icon: <CheckCircleFilled />,
	},
	[TriggerAt.COURSE_LAUNCH]: {
		color: '#f759ab',
		icon: <RocketOutlined />,
	},
	[TriggerAt.CHAPTER_ENTER]: {
		color: '#4096ff',
		icon: <PlayCircleOutlined />,
	},
	[TriggerAt.CHAPTER_FINISH]: {
		color: '#0958d9',
		icon: <CheckCircleOutlined />,
	},
	[TriggerAt.ORDER_CREATED]: {
		color: '#91caff',
		icon: <PlusCircleOutlined />,
	},
	[TriggerAt.CHAPTER_UNFINISHED]: {
		color: '#ffa940',
		icon: <CloseCircleOutlined />,
	},
	[TriggerAt.COURSE_REMOVED]: {
		color: '#ff4d4f',
		icon: <UserDeleteOutlined />,
	},
	[TriggerAt.UPDATE_STUDENT]: {
		color: '#9254de',
		icon: <UserSwitchOutlined />,
	},
}

export class TimelineItemAdapter {
	private static readonly mapper: Record<TimelineLogType, TimelineItemConfig> =
		timelineItemMapper

	constructor(
		public readonly log_type: TimelineLogType,
		public readonly title: string,
		public readonly created_at: string,
	) {
		this.validateLogType(log_type)
	}

	public get itemProps(): TimelineItemProps {
		return {
			color: this.color,
			dot: this.icon,
			children: (
				<>
					<p className="mt-0 mb-1">{this.title}</p>
					<p className="my-0 text-xs text-gray-500">{this.created_at}</p>
				</>
			),
		}
	}

	get color(): string {
		return TimelineItemAdapter.mapper?.[this.log_type]?.color
	}

	get icon(): React.ReactNode {
		return TimelineItemAdapter.mapper?.[this.log_type]?.icon
	}

	private validateLogType(log_type: TimelineLogType): void {
		if (!TimelineItemAdapter.mapper?.[log_type]) {
			console.error(`Invalid timeline log_type: ${log_type}`)
		}
	}
}
