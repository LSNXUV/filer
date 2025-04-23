
/**
 * 浏览器不支持预览的文件类型（后缀）
 * 
 * 常见的不支持预览的MIME文件类型和扩展名
 */
export const notSupportExt = [
    'font', 'message', 'model', 'multipart',
    'zip', 'rar', '7z', 'gz', 'tar', 'bz2', 'xz', 'z', 'iso', 'dmg', 'bin', 'dll', 'exe',
    'msi', 'apk', 'ipa', 'deb', 'rpm', 'img', 'ova', 'ovf', 'vmdk', 'vdi', 'vhd', 'vdi', 'vmdk', 'ova', 'ovf',
    'pak', 'pack',
    'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf',
]


/**
 * 浏览器支持预览的图片类型（后缀）
 */
export const supportImageExt = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'avif',
]

/**
 * 浏览器支持预览的视频类型（后缀）
 */
export const supportVideoExt = [
    'mp4', 'webm', 'ogg', 'mov', 'mkv',
]

/**
 * 浏览器支持预览的音频类型（后缀）
 */
export const supportAudioExt = [
    'mp3', 'wav', 'flac', 'ogg', 'aac'
]


/**
 * ManacoEditor支持预览的文本类型（后缀）
 */
export const supportTextExt = [
    // 常见的文本类型
    'txt', 'md', 'markdown', 'log', 'json', 'xml', 'html', 'htm', 'css', 'scss', 'sass', 'less',
    'js', 'jsx', 'ts', 'tsx', 'c', 'cpp', 'h', 'hpp', 'java', 'py', 'go', 'php', 'rb', 'swift',
    'yaml', 'yml', 'toml', 'ini', 'csv', 'tsv', 'sql', 'bat', 'sh', 'zsh', 'ps1',
    'env', 'properties', 'conf', 'config', 'cmd',
    // ignore 和特殊文件
    'gitignore', 'dockerignore', 'npmignore', 'yarnignore', 'eslintignore', 'prettierignore', 'stylelintignore',
    // 无扩展名但常见的特殊文件（需额外逻辑处理）
    'makefile', 'cmake', 'dockerfile',
    'htaccess', 'htpasswd', 'htgroups',
]

/**
 * 浏览器支持预览的文件类型（后缀）
 */
export const supportExt = [
    ...supportImageExt,
    ...supportVideoExt,
    ...supportAudioExt,
    ...supportTextExt,
]
