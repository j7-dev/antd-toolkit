import { useEffect } from 'react'
import { useCreate } from '@refinedev/core'
import { notificationProps } from '@/refine'

const TestComponent = () => {
	const { mutate } = useCreate<any>({
		resource: 'posts',
		...notificationProps,
	})

	useEffect(() => {
		mutate(
			{
				values: {
					name: '新知識庫',
					post_type: 'pd_doc',
				},
			},
			{},
		)
	}, [])
	return (
		<>
			<h2>測試用</h2>
		</>
	)
}

export default TestComponent
