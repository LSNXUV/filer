import { useCallback, useMemo } from "react";
import { useFiles } from "../../Context/File";

export type FileEntry = {
    /** 获取文件File对象 */
    getFile: (path: string) => Promise<File | undefined>

    /** 获取文本文件内容 */
    getFileText: (path: string) => Promise<string | undefined>

    /** 获取文件访问url */
    getFileUrl: (path: string) => Promise<string>
}

export function useFileEntry() {

    const { getFileHandle } = useFiles()

    const getFile: FileEntry['getFile'] = useCallback(async (path) => {
        const fileHandle = await getFileHandle(path)
        return await fileHandle?.getFile()
    }, [getFileHandle])

    const getFileText: FileEntry['getFileText'] = useCallback(async (path) => {
        const file = await getFile(path)
        if (!file) return;
        return await file.text()
    }, [getFile])

    const getFileUrl: FileEntry['getFileUrl'] = useCallback(async (path) => {
        const file = await getFile(path)
        if (!file) {
            return ""
        }
        return URL.createObjectURL(file)
    }, [getFile])

    const fileEntry = useMemo<FileEntry>(() => {
        return {
            getFile, getFileUrl, getFileText
        }
    }, [getFile, getFileUrl, getFileText])
    return fileEntry;
}