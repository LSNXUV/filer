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
    tabs: Tab[],
    selectedTab: Tab | null,
    setTabs: (tabs: Tab[]) => void,
    addTab: (newTab: Tab, index?: number) => void,
    closeTab: (index: number) => void,
    select: number,
    setSelect: (index: number) => void,
    resortTabs: (index: number, newIndex: number) => void,
}

export const TabsContext = createContext<TabsContextType | null>(null);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [tabs, settabs] = useState<Tab[]>([])
    const [select, setSelect] = useState<number>(-1) //当前选中的文件索引

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
        settabs(prevTabs => {
            if (index < 0 || index >= prevTabs.length) return prevTabs;
            const newTabs = [...prevTabs];
            newTabs.splice(index, 1);
            return newTabs;
        });
        setSelect(select => {
            if (select === index) {         // 如果关闭的tab是当前选中的tab，则选中前一个tab
                return index - 1;
            } else if (select > index) {    // 如果关闭的tab在当前选中的tab之前，则选中当前选中的tab不变  
                return select - 1;
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
