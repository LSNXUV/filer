
import styles from './index.module.scss'
import ShowFile from './Show/index'
import BreadCrumbs from './BreadCrumbs/index'
import Tabs from './Tabs/index'
import InitContent from './InitContent'
import { useTabOp } from '@/lib/Hooks/useTabOp'
import { useFiles } from '@/lib/Context/File'
import { useCallback, useEffect, useState } from 'react'
import { FileEditStatus, FileEditStatusCtx, FileEditStatusCtxType, FileEditStatusObject } from '@/lib/Context/FIleEditStatus'

type FileEditStatusType = {
  [key: string]: FileEditStatusObject
}

export default function Content() {
  const { tabs } = useFiles()
  const { selectedFile } = useTabOp()

  // 文件编辑状态
  const [fileEditStatus, setfileEditStatus] = useState<FileEditStatusType>({})

  // 设置文件编辑状态
  const setFileEditStatus: FileEditStatusCtxType['setFileEditStatus'] = useCallback((filePath, statusObject) => {
    setfileEditStatus(
      prevStatus => {
        // 如果之前是未保存状态，当前是设置已保存状态，则调用保存方法
        if (prevStatus[filePath] && prevStatus[filePath].status === FileEditStatus.unSaved && statusObject.status === FileEditStatus.saved) {
          prevStatus[filePath].save?.()
          const newStatus = { ...prevStatus }
          delete newStatus[filePath] // 删除文件编辑对象
          return newStatus;
        }
        // 如果设置不保存状态，则删除文件编辑对象
        if (statusObject.status === FileEditStatus.notSave) {
          const newStatus = { ...prevStatus }
          delete newStatus[filePath] // 删除文件编辑对象
          return newStatus;
        }
        return { ...prevStatus, [filePath]: statusObject }
      });
  }, [])

  // 获取文件编辑状态
  const getFileEditStatus = useCallback((filePath: string) => {
    return fileEditStatus[filePath] || FileEditStatus.saved
  }, [fileEditStatus])

  return (
    <FileEditStatusCtx value={{ getFileEditStatus, setFileEditStatus }}>
      <div className={styles.container}>
        {
          !selectedFile
            ? <InitContent />
            : <>
              <Tabs />
              <BreadCrumbs path={selectedFile.path} />
              {
                tabs.map((file, _) => {
                  return (
                    <ShowFile key={file.path} file={file} show={selectedFile.path === file.path} />
                  )
                })
              }
            </>
        }

      </div>
    </FileEditStatusCtx>
  )
}