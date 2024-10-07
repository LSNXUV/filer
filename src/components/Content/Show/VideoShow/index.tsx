
import { Files } from '@/lib/Types/File'
import React, { useEffect,useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/useFileOp'

export default function VideoShow({ file:{path} }:{
    file: Files
}) {
    const {Lang} = useLang()

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

    if (!url) {
        // console.error(Lang.FileExploer.Content.Show.Video.log.fileHandleNotFound, file.path);
        return <h2 className={styles.notExist}>{Lang.FileExploer.Content.Show.Video.notFound}</h2>;
    }

    return (
        <>
            <video className={styles.video} controls autoPlay src={url}>
            </video>
        </>
    );
}
