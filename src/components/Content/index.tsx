
import styles from './index.module.scss'
import Show from './Show/index'
import BreadCrumbs from './BreadCrumbs/index'
import Tabs from './Tabs/index'
import InitContent from './InitContent'
import { FileEditStatusProvider } from '@/lib/Context/FIleEditStatus'
import { useTabs } from '@/lib/Context/Tab'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'


export default function Content() {
  const selectedFile = useSelectedFile()
  const { selectId } = useTabs()
  return (
    <FileEditStatusProvider>
      <div className={styles.container}>
        {
          !selectId // 如果没有选中的tab
            ? <InitContent />
            : <>
              <Tabs />
              {selectedFile && <BreadCrumbs path={selectedFile.path} />}
              <Show />
            </>
        }

      </div>
    </FileEditStatusProvider>
  )
}