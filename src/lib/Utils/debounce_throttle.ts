
export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number = 1000): T {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    } as T;
}

export function throttle<T extends (...args: any[]) => any>(fn: T, wait: number = 1000): T {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        if(timer) return;
        fn.apply(this, args);
        timer = setTimeout(() => {
            timer = null;
        }, wait);
    } as T;
}
