
interface Files {
    name: string
    lastModified: number | null
    size: number | null
    type: string    // MIME type
    kind: 'file' | 'directory'
    path: string
    children: Files[]
    loaded?: boolean // 针对dir，是否加载完成
}