import { useState, useEffect } from "react"
import styles from './index.module.scss'
import Image from "next/image"
import { useFileEntry } from "@/lib/Hooks/Files/useFileEntry"

export function ImageShow({ file: { path, name } }: {
  file: Files
}) {

  const { getFileUrl } = useFileEntry()

  const [url, setUrl] = useState('');

  useEffect(() => {
    let fileUrl = '';
    (async () => {
      fileUrl = await getFileUrl(path)
      setUrl(fileUrl);
    })()

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [path, getFileUrl]);

  return (
    <>
      {url ? <Image fill className={styles.img} src={url || ''} alt={name} /> : null}
    </>
  )
}