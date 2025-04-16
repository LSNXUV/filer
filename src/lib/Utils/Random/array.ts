
/**
 * 随机获取数组中一个元素
 * @param arr 
 * @returns any
 */
export const getRandomByArray = <T>(arr:T[]):T => {
    return arr[Math.floor(Math.random() * arr.length)]
}