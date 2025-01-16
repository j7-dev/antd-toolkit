import { memo } from 'react'
import { Button, Alert } from 'antd'
import { FileUpload } from '@/components/general'
import { useApiUrl } from '@refinedev/core'
import { siteUrl } from '@/utils'
import { SiMicrosoftexcel } from 'react-icons/si'

const index = () => {
	const apiUrl = useApiUrl()
	return (
		<div className="flex flex-col md:flex-row gap-8 py-8">
			<div className="w-full">
				<Alert
					message="批次上傳注意事項"
					description={
						<ol className="pl-4">
							<li>
								<Button
									type="link"
									className="pl-0 ml-0"
									icon={<SiMicrosoftexcel />}
									iconPosition="end"
									href={`${siteUrl}/wp-content/plugins/power-course/sample.csv`}
								>
									下載範例 csv 檔案
								</Button>
							</li>
							<li>
								實測可上傳 5000
								筆資料以上等大型資料，會分批處理，不會造成伺服器阻塞
							</li>
							<li>
								處理完成後會寄信通知管理員，或者到{' '}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`${siteUrl}/wp-admin/admin.php?page=wc-status&tab=action-scheduler&s=pc_batch_add_students_task`}
								>
									Action Scheduler
								</a>{' '}
								查看
							</li>
							<li>
								選擇檔案後會立即排程上傳，過程中會添加用戶成為課程學員(如果找不到會創建用戶並發送密碼重設信件)，上傳後無法
								rollback，建議上傳前備份資料庫
							</li>
						</ol>
					}
					type="info"
					showIcon
				/>

				<FileUpload
					uploadProps={{
						className: 'mt-4 tw-block w-full [&_.ant-upload]:w-full',
						action: `${apiUrl}/users/upload-students`,
					}}
					buttonProps={{
						danger: true,
						type: 'primary',
						className: '!w-full',
						children: '上傳 CSV 檔案 (請先備份資料庫)',
					}}
				/>
			</div>
		</div>
	)
}

export default memo(index)
