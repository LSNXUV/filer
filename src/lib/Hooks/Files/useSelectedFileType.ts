import { supportTextExt } from "@/lib/Config/File/ext";
import { useSelectedFile } from "../Tabs/useSelectedFile";
import { getFileExtension } from "@/lib/Utils/File";
import { useMemo } from "react";

type SelectedFileType = {
    /** 当前选中的文件,是否是文本文件 */
    isText: boolean
}
export function useSelectedFileType() {
    const selectedFile = useSelectedFile()

    const value = useMemo<SelectedFileType>(() => {
        return {
            isText: selectedFile ? supportTextExt.includes(getFileExtension(selectedFile.name)) : false
        }
    }, [selectedFile])
    return value;
}