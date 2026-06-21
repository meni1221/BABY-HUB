import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  Language,
  TranslationKey,
  translations,
} from "../constants/translations";

interface LanguageContextValue {
  language: Language;
  isRtl: boolean;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): Language => {
  const storedLanguage = localStorage.getItem("babyhub-language");
  return storedLanguage === "he" || storedLanguage === "en"
    ? storedLanguage
    : "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const isRtl = language === "he";

  useEffect(() => {
    localStorage.setItem("babyhub-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl, language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "he" : "en"
    );
  };

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, isRtl, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
