# Consumer Developer

## Description

A frontend developer who installs `antd-toolkit` via npm and imports components, hooks, utilities, and types into their React application.

## Key Attributes

- Uses React 18 with TypeScript
- Has Ant Design 5 as a peer dependency
- May or may not use Refine.dev (determines if `antd-toolkit/refine` is relevant)
- May or may not target WordPress (determines if `antd-toolkit/wp` is relevant)
- Configures Tailwind CSS with `at-` prefix and `#tw` important selector
- Imports styles via `import 'antd-toolkit/style.css'`

## Interaction Patterns

- Imports named exports from one of three entry points
- Wraps application with `EnvProvider` for WordPress environment variables
- Wraps application with `LocaleProvider` for i18n (optional, defaults to zh_TW)
- Wraps application with `BunnyProvider` for BunnyCDN video features (optional)
- Uses hooks for table search, row selection, color tokens, and constant selects
- Uses utility functions for date parsing, form data conversion, and CSS class merging
