// 文件名正则，支持中文字符
export const fileNamePattern = /^([\w\-\s\u4e00-\u9fa5]+)(\.[a-zA-Z0-9\u4e00-\u9fa5]+)+$/;

// 目录名正则，支持中文字符
export const dirNamePattern = /^[\w\-\s\u4e00-\u9fa5@#]+$/;