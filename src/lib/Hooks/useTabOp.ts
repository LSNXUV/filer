import { useCallback } from "react";
import { useFiles } from "../Context/File";

export function useTabOp():{
    /**
     * 选中文件并打开查看
     * @param file 
     * @returns 
     */
    selectFile: (file: Files) => void

    /**
     * 当前选中的tab文件
     */
    selectedFile: Files;
    
    isShowFile: (file:Files) => boolean;

    /**
     * 添加文件到查看队列末尾
     * @param file 
     * @returns 
     */
    addFileToShowsRear: (file: Files) => void

    /**
     * 关闭文件
     * @param param 文件在查看队列中的索引或者文件
     * @returns 
     */
    closeFile: (param: number | Files) => void
}{

    const {tabs, setTabs, select, setSelect} = useFiles()

    const selectFile = useCallback((file: Files) => {
        if (tabs.includes(file)) {
            setSelect(tabs.indexOf(file));
            return;
        }
        setTabs((ts) => [...ts, file]);
        setSelect(() => tabs.length);
    },[tabs,setTabs,setSelect])

    const selectedFile = tabs[select];

    const isShowFile = useCallback((file:Files) => {
        return tabs.includes(file);
    },[tabs])

    const addFileToShowsRear = useCallback((file: Files) => {
        if (tabs.includes(file)) {
            return;
        }
        setTabs([...tabs, file]);
        if (select < 0) {
            setSelect(() => tabs.length);
        }
    },[tabs,select,setTabs,setSelect])

    const closeFile = useCallback((param: number | Files): void => {
        let index: number;
        if (typeof param === 'number') {
            index = param;
        } else {
            index = tabs.indexOf(param);
            if(index === -1) return;  //不存在直接返回
        }
        let len: number = 0  //保持最新tabs的数量
        setTabs((fs) => {
            let newFs = fs.filter((_, i) => i !== index);
            len = newFs.length;
            return newFs;
        });

        setSelect((select) => {
            if (index < select) {
                return select - 1;
            }
            return Math.min(select, len - 1);
        });
    },[tabs,setTabs,setSelect])
    
    // console.log('useTabOp render!!!')
    return {
        selectFile,selectedFile,
        isShowFile,
        addFileToShowsRear,
        closeFile
    }
}