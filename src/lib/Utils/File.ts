
export function formatFileSize(bytes: number | null | undefined) {
    if (!bytes) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/** 获取文件后缀 */
export function getFileExtension(fileName: string, autoToLowerCase: boolean = true): string {
    const ext = fileName.split('.').pop() || '';
    return autoToLowerCase ? ext.toLowerCase() : ext;
}

/**
 * 
 * @param path 文件路径
 * @param level 后退层级,默认为1
 * @returns 后退之后的路径,如果不能再后退了，返回空串
 */
export function backPath(path: string, level: number = 1): string {
    if (level < 1) {
        return path;
    }
    const regex = new RegExp(`(?:/[^/]+){${level}}$`);
    if (!regex.test(path)) {
        return '';
    }
    return path.replace(regex, '');
}

export async function verifyFileHandlePermission(fileHandle: FileSystemHandle, withWrite: boolean = false): Promise<boolean> {
    const opts: {
        mode?: "read" | "readwrite";
    } = {};
    if (withWrite) {
        opts.mode = "readwrite";
    }

    // 检查是否已经拥有相应权限，如果是，返回 true。
    if ((await fileHandle?.queryPermission(opts)) === "granted") {
        return true;
    }

    // 为文件请求权限，如果用户授予了权限，返回 true。
    if ((await fileHandle?.requestPermission(opts)) === "granted") {
        return true;
    }

    // 用户没有授权，返回 false。
    return false;
}

export async function queryFileHandlePermission(fileHandle: FileSystemHandle, withWrite: boolean = false): Promise<boolean> {
    const opts: {
        mode?: "read" | "readwrite";
    } = {};
    if (withWrite) {
        opts.mode = "readwrite";
    }

    // 检查是否已经拥有相应权限，如果是，返回 true。
    if ((await fileHandle?.queryPermission(opts)) === "granted") {
        return true;
    }
    // 用户没有授权，返回 false。
    return false;
}


export async function requestFileHandlePermission(fileHandle: FileSystemHandle, withWrite: boolean = false): Promise<boolean> {
    const opts: {
        mode?: "read" | "readwrite";
    } = {};
    if (withWrite) {
        opts.mode = "readwrite";
    }

    if ((await fileHandle?.requestPermission(opts)) === "granted") {
        return true;
    }
    
    // 用户没有授权，返回 false。
    return false;
}
