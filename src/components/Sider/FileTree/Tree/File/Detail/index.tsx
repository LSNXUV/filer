import { useLang } from '@/lib/Context/Lang'
import { formatFileSize } from '@/lib/Utils/File'

import styles from './index.module.scss'
import { memo } from 'react'

const FileDetail = memo(function FileDetail({ file}: { file: Files }) {
    const {Lang} = useLang();
    
    return (
        <div className={`bar ${styles.detail}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles.title}>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.title}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.name} {file.name}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.path} {file.path}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.size} {formatFileSize(file.size) ?? 'unknown'}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.type} {file.type || file.name.split('.').pop()}</div>
            <div>{Lang.FileExploer.Sider.FileTree.Tree.File.FileDetail.lastModified} {file.lastModified ? new Date(file.lastModified).toLocaleString() : 'unknown'}</div>
        </div>
    )
})

FileDetail.displayName = 'FileDetail'

export default FileDetail