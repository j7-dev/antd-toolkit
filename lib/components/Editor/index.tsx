import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
// import { DividerPlugin } from './customPlugins/Divider';

import { useMemo, useRef } from 'react';
import { Button } from 'antd';
import {useState} from 'react';
import { plugins } from './utils';
import { TBlock } from './types';

export * from './useEditor';

const TOOLS = {
	// [ActionMenu] - + 跟 / 的主選單
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
	// [Toolbar] - 選取文字後的工具列
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
	// [LinkTool] - 選取文字後的工具列，上面的 Link 點了會有 popup 填寫 url 跟 title
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export const Editor = () => {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);
	const [values, setValues] = useState("")

	const handleClick = () => {
		const raw:{
			[key: string]: TBlock
		} = editor.getEditorValue();
		const blocks:TBlock[] = Object.values(raw)

		// 按照畫面上的順序排序
		blocks.sort((a, b) => a?.meta?.order - b?.meta?.order)
		setValues(JSON.stringify(blocks, null, 2))
		console.log("⭐  blocks:", blocks)
	}

  return (
		<>
    <div className="editor-container" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        autoFocus
      />
    </div>
		<Button type="primary" onClick={handleClick}>Get Values</Button>
		{values && (<pre className='mt-8 prismjs bg-gray-100 p-4 rounded-md'>{values}</pre>)}
		</>
  );
}
