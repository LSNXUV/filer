import { useTabs } from "@/lib/Context/Tab";
import { useMemo } from "react";

export function useSelectedFile(): Files | null {
    const { selectedTab } = useTabs();
    return useMemo(() => {
        return selectedTab?.type === 'file' ? selectedTab.content : null;
    }, [selectedTab]);
}
