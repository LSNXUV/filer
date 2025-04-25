import { useCallback, useMemo } from "react";
import { FileTab, Tab, useTabs } from "../../Context/Tab";
import { FileEditStatus, useFileEditStatus } from "@/lib/Context/FIleEditStatus";
import { useConfirm } from "@/lib/Context/Confirm";
import { useLang } from "@/lib/Context/Lang";

type CloseTabs = {
    /** 关闭某tab左侧的全部tab */
    closeAllLeft: (tabId: string) => void
    /** 关闭某tab左侧的全部已保存tab */
    closeAllLeftSaved: (tabId: string) => void
    /** 关闭某tab右侧的全部tab */
    closeAllRight: (tabId: string) => void
    /** 关闭某tab右侧的全部已保存tab */
    closeAllRightSaved: (tabId: string) => void
    /** 关闭所有tab, callback在关闭之后才执行  */
    closeAll: (callback?: () => void) => void,
    /** 关闭所有已保存tab */
    closeAllSaved: () => void,
}

export function useCloseTabs() {
    const { Lang } = useLang()
    const { setTabs } = useTabs()
    const { getFileEditStatus, setFileEditStatus, clearFileEditStatus } = useFileEditStatus()
    const { confirm } = useConfirm()

    const closeAllLeft: CloseTabs['closeAllLeft'] = useCallback((tabId) => {
        let prevTabs: Tab[] = [];   // 用于存储当前tabs
        setTabs(pre => (prevTabs = pre, pre));
        const index = prevTabs.findIndex(tab => tab.id === tabId);
        // 如果没有左侧tab，直接返回
        if (index <= 0) return;
        // 如果左侧没有未保存的tab，直接关闭
        if (!prevTabs.slice(0, index).some(tab => getFileEditStatus(tab.id).status === FileEditStatus.unSaved)) {
            setTabs(prevTabs.slice(index));
        } else {
            // 如果左侧有未保存的tab，弹出提示框
            const close = (status: FileEditStatus) => {
                prevTabs.slice(0, index).forEach(tab => {
                    if (tab.type === 'file') {
                        setFileEditStatus(tab.id, { status })
                    }
                })
                setTabs(prevTabs.slice(index));
            }
            confirm({
                title: Lang.Global.close,
                description: Lang.Lib.Hooks.useCloseTabs.isCloseNeedSave,
                onConfirm() {
                    close(FileEditStatus.saved)
                },
                onCancel() {
                    close(FileEditStatus.notSave)
                },
                closable: true
            })
        }
    }, [setTabs, getFileEditStatus, setFileEditStatus, confirm, Lang]);

    const closeAllLeftSaved: CloseTabs['closeAllLeftSaved'] = useCallback((tabId) => {
        setTabs(prevTabs => {
            const index = prevTabs.findIndex(tab => tab.id === tabId);
            if (index > 0) {
                const leftTabs = prevTabs.slice(0, index).filter(tab => {
                    if (tab.type === 'file') {
                        const fileStatus = getFileEditStatus(tab.id)
                        return fileStatus.status !== FileEditStatus.saved
                    }
                    return true
                })
                return [...leftTabs, ...prevTabs.slice(index)];
            }
            return prevTabs;
        });
    }, [setTabs, getFileEditStatus]);

    const closeAllRight: CloseTabs['closeAllRight'] = useCallback((tabId) => {
        let prevTabs: Tab[] = [];   // 用于存储当前tabs
        setTabs(pre => (prevTabs = pre, pre));  // 先获取当前tabs
        const index = prevTabs.findIndex(tab => tab.id === tabId);
        // 如果没有右侧tab，直接返回
        if (index >= prevTabs.length - 1) return;
        // 如果右侧没有未保存的tab，直接关闭
        if (!prevTabs.slice(index + 1).some(tab => getFileEditStatus(tab.id).status === FileEditStatus.unSaved)) {
            setTabs(prevTabs.slice(0, index + 1));
        } else {
            // 如果右侧有未保存的tab，弹出提示框
            const close = (status: FileEditStatus) => {
                prevTabs.slice(index + 1).forEach(tab => {
                    if (tab.type === 'file') {
                        setFileEditStatus(tab.id, { status })
                    }
                })
                setTabs(prevTabs.slice(0, index + 1));
            }
            confirm({
                title: Lang.Global.close,
                description: Lang.Lib.Hooks.useCloseTabs.isCloseNeedSave,
                onConfirm() {
                    close(FileEditStatus.saved)
                },
                onCancel() {
                    close(FileEditStatus.notSave)
                },
                closable: true
            })
        }
    }, [setTabs, getFileEditStatus, setFileEditStatus, confirm, Lang]);

    const closeAllRightSaved: CloseTabs['closeAllRightSaved'] = useCallback((tabId) => {
        setTabs(prevTabs => {
            const index = prevTabs.findIndex(tab => tab.id === tabId);
            if (index < prevTabs.length - 1) {
                const rightTabs = prevTabs.slice(index + 1).filter(tab => {
                    if (tab.type === 'file') {
                        const fileStatus = getFileEditStatus(tab.id)
                        return fileStatus.status !== FileEditStatus.saved
                    }
                    return true
                })
                return [...prevTabs.slice(0, index + 1), ...rightTabs];
            }
            return prevTabs;
        });
    }, [setTabs, getFileEditStatus]);

    const closeAll: CloseTabs['closeAll'] = useCallback((callback) => {
        let prevTabs: Tab[] = [];   // 用于存储当前tabs
        setTabs(pre => (prevTabs = pre, pre));  // 先获取当前tabs
        /** 清除函数 */
        const clear = () => {
            setTabs([]);
            clearFileEditStatus()
            callback?.()
        }
        // 如果没有未保存的tab，直接关闭
        if (!prevTabs.some(tab => tab.type === 'file' && getFileEditStatus(tab.id).status === FileEditStatus.unSaved)) {
            clear()
        } else {
            // 如果有未保存的tab，弹出提示框
            const close = (status: FileEditStatus) => {
                prevTabs.forEach(tab => {
                    if (tab.type === 'file') {
                        setFileEditStatus(tab.id, { status })
                    }
                })
                clear()
            }
            confirm({
                title: Lang.Global.close,
                description: Lang.Lib.Hooks.useCloseTabs.isCloseNeedSave,
                onConfirm() {
                    close(FileEditStatus.saved)
                },
                onCancel() {
                    close(FileEditStatus.notSave)
                },
                closable: true
            })
        }
    }, [Lang, clearFileEditStatus, setTabs, getFileEditStatus, setFileEditStatus, confirm]);

    const closeAllSaved: CloseTabs['closeAllSaved'] = useCallback(() => {
        setTabs(prevTabs => prevTabs.filter(tab => {
            if (tab.type === 'file') {
                const fileStatus = getFileEditStatus(tab.id)
                return fileStatus.status !== FileEditStatus.saved
            }
            return true
        }));
    }, [setTabs, getFileEditStatus]);

    const closeTabObject = useMemo<CloseTabs>(() => {
        return {
            closeAllLeft, closeAllLeftSaved,
            closeAllRight, closeAllRightSaved,
            closeAll, closeAllSaved,
        }
    }, [
        closeAllLeft, closeAllLeftSaved,
        closeAllRight, closeAllRightSaved,
        closeAll, closeAllSaved])

    return closeTabObject
}