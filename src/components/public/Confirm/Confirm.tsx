import { useLang } from '@/lib/Context/Lang';
import styles from './Confirm.module.scss'
import { Close } from '@/components/Icons/Public/Close';
import { ReactNode } from 'react';


export type ConfirmType = 'confirm' | 'alert'

export type ConfirmProps = {
    title?: ReactNode;
    description?: ReactNode;
    onConfirm?: () => any;
    onCancel?: () => any;
    closable?: boolean;
    onClose?: () => any;
    type?: ConfirmType
}

export default function Confirm({
    show, title, description,
    onConfirm, onCancel,
    closable = false, onClose,
    type = 'confirm'
}: ConfirmProps & { show: boolean }) {
    const { Lang } = useLang();

    return (
        <div className={`${styles.container}`}
            style={{
                opacity: show ? 1 : 0,
                scale: show ? 1 : 0,
            }}
        >
            <div className={styles.content}
                style={{
                    animation: show ? `${styles.fadeIn} 0.3s cubic-bezier(.65, .05, .36, 1)` : '',
                }}
            >
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.description}>{description}</div>
                <div className={styles.btnContainer}>
                    <button className={styles.confirm} onClick={onConfirm}>
                        {Lang.Lib.Context.Confirm.confirm}
                    </button>
                    {
                        type !== 'alert' &&
                        <button className={styles.cancel} onClick={onCancel}>
                            {Lang.Lib.Context.Confirm.cancel}
                        </button>
                    }
                </div>
                {closable && <Close className={styles.close} onClick={onClose} />}
            </div>
        </div>
    )
}
