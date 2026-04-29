@ignore @query
Feature: WordPress Module - Product Components

  Background:
    Given the consumer application has installed antd-toolkit/wp
    And the application works with WooCommerce product data (TProductBaseRecord)

  Rule: ProductName displays a product name as a link to edit page
    # Renders product name with link to edit_url
    # Typically used in table columns

  Rule: ProductType displays the product type as a colored tag with feature icons
    # Shows type label (e.g., "simple", "variable", "subscription") as colored Tag
    # Additional boolean indicators via locale:
    #   featured/notFeatured, virtual/notVirtual, downloadable/notDownloadable
    # Product type colors defined in PRODUCT_TYPES constant

  Rule: ProductPrice displays formatted regular and sale prices
    # Shows regular_price and sale_price with price_html
    # Handles on_sale state display

  Rule: ProductTotalSales displays the total sales count
    # Shows total_sales number for a product

  Rule: ProductCat displays product category tags
    # Renders category_ids as tag list
    # Uses term labels from taxonomy data

  Rule: ProductStock displays stock status with colored indicator
    # Shows stock_status from PRODUCT_STOCK_STATUS constants
    # Displays stock quantity when manage_stock is true
    # Color-coded: instock (blue), outofstock (magenta), onbackorder (cyan)

  Rule: ProductBoundItems displays items bound to a product
    # Shows list of items that have been bound to the product via BindItems
