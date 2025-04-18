
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/useFileOp'

export default function VideoShow({ file: { path } }: {
    file: Files
}) {
    const { Lang } = useLang()

    const { getFileUrl } = useFileOp()

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

    if (!url) {
        return <h2 className={styles.notExist}>{Lang.FileExploer.Content.Show.Video.notFound}</h2>;
    }

    return (
        <>
            <video className={styles.video} controls src={url}>
            </video>
        </>
    );
}
