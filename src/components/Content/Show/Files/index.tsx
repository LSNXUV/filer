import React from 'react'
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

const ShowFile = ({ file }: { file: Files }) => {
  const ext = file.name.split('.').pop() || 'not'

  const ShowFileComponent = notSupportOpenExt.includes(ext)
    ? NotSupport
    : showFileMap[file.type.split('/')[0]] || showFileMap['default']

  return <ShowFileComponent file={file} />
}

export default ShowFile