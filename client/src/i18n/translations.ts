import type { Language } from "@/contexts/LanguageContext";
import { en } from "./en";
import { es } from "./es";
import { de } from "./de";
import { zh } from "./zh";
import { vi } from "./vi";

type TranslationKey = Language;

export const translations: Record<TranslationKey, typeof en> = {
  en,
  es,
  de,
  zh,
  vi,
};

export function useTranslation() {
  return translations;
}
