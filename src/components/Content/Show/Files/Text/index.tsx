import styles from './index.module.scss';
import { Editor } from './Editor';
import CodeRunner from './CodeRunner';
import { useCallback, useState } from 'react';
import { getFileExtension } from '@/lib/Utils/File';
import { extToJudge0LanguageId } from '@/lib/Config/CodeRunner/language';
import { useMessage } from '@/lib/Context/Message';
import { useLang } from '@/lib/Context/Lang';
import { MessageType } from '@/components/public/Message/Message';

// babel支持的文件后缀名
const babelExtensions = ['js', 'ts', 'jsx', 'tsx', 'mjs', 'cjs', 'json', 'vue', 'svelte', 'astro'];

export enum RunnerType {
    babel = 'babel',
    judge0 = 'judge0'
}
export type CodeObject = {
    code: string,
    type: RunnerType.babel
} | {
    code: string,
    type: RunnerType.judge0,
    ext: string
}
export const TextShow = ({ file }: {
    file: Files
}) => {
    const { Lang } = useLang()
    const { showMessage } = useMessage()
    const [runCode, setrunCode] = useState<CodeObject>({ code: '', type: RunnerType.babel })    //对象,每次改变引用以再次运行代码

    const setRunCode = useCallback((code: CodeObject['code']) => {
        if (!code) return;
        const ext = getFileExtension(file.name);
        if (babelExtensions.includes(ext)) {
            setrunCode({ code, type: RunnerType.babel });
        } else {
            if (extToJudge0LanguageId[ext]) {
                setrunCode({ code, type: RunnerType.judge0, ext });
            } else {
                showMessage(Lang.FileExploer.Content.Show.Editor.CodeRunner.notSupportToRun, MessageType.info)
            }
        }
    }, [file.name, Lang, showMessage]);

    return (
        <div className={styles.container}
            editor-id={file.path}   // 区分editor
        >
            <Editor file={file} setRunCode={setRunCode} />
            {runCode.code && <CodeRunner codeObject={runCode} />}
        </div>
    );
}

export default TextShow; 