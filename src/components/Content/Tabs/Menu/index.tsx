
import { useLang } from '@/lib/Context/Lang'

import styles from './index.module.scss'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useTabs } from '@/lib/Context/Tab'
import { useCloseTabs } from '@/lib/Hooks/Tabs/useCloseTabs'

const TabMenu = memo(function FileMenu({ tabId, toggle }: {
    tabId: string,
    toggle: () => void
}) {
    const { Lang } = useLang();
    const { closeTab } = useTabs()
    const { closeAllLeft, closeAllRight, closeAllTabs } = useCloseTabs()

    const getHandle = useCallback(<T extends (...args: any[]) => Promise<void> | void>(handle: T): T => {
        return (async (...args: any[]) => {
            await handle(...args)
            toggle()
        }) as T
    }, [toggle])

    const handleCloseAll = useMemo(() => getHandle(closeAllTabs), [getHandle, closeAllTabs])

    const handleCloseTab = useMemo(() => getHandle(closeTab), [getHandle, closeTab])

    const handleCloseLeft = useMemo(() => getHandle(closeAllLeft), [getHandle, closeAllLeft])

    const handleCloseRight = useMemo(() => getHandle(closeAllRight), [getHandle, closeAllRight])

    return (
        <div className={`bar ${styles.menu}`}
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={toggle}
        >
            <div onClick={() => handleCloseTab(tabId)}>
                {Lang.FileExploer.Sider.FileTree.Tree.File.FileMenu.close}
                <span>
                    Mid
                </span>
            </div>
            <div onClick={() => handleCloseLeft(tabId)}>
                {Lang.FileExploer.Content.Tabs.Menu.closeAllLeft}
                <span>
                    {`Ctrl + Alt + [`}
                </span>
            </div>
            <div onClick={() => handleCloseRight(tabId)}>
                {Lang.FileExploer.Content.Tabs.Menu.closeAllRight}
                <span>
                    {`Ctrl + Alt + ]`}
                </span>
            </div>
            <div onClick={handleCloseAll}>
                {Lang.FileExploer.Content.Tabs.Menu.closeAll}
                <span>
                    {`Ctrl + Alt + \\`}
                </span>
            </div>
        </div>
    )
})

TabMenu.displayName = 'TabMenu'

export default TabMenu;
