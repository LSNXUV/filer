import Confirm, { ConfirmProps, ConfirmType } from "@/components/public/Confirm/Confirm";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLang } from "./Lang";

const ConfirmContext = createContext<{
    confirm: (props: Omit<ConfirmProps, 'type'>) => Promise<boolean>;
    alert: (props: Omit<ConfirmProps, 'onCancel' | 'closable' | 'onClose' | 'type'>) => Promise<boolean>;
} | null>(null);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { Lang } = useLang();

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(Lang.Lib.Context.Confirm.defaultTitle);
    const [info, setInfo] = useState(Lang.Lib.Context.Confirm.defaultInfo);
    const [onConfirm, setOnConfirm] = useState(() => () => { });
    const [onCancel, setOnCancel] = useState(() => () => { });
    const [closable, setClosable] = useState(false);
    const [onClose, setOnClose] = useState(() => () => { });
    const [type, setType] = useState<ConfirmType>('confirm')

    const confirm = useCallback(({ title, info, onConfirm, onCancel, type, closable, onClose }: ConfirmProps) => {
        title && setTitle(title);
        info && setInfo(info);
        type && setType(type);
        closable && setClosable(closable);
        onClose && setOnClose(() => onClose);

        setShow(true);

        return new Promise<boolean>((resolve, _) => {
            setOnConfirm(() => () => {
                onConfirm?.();
                setShow(false);
                resolve(true);
            });
            setOnCancel(() => () => {
                onCancel?.();
                setShow(false);
                resolve(false);
            });
        });
    }, [])

    const alert = useCallback(({ title, info, onConfirm }: Omit<ConfirmProps, 'onCancel' | 'closable' | 'onClose' | 'type'>) => {

        return confirm({
            title, info, onConfirm,
            type: 'alert',
        })
    }, [confirm])

    const confirmHandle = useCallback(() => {
        onConfirm();
        setShow(false);
    }, [onConfirm])

    const cancelHandle = useCallback(() => {
        onCancel();
        setShow(false);
    }, [onCancel])

    const onCloseHandle = useCallback(() => {
        setShow(false);
        onClose();
    }, [onClose])

    useEffect(() => {
        setTitle(Lang.Lib.Context.Confirm.defaultTitle);
        setInfo(Lang.Lib.Context.Confirm.defaultInfo);
    }, [Lang.Lib.Context.Confirm])


    // console.log('confirm render!!!')
    return (
        <ConfirmContext value={{ confirm, alert }}>
            {children}
            <Confirm show={show}
                title={title} info={info} type={type}
                onConfirm={confirmHandle} onCancel={cancelHandle}
                closable={closable} onClose={onCloseHandle}
            />
        </ConfirmContext>
    );
};


export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
}
