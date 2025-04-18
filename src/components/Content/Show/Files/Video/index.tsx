
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/Tabs/useFileOp'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'

export default function VideoShow({ file: { path } }: {
    file: Files
}) {
    const { Lang } = useLang()
    
    const selectedFile = useSelectedFile()

    const { getFileUrl } = useFileOp()

    const [url, setUrl] = useState('');
    const [initUrl, setInitUrl] = useState('');

    useEffect(() => {
        let fileUrl = '';
        (async () => {
            fileUrl = await getFileUrl(path)
            setInitUrl(fileUrl);
        })()

        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [getFileUrl])

    useEffect(() => {
        if (selectedFile && selectedFile.path === path && initUrl) {
            setUrl(initUrl)
        }
    }, [selectedFile, path, initUrl])

    if (!url) {
        return null;
        // return <h2 className={styles.notExist}>{Lang.FileExploer.Content.Show.Video.notFound}</h2>;
    }

    return (
        <>
            <video className={styles.video} controls src={url}>
            </video>
        </>
    );
}
