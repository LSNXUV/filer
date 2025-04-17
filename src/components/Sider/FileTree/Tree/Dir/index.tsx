import { useCallback, useRef, useState } from "react"
import styles from './index.module.scss'
import { DirArrowIcon, DirCloseIcon, DirLoadingIcon, DirOpenIcon } from "@/components/Icons/File/Dir"
import { Floating } from "@/components/public/Floating/Floating"
import DirDetail from "@/components/Sider/FileTree/Tree/Dir/DirDetail/index"
import DirMenu from "@/components/Sider/FileTree/Tree/Dir/DirMenu/index"
import { useFiles } from "@/lib/Context/File"
import VirtualShow from "@/components/public/VirtualShow/VirtualShow"
import Children from "./Children"

const maxInitExpandLevel = 1

export function Dir({ dir, level }: {
    dir: Files
    level: number
}) {
    const { loadFilesAndHandles } = useFiles()

    const [loading, setLoading] = useState(false)
    //层级太大的dom不渲染，点击时再渲染
    const [initExpand, setInitExpand] = useState(level < maxInitExpandLevel ? true : false)
    const [expand, setExpand] = useState(level === 0 ? true : false)

    //目录详情和菜单显示位置
    const [detailPosition, setDetailPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
    const [isDetailShow, setIsDetailShow] = useState<boolean>(false)

    //目录右键菜单显示位置
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
    const [isMenuShow, setIsMenuShow] = useState<boolean>(false)

    //处理目录详情显示延迟
    const detailHoverTimer = useRef<number>(0);
    const menuToggle = useCallback(() => {
        setIsMenuShow((prev) => !prev);
    }, [])

    const dirToggle = useCallback(async (is?: boolean) => {
        if (!dir.loaded) {
            setLoading(true)
            console.log(dir);
            await loadFilesAndHandles({
                path: dir.path,
            })
            setLoading(false)
        }
        setInitExpand(true)
        requestAnimationFrame(() => {
            setExpand((prev) => is ?? !prev);   // 下一帧设置展开，触发动画
        });
    }, [dir, loadFilesAndHandles])

    return (
        <>
            <VirtualShow className={styles.dir}
                onClick={() => {
                    setIsDetailShow(false); //隐藏详情
                    dirToggle()
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
                    }, 1200);
                }}
                onMouseMove={(e) => {
                    if (isDetailShow) {
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
                    setIsDetailShow(false); //隐藏详情
                    setMenuPosition({
                        top: e.clientY,
                        left: e.clientX,
                    });
                    setIsMenuShow(true);
                }}
            >
                <span className={styles.icon}>
                    <DirArrowIcon className={`${styles.arrow} ${expand ? styles.expanded : ''}`} />
                </span>
                <span className={styles.icon}>
                    {loading
                        ? <DirLoadingIcon className={styles.loadnig} />
                        : !expand
                            ? <DirOpenIcon />
                            : <DirCloseIcon />
                    }
                </span>
                {dir.name}
                {
                    isDetailShow &&
                    <Floating position={detailPosition}>
                        <DirDetail file={dir}/>
                    </Floating>
                }
                {
                    isMenuShow &&
                    <Floating position={menuPosition}>
                        <DirMenu isTop={level === 0} file={dir} toggle={menuToggle}
                            dirToggle={dirToggle}
                        />
                    </Floating>
                }
            </VirtualShow>
            {
                initExpand &&
                <Children
                    expand={expand}
                    children={dir.children}
                    level={level}
                />
            }
        </>
    )
}