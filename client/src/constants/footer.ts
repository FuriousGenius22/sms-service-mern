import type { IFooter } from "@/types";

export const footerData: IFooter[] = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "API Docs", href: "#" },
            { name: "Status", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Contact", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
        ],
    },
];
