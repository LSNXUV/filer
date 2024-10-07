import { useState,useRef, useEffect, memo } from 'react'
import styles from './index.module.scss'
import { Files } from '@/lib/Types/File'
import FileIcon from '@/components/Icons/File/File'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/useFileOp'
import { useMessage } from '@/lib/Context/Message'

const Rename = function Rename({ file, show, toggle }: {
    file: Files
    show: boolean
    toggle: () => void
}) {
    const {Lang} = useLang()
    const {showMessage} = useMessage()

    const {renameFile} = useFileOp()

    const [value, setValue] = useState<string>(file.name)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      
        if (show && inputRef.current) {
            inputRef.current.focus()
        }
    }, [show])
    
    return (
        <div className={styles.edit}
            style={{ display: show ? 'flex' : 'none' }}
        >
            <span className={styles.icon}>
                <FileIcon name={value} />
            </span>
            <input type="text" defaultValue={file.name} ref={inputRef} placeholder={Lang.FileExploer.Sider.FileTree.Tree.File.Rename.input.placeholder}
                onChange={(e) => setValue(e.target.value)}
                onBlur={async () => {
                    if(value === file.name) return toggle()
                    const res = await renameFile(file, value)
                    showMessage(
                        Lang.FileExploer.Sider.FileTree.Tree.File.Rename.input.save,
                        res
                    )
                    toggle()
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        (e.target as HTMLInputElement).blur(); // 失去焦点
                    }
                }}
            />
        </div>
    )
}

Rename.displayName = 'Rename'

export default Rename
