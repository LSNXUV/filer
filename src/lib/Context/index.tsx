
import React, { FC, PropsWithChildren } from 'react'
import { ConfirmProvider } from './Confirm'
import { FilesProvider } from './File'
import { LangProvider } from './Lang'
import { MessageProvider } from './Message'
import { SingleInputProvider } from './SingleInput'
import { TabsProvider } from './Tab'

/** 所有Context的集合 */
const Context: FC<PropsWithChildren> = ({ children }) => {
    return (
        <LangProvider>
            <ConfirmProvider>
                <SingleInputProvider>
                    <MessageProvider>
                        <TabsProvider>
                            <FilesProvider>
                                {children}
                            </FilesProvider>
                        </TabsProvider>
                    </MessageProvider>
                </SingleInputProvider>
            </ConfirmProvider>
        </LangProvider>
    )
}

export default Context
