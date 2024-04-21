import React, {useRef, useEffect} from "react";
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table'

const DEFAULT_INITIAL_DATA =  {
	"time": new Date().getTime(),
	"blocks": [
		{
			"type": "header",
			"data": {
				"text": "This is my awesome editor!",
				"level": 1
			}
		},
	]
}

export const Editor: React.FC<{}> = () => {
	const ejInstance = useRef(null);
	const initEditor = () => {
		const editor = new EditorJS({
			holder: 'editorjs',
			onReady: () => {
				console.log('ready!');
				ejInstance.current = editor;
			},
			autofocus: true,
			data: DEFAULT_INITIAL_DATA,
			onChange: async () => {
				let content = await editor.saver.save();

				console.log(content);
			},
			tools: {
				// 	header: Header,
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
				},
				table: Table,
			}
		 });
	 };

	useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div id='editorjs'></div>
  );
};
