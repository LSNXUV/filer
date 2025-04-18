import { FC, ReactNode, useEffect, useState } from "react";
import styles from './SingleInput.module.scss'
import { Close } from "@/components/Icons/Public/Close";

export type SingleInputProps = Partial<{
    show: boolean;
    title: string;
    info: (value: string) => ReactNode;
    defaultValue: string;
    handle: (value: string) => Promise<void>;
    cancel: (value: string) => Promise<void>;
}>;

export const SingleInput = ({ show = false, title = '', info = () => null, defaultValue = '', handle = async () => { }, cancel = async () => { } }: SingleInputProps) => {
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
                    {info(value)}
                </div>
                <input required type="text" value={value} pattern="/^[\w\-\s]+\.[a-zA-Z]+$/" maxLength={50} minLength={1}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className={styles.handle} onClick={async () => {
                    if (!value) return;
                    await handle(value)
                    setValue('')
                }}>确认</button>
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