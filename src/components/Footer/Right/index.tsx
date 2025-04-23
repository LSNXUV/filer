import React, { } from 'react'
import styles from './index.module.scss'
import useSelectedFileEntry from '@/lib/Hooks/Files/useSelectedFileEntry'
import { useEditorStatus } from '@/lib/Context/EditorStatus'
import { useLang } from '@/lib/Context/Lang'
import copy from '@/lib/Utils/copy'
import { useMessage } from '@/lib/Context/Message'
import { useSelectedFileType } from '@/lib/Hooks/Files/useSelectedFileType'

function Right() {
   const { Lang } = useLang()
   const { showMessage } = useMessage()
   const file = useSelectedFileEntry()
   const { isText } = useSelectedFileType()
   const { position, tabSize, gotoPosition, openCommand } = useEditorStatus()

   return (
      <div className={styles.container}>

         {file && (
            <>
               {
                  isText &&
                  <div className={styles.editor}>
                     {position && <div onClick={gotoPosition} className={styles.position}>{`${Lang.FileExploer.Footer.Right.position.lineNumber} ${position.lineNumber},  ${Lang.FileExploer.Footer.Right.position.column} ${position.column}`}</div>}
                     <div className={styles.indent} onClick={() => openCommand('>indent')}>{tabSize > 0 ? '空格：' : '制表符：'}{Math.abs(tabSize)}</div>
                  </div>
               }
               <div className={styles.file}>
                  <div className={styles.name}
                     onClick={() => {
                        copy(file.name).then(() => {
                           showMessage(Lang.Global.copy.success, 'success')
                        }).catch(() => {
                           showMessage(Lang.Global.copy.fail, 'fail')
                        })
                     }}
                  >{file.name}</div>
               </div>
            </>
         )}
      </div>
   )
}

export default Right