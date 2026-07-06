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
    // 1) explicit URL override (?lang=en) — lets a shared link open in a chosen language
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'en' || q === 'ja') {
        try {
          localStorage.setItem(STORAGE_KEY, q);
        } catch {
          /* ignore */
        }
        return q;
      }
    }
    // 2) previously chosen language, else default to Japanese
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
