import { BeforeMount, Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useFileOp } from '@/lib/Hooks/Files/useFileOp';
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus';
import { useMessage } from '@/lib/Context/Message';
import { useLang } from '@/lib/Context/Lang';
import { theme } from '@/lib/Config/Content/Editor/theme';
import { Code } from '..';
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry';
import { useEditorStatus } from '@/lib/Context/EditorStatus';
import { IEditor } from '@/types/editor';
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile';

export const Editor = ({ file, setRunCode }: {
    file: Files,
    setRunCode: (code: Code) => void
}) => {
    const { Lang } = useLang()
    const { showMessage } = useMessage()
    const { setFileEditStatus } = useFileEditStatus()
    const { init } = useEditorStatus()
    const selectedFile = useSelectedFile()

    const { getFileText } = useFileEntry();
    const { updateFile } = useFileOp();

    const [editorText, setEditorText] = useState('');

    const editorRef = useRef<IEditor | null>(null);

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
            showMessage(Lang.FileExploer.Content.Show.Editor.log.updateError, 'fail')
        }
        oldValueRef.current = value;
    }, [file])

    const handleBeforeMount: BeforeMount = (monaco) => {
        //定义主题
        Object.keys(theme).map((key) => {
            monaco.editor.defineTheme(key, theme[key]);
        })
    }

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        editor.addAction({
            id: 'save-file',
            label: Lang.FileExploer.Content.Show.Editor.Action.saveFile,
            contextMenuGroupId: 'cus',
            contextMenuOrder: 0, // 顺序，越小越靠前
            run: async (editor) => {
                const value = editor.getValue();
                await saveFile(value);
                setFileEditStatus(file.path, {
                    status: FileEditStatus.saved,
                });
            },
            'keybindings': [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // 快捷键
            ],
        });

        // 👇 添加右键菜单项：运行代码
        editor.addAction({
            id: 'run-code',
            label: Lang.FileExploer.Content.Show.Editor.Action.runCode,
            contextMenuGroupId: 'cus', // 放在哪个分组下
            contextMenuOrder: 0, // 顺序，越小越靠前
            run: async (editor) => {
                const value = editor.getValue();
                setRunCode({
                    code: value
                });
            },
            'keybindings': [
                monaco.KeyMod.Alt | monaco.KeyCode.KeyC, // 快捷键
            ],
        });

        init(editor); // 初始化编辑器、绑定事件等等
    };

    useEffect(() => {
        if (selectedFile?.path !== file.path || !editorRef.current){
            return;
        }
        init(editorRef.current); // 重新初始化编辑器、绑定事件等等
    }, [selectedFile, file, init]);

    return (
        <>
            <MonacoEditor
                className={styles.editor}
                theme={Object.keys(theme)[0]}
                path={file.path}
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
                beforeMount={handleBeforeMount}
                onMount={handleEditorMount}
            />
        </>
    );
};
