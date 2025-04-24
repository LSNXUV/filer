import styles from './index.module.scss';
import { Editor } from './Editor';
import CodeRunner from './CodeRunner';
import { useCallback, useState } from 'react';
import { getFileExtension } from '@/lib/Utils/File';
import { extToJudge0LanguageId } from '@/lib/Config/CodeRunner/language';
import { useMessage } from '@/lib/Context/Message';
import { useLang } from '@/lib/Context/Lang';

export type CodeObject = {
    code: string,
    type: 'babel'
} | {
    code: string,
    type: 'other',
    ext: string
}
export const TextShow = ({ file }: {
    file: Files
}) => {
    const { Lang } = useLang()
    const { showMessage } = useMessage()
    const [runCode, setrunCode] = useState<CodeObject>({ code: '', type: 'babel' })    //对象,每次改变引用以再次运行代码

    const setRunCode = useCallback((code: CodeObject['code']) => {
        if (!code) return;
        const ext = getFileExtension(file.name);
        if (['js', 'ts', 'jsx', 'tsx'].includes(ext)) {
            setrunCode({ code, type: 'babel' });
        } else {
            if (extToJudge0LanguageId[ext]) {
                setrunCode({ code, type: 'other', ext });
            } else {
                showMessage(Lang.FileExploer.Content.Show.Editor.CodeRunner.notSupportToRun, 'info')
            }
        }
    }, [file.name]);

    return (
        <div className={styles.container}>
            <Editor file={file} setRunCode={setRunCode} />
            {runCode.code && <CodeRunner codeObject={runCode} />}
        </div>
    );
}

export default TextShow; 