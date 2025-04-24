import Confirm, { ConfirmProps, ConfirmType } from "@/components/public/Confirm/Confirm";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLang } from "./Lang";

type ConfirmContextType = {
    /** 显示确认框 */
    confirm: (props: Omit<ConfirmProps, 'type'>) => Promise<boolean>;
    /** 显示提示/警告框，只能通过“确认”关闭 */
    alert: (props: Omit<ConfirmProps, 'onCancel' | 'closable' | 'onClose' | 'type'>) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { Lang } = useLang();

    const [show, setShow] = useState(false);

    const [config, setConfig] = useState<ConfirmProps | null>(null);
    // const [title, setTitle] = useState<ReactNode>(Lang.Lib.Context.Confirm.defaultTitle);
    // const [info, setInfo] = useState<ReactNode>(Lang.Lib.Context.Confirm.defaultInfo);
    // const [onConfirm, setOnConfirm] = useState(() => () => { });
    // const [onCancel, setOnCancel] = useState(() => () => { });
    // const [closable, setClosable] = useState(false);
    // const [onClose, setOnClose] = useState(() => () => { });
    // const [type, setType] = useState<ConfirmType>('confirm')

    const confirm = useCallback((config: ConfirmProps) => {
        // title && setTitle(title);
        // info && setInfo(info);
        // type && setType(type);
        // closable && setClosable(closable);
        // onClose && setOnClose(() => onClose);
        setConfig(config);

        setShow(true);

        return new Promise<boolean>((resolve, _) => {
            // setOnConfirm(() => () => {
            //     onConfirm?.();
            //     setShow(false);
            //     resolve(true);
            // });
            // setOnCancel(() => () => {
            //     onCancel?.();
            //     setShow(false);
            //     resolve(false);
            // });
            setConfig({
                type: 'confirm',
                ...config,
                onConfirm: () => {
                    config.onConfirm?.();
                    setShow(false);
                    resolve(true);
                },
                onCancel: () => {
                    config.onCancel?.();
                    setShow(false);
                    resolve(false);
                },
                onClose: () => {
                    setShow(false);
                    config.onClose?.();
                    resolve(false);
                },
            })
        });
    }, [])

    const alert = useCallback((config: Omit<ConfirmProps, 'onCancel' | 'closable' | 'onClose' | 'type'>) => {

        return confirm({
            ...config,
            type: 'alert',
        })
    }, [confirm])

    const confirmContextValue = useMemo<ConfirmContextType>(() => ({
        confirm,
        alert,
    }), [confirm, alert]);

    return (
        <ConfirmContext value={confirmContextValue}>
            {children}
            <Confirm show={show}
                {...config}
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
