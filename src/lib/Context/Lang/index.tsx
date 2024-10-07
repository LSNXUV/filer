import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LangName, LangStruct, Langs } from "./Langs";
import BalldanceLoading from "@/components/public/Loading/Balldance";

type LangCtx = {
    Lang: LangStruct;
    changeLang: () => void;
}

const lanCtx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const [langName, setLangName] = useState<LangName>('zh')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 只在客户端上执行
        const lang = localStorage.getItem('filer-lang') as LangName || 'zh';
        setLangName(lang);
        setTimeout(() => {
            setLoading(false)
        },1000)
      }, []);

    const Lang = useMemo(()=>Langs[langName],[langName])
      
    const changeLang = useCallback(() => {
        setLangName((lang) => {
            let cur = lang === 'zh' ? 'en' : 'zh'
            localStorage.setItem('filer-lang',cur)
            return cur as LangName
        })
    }, [])

    if(loading){
        return <BalldanceLoading />
    }
    
    console.log('Lang render',Langs,Lang,langName)
    return (
        <lanCtx.Provider value={{
            Lang,
            changeLang
        }}>
            {children}
        </lanCtx.Provider>
    )
}

export function useLang() {
    const ctx = useContext(lanCtx);
    if (!ctx) {
        throw new Error('useLang must be used in LangProvider')
    }
    return ctx;
}