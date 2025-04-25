import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type FileTab = {
    /** 文件path */
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
    /** 设置tabs */
    setTabs: React.Dispatch<React.SetStateAction<Tab[]>>,
    /** 添加tab */
    addTab: (newTab: Tab, index?: number) => void,
    /** 关闭tab */
    closeTab: (idx: string | number) => void,
    /** 当前选中的tabId */
    selectId: string,
    /** 设置当前选中的tabId */
    setSelectId: (id: string) => void,
    /** 拖拽重新排序tabs，index为当前拖动元素的索引，newIndex为拖动到目标位置的索引 */
    resortTabs: (from: number, to: number) => void,
}

export const TabsContext = createContext<TabsContextType | null>(null);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [tabs, setTabs] = useState<Tab[]>([])
    const [selectId, setSelectId] = useState<string>('')

    useEffect(() => {
        if (tabs.length === 1) {
            setSelectId(tabs[0].id); // 设置选中tab的id
        } else if (tabs.length === 0) {
            setSelectId(''); // 清空选中tab的id
        }
    }, [tabs])

    const select = useMemo(() => {
        return tabs.findIndex(tab => tab.id === selectId)
    }, [tabs, selectId])

    const selectedTab = useMemo(() => {
        // 如果没有选中tab，则选中第一个tab
        if (select < 0 || select >= tabs.length) {
            setSelectId(tabs[0]?.id || ''); 
            return tabs[0] || null;
        }
        return tabs[select];
    }, [select, tabs])

    // 添加tab到tabs中，index为插入位置，默认插入到最后
    const addTab: TabsContextType['addTab'] = useCallback((newTab, index = -1) => {
        setTabs(prevTabs => {
            if (index >= 0) {
                return [...prevTabs.slice(0, index), newTab, ...prevTabs.slice(index)];
            }
            return [...prevTabs, newTab];
        });
    }, [])

    // 重新排序tabs, from为当前拖动tab的索引，to为拖动到目标位置的索引
    const resortTabs: TabsContextType['resortTabs'] = useCallback((from, to) => {
        let len: number = 1;

        setTabs(prevTabs => {
            len = prevTabs.length;
            const newTabs = [...prevTabs];
            const [movedTab] = newTabs.splice(from, 1);
            newTabs.splice(to, 0, movedTab);

            // 计算新的选中tab的索引
            let newSelect = select;
            // 如果拖动tab的index和落点newIndex都大于或者都小于当前选中tab，则不用动。
            if (!((from > select && to > select) || (from < select && to < select))) {
                // 如果就是拖动当前选中的tab，则直接选中落点
                if (from === select) {
                    newSelect = to;
                }
                // 如果拖动tab的index大于当前选中tab，落点小于等于当前选中tab，则选中落点+1
                if (from > select && to <= select) {
                    newSelect = Math.min(select + 1, len - 1);
                }
                // 如果拖动tab的index小于当前选中tab，落点大于等于当前选中tab，则选中落点-1
                if (from < select && to >= select) {
                    newSelect = Math.max(select - 1, 0);
                }
                setSelectId(newTabs[newSelect].id); // 设置选中tab的id
            }
            return newTabs;
        });
    }, [select])

    // 关闭tab
    const closeTab: TabsContextType['closeTab'] = useCallback((idx) => {
        setTabs(prevTabs => {
            let index = -1;
            if (typeof idx === 'string') {
                index = prevTabs.findIndex(tab => tab.id === idx); // 如果传入的是id，则查找索引
            } else {
                index = idx;
            }
            if (index < 0 || index >= prevTabs.length) return prevTabs; // 如果索引不合法，则不动
            const newTabs = [...prevTabs];
            newTabs.splice(index, 1);
            //调整选中tab的id，只有在关闭的tab是选中tab时才需要调整
            if (index === select) {
                if (newTabs.length > 0) {
                    setSelectId(newTabs[Math.min(index, newTabs.length - 1)].id); // 设置选中tab的id
                }
            }
            return newTabs;
        });
    }, [select])



    const contextValue = useMemo<TabsContextType>(() => ({
        tabs,setTabs,
        addTab,
        resortTabs,
        closeTab, 
        selectId, setSelectId,
        selectedTab,
    }), [tabs, addTab, resortTabs, closeTab, selectId, selectedTab]);

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
