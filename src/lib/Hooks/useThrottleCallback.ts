import { useMemo } from "react";
import { throttle } from "../Utils/debounce_throttle";

/**
 * 
 * @param callback 要节流的回调函数
 * @param delay 延迟时间
 * @returns throttledCallback-节流后的回调函数
 */
export function useThrottleCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
): T {
    
    return useMemo(() => throttle(callback, delay), [callback, delay]);
}