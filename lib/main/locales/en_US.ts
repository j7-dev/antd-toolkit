import type { TLocale } from './types'

export const en_US: TLocale = {
	ActionButton: {
		edit: 'Edit',
		save: 'Save',
		cancel: 'Cancel',
		delete: 'Delete',
		confirmTitle: 'Confirm delete?',
		confirmOk: 'Confirm',
		confirmCancel: 'Cancel',
	},
	PopconfirmDelete: {
		title: 'Confirm delete?',
		ok: 'Confirm',
		cancel: 'Cancel',
		delete: 'Delete',
	},
	CopyText: {
		success: 'Copied successfully',
		fail: 'OOPS! Copy failed',
		clipboardUnavailable: 'OOPS! Clipboard unavailable',
	},
	Countdown: {
		error: 'OOPS! Error',
		invalidDate: 'Please enter a 13-digit millisecond timestamp',
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
	},
	DateTime: {
		error: 'OOPS! Error',
		invalidDate: 'Please enter a 13-digit millisecond timestamp',
	},
	SecondToStr: {
		empty: '-- h -- m -- s',
		hour: 'h',
		minute: 'm',
		second: 's',
	},
	WatchStatusTag: {
		unlimited: 'Unlimited',
		expired: 'Expired',
		notExpired: 'Active',
		followSubscription: (id) => `Follows subscription #${id}`,
		expiredAt: (date) => `Expired on ${date}`,
		availableUntil: (date) => `Available until ${date}`,
	},
	Limit: {
		label: 'Access Period',
		unlimited: 'Unlimited',
		fixedDays: 'Fixed Days',
		specifiedTime: 'Specified Time',
		followSubscription: 'Follow Subscription',
		day: 'Day',
		month: 'Month',
		year: 'Year',
		specifiedTimeRequired: 'Please select a time',
	},
	FormDatePicker: {
		placeholder: 'Select date',
	},
	FormRangePicker: {
		startPlaceholder: 'Start date',
		endPlaceholder: 'End date',
	},
	SelectedRecord: {
		tooltipContent: (label, ids) => `Contains ${label} id: ${ids}`,
		selectedCount: (count, label) => `${count} ${label} selected`,
		clearSelection: 'Clear selection',
		showSelected: (label) => `Show selected ${label}`,
	},
	ToggleContent: {
		collapseAll: 'Collapse all',
		expandAll: 'Expand all',
	},
	SimpleDrawer: {
		closeConfirm:
			'Are you sure you want to close? Unsaved changes will be lost.',
	},
	EnvProvider: {
		cookieExpired:
			'\nYour session has expired. Please refresh the page to continue.\n\nClick OK to refresh.\n\nOr click Cancel to manually copy any unsaved data before the page refreshes.',
		requestFailed: 'Request failed:',
		noResponse: 'No response from server',
		requestConfigError: 'Request config error:',
	},
	BindItems: {
		successMessage: (label) => `${label} bound successfully!`,
		errorMessage: (label) => `Failed to bind ${label}!`,
		bindOther: (label) => `Bind other ${label}`,
	},
	GrantUsers: {
		successMessage: 'Users added successfully!',
		errorMessage: 'Failed to add users!',
		unlimitedHint: 'Leave empty for unlimited',
	},
	RevokeUsers: {
		confirmMessage: (label) =>
			`Remove ${label} permissions for these users?`,
		revokeButton: (label) => `Remove ${label}`,
		successMessage: 'Users revoked successfully!',
		errorMessage: 'Failed to revoke users!',
	},
	UnbindItems: {
		confirmMessage: (label) =>
			`Unbind ${label} from these products?`,
		unbind: 'Unbind',
		successMessage: 'Unbound successfully!',
		errorMessage: 'Failed to unbind!',
	},
	UpdateBoundItems: {
		successMessage: 'Access period updated successfully!',
		errorMessage: 'Failed to update access period!',
		updateLimit: 'Update access period',
	},
	UpdateGrantedUsers: {
		successMessage: 'Access period updated successfully!',
		errorMessage: 'Failed to update access period!',
		updateLimit: 'Update access period',
		unlimitedHint: 'Leave empty for unlimited',
	},
	SelectedItem: {
		tooltipContent: (label, ids) =>
			`Contains ${label} id: ${ids}`,
		selectedCount: (count, label) => `${count} ${label} selected`,
		clearSelection: 'Clear selection',
		showSelected: (label) => `Show selected ${label}`,
	},
	RefineCommon: {
		confirmTitle: 'Confirm delete?',
		confirmOk: 'Confirm',
		confirmCancel: 'Cancel',
		defaultSuccess: 'Success',
		defaultError: 'Failed',
	},
	BackToWpAdmin: {
		label: 'Back to Admin',
	},
	CopyResources: {
		tooltip: 'Copy',
	},
	WpMediaLibrary: {
		searchPlaceholder: 'Search keywords, press ENTER to search',
		selectedFiles: (count) => `${count} files selected`,
		clearSelection: 'Clear selection',
		deleteConfirm: 'Are you sure you want to delete these files?',
		deleteOk: 'Delete',
		deleteCancel: 'Cancel',
		batchDelete: (count) =>
			`Batch delete${count ? ` (${count})` : ''}`,
	},
	MediaLibraryNotification: {
		uploading: 'Uploading files',
	},
	OnChangeUpload: {
		reset: 'Reset',
		uploadHint: 'Click or drag files here to upload',
		imageOnly: 'Only image/* type files are supported',
	},
	Upload: {
		uploadHint: 'Click or drag files here to upload',
		supportType: (accept) =>
			`Only ${accept} type files are supported`,
	},
	UserFilter: {
		keywordSearch: 'Keyword Search',
		keywordPlaceholder:
			'Enter User ID, Username, Email, or Display Name',
		includeUsers: 'Include Specific Users',
		userIdPlaceholder: 'Enter User ID',
		filter: 'Filter',
		reset: 'Reset',
	},
	ProductType: {
		featured: 'Featured',
		notFeatured: 'Not Featured',
		virtual: 'Virtual',
		notVirtual: 'Not Virtual',
		downloadable: 'Downloadable',
		notDownloadable: 'Not Downloadable',
	},
	VideoInput: {
		noVideo: 'No Video',
		wpMediaLibrary: 'WordPress Media Library',
		youtubeEmbed: 'YouTube Embed',
		vimeoEmbed: 'Vimeo Embed',
		bunnyLibrary: 'Bunny Media Library',
		customCode: 'Custom Code',
		openBunnyLibrary: 'Open Bunny Media Library',
		codePlaceholder:
			'You can place any HTML, iframe, or JavaScript embed code here, such as JWP video, prestoplayer/WordPress shortcode, etc...',
		iframePlaceholder: (platform) =>
			`Enter ${platform} video URL`,
		iframeError: (platform) =>
			`Please enter a valid ${platform} video URL, e.g.:`,
		missingParams: 'Missing required parameters',
		missingLibraryId: 'Missing Bunny Library Id',
		missingApiKey: 'Missing Bunny Stream Api Key',
		missingCdnHostname: 'Missing Bunny Cdn Hostname',
		goToSettings: 'Go to Settings',
	},
	VideoLength: {
		hour: 'h',
		minute: 'm',
		second: 's',
	},
	EditorDrawer: {
		startEditing: 'Start Editing',
		editContent: 'Edit Content',
		exitFullscreen: 'Exit Fullscreen',
		fullscreen: 'Fullscreen Edit',
		clearAll: 'Clear All Content',
		saveContent: 'Save Content',
		notes: 'Notes',
		shortcodeSupport: 'WordPress shortcode is supported',
		moreFeatures: 'More features coming soon',
		powerEditor: 'Power Editor',
		elementorEditor: 'Elementor Editor',
		switchEditorWarning:
			'Please save your work before switching editors',
		fullIntro: 'Full Introduction',
		elementorRequired:
			'You must install and activate the Elementor plugin to use Elementor editing',
	},
	AlertBlock: {
		info: 'Info',
		success: 'Success',
		warning: 'Warning',
		error: 'Error',
		description: 'Create eye-catching alerts and notes',
	},
	BunnyVideoBlock: {
		title: 'Bunny Media Library',
		description: 'Place Bunny video or audio files',
		width: 'W',
		aspectRatioHint:
			'Enter custom aspect ratio, e.g. 16/9 = 1.7778',
		ratio: 'Ratio',
		replace: 'Replace',
		delete: 'Delete',
	},
	CustomHTMLBlock: {
		title: 'Custom HTML',
		description: 'Supports HTML, CSS, JavaScript, iframe, etc...',
	},
	MediaLibraryBlock: {
		title: 'Media Library',
		description: 'WordPress Media Library',
		width: 'W',
		setLink: 'Set image link',
		setAlt: 'Set alt text',
		setText: 'Set text',
		replace: 'Replace',
		delete: 'Delete',
		linkPlaceholder:
			'Enter a URL with https://, e.g. https://www.google.com',
		newWindow: 'Open in new window',
		altPlaceholder: 'Enter image alt text',
		titlePlaceholder: 'Enter image title text',
		captionPlaceholder: 'Enter image caption text',
	},
	BunnyModule: {
		mediaLibrary: 'Bunny Media Library',
		settings: 'Bunny Settings',
		uploadVideo: 'Upload Video',
		save: 'Save',
		descriptionLabel: 'Description',
		noAccount: "Don't have a Bunny account?",
		noAccountHint:
			"If you don't have a Bunny account yet, you can",
		applyHere: 'Apply here',
		step1: '1. Go to Bunny dashboard, select "Stream" and enter "Library"',
		step2: '2. Go to "API" tab, copy Library ID, CDN Hostname and Stream API Key',
		searchPlaceholder: 'Search keywords, press ENTER to search',
		selectedVideos: (count) => `${count} videos selected`,
		clearSelection: 'Clear selection',
		deleteConfirm:
			'Are you sure you want to delete these videos?',
		deleteOk: 'Delete',
		deleteCancel: 'Cancel',
		batchDelete: (count) =>
			`Batch delete${count ? ` (${count})` : ''}`,
		deleteSuccess: 'All videos deleted successfully',
		deleteFailed: (title, id) =>
			`Failed to delete video ${title} #${id}`,
		fetchError: 'Failed to fetch videos',
		fetchErrorDesc:
			'Bunny Stream API returned an error. Please contact site administrator or try again later',
		uploadWarning:
			'You can leave this page while uploading, but do not refresh — refreshing will interrupt the upload',
		noVideos: 'No videos found',
		showMore: 'Show more',
		copyIframe: 'Copy iframe embed code',
		goToBunny: 'Go to Bunny page',
		deleteBunnyVideo: 'Delete Bunny video',
		confirmDeleteBunny: 'Confirm delete Bunny video?',
		confirmOk: 'Confirm',
		confirmSelect: (count) => `Confirm selection (${count})`,
		encoding: 'Bunny encoding',
		uploading: 'Uploading files',
		saveSuccess:
			'\nSaved successfully. Please refresh the page to apply changes.\n\nClick OK to refresh.',
	},
	ProductFilter: {
		fuzzySearch: 'Fuzzy Search',
		multiSelect: 'Multi-select',
		simpleProduct: (label) => `${label} (Simple)`,
		variableProduct: (label) => `${label} (Variable)`,
		moreFilters: 'More Filters',
		filterTitle: 'Product Filters',
		hideFilters: 'Hide Filters',
		showFilters: 'Show More Filters',
		filter: 'Filter',
		reset: 'Reset',
		selectAuthor: 'Select Author',
		productIdPlaceholder: 'Enter Product ID',
	},
	WpMediaLibraryItem: {
		fileTypeNotAllowed: 'This file type is not allowed',
		maxFilesExceeded: (limit) =>
			`Maximum ${limit} files can be selected`,
	},
	WpMediaLibraryItemInfo: {
		copyDownloadLink: 'Copy download link',
		openInNewTab: 'Open in new tab',
		classicView: 'Classic view',
		deleteFile: 'Delete file',
	},
	WpMediaLibraryUploadFile: {
		uploadHint: 'Click or drag files here to upload',
		supportType: (accept) =>
			`Supports ${accept} type files`,
	},
	WpMediaLibraryModal: {
		defaultTitle: 'Media Library',
		confirmSelect: (count) => `Confirm selection (${count})`,
	},
	ProductStock: {
		inStock: 'In Stock',
		stockSufficient: 'Stock Sufficient',
		lowStock: 'Low Stock',
		outOfStock: 'Out of Stock',
		onBackorder: 'On Backorder',
		unknownStatus: 'Unknown Status',
	},
	ProductBoundItems: {
		unknownName: 'Unknown',
		unlimited: 'Unlimited',
		followSubscription: 'Follow Subscription',
		afterOrderComplete: 'After Order Complete',
		until: 'Until',
		day: 'Day',
		month: 'Month',
		year: 'Year',
	},
	ProductTotalSales: {
		top20: 'Best Seller (Top 20%)',
		top40: 'Popular (Top 40%)',
		top60: 'Sales (Top 60%)',
		top80: 'Sales (Top 80%)',
		top100: 'Sales (Top 100%)',
	},
	FileUpload: {
		uploadHint: 'Click or drag files here to upload',
		imageOnly: 'Only image/* type files are supported',
		reset: 'Reset',
	},
	UserAvatarUpload: {
		reset: 'Reset',
		recommendedSize: 'Recommended size',
	},
	AntdUtils: {
		search: 'Search',
		paginationTotal: (range0, range1, total, label) =>
			`Showing ${range0}-${range1} of ${total} ${label}`,
		defaultLabel: 'items',
	},
	SimpleDrawerModal: {
		defaultTitle: 'Media Library',
	},
}
