import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Starter",
        price: 19,
        period: "month",
        description: "For individuals and small projects getting started.",
        features: [
            "100 verifications / month",
            "10 virtual phone numbers",
            "REST API access",
            "Email support",
            "Basic analytics dashboard",
        ],
        mostPopular: false,
    },
    {
        name: "Pro",
        price: 49,
        period: "month",
        description: "For growing teams that need more volume and features.",
        features: [
            "1,000 verifications / month",
            "50 virtual phone numbers",
            "Priority API access",
            "Webhooks & real-time callbacks",
            "Advanced analytics",
            "Priority email & chat support",
            "Custom sender IDs",
        ],
        mostPopular: true,
    },
    {
        name: "Enterprise",
        price: 0,
        period: "",
        description: "For organizations with high volume and custom needs.",
        features: [
            "Unlimited verifications",
            "Unlimited phone numbers",
            "Dedicated infrastructure",
            "99.99% uptime SLA",
            "24/7 phone & Slack support",
            "Dedicated account manager",
            "Custom integration support",
        ],
        mostPopular: false,
    },
];
