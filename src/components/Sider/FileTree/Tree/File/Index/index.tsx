import FileIcon from "@/components/Icons/File/File"
import { Floating } from "@/components/public/Floating/Floating"
import { Files } from "@/lib/Types/File"
import styles from './index.module.scss'
import { useCallback, useRef, useState } from "react"
import FileMenu  from "@/components/Sider/FileTree/Tree/File/Menu"
import FileDetail from "@/components/Sider/FileTree/Tree/File/Detail"
import Rename from "@/components/Sider/FileTree/Tree/File/Rename"
import { useTabOp } from "@/lib/Hooks/useTabOp"


export function File({ file }: { file: Files }) {
    const { selectedFile } = useTabOp()
    const { selectFile, addFileToShowsRear } = useTabOp()

    const [isEditing, setIsEditing] = useState<boolean>(false)

    //文件详情和菜单显示位置
    const [detailPosition, setDetailPosition] = useState<{top:number,left:number}>({ top: 0, left: 0 });
    const [isDetailShow, setIsDetailShow] = useState<boolean>(false)

    //文件右键菜单显示位置
    const [menuPosition, setMenuPosition] = useState<{top:number,left:number}>({ top: 0, left: 0 });
    const [isMenuShow, setIsMenuShow] = useState<boolean>(false)

    //处理文件详情显示延迟
    const detailHoverTimer = useRef<number>(0);

    const menuToggle = useCallback(() => {
        setIsMenuShow((prev) => !prev);
      },[])

    const editToggle = useCallback(() => {
        setIsEditing((prev) => !prev);
    },[])
    
    return (
        <>
            <div className={`${styles.file} ${selectedFile?.path === file.path ? styles.active : ''}`}
                style={{ display: isEditing ? 'none' : 'flex' }}
                // 单击选中文件并显示
                onClick={() => {
                    selectFile(file);
                }}
                
                // 鼠标中键在队列后面添加文件，但是不选中
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (e.button === 1) {
                        addFileToShowsRear(file);
                    }
                }}
                //鼠标移入显示文件详情，移出隐藏
                onMouseEnter={(e) => {
                    if (isMenuShow) return;  //如果菜单显示则不显示详情

                    clearTimeout(detailHoverTimer.current);
                    detailHoverTimer.current = window.setTimeout(() => {
                        if (isMenuShow) return;
                        //设置详情位置
                        setDetailPosition({
                            top: e.clientY,
                            left: e.clientX,
                        });
                        setIsDetailShow(true);
                    }, 1000);
                }}
                onMouseMove={(e) => {
                    if(isDetailShow){
                        setDetailPosition({
                            top: e.clientY,
                            left: e.clientX,
                        })
                    }
                }}
                onMouseLeave={() => {
                    clearTimeout(detailHoverTimer.current);
                    setIsDetailShow(false);
                    setIsMenuShow(false)
                }}

                //右键点击显示菜单
                onContextMenu={(e) => {
                    e.preventDefault();
                    clearTimeout(detailHoverTimer.current);
                    setIsDetailShow(false);
                    setMenuPosition({
                        top: window.innerHeight - e.clientY < 180 ? e.clientY - 180 : e.clientY,
                        left: e.clientX - 10,
                    });
                    setIsMenuShow(true);
                }}
            >
                <span className={styles.icon}>
                    <FileIcon name={file.name} />
                </span>
                {file.name}
                <Floating show={isDetailShow} position={detailPosition} zIndex={1000}>
                    <FileDetail file={file} show={isDetailShow} />
                </Floating>
                <Floating show={isMenuShow} position={menuPosition} zIndex={1000}>
                    <FileMenu file={file} show={isMenuShow} toggle={menuToggle} editToggle={editToggle}/>
                </Floating>
            </div>
            <Rename file={file} show={isEditing} toggle={editToggle}/>
        </>
    )
}