import { IEditor } from "@/types/editor";
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from "react";

type EditorStatusCtx = {
   /** 编辑器实例 */
   editorRef: IEditor | null;
   /** 初始化编辑器 */
   init: (editor: IEditor) => void;
   /** 当前光标位置 */
   position: {
      lineNumber: number;
      column: number;
   } | null;
   /** 跳转到指定位置 */
   gotoPosition: () => void;
   /** 打开命令面板 */
   openCommand: (id: string,filter: string) => void;
   /** 当前tabSize */
   tabSize: number;
};

const EditorStatusCtx = createContext<EditorStatusCtx | null>(null);

export function EditorStatusProvider({ children }: PropsWithChildren) {
   const [position, setPosition] = useState<EditorStatusCtx['position'] | null>(null);
   const [tabSize, setTabSize] = useState<number>(4);
   const editorRef = useRef<IEditor>(null);

   const gotoPosition: EditorStatusCtx['gotoPosition'] = useCallback(() => {
      const editor = editorRef.current;
      if (!editor) return;
      editor.focus(); // 自动聚焦
      editor.getAction('editor.action.gotoLine')?.run();
   }, []);

   const openCommand: EditorStatusCtx['openCommand'] = useCallback((editorId, filter) => {
      const editor = editorRef.current;
      if (!editor) return;

      // 打开命令面板
      editor.focus(); // 保证聚焦
      editor.getAction('editor.action.quickCommand')?.run();

      //  查找EditorContainer
      const EditorContainer = document.querySelector(`[editor-id="${editorId}"]`) as HTMLDivElement;
      if (!EditorContainer) return;
      //先隐藏quick-input-widget
      const quickInputWidget = EditorContainer.querySelector('.quick-input-widget') as HTMLDivElement;
      if (!quickInputWidget) return;
      quickInputWidget.style.display = 'none';
      // 自动键入filter筛选
      const findInput = EditorContainer.querySelectorAll('.quick-input-and-message input')[0] as HTMLInputElement;
      if (findInput) {
         findInput.value = filter;
         // 手动触发输入事件以让筛选生效
         const event = new Event('input', { bubbles: true });
         findInput.dispatchEvent(event);
      } else {
         console.error('没有找到quickCommand输入框');
      }
      quickInputWidget.style.display = ''
   }, []);

   const init: EditorStatusCtx['init'] = useCallback((editor) => {
      editorRef.current = editor; // 设置编辑器实例
      const model = editor.getModel();
      if (!model) {
         console.error('没有找到编辑器model');
         return;
      }

      // 👇 实时监听光标变化
      setPosition({
         lineNumber: editor.getPosition()?.lineNumber ?? 0,
         column: editor.getPosition()?.column ?? 0,
      });
      editor.onDidChangeCursorPosition((e) => {
         const pos = e.position;
         setPosition({ lineNumber: pos.lineNumber, column: pos.column });
      });

      // 设置缩进监听器
      if (model.getOptions().insertSpaces) {
         setTabSize(model.getOptions().tabSize); // 获取当前tabSize
      }
      else {
         setTabSize(-model.getOptions().tabSize); // 获取当前tabSize
      }
      model.onDidChangeOptions((e) => {
         console.log('changedOptions', e);
         if (e.insertSpaces) {
            setTabSize(model.getOptions().tabSize); // 更新tabSize
         } else {
            setTabSize(-model.getOptions().tabSize); // 更新tabSize
         }
      });
   }, [])

   const value = useMemo(() => {
      return {
         editorRef: editorRef.current, init,
         position, gotoPosition,
         openCommand,
         tabSize
      };
   }, [
      init,
      position, gotoPosition,
      openCommand,
      tabSize
   ]);

   return (
      <EditorStatusCtx.Provider value={value}>
         {children}
      </EditorStatusCtx.Provider>
   );
}

export function useEditorStatus() {
   const ctx = useContext(EditorStatusCtx);
   if (!ctx) {
      throw new Error('useEditorStatus must be used in EditorStatusProvider');
   }
   return ctx;
}