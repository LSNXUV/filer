import ShowFile from './Files'
import styles from './index.module.scss'
import { useTabs } from '@/lib/Context/Tab'

const Show = () => {
  const { tabs, selectedTab } = useTabs()
  
  return (
    <div className={styles.container}>
      {
        // id排序
        [...tabs].sort((a, b) => a.id.localeCompare(b.id)).map((tab, _) => {
          const file = tab.type === 'file' ? tab.content : null; // 如果是文件类型，获取文件对象
          return (
            <div
              key={tab.id}
              className={styles.showContainer}
              style={{
                display: selectedTab === tab ? '' : 'none',
              }}
            >
              {
                tab.type === 'file' ? (
                  file && <ShowFile file={file} />
                ) : (
                  tab.content
                )
              }
            </div>
          )
        })
      }
    </div >
  )
}

Show.displayName = 'Show'

export default Show;