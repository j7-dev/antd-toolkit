import { Button, Alert } from 'antd'

import { DoubleRightOutlined } from '@ant-design/icons'
import { useBunny } from '@/refine'
import { useLink } from '@refinedev/core'
import { useLocale } from '@/main/components/LocaleProvider'

const NoLibraryId = ({
	type = 'alert',
}: {
	type?: 'default' | 'video' | 'alert'
}) => {
	const { bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname } =
		useBunny()
	const Link = useLink()
	const t = useLocale('VideoInput')
	if ('alert' === type) {
		return (
			<Alert
				message={t.missingParams}
				description={
					<>
						{!bunny_library_id && (
							<div className="at-text-sm at-font-normal">
								{t.missingLibraryId}
							</div>
						)}
						{!bunny_stream_api_key && (
							<div className="at-text-sm at-font-normal">
								{t.missingApiKey}
							</div>
						)}
						{!bunny_cdn_hostname && (
							<div className="at-text-sm at-font-normal">
								{t.missingCdnHostname}
							</div>
						)}

						<Link to="/media-library?tab=bunny-settings">
							<Button
								className="at-pl-0 at-ml-0"
								type="link"
								icon={<DoubleRightOutlined />}
								iconPosition="end"
							>
								{t.goToSettings}
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
				'at-flex at-flex-col at-items-start at-justify-center at-size-full',
		})[value] ??
		'at-flex at-flex-col at-items-start at-justify-center at-size-full')(type)

	return (
		<div className={className}>
			{!bunny_library_id && (
				<div className="at-text-base at-font-normal">缺少 Bunny Library Id</div>
			)}
			{!bunny_stream_api_key && (
				<div className="at-text-base at-font-normal">
					{t.missingApiKey}
				</div>
			)}
			{!bunny_cdn_hostname && (
				<div className="at-text-base at-font-normal">
					{t.missingCdnHostname}
				</div>
			)}
			<Link to="/media-library?tab=bunny-settings">
				<Button
					className="at-pl-0 at-ml-0"
					type="link"
					icon={<DoubleRightOutlined />}
					iconPosition="end"
				>
					{t.goToSettings}
				</Button>
			</Link>
		</div>
	)
}

export default NoLibraryId
