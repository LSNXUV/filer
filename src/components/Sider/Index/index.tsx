// 'use client'

import React, { useState } from 'react'
import styles from './index.module.scss'
import FileTree from '@/components/Sider/FileTree/Index'
import Title from '@/components/Sider/Title/Title'

export default function Sider() {
  
  return (
    <div className={styles.container}>
        <Title />
        <FileTree />
    </div>
  )
}