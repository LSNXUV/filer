import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useFileOp } from '@/lib/Hooks/Tabs/useFileOp'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'

function Right() {
   const selectedFile = useSelectedFile()

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