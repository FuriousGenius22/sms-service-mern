import type { IFooter } from "@/types";
import { ROUTES } from "./routes";

export const footerData: IFooter[] = [
  {
    title: "Product",
    links: [
      { name: "Home", href: ROUTES.HOME },
      { name: "Support", href: `${ROUTES.HOME}#support` },
      { name: "Pricing", href: `${ROUTES.HOME}#pricing` },
      { name: "Dashboard", href: ROUTES.DASHBOARD },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Log in", href: ROUTES.LOGIN },
      { name: "Sign up", href: ROUTES.REGISTER },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
    ],
  },
];
