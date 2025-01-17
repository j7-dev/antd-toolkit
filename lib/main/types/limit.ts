
/**
 * 用來描述時間限制的型別
 */

export type TLimitType = 'unlimited' | 'fixed' | 'assigned' | 'follow_subscription'
export type TLimitUnit = 'second' | 'day' | 'month' | 'year' | ''

export type TLimit = {
	limit_type: TLimitType
	limit_value: number | ''
	limit_unit: TLimitUnit
}