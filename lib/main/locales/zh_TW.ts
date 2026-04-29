import type { TLocale } from './types'

export const zh_TW: TLocale = {
	ActionButton: {
		edit: '編輯',
		save: '儲存',
		cancel: '取消',
		delete: '刪除',
		confirmTitle: '確認刪除嗎?',
		confirmOk: '確認',
		confirmCancel: '取消',
	},
	PopconfirmDelete: {
		title: '確認刪除嗎?',
		ok: '確認',
		cancel: '取消',
		delete: '刪除',
	},
	CopyText: {
		success: '複製成功',
		fail: 'OOPS! 複製失敗',
		clipboardUnavailable: 'OOPS! 剪貼簿不可用',
	},
	Countdown: {
		error: 'OOPS! 出錯拉',
		invalidDate: 'date 請輸入 毫秒(13位) 數字',
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
	},
	DateTime: {
		error: 'OOPS! 出錯拉',
		invalidDate: 'date 請輸入 毫秒(13位) 數字',
	},
	SecondToStr: {
		empty: '-- 時 -- 分 -- 秒',
		hour: '時',
		minute: '分',
		second: '秒',
	},
	WatchStatusTag: {
		unlimited: '無期限',
		expired: '已過期',
		notExpired: '未過期',
		followSubscription: (id) => `跟隨訂閱 #${id}`,
		expiredAt: (date) => `已於 ${date} 過期`,
		availableUntil: (date) => `可觀看至 ${date}`,
	},
	Limit: {
		label: '觀看期限',
		unlimited: '無期限',
		fixedDays: '固定天數',
		specifiedTime: '指定時間',
		followSubscription: '跟隨訂閱',
		day: '日',
		month: '月',
		year: '年',
		specifiedTimeRequired: '請填寫指定時間',
	},
	FormDatePicker: {
		placeholder: '選擇日期',
	},
	FormRangePicker: {
		startPlaceholder: '開始日期',
		endPlaceholder: '結束日期',
	},
	SelectedRecord: {
		tooltipContent: (label, ids) => `包含 ${label} id: ${ids}`,
		selectedCount: (count, label) => `已選擇 ${count} 個 ${label}`,
		clearSelection: '清除選取',
		showSelected: (label) => `顯示已選 ${label}`,
	},
	ToggleContent: {
		collapseAll: '收合全部',
		expandAll: '展開全部',
	},
	SimpleDrawer: {
		closeConfirm: '確定要關閉嗎？沒有儲存的內容會遺失',
	},
	EnvProvider: {
		cookieExpired:
			'\n網站 Cookie 已經過期，請重新整理頁面後才能繼續使用\n\n按 【確認】 ，重新整理頁面\n\n或者按 【取消】 ，您可以手動複製尚未儲存的資料避免頁面刷新後遺失',
		requestFailed: '請求失敗:',
		noResponse: '沒有收到伺服器響應',
		requestConfigError: '請求配置錯誤:',
	},
	BindItems: {
		successMessage: (label) => `綁定${label}成功！`,
		errorMessage: (label) => `綁定${label}失敗！`,
		bindOther: (label) => `綁定其他${label}`,
	},
	GrantUsers: {
		successMessage: '新增用戶成功！',
		errorMessage: '新增用戶失敗！',
		unlimitedHint: '留空為無期限',
	},
	RevokeUsers: {
		confirmMessage: (label) => `確認移除這些用戶的${label}權限嗎?`,
		revokeButton: (label) => `移除${label}`,
		successMessage: '撤銷用戶成功！',
		errorMessage: '撤銷用戶失敗！',
	},
	UnbindItems: {
		confirmMessage: (label) => `確認解除這些商品的${label}綁定嗎?`,
		unbind: '解除綁定',
		successMessage: '解除綁定成功！',
		errorMessage: '解除綁定失敗！',
	},
	UpdateBoundItems: {
		successMessage: '批量修改觀看期限成功！',
		errorMessage: '批量修改觀看期限失敗！',
		updateLimit: '修改觀看期限',
	},
	UpdateGrantedUsers: {
		successMessage: '批量修改觀看期限成功！',
		errorMessage: '批量修改觀看期限失敗！',
		updateLimit: '修改觀看期限',
		unlimitedHint: '留空為無期限',
	},
	SelectedItem: {
		tooltipContent: (label, ids) => `包含${label} id: ${ids}`,
		selectedCount: (count, label) => `已選擇 ${count} 個${label}`,
		clearSelection: '清除選取',
		showSelected: (label) => `顯示已選${label}`,
	},
	RefineCommon: {
		confirmTitle: '確認刪除嗎?',
		confirmOk: '確認',
		confirmCancel: '取消',
		defaultSuccess: '成功',
		defaultError: '失敗',
	},
	BackToWpAdmin: {
		label: '回網站後台',
	},
	CopyResources: {
		tooltip: '複製',
	},
	WpMediaLibrary: {
		searchPlaceholder: '搜尋關鍵字，按 ENTER 也能搜',
		selectedFiles: (count) => `已經選取 ${count} 個檔案`,
		clearSelection: '清空選取',
		deleteConfirm: '確定要刪除這些檔案嗎？',
		deleteOk: '刪除',
		deleteCancel: '取消',
		batchDelete: (count) =>
			`批量刪除${count ? ` (${count})` : ''}`,
	},
	MediaLibraryNotification: {
		uploading: '檔案上傳中',
	},
	OnChangeUpload: {
		reset: '重置',
		uploadHint: '點擊或拖曳文件到這裡上傳',
		imageOnly: '僅支持 image/* 類型 文件',
	},
	Upload: {
		uploadHint: '點擊或拖曳文件到這裡上傳',
		supportType: (accept) => `僅支持 ${accept} 類型檔案`,
	},
	UserFilter: {
		keywordSearch: '關鍵字搜尋',
		keywordPlaceholder: '可以輸入用戶ID, 帳號, Email, 顯示名稱',
		includeUsers: '包含指定用戶',
		userIdPlaceholder: '輸入用戶 ID',
		filter: '篩選',
		reset: '重置',
	},
	ProductType: {
		featured: '精選商品',
		notFeatured: '非精選商品',
		virtual: '虛擬商品',
		notVirtual: '非虛擬商品',
		downloadable: '可下載',
		notDownloadable: '不可下載',
	},
}
