import { createReactEditorJS} from 'react-editor-js'
import {OutputData} from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
const ReactEditorJS = createReactEditorJS()

const DEFAULT_VALUE:OutputData = {
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

const EDITOR_JS_TOOLS = {
	header: {
		class: Header,
		inlineToolbar: ['link']
	},
	list: {
		class: List,
		inlineToolbar: true
	},
	linkTool: {
		class: LinkTool,
		inlineToolbar: true
	},
  embed: Embed,
  table: Table,
  warning: Warning,
  code: Code,
  image: Image,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}

export const EditorJs = () => {
  return (<>
    <ReactEditorJS defaultValue={DEFAULT_VALUE} tools={EDITOR_JS_TOOLS}  autofocus placeholder="01012012"/>

		</>
  );
};
