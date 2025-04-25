import { useFiles } from '@/lib/Context/File';
import { useLang } from '@/lib/Context/Lang';
import { useMessage } from '@/lib/Context/Message';
import React from 'react'
import styles from './index.module.scss'
import { MessageType } from '@/components/public/Message/Message';

function Action() {
    const { showMessage } = useMessage()
    const { Lang } = useLang();

    const { resetDirectoryPicker, openDirectoryPicker, hasFiles } = useFiles()

    const onReset = () => {
        resetDirectoryPicker(() => {
            // 重置完之后才
            showMessage(
                Lang.FileExploer.Sider.FileTree.topActions.message.reset,
                MessageType.success
            )
        })
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