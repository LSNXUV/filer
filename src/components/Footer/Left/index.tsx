import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { formatFileSize } from '@/lib/Utils/File'
import { useLang } from '@/lib/Context/Lang'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry'

function Left() {
  const { Lang } = useLang()

  const selectedFile = useSelectedFile()

  const { getFile } = useFileEntry()

  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (!selectedFile) {
      setFile(null)
      return;
    }
    (async () => {
      const fetchedFile = await getFile(selectedFile.path)
      if (!fetchedFile) return;
      setFile(fetchedFile)
    })()
  }, [selectedFile, getFile])

  return (
    <div className={styles.container}>
      {
        file && (
          <div className={styles.fileInfo}>
            <div className={styles.fileDate}>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.lastModified} {new Date(file.lastModified).toLocaleString()}</div>
            <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
            <div className={styles.fileName}>{file.name}</div>
            {file.type && <div className={styles.fileType}>{file.type}</div>}
          </div>
        )
      }
    </div>
  )
}

export default Left