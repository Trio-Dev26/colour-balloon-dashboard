import type { LessonFilters } from '@/types/api/lesson.types';
import type { ModuleFilters } from '@/types/api/module.types';
import type { QuestionFilters } from '@/types/api/question.types';
import type { QuizFilters } from '@/types/api/quiz.types';
import type { UnitFilters } from '@/types/api/unit.types';

// All React Query keys live here so hooks can invalidate each other without circular imports.
// Every key starts with its domain's `all`, so invalidating `all` refreshes every query of that domain.

export const moduleKeys = {
   all: ['modules'] as const,
   list: (filters: ModuleFilters) => [...moduleKeys.all, 'list', filters] as const,
   options: () => [...moduleKeys.all, 'options'] as const,
   detail: (id: string) => [...moduleKeys.all, 'detail', id] as const,
};

export const unitKeys = {
   all: ['units'] as const,
   list: (filters: UnitFilters) => [...unitKeys.all, 'list', filters] as const,
   byModule: (moduleId: string) => [...unitKeys.all, 'module', moduleId] as const,
   /** Picker options; no moduleId = every unit. */
   options: (moduleId?: string) => [...unitKeys.all, 'options', moduleId ?? 'all'] as const,
   detail: (id: string) => [...unitKeys.all, 'detail', id] as const,
};

export const lessonKeys = {
   all: ['lessons'] as const,
   list: (filters: LessonFilters) => [...lessonKeys.all, 'list', filters] as const,
   detail: (id: string) => [...lessonKeys.all, 'detail', id] as const,
   byUnit: (unitId: string) => [...lessonKeys.all, 'unit', unitId] as const,
};

export const lessonFileKeys = {
   all: ['lessonFiles'] as const,
   byLesson: (lessonId: string) => [...lessonFileKeys.all, 'lesson', lessonId] as const,
};

export const questionKeys = {
   all: ['questions'] as const,
   list: (filters: QuestionFilters, limit?: number) => [...questionKeys.all, 'list', filters, limit] as const,
   detail: (id: string) => [...questionKeys.all, 'detail', id] as const,
};

export const quizKeys = {
   all: ['quizzes'] as const,
   list: (filters: QuizFilters) => [...quizKeys.all, 'list', filters] as const,
   chapterEndTest: (moduleId: string) => [...quizKeys.all, 'chapterEndTest', moduleId] as const,
   detail: (id: string) => [...quizKeys.all, 'detail', id] as const,
};

export const catalogKeys = {
   all: ['catalog'] as const,
   levels: () => [...catalogKeys.all, 'levels'] as const,
   categories: () => [...catalogKeys.all, 'categories'] as const,
};

export const authKeys = {
   all: ['auth'] as const,
   me: () => [...authKeys.all, 'me'] as const,
};

export const dashboardKeys = {
   all: ['dashboard'] as const,
   curriculum: () => [...dashboardKeys.all, 'curriculum'] as const,
};

/**
 * Curriculum screens show each other's counts (quiz totals come from question points, a deleted unit drops its
 * questions from quizzes), so a change in one refreshes them all.
 */
export const CURRICULUM_KEYS = [
   moduleKeys.all,
   unitKeys.all,
   lessonKeys.all,
   questionKeys.all,
   quizKeys.all,
   dashboardKeys.all,
];
