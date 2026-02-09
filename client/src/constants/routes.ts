/**
 * Central route definitions. Use these constants for navigation and routing.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_SETTINGS: '/dashboard/settings',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
