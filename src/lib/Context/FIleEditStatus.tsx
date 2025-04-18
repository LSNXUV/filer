import { createContext, useCallback, useContext, useMemo, useState } from "react"

export enum FileEditStatus {
  unSaved = 'unSaved',
  saved = 'saved',
  notSave = 'notSave',
}

export type FileEditStatusObject = {
  status: FileEditStatus,
  save?: () => Promise<void>,
}

export type FileEditStatusCtxType = {
  /** 获取文件编辑状态 */
  getFileEditStatus: (filePath: string) => FileEditStatusObject,
  /** 设置文件编辑状态 */
  setFileEditStatus: (filePath: string, statusObject: FileEditStatusObject) => void
}

export const FileEditStatusCtx = createContext<FileEditStatusCtxType>({
  getFileEditStatus: () => ({
    status: FileEditStatus.saved
  }),
  setFileEditStatus: () => { },
})

type FileEditStatusType = {
  [key: string]: FileEditStatusObject
}

export const FileEditStatusProvider = ({ children }: { children: React.ReactNode }) => {
  // 文件编辑状态
  const [fileEditStatus, setfileEditStatus] = useState<FileEditStatusType>({})

  const setFileEditStatus: FileEditStatusCtxType['setFileEditStatus'] = useCallback((filePath, statusObject) => {
    setfileEditStatus(prevStatus => {
      const prev = prevStatus[filePath];
      // 状态为未保存 -> 已保存：调用保存函数并移除该文件状态
      if (prev?.status === FileEditStatus.unSaved && statusObject.status === FileEditStatus.saved) {
        prev.save?.();
        const { [filePath]: _, ...rest } = prevStatus;  //解构赋值移除该文件状态
        return rest;
      }
      // 状态为不保存：直接移除该文件状态
      if (statusObject.status === FileEditStatus.notSave) {
        const { [filePath]: _, ...rest } = prevStatus;  //解构赋值移除该文件状态
        return rest;
      }
      // 其他情况：更新状态
      return { ...prevStatus, [filePath]: statusObject };
    });
  }, []);


  // 获取文件编辑状态
  const getFileEditStatus = useCallback((filePath: string) => {
    return fileEditStatus[filePath] || { status: FileEditStatus.saved }
  }, [fileEditStatus])

  const fileEditStatusValue = useMemo<FileEditStatusCtxType>(() => ({
    getFileEditStatus,
    setFileEditStatus,
  }), [getFileEditStatus, setFileEditStatus])

  return (
    <FileEditStatusCtx.Provider value={fileEditStatusValue}>
      {children}
    </FileEditStatusCtx.Provider>
  )
}

export function useFileEditStatus() {
  const context = useContext(FileEditStatusCtx)
  if (!context) {
    throw new Error('useFileEditStatus must be used within a FileEditStatusCtxProvider')
  }
  return context
}