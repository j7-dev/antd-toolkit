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
}
