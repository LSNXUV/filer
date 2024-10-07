
/**
 * 生成随机RGB颜色
 * @returns color
 */
export const randomRGBColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0')
}