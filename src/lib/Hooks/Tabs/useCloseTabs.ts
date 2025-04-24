import { useCallback, useMemo } from "react";
import { FileTab, useTabs } from "../../Context/Tab";

type CloseTabs = {
    /** 关闭某tab左侧的全部tab */
    closeAllLeft: (tabId: string) => void
    /** 关闭某tab右侧的全部tab */
    closeAllRight: (tabId: string) => void
    /** 关闭所有tab */
    closeAllTabs: () => void,
}

export function useCloseTabs() {
    const { setTabs, setSelectId } = useTabs()

    const closeAllLeft = useCallback((tabId: string) => {
        setTabs(prevTabs => {
            const index = prevTabs.findIndex(tab => tab.id === tabId);
            if (index > 0) {
                return prevTabs.slice(index);
            }
            return prevTabs;
        });
    }, []);

    const closeAllRight = useCallback((tabId: string) => {
        setTabs(prevTabs => {
            const index = prevTabs.findIndex(tab => tab.id === tabId);
            if (index < prevTabs.length - 1) {
                return prevTabs.slice(0, index + 1);
            }
            return prevTabs;
        });
    }, []);

    const closeAllTabs: CloseTabs['closeAllTabs'] = useCallback(() => {
        setTabs([]);
        setSelectId('');
    }, []);

    const closeTabObject = useMemo<CloseTabs>(() => {
        return {
            closeAllLeft,
            closeAllRight,
            closeAllTabs,
        }
    }, [closeAllLeft, closeAllRight, closeAllTabs])

    return closeTabObject
}