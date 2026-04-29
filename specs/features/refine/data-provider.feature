@ignore @query
Feature: Refine Module - WordPress REST API Data Provider

  Background:
    Given the consumer application has installed antd-toolkit/refine
    And dataProvider is initialized with apiUrl and httpClient (AxiosInstance)

  Rule: getList fetches paginated resources from WordPress REST API
    # Params: resource, pagination (current, pageSize, mode), filters, sorters, meta
    # Builds query: paged, posts_per_page (server mode only)
    # Generates filters via generateFilter (CrudFilters -> query params)
    # Generates sort via generateSort (sorters -> query string)
    # Reads response headers: X-WP-TotalPages, X-WP-Total, X-WP-CurrentPage
    # Returns: { data, total, totalPages, currentPage }
    # Supports meta.headers and meta.method override

  Rule: getMany fetches multiple resources by IDs
    # Params: resource, ids, meta
    # Fetches from /{resource}?include={ids}

  Rule: getOne fetches a single resource by ID
    # Params: resource, id, meta
    # Fetches from /{resource}/{id}

  Rule: create sends POST to create a new resource
    # Params: resource, variables, meta
    # Supports meta.method override and meta.headers
    # Sends variables as request body

  Rule: update sends PUT/PATCH to modify an existing resource
    # Params: resource, id, variables, meta
    # Supports meta.method override (default PUT or PATCH)
    # Sends variables as request body to /{resource}/{id}

  Rule: deleteOne sends DELETE to remove a resource
    # Params: resource, id, variables, meta
    # Sends DELETE to /{resource}/{id}
    # Variables are sent in request body

  Rule: All operations use errorHandler for unified error processing
    # Catches axios errors and extracts response.data.message
    # Rejects with { message, statusCode: 500 } for Refine notification

  Rule: BunnyCDN stream data provider extends the base pattern
    # Separate data provider for Bunny Stream API
    # Uses AccessKey header for authentication
    # Base URL: https://video.bunnycdn.com/library
