
import React, { FC, PropsWithChildren } from 'react'
import { LangProvider } from './Lang'
import { ConfirmProvider } from './Confirm'
import { SingleInputProvider } from './SingleInput'
import { MessageProvider } from './Message'
import { TabsProvider } from './Tab'
import { FilesProvider } from './File'
import { EditorStatusProvider } from './EditorStatus'
import { SettingProvider } from './Setting'

/**
 * 将多个 provider 包裹在一起，包裹层级顺序与数组顺序一致。
 * 例如，providers 数组中的第一个元素将是最外层的包装器。
 * 
 * @param children - React 节点，将被所有 providers 包裹。
 * @param providers - 包含 React 组件的数组，这些组件将作为 providers 使用。
 * @returns 返回一个包含所有 providers 的组件。
 */
const ChildrenWithProviders: React.FC<{
    childrens: React.ReactNode,
    providers: React.ComponentType<{
        children: React.ReactNode
    }>[]
}> = ({ childrens, providers }) => {
    const allProviders = providers.reduceRight((acc, Provider) => (
        <Provider>{acc}</Provider>
    ), childrens);

    return <>{allProviders}</>;
};

/** 所有Context的集合 */
const Context: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ChildrenWithProviders
            providers={[
                LangProvider,
                // SettingProvider,
                ConfirmProvider,
                SingleInputProvider,
                MessageProvider,
                TabsProvider,
                FilesProvider,
                EditorStatusProvider,
            ]}
            childrens={children}
        />
    )
}

export default Context
