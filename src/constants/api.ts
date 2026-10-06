// The browser always calls this path; next.config.ts rewrites /api/* to the NestJS backend.
export const API_BASE_URL = '/api';

export const API_TIMEOUT_MS = 60_000;
