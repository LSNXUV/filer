import { Files } from "@/lib/Types/File";
import { File } from "@/components/Sider/FileTree/Tree/File/Index";
import { Dir } from "@/components/Sider/FileTree/Tree/Dir/Index";
import styles from './index.module.scss'

export function Tree({ files, level = 0 }: {
    files: Files;   // 文件树
    level?: number; // 缩进级别
}) {
    
    return (
        <>
            <div className={styles.line} style={{ paddingLeft: level ? 'var(--file-tree-indent)' : '' }}>
                {files.kind === 'file' 
                    ? <File key={files.path} file={files} /> 
                    : <Dir key={files.path} dir={files} level={level} />
                }
            </div>
        </>
    )
}