import { useCallback, useMemo } from "react";
import { useConfirm } from "../../Context/Confirm";
import { useFiles } from "../../Context/File";
import { useLang } from "../../Context/Lang";
import { backPath } from "../../Utils/File";

import { useFileTab } from "../Tabs/useFileTab";

export type FileOp = {
    /** 新建文件/目录 */
    createFile: (name: string, path: string, type: FileSystemHandleKind) => Promise<{ bool: boolean, reason?: string }>

    /** 删除文件/目录 */
    deleteFile: (file: Files, confirmShow?: boolean) => Promise<boolean>

    /** 更新文件内容 */
    updateFile: (file: Files, text: string) => Promise<boolean>

    /** 重命名文件 */
    renameFile: (file: Files, name: string) => Promise<boolean>

    /**
     * 在资源管理器中打开文件
     * ---因浏览器策略，暂不支持
    */
    openFileInExplorer: (file: Files) => void
}

export function useFileOp() {
    const { Lang } = useLang();
    const { confirm, alert } = useConfirm();

    const { closeFile } = useFileTab()

    const { loadFilesAndHandles, getDirHandle, getFileHandle } = useFiles()

    const createFile: FileOp['createFile'] = useCallback(async (name, path, type) => {
        const dirHandle = await getDirHandle(path);
        if (!dirHandle) {
            console.error('createFile error: dirHandle is null')
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
        await loadFilesAndHandles({ path });
        return {
            bool: true
        }
    }, [Lang, getDirHandle, loadFilesAndHandles])

    const updateFile: FileOp['updateFile'] = useCallback(async (file, text) => {
        const fileHandle = await getFileHandle(file.path)
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

    const deleteFile: FileOp['deleteFile'] = useCallback(async (file, confirmShow = true) => {
        const dirHandle = await getDirHandle(backPath(file.path));
        if (!dirHandle) {
            return true
        }
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
            await loadFilesAndHandles({ path: backPath(file.path) });

            return true;
        } catch (error) {
            console.error(Lang.Lib.Hooks.useFileOp.log.deleteFileError, error);
            return false;
        }
    }, [Lang, getDirHandle, loadFilesAndHandles, closeFile, confirm])

    const renameFile: FileOp['renameFile'] = useCallback(async (file, name) => {
        if (name === file.name) return true;
        if (file.kind === 'file') {
            try {
                const fileHandle = await getFileHandle(file.path);
                if (!fileHandle) {
                    return false;
                }
                const dirHandle = await getDirHandle(backPath(file.path));
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
    }, [deleteFile, getFileHandle, getDirHandle])

    const openFileInExplorer: FileOp['openFileInExplorer'] = useCallback((file) => {
        alert({
            info: Lang.Lib.Hooks.useFileOp.openFileInExplorer.notSupport
        });
    }, [Lang, alert])

    const fileOp = useMemo<FileOp>(() => {
        return {
            createFile,
            deleteFile,
            updateFile,
            renameFile,
            openFileInExplorer,
        }
    }, [createFile, deleteFile, updateFile, renameFile, openFileInExplorer])
    return fileOp;
}