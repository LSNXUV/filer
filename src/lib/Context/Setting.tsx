import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

type SettingCtx = {
    /** 设置 */
    setting: {
        autoSave: boolean;
    },
    /** 修改设置函数 */
    setSetting: React.Dispatch<React.SetStateAction<SettingCtx['setting']>>;
    /** 设置自动保存 */
    setAutoSave: (b?: boolean) => void;
};

const SettingCtx = createContext<SettingCtx | null>(null);

export function SettingProvider({ children }: PropsWithChildren) {
    const [setting, setSetting] = useState<SettingCtx['setting']>({
        autoSave: false,
    });

    const setAutoSave: SettingCtx['setAutoSave'] = useCallback((b) => {
        setSetting((prev) => ({ ...prev, autoSave: b ?? !prev.autoSave }));
    }, []);

    const value = useMemo(() => {
        return {
            setting,
            setSetting,
            setAutoSave,
        };
    }, [setting, setSetting, setAutoSave]);

    return (
        <SettingCtx.Provider value={value}>
            {children}
        </SettingCtx.Provider>
    );
}

export function useSetting() {
    const ctx = useContext(SettingCtx);
    if (!ctx) {
        throw new Error('useSetting must be used in SettingProvider');
    }
    return ctx;
}