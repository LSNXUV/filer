import { SingleInput } from '@/components/public/SingleInput/SingleInput';
import React, { createContext, useContext, useState } from 'react';

// 定义SingleInputContext的类型
type SingleInputContextType = {
    showSingleInput: ({defaultValue,title, info, handle ,cancel}:{
        defaultValue?:string,
        title?: string, 
        info?: string, 
        handle?: (value: string) => Promise<void> ,
        cancel?:  (value: string) => Promise<void> 
    }) => void;
};

// 创建SingleInputContext
const SingleInputContext = createContext<SingleInputContextType | null>(null);

// 创建SingleInputProvider组件
export const SingleInputProvide = ({ children }:{
    children:React.ReactNode;
}) => {
    const [show, setShow] = useState(false)

    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [defaultValue, setDefaultValue] = useState('');
    const [handle, setHandle] = useState<((value:string) => Promise<void>) | null>(null)
    const [cancel, setCancel] = useState<((value:string) => Promise<void>) | null>(null)

    const showSingleInput = ({defaultValue,title, info, handle ,cancel}:{
        defaultValue?:string,
        title?: string, 
        info?: string, 
        handle?: (value: string) => Promise<void> ,
        cancel?:  (value: string) => Promise<void> 
    }) => {
        defaultValue && setDefaultValue(defaultValue)
        title && setTitle(title)
        info && setInfo(info)
        handle && setHandle(() => handle)
        cancel && setCancel(() => cancel)

        setShow(true)
    }

    const reset = () => {
        setShow(false)
        setTitle('')
        setInfo('')
        setDefaultValue('')
        setHandle(null)
        setCancel(null)
    }

    const handleClick = async (value: string) => {
        handle && await handle(value);
        reset()
    };

    const cancelClick = async (value: string) => {
        cancel && await cancel(value);
        reset()
    }
    
    // console.log('Single render')
    return (
        <SingleInputContext.Provider value={{showSingleInput}}>
            {children}
            <SingleInput show={show} defaultValue={defaultValue} title={title} info={info} handle={handleClick} cancel={cancelClick}/>
        </SingleInputContext.Provider>
    );
};

export const useSingleInput = () => {
    const context = useContext(SingleInputContext);
    if (!context) {
        throw new Error('useSingleInput must be used within a SingleInputProvider');
    }
    return context;
}