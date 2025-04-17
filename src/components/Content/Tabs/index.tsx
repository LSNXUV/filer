
import styles from './index.module.scss'
import { useFiles } from '@/lib/Context/File'
import { Close } from '@/components/Icons/Public/Close'
import { useTabOp } from '@/lib/Hooks/useTabOp'
import FileIcon from '@/components/Icons/File/File'
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus'
import { useConfirm } from '@/lib/Context/Confirm'
import { useLang } from '@/lib/Context/Lang'


export default function Tabs() {
    const { confirm } = useConfirm()
    const { Lang } = useLang()
    const { getFileEditStatus, setFileEditStatus } = useFileEditStatus()
    const { tabs, setTabs, select, setSelect } = useFiles()

    const { closeFile } = useTabOp()

    const onCloseFile = (file: Files, index: number) => {
        if (getFileEditStatus(file.path).status === FileEditStatus.unSaved) {
            confirm({
                title: Lang.FileExploer.Content.Tabs.onCloseFile.title,
                info: Lang.FileExploer.Content.Tabs.onCloseFile.info,
                onConfirm() {
                    setFileEditStatus(file.path, {
                        status: FileEditStatus.saved,
                    })
                    closeFile(index)
                },
                onCancel() {
                    setFileEditStatus(file.path, {
                        status: FileEditStatus.notSave,
                    })
                    //不保存直接关闭
                    closeFile(index)
                },
                closable: true,
                onClose() {
                    // closeFile(index)
                }
            })

        } else {
            closeFile(index)
        }
    }
    
    return (
        <div className={styles.container}>
            {
                tabs.map((file, index) => {
                    return (
                        <div key={index} className={`${styles.tab} ${index === select ? styles.active : ''}`}
                            onClick={() => {
                                setSelect(index)
                            }}
                            // 鼠标中键关闭标签
                            onMouseDown={(e) => {
                                if (e.button === 1) {
                                    e.preventDefault(); // 阻止默认行为
                                    onCloseFile(file, index); // 执行关闭操作
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
                                if (fromIndex === index) return  //如果拖拽的index和放置的index相同，不做处理
                                let newShowfiles = [...tabs]
                                //将拖拽的index的元素插入到放置的index
                                newShowfiles.splice(index, 0, newShowfiles.splice(fromIndex, 1)[0])
                                setTabs(newShowfiles)
                                // setSelect(index)
                                if (fromIndex === select || index === select) {
                                    setSelect(index)
                                }

                            }}
                        >
                            <div className={styles.icon}><FileIcon name={file.name} /></div>
                            <span className={styles.name}>{file.name}</span>
                            <span className={styles.close}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onCloseFile(file, index)
                                }}
                            >
                                {
                                    getFileEditStatus(file.path).status === FileEditStatus.unSaved
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
                                                    backgroundColor: '#ffffff',
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
