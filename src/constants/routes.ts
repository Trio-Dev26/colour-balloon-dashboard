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
   newLesson: '/lessons/new',
   lessonDetail: (id: string) => `/lessons/${id}`,
   editLesson: (id: string) => `/lessons/${id}/edit`,
   quizzes: '/quizzes',
   newQuiz: '/quizzes/new',
   quizDetail: (id: string) => `/quizzes/${id}`,
   editQuiz: (id: string) => `/quizzes/${id}/edit`,
   questions: '/questions',
   newQuestion: '/questions/new',
   questionPreview: (id: string) => `/questions/${id}`,
   editQuestion: (id: string) => `/questions/${id}/edit`,
   plans: '/plans',
} as const;
