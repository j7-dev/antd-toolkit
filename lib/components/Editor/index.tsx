import React, {useRef, useEffect} from "react";
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table'
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';

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

export const Editor = () => {
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
				const content = await editor.saver.save();

				console.log(content);
			},
			tools: {
				header: {
					class: Header,
					config: {
						placeholder: 'Enter a header',
						levels: [2, 3, 4],
						defaultLevel: 3
					}
				},
				table: Table,
				quote: Quote,
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
