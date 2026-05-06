import type {
	BlockNoteEditor,
	BlockSchema,
	InlineContentSchema,
	StyleSchema,
	PartialBlock,
} from '@blocknote/core'

/**
 * 在 Slash Menu 中插入或更新區塊
 *
 * 取代 BlockNote v0.49 已移除的 `insertOrUpdateBlock` API。
 * 邏輯：若目前游標所在區塊為空白段落，則直接以新區塊取代；
 * 否則於目前區塊之後插入新區塊。
 *
 * @template BSchema - 區塊結構類型
 * @template I - 內聯內容結構類型
 * @template S - 樣式結構類型
 * @param editor - BlockNote 編輯器實例
 * @param block - 要插入的新區塊（PartialBlock）
 */
export function insertOrUpdateBlock<
	BSchema extends BlockSchema,
	I extends InlineContentSchema,
	S extends StyleSchema,
>(
	editor: BlockNoteEditor<BSchema, I, S>,
	block: PartialBlock<BSchema, I, S>,
) {
	const currentBlock = editor.getTextCursorPosition().block

	if (
		Array.isArray(currentBlock.content) &&
		currentBlock.content.length === 0
	) {
		return editor.updateBlock(currentBlock, block)
	}

	return editor.insertBlocks([block], currentBlock, 'after')[0]
}
