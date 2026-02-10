/**
 * Central route definitions. Use these constants for navigation and routing.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_SETTINGS: '/dashboard/settings',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
