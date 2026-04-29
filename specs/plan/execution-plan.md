# Execution Plan - antd-toolkit

## Overview

antd-toolkit is a React component library published to npm, providing three independent export modules:
- `antd-toolkit` (main) -- General-purpose UI components, hooks, utilities, and types
- `antd-toolkit/refine` (refine) -- Refine.dev integration components, data provider, hooks
- `antd-toolkit/wp` (wp) -- WordPress integration components, hooks, utilities

This is a **library project** (not a business application). Specs describe the public API surface, component contracts, and module architecture.

## Module Summary

| Module | Components | Hooks | Utils | Types |
|--------|-----------|-------|-------|-------|
| main | 32 | 5 | 6 categories | 8 |
| refine | 10 | 1 | 4 | 4 |
| wp | 12 | 2 | 3 categories | 7 |

## Phase 01: Discovery (complete)

All module architecture, component APIs, and type contracts documented in feature specs.

## Phase 02: Entity Modeling

Not applicable -- this is a UI component library with no database entities.

## Phase 03: BDD Analysis

| Operation | Target | Description |
|-----------|--------|-------------|
| create | main/components | Document all 32 main components |
| create | main/hooks | Document all 5 main hooks |
| create | main/utils | Document all utility categories |
| create | main/types | Document all shared types |
| create | refine/components | Document all 10 refine components |
| create | refine/data-provider | Document WordPress REST API data provider |
| create | refine/bunny | Document BunnyCDN integration |
| create | wp/components | Document all 12 wp components |
| create | wp/hooks | Document all 2 wp hooks |
| create | wp/utils | Document all wp utilities |

## Phase 04: API Contract

Not applicable -- this library does not expose HTTP endpoints. The "API" is the public export surface documented in feature specs.

## Phase 05-08: Implementation

Not applicable -- the library is already implemented. Specs serve as documentation and regression reference.

## Key Architectural Decisions

1. **Three independent entry points** with separate build outputs supporting tree-shaking
2. **Tailwind CSS prefix system** (`at-`) to avoid conflicts with host applications
3. **WordPress integration** via EnvProvider context (NONCE, API_URL, AJAX_URL)
4. **Refine.dev integration** with custom WordPress REST API data provider
5. **BunnyCDN video integration** with dedicated provider and media library
6. **Internationalization** via LocaleProvider with zh_TW (default) and en_US
7. **No unit tests** -- Storybook serves as primary documentation and visual verification
8. **ESM only** output with vite-plugin-dts for TypeScript declarations
