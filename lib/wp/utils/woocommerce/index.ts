export * from './product'
export * from './order'



export function stringToBool(value: string | boolean | number) {
	return ['yes', '1', 1, 'true', 'on'].includes(value as string) || value === true
}

export function boolToString(value: boolean | string) {
	return stringToBool(value) ? 'yes' : 'no'
}