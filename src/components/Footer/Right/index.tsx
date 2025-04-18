import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useFileOp } from '@/lib/Hooks/useFileOp'
import { useFileTab } from '@/lib/Hooks/useFileTab'
import { formatFileSize } from '@/lib/Utils/File'

function Right() {
   const { selectedFile } = useFileTab()
   const { getFile } = useFileOp()

   const [file, setFile] = useState<File | null>(null)

   useEffect(() => {
      if (!selectedFile) return;
      (async () => {
         const fetchedFile = await getFile(selectedFile.path)
         if (!fetchedFile) return;
         setFile(fetchedFile)
      })()
   }, [selectedFile, getFile])

   return (
      <div className={styles.container}>

      </div>
   )
}

export default Right