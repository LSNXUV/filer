import { Files } from '@/lib/Types/File';
import {Editor as ED} from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useFileOp } from '@/lib/Hooks/useFileOp';
import { useDebounceCallback } from '@/lib/Hooks/useDebounceCallback';

//文件后缀对应的语言(后缀和语言不一致时需要手动添加)
const lans:{
    [key: string]: string
} = {
    'js': 'javascript',
    'mjs': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'md': 'markdown',
    'sh': 'bash',
    'py': 'python',
}

const UPDATE_DELAY = 500;

export const Editor = ({file }: {
    file: Files,
}) => {
    const {updateFile,getFileText} = useFileOp()
    const [editorText, setEditorText] = useState('');
    const [startEdit, setStartEdit] = useState(false)   //防止初始进入触发保存

    useEffect(() => {
        (async () => {
            const text = await getFileText(file.path)
            if(text === undefined) return;
            setEditorText(text)
            setStartEdit(true)
        })()

    },[file.path,getFileText])

    const throttleUpdateFile = useDebounceCallback(updateFile, UPDATE_DELAY);

    const ext = file.name.split('.').pop() as string;
    const lan = lans[ext] || ext;
    return (
        <>
            <ED
                className={styles.editor}
                theme='vs-dark'
                language={lan}
                value={editorText}
                onChange={async (value) =>{ 
                    setEditorText(value || '')
                    if(value !== undefined && startEdit){
                        await throttleUpdateFile(file,value)
                    }
                }}
            />
        </>
    );
};