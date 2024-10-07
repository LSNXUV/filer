
import styles from './index.module.scss'
import ShowFile from '@/components/Content/Show/Show/index'
import BreadCrumbs from '@/components/Content/BreadCrumbs/index'
import Tabs from '@/components/Content/Tabs/index'
import InitContent from '@/components/Content/Index/InitContent'
import { useTabOp } from '@/lib/Hooks/useTabOp'


export default function Content() {
  const { selectedFile } = useTabOp()

  return (
    <div className={styles.container}>
      {
        !selectedFile 
        ? <InitContent /> 
        : <>
            <Tabs />
            <BreadCrumbs path={selectedFile.path}/>
            <ShowFile file={selectedFile}/>
          </>
      }
      
    </div>
  )
}