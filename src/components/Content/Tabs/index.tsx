
import styles from './index.module.scss'
import { useFiles } from '@/lib/Context/File'
import { Close } from '@/components/Icons/Public/Close'
import { useTabOp } from '@/lib/Hooks/useTabOp'


export default function Tabs() {
    const { tabs,setTabs,select,setSelect } = useFiles()

    const { closeFile } = useTabOp()
    
    return (
        <div className={styles.container}>
            {
                tabs.map((item, index) => {
                    return (
                        <div key={index} className={`${styles.tab} ${index === select ? styles.active : ''}`}
                            onClick={()=>{
                                setSelect(index)
                            }}
                            // 鼠标中键关闭标签
                            onMouseDown={(e) => {
                                if (e.button === 1) {
                                    e.preventDefault(); // 阻止默认行为
                                    closeFile(index); // 执行关闭操作
                                }
                            }}
                            draggable
                            onDragStart={(e)=>{
                                e.dataTransfer.setData('index',index.toString())    //传递当前拖拽的index
                            }}
                            onDragOver={(e)=>{
                                e.preventDefault()
                            }}
                            onDrop={(e)=>{
                                e.preventDefault()
                                let fromIndex = Number(e.dataTransfer.getData('index')) //获取拖拽的index
                                if(fromIndex === index) return  //如果拖拽的index和放置的index相同，不做处理
                                let newShowfiles = [...tabs] 
                                //将拖拽的index的元素插入到放置的index
                                newShowfiles.splice(index,0,newShowfiles.splice(fromIndex,1)[0]) 
                                setTabs(newShowfiles)
                                // setSelect(index)
                                if(fromIndex === select || index === select){
                                    setSelect(index)
                                }
                                
                            }}
                        >
                            <span className={styles.name}>{item.name}</span>
                            <span className={styles.icon}
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    closeFile(index)
                                }}
                            >
                                <Close size={16} color="#bfbfbf" />
                                <span className={styles.tip} style={{cursor:'auto'}} onClick={(e) => {
                                    e.stopPropagation()
                                }}>鼠标中键快速关闭</span>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
