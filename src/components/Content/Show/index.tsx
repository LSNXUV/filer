import styles from './index.module.scss'
import { memo } from "react"
import { notSupportOpenExt } from "@/lib/Config/File/notSupportOpenExt"
import { ImageShow } from "./Image"
import TextShow from "./Text"
import NotSupport from "./NotSupport"
import VideoShow from "./Video"
import AudioShow from "./Audio"

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

const Show = ({ file }: { file: Files }) => {
  const ext = file.name.split('.').pop() || 'not'

  const ShowComponent = notSupportOpenExt.includes(ext)
    ? NotSupport
    : showFileMap[file.type.split('/')[0]] || showFileMap['default']

  return <ShowComponent file={file} />
}

const ShowFile = ({ file, show }: {
  file: Files,
  show: boolean
}) => {
  return (
    <div className={styles.container}
      style={{
        display: show ? '' : 'none',
      }}
    >
      <Show file={file} />
    </div>
  )
}

ShowFile.displayName = 'ShowFile'

export default ShowFile;