@ignore @query
Feature: WordPress Module - Hooks, Utilities, and Types

  Background:
    Given the consumer application has installed antd-toolkit/wp

  # --- Hooks ---

  Rule: useItemSelect provides a searchable resource Select integrated with Refine
    # Generic: useItemSelect<T extends BaseRecord & { name, id }>({ selectProps?, useSelectProps })
    # Uses Refine's useSelect internally with:
    #   optionLabel: item.name, optionValue: item.id
    #   debounce: 500ms, pageSize: 20, server-side pagination
    #   search: field "s" with contains operator
    # Returns: { selectProps (merged), itemIds (string[]), setItemIds }
    # Merges defaultSelectProps (search, multiple, NameId optionRender) with provided props

  Rule: useWoocommerce provides WooCommerce settings from context
    # Returns WooCommerce configuration including currency, product taxonomies,
    #   manage_stock, product_types, order_statuses, post_statuses, etc.

  # --- WordPress Utilities ---

  Rule: stringToBool converts WordPress-style boolean strings to boolean
    # Signature: stringToBool(value: string | boolean | number) => boolean
    # Truthy values: "yes", "1", 1, "true", "on", true
    # All other values return false

  Rule: boolToString converts boolean to WordPress-style string
    # Signature: boolToString(value: boolean | string) => "yes" | "no"

  Rule: BOOLEAN_OPTIONS provides yes/no options for form controls
    # BOOLEAN_OPTIONS: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] (Chinese labels)
    # BOOLEAN_OPTIONS_REVERSE: reversed order (No first)

  Rule: POST_STATUS defines WordPress post statuses with colors
    # Array of { label, value, color }
    # Values: publish (blue), pending (volcano), draft (orange), private (purple), trash (red)
    # PRODUCT_STATUS is an alias for POST_STATUS

  Rule: USER_ROLES defines WordPress user roles with colors
    # Array of { label, value, color }
    # Values: administrator (red), shop_manager (orange), editor (pink), author (green),
    #   translator (cyan), contributor (purple), customer (blue), subscriber (gray)

  Rule: ORDER_STATUS defines WooCommerce order statuses with colors
    # Array of { label, value, color }
    # Values: processing, pending, wmp-in-transit, wmp-shipped, on-hold, completed,
    #   cancelled, refunded, failed, checkout-draft, ry-at-cvs, ry-out-cvs
    # getOrderStatus(status): looks up status (strips "wc-" prefix) and returns status object

  Rule: PRODUCT_TYPES defines WooCommerce product types with colors
    # Array of { value, label, color }
    # Values: simple, grouped, external, variable, variation, subscription,
    #   variable-subscription, subscription_variation
    # Deprecated: should be provided by backend

  Rule: Product type check utilities inspect product type strings
    # isVariable(type): true if type starts with "variable"
    # isVariation(type): true if type includes "variation"
    # isSubscription(type): true if type includes "subscription"
    # getIsVariation(type): deprecated alias for isVariation

  Rule: PRODUCT_STOCK_STATUS defines stock statuses
    # Values: instock (blue), outofstock (magenta), onbackorder (cyan)

  Rule: BACKORDERS defines backorder options
    # Values: no (not allowed), yes (allowed), notify (only when out of stock)

  Rule: PRODUCT_CATALOG_VISIBILITIES defines catalog visibility options
    # Values: hidden (red), visible (green), search (blue), catalog (orange)

  Rule: getProductFilterLabels returns a label map for product filter fields
    # Accepts optional label parameter (default "product" in Chinese)
    # Maps each TProductFilterProps key to a Chinese display label

  # --- Types ---

  Rule: TProductBaseRecord defines the complete WooCommerce product data shape
    # Includes: basic info (id, type, name, slug, dates, status, sku, etc.)
    # Pricing: price_html, regular_price, sale_price, on_sale, sale_date_range
    # Stock: stock, stock_status, manage_stock, stock_quantity, backorders
    # Relations: upsell_ids, cross_sell_ids, category_ids, tag_ids
    # Attributes: attributes (TProductAttribute[]), default_attributes
    # Images: images (TImage[])
    # Subscription fields: _subscription_price, _subscription_period, etc.
    # Children: children (TProductVariationBase[]) for variable products

  Rule: TUserBaseRecord defines the WordPress user data shape
    # Fields: id, user_login, user_email, display_name, user_registered, user_avatar_url,
    #   user_birthday, description, role, billing_phone, date_last_active,
    #   date_last_order, orders_count, total_spend, avg_order_value, edit_url, ip_address

  Rule: TTerm defines a taxonomy term option
    # { value: string, label: string }

  Rule: TImage defines an image reference
    # { id: string, url: string }

  Rule: TWoocommerce defines WooCommerce settings with Zod validation
    # WoocommerceSchema (Zod object): countries, currency, product_taxonomies,
    #   notify_low_stock_amount, dimension_unit, weight_unit, permalinks,
    #   manage_stock, product_types, order_statuses, post_statuses, product_stock_statuses
    # TTaxonomy / TaxonomySchema: { value, label, hierarchical, publicly_queryable }
    # DEFAULT_WOOCOMMERCE: zero-value default for all fields
