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
	VideoInput: {
		noVideo: string
		wpMediaLibrary: string
		youtubeEmbed: string
		vimeoEmbed: string
		bunnyLibrary: string
		customCode: string
		openBunnyLibrary: string
		codePlaceholder: string
		iframePlaceholder: (platform: string) => string
		iframeError: (platform: string) => string
		missingParams: string
		missingLibraryId: string
		missingApiKey: string
		missingCdnHostname: string
		goToSettings: string
	}
	VideoLength: {
		hour: string
		minute: string
		second: string
	}
	EditorDrawer: {
		startEditing: string
		editContent: string
		exitFullscreen: string
		fullscreen: string
		clearAll: string
		saveContent: string
		notes: string
		shortcodeSupport: string
		moreFeatures: string
		powerEditor: string
		elementorEditor: string
		switchEditorWarning: string
		fullIntro: string
		elementorRequired: string
	}
	AlertBlock: {
		info: string
		success: string
		warning: string
		error: string
		description: string
	}
	BunnyVideoBlock: {
		title: string
		description: string
		width: string
		aspectRatioHint: string
		ratio: string
		replace: string
		delete: string
	}
	CustomHTMLBlock: {
		title: string
		description: string
	}
	MediaLibraryBlock: {
		title: string
		description: string
		width: string
		setLink: string
		setAlt: string
		setText: string
		replace: string
		delete: string
		linkPlaceholder: string
		newWindow: string
		altPlaceholder: string
		titlePlaceholder: string
		captionPlaceholder: string
	}
	BunnyModule: {
		mediaLibrary: string
		settings: string
		uploadVideo: string
		save: string
		descriptionLabel: string
		noAccount: string
		noAccountHint: string
		applyHere: string
		step1: string
		step2: string
		searchPlaceholder: string
		selectedVideos: (count: number) => string
		clearSelection: string
		deleteConfirm: string
		deleteOk: string
		deleteCancel: string
		batchDelete: (count: number) => string
		deleteSuccess: string
		deleteFailed: (title: string, id: string) => string
		fetchError: string
		fetchErrorDesc: string
		uploadWarning: string
		noVideos: string
		showMore: string
		copyIframe: string
		goToBunny: string
		deleteBunnyVideo: string
		confirmDeleteBunny: string
		confirmOk: string
		confirmSelect: (count: number) => string
		encoding: string
		uploading: string
		saveSuccess: string
	}
	ProductFilter: {
		fuzzySearch: string
		multiSelect: string
		simpleProduct: (label: string) => string
		variableProduct: (label: string) => string
		moreFilters: string
		filterTitle: string
		hideFilters: string
		showFilters: string
		filter: string
		reset: string
		selectAuthor: string
		productIdPlaceholder: string
	}
	WpMediaLibraryItem: {
		fileTypeNotAllowed: string
		maxFilesExceeded: (limit: number) => string
	}
	WpMediaLibraryItemInfo: {
		copyDownloadLink: string
		openInNewTab: string
		classicView: string
		deleteFile: string
	}
	WpMediaLibraryUploadFile: {
		uploadHint: string
		supportType: (accept: string) => string
	}
	WpMediaLibraryModal: {
		defaultTitle: string
		confirmSelect: (count: number) => string
	}
	ProductStock: {
		inStock: string
		stockSufficient: string
		lowStock: string
		outOfStock: string
		onBackorder: string
		unknownStatus: string
	}
	ProductBoundItems: {
		unknownName: string
		unlimited: string
		followSubscription: string
		afterOrderComplete: string
		until: string
		day: string
		month: string
		year: string
	}
	ProductTotalSales: {
		top20: string
		top40: string
		top60: string
		top80: string
		top100: string
	}
	FileUpload: {
		uploadHint: string
		imageOnly: string
		reset: string
	}
	UserAvatarUpload: {
		reset: string
		recommendedSize: string
	}
	AntdUtils: {
		search: string
		paginationTotal: (range0: number, range1: number, total: number, label: string) => string
		defaultLabel: string
	}
	SimpleDrawerModal: {
		defaultTitle: string
	}
}
