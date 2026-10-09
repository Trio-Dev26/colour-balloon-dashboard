export const LOGIN_NEXT_PARAM = 'next';

export const ROUTES = {
   login: '/login',
   /** Login that returns to `next` (a path on this site) afterwards. */
   loginReturningTo: (next: string) => `/login?${LOGIN_NEXT_PARAM}=${encodeURIComponent(next)}`,
   dashboard: '/',
   modules: '/modules',
   newModule: '/modules/new',
   moduleDetail: (id: string) => `/modules/${id}`,
   editModule: (id: string) => `/modules/${id}/edit`,
   units: '/units',
   newUnit: '/units/new',
   unitDetail: (id: string) => `/units/${id}`,
   editUnit: (id: string) => `/units/${id}/edit`,
   lessons: '/lessons',
   quizzes: '/quizzes',
   questions: '/questions',
   plans: '/plans',
} as const;
