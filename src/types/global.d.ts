
interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    showSaveFilePicker?: (options?: {
        excludeAcceptAllOption?: boolean;
        id?: string;
        types?: Array<{
            description?: string;
            accept: { [key: string]: string[] };
        }>;
        suggestedName?: string;
        startIn?: FileSystemHandle;
    }) => Promise<FileSystemFileHandle>;
}

interface FileSystemDirectoryHandle {
    values: () => AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;

}