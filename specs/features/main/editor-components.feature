@ignore @query
Feature: Main Module - Editor Components

  Background:
    Given the consumer application has installed antd-toolkit
    And the following peer dependencies are available:
      | package             |
      | @blocknote/core     |
      | @blocknote/react    |
      | @blocknote/mantine  |

  Rule: BlockNote renders a BlockNoteView with custom schema
    # Props: BlockNoteViewProps (from @blocknote/react)
    # Exports useBlockNote hook for editor creation
    # Exports getEditorHtml for converting editor content to HTML
    # Uses custom schema from internal useBlockNote module
    # Imports @blocknote/core/fonts/inter.css and @blocknote/mantine/style.css

  Rule: BlockNoteDrawer renders a BlockNote editor inside a SimpleDrawer
    # Combines SimpleDrawer + BlockNote for slide-in editing experience

  Rule: DescriptionDrawer renders a description editor inside a SimpleDrawer
    # Provides a SimpleDrawer-based editing interface for text descriptions
