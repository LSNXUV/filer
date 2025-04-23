interface LangStruct {
    Lib: {
        Context: {
            File: {
                loadFilesAndHandles: {
                    notExist: string,
                    files: string
                },
                openDirectoryPicker: {
                    notSupport: string
                },
                selectFolder: {
                    success: string,
                    fail: string,
                    info: string
                },
                permission: {
                    isLoadingSavedDirHandle: string,
                }
            },
            Message: {
                showMessage: {
                    notExistType: string,
                    unkownMessage: string
                }
            },
            Confirm: {
                defaultTitle: string,
                defaultInfo: string,
                confirm: string,
                cancel: string
            }
        },
        Fun: {
            DirectoryPicker: {
                showDirectoryPicker: {
                    userCancle: string
                }
            }
        },
        Hooks: {
            useFileOp: {
                log: {
                    deleteFileError: string,
                    createFileError: string
                },
                createFile: {
                    reason: {
                        handleNotExist: string,
                        repeat: string
                    }
                }
                deleteFile: {
                    confirm: {
                        tip: string,
                    },
                },
                openFileInExplorer: {
                    notSupport: string
                }
            },
        }
    }
    FileExploer: {
        Sider: {
            Title: {
                title: string,
                Menu: {
                    selectFolder: string,
                    refresh: string,
                    close: string,
                    changeLang: string,
                    setting: string,
                    message: {
                        changeLang: {
                            success: string,
                            fail: string
                        },
                        refresh: {
                            success: string,
                            fail: string
                        },
                        reset: {
                            success: string,
                            fail: string
                        }
                    }
                }
            },
            FileTree: {
                NoFile: {
                    selectFolder: string,
                },
                topActions: {
                    reset: string,
                    message: {
                        reset: {
                            success: string,
                            fail: string
                        }
                    }
                },
                Tree: {
                    File: {
                        FileDetail: {
                            title: string,
                            name: string,
                            path: string,
                            size: string,
                            type: string,
                            lastModified: string
                        },
                        FileMenu: {
                            open: string,
                            close: string,
                            addToShowsRear: string,
                            openFileInExplorer: string,
                            rename: string,
                            delete: string,
                            message: {
                                delete: {
                                    success: string,
                                    fail: string,
                                    info: string
                                },
                                rename: {
                                    success: string,
                                    info: string
                                },
                            },
                            handleRenameFile: {
                                singleInput: {
                                    title: string
                                }
                            }
                        }
                    },
                    Dir: {
                        DirMenu: {
                            createFile: string,
                            createDir: string,
                            openDirInExplorer: string,
                            delete: string,
                            message: {
                                createFile: {
                                    success: string,
                                    fail: string,
                                    info: string
                                },
                                createDir: {
                                    success: string,
                                    fail: string,
                                    info: string
                                },
                                delete: {
                                    success: string,
                                    fail: string,
                                    info: string
                                }
                            },
                            handleCreateFile: {
                                singleInput: {
                                    title: string,


                                }
                            },
                            handleCreateDir: {
                                singleInput: {
                                    title: string,
                                }
                            },
                        },
                        DirDetail: {
                            title: string,
                            name: string,
                            path: string,
                            size: string,
                            lastModified: string
                        }
                    }
                }
            }
        },
        Content: {
            InitContent: {
                welcome: string,
                open: {
                    select: string,
                    file: string,
                    folder: string,
                    start: string
                },
                botInfo: {
                    createdBy: string,
                }
            },
            Tabs: {
                onCloseFile: {
                    title: string,
                    info: string
                }
            },
            BreadCrumbs: {

            },
            Show: {
                Editor: {
                    log: {
                        updateError: string
                    },
                    Action: {
                        saveFile: string,
                        runCode: string
                    }
                },
                Audio:{
                    Waves:{
                        changeWave:string
                    }
                },
                Image: {
                },
                Video: {
                    notFound: string
                },
                NotShow: {
                    unknownType: string,
                    tip: {
                        thisFile: string,
                        is: string,
                        format: string,
                    },
                    forceShow: string,
                    forceShowTip: string
                }
            }
        },
        Footer: {
            Right: {
                position: {
                    lineNumber: string,
                    column: string
                }
            }
        }
    },
    Global: {
        copy: {
            success: string,
            fail: string
        }
    }
}
