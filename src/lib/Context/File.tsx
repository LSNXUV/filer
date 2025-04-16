
import React, { createContext, useCallback, useContext, useState } from 'react';
import { processHandle, showDirectoryPicker } from '@/lib/Utils/DirectoryPicker';
import { useLang } from './Lang';
import { backPath } from '@/lib/Utils/File';
import { useConfirm } from './Confirm';
import { useMessage } from './Message';

type FilerCtx = {
    hasFiles: boolean,
    loading: boolean,
    files: Files | null;

    tabs: Files[];
    setTabs: React.Dispatch<React.SetStateAction<Files[]>>;
    select: number;
    setSelect: React.Dispatch<React.SetStateAction<number>>;

    getFileHandle: (path: string) => FileSystemFileHandle | undefined;
    getDirHandle: (path: string) => FileSystemDirectoryHandle | undefined;

    loadFilesAndHandles: (options?: { dirHandle?: FileSystemDirectoryHandle, path?: string }) => Promise<void>;
    openDirectoryPicker: () => Promise<void>;
    resetDirectoryPicker: () => void;

}

const FilesCtx = createContext<FilerCtx | null>(null);

export function FilesProvider({ children }: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { Lang } = useLang();
    const { alert } = useConfirm()
    const { showMessage } = useMessage()

    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<Files | null>(null); //文件列表
    const [tabs, setTabs] = useState<Files[]>([]) //内容展示区域的文件些
    const [fileHandles, setFileHandles] = useState<Map<string, FileSystemFileHandle>>(new Map());   //文件句柄
    const [dirHandles, setDirHandles] = useState<Map<string, FileSystemDirectoryHandle>>(new Map());   //文件夹句柄
    const [select, setSelect] = useState<number>(-1) //当前选中的文件索引

    const getFileHandle = useCallback((path: string) => {
        return fileHandles.get(path);
    }, [fileHandles])

    const getDirHandle = useCallback((path: string) => {
        return dirHandles.get(path);
    }, [dirHandles])


    // 加载文件夹句柄
    const loadFilesAndHandles = useCallback(async function loadFilesAndHandles({ dirHandle, path }: {
        dirHandle?: FileSystemDirectoryHandle,
        /** 更新子目录时使用 */
        path?: string
    } = {}) {
        if (!dirHandle) {     // 如果没传入dirHandle,则根据path获取文件夹句柄
            if (!path) {      //如果没有传入path,则使用根路径的文件夹句柄
                if (!files) {
                    console.error(Lang.Lib.Context.File.loadFilesAndHandles.notExist);
                    return
                }
                // 获取当前根路径的文件夹句柄
                dirHandle = getDirHandle(files.path) as FileSystemDirectoryHandle;
            } else {          //如果传入path,则使用传入的文件夹句柄
                //path如果是根目录，backPath(path) || path
                dirHandle = getDirHandle(path) as FileSystemDirectoryHandle;
            }
        }

        // 保存文件句柄
        const newFileHandles = new Map<string, FileSystemFileHandle>()
        // 保存文件夹句柄
        const newDirHandles = new Map<string, FileSystemDirectoryHandle>();
        // 保存文件树
        const newFiles = await processHandle(
            dirHandle,
            path ? backPath(path) : '', // 当前目录句柄的父目录路径
            newFileHandles, newDirHandles
        );


        setFiles((rootFiles) => {
            // 如果不是根目录，则是更新子目录
            if (rootFiles && rootFiles.path !== newFiles.path) {
                const paths = newFiles.path.split('/');
                if (paths.length > 1) {
                    let dir = rootFiles;
                    let depth = 1;
                    while (depth < paths.length - 1) {
                        dir = dir.children.filter((item) => {
                            return item.kind === 'directory' && item.name === paths[depth]
                        })[0] as Files;
                        depth++;
                    }
                    dir.children = dir.children.map(((item) => {
                        if (item.kind === 'directory' && item.name === paths[depth]) {
                            return newFiles;
                        } else {
                            return item;
                        }
                    }))
                    return { ...rootFiles }
                }
            }
            return newFiles
        });
        //合并Map
        setFileHandles((pres) => {
            newFileHandles.forEach((value, key) => {
                pres.set(key, value);
            });
            return pres
        });
        //合并Map
        setDirHandles((pres) => {
            newDirHandles.forEach((value, key) => {
                pres.set(key, value);
            });
            return pres
        });

        console.log(
            Lang.Lib.Context.File.loadFilesAndHandles.files,
            newFiles,
            Lang.Lib.Context.File.loadFilesAndHandles.fileHandles,
            newFileHandles,
            Lang.Lib.Context.File.loadFilesAndHandles.dirHandles,
            newDirHandles
        );
    }, [Lang, files, dirHandles, getDirHandle])

    // 打开文件夹选择器,并处理文件
    const openDirectoryPicker = useCallback(async function openDirectoryPicker() {
        await showDirectoryPicker(
            async (dirHandle) => {
                if (typeof dirHandle === 'boolean') {
                    alert({
                        info: Lang.Lib.Context.File.openDirectoryPicker.notSupport,
                    });
                } else {
                    if (!dirHandle) return;  // 用户取消
                    setLoading(true)
                    await loadFilesAndHandles({ dirHandle });
                    setLoading(false)
                    showMessage(
                        Lang.Lib.Context.File.selectFolder,
                        true
                    )
                }
            },
            (err) => {
                console.info(err, Lang.Lib.Fun.DirectoryPicker.showDirectoryPicker.userCancle);
            }
        );
    }, [Lang, alert, loadFilesAndHandles])

    // 重置文件选择器
    const resetDirectoryPicker = useCallback(function resetDirectoryPicker() {
        setFiles(null);
        setFileHandles(new Map());
        setTabs([]);
        setSelect(-1);
    }, [])

    // console.log('useFiles render!!')
    return (
        <FilesCtx value={{
            hasFiles: !!files,
            loading,
            files,
            tabs, setTabs,
            select, setSelect,
            getFileHandle,
            getDirHandle,
            loadFilesAndHandles,
            openDirectoryPicker, resetDirectoryPicker,
        }}>
            {children}
        </FilesCtx>
    )
}

export function useFiles() {
    const ctx = useContext(FilesCtx);
    if (!ctx) {
        throw new Error('useFiles must be used within a FilesProvider');
    }
    return ctx;
}
