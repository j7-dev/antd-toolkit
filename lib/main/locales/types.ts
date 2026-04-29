export type TLocale = {
	ActionButton: {
		edit: string
		save: string
		cancel: string
		delete: string
		confirmTitle: string
		confirmOk: string
		confirmCancel: string
	}
	PopconfirmDelete: {
		title: string
		ok: string
		cancel: string
		delete: string
	}
	CopyText: {
		success: string
		fail: string
		clipboardUnavailable: string
	}
	Countdown: {
		error: string
		invalidDate: string
		days: string
		hours: string
		minutes: string
		seconds: string
	}
	DateTime: {
		error: string
		invalidDate: string
	}
	SecondToStr: {
		empty: string
		hour: string
		minute: string
		second: string
	}
	WatchStatusTag: {
		unlimited: string
		expired: string
		notExpired: string
		followSubscription: (id: number | null) => string
		expiredAt: (date: string) => string
		availableUntil: (date: string) => string
	}
	Limit: {
		label: string
		unlimited: string
		fixedDays: string
		specifiedTime: string
		followSubscription: string
		day: string
		month: string
		year: string
		specifiedTimeRequired: string
	}
	FormDatePicker: {
		placeholder: string
	}
	FormRangePicker: {
		startPlaceholder: string
		endPlaceholder: string
	}
	SelectedRecord: {
		tooltipContent: (label: string, ids: string) => string
		selectedCount: (count: number, label: string) => string
		clearSelection: string
		showSelected: (label: string) => string
	}
	ToggleContent: {
		collapseAll: string
		expandAll: string
	}
	SimpleDrawer: {
		closeConfirm: string
	}
	EnvProvider: {
		cookieExpired: string
		requestFailed: string
		noResponse: string
		requestConfigError: string
	}
	BindItems: {
		successMessage: (label: string) => string
		errorMessage: (label: string) => string
		bindOther: (label: string) => string
	}
	GrantUsers: {
		successMessage: string
		errorMessage: string
		unlimitedHint: string
	}
	RevokeUsers: {
		confirmMessage: (label: string) => string
		revokeButton: (label: string) => string
		successMessage: string
		errorMessage: string
	}
	UnbindItems: {
		confirmMessage: (label: string) => string
		unbind: string
		successMessage: string
		errorMessage: string
	}
	UpdateBoundItems: {
		successMessage: string
		errorMessage: string
		updateLimit: string
	}
	UpdateGrantedUsers: {
		successMessage: string
		errorMessage: string
		updateLimit: string
		unlimitedHint: string
	}
	SelectedItem: {
		tooltipContent: (label: string, ids: string) => string
		selectedCount: (count: number, label: string) => string
		clearSelection: string
		showSelected: (label: string) => string
	}
	RefineCommon: {
		confirmTitle: string
		confirmOk: string
		confirmCancel: string
		defaultSuccess: string
		defaultError: string
	}
	BackToWpAdmin: {
		label: string
	}
	CopyResources: {
		tooltip: string
	}
	WpMediaLibrary: {
		searchPlaceholder: string
		selectedFiles: (count: number) => string
		clearSelection: string
		deleteConfirm: string
		deleteOk: string
		deleteCancel: string
		batchDelete: (count: number) => string
	}
	MediaLibraryNotification: {
		uploading: string
	}
	OnChangeUpload: {
		reset: string
		uploadHint: string
		imageOnly: string
	}
	Upload: {
		uploadHint: string
		supportType: (accept: string) => string
	}
	UserFilter: {
		keywordSearch: string
		keywordPlaceholder: string
		includeUsers: string
		userIdPlaceholder: string
		filter: string
		reset: string
	}
	ProductType: {
		featured: string
		notFeatured: string
		virtual: string
		notVirtual: string
		downloadable: string
		notDownloadable: string
	}
}
