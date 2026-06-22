import {
  navigationTexts,
  homeTexts,
  aboutTexts,
  authTexts,
  entityTexts,
  formTexts,
  parentTexts,
  dashboardTexts,
  commentTexts,
  errorTexts,
  feedbackTexts,
} from './texts';

export type Language = 'en' | 'he';

export const translations = {
  en: {
    ...navigationTexts.en,
    ...homeTexts.en,
    ...aboutTexts.en,
    ...authTexts.en,
    ...entityTexts.en,
    ...formTexts.en,
    ...parentTexts.en,
    ...dashboardTexts.en,
    ...commentTexts.en,
    ...errorTexts.en,
    ...feedbackTexts.en,
  },
  he: {
    ...navigationTexts.he,
    ...homeTexts.he,
    ...aboutTexts.he,
    ...authTexts.he,
    ...entityTexts.he,
    ...formTexts.he,
    ...parentTexts.he,
    ...dashboardTexts.he,
    ...commentTexts.he,
    ...errorTexts.he,
    ...feedbackTexts.he,
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
