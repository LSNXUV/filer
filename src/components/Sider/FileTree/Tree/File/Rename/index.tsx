import { useState, useRef, useEffect } from 'react'
import styles from './index.module.scss'

import FileIcon from '@/components/Icons/File/File'
import { useFileOp } from '@/lib/Hooks/useFileOp'

const Rename = ({ file, show, toggle }: {
    file: Files
    show: boolean
    toggle: () => void
}) => {
    const { renameFile } = useFileOp()

    const [value, setValue] = useState<string>(file.name)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        if (show && inputRef.current) {
            inputRef.current.focus()
        }
    }, [show])

    return (
        <div className={styles.edit}
            style={{ display: show ? '' : 'none' }}
        >
            <span className={styles.icon}>
                <FileIcon name={value} />
            </span>
            <input type="text" defaultValue={file.name} ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
                onBlur={async () => {
                    if (value === file.name) return toggle()
                    const res = await renameFile(file, value)
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
