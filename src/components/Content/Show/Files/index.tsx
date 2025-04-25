import React, { memo, useEffect } from 'react'
import { supportAudioExt, supportExt, supportImageExt, supportVideoExt } from "@/lib/Config/File/ext"
import { ImageShow } from "./Image"
import TextShow from "./Text"
import NotSupport from "./NotSupport"
import VideoShow from "./Video"
import AudioShow from "./Audio"
import { getFileExtension } from '@/lib/Utils/File'

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

const getTypeFromFile = (file: Files) => {
  const mimeType = file.type
  if (mimeType) {
    const baseType = mimeType.split('/')[0]
    if (showFileMap[baseType]) {
      return baseType
    }
  }

  const ext = getFileExtension(file.name);
  if (supportImageExt.includes(ext)) return 'image'
  if (supportVideoExt.includes(ext)) return 'video'
  if (supportAudioExt.includes(ext)) return 'audio'
  return 'default'
}

const ShowFile = memo(({ file }: { file: Files }) => {

  const ext = getFileExtension(file.name);
  // 没有扩展名,直接使用文本查看器
  if (ext === file.name.toLocaleLowerCase()) {
    return <TextShow file={file} />
  }
  // 有扩展名，判断
  const ShowFileComponent = supportExt.includes(ext)
    ? showFileMap[getTypeFromFile(file)]
    : NotSupport

  return <ShowFileComponent file={file} />
})

ShowFile.displayName = 'ShowFile';
export default ShowFile;