import styles from './index.module.scss';
import { Editor } from './Editor';
import CodeRunner from './CodeRunner';
import { useCallback, useState } from 'react';
import { getFileExtension } from '@/lib/Utils/File';

export type Code = {
    code: string
}
export const TextShow = ({ file }: {
    file: Files
}) => {
    const [runCode, setrunCode] = useState<Code>({ code: '' })    //对象,每次改变引用以再次运行代码

    const setRunCode = useCallback(({ code }: Code) => {
        if (['js', 'ts', 'jsx', 'tsx'].includes(getFileExtension(file.name))) {
            setrunCode({ code });
        }
    }, [file]);

    return (
        <div className={styles.container}>
            <Editor file={file} setRunCode={setRunCode}/>
            {runCode.code && <CodeRunner codeObject={runCode} />}
        </div>
    );
}

export default TextShow; 