
import { MessageType } from '@/components/public/Message/Message'
import styles from './index.module.scss'
import { useFiles } from '@/lib/Context/File'
import { useLang } from '@/lib/Context/Lang'
import { useMessage } from '@/lib/Context/Message'

export default function Menu({ show }: {
  show: boolean
}) {
  const { Lang, changeLang } = useLang()
  const { showMessage } = useMessage()

  const { hasFiles, openDirectoryPicker, resetDirectoryPicker, loadFilesAndHandles } = useFiles()
  return (
    <div className={styles.menuContainer}
      style={{
        maxHeight: show ? 200 : 0,
        padding: show ? '5px' : '0 5px',
      }}>
      <div className={styles.menuItem}
        onClick={openDirectoryPicker}
      >
        {Lang.FileExploer.Sider.Title.Menu.selectFolder}
      </div>
      <div className={`${styles.menuItem} ${hasFiles ? '' : 'disabled'}`}
        onClick={async () => {
          if (!hasFiles) return;
          await loadFilesAndHandles()
          showMessage(
            Lang.FileExploer.Sider.Title.Menu.message.refresh,
            MessageType.success
          )
        }}
      >
        {Lang.FileExploer.Sider.Title.Menu.refresh}
      </div>
      <div className={`${styles.menuItem} ${hasFiles ? '' : 'disabled'}`}
        onClick={() => {
          if (!hasFiles) return;
          resetDirectoryPicker(() => {
            // 重置完成才显示消息
            showMessage(
              Lang.FileExploer.Sider.Title.Menu.message.reset,
              MessageType.success
            )
          })
        }}
      >
        {Lang.FileExploer.Sider.Title.Menu.close}
      </div>
      <div className={styles.menuItem}
        onClick={() => {
          changeLang()
          showMessage(
            Lang.FileExploer.Sider.Title.Menu.message.changeLang,
            MessageType.success
          )
        }}
      >
        {Lang.FileExploer.Sider.Title.Menu.changeLang}
      </div>
      {/* <div className={styles.menuItem}>
        {Lang.FileExploer.Sider.Title.Menu.setting}
      </div> */}
    </div>
  )
}
