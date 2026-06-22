import { createContext, useContext } from "react";
import {
  Language,
  TranslationKey,
  translations,
} from "../../constants/translations";

type Texts = Record<TranslationKey, string>;

export interface LanguageContextValue {
  language: Language;
  isRtl: boolean;
  texts: Texts;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};

export { translations };
export type { Language };
