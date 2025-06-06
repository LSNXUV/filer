import React, { useCallback } from 'react'
import styles from './index.module.scss'

function Resizer({ onToggle, setRunnerHeight }: {
    onToggle: (expand?: boolean) => void,
    setRunnerHeight: React.Dispatch<React.SetStateAction<number>>
}) {
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const handleMouseMove = (e: MouseEvent) => {
            const delta = window.innerHeight - e.clientY; // 修正为 clientY
            let newHeight = Math.min(Math.max(100, delta), window.innerHeight - 200); // 限制最小高度
            if (delta < 50) {
                onToggle(false); // 收起
            } else {
                onToggle(true); // 展开
            }
            setRunnerHeight(newHeight); // 设置新的高度
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [onToggle, setRunnerHeight]);
    return (
        <div className={styles.resizer} onMouseDown={handleMouseDown} />
    )
}

export default Resizer