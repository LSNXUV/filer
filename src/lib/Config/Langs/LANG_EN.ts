export const LANG_EN: LangStruct = {
    Lib: {
        Context: {
            File: {
                loadFilesAndHandles: {
                    notExist: 'In the case of no root directory handle, the file handle cannot be reloaded',
                    files: 'Folder Handle: ',
                },
                openDirectoryPicker: {
                    notSupport: 'Not support'
                },
                selectFolder: {
                    success: 'Loading Successed!',
                    fail: 'Not Support!',
                    info: 'Loading Cancelled!',
                },
                permission: {
                    isLoadingSavedDirHandle: 'Would you like to restore the file directory from the last session:',
                }
            },
            Message: {
                showMessage: {
                    notExistType: 'The message type does not exist! ',
                    unkownMessage: 'Wrong message type, please check Lang!'
                }
            },
            Confirm: {
                defaultTitle: 'Confirm',
                defaultInfo: 'Are you sure you want to do this?',
                confirm: 'Confirm',
                cancel: 'Cancel'
            },
            SingleInput: {
                confirm: 'Confirm',
                invalid: {
                    pattern: 'please enter a valid value!',
                },
            }
        },
        Fun: {
            DirectoryPicker: {
                showDirectoryPicker: {
                    userCancle: 'User Cancled'
                },
                // notSupport: '当前浏览器暂不支持,建议您使用最新Edge或Chrome浏览器！'
                notSupport: 'The current browser does not support, it is recommended that you use the latest Edge or Chrome browser!'
            }
        },
        Hooks: {
            useFileOp: {
                log: {
                    deleteFileError: 'Failed to delete file: ',
                    createFileError: 'Failed to create file: '
                },
                createFile: {
                    reason: {
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
                }
            },
            useCloseTabs: {
                isCloseNeedSave: 'Do you want to save the file?',
            } 
        }
    },
    FileExploer: {
        Sider: {
            Title: {
                title: 'File Explore',
                Menu: {
                    selectFolder: 'Select Dir',
                    refresh: 'Refresh Current Dir',
                    close: 'Close Current Dir',
                    changeLang: 'Switch To 中文',
                    setting: 'Setting',
                    message: {
                        changeLang: {
                            success: '切换成功! ',
                            fail: '切换失败! '
                        },
                        refresh: {
                            success: 'Refresh success!',
                            fail: 'Refresh fail!',
                        },
                        reset: {
                            success: 'Reset success!',
                            fail: 'Reset fail!',
                        }
                    }
                }
            },
            FileTree: {
                NoFile: {
                    selectFolder: 'Select Folder'
                },
                topActions: {
                    reset: 'Reset',
                    message: {
                        reset: {
                            success: 'Reset success!',
                            fail: 'Reset fail!',
                        }
                    }

                },
                Tree: {
                    File: {
                        FileDetail: {
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
                                delete: {
                                    success: 'Delete File success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!',
                                },
                                rename: {
                                    success: 'Rename File success',
                                    info: 'User Cancelled!',
                                },
                            },
                            handleRenameFile: {
                                singleInput: {
                                    title: 'Rename',
                                }
                            },
                        }
                    },
                    Dir: {
                        DirMenu: {
                            createFile: 'Create File',
                            createDir: 'Create Dir',
                            openDirInExplorer: 'Open in Explorer',
                            delete: 'Delete',
                            message: {
                                delete: {
                                    success: 'Delete Dir success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!'
                                },
                                createFile: {
                                    success: 'Create File success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!'
                                },
                                createDir: {
                                    success: 'Create Dir success',
                                    fail: 'User Cancelled!',
                                    info: 'User Cancelled!'
                                }
                            },
                            handleCreateFile: {
                                singleInput: {
                                    title: 'Create File',


                                }
                            },
                            handleCreateDir: {
                                singleInput: {
                                    title: 'Create Dir',


                                }
                            }
                        },
                        DirDetail: {
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
        Content: {
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
            Tabs: {
                onCloseFile: {
                    title: 'Save',
                    info: 'File not saved, do you want to save?',
                },
                Menu: {
                    closeAllLeft: 'Close All Left',
                    closeAllLeftSaved: 'Close All Left Saved',
                    closeAllRight: 'Close All Right',
                    closeAllRightSaved: 'Close All Right Saved',
                    closeAll: 'Close All',
                    closeAllSaved: 'Close All Saved',
                }
            },
            BreadCrumbs: {

            },
            Show: {
                Editor: {
                    log: {
                        updateError: 'User Refused!',
                    },
                    Action: {
                        saveFile: 'Save',
                        runCode: 'Run',
                    },
                    CodeRunner: {
                        notSupportToRun: 'Not support to run!',
                        stdinTitle: 'Input stdin',
                        stdinInfo: 'Please Enter the stdin if needed:',
                    }
                },
                Audio: {
                    Waves: {
                        changeWave: 'Change Waves: '
                    }
                },
                Image: {
                    log: {
                        fileHandleNotFound: 'fileHandle not found: '
                    }
                },
                Video: {
                    notFound: 'The video file was not found, please check if the file exists',
                },
                NotShow: {
                    unknownType: 'not support ',
                    tip: {
                        thisFile: 'This file《',
                        is: '》is a ',
                        format: 'format file, not recommended for preview'
                    },
                    forceShow: 'Force show',
                    forceShowTip: 'Force show may cause the browser to crash, do you want to continue?'
                }
            }
        },
        Footer: {
            Right: {
                position: {
                    lineNumber: 'Line',
                    column: 'Column'
                },
                indent: {
                    space: 'Space',
                    tab: 'Tab',
                }
            }
        }
    },
    Global: {
        copy: {
            success: 'Copy success',
            fail: 'Copy fail!'
        },
        confirm: 'Confirm',
        close: 'Close',
    }
}