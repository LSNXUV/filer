import { useMemo } from "react";
import { debounce } from "../Utils/debounce_throttle";

/**
 * 
 * @param callback 要防抖的回调函数
 * @param delay 延迟时间
 * @returns debouncedCallback-防抖后的回调函数
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
): T {
    
    return useMemo(() => debounce(callback, delay), [callback, delay]);
}