import { Editor as ED, OnMount } from '@monaco-editor/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useFileOp } from '@/lib/Hooks/useFileOp';
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus';
import { useMessage } from '@/lib/Context/Message';
import { useLang } from '@/lib/Context/Lang';

const lans: { [key: string]: string } = {
    'js': 'javascript',
    'mjs': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'md': 'markdown',
    'sh': 'bash',
    'py': 'python',
};

export const Editor = ({ file }: { file: Files }) => {
    const { Lang } = useLang()
    const { showMessage } = useMessage()
    const { setFileEditStatus } = useFileEditStatus()

    const { updateFile, getFileText } = useFileOp();
    const [editorText, setEditorText] = useState('');
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

    // 初始时或者上一次保存的值
    const oldValueRef = useRef<string | null>(null);

    useEffect(() => {
        (async () => {
            const text = await getFileText(file.path);
            if (text === undefined) return;
            oldValueRef.current = text;
            setEditorText(text);
        })();
    }, [file.path, getFileText]);

    const saveFile = useCallback(async (value: string = '') => {
        if (!await updateFile(file, value)) {
            showMessage({
                fail: Lang.FileExploer.Content.Show.Editor.log.updateError,
            })
        }
        oldValueRef.current = value;
    }, [file])

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, async () => {
            const value = editor.getValue();
            await saveFile(value);
            setFileEditStatus(file.path, {
                status: FileEditStatus.saved,
            });
        });
    };

    const ext = file.name.split('.').pop() as string;
    const lan = lans[ext] || ext;

    return (
        <ED
            className={styles.editor}
            theme="vs-dark"
            language={lan}
            value={editorText}
            onChange={(value = '') => {
                setFileEditStatus(file.path, {
                    status: FileEditStatus.unSaved,
                    async save() {
                        await saveFile(value);
                    },
                })
                setEditorText(value)
            }}
            onMount={handleEditorMount}
        />
    );
};
