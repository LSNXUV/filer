
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