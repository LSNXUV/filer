
import styles from './index.module.scss'
import { Close } from '@/components/Icons/Public/Close'
import FileIcon from '@/components/Icons/File/File'
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus'
import { useConfirm } from '@/lib/Context/Confirm'
import { useLang } from '@/lib/Context/Lang'
import { useTabs } from '@/lib/Context/Tab'
import { useSelectedFile } from '@/lib/Hooks/Tabs/useSelectedFile'


export default function Tabs() {
    const { confirm } = useConfirm()
    const { Lang } = useLang()
    const { getFileEditStatus, setFileEditStatus } = useFileEditStatus()

    const { tabs, select, setSelect, closeTab, resortTabs } = useTabs()

    const selectedFile = useSelectedFile()


    const onCloseFile = (file: Files, index: number) => {
        if (getFileEditStatus(file.path).status === FileEditStatus.unSaved) {
            confirm({
                title: Lang.FileExploer.Content.Tabs.onCloseFile.title,
                info: Lang.FileExploer.Content.Tabs.onCloseFile.info,
                onConfirm() {
                    setFileEditStatus(file.path, {
                        status: FileEditStatus.saved,   // 标记为已保存，状态改变里面自动执行保存操作
                    })
                    closeTab(index)
                },
                onCancel() {
                    setFileEditStatus(file.path, {
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
    }

    const onCloseTab = (index: number) => {
        if (selectedFile) {     //如果当前选中的tab是文件
            onCloseFile(selectedFile, index)
        } else {
            closeTab(index); // 执行关闭操作
        }
    }

    return (
        <div className={styles.container}>
            {
                tabs.map((tab, index) => {
                    const file = tab.type === 'file' ? tab.content : null; // 如果是文件类型，获取文件对象
                    const isFile = tab.type === 'file'; // 判断是否是文件类型
                    return (
                        <div key={index} className={`${styles.tab} ${index === select ? styles.active : ''}`}
                            onClick={() => {
                                setSelect(index)
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
                                e.dataTransfer.setData('index', index.toString())    //传递当前拖拽的index
                            }}
                            onDragOver={(e) => {
                                e.preventDefault()
                            }}
                            onDrop={(e) => {
                                e.preventDefault()
                                let fromIndex = Number(e.dataTransfer.getData('index')) //获取拖拽的index
                                console.log(fromIndex, index);
                                // if (fromIndex === index) return  //如果拖拽的index和放置的index相同，不做处理
                                // let newShowfiles = [...tabs]
                                // // console.log(newShowfiles, 'newShowfiles');
                                // //将拖拽的index的元素插入到放置的index
                                // console.log(structuredClone(newShowfiles), 'newShowfiles');
                                // newShowfiles.splice(index, 0, newShowfiles.splice(fromIndex, 1)[0])
                                // console.log(newShowfiles, 'newShowfiles');
                                // setTabs(newShowfiles)
                                // // setSelect(index)
                                // if (fromIndex === select || index === select) {
                                //     setSelect(index)
                                // }
                                resortTabs(fromIndex, index) // 重新排序tabs

                            }}
                        >
                            <div className={styles.icon}>
                                {
                                    isFile
                                        ? <FileIcon name={file?.name} />
                                        : tab.icon
                                }
                            </div>
                            <span className={styles.name}>
                                {
                                    isFile
                                        ? file?.name
                                        : tab.name
                                }
                            </span>
                            <span className={styles.close}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onCloseTab(index)
                                }}
                            >
                                {
                                    file && getFileEditStatus(file.path).status === FileEditStatus.unSaved
                                        ? <div
                                            style={{
                                                width: 14,
                                                height: 14,
                                                display: 'flex',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    margin: 'auto',
                                                    padding: 4,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'white',
                                                }}
                                            >
                                            </div>
                                        </div>
                                        : <Close size={14} fill="#bfbfbf" />
                                }
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
