// 'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import FileTree from './FileTree'
import Title from './Title/Title'
import { Expand } from '../Icons/Public/Close'
import homeStyle from '../FileExploer/index.module.scss'


export default function Sider() {

  const [expand, setExpand] = useState(true)

  const [hasWidthTransition, setHasWidthTransition] = useState(true)

  const toggleSider = useCallback((b?: boolean) => {
    setExpand(s => {
      const res = b ?? !s;
      if (!res) {
        document.documentElement.style.setProperty('--content-width', `calc(100vw - var(--sider-unexpand-width))`)
      } else {
        document.documentElement.style.setProperty('--content-width', 'calc(100vw - var(--sider-width))')
      }
      return res;
    });
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === 'b') {
        toggleSider()
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSider])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setHasWidthTransition?.(false); // 禁用过渡动画
    const startX = e.clientX;
    const root = document.documentElement;
    const initialWidth = parseInt(
      getComputedStyle(root).getPropertyValue('--sider-width')
    );

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newWidth = Math.max(200, initialWidth + delta); // 限制最小宽度
      if (initialWidth + delta < 100) {
        toggleSider?.(false);
      } else {
        toggleSider?.(true);
      }
      root.style.setProperty('--sider-width', `${newWidth}px`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setHasWidthTransition?.(true); // 恢复过渡动画
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [toggleSider])

  return (
    <>
      <div
        className={`${styles.container} ${expand ? '' : styles.unexpandContainer}`}
        style={{
          transition: hasWidthTransition ? 'width 0.2s ease-in-out' : 'none',
        }}
      >
        {
          <div
            style={{
              display: expand ? 'inherit' : 'none',
              flexDirection: 'inherit',
            }}>
            <Title />
            <FileTree />
          </div>
        }

        <Expand className={`${styles.expandIcon} ${expand ? styles.expand : ''}`} onClick={() => toggleSider()} />
      </div>
      <div className={styles.resizer} onMouseDown={handleMouseDown} />
    </>
  )
}