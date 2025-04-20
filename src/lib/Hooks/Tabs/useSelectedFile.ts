import { useTabs } from "@/lib/Context/Tab";
import { useMemo } from "react";

/** 当前选中的tab的文件 */
export function useSelectedFile() {
    const { selectedTab } = useTabs();
    return useMemo(() => {
        return selectedTab?.type === 'file' ? selectedTab.content : null;
    }, [selectedTab]);
}
