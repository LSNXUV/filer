import React from 'react'
import type { CSSProperties, FC, PropsWithChildren } from 'react'
import './index.css'

if (typeof CSS !== 'undefined') {
    CSS.supports = CSS.supports || (() => false)    // 兼容低版本浏览器
} else {
    globalThis.CSS = {
        ...(globalThis.CSS || {}),
        supports: () => false
    }
}


const isSupportCalcSize = CSS.supports('height', 'calc-size(auto, size)')

const isSupportGridTemplateRows = CSS.supports('grid-template-rows: 1fr')

const defaultTransitionProperty = !isSupportCalcSize && isSupportGridTemplateRows ? 'grid-template-rows' : 'height'

const TransitiveHeightContainer: FC<PropsWithChildren<{
    /** 自定义className */
    className?: string,
    /** 是否展开 */
    expanded: boolean,
    /** 默认 .3s ,height变化的transitionDuration, 如果传入是number：单位ms*/
    duration?: CSSProperties['transitionDuration'] | number,
    /** 默认 cubic-bezier(.65, .05, .36, 1) ,height变化的transitionTimingFunction*/
    timingFunction?: CSSProperties['transitionTimingFunction'],
    /** 
     * 如果有其他过渡属性并且想应用height过渡的相同过渡效果：
     * duration、timingFunction
     * */
    extraTransitionProperty?: CSSProperties['transitionProperty'],
    /** 
     * 额外的transition，优先级大于
     * duration、timingFunction、extraTransitionProperty
     */
    extraTransition?: CSSProperties['transition'],
    /** 优先级最小, 设置transition请使用extraTransition */
    style?: Omit<CSSProperties, 'transition'>
}>> = ({
    children,
    expanded,
    className = '',
    duration = '.25s',
    timingFunction = 'cubic-bezier(.65, .05, .36, 1)',
    extraTransitionProperty = '',
    extraTransition = '',
    style = {}
}) => {
        duration = typeof duration === 'number' ? `${duration / 1000}s` : duration;
        extraTransitionProperty = extraTransitionProperty.split(',').map(i => i.trim()).join(', ');
        const extraTransitions = extraTransitionProperty.split(', ')
            .filter(i => !extraTransition.split(/\s+/).includes(i))
            .map(i => `${i} ${duration} ${timingFunction}`).join(', ')
        return (
            <div className={`${className} thc-toggle-container ${expanded ? 'thc-toggle-container-expanded' : 'thc-toggle-container-collapsed'}`} style={
                {
                    ...style,
                    transitionDuration: duration,
                    transitionTimingFunction: timingFunction,
                    transitionProperty: `${defaultTransitionProperty}, ${extraTransitionProperty}`,
                    ...(!extraTransition ? {} : {
                        transition: `${defaultTransitionProperty} ${duration} ${timingFunction}, ${extraTransitions ? `${extraTransitions}, ` : ''}${extraTransition}`,
                    })
                }
            }
            >
                {
                    isSupportCalcSize || (!isSupportCalcSize && !isSupportGridTemplateRows)
                        ? children
                        : <div style={{ minHeight: 0 }}>{children}</div>        // 用于grid-template-rows: 1fr
                }
            </div>
        )
    }

export default TransitiveHeightContainer;