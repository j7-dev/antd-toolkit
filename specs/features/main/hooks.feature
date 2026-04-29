@ignore @query
Feature: Main Module - Hooks

  Background:
    Given the consumer application has installed antd-toolkit

  Rule: useColor returns all Ant Design theme tokens from useToken
    # Returns: { ...token } from antd theme.useToken()
    # Provides access to colorPrimary, colorBgContainer, borderRadius, etc.

  Rule: useColumnSearch provides table column search with highlight
    # Generic: useColumnSearch<DataType, DataIndex>()
    # Returns: { getColumnSearchProps(dataIndex) }
    # getColumnSearchProps returns ColumnType<DataType> with:
    #   filterDropdown: Input.Search with search/clear functionality
    #   filterIcon: SearchOutlined (blue when active)
    #   onFilter: case-insensitive string.includes matching
    #   render: Highlighter component for search term highlighting
    # Tracks searchText and searchedColumn state internally

  Rule: useConstantSelect provides a controlled Select for TConstant arrays
    # Input: { constants (TConstant<string>[]), hasTooltip, tooltipProps, selectProps }
    # Returns: { value, setValue, Select (memoized component), selectProps }
    # Select component renders AntdSelect with optional Tooltip wrapper
    # Options generated from constants array (label + value)
    # Controlled via internal useState

  Rule: useRowSelection provides table row selection with all/invert/none presets
    # Generic: useRowSelection<T>(rowSelectionProps?)
    # Returns: { selectedRowKeys, setSelectedRowKeys, rowSelection }
    # rowSelection includes: selectedRowKeys, onChange, selections (ALL/INVERT/NONE)
    # Merges with optional rowSelectionProps override

  Rule: useUpdateRecord provides inline editable table functionality
    # Generic: useUpdateRecord<FormatDataType extends BaseRecord>({ rowKey, onFinish })
    # Returns: { formProps, editableTableProps, editingKey, EditButton, form, isEditing, edit, save, cancel }
    # formProps: { form, component: false } for wrapping table in Form
    # editableTableProps: { components: { body: { cell: EditableCell } }, rowClassName }
    # EditButton: memoized component showing Edit/Save/Cancel buttons per row
    # Only one row editable at a time (tracked by editingKey)
    # edit(record): populates form with record values, sets editingKey
    # save(key): calls onFinish with form values + key, resets editingKey
    # cancel(): resets editingKey
    # NOTE: This is the only default export in the library (historical reasons)
