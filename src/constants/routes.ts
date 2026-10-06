export const ROUTES = {
   login: '/login',
   dashboard: '/',
   modules: '/modules',
   newModule: '/modules/new',
   moduleDetail: (id: string) => `/modules/${id}`,
   editModule: (id: string) => `/modules/${id}/edit`,
   units: '/units',
   lessons: '/lessons',
   quizzes: '/quizzes',
   questions: '/questions',
   plans: '/plans',
} as const;
