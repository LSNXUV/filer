import { LangStruct } from "../Langs";

export const LANG_EN:LangStruct = {
    Lib:{
        Context:{
            File:{
                loadFilesAndHandles:{
                    notExist: 'In the case of no root directory handle, the file handle cannot be reloaded',
                    files: 'Folder Handle: ',
                    fileHandles: 'File Handle Map: ',
                    dirHandles: 'Directory Handle Map: '
                },
                openDirectoryPicker:{
                    notSupport: 'Not support'
                }
            },
            Message:{
                showMessage:{
                    notExistType:'The message type does not exist! ',
                    unkownMessage: 'Wrong message type, please check Lang!'
                }
            },
            Confirm:{
                defaultTitle: 'Confirm',
                defaultInfo: 'Are you sure you want to do this?',
                confirm: 'Confirm',
                cancel: 'Cancel'
            }
        },
        Fun:{
            DirectoryPicker:{
                showDirectoryPicker:{
                    userCancle: 'User Cancled'
                }
            }
        },
        Hooks:{
            useFileOp:{
                log:{
                    deleteFileError: 'Failed to delete file: ',
                    createFileError: 'Failed to create file: '
                },
                createFile:{
                    reason:{
                        handleNotExist: 'handle is not exist!',
                        repeat: 'repeat file name!',
                    }
                },
                deleteFile: {
                    confirm: {
                        tip: 'Are you sure you want to delete this file or the directory( The directory will be deleted recursively! )?',
                    },
                },
                openFileInExplorer: {
                    notSupport: 'Because of browser policy, not support for open in explorer!'
                },
                renameFile:{
                    notSupport: 'Because of browser policy, not support for rename'
                }
            }
        }
    },
    FileExploer:{
        Sider:{
            Title: {
                title: 'File Explore',
                Menu: {
                    selectFolder: 'Select Dir',
                    refresh: 'Refresh Current Dir',
                    close: 'Close Current Dir',
                    changeLang: 'Switch To 中文',
                    setting: 'Setting',
                    message:{
                        selectFolder:{
                            success: 'Loading Successed!',
                            fail: 'Loading Cancelled!'
                        },
                        changeLang: {
                            success: '切换成功! ',
                            fail: '切换失败! '
                        },
                        refresh:{
                            success: 'Refresh success!',
                            fail: 'Refresh fail!',
                        },
                        reset:{
                            success: 'Reset success!',
                            fail: 'Reset fail!',
                        }
                    }
                }
            },
            FileTree: {
                NoFile:{
                    selectFolder: 'Select Folder',
                    message:{
                        selectFolder:{
                            success: 'Loading Successed!',
                            fail: 'Loading Cancelled!'
                        }
                    }
                },
                topActions:{
                    reset: 'Reset',
                    refresh: 'Refresh',
                    message:{
                        refresh:{
                            success: 'Refresh success!',
                            fail: 'Refresh fail!',
                        },
                        reset:{
                            success: 'Reset success!',
                            fail: 'Reset fail!',
                        }
                    }

                },
                Tree:{
                    File:{
                        Rename:{
                            log:{
                                renameError:'Failed to rename file: '
                            },
                            input:{
                                placeholder: 'Please enter a new file name',
                                save:{
                                    success: 'Renamed Successfully!',
                                    fail: 'User Cancelled!',
                                }
                            }
                        },
                        FileDetail:{
                            title: 'File Detail: ',
                            name: 'File Name: ',
                            path: 'File Path: ',
                            size: 'File Size: ',
                            type: 'File Type: ',
                            lastModified: 'File Last Modified: '
                        },
                        FileMenu: {
                            open: 'Open',
                            close: 'Close',
                            addToShowsRear: 'Add to shows rear',
                            openFileInExplorer: 'Open in Explorer',
                            rename: 'Rename',
                            delete: 'Delete',
                            message: {
                                delete:{
                                    success: 'Delete File success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!',
                                }
                            }
                        }
                    },
                    Dir:{
                        DirMenu:{
                            createFile: 'Create File',
                            createDir: 'Create Dir',
                            openDirInExplorer: 'Open in Explorer',
                            delete: 'Delete',
                            message: {
                                delete:{
                                    success: 'Delete Dir success',
                                    fail: 'User Cancelled!'
                                },
                                createFile:{
                                    success: 'Create File success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!'
                                },
                                createDir:{
                                    success: 'Create Dir success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!'
                                }
                            },
                            handleCreateFile: {
                                singleInput:{
                                    title: 'Create File',
                                    

                                }
                            },
                            handleCreateDir: {
                                singleInput:{
                                    title: 'Create Dir',
                                    

                                }
                            }
                        },
                        DirDetail:{
                            title: 'Dir Detail: ',
                            name: 'Dir Name: ',
                            path: 'Dir Path: ',
                            size: 'Dir Size: ',
                            lastModified: 'Dir Last Modified: '
                        }
                    }
                }
            }
        },
        Content:{
            InitContent: {
                welcome: 'Welcome To The File Explore',
                open: {
                    select: 'Select ',
                    file: 'File ',
                    folder: 'Folder ',
                    start: 'to start'
                },
                botInfo: {
                    createdBy: 'Created by '
                }
            },
            Tabs:{
                
            },
            BreadCrumbs:{

            },
            Show:{
                Editor:{
                    log:{
                        updateError: 'Failed to update file: '
                    }
                },
                Image:{
                    log:{
                        fileHandleNotFound: 'fileHandle not found: '
                    }
                },
                Video:{
                    notFound: 'The video file was not found, please check if the file exists',
                    log:{
                        fileHandleNotFound: 'fileHandle not found: '
                    }
                },
                NotShow:{
                    unknownType: 'not support ',
                    tip:{
                        thisFile: 'This file《',
                        is: '》is a ',
                        format: 'format file, not recommended for preview'
                    },
                    forceShow: 'Force show',
                    forceShowTip: 'Force show may cause the browser to crash, do you want to continue?'
                }
            }
        }
    }
}