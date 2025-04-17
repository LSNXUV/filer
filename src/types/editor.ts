import type { Monaco } from '@monaco-editor/react';

export type Editor = Monaco['editor'];

export type IStandaloneThemeData = Parameters<Editor['defineTheme']>[1]