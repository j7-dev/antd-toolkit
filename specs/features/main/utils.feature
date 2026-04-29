@ignore @query
Feature: Main Module - Utilities

  Background:
    Given the consumer application has installed antd-toolkit

  Rule: cn() merges Tailwind CSS classes via clsx + tailwind-merge
    # Signature: cn(...args: ClassValue[]) => string
    # Resolves conflicting Tailwind classes (e.g., "p-2 p-4" -> "p-4")
    # Supports conditional classes via clsx syntax

  Rule: renderHTML() renders an HTML string as a React element
    # Signature: renderHTML(HTMLstring: string, allowJS?: boolean) => ReactElement
    # Uses dangerouslySetInnerHTML
    # When allowJS=true, executes inline script tags via DOMParser

  Rule: getCurrencyString() formats a price with currency symbol
    # Signature: getCurrencyString({ price, symbol? }) => string
    # Default symbol: "NT$"
    # Returns empty string for undefined price

  Rule: filterObjKeys() removes object keys with specified values
    # Signature: filterObjKeys(obj, filterValues?) => object
    # Default filters: [undefined]
    # Recursively processes nested objects
    # Removes empty objects after filtering

  Rule: keyToWord() converts snake_case or camelCase to human-readable words
    # Signature: keyToWord(str: string) => string
    # snake_case: splits by underscore, capitalizes each word
    # camelCase: inserts space before uppercase letters, capitalizes first

  Rule: getGCDItems() finds the greatest common denominator of item arrays
    # Generic: getGCDItems<T>(items: T[][], key?) => T[]
    # Default key: "id"
    # Returns items present in ALL input arrays

  Rule: simpleDecrypt() decodes a shifted base64 string to JSON
    # Signature: simpleDecrypt(str: string) => any
    # Reverses character shift (-1) then base64 decodes then JSON.parse

  Rule: toFormData() converts an object to FormData for axios
    # Signature: toFormData(data: object) => GenericFormData
    # Converts empty arrays to "[]" string (so backend receives the key)
    # Converts null/undefined to empty string

  Rule: getColumnFilterProps() generates antd Table column filter config
    # Signature: getColumnFilterProps<DataType>({ dataSource, dataIndex, dataFrom?, exactMatch? })
    # Returns: { filters, onFilter }
    # Supports "local" (from TConstant) and "fetched" (from DataType) data sources
    # Handles string, number, and boolean field types

  Rule: getDefaultPaginationProps() returns standard pagination config
    # Signature: getDefaultPaginationProps({ label? }) => PaginationProps
    # Position: bottomCenter, showSizeChanger, showQuickJumper, showTotal with Chinese text

  Rule: formatDateRangeData() splits a date range field into two timestamp fields
    # Signature: formatDateRangeData(values, fromProperty, toProperty) => object
    # Converts Dayjs values to Unix timestamps
    # Removes original range field from output

  Rule: Dayjs utility functions handle timestamp/Dayjs conversions
    # parseDatePickerValue(value): unknown -> Dayjs | undefined (supports 10/13-digit timestamps)
    # parseRangePickerValue(values): unknown -> [Dayjs, Dayjs] | [undefined, undefined]
    # formatDatePickerValue(value, format?, fallback?): Dayjs -> formatted string
    # formatRangePickerValue(values, format?, fallback?): [Dayjs, Dayjs] -> [string, string]

  Rule: Video utility functions extract IDs and estimate upload times
    # getYoutubeVideoId(url): string -> string | null (supports youtu.be and ?v= formats)
    # getVimeoVideoId(url): string -> string | null (regex extraction from vimeo.com/ID)
    # getEstimateUploadTimeInSeconds(fileSize): number -> number (assumes 30 Mbps upload)
    # getVideoUrl(file): File -> string (URL.createObjectURL)

  Rule: safeParse() validates data against Zod schema with console warning
    # Signature: safeParse(scheme: ZodType, data: any) => void
    # Logs issues via console.warn on validation failure
    # Uses zod/v4

  Rule: File type detection utilities check file extensions
    # getFileExtension(url): string -> string (lowercase extension)
    # isImageFile(url): boolean (jpg, jpeg, png, gif, webp)
    # isAudioFile(url): boolean (mp3, wav, m4a, aac, flac)
    # isVideoFile(url): boolean (mp4, webm)

  Rule: Exported constants provide default values
    # defaultImage: imported default JPEG image asset
    # defaultImageVideo: placeholder.co URL for video thumbnails
    # fakeImage: picsum.photos URL for random test images
    # defaultSelectProps: standard antd Select config (search, multiple, NameId render)
    # defaultBooleanRadioButtonProps: small radio group config
    # defaultTableProps: small, bordered, sticky table config
