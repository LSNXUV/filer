
export function formatFileSize(bytes: number | null | undefined) {
    if (!bytes) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}


//过长省略中间部分，完整显示前后部分
export function dealTreeFileName(fileName: string) {
    if (fileName.length > 27) {
        return fileName.slice(0, 10) + '...' + fileName.slice(-10);
    } else {
        return fileName;
    }
}

/**
 * 
 * @param path 文件路径
 * @param level 后退层级,默认为1
 * @returns 后退之后的路径,如果不能再后退了，返回空串
 */
export function backPath(path: string, level: number = 1): string {
    if (level < 1) {
        throw new Error('Level must be at least 1');
    }
    const regex = new RegExp(`(?:/[^/]+){${level}}$`);
    if (!regex.test(path)) {
        return '';
    }
    return path.replace(regex, '');
}