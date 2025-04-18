
import React, { useEffect, useState } from 'react'
import { useFileOp } from '@/lib/Hooks/Tabs/useFileOp'
import Waves from './Waves'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'

export default function AudioShow({ file: { path } }: {
    file: Files
}) {
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
    }
    return <Waves url={url} />;
}
