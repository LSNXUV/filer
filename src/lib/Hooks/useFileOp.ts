import { useCallback } from "react";
import { useConfirm } from "../Context/Confirm";
import { useFiles } from "../Context/File";
import { useLang } from "../Context/Lang";
import { backPath } from "../Utils/File";

import { useTabOp } from "./useTabOp";

export function useFileOp(): {
    /**
     * 添加文件
     * @param name 
     * @param path
     * @param {FileSystemHandleKind} type
     */
    createFile: (name: string, path: string, type: FileSystemHandleKind) => Promise<{
        bool: boolean,
        reason?: string
    }>

    /**
     * 删除文件
     * @param file 
     * @returns 
     */
    deleteFile: (file: Files, confirmShow?: boolean) => Promise<boolean>

    /**
     * 更新文件
     * @param file 
     * @param text 
     * @returns 
     */
    updateFile: (file: Files, text: string) => Promise<boolean>

    /**
     * 重命名文件
     * @param file 
     * @param name 
     * @returns 
     */
    renameFile: (file: Files, name: string) => Promise<boolean>

    /**
     * 在资源管理器中打开文件
     * ---因浏览器策略，暂不支持
     * @param file 
     * @returns 
     */
    openFileInExplorer: (file: Files) => void

    /**
     * 
     * @param path 文件路径
     * @returns File 文件File对象
     */
    getFile: (path: string) => Promise<File | undefined>

    /**
     * 
     * @param path 文件路径
     * @returns 文本内容
     */
    getFileText: (path: string) => Promise<string | undefined>

    /**
     * 
     * @param path 文件路径
     * @returns url 文件访问url
     */
    getFileUrl: (path: string) => Promise<string>

} {
    const { Lang } = useLang();
    const { confirm, alert } = useConfirm();

    const { closeFile } = useTabOp()

    const { loadFilesAndHandles, getDirHandle, getFileHandle } = useFiles()


    const deleteFile = useCallback(async (file: Files, confirmShow: boolean = true) => {
        const dirHandle = getDirHandle(backPath(file.path)) as FileSystemDirectoryHandle;
        try {
            if (confirmShow && !(await confirm({
                info: Lang.Lib.Hooks.useFileOp.deleteFile.confirm.tip,
            }))) {
                return false;
            }
            await dirHandle.removeEntry(
                file.name,
                { recursive: true }
            )
            closeFile(file);
            //重新加载文件
            await loadFilesAndHandles({ dirHandle, path: backPath(file.path) });

            return true;
        } catch (error) {
            console.error(Lang.Lib.Hooks.useFileOp.log.deleteFileError, error);
            return false;
        }
    }, [Lang, getDirHandle, loadFilesAndHandles, closeFile, confirm])

    const renameFile = useCallback(async (file: Files, name: string) => {
        if (name === file.name) return true;
        if (file.kind === 'file') {
            try {
                const fileHandle = getFileHandle(file.path);
                if (!fileHandle) {
                    return false;
                }
                const dirHandle = getDirHandle(backPath(file.path));
                if (!dirHandle) {
                    return false;
                }
                // 先创建
                const newHandle = await dirHandle.getFileHandle(name, { create: true });
                // 在写入
                await fileHandle.getFile().then(async (file) => {
                    const writable = await newHandle.createWritable();
                    await writable.write(file);
                    await writable.close();
                });
                await deleteFile(file, false);

                return true;
            } catch (error) {
                console.error('renameFile', error);
                return false;
            }
        } else {
            // 需要递归新建所有子文件夹和文件，太麻烦，难得做了
        }
        return true;
    }, [deleteFile, getFileHandle, getDirHandle, loadFilesAndHandles])

    const openFileInExplorer = useCallback((file: Files) => {
        alert({
            info: Lang.Lib.Hooks.useFileOp.openFileInExplorer.notSupport
        });
    }, [Lang, alert])

    const createFile = useCallback(async (name: string, path: string, type: FileSystemHandleKind): Promise<{ bool: boolean, reason?: string }> => {
        const dirHandle = getDirHandle(path) as FileSystemDirectoryHandle;
        if (!dirHandle) {
            console.log('error', dirHandle)
            return {
                bool: false,
                reason: Lang.Lib.Hooks.useFileOp.createFile.reason.handleNotExist
            };
        }
        try {
            if (type === 'directory') {
                await dirHandle.getDirectoryHandle(name, { create: true });
            } else {
                await dirHandle.getFileHandle(name, { create: true });
            }
        } catch (error) {
            console.error(Lang.Lib.Hooks.useFileOp.log.createFileError, error);
            return {
                bool: false,
                reason: Lang.Lib.Hooks.useFileOp.createFile.reason.repeat
            }
        }
        await loadFilesAndHandles({ dirHandle, path });
        return {
            bool: true
        }
    }, [Lang, getDirHandle, loadFilesAndHandles])

    const getFile = useCallback(async (path: string): Promise<File | undefined> => {
        const fileHandle = getFileHandle(path)
        // if(!fileHandle) return
        return await fileHandle?.getFile()
    }, [getFileHandle])

    const getFileText = useCallback(async (path: string): Promise<string | undefined> => {
        const file = await getFile(path)
        if (!file) return;
        return await file.text()
    }, [getFile])

    const getFileUrl = useCallback(async (path: string) => {
        const file = await getFile(path)
        if (!file) {
            return ""
        }
        return URL.createObjectURL(file)
    }, [getFile])

    const updateFile = useCallback(async (file: Files, text: string) => {
        const fileHandle = getFileHandle(file.path)
        if (!fileHandle) return false
        try {
            const newFile = new File([text], file.name, {
                type: file.type,
                lastModified: Date.now()
            });

            const writable = await fileHandle.createWritable({ keepExistingData: false });
            await writable.write(newFile);
            await writable.close();

            return true
        } catch (error) {
            console.error(Lang.FileExploer.Content.Show.Editor.log.updateError, error);
            return false
        }
    }, [Lang, getFileHandle]);

    // console.log('useFileOp render!!!!!')
    return {
        createFile,
        deleteFile,
        updateFile,
        renameFile,
        openFileInExplorer,
        getFile, getFileUrl, getFileText
    }
}