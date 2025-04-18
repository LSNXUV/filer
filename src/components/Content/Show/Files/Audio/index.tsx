
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/useFileOp'
import Waves from './Waves'
import { useFileTab } from '@/lib/Hooks/useFileTab'

export default function AudioShow({ file: { path } }: {
    file: Files
}) {
    const { selectedFile } = useFileTab()
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
    }
    return (
        <>
            <Waves url={url} />
        </>
    );
}
