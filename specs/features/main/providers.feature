@ignore @query
Feature: Main Module - Providers

  Background:
    Given the consumer application has installed antd-toolkit

  Rule: EnvProvider supplies WordPress environment variables via React Context
    # Props: children (ReactNode), env (TEnv)
    # TEnv fields:
    #   SITE_URL, AJAX_URL, API_URL (string) - WordPress site URLs
    #   CURRENT_USER_ID (number) - logged-in user ID
    #   CURRENT_POST_ID (string | false) - current post ID if applicable
    #   PERMALINK, APP_NAME, KEBAB, SNAKE (string) - app identification
    #   NONCE (string) - WordPress REST API nonce for authentication
    #   BUNNY_LIBRARY_ID, BUNNY_CDN_HOSTNAME, BUNNY_STREAM_API_KEY (optional string) - BunnyCDN
    #   AXIOS_INSTANCE (optional AxiosInstance) - shared HTTP client
    #   [key: string]: any - extensible for custom fields
    # Merges parent context (supports nested EnvProviders)

  Rule: useEnv returns environment variables with a configured axios instance
    # Returns TEnv with AXIOS_INSTANCE always populated
    # Axios instance configuration:
    #   timeout: 30000ms
    #   Headers: X-WP-Nonce (from NONCE) or Basic Auth (from Storybook env vars)
    #   Content-Type: application/json
    # Response interceptor:
    #   403: shows window.confirm for cookie expiry, reloads on confirm
    #   Other errors: console.error with response message
    #   No response: console.error "no response"
    #   Config error: console.error with error message
    #   Always rejects with error (for notificationProvider to handle)

  Rule: LocaleProvider supplies internationalization strings via React Context
    # Props: children (ReactNode), locale (TLocale, default zh_TW)
    # Available locales: zh_TW (Traditional Chinese), en_US (English)
    # Each component has its own namespace in TLocale
    # useLocale(namespace) hook returns namespace-specific locale object
    # Locale covers: ActionButton, PopconfirmDelete, CopyText, Countdown, DateTime,
    #   SecondToStr, WatchStatusTag, Limit, FormDatePicker, FormRangePicker,
    #   SelectedRecord, ToggleContent, SimpleDrawer, EnvProvider,
    #   BindItems, GrantUsers, RevokeUsers, UnbindItems, UpdateBoundItems,
    #   UpdateGrantedUsers, SelectedItem, RefineCommon, BackToWpAdmin,
    #   CopyResources, WpMediaLibrary, MediaLibraryNotification, OnChangeUpload,
    #   Upload, UserFilter, ProductType
