@ignore @query
Feature: WordPress Module - General Components

  Background:
    Given the consumer application has installed antd-toolkit/wp
    And the application is running in a WordPress environment
    And EnvProvider is configured with WordPress environment variables

  Rule: Upload renders a drag-drop file uploader with image crop
    # Props: uploadProps (UploadProps), children? (ReactNode)
    # Uses antd-img-crop (ImgCrop) wrapper with rotation slider, quality 1, aspect slider, reset, grid
    # Uses antd Dragger for drag-and-drop
    # Default UI: inbox icon, upload hint, accepted file types from locale
    # Custom children replace default upload UI
    # Exports useUpload hook for upload state management

  Rule: OnChangeUpload renders an instant-upload component with preview
    # Immediately uploads file on selection (no submit step)
    # Shows reset button and upload hint
    # Image-only mode available

  Rule: BackToWpAdmin renders a navigation link back to WordPress admin
    # Simple link component with locale-aware label
    # Links to WordPress admin dashboard

  Rule: MediaLibrary renders a WordPress media grid browser
    # Grid display of WordPress media library items
    # Search/filter functionality
    # File selection (single and multi-select)
    # Batch delete with confirmation
    # Shows selected file count with clear button
    # Sub-components: List/Filter for filtering media items

  Rule: MediaLibraryModal renders a media picker in a modal
    # Wraps MediaLibrary in a modal dialog
    # Used for selecting media files from WordPress library

  Rule: MediaLibraryNotification shows upload progress for media files
    # Displays "uploading" notification during file upload

  Rule: CopyResources provides a resource copy utility with tooltip
    # Shows a copy action with tooltip from locale
