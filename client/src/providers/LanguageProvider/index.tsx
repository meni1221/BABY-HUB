import { ReactNode, useEffect, useState } from "react";
import { Language, LanguageContext, translations } from "./context";

const getInitialLanguage = (): Language => {
  const storedLanguage = localStorage.getItem("babyhub-language");
  return storedLanguage === "he" || storedLanguage === "en"
    ? storedLanguage
    : "en";
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
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

  const texts = translations[language];

  return (
    <LanguageContext.Provider value={{ language, isRtl, texts, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
