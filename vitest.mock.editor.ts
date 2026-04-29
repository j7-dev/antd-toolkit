// Stub module to replace editor and external peer dependencies in test environment
export const BlockNote = () => null
export const BlockNoteDrawer = () => null
export const DescriptionDrawer = () => null
export const useBlockNote = () => ({
	blockNoteViewProps: { editor: null },
})
export const getEditorHtml = async () => ''
export const schema = { blockSchema: {} }
export const BlockNoteView = () => null
export const BlockNoteEditor = {}
export const BlockNoteSchema = { create: () => ({ blockSchema: {} }) }
export const defaultBlockSpecs = {}
export const insertOrUpdateBlock = () => {}
export const createReactBlockSpec = () => () => null
export const useCreateBlockNote = () => ({})
export const DefaultReactSuggestionItem = {}
export const DefaultStyleSchema = {}
export const DefaultInlineContentSchema = {}
export const BasicTextStyleButton = () => null
export const BlockTypeSelect = () => null
export const ColorStyleButton = () => null
export const CreateLinkButton = () => null
export const FileCaptionButton = () => null
export const FileReplaceButton = () => null
export const FormattingToolbar = () => null
export const FormattingToolbarController = () => null
export const NestBlockButton = () => null
export const TextAlignButton = () => null
export const UnnestBlockButton = () => null
export const codeBlock = {}

// Refine stubs
export const useUpdate = () => ({ mutate: () => {}, isLoading: false })
export const useCustomMutation = () => ({ mutate: () => {} })
export const useApiUrl = () => ''
export const notificationProps = {}

const StubComponent = ({ children }: any) => children ?? null
export default StubComponent
