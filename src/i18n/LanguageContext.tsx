"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale } from "@/types";
import { translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "loyalty_locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "es")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
