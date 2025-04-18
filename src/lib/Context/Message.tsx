// Message.tsx
import { Message, MessageType } from '@/components/public/Message/Message';
import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, } from 'react';
import { useLang } from './Lang';

type MessageContextType = {
  /**
   * 显示消息
   * @param message 消息内容，可传递包含消息类型键的对象
   * @param type 消息类型 如果是boolean，则为success和fail
   * @param duration 消息持续时间，默认3s
   */
  showMessage: (
    message: string | {
      [key in MessageType]?: string
    },
    type?: MessageType | boolean,
    duration?: number,
  ) => void;
  closeMessage: (index: string) => void;
};


const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { Lang } = useLang()
  const [messages, setMessages] = useState<Record<string, Message>>({});

  const showMessage = useCallback((
    message: string | {
      [key in MessageType]?: string;
    },
    type?: MessageType | boolean,
    duration?: number
  ) => {
    const id = new Date().getTime().toString() + message;
    type = typeof type === 'boolean' ? (type ? 'success' : 'fail') : type || 'info';
    if (typeof message !== 'string') {
      message = message[type] || Lang.Lib.Context.Message.showMessage.unkownMessage;
    }
    setMessages((ms) => {
      return {
        ...ms,
        [id]: {
          message: message as string,
          duration: (duration || 3) * 1000,
          type: (type || 'info') as MessageType
        }
      }
    });
  }, [Lang])

  const closeMessage = useCallback((id: string) => {
    setMessages((ms) => {
      const { [id]: _, ...rest } = ms;
      return rest;
    });
  }, [])

  const messageValue = useMemo(() => {
    return {
      showMessage,
      closeMessage
    }
  }, [showMessage, closeMessage])

  return (
    <MessageContext value={messageValue}>
      {children}
      {
        Object.keys(messages).map((id) => {
          return (
            <Message key={id} message={messages[id]} close={() => closeMessage(id)} />
          );
        })
      }
    </MessageContext>
  );
};