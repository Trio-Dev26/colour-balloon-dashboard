// The browser always calls this path; next.config.ts rewrites /api/* to the NestJS backend.
export const API_BASE_URL = '/api';

export const API_TIMEOUT_MS = 60_000;

export const AUTH_PATHS = {
   login: '/auth/admin/login',
   logout: '/auth/admin/logout',
   me: '/auth/admin/me',
   refresh: '/auth/admin/refresh',
} as const;

/** httpOnly cookie set by the backend; lives as long as the session, so proxy.ts uses it as the "logged in" signal. */
export const SESSION_COOKIE = 'refresh_token';
