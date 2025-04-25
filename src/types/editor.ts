import type { OnMount } from '@monaco-editor/react';

export type Editor = Monaco['editor'];

export type IEditor = Parameters<OnMount>[0]

export type Monaco = Parameters<OnMount>[1]

export type IDisposable = ReturnType<IEditor['addAction']>

export type IStandaloneThemeData = Parameters<Editor['defineTheme']>[1]

export type IEditorAction = ReturnType<IEditor['getSupportedActions']>[number]