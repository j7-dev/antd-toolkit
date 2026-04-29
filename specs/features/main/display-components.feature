@ignore @query
Feature: Main Module - Display Components

  Background:
    Given the consumer application has installed antd-toolkit
    And the application wraps content with LocaleProvider (optional, defaults to zh_TW)
    And the Tailwind CSS prefix is "at-" with important selector "#tw"

  Rule: Amount displays a formatted currency value with locale string
    # Props: amount (number), currency (string), symbol (boolean, default false), className (string)
    # When symbol=false, shows uppercase currency code (e.g., "USD 1,234")
    # When symbol=true, shows currency symbol (e.g., "$ 1,234")
    # Falls back to 0 for falsy amount, empty string for falsy currency

  Rule: DateTime displays date and optional time from a 13-digit timestamp
    # Props: date (number, 13-digit ms timestamp), className, dateProps, timeProps, hideTime
    # Shows error message for non-13-digit timestamps
    # Default date format: YYYY-MM-DD, default time format: HH:mm:ss
    # When hideTime=true, time is shown in tooltip only

  Rule: Countdown renders a countdown timer with digit display
    # Props: date (number, 13-digit ms timestamp), title, className, width
    # Uses react-countdown internally
    # Shows error for non-13-digit timestamps
    # Displays days, hours, minutes, seconds labels from locale

  Rule: SecondToStr converts seconds to "HH hour MM minute SS second" format
    # Props: second (number), className
    # Shows empty message from locale when second is falsy
    # Pads hours (if <= 99), minutes, and seconds to 2 digits

  Rule: CopyText copies text to clipboard on click with success/error feedback
    # Props: text (string), children (ReactNode, defaults to CopyOutlined icon), messageConfig
    # Uses navigator.clipboard API with fallback error message

  Rule: NameId displays a name with a dimmed #id suffix
    # Props: name (ReactNode), id (string), className, tooltipProps
    # String names are rendered as HTML via renderHTML
    # When tooltipProps is provided (non-null), wraps in Tooltip

  Rule: ObjectTable displays an object as a vertical key-value table
    # Props: record (object), columns (TColumn[]), editable (boolean), className, actionButtonProps
    # Auto-generates columns from object keys for primitive values
    # In editable mode, shows ActionButton and inline Form.Item inputs
    # Shows Empty component when record is falsy

  Rule: TrendIndicator shows a percentage change with up/down arrow
    # Props: tooltipProps, value (number), compareValue (number), hideWithoutCompareValue (boolean)
    # Red with CaretUp when value >= compareValue, green with CaretDown otherwise
    # Shows infinity symbol when compareValue is 0
    # Hidden when hideWithoutCompareValue=true and compareValue is falsy

  Rule: WatchStatusTag displays subscription/expiration status as a colored Tag
    # Props: expireDate (TExpireDate)
    # Blue tag "unlimited" when timestamp is 0
    # Green tag "not expired" when not expired
    # Magenta tag "expired" when expired
    # Exported getWatchStatusTagTooltip provides tooltip text

  Rule: BooleanIndicator renders a small colored dot for boolean state
    # Props: enabled (boolean), className, tooltipProps
    # Teal dot when enabled, rose dot when not enabled
    # Wrapped in Tooltip when tooltipProps.enabled is true

  Rule: BreathLight renders an animated pinging dot indicator
    # Props: className (default "at-bg-orange-400")
    # Uses Tailwind animate-ping for pulse effect

  Rule: SimpleImage renders a lazy-loaded image with loading skeleton
    # Props: render (ReactNode), src (string), className, ratio, loadingClassName
    # Uses native lazy loading attribute
    # Shows animated gray skeleton underneath the image

  Rule: ToggleContent displays HTML content with expand/collapse toggle
    # Props: content (string), className
    # Collapsed view has fixed height with gradient overlay
    # Expanded view shows full content with collapse button

  Rule: Heading renders a section divider with title
    # Props: children, titleProps, size ("sm"|"md"), hideIcon, ...DividerProps
    # Size "md" shows Title with blue left border
    # Size "sm" shows plain Divider with SendOutlined icon

  Rule: LoadingCard renders a pulsing placeholder card
    # Props: children (default "LOADING..."), className (default "at-aspect-video"), ...HTMLDivAttributes

  Rule: LoadingPage renders a multi-square loading animation
    # No props, renders fixed animation with "Loading..." text

  Rule: ExtIcon renders a file extension icon (SVG) based on file type
    # Props: ext (string), className, style
    # Supports: txt, csv, xls, xlsx, doc, docx, ppt, pptx, pdf, mp3, mp4, zip, rar, jpg, png, gif, webp, svg, and more

  Rule: CheckIcon renders an SVG checkmark icon
    # Props: ...HTMLAttributes<SVGElement>

  Rule: AltIcon renders an SVG "Alt" text icon
    # Props: color (string, default "#444"), className (default "at-size-4")
