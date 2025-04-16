
import React from 'react'
import styles from './index.module.scss'
import { useFiles } from '@/lib/Context/File'
import { useLang } from '@/lib/Context/Lang'


export default function InitContent() {
    const { openDirectoryPicker, hasFiles } = useFiles()
    const { Lang } = useLang()

    return (
        <div className={styles.container}>
            <h2 className={styles.welcome}>{Lang.FileExploer.Content.InitContent.welcome}</h2>
            <h3 className={styles.open}>
                {Lang.FileExploer.Content.InitContent.open.select}
                {
                    hasFiles
                        ? (<a>{Lang.FileExploer.Content.InitContent.open.file}</a>)
                        : (<a
                            onClick={openDirectoryPicker}>
                            {Lang.FileExploer.Content.InitContent.open.folder}
                        </a>)
                }
                {Lang.FileExploer.Content.InitContent.open.start}</h3>
            <p className={styles.botInfo}>{Lang.FileExploer.Content.InitContent.botInfo.createdBy}
                <a href="https://xwitter.cn" target='_blank'> LSNXUV</a>
            </p>
        </div>
    )
}
