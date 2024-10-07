export type Files = {
    name: string
    lastModified: number | null
    size: number | null
    type: string    // MIME type
    kind: 'file' | 'directory'
    path: string
    children: Files[]
}
