@ignore @query
Feature: Refine Module - Components

  Background:
    Given the consumer application has installed antd-toolkit/refine
    And @refinedev/core and @refinedev/antd are available as peer dependencies
    And the application is configured with a Refine data provider

  Rule: FilterTags displays active form filter values as removable tags
    # Generic: FilterTagsComponent<T = BaseRecord>
    # Props: form (FormInstance<T>), keyLabelMapper, valueLabelMapper, booleanKeys
    # Handles: undefined/null/empty (hidden), Dayjs arrays (date range format),
    #   string/number arrays (multiple tags), booleans, and plain values
    # Each tag has a close icon that clears the field and submits the form
    # keyLabelMapper: transforms field key to display label
    # valueLabelMapper: transforms field value to display label

  Rule: BindItems binds items to products with time limits via custom mutation
    # Generic: <T extends BaseRecord & { name, id }>
    # Props: product_ids (string[]), meta_key, useSelectProps, url?, selectProps?, useCustomMutationParams?, label?, useInvalidateProp?
    # Uses useItemSelect for searchable resource dropdown
    # Reads limit_type/value/unit from Form.useFormInstance
    # POSTs to url (default: /products/bind-items) with product_ids, item_ids, meta_key, limit fields
    # Invalidates product list on success
    # Shows success/error message via antd message

  Rule: UnbindItems removes item bindings from products via custom mutation
    # Similar to BindItems but for unbinding
    # Uses Popconfirm for delete confirmation

  Rule: UpdateBoundItems updates the time limit of existing bound items
    # Updates limit_type/value/unit for already-bound items

  Rule: GrantUsers grants item access to users with expiration date
    # Generic: <T extends BaseRecord & { name, id }>
    # Props: user_ids (string[]), selectProps?, useSelectProps, url?, useCustomMutationParams?, label?, hideLabel?, useInvalidateProp?
    # Shows DatePicker for expire_date (0 = unlimited)
    # POSTs to url (default: /limit/grant-users) with user_ids, item_ids, expire_date
    # Invalidates user list on success

  Rule: RevokeUsers revokes item access from users
    # Removes granted access with Popconfirm confirmation

  Rule: UpdateGrantedUsers updates the expiration date of granted user access
    # Updates expire_date for already-granted users

  Rule: ProductFilter provides a responsive WooCommerce product filter form
    # Props: searchFormProps (FormProps), options (TProductFilterOptions), mobileWidth? (default 810)
    # Options: product_cats, product_tags, product_shipping_classes, product_brands, top_sales_products, max/min_price, isLoading
    # Switches to MobileFilter below mobileWidth threshold
    # Uses FilterContext to provide options to child components

  Rule: SelectedItem displays cross-page selection count for Refine tables
    # Props: ids (string[]), onClear?, onSelected?, label? (default "object"), tooltipProps?
    # Shows yellow badge with count and tooltip with joined IDs
    # Clear and show buttons with locale-aware labels

  Rule: ActionArea renders a fixed bottom action bar for Refine layout
    # Props: mainPadding? ([mobile, desktop]), collapsedWidth? (80), expandedWidth? (200), style?, children
    # Uses useThemedLayoutContext for sider collapse state
    # Calculates width based on sider state and padding
    # Fixed position at bottom with shadow
