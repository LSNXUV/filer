import { Right } from '@/components/Icons/Public/Direction'
import { Tree } from '@/components/Sider/FileTree/Tree'
import { Floating } from '@/components/public/Floating/Floating'
import { useFiles } from '@/lib/Context/File'
import styles from './index.module.scss'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useEditorStatus } from '@/lib/Context/EditorStatus'

const BreadCrumbs = memo(({ path }: {
    path: string
}) => {
    const { files } = useFiles()
    const [showTreeIndex, setShowTreeIndex] = useState<number>(-1)
    const paths = path.split('/')

    const containerRef = useRef<HTMLDivElement>(null)
    const floatingTreeRef = useRef<HTMLDivElement>(null)
    const [treePosition, setTreePosition] = useState({ top: 0, left: 0 });

    const { openCommand } = useEditorStatus()

    // 生成路径树
    const pathTree = useMemo(() => {
        if (!files) return null
        let dirs = paths.slice(0, showTreeIndex + 1)
        let depth = 0
        let dir: Files = files
        while (depth < dirs.length - 1) {
            dir = dir.children.find(item => item.name === dirs[depth + 1]) as Files
            depth++
        }
        return (
            <div className={styles.treeContainer} ref={floatingTreeRef}>
                <Tree files={dir} />
            </div>
        )
    }, [paths, showTreeIndex, files])

    const clickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)
            && floatingTreeRef.current && !floatingTreeRef.current.contains(e.target as Node)) {
            setShowTreeIndex(-1)
        }
    }
    useEffect(() => {
        document.addEventListener('click', clickOutside)
        return () => document.removeEventListener('click', clickOutside)
    }, [])

    return (
        <div className={styles.container} ref={containerRef}>
            {
                paths.map((route, index) => {
                    return (
                        <div key={index} className={styles.route}
                            onClick={(e) => {
                                if (index === paths.length - 1) {
                                    openCommand(path, '@');
                                    return;
                                }
                                const rect = e.currentTarget.getBoundingClientRect();
                                setTreePosition({
                                    top: rect.bottom,
                                    left: rect.left,
                                });
                                setShowTreeIndex(index)
                            }}
                        >
                            {route}
                            {index !== path.split('/').length - 1 && <Right size={'1em'} />}
                        </div>
                    )
                })
            }
            {
                showTreeIndex !== -1 &&
                <Floating position={treePosition}>
                    {showTreeIndex !== -1 && pathTree}
                </Floating>
            }
        </div>
    )
})

BreadCrumbs.displayName = 'BreadCrumbs'

export default BreadCrumbs;
