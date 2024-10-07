import { LANG_EN } from "./Langs/LANG_EN";
import { LANG_ZH } from "./Langs/LANG_ZH";

/* export type Lang = {
    [key:string]:string | Lang
} */

export type LangName  = 'zh' | 'en';


export const Langs:{
    [key in LangName]: LangStruct
} = {
    'zh':LANG_ZH,
    'en':LANG_EN
} 

export type LangStruct = {
    Lib:{
        Context:{
            File:{
                loadFilesAndHandles:{
                    notExist: string,
                    files: string,
                    fileHandles: string,
                    dirHandles: string
                }
                openDirectoryPicker:{
                    notSupport: string
                }
            },
            Message:{
                showMessage:{
                    notExistType:string,
                    unkownMessage:string
                }
            },
            Confirm:{
                defaultTitle: string,
                defaultInfo: string,
                confirm: string,
                cancel: string
            }
        },
        Fun:{
            DirectoryPicker:{
                showDirectoryPicker:{
                    userCancle: string
                }
            }
        },
        Hooks:{
            useFileOp:{
                log:{
                    deleteFileError: string,
                    createFileError:string
                },
                createFile:{
                    reason:{
                        handleNotExist:string,
                        repeat:string
                    }
                }
                deleteFile: {
                    confirm: {
                        tip: string,
                    },
                },
                openFileInExplorer: {
                    notSupport: string
                },
                renameFile: {
                    notSupport: string
                }
            },
        }
    }
    FileExploer:{
        Sider:{
            Title: {
                title: string,
                Menu: {
                    selectFolder: string,
                    refresh: string,
                    close: string,
                    changeLang: string,
                    setting: string,
                    message:{
                        selectFolder:{
                            success: string,
                            fail: string
                        },
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
                NoFile:{
                    selectFolder: string,
                    message:{
                        selectFolder:{
                            success: string,
                            fail: string
                        }
                    }
                },
                topActions:{
                    reset: string,
                    refresh: string,
                    message:{
                        refresh: {
                            success: string,
                            fail: string
                        },
                        reset: {
                            success: string,
                            fail: string
                        }
                    }
                },
                Tree:{
                    File:{
                        FileDetail:{
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
                                delete:{
                                    success: string,
                                    fail: string,
                                    info: string
                                }
                            }
                        },
                        Rename:{
                            log:{
                                renameError: string
                            },
                            input:{
                                placeholder: string,
                                save: {
                                    success:string,
                                    fail: string
                                }
                            }
                        }
                    },
                    Dir:{
                        DirMenu:{
                            createFile: string,
                            createDir: string,
                            openDirInExplorer: string,
                            delete: string,
                            message: {
                                createFile:{
                                    success: string,
                                    fail: string,
                                    info:string
                                },
                                createDir:{
                                    success: string,
                                    fail: string,
                                    info:string
                                },
                                delete:{
                                    success: string,
                                    fail: string
                                }
                            },
                            handleCreateFile: {
                                singleInput:{
                                    title: string,
                                    

                                }
                            },
                            handleCreateDir: {
                                singleInput:{
                                    title: string,
                                }
                            },
                        },
                        DirDetail:{
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
        Content:{
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
            Tabs:{
                
            },
            BreadCrumbs:{
                
            },
            Show:{
                Editor:{
                    log:{
                        updateError: string
                    }
                },
                Image:{
                },
                Video:{
                    notFound: string,
                    log: {
                        fileHandleNotFound: string
                    }
                },
                NotShow:{
                    unknownType: string,
                    tip:{
                        thisFile: string,
                        is: string,
                        format: string,
                    },
                    forceShow: string,
                    forceShowTip: string
                }
            }
        }
    }
}
