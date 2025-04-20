import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry'

function Right() {
   const selectedFile = useSelectedFile()

   const { getFile } = useFileEntry()

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