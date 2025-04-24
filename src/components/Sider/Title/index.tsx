import React, { useState } from 'react'
import styles from './index.module.scss'
import { useLang } from '@/lib/Context/Lang'
import Menu from './Menu'

export default function Title() {
  const { Lang } = useLang()

  const [isMenuShow, setIsMenuShow] = useState(false)

  return (
    <div className={styles.titleContainer}>
      <div
        className={styles.title}
        onMouseEnter={() => {
          setIsMenuShow(true)
        }}
        onMouseLeave={() => {
          setIsMenuShow(false)
        }}
      >
        <span>
          {Lang.FileExploer.Sider.Title.title}
        </span>
        <Menu show={isMenuShow} />
      </div>
    </div>
  )
}
