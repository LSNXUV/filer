import { LangStruct } from "../Langs";

export const LANG_ZH: LangStruct = {
    Lib:{
        Context:{
            File:{
                loadFilesAndHandles:{
                    notExist: '在不存在根目录句柄的情况下,无法重新加载文件句柄',
                    files: '文件夹Handle: ',
                    fileHandles: '文件句柄Map: ',
                    dirHandles: '文件夹句柄Map: '
                },
                openDirectoryPicker:{
                    notSupport: '暂不支持'
                }
            },
            Message:{
                showMessage:{
                    notExistType: '消息类型不存在！',
                    unkownMessage: '消息类型错误, 请检查Lang! '
                }
            },
            Confirm:{
                defaultTitle: '确认',
                defaultInfo: '您确定要执行此操作吗?',
                confirm: '确认',
                cancel: '取消'
            }
        },
        Fun:{
            DirectoryPicker:{
                showDirectoryPicker:{
                    userCancle: '用户取消'
                }
            }
        },
        Hooks:{
            useFileOp:{
                log:{
                    deleteFileError: '删除文件失败: ',
                    createFileError: '创建文件失败: '
                },
                createFile:{
                    reason:{
                        handleNotExist:'handle 不存在！',
                        repeat: '重复创建同名文件！',
                    }
                },
                deleteFile: {
                    confirm: {
                        tip: '是否确认删除该文件/目录( 目录将递归删除! )?',
                    },
                },
                openFileInExplorer: {
                    notSupport: '因浏览器策略，暂不支持打开资源管理器!'
                },
                renameFile:{
                    notSupport: '因浏览器策略，暂不支持重命名'
                }
            }
        }
    },
    FileExploer:{
        Sider:{
            Title: {
                title: '文件浏览器',
                Menu: {
                    selectFolder: '选择文件夹',
                    refresh: '刷新当前目录',
                    close: '关闭当前目录',
                    changeLang: '切换到English',
                    setting: '设置',
                    message:{
                        selectFolder:{
                            success: '加载成功！',
                            fail: '用户取消！'
                        },
                        changeLang: {
                            success: 'Successfully Switched! ',
                            fail: 'Failed Swiched! '
                        },
                        refresh:{
                            success: '刷新成功!',
                            fail: '刷新失败!',
                        },
                        reset:{
                            success: '重置成功!',
                            fail: '重置失败!',
                        }
                    }
                }
            },
            FileTree: {
                NoFile:{
                    selectFolder: '选择文件夹',
                    message:{
                        selectFolder:{
                            success: '加载成功！',
                            fail: '用户取消！'
                        }
                    }
                },
                topActions:{
                    reset: '重置',
                    refresh: '刷新',
                    message:{
                        refresh:{
                            success: '刷新成功!',
                            fail: '刷新失败!',
                        },
                        reset:{
                            success: '重置成功!',
                            fail: '重置失败!',
                        }
                    }
                },
                Tree:{
                    File:{
                        Rename:{
                            log:{
                                renameError:'重命名文件失败: '
                            },
                            input:{
                                placeholder: '请输入新文件名',
                                save:{
                                    success: '重命名成功!',
                                    fail: '用户取消!',
                                }
                            }
                        },
                        FileDetail:{
                            title: '文件详情: ',
                            name: '文件名: ',
                            path: '文件路径: ',
                            size: '文件大小: ',
                            type: '文件类型: ',
                            lastModified: '最后修改时间: '
                        },
                        FileMenu: {
                            open: '打开',
                            close: '关闭',
                            addToShowsRear: '添加到查看队列末尾',
                            openFileInExplorer: '在资源管理器中显示',
                            rename: '重命名',
                            delete: '删除',
                            message:{
                                delete:{
                                    success: '删除文件成功!',
                                    fail: '用户取消！',
                                    info: '用户取消！'
                                }
                            }
                        }
                    },
                    Dir:{
                        DirMenu:{
                            createFile: '新建文件',
                            createDir: '新建目录',
                            openDirInExplorer: '在资源管理器中显示',
                            delete: '删除',
                            message:{
                                createFile:{
                                    success: '新建文件成功!',
                                    fail: '用户取消!',
                                    info: '用户取消!',
                                },
                                createDir:{
                                    success: '新建目录成功!',
                                    fail: '用户取消!',
                                    info: '用户取消!',
                                },
                                delete:{
                                    success: '删除目录成功!',
                                    fail: '用户取消!'
                                }
                            },
                            handleCreateFile: {
                                singleInput:{
                                    title: '新建文件',
                                    

                                }
                            },
                            handleCreateDir: {
                                singleInput:{
                                    title: '新建目录',
                                    

                                }
                            }
                        },
                        DirDetail:{
                            title: '目录详情: ',
                            name: '目录名: ',
                            path: '目录路径: ',
                            size: '目录大小: ',
                            lastModified: '最后修改时间: '
                        }
                    }
                }
            }
        },
        Content:{
            InitContent: {
                welcome: '欢迎使用文件浏览器',
                open: {
                    select: '选择',
                    file: '文件',
                    folder: '文件夹',
                    start: '以开始'
                },
                botInfo: {
                    createdBy: '创建者: '
                },
            },
            Tabs:{
                
            },
            BreadCrumbs:{

            },
            Show:{
                Editor:{
                    log:{
                        updateError: '更新文件失败: '
                    }
                },
                Image:{
                    log:{
                        fileHandleNotFound: '未找到fileHandle: '
                    }
                },
                Video:{
                    notFound: '未找到该视频文件,请检查文件是否存在',
                    log:{
                        fileHandleNotFound: '未找到fileHandle: '
                    }
                },
                NotShow:{
                    unknownType: '不支持的',
                    tip:{
                        thisFile: '此文件《',
                        is: '》为',
                        format: '格式文件,暂不推荐预览'
                    },
                    forceShow: '强行查看',
                    forceShowTip: '强行查看可能会导致浏览器崩溃，是否继续？'
                }
            }
        }
    }
}