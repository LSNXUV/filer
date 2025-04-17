
interface Files {
    name: string
    lastModified: number | null
    size: number | null
    type: string    // MIME type
    kind: FileSystemHandleKind
    path: string
    children: Files[]
    loaded?: boolean // 针对dir，是否加载完成
}

interface FileSystemHandle {
    queryPermission: (options?: { mode?: "read" | "readwrite" }) => Promise<PermissionState>
    requestPermission: (options?: { mode?: "read" | "readwrite" }) => Promise<PermissionState>
}