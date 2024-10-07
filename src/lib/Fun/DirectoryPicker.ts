import { LangStruct } from "../Context/Lang/Langs";
import { Files } from "../Types/File";


export async function showDirectoryPicker(Lang:LangStruct): Promise<FileSystemDirectoryHandle | null | boolean>{
    if(window && (window as any).showDirectoryPicker){
        try {
            return await (window as any).showDirectoryPicker()
        } catch (error) {
            console.info(Lang.Lib.Fun.DirectoryPicker.showDirectoryPicker.userCancle);
            return null
        }
    }
    return false
}

interface FileSystemDirectoryHandleWithValues extends FileSystemDirectoryHandle {
    values: () => AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
}

// 递归处理文件夹
export async function processHandle(
    dirHandle: FileSystemDirectoryHandle,
    path: string = '',
    fileHandleMap: Map<string, FileSystemFileHandle>,
    dirHandleMap: Map<string, FileSystemDirectoryHandle>
): Promise<Files> {
    const files: Files = {
        name: dirHandle.name,
        lastModified: null,
        size: null,
        type: '',
        kind: 'directory',
        path: `${path ? path + '/' : ''}${dirHandle.name}`,
        children: []
    };

    //保存文件夹句柄
    dirHandleMap.set(files.path, dirHandle); 
    
    for await (const entry of (dirHandle as FileSystemDirectoryHandleWithValues).values()) {
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
            fileHandleMap.set(file.path, entry);
        } else if (entry.kind === 'directory') {
            files.children.push(await processHandle(entry, files.path, fileHandleMap, dirHandleMap));
        }
    }

    return files;
}
