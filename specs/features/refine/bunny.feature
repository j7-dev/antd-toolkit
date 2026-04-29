@ignore @query
Feature: Refine Module - BunnyCDN Video Integration

  Background:
    Given the consumer application has installed antd-toolkit/refine
    And BunnyProvider is configured with bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname

  Rule: BunnyProvider creates a configured axios instance and data provider for Bunny Stream API
    # Props: bunny_library_id, bunny_stream_api_key, bunny_cdn_hostname, children
    # Creates axios instance with baseURL https://video.bunnycdn.com/library and AccessKey header
    # Creates bunny_data_provider_result from internal dataProvider
    # Merges with parent BunnyContext (supports nesting)
    # Exports useBunny hook for accessing context

  Rule: BunnyMediaLibrary renders a video grid browser with search, upload, and settings
    # Displays a grid of video thumbnails from Bunny Stream library
    # Supports video search/filter
    # Includes upload video functionality
    # Shows video info panel for selected videos
    # Settings panel for library configuration

  Rule: BunnyMediaLibraryModal renders a video picker in a SimpleModal
    # Wraps BunnyMediaLibrary inside SimpleModal
    # Used for selecting a video from the Bunny Stream library
    # Exports hooks for modal state management

  Rule: BunnyMediaLibraryNotification shows upload progress
    # Displays file upload progress notification during video upload
    # Shows per-file upload status with progress indicator

  Rule: Bunny types define video record structures
    # TBunnyVideo and related types for Bunny Stream API responses
    # Used by BunnyMediaLibrary and BunnyMediaLibraryModal
