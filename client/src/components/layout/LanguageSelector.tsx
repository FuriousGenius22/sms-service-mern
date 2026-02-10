import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const languages = [
  { 
    code: "en" as Language, 
    name: "English", 
    flag: "https://flagcdn.com/w40/us.png"
  },
  { 
    code: "es" as Language, 
    name: "Español", 
    flag: "https://flagcdn.com/w40/es.png"
  },
  { 
    code: "de" as Language, 
    name: "Deutsch", 
    flag: "https://flagcdn.com/w40/de.png"
  },
  { 
    code: "zh" as Language, 
    name: "中文", 
    flag: "https://flagcdn.com/w40/cn.png"
  },
  { 
    code: "vi" as Language, 
    name: "Tiếng Việt", 
    flag: "https://flagcdn.com/w40/vn.png"
  },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors text-sm"
        aria-label="Select language"
      >
        <img 
          src={currentLang?.flag} 
          alt={currentLang?.name}
          className="w-5 h-auto rounded-sm"
        />
        <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/[0.08] bg-[#06080f]/95 backdrop-blur-xl shadow-2xl z-50"
            >
              <div className="p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      language === lang.code
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "text-gray-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <img 
                      src={lang.flag} 
                      alt={lang.name}
                      className="w-6 h-auto rounded-sm"
                    />
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
