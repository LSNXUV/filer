import { useFiles } from '@/lib/Context/File'
import { useLang } from '@/lib/Context/Lang'
import { useMessage } from '@/lib/Context/Message'
import { useFileOp } from '@/lib/Hooks/useFileOp'
import { Files } from '@/lib/Types/File'
import styles from './index.module.scss'
import { memo, use, useCallback, useEffect } from 'react'
import { useTabOp } from '@/lib/Hooks/useTabOp'

const FileMenu = memo(function FileMenu({ file, show, toggle, editToggle }: { 
    file: Files, 
    show: boolean, 
    toggle: () => void,
    editToggle: () => void
}) {
    const {showMessage} = useMessage()
    const {Lang} = useLang();

    const { deleteFile ,openFileInExplorer} = useFileOp()
    const {selectFile, closeFile, addFileToShowsRear, } = useTabOp()
    const {isShowFile} = useTabOp()

    const handleSelectFile = useCallback(() => {
        selectFile(file)
        toggle()
    }, [selectFile, file, toggle])

    const handleCloseFile = useCallback(() => {
        closeFile(file)
        toggle()
    }, [closeFile, file, toggle])

    const handleAddFileToShowsRear = useCallback(() => {
        addFileToShowsRear(file)
        toggle()
    }, [addFileToShowsRear, file, toggle])

    const handleOpenFileInExplorer = useCallback(() => {
        openFileInExplorer(file)
        toggle()
    }, [openFileInExplorer, file, toggle])

    const handleEditToggle = useCallback(() => {
        editToggle()
        toggle()
    }, [editToggle, toggle])

    const handleDeleteFile = useCallback(async () => {
        const res = await deleteFile(file)
        showMessage(
            Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.message.delete,
            res ? 'success' : 'info',
        )
        toggle()
    }, [toggle,deleteFile, file, showMessage, Lang])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSelectFile()
        }else if (event.key === 'Escape') {
            toggle()
        }else if(event.shiftKey && event.altKey && ((event.key.toLowerCase() === 'e' || event.code === 'KeyE') || (event.key.toLowerCase() === 'x' || event.code === 'KeyX'))){
            handleOpenFileInExplorer()
        }else if (event.key === 'Delete') {
            handleDeleteFile()
        }else if (event.key === 'F2') {
            handleEditToggle()
        }
    }, [toggle, handleSelectFile, handleDeleteFile,handleOpenFileInExplorer, handleEditToggle]);

    useEffect(() => {
        if (!show) return
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown,show]);
    
    return (
        <div className={`bar ${styles.menu} ${show ? styles.show : ''}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div onClick={handleSelectFile}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.open} 
                <span>
                    Left
                </span>
            </div>
            <div onClick={handleCloseFile} className={`${!isShowFile(file) ? 'disabled' : ''}`}>
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
                onClick={handleEditToggle}
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

export default FileMenu