
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { processHandle, showDirectoryPicker } from '@/lib/Utils/DirectoryPicker';
import { useLang } from './Lang';
import { backPath, queryFileHandlePermission, requestFileHandlePermission } from '@/lib/Utils/File';
import { useConfirm } from './Confirm';
import { useMessage } from './Message';
import { getRootDirectoryHandle, removeRootDirectoryHandle, saveRootDirectoryHandle } from '../Utils/IDB/fsHandle';
import { useCloseTabs } from '../Hooks/Tabs/useCloseTabs';

type FilerCtx = {
    /** 是否有根文件树 */
    hasFiles: boolean,
    /** 是否正在加载文件树 */
    loading: boolean,
    /** 根文件树 */
    files: Files | null;
    /** 通过path获取文件句柄 */
    getFileHandle: (path: string) => Promise<FileSystemFileHandle | undefined>;
    /** 通过path获取目录句柄 */
    getDirHandle: (path: string) => Promise<FileSystemDirectoryHandle | undefined>;
    /** 加载文件树和句柄 */
    loadFilesAndHandles: (options?: { dirHandle?: FileSystemDirectoryHandle, path?: string }) => Promise<void>;
    /** 打开用户本地文件目录选择器，选择以初始化 */
    openDirectoryPicker: () => Promise<void>;
    /** 重置文件树, callback最后执行 */
    resetDirectoryPicker: (callback?: () => void) => void;
}

const FilesCtx = createContext<FilerCtx | null>(null);

export function FilesProvider({ children }: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { closeAll } = useCloseTabs()
    const { Lang } = useLang();
    const { alert, confirm } = useConfirm()
    const { showMessage } = useMessage()

    const [loading, setLoading] = useState(false)

    //文件树
    const [files, setFiles] = useState<Files | null>(null);
    //根目录句柄
    const [rootDirHandle, setRootDirHandle] = useState<FileSystemDirectoryHandle | null>(null);

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
                        description: Lang.Lib.Context.File.openDirectoryPicker.notSupport,
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
                showMessage(
                    Lang.Lib.Fun.DirectoryPicker.notSupport,
                    false
                );
            }
        );
    }, [Lang, alert, loadFilesAndHandles, showMessage]);

    // 重置文件选择器
    const resetDirectoryPicker: FilerCtx['resetDirectoryPicker'] = useCallback((callback) => {
        // 关闭所有tab
        closeAll(function closeCallback() {
            // 关闭所有tab之后才:
            setFiles(null);
            setRootDirHandle(null); // 重置根目录句柄
            removeRootDirectoryHandle(); // 删除根目录句柄
            callback?.();
        });
    }, [closeAll]);

    const isInitRef = useRef(false);
    useEffect(() => {
        if (isInitRef.current) return; // 如果已经初始化过了，则不再执行
        (async () => {
            const rootDirHandle = await getRootDirectoryHandle();
            console.log(rootDirHandle, 'rootDirHandle');
            if (rootDirHandle) {

                // 如果没权限，需要强行引导交互，这样才能请求权限
                if (!await queryFileHandlePermission(rootDirHandle) && !await confirm({
                    description: <span>{Lang.Lib.Context.File.permission.isLoadingSavedDirHandle} <span style={{ color: '#45aeff' }}>{rootDirHandle.name} </span>?</span>,
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
                isInitRef.current = true; // 标记为已初始化
            }
        })();
    }, [Lang, confirm]);

    useEffect(() => {
        if (rootDirHandle) {
            saveRootDirectoryHandle(rootDirHandle);
        }
    }, [rootDirHandle])

    const fileContextValue = useMemo<FilerCtx>(() => ({
        hasFiles: !!files,
        loading,
        files,
        getFileHandle,
        getDirHandle,
        loadFilesAndHandles,
        openDirectoryPicker,
        resetDirectoryPicker,
    }), [files, loading, getFileHandle, getDirHandle, loadFilesAndHandles, openDirectoryPicker, resetDirectoryPicker])

    return (
        <FilesCtx value={fileContextValue}>
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
