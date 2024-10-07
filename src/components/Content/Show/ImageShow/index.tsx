import { Files } from "@/lib/Types/File"
import { useState, useEffect } from "react"
import styles from './index.module.scss'
import Image from "next/image"
import { useFileOp } from "@/lib/Hooks/useFileOp"

export function ImageShow({file:{path,name}}:{
    file: Files
  }) {
    
    const {getFileUrl} = useFileOp()

    const [url, setUrl] = useState('');
    useEffect(() => {
      (async () => {
          const fileUrl = await getFileUrl(path)
          setUrl(fileUrl);
      })()

      return () => {
          if(url){
              URL.revokeObjectURL(url);
          }
      };
  }, [path,getFileUrl]);
    return (
      <>
        {url ? <Image fill className={styles.img} src={url || ''} alt={name} /> : null}
      </>
    )
  }