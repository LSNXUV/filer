
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry'

export default function VideoShow({ file: { path } }: {
    file: Files
}) {
    const { Lang } = useLang()

    const selectedFile = useSelectedFile()

    const { getFileUrl } = useFileEntry()

    const [url, setUrl] = useState('');
    const [initUrl, setInitUrl] = useState('');

    useEffect(() => {
        if (initUrl) return;
        let fileUrl = '';
        (async () => {
            fileUrl = await getFileUrl(path)
            setInitUrl(fileUrl);
        })()
    }, [getFileUrl, initUrl, path]);

    useEffect(() => {
        if (selectedFile?.path === path && initUrl) {
            setUrl(initUrl)
        }
    }, [selectedFile, path, initUrl])

    useEffect(() => {
        return () => {
            url && URL.revokeObjectURL(url);
        };
    }, [url])

    if (!url) {
        return null;
        // return <h2 className={styles.notExist}>{Lang.FileExploer.Content.Show.Video.notFound}</h2>;
    }

    return (
        <>
            <video className={styles.video} controls src={url}></video>
        </>
    );
}
