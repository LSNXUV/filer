import { useState, useEffect } from "react";
import styles from './Message.module.scss'
import { Close } from "@/components/Icons/Public/Close";
import TipIcon from "@/components/Icons/Public/State";
export type MessageType = 'success' | 'error' | 'fail' | 'info' | 'warning' | 'warn'

export type Message = {
  message: string;
  type: MessageType;
  duration?: number;
};

export const Message = ({ message,close}:{
    message: Message,
    close: () => void
}) => {
  const [show, setShow] = useState(true)
  
    useEffect(() => {
      const timerId = setTimeout(() => {
        setShow(false);
      }, message.duration);
  
      return () => clearTimeout(timerId);
    }, [message.duration]);
  
    return (
      <div className={styles.container} style={{
        top: show ? '2rem' : '-4rem',
        opacity: show ? 1 : 0,
        animation: `${styles.fadeDownIn} 0.5s ease-in-out`,
      }}
        onTransitionEnd={() => {
          if (!show) {
            close();
          }

        }}
      >
        <TipIcon type={message.type} />
        {message.message}
        <span className={styles.close}
          onClick={() => {
            setShow(false);
          }}
        >
          <Close size={12}/>
        </span>
      </div>
    );
  };