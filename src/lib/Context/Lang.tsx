import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import BalldanceLoading from "@/components/public/Loading/Balldance";
import { LANG_ZH } from "@/lib/Config/Langs/LANG_ZH";
import { LANG_EN } from "@/lib/Config/Langs/LANG_EN";

export type LangName = 'zh' | 'en';

const Langs: {
    [key in LangName]: LangStruct
} = {
    'zh': LANG_ZH,
    'en': LANG_EN
}

type LangCtx = {
    /** 当前语言名称 */
    langName: LangName;
    /** 当前语言包 */
    Lang: LangStruct;
    /** 切换语言 */
    changeLang: () => void;
}

const LangCtx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const [langName, setLangName] = useState<LangName>('zh')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const lang = localStorage.getItem('filer-lang') as LangName || 'zh';
        setLangName(lang);
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, []);

    const Lang = useMemo(() => Langs[langName], [langName])

    const changeLang = useCallback(() => {
        setLangName((lang) => {
            let cur = lang === 'zh' ? 'en' : 'zh'
            localStorage.setItem('filer-lang', cur)
            return cur as LangName
        })
    }, [])

    const langValue = useMemo(() => {
        return {
            Lang,
            changeLang,
            langName
        }
    }, [Lang, changeLang, langName])

    if (loading) {
        return <BalldanceLoading />
        return null;
    }

    return (
        <LangCtx value={langValue}>
            {children}
        </LangCtx>
    )
}

export function useLang() {
    const ctx = useContext(LangCtx);
    if (!ctx) {
        throw new Error('useLang must be used in LangProvider')
    }
    return ctx;
}