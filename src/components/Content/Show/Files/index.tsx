import React, { memo, useEffect, useMemo } from 'react'
import { supportAudioExt, supportExt, supportImageExt, supportVideoExt } from "@/lib/Config/File/ext"
import { ImageShow } from "./Image"
import TextShow from "./Text"
import NotSupport from "./NotSupport"
import VideoShow from "./Video"
import AudioShow from "./Audio"
import { getFileExtension } from '@/lib/Utils/File'
import { useEditorStatus } from '@/lib/Context/EditorStatus'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'

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
  const selectedFile = useSelectedFile()
  const { clearEditorStatus } = useEditorStatus()

  // 后缀
  const ext = useMemo(() => getFileExtension(file.name), [file.name]);

  // 有后缀名，判断是否支持
  const isSupport = supportExt.includes(ext);

  // 如果没有扩展名,直接使用文本查看器
  const type = getTypeFromFile(file)

  // 如果不使用Editor, 则清空编辑器状态
  useEffect(() => {
    if (selectedFile?.path !== file.path) return;
    if (isSupport && type !== 'default') {
      clearEditorStatus()
    }
  }, [type, isSupport, clearEditorStatus, selectedFile, file.path])

  // 没有扩展名,直接使用文本查看器
  if (ext === file.name.toLocaleLowerCase()) {
    return <TextShow file={file} />
  }

  // 有扩展名，判断
  const ShowFileComponent = isSupport
    ? showFileMap[type]
    : NotSupport

  return <ShowFileComponent file={file} />
})

ShowFile.displayName = 'ShowFile';
export default ShowFile;