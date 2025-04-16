import { useFiles } from "@/lib/Context/File";
import { useLang } from "@/lib/Context/Lang";
import styles from './index.module.scss'

export function NoFile() {
    const { Lang } = useLang();

    const { openDirectoryPicker } = useFiles()
    return (
        <div className={styles.container}>
            <button onClick={openDirectoryPicker}>
                {Lang.FileExploer.Sider.FileTree.NoFile.selectFolder}
            </button>
        </div>
    )
}