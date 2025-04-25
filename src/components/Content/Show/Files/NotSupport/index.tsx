

import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import FileIcon from '@/components/Icons/File/File'
import TextShow from '../Text'
import { useLang } from '@/lib/Context/Lang'
import { useConfirm } from '@/lib/Context/Confirm'
import { getFileExtension } from '@/lib/Utils/File'
import { useEditorStatus } from '@/lib/Context/EditorStatus'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'

const typeMap: {
    [key: string]: string
} = {
}

export default function NotShow({ file }: {
    file: Files
}) {
    const { Lang } = useLang()
    const { confirm } = useConfirm()
    const { clearEditorStatus } = useEditorStatus()
    const selectedFile = useSelectedFile()

    //是否强制查看
    const [isForcible, setisForcible] = useState(false)

    // 如果没有解除封禁状态,则清空编辑器状态
    useEffect(() => {
        if (selectedFile?.path !== file.path) return;
        if (!isForcible) {
            clearEditorStatus()
        }
    }, [isForcible, clearEditorStatus, selectedFile, file.path])
    return (
        !isForcible ?
            <div className={styles.container}>
                <FileIcon name={file.name} />
                <div className={styles.tip}>
                    {Lang.FileExploer.Content.Show.NotShow.tip.thisFile}
                    <span>{file.name}</span>
                    {Lang.FileExploer.Content.Show.NotShow.tip.is}
                    <span>{typeMap[getFileExtension(file.name)] ?? Lang.FileExploer.Content.Show.NotShow.unknownType}</span>
                    {Lang.FileExploer.Content.Show.NotShow.tip.format}
                </div>
                <button
                    onClick={() => {
                        confirm({
                            description: Lang.FileExploer.Content.Show.NotShow.forceShowTip,
                            onConfirm: () => {
                                setisForcible(true)
                            }
                        })
                    }}
                >
                    {Lang.FileExploer.Content.Show.NotShow.forceShow}
                </button>
            </div>
            : <TextShow file={file} />
    )
}
