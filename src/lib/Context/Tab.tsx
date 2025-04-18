import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type FileTab = {
    id: string,
    type: 'file',
    content: Files,
}

export type DefaultTab = {
    id: string,
    icon?: React.ReactNode,
    name?: string,
    type: 'default',
    content: React.ReactNode,
}

export type Tab = FileTab | DefaultTab

type TabsContextType = {
    /** tabs对象数组 */
    tabs: Tab[],
    /** 当前选中的tab */
    selectedTab: Tab | null,
    /** 设置整个tabs对象数组 */
    setTabs: (tabs: Tab[]) => void,
    /** 添加tab */
    addTab: (newTab: Tab, index?: number) => void,
    /** 关闭tab */
    closeTab: (index: number) => void,
    /** 设置当前选中的tab索引 */
    select: number,
    /** 设置当前选中的tab索引函数 */
    setSelect: (index: number) => void,
    /** 拖拽重新排序tabs，index为当前拖动元素的索引，newIndex为拖动到目标位置的索引 */
    resortTabs: (index: number, newIndex: number) => void,
}

export const TabsContext = createContext<TabsContextType | null>(null);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    // tabs对象数组
    const [tabs, settabs] = useState<Tab[]>([])
    //当前选中的文件索引
    const [select, setSelect] = useState<number>(-1)

    // 添加tab到tabs中，index为插入位置，默认插入到最后
    const addTab: TabsContextType['addTab'] = useCallback((newTab, index = -1) => {
        settabs(prevTabs => {
            if (index >= 0) {
                return [...prevTabs.slice(0, index), newTab, ...prevTabs.slice(index)];
            }
            return [...prevTabs, newTab];
        });
    }, [])

    // 重新排序tabs, index为当前拖动元素的索引，newIndex为拖动到目标位置的索引
    const resortTabs: TabsContextType['resortTabs'] = useCallback((index, newIndex) => {
        settabs(prevTabs => {
            const newTabs = [...prevTabs];
            const [movedTab] = newTabs.splice(index, 1);
            newTabs.splice(newIndex, 0, movedTab);
            return newTabs;
        });
    }, [])

    // 关闭tab
    const closeTab = useCallback((index: number) => {
        let len:number = 1;
        settabs(prevTabs => {
            len = prevTabs.length;
            if (index < 0 || index >= prevTabs.length) return prevTabs; // 如果索引不合法，则不动
            const newTabs = [...prevTabs];
            newTabs.splice(index, 1);
            return newTabs;
        });
        setSelect(select => {
            // 如果关闭的tab是当前选中或者之后的tab，则不动，或者选中最后一个（len-2）
            if (index >= select) {
                return Math.min(select, len - 2); 
            }
            // 如果关闭的tab在当前选中的tab之前，则选中前一个tab
            if (index < select) {        
                return Math.max(select - 1, 0);
            }
            return select;
        });
    }, [])

    const setTabs: TabsContextType['setTabs'] = useCallback((newTabs) => {
        settabs(newTabs)
    }, [])

    useEffect(() => {
        if (tabs.length === 1) {
            setSelect(0); // 如果只有一个tab，则选中第一个tab
        }
    }, [tabs])

    const selectedTab = useMemo(() => {
        if (select < 0 || select >= tabs.length) return null;
        return tabs[select];
    }, [select, tabs])

    const contextValue = useMemo<TabsContextType>(() => ({
        tabs,
        setTabs,
        addTab,
        resortTabs,
        closeTab,
        select,
        setSelect,
        selectedTab,
    }), [tabs, setTabs, addTab, resortTabs, closeTab, select, setSelect, selectedTab]);

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
}

export const useTabs = () => {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error('useTabs must be used within a TabProvider')
    }
    return context
}
