@ignore @query
Feature: Main Module - Layout Components

  Background:
    Given the consumer application has installed antd-toolkit
    And the Tailwind CSS prefix is "at-" with important selector "#tw"

  Rule: Card conditionally wraps content with Ant Design Card
    # Props: CardProps & { showCard?: boolean }
    # When showCard=true (default), renders AntdCard with all props
    # When showCard=false, renders children directly without card wrapper
    # Use case: component used in both standalone (with card) and embedded (without card) contexts

  Rule: Portal renders children into document.body via React portal
    # Props: children (ReactNode), target (HTMLElement, optional)
    # Default target: document.body
    # Used by SimpleDrawer and SimpleModal

  Rule: SimpleDrawer renders a full-height slide-in panel with Portal
    # Props: TSimpleDrawerProps (width, title, children, footer, className, onCancel, transform, zIndex, opacity, pointerEvents, destroyOnHidden, closeConfirm, fullWidth)
    # Controlled by opacity (1=open, 0=closed) and pointerEvents
    # Slide-in animation via CSS transform transition (0.4s cubic-bezier)
    # Shows Skeleton while loading (700ms delay after open)
    # Background overlay with click-to-close support
    # closeConfirm=true shows window.confirm before closing
    # destroyOnHidden=true unmounts content when closed
    # Exports hooks via ./hooks for drawer state management

  Rule: SimpleModal renders a centered modal dialog with Portal
    # Props: TSimpleModalProps (width, title, children, footer, className, onCancel, zIndex, opacity, pointerEvents, destroyOnHidden)
    # Controlled by opacity (1=open, 0=closed) and pointerEvents
    # Fade animation via CSS opacity transition (0.3s ease-out)
    # Shows Skeleton while loading (700ms delay after open)
    # Click overlay background to close
    # Exports hooks via ./hooks for modal state management

  Rule: SelectedRecord displays cross-page selection count with clear/show actions
    # Props: ids (Key[]), onClear, onSelected, resourceLabel, hideOnEmpty (default true)
    # Shows yellow badge with selected count and tooltip with IDs
    # "Clear" button calls onClear callback
    # "Show selected" button calls onSelected callback
    # hideOnEmpty: shows empty spacer div when no selections

  Rule: PopconfirmDelete renders a delete button with confirmation popconfirm
    # Props: popconfirmProps, type ("icon"|"button"), buttonProps, tooltipProps
    # Type "icon": renders danger text button with DeleteOutlined icon
    # Type "button": renders primary danger button with text
    # Popconfirm title, ok/cancel text from locale
    # Optional Tooltip wrapper via tooltipProps

  Rule: ActionButton renders an edit/save/cancel/delete button group
    # Props: TActionButton (canDelete, buttonProps, className, type, onDelete, onSave, onEdit, onCancel)
    # Internal isEditing state toggles between edit mode and view mode
    # View mode: Edit button + (optional) Delete button with Popconfirm
    # Edit mode: Save button + Cancel button + (optional) Delete button
    # Type "both": icon + text, "icon": icon only, "text": text only
    # All labels from locale
