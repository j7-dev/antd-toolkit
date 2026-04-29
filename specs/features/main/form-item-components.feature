@ignore @query
Feature: Main Module - Form Item Components

  Background:
    Given the consumer application has installed antd-toolkit
    And form item components are used inside an Ant Design Form context
    And the Tailwind CSS prefix is "at-" with important selector "#tw"

  Rule: Switch stores "yes" or "no" string via Form.Item normalize
    # Props: formItemProps (FormItemProps), switchProps (SwitchProps)
    # Uses stringToBool from wp module for getValueProps
    # Normalizes boolean to "yes"/"no" string for WordPress compatibility

  Rule: Segmented stores "yes" or "no" string via segmented control
    # Props: formItemProps (FormItemProps), segmentedProps (SegmentedProps)
    # Uses BOOLEAN_OPTIONS_REVERSE from wp utils as default options
    # Block layout, full width

  Rule: DatePicker converts between Unix timestamp and Dayjs for Form
    # Props: formItemProps (FormItemProps), datePickerProps (DatePickerProps)
    # getValueProps: parseDatePickerValue (supports 10-digit and 13-digit timestamps)
    # normalize: converts Dayjs to Unix timestamp via .unix()
    # Default format: YYYY-MM-DD HH:mm with showTime

  Rule: RangePicker converts between timestamp array and Dayjs array for Form
    # Props: formItemProps (FormItemProps), rangePickerProps (RangePickerProps)
    # getValueProps: parseRangePickerValue (supports [timestamp, timestamp])
    # Allows empty values on both ends
    # Default format: YYYY-MM-DD HH:mm with showTime

  Rule: Limit provides a multi-mode time limit selector with 4 types
    # Props: formItemProps, radioGroupProps, limitTypeName, limitValueName, limitUnitName
    # Type "unlimited": hides value/unit, stores empty strings
    # Type "fixed": shows InputNumber (min 1) + unit Select (day/month/year)
    # Type "assigned": shows DatePicker with required validation, unit = "timestamp"
    # Type "follow_subscription": hides value/unit, stores empty strings
    # Resets value/unit fields on type change via Form.useFormInstance

  Rule: VideoInput provides a video source selector with 6 options
    # Props: formItemProps (FormItemProps), selectProps (SelectProps)
    # Options: none, wordpress, youtube, vimeo, bunny-stream-api, code
    # Shows visual grid of video platform icons with selection outline
    # Renders sub-forms: Youtube (URL input), Vimeo (URL input), Bunny (API), Code (textarea)
    # Stores { type, id, meta } object in form field

  Rule: VideoLength converts hour/minute/second inputs to total seconds
    # Props: FormItemProps (spread)
    # Three InputNumber fields: hours (min 0), minutes (0-59), seconds (0-59)
    # Stores total seconds in hidden Form.Item
    # Initializes from existing record's second value on mount

  Rule: DoubleConfirmSwitch requires Popconfirm before enabling
    # Props: fromItemProps, popconfirmProps, tooltipProps, switchProps, onClick, onConfirm, onCancel
    # Popconfirm only appears when enabling (not when disabling)
    # Cancel resets form field to false
    # Shows tooltip "Click to Enable/Disable"

  Rule: BooleanRadioButton renders a 3-option radio button (ALL/true/false)
    # Props: formItemProps (FormItemProps), radioGroupProps (RadioGroupProps), averageWidth (boolean)
    # Default options: ALL (""), CheckOutlined ("1"), CloseOutlined ("0")
    # Uses button style (optionType="button", buttonStyle="solid")

  Rule: BooleanSegmented renders a 3-option segmented control (ALL/TRUE/FALSE)
    # Props: formItemProps (FormItemProps), segmentedProps (SegmentedProps), type
    # Types: "default" (icon+text), "text" (text only), "icon" (icon only), "vertical" (stacked)
    # Block layout
