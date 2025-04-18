
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { processHandle, showDirectoryPicker } from '@/lib/Utils/DirectoryPicker';
import { useLang } from './Lang';
import { backPath, queryFileHandlePermission, requestFileHandlePermission, verifyFileHandlePermission } from '@/lib/Utils/File';
import { useConfirm } from './Confirm';
import { useMessage } from './Message';
import { getRootDirectoryHandle, removeRootDirectoryHandle, saveRootDirectoryHandle } from '../Utils/IDB/fsHandle';
import { get } from 'http';

type FilerCtx = {
    hasFiles: boolean,
    loading: boolean,
    files: Files | null;

    getFileHandle: (path: string) => Promise<FileSystemFileHandle | undefined>;
    getDirHandle: (path: string) => Promise<FileSystemDirectoryHandle | undefined>;

    loadFilesAndHandles: (options?: { dirHandle?: FileSystemDirectoryHandle, path?: string }) => Promise<void>;
    openDirectoryPicker: () => Promise<void>;
    resetDirectoryPicker: () => void;

}

const FilesCtx = createContext<FilerCtx | null>(null);

export function FilesProvider({ children }: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { Lang } = useLang();
    const { alert, confirm } = useConfirm()
    const { showMessage } = useMessage()

    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState<Files | null>(null); //文件列表
    const [rootDirHandle, setRootDirHandle] = useState<FileSystemDirectoryHandle | null>(null); //根目录句柄

    // 获取目录句柄
    const getDirHandle = useCallback(async (path: string) => {
        if (!rootDirHandle) return;
        const paths = path.split('/');
        paths.shift(); // 去掉第一个(根目录)
        let handle = rootDirHandle;
        for (let i = 0; i < paths.length; i++) {
            handle = await handle.getDirectoryHandle(paths[i]);
            if (!handle) return;
        }
        return handle;
    }, [rootDirHandle]);

    // 获取文件句柄
    const getFileHandle = useCallback(async (path: string) => {
        const dirHandle = await getDirHandle(backPath(path));
        if (!dirHandle) return;
        return dirHandle.getFileHandle(path.split('/').pop() || '');
    }, [getDirHandle]);

    // 加载文件夹句柄
    const loadFilesAndHandles = useCallback(async function loadFilesAndHandles({ dirHandle, path }: {
        /** 根目录句柄 */
        dirHandle?: FileSystemDirectoryHandle,
        /** 更新子目录时使用 */
        path?: string,
    } = {}) {
        const Files = files; // 如果传入了oldFiles，则使用传入的oldFiles，否则使用当前的files
        if (dirHandle) {        // 如果传入了dirHandle，代表根目录
            setRootDirHandle(dirHandle); // 设置根目录句柄
        } else {                // 如果没有传入dirHandle, 代表更新目录句柄
            if (!path) {   // 如果没传入path，则更新根目录句柄
                if (!Files) {
                    console.error(Lang.Lib.Context.File.loadFilesAndHandles.notExist);
                    return
                }
                dirHandle = await getDirHandle(Files.path) as FileSystemDirectoryHandle;

            } else {       //如果传入path, 代表更新该path的子目录句柄
                dirHandle = await getDirHandle(path) as FileSystemDirectoryHandle;
            }
            if (!dirHandle) return; // 如果没有获取到句柄，则返回
        }

        // 获取新文件树
        const newFiles = await processHandle(
            dirHandle,
            path ? backPath(path) : '', // 当前目录句柄的父目录路径
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

        console.log(
            Lang.Lib.Context.File.loadFilesAndHandles.files,
            newFiles
        );
    }, [Lang, files, getDirHandle])

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
        setRootDirHandle(null); // 重置根目录句柄
        removeRootDirectoryHandle(); // 删除根目录句柄
    }, [])

    useEffect(() => {
        (async () => {
            const rootDirHandle = await getRootDirectoryHandle();
            if (rootDirHandle) {
                
                // 如果没权限，需要强行引导交互，这样才能请求权限
                if(!await queryFileHandlePermission(rootDirHandle) && !await confirm({
                    info: <span>{Lang.Lib.Context.File.permission.isLoadingSavedDirHandle} <span style={{color: 'skyblue'}}>{rootDirHandle.name} </span>?</span>,
                })) return;
                // 如果没有权限，则请求权限
                if (!await requestFileHandlePermission(rootDirHandle)) return;

                setLoading(true);
                // 保存根句柄
                setRootDirHandle(rootDirHandle);
                // 加载文件树
                const newFiles = await processHandle(rootDirHandle, '');
                setFiles(newFiles);

                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (rootDirHandle) {
            saveRootDirectoryHandle(rootDirHandle);
        }
    }, [rootDirHandle])

    return (
        <FilesCtx value={{
            hasFiles: !!files,
            loading,
            files,
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
