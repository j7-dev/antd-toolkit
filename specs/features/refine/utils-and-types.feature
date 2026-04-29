@ignore @query
Feature: Refine Module - Utilities and Types

  Background:
    Given the consumer application has installed antd-toolkit/refine

  Rule: objToCrudFilters converts a plain object to Refine CrudFilters array
    # Signature: objToCrudFilters(values: BaseRecord) => CrudFilters
    # Each truthy key becomes { field, operator: "eq", value }
    # Falsy values are skipped
    # Alias: getInitialFilters (deprecated)

  Rule: notificationProvider provides styled Ant Design notifications for Refine
    # Implements: NotificationProvider from @refinedev/core
    # open: maps Refine notification types to antd notification with colored icons
    #   "open" / info: blue InfoCircleTwoTone
    #   "success": green CheckCircleTwoTone
    #   "error" / default: red CloseCircleTwoTone
    #   Shows progress bar, pauses on hover
    # close: destroys notification by key

  Rule: notificationProps provides success/error notification formatters for useCreate/useUpdate
    # successNotification: extracts data.message from AxiosResponse, type "success"
    # errorNotification: extracts response.data.message from AxiosError, strips HTML via getTextContent, type "error"

  Rule: defaultDeleteButtonProps provides standard delete button configuration
    # confirmTitle: "confirm delete?" (Chinese)
    # confirmOkText: "confirm", confirmCancelText: "cancel"
    # hideText: true, type: "text"

  Rule: TGrantedItemBase defines the base type for granted items
    # { id: string, name: string, expire_date: TExpireDate }

  Rule: TProductFilterProps defines the product filter form shape
    # Partial object with: s, sku, type, product_category_id, product_tag_id,
    #   product_brand_id, status, featured, downloadable, virtual,
    #   sold_individually, backorders, stock_status, date_created, is_course,
    #   price_range, author, include

  Rule: UseCustomMutationParams defines the type for custom mutation calls
    # { url, method?, values?, meta?, metaData?, dataProviderName?, config? }
