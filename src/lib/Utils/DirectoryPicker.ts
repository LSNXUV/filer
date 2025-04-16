
export async function showDirectoryPicker(onSuccess?: (dirHandle: FileSystemDirectoryHandle) => Promise<void>, onError?: (error?: any) => void): Promise<void> {
    if (window.showDirectoryPicker) {
        try {
            const dirHandle = await window.showDirectoryPicker();
            onSuccess?.(dirHandle);
        } catch (error) {
            onError?.(error);
        }
    } else {
        onError?.();
    }
}

// 递归处理文件夹
export async function processHandle(
    dirHandle: FileSystemDirectoryHandle,
    path: string = '',
    fileHandleMap: Map<string, FileSystemFileHandle>,
    dirHandleMap: Map<string, FileSystemDirectoryHandle>,
    /** 处理层级, 默认3 */
    level: number = 3
): Promise<Files> {
    const files: Files = {
        name: dirHandle.name,
        lastModified: null,
        size: null,
        type: '',
        kind: 'directory',
        path: `${path ? path + '/' : ''}${dirHandle.name}`,
        children: [],
        loaded: level !== 0,
    };
    //保存文件夹句柄
    dirHandleMap.set(files.path, dirHandle);

    if (level === 0) {
        return files;
    }
    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
            const entryFile = await entry.getFile();
            const file: Files = {
                name: entryFile.name,
                lastModified: entryFile.lastModified,
                size: entryFile.size,
                type: entryFile.type,
                kind: 'file',
                path: files.path + '/' + entryFile.name,
                children: []
            };
            files.children.push(file);
            //保存文件句柄
            fileHandleMap.set(file.path, entry);
        } else if (entry.kind === 'directory') {
            files.children.push(await processHandle(entry, files.path, fileHandleMap, dirHandleMap, level - 1));
        }
    }
    files.children.sort((a, b) => {
        // 文件夹优先于文件
        if (a.kind === 'directory' && b.kind === 'file') return -1;
        if (a.kind === 'file' && b.kind === 'directory') return 1;
        return a.name.localeCompare(b.name);
    });
    return files;
}
