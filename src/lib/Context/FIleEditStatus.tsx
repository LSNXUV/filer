import { createContext, useContext } from "react"

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
    getFileEditStatus: (filePath: string) => FileEditStatusObject,
    setFileEditStatus: (filePath: string, statusObject: FileEditStatusObject) => void
}

export const FileEditStatusCtx = createContext<FileEditStatusCtxType>({
    getFileEditStatus: () => ({
        status: FileEditStatus.saved
    }),
    setFileEditStatus: () => { },
})

export function useFileEditStatus() {
    const context = useContext(FileEditStatusCtx)
    if (!context) {
        throw new Error('useFileEditStatus must be used within a FileEditStatusCtxProvider')
    }
    return context
}