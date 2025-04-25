import { BeforeMount, Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useFileOp } from '@/lib/Hooks/Files/useFileOp';
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus';
import { useMessage } from '@/lib/Context/Message';
import { useLang } from '@/lib/Context/Lang';
import { theme } from '@/lib/Config/Content/Editor/theme';
import { useFileEntry } from '@/lib/Hooks/Files/useFileEntry';
import { useEditorStatus } from '@/lib/Context/EditorStatus';
import { IDisposable, IEditor, Monaco } from '@/types/editor';
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile';
import { MessageType } from '@/components/public/Message/Message';

export const Editor = ({ file, setRunCode }: {
    file: Files,
    setRunCode: (code: string) => void
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
    const monacoRef = useRef<Monaco>(null); // monaco-editor 实例

    const saveActionRef = useRef<IDisposable>(null); // 保存action的dispose引用
    const runActionRef = useRef<IDisposable>(null); // 运行action的dispose引用

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
            showMessage(Lang.FileExploer.Content.Show.Editor.log.updateError, MessageType.fail)
        }
        oldValueRef.current = value;
    }, [file, showMessage, Lang, updateFile]);

    const handleBeforeMount: BeforeMount = (monaco) => {
        //定义主题
        Object.keys(theme).map((key) => {
            monaco.editor.defineTheme(key, theme[key]);
        })
    }

    /** save保存文件Action */
    const addSaveAction = useCallback((editor: IEditor, monaco: Monaco) => {
        if (saveActionRef.current) {
            saveActionRef.current.dispose(); // 先删除之前的 action
        }
        saveActionRef.current = editor.addAction({
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
        
    }, [Lang, saveFile, setFileEditStatus, file.path]);

    /** run运行代码Action */
    const addRunAction = useCallback((editor: IEditor, monaco: Monaco) => {
        if (runActionRef.current) {
            runActionRef.current.dispose(); // 先删除之前的 action
        }
        runActionRef.current = editor.addAction({
            id: 'run-code',
            label: Lang.FileExploer.Content.Show.Editor.Action.runCode,
            contextMenuGroupId: 'cus', // 放在哪个分组下
            contextMenuOrder: 0, // 顺序，越小越靠前
            run: async (editor) => {
                const value = editor.getValue();
                setRunCode(value);
            },
            'keybindings': [
                monaco.KeyMod.Alt | monaco.KeyCode.KeyC, // 快捷键
            ],
        })
    }, [Lang, setRunCode]);

    const handleEditorMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco; // 保存 monaco-editor 实例

        addSaveAction(editor, monaco);
        addRunAction(editor, monaco);

        init(editor); // 初始化编辑器、绑定事件等等
    };

    // 
    useEffect(() => {
        if (selectedFile?.path !== file.path || !editorRef.current) {
            return;
        }
        init(editorRef.current); // 重新初始化编辑器、绑定事件等等
    }, [selectedFile, file, init]);

    //重新绑定saveAction
    useEffect(() => {
        if (editorRef.current && monacoRef.current) {
            addSaveAction(editorRef.current, monacoRef.current);
        }
    }, [addSaveAction]);

    // 重新绑定runAction
    useEffect(() => {
        if (editorRef.current && monacoRef.current) {
            addRunAction(editorRef.current, monacoRef.current);
        }
    }, [addRunAction]);

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
