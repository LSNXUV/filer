
import React, { FC, PropsWithChildren } from 'react'
import { ConfirmProvider } from './Confirm'
import { FilesProvider } from './File'
import { LangProvider } from './Lang'
import { MessageProvider } from './Message'
import { SingleInputProvider } from './SingleInput'

const Context: FC<PropsWithChildren> = ({ children }) => {
    return (
        <LangProvider>
            <ConfirmProvider>
                <SingleInputProvider>
                    <MessageProvider>
                        <FilesProvider>
                            {children}
                        </FilesProvider>
                    </MessageProvider>
                </SingleInputProvider>
            </ConfirmProvider>
        </LangProvider>
    )
}

export default Context
