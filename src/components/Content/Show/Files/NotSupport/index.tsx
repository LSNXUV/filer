

import React, { useState } from 'react'
import styles from './index.module.scss'
import FileIcon from '@/components/Icons/File/File'
import TextShow from '../Text'
import { useLang } from '@/lib/Context/Lang'
import { useConfirm } from '@/lib/Context/Confirm'

const typeMap: {
    [key: string]: string
} = {
}

export default function NotShow({ file }: {
    file: Files
}) {
    const { Lang } = useLang()
    const { confirm } = useConfirm()

    const ext = file.name.split('.').pop() ?? ''
    const extType = typeMap[ext] ?? Lang.FileExploer.Content.Show.NotShow.unknownType
    const [isForcible, setisForcible] = useState(false) //是否强制查看
    return (
        !isForcible ?
            <div className={styles.container}>
                <FileIcon name={file.name} />
                <div className={styles.tip}>
                    {Lang.FileExploer.Content.Show.NotShow.tip.thisFile}
                    <span>{file.name}</span>
                    {Lang.FileExploer.Content.Show.NotShow.tip.is}
                    <span>{extType}</span>
                    {Lang.FileExploer.Content.Show.NotShow.tip.format}
                </div>
                <button
                    onClick={() => {
                        confirm({
                            info: Lang.FileExploer.Content.Show.NotShow.forceShowTip,
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
