# Project structure

This app is organized for clarity and easy extension. Colors and style (pink/slate, motion) are kept consistent across all pages.

## Directory overview

```
src/
├── app/
│   └── routes.tsx          # All route definitions (add new routes here)
├── constants/
│   ├── routes.ts            # Route path constants (ROUTES.HOME, ROUTES.LOGIN, etc.)
│   ├── navlinks.ts          # Main nav links for Navbar
│   └── footer.ts            # Footer sections/links
├── layouts/
│   ├── MainLayout.tsx       # Navbar + main content + Footer (home, marketing)
│   ├── AuthLayout.tsx       # Centered card, no nav (login, register)
│   └── DashboardLayout.tsx  # Sidebar + content (dashboard, profile, settings)
├── pages/
│   ├── HomePage.tsx         # Landing (hero, features, testimonials, pricing, contact, CTA)
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   └── dashboard/
│       ├── DashboardPage.tsx
│       ├── ProfilePage.tsx
│       └── SettingsPage.tsx
├── components/
│   ├── layout/              # Shared layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LenisScroll.tsx
│   ├── SectionTitle.tsx     # Reusable section heading (home)
│   ├── TestimonialCard.tsx
│   └── TiltImage.tsx
├── sections/                 # Home page sections (hero, features, pricing, etc.)
├── data/                     # Static data (features, pricing, testimonials)
├── types.ts                  # Shared TypeScript types
└── globals.css               # Global styles and Tailwind
```

## Routes

| Path | Layout      | Page          |
|------|-------------|---------------|
| `/`  | MainLayout  | HomePage      |
| `/login` | AuthLayout | LoginPage  |
| `/register` | AuthLayout | RegisterPage |
| `/dashboard` | DashboardLayout | DashboardPage |
| `/dashboard/profile` | DashboardLayout | ProfilePage |
| `/dashboard/settings` | DashboardLayout | SettingsPage |

## How to extend

- **New page:** Add a route in `constants/routes.ts`, create the page under `pages/` (e.g. `pages/blog/BlogPage.tsx`), then register it in `app/routes.tsx` under the right layout.
- **New layout:** Create a layout in `layouts/` that renders `<Outlet />`, then use it in `app/routes.tsx`.
- **New shared component:** Add under `components/` (or `components/ui/` for small UI pieces).
- **New nav link:** Edit `constants/navlinks.ts` and use `ROUTES.*` for paths.
