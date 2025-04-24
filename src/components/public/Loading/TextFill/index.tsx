import React, { CSSProperties } from 'react'
import styles from './index.module.scss'

function TextFill({ className = '', bgColor = '#000', color = '#FFF' }: {
    className?: string,
    bgColor?: CSSProperties['color'],
    color?: CSSProperties['color'],
}) {
    return (
        <div className={`${styles.loader} ${className}`}
            style={{
                '--loader-bg-color': bgColor,
                '--loader-fill-color': color,
                '--loader-transparent-color': bgColor.startsWith('#') ? `${bgColor}00` : bgColor,
            } as CSSProperties}
        ></div>
    )
}

export default TextFill