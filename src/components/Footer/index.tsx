import React from 'react'
import styles from './index.module.scss'
import Left from './Left'
import Right from './Right'

function Footer() {
  return (
    <div className={styles.container}>
      <Left />
      <Right />
    </div>
  )
}

export default Footer