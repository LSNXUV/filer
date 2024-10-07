import { Files } from "@/lib/Types/File"
import styles from './index.module.scss'
import { memo } from "react"
import { notShowExt } from "@/config/File/notShowExt"
import { ImageShow } from "../ImageShow"
import TextShow from "../TextShow"
import NotShow from "../NotShow"
import VideoShow from "../VideoShow"
import AudioShow from "../AudioShow"

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

  const ShowComponent = notShowExt.includes(ext) 
    ? NotShow 
    : showFileMap[file.type.split('/')[0]] || showFileMap['default']

  return <ShowComponent file={file} />
}

const ShowFile = memo(({ file }: {
  file: Files
}) => {

  return (
    <div className={styles.container}>
      <Show file={file} />
    </div>
  )
})

ShowFile.displayName = 'ShowFile'

export default ShowFile;