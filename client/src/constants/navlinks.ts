import type { INavLink } from "@/types";
import { ROUTES } from "./routes";

/** Main nav links (home page + app routes) */
export const mainNavLinks: INavLink[] = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Features", href: `${ROUTES.HOME}#features` },
  { name: "Testimonials", href: `${ROUTES.HOME}#testimonials` },
  { name: "Pricing", href: `${ROUTES.HOME}#pricing` },
  { name: "Login", href: ROUTES.LOGIN },
  { name: "Dashboard", href: ROUTES.DASHBOARD },
];
