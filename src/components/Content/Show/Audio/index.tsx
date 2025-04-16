
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import { useFileOp } from '@/lib/Hooks/useFileOp'
import Waves from './Waves'
import { useTabOp } from '@/lib/Hooks/useTabOp'

export default function AudioShow({ file: { path } }: {
    file: Files
}) {
    const { selectedFile } = useTabOp()
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
        if (selectedFile.path === path && initUrl) {
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
