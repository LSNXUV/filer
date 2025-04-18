import styles from './index.module.scss';
import { Editor } from './Editor';
import CodeRunner from './CodeRunner';
import { useState } from 'react';
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile';

export type Code = {
    code: string
}
export const TextShow = ({ file }: {
    file: Files
}) => {
    const selectedFile = useSelectedFile()

    const isCurrent = selectedFile?.path === file.path // 是否是当前选中的文件

    const [runCode, setrunCode] = useState<Code>({ code: '' })    //对象,每次改变引用以再次运行代码

    const setRunCode = ({ code }: Code) => {
        if (['js', 'ts', 'jsx', 'tsx'].includes(file.name.split('.').pop() || '')) {
            setrunCode({ code });
        }
    }

    return (
        <div className={styles.container}>
            <Editor file={file} setRunCode={setRunCode} />
            {runCode.code && <CodeRunner codeObject={runCode} isCurrent={isCurrent} />}
        </div>
    );
}

export default TextShow; 