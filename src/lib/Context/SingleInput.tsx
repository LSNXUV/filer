import { SingleInput, SingleInputProps } from '@/components/public/SingleInput/SingleInput';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SingleInputContextType = {
    /** 调用弹出input输入框，回调函数能拿到value做你想做的事儿 */
    showSingleInput: ({ defaultValue, title, info, handle, cancel }: Omit<SingleInputProps, 'show'>) => void;
};

const SingleInputContext = createContext<SingleInputContextType | null>(null);


export const SingleInputProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [show, setShow] = useState(false)

    const [config, setConfig] = useState<Omit<SingleInputProps, 'show'> | null>(null)

    const showSingleInput = (config: Omit<SingleInputProps, 'show'>) => {
        setConfig(config)
        setShow(true)
    }

    const reset = useCallback(() => {
        setShow(false)
        
        setConfig(null)
    }, []);

    const handleClick = useCallback(async (value: string) => {
        config?.handle && await config.handle(value);
        reset();
    }, [config, reset]);

    const cancelClick = useCallback(async (value: string) => {
        config?.cancel && await config.cancel(value);
        reset();
    }, [config, reset]);

    const singleInputContextValue = useMemo<SingleInputContextType>(() => ({
        showSingleInput,
    }), [showSingleInput]);
    
    return (
        <SingleInputContext value={singleInputContextValue}>
            {children}
            <SingleInput show={show}
                {...config}
                handle={handleClick} cancel={cancelClick}
            />
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