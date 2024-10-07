import Confirm, { ConfirmType } from "@/components/public/Confirm/Confirm";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLang } from "./Lang";

const ConfirmContext = createContext<{
    confirm: ({title, info, onConfirm, onCancel,type}:{
        title?:string;
        info?:string;
        onConfirm?:() => void;
        onCancel?:() => void;
        type?: ConfirmType
    }) => Promise<boolean>;
    alert: ({title, info, onConfirm}:{
        title?:string;
        info?:string;
        onConfirm?:() => void;
    }) => Promise<boolean>;
} | null>(null);

export const ConfirmProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {
    const {Lang} = useLang();

    const [show, setShow] = useState(false);
    console.log(Lang);
    const [title, setTitle] = useState(Lang.Lib.Context.Confirm.defaultTitle);
    const [info, setInfo] = useState(Lang.Lib.Context.Confirm.defaultInfo);
    const [onConfirm, setOnConfirm] = useState(() => () => {});
    const [onCancel, setOnCancel] = useState(() => () => {});
    const [type, setType] = useState<ConfirmType>('confirm')

    const confirm = useCallback(({title, info, onConfirm, onCancel,type}:{
        title?:string;
        info?:string;
        onConfirm?:() => void;
        onCancel?:() => void;
        type?: ConfirmType
    }) => {
        title && setTitle(title);
        info && setInfo(info);
        type && setType(type)

        setShow(true);

        return new Promise<boolean>((resolve, reject) => {
            setOnConfirm(() => () => {
                onConfirm?.();
                setShow(false);
                resolve(true);
            });
            setOnCancel(() => () => {
                onCancel?.();
                setShow(false);
                reject(false);
            });
        });
    },[])

    const alert = useCallback(({title, info, onConfirm}:{
        title?:string;
        info?:string;
        onConfirm?:() => void;
    }) => {
        
        return confirm({
            title,info,onConfirm,
            type:'alert'
        })
    },[confirm])

    const confirmHandle = useCallback(() => {
        onConfirm();
        setShow(false);
    },[onConfirm])

    const cancelHandle = useCallback(() => {
        onCancel();
        setShow(false);
    },[onCancel])

    useEffect(() => {
        setTitle(Lang.Lib.Context.Confirm.defaultTitle);
        setInfo(Lang.Lib.Context.Confirm.defaultInfo);
    },[Lang.Lib.Context.Confirm])


    // console.log('confirm render!!!')
    return (
        <ConfirmContext.Provider value={{ confirm,alert }}>
            {children}
            <Confirm show={show} title={title} info={info} type={type} onConfirm={confirmHandle} onCancel={cancelHandle}/>
        </ConfirmContext.Provider>
    );
};


export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
}
