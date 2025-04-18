import { useCallback, useMemo } from "react";
import { FileTab, useTabs } from "../../Context/Tab";

export function useFileTab() {
    const { tabs, addTab, closeTab, selectedTab, setSelect } = useTabs()

    /** 选当前中的tab文件file */
    const selectedFile = useMemo(() => {
        return selectedTab?.type === 'file' ? selectedTab.content : null
    }, [selectedTab]);

    /** tabs里面的文件tabs */
    const fileTabs = useMemo(() => {
        return tabs.map((tab, index) => {
            if (tab.type === 'file')
                return { tab, index };
        }).filter(Boolean) as { tab: FileTab, index: number }[];
    }, [tabs]);

    /** 获取file的tabIndex */
    const findIndex = useCallback((file: Files) => {
        return fileTabs.findIndex(ft => ft.tab.id === file.path);
    }, [fileTabs]);

    /** file是否已经在tab中 */
    const isFileInTab = useCallback((file: Files) => {
        return findIndex(file) !== -1;
    }, [findIndex]);

    /** 选中文件并打开查看 */
    const selectFile = useCallback((file: Files) => {
        const index = findIndex(file);
        if (index !== -1) {     // 已经在查看队列中, 直接选中
            setSelect(index);
            return;
        }
        // 没有在查看队列中，添加到查看队列
        addTab({
            id: file.path,
            type: 'file',
            content: file
        });
        setSelect(fileTabs.length); // 选中最后一个，旧的len就是新的len-1
    }, [fileTabs, addTab, setSelect]);

    /** 添加文件到查看队列末尾 */
    const addFileToTabsRear = useCallback((file: Files) => {
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
    const closeFile = useCallback((file: number | Files): void => {
        let index: number;
        if (typeof file === 'number') {
            index = file;
        } else {
            index = findIndex(file);
            if (index === -1) return;  //不存在直接返回
        }
        closeTab(index);
    }, [closeTab])

    const fileTabObject = useMemo<{
        /** 选中文件并打开查看*/
        selectFile: (file: Files) => void
        /** 当前选中的文件 */
        selectedFile: Files | null;
        /** 当前选中的tab是否是文件 */
        hasSelectedFile: boolean;
        /** 当前选中的tab是否是文件 */
        isFileInTab: (file: Files) => boolean;
        /** 添加文件到查看队列末尾 */
        addFileToTabsRear: (file: Files) => void
        /** 关闭文件tab */
        closeFile: (param: number | Files) => void
    }>(() => {
        return {
            selectFile, selectedFile,
            hasSelectedFile: !!selectedFile,
            isFileInTab,
            addFileToTabsRear,
            closeFile
        }
    }, [selectFile, selectedFile, isFileInTab, addFileToTabsRear, closeFile])

    return fileTabObject
}