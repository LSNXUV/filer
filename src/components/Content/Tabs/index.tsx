
import styles from './index.module.scss'
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus'
import { useConfirm } from '@/lib/Context/Confirm'
import { useLang } from '@/lib/Context/Lang'
import { useTabs } from '@/lib/Context/Tab'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import { useCallback, useEffect } from 'react'
import Tab from './Tab'
import { useCloseTabs } from '@/lib/Hooks/Tabs/useCloseTabs'

export default function Tabs() {
    const { confirm } = useConfirm()
    const { Lang } = useLang()
    const { getFileEditStatus, setFileEditStatus } = useFileEditStatus()
    const { tabs, selectId, closeTab } = useTabs()
    const { closeAllLeft, closeAllLeftSaved, closeAllRight, closeAllRightSaved, closeAll, closeAllSaved } = useCloseTabs()
    const selectedFile = useSelectedFile()

    const onCloseTab = useCallback((idx: number | string) => {
        const index = typeof idx === 'number' ? idx : tabs.findIndex(tab => tab.id === idx) // 获取当前选中的tab的索引
        if (selectedFile) {     //如果当前选中的tab是文件
            if (getFileEditStatus(selectedFile.path).status === FileEditStatus.unSaved) {
                confirm({
                    title: Lang.FileExploer.Content.Tabs.onCloseFile.title,
                    description: Lang.FileExploer.Content.Tabs.onCloseFile.info,
                    onConfirm() {
                        setFileEditStatus(selectedFile.path, {
                            status: FileEditStatus.saved,   // 标记为已保存，状态改变里面自动执行保存操作
                        })
                        closeTab(index)
                    },
                    onCancel() {
                        setFileEditStatus(selectedFile.path, {
                            status: FileEditStatus.notSave, // 标记为不保存，状态改变里面不执行保存操作
                        })
                        //不保存直接关闭
                        closeTab(index)
                    },
                    closable: true
                })

            } else {    // 无需保存
                closeTab(index)
            }
        } else {    // 如果当前选中的tab不是文件
            closeTab(index); // 执行关闭操作
        }
    }, [tabs, selectedFile, getFileEditStatus, setFileEditStatus, closeTab, confirm, Lang.FileExploer.Content.Tabs.onCloseFile.title, Lang.FileExploer.Content.Tabs.onCloseFile.info])

    // 选中标签时，自动滚动到视口
    useEffect(() => {
        const tab = document.querySelector(`[tab-id="${selectId}"]`) as HTMLDivElement
        if (tab) {
            tab?.scrollIntoView({
                behavior: 'smooth', // 平滑滚动
                block: 'center', // 滚动到最近的边界
                inline: 'center' // 滚动到最近的边界
            })
        }
    }, [selectId])

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ctrl + Alt + [ 关闭当前tab左侧的所有tab
        if (event.ctrlKey && event.altKey) {
            if (event.key === '[') {
                event.preventDefault()
                if (event.shiftKey) {
                    closeAllLeft(selectId)
                } else {
                    closeAllLeftSaved(selectId)
                }
            } else if (event.key === ']') {
                event.preventDefault()
                if (event.shiftKey) {
                    closeAllRightSaved(selectId)
                } else {
                    closeAllRight(selectId)
                }
            } else if (event.key === '\\') {
                event.preventDefault()
                if (event.shiftKey) {
                    closeAllSaved()
                } else {
                    closeAll()
                }
            } else if (event.key.toLocaleLowerCase() === 'w') { // Ctrl + Alt + W 关闭当前tab
                event.preventDefault()
                onCloseTab(selectId)
            }

        }
    }, [selectId, onCloseTab, closeAllLeft, closeAllRight, closeAll]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className={styles.container}>
            {
                tabs.map((tab, index) => {
                    return (
                        <Tab key={tab.id} tab={tab} index={index} onCloseTab={onCloseTab} />
                    )
                })
            }
        </div>
    )
}
