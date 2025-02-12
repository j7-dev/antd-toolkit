import { Button, Alert } from 'antd'

import { DoubleRightOutlined } from '@ant-design/icons'
import { useBunny } from '@/refine'
import { useLink } from '@refinedev/core'

const NoLibraryId = ({
	type = 'alert',
}: {
	type?: 'default' | 'video' | 'alert'
}) => {
	const { bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname } =
		useBunny()
	const Link = useLink()
	if ('alert' === type) {
		return (
			<Alert
				message="缺少必要參數"
				description={
					<>
						{!bunny_library_id && (
							<div className="at-text-sm at-font-normal">
								缺少 Bunny Library Id
							</div>
						)}
						{!bunny_stream_api_key && (
							<div className="at-text-sm at-font-normal">
								缺少 Bunny Stream Api Key
							</div>
						)}
						{!bunny_cdn_hostname && (
							<div className="at-text-sm at-font-normal">
								缺少 Bunny Cdn Hostname
							</div>
						)}

						<Link to="/media-library?tab=bunny-settings">
							<Button
								className="at-pl-0 at-ml-0"
								type="link"
								icon={<DoubleRightOutlined />}
								iconPosition="end"
							>
								前往設定
							</Button>
						</Link>
					</>
				}
				type="warning"
				showIcon
			/>
		)
	}

	const className = ((value: string) =>
		({
			video:
				'at-aspect-video at-shadow at-rounded-lg at-border at-border-dashed at-border-gray-300 at-flex at-flex-col at-items-center at-justify-center',
			default:
				'at-flex at-flex-col at-items-start at-justify-center at-w-full at-h-full',
		})[value] ??
		'at-flex at-flex-col at-items-start at-justify-center at-w-full at-h-full')(
		type,
	)

	return (
		<div className={className}>
			{!bunny_library_id && (
				<div className="at-text-base at-font-normal">缺少 Bunny Library Id</div>
			)}
			{!bunny_stream_api_key && (
				<div className="at-text-base at-font-normal">
					缺少 Bunny Stream Api Key
				</div>
			)}
			{!bunny_cdn_hostname && (
				<div className="at-text-base at-font-normal">
					缺少 Bunny Cdn Hostname
				</div>
			)}
			<Link to="/media-library?tab=bunny-settings">
				<Button
					className="at-pl-0 at-ml-0"
					type="link"
					icon={<DoubleRightOutlined />}
					iconPosition="end"
				>
					前往設定
				</Button>
			</Link>
		</div>
	)
}

export default NoLibraryId
