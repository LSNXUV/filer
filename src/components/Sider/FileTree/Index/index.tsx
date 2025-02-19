import { useFiles } from '@/lib/Context/File';
import styles from './index.module.scss'
import { NoFile } from './NoFile';
import { Tree } from '../Tree/Index';
import { useLang } from '@/lib/Context/Lang';
import { useMessage } from '@/lib/Context/Message';
import { TransitionStartFunction, useEffect, useTransition } from 'react';

export default function FileTree({ }: {
}) {

    const [isRefreshing, starTransition] = useTransition()
    const { files } = useFiles()

    if (!files) return (
        <NoFile />
    )
    return (
        <>
            <div className={styles.container}>
                <Buttons starTransition={starTransition} />
                <div className={styles.treeContainer} style={{
                    opacity: isRefreshing ? 0.5 : 1,
                }}>
                    <Tree files={files} />
                    {
                        isRefreshing &&
                        (<div className={styles.treeLoading}></div>)
                    }
                </div>
            </div>
        </>
    )
}

function Buttons({ starTransition }: {
    starTransition: TransitionStartFunction
}) {
    const { showMessage } = useMessage()
    const { Lang } = useLang();

    const { resetDirectoryPicker, loadFilesAndHandles } = useFiles()

    return (
        <div className={styles.btnContainer}>
            <button onClick={() => {
                resetDirectoryPicker()
                showMessage(
                    Lang.FileExploer.Sider.FileTree.topActions.message.reset,
                    'success'
                )

            }}
            >
                {Lang.FileExploer.Sider.FileTree.topActions.reset}
            </button>
            <button onClick={async () => {
                    starTransition(async () => {
                        await loadFilesAndHandles();
                        showMessage(
                            Lang.FileExploer.Sider.FileTree.topActions.message.refresh,
                            'success'
                        )
                    })
            }}>
                {Lang.FileExploer.Sider.FileTree.topActions.refresh}
            </button>
        </div>
    )
}

