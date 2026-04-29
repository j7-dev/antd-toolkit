@ignore @query
Feature: Main Module - Types

  Background:
    Given the consumer application has installed antd-toolkit

  Rule: TConstant<T> defines a labeled value with optional color
    # { label: string, value: T, color?: string }
    # Used throughout the library for select options, filter options, status constants

  Rule: TGetColumnFilterProps<T> defines column filter configuration input
    # { dataSource, dataIndex, dataFrom?, exactMatch? }
    # dataSource: readonly TConstant[] or readonly T[]
    # dataFrom: "local" (default) | "fetched"

  Rule: HTTP method types constrain allowed methods
    # THttpMethods: "get" | "delete" | "head" | "options"
    # THttpMethodsWithBody: Omit<THttpMethods, "get">

  Rule: Sorting types define WordPress-compatible ordering
    # TOrderBy: "none" | "ID" | "author" | "title" | "name" | "type" | "date" | "modified" | "parent" | "rand" | "comment_count" | "relevance" | "menu_order" | "meta_value" | "meta_value_num" | "post__in" | "post_name__in" | "post_parent__in"
    # TOrder: "ASC" | "DESC"

  Rule: TLimit defines time limit configuration for access control
    # TLimitType: "unlimited" | "fixed" | "assigned" | "follow_subscription"
    # TLimitUnit: "second" | "day" | "month" | "year" | ""
    # TLimit: { limit_type: TLimitType, limit_value: number | "", limit_unit: TLimitUnit }

  Rule: TVideo defines a video source reference
    # TVideoType: "youtube" | "vimeo" | "bunny-stream-api" | "code"
    # TVideo: { type: TVideoType, id: string, meta: { [key: string]: any } }

  Rule: TExpireDate defines subscription expiration state
    # { is_subscription: boolean, subscription_id: number | null, is_expired: boolean, timestamp: number | null }

  Rule: TLocale defines the complete internationalization string map
    # Namespaced by component: ActionButton, PopconfirmDelete, CopyText, etc.
    # Some namespaces include function types for parameterized strings
    # Available implementations: zh_TW, en_US
