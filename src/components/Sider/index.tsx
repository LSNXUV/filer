// 'use client'

import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import FileTree from './FileTree'
import Title from './Title'
import { Expand } from '../Icons/Public/Close'
import Resizer from './Resizer'

export default function Sider() {

  const [expand, setExpand] = useState(true)
  const [width, setWidth] = useState(270)
  const [hasWidthTransition, setHasWidthTransition] = useState(true)

  const toggleSider = useCallback((b?: boolean) => {
    setExpand(s => b ?? !s);
  }, [])

  // 快捷键展开/收起侧边栏
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

  return (
    <>
      <div
        className={`${styles.container} ${expand ? '' : styles.unexpandContainer}`}
        style={{
          width,
          transition: hasWidthTransition ? 'width 0.2s ease-in-out' : 'none',
        }}
      >
        {
          <div className={styles.contentContainer}
            style={{
              display: expand ? '' : 'none',
            }}
          >
            <Title />
            <FileTree />
          </div>
        }

        <Expand className={`${styles.expandIcon} ${expand ? styles.expand : ''}`} onClick={() => toggleSider()} />
        {expand && <Resizer width={width} toggleSider={toggleSider} setWidth={setWidth} setHasWidthTransition={setHasWidthTransition} />}
      </div>
    </>
  )
}