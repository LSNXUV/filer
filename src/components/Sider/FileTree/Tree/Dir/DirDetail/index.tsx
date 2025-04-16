import { useLang } from '@/lib/Context/Lang'
import { formatFileSize } from '@/lib/Utils/File'

import styles from './index.module.scss'
import { memo, useMemo } from 'react'

const DirDetail = memo(function DirDetail({ file }: { file: Files }) {
    const { Lang } = useLang();

    const dirSize = useMemo(() => {
        let size = 0
        const calcSize = (file: Files) => {
            if (file.kind === 'file') {
                size += file.size || 0
            } else {
                for (const f of file.children) {
                    calcSize(f)
                }
            }
        }
        calcSize(file)
        return size
    }, [file])
    return (
        <div className={`bar ${styles.detail}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles.title}>{Lang.FileExploer.Sider.FileTree.Tree.Dir.DirDetail.title}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.Dir.DirDetail.name} {file.name}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.Dir.DirDetail.path} {file.path}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.Dir.DirDetail.size} {formatFileSize(dirSize) ?? ''}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.Dir.DirDetail.lastModified} {file.lastModified ? new Date(file.lastModified).toLocaleString() : ''}</div>
        </div>
    )
})

DirDetail.displayName = 'DirDetail'

export default DirDetail