import React, { } from 'react'
import styles from './index.module.scss'
import { formatFileSize } from '@/lib/Utils/File'
import useSelectedFileEntry from '@/lib/Hooks/Files/useSelectedFileEntry'
import { useLang } from '@/lib/Context/Lang'

function Left() {

  const { Lang } = useLang()

  const file = useSelectedFileEntry()

  return (
    <div className={styles.container}>
      {
        file && (
          <div className={styles.fileInfo}>
            <div className={styles.fileDate}>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.lastModified} {new Date(file.lastModified).toLocaleString()}</div>
            <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
            {file.type && <div className={styles.fileType}>{file.type}</div>}
          </div>
        )
      }
    </div>
  )
}

export default Left