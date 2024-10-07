import { Files } from "@/lib/Types/File"
import { Tree } from "@/components/Sider/FileTree/Tree/Index/index"
import { useCallback, useRef, useState } from "react"
import styles from './index.module.scss'
import { DirCloseIcon, DirOpenIcon } from "@/components/Icons/File/Dir"
import { Floating } from "@/components/public/Floating/Floating"
import DirDetail from "@/components/Sider/FileTree/Tree/Dir/DirDetail/index"
import DirMenu from "@/components/Sider/FileTree/Tree/Dir/DirMenu/index"

const maxInitExpandLevel = 1

export function Dir({ dir,level }: { 
    dir: Files 
    level: number
}) {

    //层级太大的dom不渲染，点击时再渲染
    const [initExpand, setInitExpand] = useState(level < maxInitExpandLevel ? true : false)
    const [expand, setExpand] = useState(level === 0 ? true : false)

    //目录详情和菜单显示位置
    const [detailPosition, setDetailPosition] = useState<{top:number,left:number}>({ top: 0, left: 0 });
    const [isDetailShow, setIsDetailShow] = useState<boolean>(false)

    //目录右键菜单显示位置
    const [menuPosition, setMenuPosition] = useState<{top:number,left:number}>({ top: 0, left: 0 });
    const [isMenuShow, setIsMenuShow] = useState<boolean>(false)

    //处理目录详情显示延迟
    const detailHoverTimer = useRef<number>(0);
    const menuToggle = useCallback(() => {
        setIsMenuShow((prev) => !prev);
    },[])

    const dirToggle = useCallback((is?:boolean) => {
        setInitExpand(true)
        setExpand((prev) => is ?? !prev);
    },[])

    return (
        <>
            <div className={styles.dir}
                onClick={()=>dirToggle()}
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
                    {!expand ? <DirOpenIcon /> : <DirCloseIcon />}
                </span>
                {dir.name}
                <Floating show={isDetailShow} position={detailPosition}>
                    <DirDetail file={dir} show={isDetailShow} />
                </Floating>
                <Floating show={isMenuShow} position={menuPosition}>
                    <DirMenu isTop={level === 0} file={dir} show={isMenuShow} toggle={menuToggle}
                        dirToggle={dirToggle}
                    />
                </Floating>
            </div>
            {
                initExpand && 
                (<div style={{display: expand ? 'block' : 'none'}}>
                    {dir.children.map((file, index) => (
                        <Tree key={index} files={file} level={level + 1}/>
                    ))}
                </div>)
            }
        </>
    )
}