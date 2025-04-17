import { useFiles } from '@/lib/Context/File';
import styles from './index.module.scss'
import { Tree } from './Tree';
import { DirLoadingIcon } from '@/components/Icons/File/Dir';
import Action from '../Action';

export default function FileTree({ }: {
}) {
    const { files, loading } = useFiles()

    return (
        <>
            <div className={styles.container}>
                <Action />
                {
                    !files ?
                        loading && <DirLoadingIcon className={styles.loading} size={128} /> :
                        <div className={styles.treeContainer}>
                            <Tree files={files} />
                        </div>
                }
            </div>
        </>
    )
}



