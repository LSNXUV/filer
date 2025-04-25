
import { useLang } from '@/lib/Context/Lang'
import { useMessage } from '@/lib/Context/Message'
import { useSingleInput } from '@/lib/Context/SingleInput'
import { useFileOp } from '@/lib/Hooks/Files/useFileOp'

import styles from './index.module.scss'
import { memo, useCallback, useEffect } from 'react'
import FileIcon from '@/components/Icons/File/File'
import { backPath } from '@/lib/Utils/File'
import { dirNamePattern, fileNamePattern } from '@/lib/Config/File/regex'
import { MessageType } from '@/components/public/Message/Message'

const DirMenu = memo(function DirMenu({ isTop, file, toggle, dirToggle }: {
    isTop: boolean, //是否为顶层目录
    file: Files,
    toggle: () => void,
    dirToggle: (is?: boolean) => void,
}) {
    const { Lang } = useLang();
    const { showMessage } = useMessage()
    const { showSingleInput } = useSingleInput()

    const { deleteFile, openFileInExplorer, createFile } = useFileOp()

    const createByName = useCallback(async function createByName(value: string, type: FileSystemHandleKind) {
        const res = await createFile(value, file.path, type)
        showMessage(
            res.reason ||
                type === 'file'
                ? Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.message.createFile
                : Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.message.createDir,
            res.bool,
        )
    }, [createFile, file.path, Lang, showMessage])

    const handleCreateFile = useCallback(() => {
        showSingleInput({
            pattern: fileNamePattern,
            max: 20,
            defaultValue: '',
            title: Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.handleCreateFile.singleInput.title,
            info: (value) => {
                return (
                    <>
                        <span>{`${file.path}/${value}`}</span>
                        <span>{value && <FileIcon name={value} />}</span>
                    </>
                )
            },
            handle: (v: string) => createByName(v, 'file')
        })
        toggle()
        dirToggle(true)
    }, [dirToggle, toggle, showSingleInput, Lang, createByName, file.path])

    const handleCreateDir = useCallback(() => {
        showSingleInput({
            pattern: dirNamePattern,
            defaultValue: '',
            title: Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.handleCreateDir.singleInput.title,
            info: (value) => {
                return (
                    <>
                        {`${file.path}/`}
                        {value}
                    </>
                )
            },
            handle: (v: string) => createByName(v, 'directory')
        }
        )
        toggle()
        dirToggle(true)
    }, [dirToggle, toggle, showSingleInput, Lang, createByName, file.path])

    const handleOpenDirInExplorer = useCallback(() => {
        openFileInExplorer(file)
        toggle()
    }, [openFileInExplorer, file, toggle])

    const handleDeleteFile = useCallback(() => {
        deleteFile(file).then(res => {
            showMessage(
                Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.message.delete,
                res ? MessageType.success : MessageType.info,
            )
            toggle()
        })
    }, [toggle, deleteFile, file, showMessage, Lang])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {

        // 由于navigator.platform被认为过时，我们使用navigator.userAgent来检测是否为Mac
        // const userAgent = navigator.userAgent;
        // const isMac = userAgent.includes('Macintosh');

        if (!event.shiftKey && event.altKey && (event.key.toLowerCase() === 'n' || event.code === 'KeyN')) {
            handleCreateFile()
        }
        if (event.shiftKey && event.altKey && (event.key.toLowerCase() === 'n' || event.code === 'KeyN')) {
            handleCreateDir()
        }
        if (event.shiftKey && event.altKey && ((event.key.toLowerCase() === 'e' || event.code === 'KeyE') || (event.key.toLowerCase() === 'x' || event.code === 'KeyX'))) {
            handleOpenDirInExplorer()
        }
        if (event.key === 'Delete') {
            handleDeleteFile()
        }
    }, [handleCreateFile, handleCreateDir, handleOpenDirInExplorer, handleDeleteFile]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={`bar ${styles.menu}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <div onClick={handleCreateFile}>
                {Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.createFile}
                <span>
                    Alt + N
                </span>
            </div>
            <div onClick={handleCreateDir}>
                {Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.createDir}
                <span>
                    Shift + Alt + N
                </span>
            </div>
            <div onClick={handleOpenDirInExplorer}>
                {Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.openDirInExplorer}
                <span>
                    Shift + Alt + E / X
                </span>
            </div>
            {!isTop && (<div onClick={handleDeleteFile}>
                {Lang.FileExploer.Sider.FileTree.Tree.Dir.DirMenu.delete}
                <span>
                    Delete
                </span>
            </div>)}
        </div>
    )
})

DirMenu.displayName = 'DirMenu'

export default DirMenu