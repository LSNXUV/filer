import { useState, useEffect } from "react"
import { useSelectedFile } from "../Tabs/useSelectedFile"
import { useFileEntry } from "./useFileEntry"

/** 获取当前选中的文件entry信息 */
export default function useSelectedFileEntry() {
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

    return file
}