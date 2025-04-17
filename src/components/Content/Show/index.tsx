import styles from './index.module.scss'
import { memo } from "react"
import { notSupportOpenExt } from "@/lib/Config/File/notSupportOpenExt"
import { ImageShow } from "./Image"
import TextShow from "./Text"
import NotSupport from "./NotSupport"
import VideoShow from "./Video"
import AudioShow from "./Audio"
import { useFiles } from '@/lib/Context/File'
import { useTabOp } from '@/lib/Hooks/useTabOp'

const showFileMap: {
  [key: string]: React.FC<{
    file: Files
  }>
} = {
  'image': ImageShow, // 图片
  'video': VideoShow, // 视频
  'audio': AudioShow, // 音频
  'default': TextShow, // 文本或代码
}

const ShowFile = ({ file }: { file: Files }) => {
  const ext = file.name.split('.').pop() || 'not'

  const ShowFileComponent = notSupportOpenExt.includes(ext)
    ? NotSupport
    : showFileMap[file.type.split('/')[0]] || showFileMap['default']

  return <ShowFileComponent file={file} />
}

const Show = () => {
  const { tabs } = useFiles()
  const { selectedFile } = useTabOp()

  return (
    <div className={styles.container}>
      {
        tabs.map((file, _) => (
          <div key={file.path}
            className={styles.showContainer}
            style={{
              display: selectedFile.path === file.path ? '' : 'none',
            }}
          >
            <ShowFile file={file} />
          </div>
        ))
      }
    </div >
  )
}

Show.displayName = 'Show'

export default Show;