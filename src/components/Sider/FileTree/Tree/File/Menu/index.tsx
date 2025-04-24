import { useFiles } from '@/lib/Context/File'
import { useLang } from '@/lib/Context/Lang'
import { useMessage } from '@/lib/Context/Message'
import { useFileOp } from '@/lib/Hooks/Files/useFileOp'

import styles from './index.module.scss'
import { memo, useCallback, useEffect } from 'react'
import { useFileTab } from '@/lib/Hooks/Tabs/useFileTab'
import { useSingleInput } from '@/lib/Context/SingleInput'
import { backPath } from '@/lib/Utils/File'
import FileIcon from '@/components/Icons/File/File'
import { fileNamePattern } from '@/lib/Config/File/regex'

const FileMenu = memo(function FileMenu({ file, toggle, editToggle }: {
    file: Files,
    toggle: () => void,
    editToggle: () => void
}) {
    const { showMessage } = useMessage()
    const { Lang } = useLang();

    const { showSingleInput } = useSingleInput()

    const { deleteFile, openFileInExplorer, renameFile } = useFileOp()
    const { selectFile, closeFile, addFileToTabsRear, isFileInTab } = useFileTab()

    const handleSelectFile = useCallback(() => {
        selectFile(file)
        toggle()
    }, [selectFile, file, toggle])

    const handleCloseFile = useCallback(() => {
        closeFile(file)
        toggle()
    }, [closeFile, file, toggle])

    const handleAddFileToShowsRear = useCallback(() => {
        addFileToTabsRear(file)
        toggle()
    }, [addFileToTabsRear, file, toggle])

    const handleOpenFileInExplorer = useCallback(() => {
        openFileInExplorer(file)
        toggle()
    }, [openFileInExplorer, file, toggle])

    const handleEditToggle = useCallback(() => {
        editToggle()
        toggle()
    }, [editToggle, toggle])

    const handleRenameFile = useCallback(() => {
        const rename = async (value: string) => {
            const res = await renameFile(file, value)
            showMessage(
                Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.message.rename,
                res ? 'success' : 'info',
            )
        }
        showSingleInput({
            pattern: fileNamePattern,
            defaultValue: file.name,
            title: Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.handleRenameFile.singleInput.title,
            info: (value) => {
                return (
                    <>
                        <span>{backPath(file.path) + '/' + value}</span>
                        <span>{value && <FileIcon name={value} />}</span>
                    </>
                )
            },
            handle: (value) => rename(value)
        })
        toggle()
    }, [renameFile, file, showMessage, Lang, toggle])

    const handleDeleteFile = useCallback(async () => {
        const res = await deleteFile(file)
        showMessage(
            Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.message.delete,
            res ? 'success' : 'info',
        )
        toggle()
    }, [toggle, deleteFile, file, showMessage, Lang])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSelectFile()
        } else if (event.key === 'Escape') {
            toggle()
        } else if (event.shiftKey && event.altKey && ((event.key.toLowerCase() === 'e' || event.code === 'KeyE') || (event.key.toLowerCase() === 'x' || event.code === 'KeyX'))) {
            handleOpenFileInExplorer()
        } else if (event.key === 'Delete') {
            handleDeleteFile()
        } else if (event.key === 'F2') {
            handleEditToggle()
        }
    }, [toggle, handleSelectFile, handleDeleteFile, handleOpenFileInExplorer, handleEditToggle]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={`bar ${styles.menu}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div onClick={handleSelectFile}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.open}
                <span>
                    Left
                </span>
            </div>
            <div onClick={handleCloseFile} className={`${!isFileInTab(file) ? 'disabled' : ''}`}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.close}
                <span>
                    Mid
                </span>
            </div>
            <div onClick={handleAddFileToShowsRear}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.addToShowsRear}
                <span>
                    Mid
                </span>
            </div>
            <div onClick={handleOpenFileInExplorer}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.openFileInExplorer}
                <span>
                    Shift + Alt + E / X
                </span>
            </div>
            <div
                onClick={handleRenameFile}
            >
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.rename}
                <span>
                    F2
                </span>
            </div>
            <div onClick={handleDeleteFile}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.delete}
                <span>
                    Delete
                </span>
            </div>
        </div>
    )
})

FileMenu.displayName = 'FileMenu'

export default FileMenu;
