export const keyLabelMapper = (key: string | number | symbol): string => {
	switch (key) {
		case 'avl_course_ids':
			return '已開通課程'
		default:
			return key as string
	}
}
