import { FC, ReactNode, useEffect, useState } from "react";
import styles from './SingleInput.module.scss'
import { Close } from "@/components/Icons/Public/Close";
import { useLang } from "@/lib/Context/Lang";

export type SingleInputProps = Partial<{
    show: boolean;

    title: string;
    info: ((value: string) => ReactNode) | string;
    defaultValue: string;
    handle: (value: string) => Promise<void> | void;
    cancel: (value: string) => Promise<void> | void;
    /** 输入框的类型 */
    type?: 'text' | 'textarea';
    pattern?: RegExp;
    max?: number;
    min?: number;
    required?: boolean;
}>;

export const SingleInput = ({
    show = false,
    title = '',
    type = 'text',
    info = () => null,
    defaultValue = '',
    handle = async () => { },
    cancel = async () => { },
    max,
    min = 0,
    required = true,
    pattern,
}: SingleInputProps) => {
    const { Lang } = useLang()
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    return (
        <div className={`${styles.container}`}
            style={{
                opacity: show ? 1 : 0,
                scale: show ? 1 : 0,
            }}>
            <div className={`${styles.content} bar`}
                style={{
                    animation: show ? `${styles.fadeIn} 0.3s ease-in-out` : '',
                }}
            >
                <div className={styles.title}>{title}</div>
                <div className={`${styles.info}`}>
                    {typeof info === 'string' ? info : info(value)}
                </div>
                <form className={`${styles.inputContainer} ${type === 'textarea' ? styles.textareaContainer : ''}`}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (required && !value) return;
                        await handle(value);
                        setValue('')
                    }}
                >
                    {type === 'textarea' ?
                        <textarea required={required} value={value}
                            maxLength={max} minLength={min}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        /> :
                        <input required={required} type="text" value={value}
                            pattern={pattern?.source.slice(1, -1)}
                            maxLength={max} minLength={min}
                            onChange={(e) => {
                                setValue(e.target.value)
                                e.target.setCustomValidity(""); // 清除旧提示
                            }}
                            onInvalid={(e) => {
                                let target = e.target as HTMLInputElement;
                                if (pattern && !new RegExp(pattern.source).test(target.value)) {
                                    target.setCustomValidity(Lang.Lib.Context.SingleInput.invalid.pattern);
                                }
                            }}
                        />
                    }
                    <button type="submit" className={styles.handle}>
                        {Lang.Lib.Context.SingleInput.confirm}
                    </button>
                </form>
                <div className={styles.cancel} onClick={async () => {
                    await cancel(value)
                    setValue('')
                }}>
                    <Close />
                </div>
            </div>
        </div>
    );
};