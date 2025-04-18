import { SingleInput, SingleInputProps } from '@/components/public/SingleInput/SingleInput';
import React, { createContext, useContext, useMemo, useState } from 'react';

type SingleInputContextType = {
    /** 调用弹出input输入框，回调函数能拿到value做你想做的事儿 */
    showSingleInput: ({ defaultValue, title, info, handle, cancel }: Omit<SingleInputProps, 'show'>) => void;
};

const SingleInputContext = createContext<SingleInputContextType | null>(null);


export const SingleInputProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [show, setShow] = useState(false)

    const [title, setTitle] = useState('')
    const [info, setInfo] = useState<SingleInputProps['info']>()
    const [defaultValue, setDefaultValue] = useState('');
    const [handle, setHandle] = useState<SingleInputProps['handle'] | null>(null)
    const [cancel, setCancel] = useState<SingleInputProps['cancel'] | null>(null)

    const showSingleInput = ({ defaultValue, title, info, handle, cancel }: Omit<SingleInputProps, 'show'>) => {
        defaultValue && setDefaultValue(defaultValue)
        title && setTitle(title)
        info && setInfo(() => info)
        handle && setHandle(() => handle)
        cancel && setCancel(() => cancel)

        setShow(true)
    }

    const reset = () => {
        setShow(false)
        setTitle('')
        setInfo(undefined)
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

    const singleInputContextValue = useMemo<SingleInputContextType>(() => ({
        showSingleInput,
    }), [showSingleInput]);
    
    return (
        <SingleInputContext value={singleInputContextValue}>
            {children}
            <SingleInput show={show} defaultValue={defaultValue} title={title} info={info} handle={handleClick} cancel={cancelClick} />
        </SingleInputContext>
    );
};

export const useSingleInput = () => {
    const context = useContext(SingleInputContext);
    if (!context) {
        throw new Error('useSingleInput must be used within a SingleInputProvider');
    }
    return context;
}