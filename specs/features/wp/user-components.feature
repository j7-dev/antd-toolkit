@ignore @query
Feature: WordPress Module - User Components

  Background:
    Given the consumer application has installed antd-toolkit/wp
    And the application works with WordPress user data (TUserBaseRecord)

  Rule: UserName displays a user with avatar and display name
    # Renders user_avatar_url as avatar image with display_name
    # Typically used in table columns

  Rule: UserAvatarUpload provides an avatar upload component
    # Specialized upload component for user profile avatars
    # Integrates with WordPress media upload

  Rule: UserFilter provides a user search and filter form
    # Keyword search field with placeholder from locale
    # Include specific users by ID field
    # Filter and reset buttons
    # Uses locale for all labels: keywordSearch, keywordPlaceholder, includeUsers, userIdPlaceholder, filter, reset

  Rule: UserRole displays the user role as a colored tag
    # Renders role value as Tag with color from USER_ROLES constant
    # Role labels in Chinese: administrator, shop_manager, editor, author, translator, contributor, customer, subscriber
