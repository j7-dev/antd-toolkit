import YooptaEditor from '@yoopta/editor'
import { FC } from 'react'
import { YooptaEditorProps } from './types'

export * from './useEditor'

export const Editor: FC<YooptaEditorProps> = (yooptaEditorProps) => {
  const selectionBoxRoot =
    yooptaEditorProps.selectionBoxRoot as React.MutableRefObject<null>

  return (
    <>
      <div className="editor-container" ref={selectionBoxRoot}>
        <YooptaEditor {...yooptaEditorProps} />
      </div>
    </>
  )
}
