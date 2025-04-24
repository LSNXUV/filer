
import styles from './index.module.scss'
import { Close } from '@/components/Icons/Public/Close'
import FileIcon from '@/components/Icons/File/File'
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus'
import { useConfirm } from '@/lib/Context/Confirm'
import { useLang } from '@/lib/Context/Lang'
import { useTabs } from '@/lib/Context/Tab'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'
import UnsavedDot from './UnsavedDot'
import { useEffect } from 'react'

let dragDataStr = 'index' // 用于存储拖动数据的字符串

export default function Tabs() {
    const { confirm } = useConfirm()
    const { Lang } = useLang()
    const { getFileEditStatus, setFileEditStatus } = useFileEditStatus()

    const { tabs, selectId, setSelectId, closeTab, resortTabs } = useTabs()

    const selectedFile = useSelectedFile()

    const onCloseTab = (index: number) => {
        if (selectedFile) {     //如果当前选中的tab是文件
            if (getFileEditStatus(selectedFile.path).status === FileEditStatus.unSaved) {
                confirm({
                    title: Lang.FileExploer.Content.Tabs.onCloseFile.title,
                    info: Lang.FileExploer.Content.Tabs.onCloseFile.info,
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
                    closable: true,
                    onClose() {
                        // 啥操作都不做
                    }
                })

            } else {
                closeTab(index)
            }
        } else {
            closeTab(index); // 执行关闭操作
        }
    }

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

    return (
        <div className={styles.container}>
            {
                tabs.map((tab, index) => {
                    const file = tab.type === 'file' ? tab.content : null; // 如果是文件类型，获取文件对象
                    const isFile = tab.type === 'file'; // 判断是否是文件类型
                    return (
                        <div key={tab.id} tab-id={tab.id} className={`${styles.tab} ${tab.id === selectId ? styles.active : ''}`}
                            onClick={() => {
                                setSelectId(tab.id)
                                // 选中标签时，文件树也自动滚动到视口
                                const fileEle = document.querySelector(`[file-id="${file?.path}"]`) as HTMLDivElement
                                fileEle?.scrollIntoView({
                                    behavior: 'smooth', // 平滑滚动
                                    block: 'center', // 滚动到最近的边界
                                    inline: 'center' // 滚动到最近的边界
                                })
                            }}
                            // 鼠标中键关闭标签
                            onMouseDown={(e) => {
                                if (e.button === 1) {
                                    e.preventDefault(); // 阻止默认行为
                                    onCloseTab(index) // 关闭当前标签
                                }
                            }}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(dragDataStr, index.toString()); // 设置拖动数据
                            }}
                            onDragOver={(e) => {
                                e.preventDefault()
                            }}
                            onDrop={(e) => {
                                e.preventDefault()
                                const fromIndexStr = e.dataTransfer.getData(dragDataStr);
                                if (!fromIndexStr) {
                                    console.error('drag over error: fromIndexStr is an empty string');
                                    return;
                                }
                                const fromIndex = Number(fromIndexStr);
                                resortTabs(fromIndex, index);
                            }}
                        >
                            <div className={styles.icon}>
                                {
                                    isFile
                                        ? <FileIcon name={file?.name} />
                                        : tab.icon
                                }
                            </div>
                            <div className={styles.name}>
                                {
                                    isFile
                                        ? file?.name
                                        : tab.name
                                }
                            </div>
                            <div className={
                                `${styles.close} ${tab.id === selectId ? styles.active : ''} ${file && getFileEditStatus(file.path).status === FileEditStatus.unSaved
                                    ? styles.unsaved
                                    : ''
                                }`
                            }
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onCloseTab(index)
                                }}
                            >
                                {
                                    file && getFileEditStatus(file.path).status === FileEditStatus.unSaved
                                        ? <UnsavedDot />
                                        : <Close size={14} />
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
