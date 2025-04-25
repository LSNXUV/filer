
import React, { useEffect, useState } from 'react'
import Waves from './Waves'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry'

export default function AudioShow({ file: { path } }: {
    file: Files
}) {
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
    }
    return <Waves url={url} />;
}
