import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/translations";

/**
 * Hook to get translations for the current language
 * Usage: const t = useT();
 * Then: t.hero.title, t.nav.features, etc.
 */
export function useT() {
  const { language } = useLanguage();
  const translations = useTranslation();
  return translations[language];
}
