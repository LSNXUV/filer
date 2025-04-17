import { useFiles } from '@/lib/Context/File';
import { useLang } from '@/lib/Context/Lang';
import { useMessage } from '@/lib/Context/Message';
import React from 'react'
import styles from './index.module.scss'

function Action() {
    const { showMessage } = useMessage()
    const { Lang } = useLang();

    const { resetDirectoryPicker, openDirectoryPicker, hasFiles } = useFiles()

    const onReset = () => {
        resetDirectoryPicker()
        showMessage(
            Lang.FileExploer.Sider.FileTree.topActions.message.reset,
            'success'
        )
    }

    const handle = hasFiles ? onReset : openDirectoryPicker
    return (
        <div className={styles.btnContainer}>
            <button onClick={handle}>
                {
                    hasFiles ?
                        Lang.FileExploer.Sider.FileTree.topActions.reset :
                        Lang.FileExploer.Sider.FileTree.NoFile.selectFolder
                }
            </button>
        </div>
    )
}

export default Action