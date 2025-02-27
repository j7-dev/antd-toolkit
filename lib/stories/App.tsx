import { Refine } from '@refinedev/core'
import { useEnv } from '@/main'
import { useBunny, dataProvider, notificationProvider } from '@/refine'
import { Form } from 'antd'

const { Item } = Form

// Refine 用 decorators
export const App = ({ story }: { story: any }) => {
	const { API_URL, AXIOS_INSTANCE } = useEnv()
	const { bunny_data_provider_result } = useBunny()

	return (
		<Refine
			dataProvider={{
				default: dataProvider(API_URL, AXIOS_INSTANCE),
				'bunny-stream': bunny_data_provider_result,
			}}
			notificationProvider={notificationProvider}
		>
			<div className="at-w-[900px]">
				<Form layout="vertical">
					{story()}
					<Item name={['id']} initialValue={1} />
				</Form>
			</div>
		</Refine>
	)
}
