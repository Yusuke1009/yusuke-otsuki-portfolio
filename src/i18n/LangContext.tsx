import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'ja' | 'en';
const STORAGE_KEY = 'portfolio:lang';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: 'ja', setLang: () => {}, toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved === 'en' || saved === 'ja' ? saved : 'ja';
  });
  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  }, []);
  const toggle = useCallback(() => setLang(lang === 'ja' ? 'en' : 'ja'), [lang, setLang]);
  return <Ctx.Provider value={{ lang, setLang, toggle }}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(Ctx);
}
