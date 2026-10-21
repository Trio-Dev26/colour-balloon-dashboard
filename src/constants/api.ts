// The browser always calls this path; next.config.ts rewrites /api/* to the NestJS backend.
export const API_BASE_URL = '/api';

export const API_TIMEOUT_MS = 60_000;

export const AUTH_PATHS = {
   login: '/auth/admin/login',
   logout: '/auth/admin/logout',
   me: '/auth/admin/me',
   refresh: '/auth/admin/refresh',
} as const;

export const MODULE_PATHS = {
   list: '/admin/modules',
   detail: (id: string) => `/admin/modules/${id}`,
   status: (id: string) => `/admin/modules/${id}/status`,
   thumbnail: (id: string) => `/admin/modules/${id}/thumbnail`,
} as const;

export const UNIT_PATHS = {
   list: '/admin/units',
   detail: (id: string) => `/admin/units/${id}`,
   reorder: '/admin/units/reorder',
} as const;

export const LESSON_PATHS = {
   list: '/admin/lessons',
   detail: (id: string) => `/admin/lessons/${id}`,
   reorder: '/admin/lessons/reorder',
} as const;

export const LESSON_FILE_PATHS = {
   list: (lessonId: string) => `/admin/lessons/${lessonId}/files`,
   uploadUrl: (lessonId: string) => `/admin/lessons/${lessonId}/files/upload-url`,
   reorder: (lessonId: string) => `/admin/lessons/${lessonId}/files/reorder`,
   detail: (lessonId: string, fileId: string) => `/admin/lessons/${lessonId}/files/${fileId}`,
} as const;

/** No timeout for the direct-to-storage PUT: a 200 MB upload outlives API_TIMEOUT_MS. */
export const UPLOAD_TIMEOUT_MS = 0;

/** Largest `limit` the backend accepts; used to load whole lists (module picker, a module's units). */
export const MAX_PAGE_SIZE = 100;

export const CATALOG_PATHS = {
   levels: '/levels',
   categories: '/categories',
} as const;

/** httpOnly cookie set by the backend; lives as long as the session, so proxy.ts uses it as the "logged in" signal. */
export const SESSION_COOKIE = 'refresh_token';
