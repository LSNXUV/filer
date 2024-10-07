import { useFiles } from "@/lib/Context/File";
import { useLang } from "@/lib/Context/Lang";
import { useMessage } from "@/lib/Context/Message";
import styles from './index.module.scss'

export function NoFile(){
    const {showMessage} = useMessage()
    const {Lang} = useLang();

    const {openDirectoryPicker} = useFiles()
    return (
        <div className={styles.container}>
            <button onClick={async ()=>{
                const res = await openDirectoryPicker();
                showMessage(
                    Lang.FileExploer.Sider.FileTree.NoFile.message.selectFolder,
                    res
                )
            }}>
                {Lang.FileExploer.Sider.FileTree.NoFile.selectFolder}
            </button>
        </div>
    )
}