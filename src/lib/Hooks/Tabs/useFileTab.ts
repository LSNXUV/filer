import { useCallback, useMemo } from "react";
import { FileTab, useTabs } from "../../Context/Tab";

type UseFileTab = {
    /** 选中文件并打开查看*/
    selectFile: (file: Files) => void
    /** 当前选中的tab是否是文件 */
    isFileInTab: (file: Files) => boolean;
    /** 添加文件到查看队列末尾 */
    addFileToTabsRear: (file: Files) => void
    /** 关闭文件tab */
    closeFile: (param: string | number | Files) => void
}

export function useFileTab() {
    const { tabs, addTab, closeTab, setSelectId } = useTabs()

    /** 获取file的tabIndex */
    const findIndex = useCallback((file: Files) => {
        return tabs.findIndex(tab => tab.id === file.path);
    }, [tabs]);

    /** file是否已经在tab中 */
    const isFileInTab = useCallback((file: Files) => {
        return findIndex(file) !== -1;
    }, [findIndex]);

    /** 选中文件并打开查看 */
    const selectFile: UseFileTab['selectFile'] = useCallback((file) => {
        if (!isFileInTab(file)) {   // 没有在查看队列中，添加到查看队列
            addTab({
                id: file.path,
                type: 'file',
                content: file
            });
        }
        setSelectId(file.path); // 设置选中的tabId
    }, [addTab, isFileInTab, setSelectId]);

    /** 添加文件到查看队列末尾 */
    const addFileToTabsRear: UseFileTab['addFileToTabsRear'] = useCallback((file) => {
        if (isFileInTab(file)) {   //已经在查看队列中
            return;
        }
        // 没有在查看队列中，添加到查看队列末尾
        addTab({
            id: file.path,
            type: 'file',
            content: file
        });
    }, [isFileInTab, addTab])

    /** 关闭文件tab */
    const closeFile: UseFileTab['closeFile'] = useCallback((file) => {
        let idx: number | string;
        if (typeof file === 'number' || typeof file === 'string') {
            idx = file;
        } else {
            idx = file.path;
        }
        closeTab(idx);
    }, [closeTab])

    const fileTabObject = useMemo<UseFileTab>(() => {
        return {
            selectFile,
            isFileInTab,
            addFileToTabsRear,
            closeFile
        }
    }, [selectFile, isFileInTab, addFileToTabsRear, closeFile])

    return fileTabObject
}