import FileIcon from '@/components/Icons/File/File'
import { Close } from '@/components/Icons/Public/Close'
import { Floating } from '@/components/public/Floating/Floating'
import { FileEditStatus, useFileEditStatus } from '@/lib/Context/FIleEditStatus'
import React from 'react'
import TabMenu from '../Menu'
import UnsavedDot from '../UnsavedDot'
import { Tab as TabType, useTabs } from '@/lib/Context/Tab'
import styles from './index.module.scss'

let dragDataStr = 'index' // 用于存储拖动数据的字符串

function Tab({ tab, index, onCloseTab }: {
    tab: TabType,
    index: number,
    onCloseTab: (index: number) => void
}) {
    const { getFileEditStatus } = useFileEditStatus()
    const { selectId, setSelectId, resortTabs } = useTabs()
    
    const [menuShow, setMenuShow] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });

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
                })
            }}
            //右键点击显示菜单
            onContextMenu={(e) => {
                e.preventDefault();
                setMenuPosition({
                    top: e.clientY - 5,
                    left: e.clientX - 5,
                });
                setMenuShow(true) // 显示菜单
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
            {
                menuShow &&
                <Floating position={menuPosition} zIndex={1000}>
                    <TabMenu tabId={tab.id} toggle={() => setMenuShow(b => !b)} />
                </Floating>
            }
        </div>
    )
}

export default Tab