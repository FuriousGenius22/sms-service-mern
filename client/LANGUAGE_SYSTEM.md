# Multi-Language System

## Overview
The application now supports 5 languages with a complete internationalization (i18n) system:
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇨🇳 Chinese (zh)
- 🇻🇳 Vietnamese (vi)

## Features
- **Language Selector** in the navbar with flag emojis
- **Persistent language selection** across the entire app
- **Real-time language switching** without page reload
- **Translated content** for Hero, Features, Pricing, Testimonials, CTA, and Footer sections

## Usage

### For Users
Click the flag icon in the navbar to open the language selector dropdown and choose your preferred language.

### For Developers

#### Using translations in components:
```tsx
import { useT } from "@/hooks/useT";

function MyComponent() {
  const t = useT();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
    </div>
  );
}
```

#### Adding new translations:
1. Open `client/src/i18n/translations.ts`
2. Add your new key to all language objects (en, es, de, zh, vi)
3. Use the new key in your component with `t.yourNewKey`

## File Structure
```
client/src/
├── contexts/
│   └── LanguageContext.tsx      # Language state management
├── i18n/
│   └── translations.ts           # All translations
├── hooks/
│   └── useT.ts                   # Translation hook
└── components/layout/
    └── LanguageSelector.tsx      # Language dropdown UI
```

## Currently Translated Sections
- ✅ Navbar (navigation links, buttons)
- ✅ Hero Section (title, description, CTAs, stats)
- ✅ How It Works Section
- ✅ Features Section
- ✅ Pricing Section
- ✅ Testimonials Section
- ✅ CTA Section
- ✅ Footer

## To-Do (Not Yet Translated)
- ⏳ Authentication pages (Login, Register, Forgot Password)
- ⏳ Dashboard pages
- ⏳ Blog pages
- ⏳ Contact Section

## Notes
- The language preference is stored in React state (not persisted to localStorage yet)
- Blog content remains in English only (requires separate blog translation system)
- Testimonial quotes are not translated (would need separate testimonial data per language)
