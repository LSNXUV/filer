import { useState } from "react";
import styles from './SingleInput.module.scss'
import { Close } from "@/components/Icons/Public/Close";
import FileIcon from "@/components/Icons/File/File";

export const SingleInput = ({show,title,info,defaultValue,handle,cancel}:{
    show:boolean;
    title: string;
    info: string;
    defaultValue: string;
    handle: (value: string) => Promise<void>;
    cancel: (value: string) => Promise<void>;
}) => {
 
    const [value, setValue] = useState(defaultValue)

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
                draggable
            >
                <div className={styles.title}>{title}</div>
                <div className={`${styles.info}`}>
                    {info + '/'}
                    {value && <FileIcon name={value}/>}
                    {value}
                </div>
                <input required type="text" value={value} pattern="/^[\w\-\s]+\.[a-zA-Z]+$/" maxLength={50} minLength={1}
                    onChange={(e) => setValue(e.target.value)} 
                />
                <button className={styles.handle} onClick={async()=>{
                    if(!value) 
                        await handle(value)
                    setValue('')
                }}>确认</button>
                <div className={styles.cancel} onClick={async()=>{
                    await cancel(value)
                    setValue('')
                }}>
                    <Close />
                </div>
            </div>
        </div>
    );
};