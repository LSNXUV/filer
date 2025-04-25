// 'use client'

import React, { useCallback, useEffect } from 'react'
import styles from './index.module.scss'

export default function Resizer({ width, toggleSider, setWidth, setHasWidthTransition }: {
    width: number
    toggleSider: (b?: boolean) => void
    setWidth: (width: number) => void
    setHasWidthTransition?: (b: boolean) => void
}) {

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setHasWidthTransition?.(false); // 禁用过渡动画
        const startX = e.clientX;

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX;
            const newWidth = Math.min(Math.max(200, width + delta), window.innerWidth - 200); // 限制最小和最大宽度
            if (width + delta < 100) {
                toggleSider?.(false); // 过小则收起
            } else {
                toggleSider?.(true);
            }
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setHasWidthTransition?.(true); // 恢复过渡动画
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [toggleSider, width, setWidth, setHasWidthTransition]);

    return (
        <div className={styles.resizer} onMouseDown={handleMouseDown} />
    )
}